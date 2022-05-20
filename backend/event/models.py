from django.db import models

class Event(models.Model):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=1000)
    address = models.CharField(max_length=200)