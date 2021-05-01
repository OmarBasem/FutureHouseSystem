from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class CoverPhoto(models.Model):
    uri = models.FileField(upload_to='covers/')

    def __str__(self):
        return str(self.id)


class House(models.Model):
    manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name='managed_houses')
    dweller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dwelled_houses', blank=True, null=True)
    name = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=200, blank=True)
    cover_photo = models.OneToOneField(CoverPhoto, on_delete=models.SET_NULL, blank=True, null=True)
    cmu_id = models.CharField(max_length=15, unique=True)


class Room(models.Model):
    house = models.ForeignKey(House, on_delete=models.CASCADE, related_name='rooms')
    name = models.CharField(max_length=50)
    cover_photo = models.OneToOneField(CoverPhoto, on_delete=models.SET_NULL, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)


class IoTDevice(models.Model):
    house = models.ForeignKey(House, on_delete=models.CASCADE, related_name='iots')
    name = models.CharField(max_length=50)
    cover_photo = models.OneToOneField(CoverPhoto, on_delete=models.SET_NULL, blank=True, null=True)
    battery_level = models.IntegerField(default=100)
    state = models.BooleanField(default=True)
    avg_consumption = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)


# These reports are generated daily for every room and house using the data that the CMU uploads.
# The energy generated and energy consumed data are in kW.
class Report(models.Model):
    house = models.ForeignKey(House, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    generated = models.IntegerField(default=0)
    consumed = models.IntegerField(default=0)
    wasted = models.IntegerField(default=0)
    saved = models.IntegerField(default=0)
