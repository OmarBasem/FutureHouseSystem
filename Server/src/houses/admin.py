from django.contrib import admin
from .models import House, Room, Report, CoverPhoto, IoTDevice

admin.site.register(House)
admin.site.register(Room)
admin.site.register(Report)
admin.site.register(CoverPhoto)
admin.site.register(IoTDevice)
