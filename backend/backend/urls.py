from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('runs/', include('runs.urls')),
    path('users/', include('users.urls')),
]
