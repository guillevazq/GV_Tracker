from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .serializers import RunSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Run
from .permissions import IsAuthor

class RunList(generics.ListCreateAPIView):
    def get_queryset(self):
        return Run.objects.filter(runner=self.request.user)

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
    permission_classes = [IsAuthenticated, IsAuthor]
    queryset = Run.objects.all()
    serializer_class = RunSerializer
    lookup_field = "pk"