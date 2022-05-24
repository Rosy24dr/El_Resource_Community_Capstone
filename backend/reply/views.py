from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import Forum_Reply
from .serializer import ForumReplySerializer
from django.contrib.auth.models import User

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_replies(request):
    if request.method == 'GET':
        reply = Forum_Reply.objects.all()
        serializer = ForumReplySerializer(reply, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_reply(request):
    if request.method == "POST":
            serializer = ForumReplySerializer(data = request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data,status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def forum_reply_by_id(request, pk):
    forumcomment= get_object_or_404(Forum_Reply,pk=pk)
    if request.method == 'GET':
            forumreply = Forum_Reply.objects.filter(forumcomment_id = forumcomment.id)
            serializer = ForumReplySerializer(forumcomment, many= True)
            return Response(serializer.data, status = status.HTTP_200_OK)
    elif request.method == "PUT":
            serializer = ForumReplySerializer(forumcomment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
            serializer = ForumReplySerializer(forumcomment, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
            serializer = ForumReplySerializer(forumcomment,many=False)
            forumcomment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
