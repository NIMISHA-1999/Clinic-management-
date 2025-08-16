from django.apps import AppConfig
class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'clinicApp'
    def ready(self):
        from django.db.utils import OperationalError, ProgrammingError
        from django.utils import timezone
        from .models import Slot
        try:
            if Slot.objects.count() == 0:
                Slot.objects.get_or_create(code="S1", label="10:00-11:30", start_time="10:00", end_time="11:30")
                Slot.objects.get_or_create(code="S2", label="12:00-13:00", start_time="12:00", end_time="13:00")
                Slot.objects.get_or_create(code="S3", label="15:00-16:30", start_time="15:00", end_time="16:30")
                Slot.objects.get_or_create(code="S4", label="19:00-20:00", start_time="19:00", end_time="20:00")
        except (OperationalError, ProgrammingError):
            # DB not ready during migrate
            pass
