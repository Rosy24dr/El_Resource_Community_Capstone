from django.db import models
from authentication.models import User
from comment.models import Forum_Comment

class Forum_Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    forumcomment = models.ForeignKey(Forum_Comment, on_delete=models.CASCADE, null=True)
    content = models.CharField(max_length=5000) 
    date = models.DateTimeField(auto_now=True, null=True)