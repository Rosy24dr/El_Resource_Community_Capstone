from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'start_date', 'end_date', 'title', 'content', 'category', 'address', 'zip_code']