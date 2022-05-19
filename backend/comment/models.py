from django.db import models
from authentication.models import User

class Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    forum_id = models.CharField(max_length=400)
    text = models.CharField(max_length=600)
    date = models.IntegerField()
    