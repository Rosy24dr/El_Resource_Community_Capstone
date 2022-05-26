from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Favorite_Event
from .serializer import FavoriteEventSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_favorite_events(request):
#     if request.method == 'GET':
#         event= Favorite_Event.objects.all()
#         serializer = FavoriteEventSerializer(event, many=True)
#         return Response(serializer.data, status = status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_favorite_event(request):
    if request.method == "POST":
            serializer = FavoriteEventSerializer(data = request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data,status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def favorite_event_by_comment_id(request, pk):
    event = get_object_or_404(Favorite_Event, pk=pk)
    if request.method == 'GET':
            favorite= Favorite_Event.objects.filter(event_id = pk)
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
