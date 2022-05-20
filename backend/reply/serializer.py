from rest_framework import serializers
from .models import Forum_Reply

class ForumReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum_Reply
        fields = ['id', 'user', 'forumcomment', 'content', 'date',]
        depth = 1
    # comment_id = serializers.IntegerField(write_only = True)