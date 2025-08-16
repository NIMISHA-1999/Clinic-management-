# core/admin.py
from django.contrib import admin
from .models import User, Token, Slot, Doctor, Leave, Appointment
admin.site.register([User, Token, Slot, Doctor, Leave, Appointment])
