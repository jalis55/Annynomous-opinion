from django.db.models.signals import post_save
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from .models import Post
from api.serializer import PostSerializer

@receiver(post_save, sender=Post)
def broadcast_post(sender, instance, created, **kwargs):
    if created :
        channel_layer = get_channel_layer()
        payload = PostSerializer(instance).data
        async_to_sync(channel_layer.group_send)(
        "homepage",
        {"type": "post_created", "post": payload},
)