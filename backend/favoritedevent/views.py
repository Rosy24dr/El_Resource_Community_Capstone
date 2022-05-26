from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Favorite_Event
from .serializer import FavoriteEventSerializer
from django.contrib.auth.models import User

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_favorite_events(request):
    if request.method == 'GET':
        post= Favorite_Event.objects.all()
        serializer = FavoriteEventSerializer(post, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)