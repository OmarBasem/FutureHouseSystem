import random

from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser, UserManager
from django.utils.translation import ugettext_lazy as _



class ProfilePicture(models.Model):
    uri = models.FileField(upload_to='ProfilePictures/')

    def __str__(self):
        return str(self.id)


class UserManager(UserManager):

    def create_user(self, username, email, name, birth_date, password):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            name=name,
            birth_date=birth_date,
        )
        user.set_password(password)
        user.save()
        return user


class User(AbstractUser):
    profile_picture = models.OneToOneField(ProfilePicture, on_delete=models.SET_NULL, blank=True, null=True)
    name = models.CharField(max_length=23, blank=True)
    birth_date = models.DateField(blank=True, null=True)
    email = models.EmailField(_('email address'), unique=True)
    code = models.IntegerField(blank=True, null=True)
    code_trials = models.IntegerField(default=0)
    objects = UserManager()

    def __str__(self):
        return str(self.id) + '. ' +  str(self.username)


class EmailOrUsernameModelBackend(object):
    def authenticate(self, username=None, password=None):
        if '@' in username:
            kwargs = {'email': username}
        else:
            kwargs = {'username': username}
        try:
            user = get_user_model().objects.get(**kwargs)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, username):
        try:
            return get_user_model().objects.get(pk=username)
        except get_user_model().DoesNotExist:
            return None
