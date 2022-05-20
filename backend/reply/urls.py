from . import views
from django.urls import path
urlpatterns = [
    path('',views.get_all_replies),
    path('<int:pk>/', views.forum_reply_by_id),
    path('create/',views.create_reply),

]