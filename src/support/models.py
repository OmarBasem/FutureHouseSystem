from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Problem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)


    def __str__(self):
        return str(self.id) + '. (' + str(self.email) + ')'


class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id) + '. (' + str(self.email) + ')'


class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id) + '. (' + str(self.email) + ')'