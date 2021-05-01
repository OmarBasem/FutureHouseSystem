from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from .models import Problem, Feedback, Question
from users.models import User

class SendSupportMessage(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        if request.data['problem']:
            Problem.objects.create(user=user,  text=request.data['text'])
        else:
            Feedback.objects.create(user=user,  text=request.data['text'])
        return Response({'sent': True})


class AskQuestion(APIView):

    def post(self, request):
        user = request.user
        question = Question.objects.create(user=user, text=request.data['text'])
        if user != None:
            question.user = user.first()
            question.save()
        return Response({'sent': True})