from django.urls import path
from .views import RunList, RunDetail

urlpatterns = [
    path("", RunList.as_view(), name='run-list'),
    path("<int:pk>/", RunDetail.as_view(), name='run-detail'),
]