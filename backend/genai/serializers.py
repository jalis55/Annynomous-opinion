from rest_framework import serializers

class PostContentSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=1000)
   