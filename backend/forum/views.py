from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import Forum_Post
from .serializer import ForumPostSerializer


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

@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def forum_post_by_id(request, pk):
    post = get_object_or_404(Forum_Post,pk=pk)
    if request.method == 'GET':
            serializer = ForumPostSerializer(post, many= True)
            return Response(serializer.data, status = status.HTTP_200_OK)
    elif request.method == "PUT":
            serializer = ForumPostSerializer(post, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user = request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
            serializer = ForumPostSerializer(post, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request, pk):
    reply = Forum_Post.objects.get(pk=pk)      
    if request.method == 'DELETE':
            serializer = ForumPostSerializer(reply, many=False)
            reply.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)