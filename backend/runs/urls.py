from django.urls import path
from .views import RunList, RunDetail, RunPrediction

urlpatterns = [
    path("get/<str:following>/", RunList.as_view(), name='run-list'),
    path("<int:pk>/", RunDetail.as_view(), name='run-detail'),
    path("prediction_function/<int:step>/", RunPrediction.as_view(), name='prediction-run'),
]