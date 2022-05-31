from . import views
from django.urls import path
urlpatterns = [
    path('',views.get_all_comments),
    path('<int:pk>/', views.forum_comment_by_id),
    path('create/',views.create_comment),
    path('edit/<int:pk>/',views.edit_comment_by_id),
    path('delete/<int:pk>/',views.delete_comment)

]