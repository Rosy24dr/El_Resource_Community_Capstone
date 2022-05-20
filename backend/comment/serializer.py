from rest_framework import serializers
from .models import Forum_Comment
from django.contrib.auth.models import User


class ForumCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum_Comment
        fields = [ 'id' , 'user', 'forumpost',  'content', 'date']


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username']