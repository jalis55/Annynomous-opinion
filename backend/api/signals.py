from django.db.models.signals import post_save
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Post, Comment
from api.serializer import PostSerializer, CommentDetailSerializer

@receiver(post_save, sender=Post)
def broadcast_post(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        payload = PostSerializer(instance).data
        async_to_sync(channel_layer.group_send)(
            "homepage",
            {"type": "post_created", "post": payload},
        )

@receiver(post_save, sender=Comment)
def broadcast_comment(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        payload = CommentDetailSerializer(instance).data
        async_to_sync(channel_layer.group_send)(
            f"post_{instance.post_id}",
            {"type": "comment_created", "comment": payload},
        )