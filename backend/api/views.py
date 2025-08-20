from django.shortcuts import render
from rest_framework import generics
from api.serializer import PostSerializer, CommentListSerializer, CommentCreateSerializer
from rest_framework.response import Response
from api.models import Post, Comment
from django.shortcuts import get_object_or_404

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostSerializer

all_post_view = PostList.as_view()

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentCreateSerializer

comment_create_view = CommentCreateView.as_view()

class CommentListView(generics.RetrieveAPIView): 
    serializer_class = CommentListSerializer
    lookup_field = 'post_id'
    # lookup_url_kwarg = 'post_id'

    def get_object(self):
        post_id = self.kwargs["post_id"]
        # Get the post with prefetched comments for better performance
        post = get_object_or_404(
            Post.objects.prefetch_related('comment_set').all(), 
            id=post_id
        )
        return post

comment_list_view = CommentListView.as_view()