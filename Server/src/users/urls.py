from django.conf.urls import url, include
from rest_framework import routers

from .views import UserSearchAPIView, RegistrationAPI, LoginAPI, UserAPI, UserViewSet, ChangePassword, \
    ProfilePictureViewSet, ResendEmailCode, ForgotPassword, ChangeEmail, ConfirmEmailCode, \
    SetPassword, CancelEmailChange, ConfirmPasswordCode, FinalizeEmailChange, SetNewPassword, ResendPasswordCode, CheckUsername

router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('profile-picture', ProfilePictureViewSet, basename='profile_picture')

app_name = 'users'
urlpatterns = [
    url('^', include(router.urls)),
    url('^register/$', RegistrationAPI.as_view()),
    url('^login/$', LoginAPI.as_view()),
    url('^auth-user/$', UserAPI.as_view()),
    url('^change-password/$', ChangePassword.as_view(), name='change_password'),
    url(r'^set-new-password/$', SetNewPassword.as_view(), name='set_new_password'),
    url(r'^change-email/$', ChangeEmail.as_view(), name='change_email'),
    url(r'^confirm-email-code/$', ConfirmEmailCode.as_view(), name='confirm_email_code'),
    url(r'^finalize-email-change/$', FinalizeEmailChange.as_view(), name='finalize_email_change'),
    url(r'^confirm-password-code/$', ConfirmPasswordCode.as_view(), name='confirm_password_code'),
    url(r'^resend-email-code/$', ResendEmailCode.as_view(), name='resend_email_code'),
    url(r'^resend-password-code/$', ResendPasswordCode.as_view(), name='resend_password_code'),
    url(r'^cancel-email-change/$', CancelEmailChange.as_view(), name='cancel_email_change'),
    url(r'^forgot-password/$', ForgotPassword.as_view(), name='forgot_password'),
    url(r'^check-username/$', CheckUsername.as_view(), name='check_username'),
    url(r'^search/$', UserSearchAPIView.as_view(), name='search'),
    url(r'^set/$', SetPassword.as_view(), name='set'),
]
