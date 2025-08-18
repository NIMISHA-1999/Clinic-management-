from django.contrib import admin
from django.urls import path
from clinicApp.views import SignupView, LoginView, MeView, DoctorListView, AppointmentCreateView, LogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/signup/', SignupView.as_view()),
    path('users/login', LoginView.as_view()),
    path('users/me', MeView.as_view()),
    path('doctors', DoctorListView.as_view()),
    path('appointments', AppointmentCreateView.as_view()),
    path("logout/", LogoutView.as_view()),
]
