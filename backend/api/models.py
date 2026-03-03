from django.db import models
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    post_content=models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self.id)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    comment_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Comment {self.id} on Post {self.post.id}"