from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Favorite_Event
from .serializer import FavoriteEventSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_favorite_events(request):
    if request.method == 'GET':
        events= Favorite_Event.objects.filter(user=request.user)
        serializer = FavoriteEventSerializer(events, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_favorite_event(request, event_id):
    if request.method == "POST":
        new_fav = Favorite_Event(user=request.user, event_id=event_id)
        new_fav.save()
            # serializer = FavoriteEventSerializer(data = request.data)
            # if serializer.is_valid(raise_exception=True):
            #     serializer.save(user = request.user)
        return Response(status.HTTP_201_CREATED)
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def favorite_event_by_event_id(request, pk):
    event = get_object_or_404(Favorite_Event, pk=pk)
    if request.method == 'GET':
            favorite= Favorite_Event.objects.filter(pk=pk)
            serializer = FavoriteEventSerializer(favorite, many= True)
            return Response(serializer.data, status = status.HTTP_200_OK)    
    if request.method == "PUT":
            serializer = FavoriteEventSerializer(event, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
            serializer = FavoriteEventSerializer(event, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event(request, pk):
    favorite = Favorite_Event.objects.get(pk=pk)      
    if request.method == 'DELETE':
            serializer = FavoriteEventSerializer(favorite, many=False)
            favorite.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
