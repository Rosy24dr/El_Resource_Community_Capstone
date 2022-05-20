from rest_framework import serializers
from .models import Forum_Comment


class ForumCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum_Comment
        fields = [ 'id' , 'user', 'forumpost',  'content', 'date', 'forumpost_id']
        depth = 1
    forumpost_id = serializers.IntegerField(write_only = True)