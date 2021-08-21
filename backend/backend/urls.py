from django.urls import path, include
from django.contrib import admin
from runs.views import RunDetail, RunList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('runs/', include('runs.urls')),
    path('users/', include('users.urls')),
]
