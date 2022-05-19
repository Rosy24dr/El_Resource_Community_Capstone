from django.db import models
from authentication.models import User

class Forum_Post(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    topic= models.CharField(max_length=300)
    content = models.CharField(max_length=1000,blank=True)
    post_id = models.CharField(max_length=400)
    date = models.DateTimeField(auto_now=True, null=True)
    image = models.ImageField(upload_to="images",default="")
 
