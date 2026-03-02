from django.urls import path
from .views import PostCheckerView


urlpatterns = [
    path('post/checker/',PostCheckerView.as_view(),name='post-checker'),

]