from rest_framework import serializers
from api.models import Post, Comment

class CommentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['comment_content', 'created_at']
        read_only_fields = ('id', 'created_at')

# class CommentListSerializer(serializers.Serializer):
#     post=serializers.IntegerField()
#     comments = CommentDetailSerializer(many=True, read_only=True)
    
#     class Meta:
#         model = Post
#         fields = ['id', 'post_content', 'created_at', 'comments']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','post_content','created_at']
        read_only_fields=["id","created_at"]

    def validate_post_content(self, value):
        if len(value) == 0:
            raise serializers.ValidationError("Post content can not be empty")
        if len(value) > 350:
            raise serializers.ValidationError("Post content length exceed")
        return value

class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['post', 'comment_content', 'created_at']
        read_only_fields = ('id', 'created_at')

class CommentListSerializer(serializers.Serializer):
    post = serializers.IntegerField(source='id')  # Use source to get the post ID
    comments = CommentDetailSerializer(many=True, source='comment_set')  # Use the reverse relation
    
    class Meta:
        fields = ['post', 'comments']