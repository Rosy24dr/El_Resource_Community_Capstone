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
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request):
    # reply = get_object_or_404(Forum_Comment)
    if request.method == "POST":
        #  if request.user.id == reply.user.id:
            serializer = ForumCommentSerializer(data = request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data,status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def forum_comment_by_id(request, pk):
    forum = get_object_or_404(Forum_Post,pk=pk)
    comment = get_object_or_404(Forum_Comment,pk=pk)
    if request.method == 'GET':
        if request.user.id == comment.user.id:
            forumcomment = Forum_Comment.objects.filter(forum_id = forum.id)
            serializer = ForumCommentSerializer(forumcomment, many= True)
            return Response(serializer.data, status = status.HTTP_200_OK)
    elif request.method == "PUT":
        if request.user.id == comment.user.id:
            serializer = ForumCommentSerializer(comment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        if request.user.id == comment.user.id:
            serializer = ForumCommentSerializer(comment, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        if request.user.id == comment.user.id:
            serializer = ForumCommentSerializer(comment,many=False)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

      