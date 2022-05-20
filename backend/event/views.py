from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import Event
from .serializer import EventSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_events(request):
    if request.method == 'GET':
        event= Event.objects.all()
        serializer = EventSerializer(event, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    if request.method == "POST":
        serializer = EventSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def event_by_id(request, pk):
    event = get_object_or_404(Event,pk=pk)
    if request.method == 'GET':
            serializer=EventSerializer(event, many= True)
            return Response(serializer.data, status = status.HTTP_200_OK)
    elif request.method == "PUT":
            serializer=EventSerializer(event, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
            serializer=EventSerializer(event, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
            serializer=EventSerializer(event,many=False)
            event.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
