from rest_framework import serializers
from .models import Forum_Post

class ForumPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forum_Post
        fields = ['id', 'user', 'topic', 'content', 'date', 'user_id']