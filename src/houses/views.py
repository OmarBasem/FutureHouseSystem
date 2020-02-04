from rest_framework import permissions, viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from users.serializers import UserSerializer
from .serializers import HouseSerializer, RoomSerializer, CoverPhotoSerializer, ReportSerializer, IoTDeviceSerializer
from .models import House, Room, CoverPhoto, Report, IoTDevice
from users.models import User
from FHS.dynamic_fields import DynamicFieldsViewMixin



class HouseViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = HouseSerializer

    def get_queryset(self):
        qs1 = self.request.user.managed_houses
        qs2 = self.request.user.dwelled_houses
        managed_houses = HouseSerializer.setup_eager_loading(qs1)
        dwelled_houses = HouseSerializer.setup_eager_loading(qs2)
        houses = managed_houses.union(dwelled_houses)
        return houses

class RoomViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RoomSerializer

    def get_queryset(self):
        if self.request.GET.get('q') == None:
            qs = Room.objects.all()
        else:
            house = self.request.GET.get('q')
            qs = Room.objects.filter(house=house)
        rooms = RoomSerializer.setup_eager_loading(qs)
        return rooms

class CoverPhotoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CoverPhotoSerializer

    def get_queryset(self):
        return CoverPhoto.objects.all()


class IoTDeviceViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = IoTDeviceSerializer

    def get_queryset(self):
        if self.request.GET.get('q') == None:
            qs = IoTDevice.objects.all()
        else:
            house = self.request.GET.get('q')
            qs = IoTDevice.objects.filter(house=house)
        devices = IoTDeviceSerializer.setup_eager_loading(qs)
        return devices


class ReportViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReportSerializer

    def get_queryset(self):
        if self.request.GET.get('q') == None:
            reports = Report.objects.all()
        else:
            id = self.request.GET.get('q')
            type = self.request.GET.get('type')
            if type == 'house':
                reports = Report.objects.filter(house=id)
            else:
                reports = Report.objects.filter(room=id)
        return reports

class Last24hr(APIView):

    def get(self, request):
        house_id = self.request.GET.get('q')
        report = Report.objects.filter(house=house_id).order_by('-timestamp').first()
        return Response({
            'generated': report.generated,
            'consumed': report.consumed,
            'saved': report.saved,
            'wasted': report.wasted,
        })

class AssignDweller(APIView):

    def post(self, request):
        house = House.objects.get(id=request.data['house_id'])
        house.dweller = request.user
        house.save()
        return Response({'success': True})


class Test(APIView):

    def get(self, request):
        return Response({'Success': True})