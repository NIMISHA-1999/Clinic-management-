from rest_framework import generics, permissions, response
from rest_framework.decorators import api_view, permission_classes
from .serializers import (
    SignupSerializer, LoginSerializer, UserSerializer,
    DoctorSerializer, DoctorListSerializer,
    AppointmentCreateSerializer, AppointmentListSerializer
)
from .models import Doctor, Appointment

# --- Users ---
class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        data = self.get_serializer(data=request.data)
        data.is_valid(raise_exception=True)
        return response.Response(data.validated_data)

class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self): return self.request.user

# --- Doctors ---
class DoctorListView(generics.ListCreateAPIView):
    queryset = Doctor.objects.all().order_by("id")
    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
    def get_serializer_class(self):
        return DoctorListSerializer if self.request.method == "GET" else DoctorSerializer

# --- Appointments ---
class AppointmentCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user).order_by("-created_at")

    def get_serializer_class(self):
        return AppointmentCreateSerializer if self.request.method == "POST" else AppointmentListSerializer
