from django.conf.urls import url, include
from rest_framework import routers


from .views import HouseViewSet, RoomViewSet, CoverPhotoViewSet, ReportViewSet, IoTDeviceViewSet, Last24hr, AssignDweller, Test

router = routers.DefaultRouter()
router.register('houses', HouseViewSet, basename='houses')
router.register('rooms', RoomViewSet, basename='rooms')
router.register('cover-photos', CoverPhotoViewSet, basename='cover_photos')
router.register('reports', ReportViewSet, basename='reports')
router.register('iot-devices', IoTDeviceViewSet, basename='iot_devices')

app_name = 'houses'

urlpatterns = [
    url('^', include(router.urls)),

    url('^last-24hr/$', Last24hr.as_view()),
    url('^assign-dweller/$', AssignDweller.as_view()),
    url('^test/$', Test.as_view()),

]