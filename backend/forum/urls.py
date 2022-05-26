from . import views
from django.urls import path

urlpatterns = [
    path('',views.get_all_post),
    path('<int:pk>/', views.forum_post_by_id),
    path('create/',views.create_post),
    path('delete/<int:pk>/',views.delete_post)
]