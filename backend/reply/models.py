from django.db import models
from authentication.models import User

class Forum_Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    content = models.CharField(max_length=5000) 
    date = models.DateTimeField(auto_now=True, null=True)
    image = models.ImageField(upload_to="images",default="")