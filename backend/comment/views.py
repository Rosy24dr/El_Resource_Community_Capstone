from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import Forum_Comment
from .serializer import ForumCommentSerializer
from django.contrib.auth.models import User
from forum.models import Forum_Post

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_comments(request):
    if request.method == 'GET':
        comments = Forum_Comment.objects.all()
        serializer = ForumCommentSerializer(comments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request):
    if request.method == "POST":
        serializer = ForumCommentSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data,status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def forum_comment_by_id(request, pk):
    forum = get_object_or_404(Forum_Post,pk=pk)
    comment = get_object_or_404(Forum_Comment,pk=pk)
    if request.method == 'GET':
        forumcomment = Forum_Comment.objects.filter(forum_id = forum.id)
        serializer = ForumCommentSerializer(forumcomment, many= True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    elif request.method == "PUT":
        serializer = ForumCommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        serializer = ForumCommentSerializer(comment, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)