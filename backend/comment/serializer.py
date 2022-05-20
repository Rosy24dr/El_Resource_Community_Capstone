from rest_framework import serializers
from .models import Forum_Comment


class ForumCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum_Comment
        fields = [ 'id' , 'user', 'forumpost',  'content', 'date']