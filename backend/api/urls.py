
from django.urls import path
from api.views import all_post_view,comment_list_view,comment_create_view

urlpatterns = [
    path('posts/',all_post_view,name='create_retreive_post'),
    path('comments/add/',comment_create_view,name='add-comments'),
    path('post/comments/<int:post_id>/', comment_list_view, name='comment_list'),
]