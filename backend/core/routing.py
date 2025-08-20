from django.urls import re_path
from api import consumers
websocket_urlpatterns = [
re_path(r"ws/homepage/$", consumers.HomeConsumer.as_asgi()),
]