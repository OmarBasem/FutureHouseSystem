import random

from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives

from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from knox.models import AuthToken
from FHS.dynamic_fields import DynamicFieldsViewMixin


from .serializers import  UserSerializer, LoginUserSerializer, ProfilePictureSerialzer
from .models import ProfilePicture, User



class CancelEmailChange(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = User.objects.get(id=request.user.id)
        user.changing_email = user.email
        user.code = None
        user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ResendEmailCode(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = User.objects.get(id=request.user.id)
        code = random.randint(10000, 100000)
        user.code = code
        user.save()
        html_content = render_to_string('change_email.html', {'code': code, 'name': user.name, 'email': user.changing_email})
        text_content = strip_tags(html_content)
        mail = EmailMultiAlternatives('Change FHS account Email', text_content, 'registration@fhs.com',
                                      [user.email])
        mail.attach_alternative(html_content, "text/html")
        mail.send()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ResendPasswordCode(APIView):

    def post(self, request):
        user = User.objects.get(email=request.data['email'])
        code = random.randint(10000, 100000)
        user.code = code
        user.save()
        html_content = render_to_string('password_reset.html', {'code': code, 'name': user.name})
        text_content = strip_tags(html_content)
        mail = EmailMultiAlternatives('FHS account password reset', text_content, 'registration@fhs.com',
                                      [user.email])
        mail.attach_alternative(html_content, "text/html")
        mail.send()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CheckUsername(APIView):

    def post(self, request):
        user = User.objects.filter(username=request.data['username'])
        allowed = True
        if user:
           allowed = False
        return Response({'allowed': allowed})

class ForgotPassword(APIView):

    def post(self, request):
        if '@' in request.data['email']:
            user = User.objects.get(email=request.data['email'])
        else:
            user = User.objects.get(username=request.data['email'])
        code = random.randint(10000, 100000)
        user.code = code
        user.save()
        html_content = render_to_string('password_reset.html', {'code': code, 'name': user.name})
        text_content = strip_tags(html_content)
        mail = EmailMultiAlternatives('FHS account password reset', text_content, 'registration@fhs.com',
                                      [user.email])
        mail.attach_alternative(html_content, "text/html")
        mail.send()
        return Response({'email': user.email})



class UserViewSet(DynamicFieldsViewMixin, viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        qs = User.objects.all()
        users = UserSerializer.setup_eager_loading(qs)
        return users

class UserSearchAPIView(DynamicFieldsViewMixin, generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self, *args, **kwargs):
        query = self.request.GET.get("q")
        qs = User.objects.filter(username__istartswith=query).exclude(id=self.request.user.id)
        users = UserSerializer.setup_eager_loading(qs)
        return users


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })



class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data
        })

class ChangePassword(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        currentPass = request.data['currentPass']
        newPass = request.data['newPass']
        user_id = request.data['user_id']
        user = User.objects.get(id=user_id)
        if user.check_password(currentPass):
            user.set_password(newPass)
            user.save()
            return Response({'changed': True})
        else:
            return Response({'changed': False})

class SetNewPassword(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = User.objects.get(id=request.user.id)
        user.set_password(request.data['newPass'])
        user.save()
        return Response({'success': True})

class ChangeEmail(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = User.objects.get(id=request.user.id)
        email = request.data['email']
        checkUser = User.objects.filter(email=email)
        if not checkUser:
            code = random.randint(10000, 100000)
            user.code = code
            user.changing_email = email
            user.save()
            html_content = render_to_string('change_email.html', {'code': code, 'name': user.name, 'email': email})
            text_content = strip_tags(html_content)
            mail = EmailMultiAlternatives('Change FHS account Email', text_content, 'registration@fhs.com', [user.email])
            mail.attach_alternative(html_content, "text/html")
            mail.send()
            return Response({'changed': True})
        else:
            return Response({'changed': False})


class ConfirmEmailCode(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = User.objects.get(id=request.user.id)
        code = request.data['code']
        if str(user.code) == code:
            user.code = None
            user.save()
            return Response({'confirmed': True})
        else:
            return Response({'confirmed': False})

class FinalizeEmailChange(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = User.objects.get(id=request.user.id)
        if user.check_password(request.data['password']):
            user.email = user.changing_email
            user.save()
            return Response({'success': True})
        else:
            return Response({'success': False})

class ConfirmPasswordCode(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        user = User.objects.get(email=request.data['email'])
        code = request.data['code']
        user.code_trials += 1
        user.save()
        if str(user.code) == code:
            user.code_trials = 0
            user.code = None
            user.save()
            return Response({'success': True,  "user":  UserSerializer(user).data,  "token": AuthToken.objects.create(user)[1]})
        else:
            if user.code_trials > 10:
                code = random.randint(10000, 100000)
                user.code = code
                user.save()
                html_content = render_to_string('password_reset.html', {'code': code, 'name': user.name})
                text_content = strip_tags(html_content)
                mail = EmailMultiAlternatives('FHS account password reset', text_content,
                                              'registration@fhs.com',
                                              [user.email])
                mail.attach_alternative(html_content, "text/html")
                mail.send()
                return Response({'success': None})
            return Response({'success': False})


class SetPassword(APIView):

    def post(self, request):
        user = User.objects.get(id=1)
        user.set_password('admin')
        user.save()
        return Response({'done': True})



class ProfilePictureViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfilePictureSerialzer

    def get_queryset(self):
        return ProfilePicture.objects.all()
