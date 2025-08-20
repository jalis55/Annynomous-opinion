import json
from channels.generic.websocket import AsyncWebsocketConsumer


class HomeConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "homepage"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def post_created(self, event):
        await self.send(text_data=json.dumps(event["post"]))