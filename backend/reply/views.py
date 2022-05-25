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
def get_all_replies(request, forumcomment_id):
    if request.method == 'GET':
        reply = Forum_Reply.objects.all(forumcomment_id=forumcomment_id)
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
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def forum_reply_by_comment_id(request, pk):
    reply = get_object_or_404(Forum_Reply, pk=pk)
    if request.method == 'GET':
            forumreply = Forum_Reply.objects.filter(forumcomment_id = pk)
            serializer = ForumReplySerializer(forumreply, many= True)
            return Response(serializer.data, status = status.HTTP_200_OK)    
    if request.method == "PUT":
            serializer = ForumReplySerializer(reply, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
            serializer = ForumReplySerializer(reply, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_reply(request, pk):
    reply = Forum_Reply.objects.get(pk=pk)      
    if request.method == 'DELETE':
            serializer = ForumReplySerializer(reply, many=False)
            reply.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
