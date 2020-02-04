import datetime
import os
from io import BytesIO

from django.core.files.base import ContentFile
from django.utils.timesince import timesince
from rest_framework import serializers

from .models import House, CoverPhoto, Room, Report, IoTDevice
from users.models import User
from users.serializers import UserSerializer
from FHS.dynamic_fields import DynamicFieldsModelSerializer


class CoverPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = CoverPhoto
        fields = [
            'id',
            'uri',
        ]


class ReportSerializer(serializers.ModelSerializer):
    house_id = serializers.PrimaryKeyRelatedField(queryset=House.objects.all(), write_only=True,
                                                        required=False)
    room_id = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all(), write_only=True,
                                                  required=False)

    class Meta:
        model = Report
        fields = [
            'timestamp',
            'house_id',
            'room_id',
            'generated',
            'consumed',
            'wasted',
            'saved'
        ]

class HouseSerializer(serializers.ModelSerializer):
    cover_photo = CoverPhotoSerializer(read_only=True)
    cover_photo_id = serializers.PrimaryKeyRelatedField(queryset=CoverPhoto.objects.all(), write_only=True,
                                                            required=False)
    last24hr = serializers.SerializerMethodField()
    # dweller_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True,
    #                                                     required=False)
    class Meta:
        model = House
        fields = [
            'name',
            'timestamp',
            'location',
            'cover_photo',
            'cover_photo_id',
            'cmu_id',
            'last24hr'
            # 'dweller_id'
        ]

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('cover_photo')
        return queryset

    def create(self, data):
        house = House.objects.create(
            cmu_id=data['cmu_id'],
            name=data['name'],
            manager=self.context['request'].user
        )
        if 'location' in data:
            house.location = data['location']
        if 'cover_photo_id' in data:
            house.cover_photo = data['cover_photo_id']
        house.save()
        return house

    def update(self, instance, data):
        if 'cover_photo_id' in data.keys():
            if instance.cover_photo != None:
                instance.cover_photo.delete()
            instance.cover = data.pop('cover_photo_id')
        instance.name = data.pop('name')
        instance.location = data.pop('location')
        instance.save()
        return instance

    def get_last24hr(self, obj):
        report =  Report.objects.filter(house=obj).order_by('-timestamp').first()
        data = {}
        if report:
            data = {
                'generated': report.generated,
                'consumed': report.consumed,
                'saved': report.saved,
                'wasted': report.wasted,
            }
        return data


class RoomSerializer(serializers.ModelSerializer):
    cover_photo = CoverPhotoSerializer(read_only=True)
    cover_photo_id = serializers.PrimaryKeyRelatedField(queryset=CoverPhoto.objects.all(), write_only=True,
                                                            required=False)
    house_id = serializers.PrimaryKeyRelatedField(queryset=House.objects.all(), write_only=True,
                                                            required=False)

    class Meta:
        model = Room
        fields = [
            'timestamp',
            'cover_photo',
            'cover_photo_id',
            'house_id',
            'name'
        ]

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('cover_photo')
        return queryset

    def create(self, data):
        room = Room.objects.create(
            house=data['house_id'],
            name=data['name']
        )
        if 'cover_photo_id' in data:
            room.cover_photo = data['cover_photo_id']
        room.save()
        return room

    def update(self, instance, data):
        if 'cover_photo_id' in data.keys():
            if instance.cover_photo != None:
                instance.cover_photo.delete()
            instance.cover = data.pop('cover_photo_id')
        instance.name = data.pop('name')
        instance.save()
        return instance

class IoTDeviceSerializer(serializers.ModelSerializer):
    cover_photo = CoverPhotoSerializer(read_only=True)
    cover_photo_id = serializers.PrimaryKeyRelatedField(queryset=CoverPhoto.objects.all(), write_only=True,
                                                            required=False)
    house_id = serializers.PrimaryKeyRelatedField(queryset=House.objects.all(), write_only=True,
                                                            required=False)

    class Meta:
        model = IoTDevice
        fields = [
            'timestamp',
            'cover_photo',
            'cover_photo_id',
            'house_id',
            'name',
            'battery_level',
            'avg_consumption',
            'state'
        ]

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('cover_photo')
        return queryset

    def create(self, data):
        device = IoTDevice.objects.create(
            house=data['house_id'],
            name=data['name'],
        )
        if 'cover_photo_id' in data:
            device.cover_photo = data['cover_photo_id']
        device.save()
        return device

    def update(self, instance, data):
        if 'cover_photo_id' in data.keys():
            if instance.cover_photo != None:
                instance.cover_photo.delete()
            instance.cover = data.pop('cover_photo_id')
        instance.name = data.pop('name')
        instance.save()
        return instance





