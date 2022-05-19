from django.db import models
from authentication.models import User

class Forum_Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    forum_id = models.CharField(max_length=400)
    content = models.CharField(max_length=600)
    date = models.DateTimeField(auto_now=True, null=True)
    image = models.ImageField(upload_to="images",default="")
    

