from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import Forum_Reply
from .serializer import ForumReplySerializer
from django.contrib.auth.models import User
from comment.models import Forum_Comment

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
    # reply = get_object_or_404(Forum_Reply)
    if request.method == "POST":
        # if request.user.id == reply.user.id:
            serializer = ForumReplySerializer(data = request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data,status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def forum_reply_by_id(request, pk):
    forumcomment = get_object_or_404(Forum_Comment,pk=pk)
    reply = get_object_or_404(Forum_Reply,pk=pk)
    if request.method == 'GET':
        if request.user.id == reply.user.id:
            forumreply = Forum_Reply.objects.filter(forumcomment_id = forumcomment.id)
            serializer = ForumReplySerializer(forumreply, many= True)
            return Response(serializer.data, status = status.HTTP_200_OK)
    elif request.method == "PUT":
        if request.user.id == reply.user.id:
            serializer = ForumReplySerializer(reply, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        if request.user.id == reply.user.id:
            serializer = ForumReplySerializer(reply, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        if request.user.id == reply.user.id:
            serializer = ForumReplySerializer(reply,many=False)
            reply.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
