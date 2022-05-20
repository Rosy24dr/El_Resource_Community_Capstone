from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import Forum_Post
from .serializer import ForumPostSerializer
from django.contrib.auth.models import User
from comment.models import Forum_Comment

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_post(request):
    if request.method == 'GET':
        post= Forum_Post.objects.all()
        serializer = ForumPostSerializer(post, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    if request.method == "POST":
        serializer = ForumPostSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user = request.user)
            return Response(serializer.data,status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def forum_post_by_id(request, pk):
    post = get_object_or_404(Forum_Post,pk=pk)
    if request.method == 'GET':
        if request.user.id == post.user.id:
            serializer = ForumPostSerializer(post, many= True)
            return Response(serializer.data, status = status.HTTP_200_OK)
    elif request.method == "PUT":
        if request.user.id == post.user.id:
            serializer = ForumPostSerializer(post, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        if request.user.id == post.user.id:
            serializer = ForumPostSerializer(post, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        if request.user.id == post.user.id:
            serializer = ForumPostSerializer(post,many=False)
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
