from multiprocessing.synchronize import Event
from rest_framework import serializers
from .models import Favorite_Event

class FavoriteEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite_Event
        fields = ['id', 'user', 'event', 'event_id']
        depth = 1
    event_id = serializers.IntegerField(write_only = True)