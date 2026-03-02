from django.urls import re_path
from api import consumers

websocket_urlpatterns = [
    re_path(r"ws/homepage/$", consumers.HomeConsumer.as_asgi()),
    re_path(r"ws/post/(?P<post_id>\d+)/$", consumers.PostDetailConsumer.as_asgi()),
]