from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.exceptions import ValidationError

# ---- User ----
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None  # remove username
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # no extra fields required

    objects = UserManager()  # attach custom manager

    def __str__(self):
        return self.email


class Token(models.Model):
    """Simple bearer token (for demo). For prod, prefer JWT."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="auth_token")
    key = models.CharField(max_length=40, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.key

# ---- Clinic domain ----
class Slot(models.Model):
    code = models.CharField(max_length=20, unique=True)  # e.g., "S1"
    label = models.CharField(max_length=50)              # "10:00-11:30"
    start_time = models.TimeField()
    end_time = models.TimeField()
    def __str__(self): return f"{self.label}"

class Doctor(models.Model):
    name = models.CharField(max_length=120)
    speciality = models.CharField(max_length=120)
    department = models.CharField(max_length=120)
    def __str__(self): return self.name

class Leave(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="leaves")
    date = models.DateField()
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    class Meta:
        unique_together = ("doctor", "date", "slot")
    def __str__(self): return f"{self.doctor} leave {self.date} {self.slot.label}"

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointments")
    patient_name = models.CharField(max_length=120)
    age = models.PositiveIntegerField()
    appointment_date = models.DateField()
    slot = models.ForeignKey(Slot, on_delete=models.PROTECT)
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT, related_name="appointments")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("doctor", "appointment_date", "slot")  # prevent double booking

    def clean(self):
        today = timezone.localdate()
        # cannot book in the past or today
        if self.appointment_date <= today:
            raise ValidationError("Appointment must be from tomorrow onwards.")
        # 1 month ahead max
        if self.appointment_date > today + timezone.timedelta(days=30):
            raise ValidationError("Appointment cannot be more than 1 month ahead.")
        # slot not on leave
        if Leave.objects.filter(doctor=self.doctor, date=self.appointment_date, slot=self.slot).exists():
            raise ValidationError("Doctor is on leave for this slot.")
        # already booked handled by unique_together at DB level

    def __str__(self):
        return f"{self.patient_name} - {self.doctor} - {self.appointment_date} {self.slot.label}"
