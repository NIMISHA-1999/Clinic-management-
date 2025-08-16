from rest_framework import serializers
from django.utils import timezone
from django.contrib.auth import authenticate
from .models import User, Token, Doctor, Slot, Leave, Appointment
import secrets

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated):
        user = User(email=validated["email"])
        user.set_password(validated["password"])
        user.save()
        Token.objects.create(user=user, key=secrets.token_hex(20))
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(email=attrs["email"], password=attrs["password"])
        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        token, _ = Token.objects.get_or_create(user=user, defaults={"key": secrets.token_hex(20)})
        return {"token": token.key}

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = ["id", "code", "label", "start_time", "end_time"]

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "name", "speciality", "department"]

class DoctorListSerializer(serializers.ModelSerializer):
    next_available = serializers.SerializerMethodField()
    class Meta:
        model = Doctor
        fields = ["id", "name", "speciality", "department", "next_available"]

    def get_next_available(self, doctor: Doctor):
        today = timezone.localdate()
        slots = list(Slot.objects.all().order_by("id"))
        for d in range(1, 31+1):
            day = today + timezone.timedelta(days=d)
            for slot in slots:
                leave = Leave.objects.filter(doctor=doctor, date=day, slot=slot).exists()
                booked = Appointment.objects.filter(doctor=doctor, appointment_date=day, slot=slot).exists()
                if not leave and not booked:
                    return {
                        "date": day.isoformat(),
                        "slot_id": slot.id,
                        "slot_label": slot.label
                    }
        return None

class AppointmentCreateSerializer(serializers.ModelSerializer):
    doctor_id = serializers.PrimaryKeyRelatedField(source="doctor", queryset=Doctor.objects.all(), write_only=True)
    slot_id = serializers.PrimaryKeyRelatedField(source="slot", queryset=Slot.objects.all(), write_only=True)

    class Meta:
        model = Appointment
        fields = ["id", "patient_name", "age", "appointment_date", "doctor_id", "slot_id"]

    def validate(self, attrs):
        # attach user for clean()
        attrs["user"] = self.context["request"].user
        return attrs

    def create(self, validated):
        appt = Appointment(**validated)
        appt.clean()   # raises ValidationError -> DRF handles into 400
        appt.save()
        return appt

class AppointmentListSerializer(serializers.ModelSerializer):
    slot = SlotSerializer()
    doctor = DoctorSerializer()
    class Meta:
        model = Appointment
        fields = ["id", "patient_name", "age", "appointment_date", "slot", "doctor", "created_at"]
