from rest_framework import serializers
from .models import Forum_Reply

class ForumReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum_Reply
        fields = ['id', 'user', 'content', 'date','image','comment_id']
        depth = 1
    comment_id = serializers.IntegerField(write_only = True)