from pyexpat import model
from unicodedata import category
from unittest.util import _MAX_LENGTH
from django.db import models
from authentication.models import User

class Forum_Post(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    topic= models.CharField(max_length=300)
    description = models.CharField(max_length=1000,blank=True)
    date = models.DateTimeField(auto_now=True, null=True)