from django.conf.urls import url

from .views import SendSupportMessage, AskQuestion

app_name = 'support'
urlpatterns = [
    url(r'^support-message/$', SendSupportMessage.as_view(), name='support_message'),
    url(r'^ask-question/$', AskQuestion.as_view(), name='ask_question'),
]
