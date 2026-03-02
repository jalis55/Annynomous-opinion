import json
from channels.generic.websocket import AsyncWebsocketConsumer


class HomeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "homepage"
        print("===============test==================", self.channel_name)
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def post_created(self, event):
        await self.send(text_data=json.dumps(event["post"]))


class PostDetailConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.post_id = self.scope["url_route"]["kwargs"]["post_id"]
        self.group_name = f"post_{self.post_id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def comment_created(self, event):
        await self.send(text_data=json.dumps(event["comment"]))