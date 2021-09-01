from time import time
import math

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import RunSerializer
from users.serializers import FollowsSerializer
from .models import Run
from users.models import Follows

from predictions.PolynomialRegression import get_polynomial_function, predict_specific_value

class RunList(generics.ListCreateAPIView):
    def get_queryset(self):
        follows_obj_user = Follows.objects.get(user=self.request.user)

        # Followers' runs (including the user which requests)
        users_followed = FollowsSerializer(follows_obj_user).data["following"]
        users_followed.append(self.request.user.pk)

        personal_runs = Run.objects.filter(runner=self.request.user)
        following_runs = Run.objects.filter(runner__pk__in=users_followed)
        
        if self.kwargs['following'] == "true":
            return following_runs

        return personal_runs

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["runner"] = request.user
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    serializer_class = RunSerializer
    permission_classes = [IsAuthenticated]

class RunDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Run.objects.filter(runner=self.request.user)
    serializer_class = RunSerializer
    lookup_field = "pk"

class RunPrediction(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):

        step = 3
        days_range = 60
        days_prediction = 60
        minimum_runs_per_range = 2

        runs = Run.objects.filter(runner=request.user)

        distances_speed_days = {}
        for run in runs:
            days_ago = math.floor((time() - run.unix_date) / 3600 / 24)
            if days_ago <= days_range:
                minutes_per_km = run.seconds / 60 / run.distance
                for range_ in [i for i in range(step + 1, 1000, step)]:
                    if run.distance <= range_:
                        current_range = range_
                        stringified_range = f"{current_range - step}-{current_range}"
                        try:
                            distances_speed_days[stringified_range]["pace"].insert(0, minutes_per_km)
                            distances_speed_days[stringified_range]["days"].append(days_ago)
                        except KeyError:
                            distances_speed_days[stringified_range] = {"pace": [minutes_per_km], "days": [days_ago]}
                        break
        
        functions_dict = {}
        for specific_range, runs_info in distances_speed_days.items():
            if len(runs_info["pace"]) >= minimum_runs_per_range:
                intercept, coefficients = get_polynomial_function(
                    runs_info["pace"], 
                    runs_info["days"], 
                )
                values_arr = []
                for i in range(0, days_range + days_prediction + 1):
                    current_value = predict_specific_value(intercept, coefficients, i)
                    values_arr.append(current_value)
                    
                functions_dict[specific_range] = values_arr

        return Response({"data": functions_dict}, status=status.HTTP_200_OK)