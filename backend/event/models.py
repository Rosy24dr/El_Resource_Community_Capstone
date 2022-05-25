from django.db import models
from authentication.models import User

class Event(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, default=1)
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=1000)
    category= models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=200)
    zip_code = models.CharField(verbose_name="Zip Code", max_length=10, null=True, blank=True)
