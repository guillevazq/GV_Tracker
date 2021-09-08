from django.contrib import admin

from .models import Follows, UserSettings

admin.site.register(Follows)
admin.site.register(UserSettings)