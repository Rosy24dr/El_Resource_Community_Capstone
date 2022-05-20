from django.db import models
from authentication.models import User
from forum.models import Forum_Post

class Forum_Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    forumpost = models.ForeignKey(Forum_Post, on_delete=models.CASCADE, default="")
    content = models.CharField(max_length=600)
    date = models.DateTimeField(auto_now=True, null=True)