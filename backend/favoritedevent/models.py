from django.db import models
from authentication.models import User
from event.models import Event

class Favorite_Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=True)
    