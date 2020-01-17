from django.contrib.auth import authenticate

from rest_framework import serializers

from .models import ProfilePicture, User
from FHS.dynamic_fields import DynamicFieldsModelSerializer


class ProfilePictureSerialzer(serializers.ModelSerializer):

    class Meta:
        model = ProfilePicture
        fields = [
            'id',
            'uri',
        ]


class UserSerializer(DynamicFieldsModelSerializer):
    profile_picture = ProfilePictureSerialzer(read_only=True)
    birth_day = serializers.SerializerMethodField()
    profile_picture_id = serializers.PrimaryKeyRelatedField(queryset=ProfilePicture.objects.all(), write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'name',
            'profile_picture',
            'profile_picture_id',
            'birth_date',
            'birth_day',
            'email',
            'password',
            'code'
        ]
        extra_kwargs = {'password': {'write_only': True}, 'code': {'write_only': True}}

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('profile_picture')
        return queryset

    def create(self, data):
        user = User.objects.create_user(username=data['username'], email=data['email'], name=data['name'],
                                        birth_date=data['birth_date'], password=data['password'])
        return user



    def update(self, instance, data):
        instance.name = data.pop('name')
        instance.username = data.pop('username')
        instance.birth_date = data.pop('birth_date')
        if 'profile_picture_id' in data.keys():
            if instance.profile_picture != None:
                instance.profile_picture.delete()
            instance.profile_picture = data.pop('profile_picture_id')
        instance.save()
        return instance


    def get_birth_day(self, obj):
        if obj.birth_date:
            return str(obj.birth_date.day) + ' ' + obj.birth_date.strftime("%B")


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        else:
            username = data['username']
            if not '@' in username:
                user = User.objects.filter(username=username)
                credential = 'username'
            else:
                user = User.objects.filter(email=username)
                credential = 'email'
            if user:
                raise serializers.ValidationError("The password you entered is incorrect!")
            else:
                raise serializers.ValidationError('The ' + credential + ' you entered is incorrect!')
