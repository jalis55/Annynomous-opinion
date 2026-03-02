from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostContentSerializer
from .helpers import check_content

# # Create your views here.
class PostCheckerView(APIView):
    def get(self, request, format=None):
        # Handle GET requests
        data = {"message": "This is a GET request"}
        return Response(data)
    def post(self, request, *args, **kwargs):
        serializer = PostContentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)   # DRF will auto-return 400 on error
        # here you *use* the validated data, e.g. create a model instance
        # instance = serializer.save()

        gen_response=check_content(serializer.validated_data['content'])

        return Response(
            {"message": "Post created", "data": gen_response},
            status=201
        )