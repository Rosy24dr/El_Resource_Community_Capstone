from django.db import models
from authentication.models import User
from forum.models import Forum_Post

class Forum_Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    forumpost = models.ForeignKey(Forum_Post, on_delete=models.CASCADE, null=True)
    content = models.CharField(max_length=600)
    date = models.DateField(null=True)