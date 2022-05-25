from . import views
from django.urls import path
urlpatterns = [
    path('',views.get_all_replies),
    path('<int:pk>/', views.forum_reply_by_comment_id),
    path('create/',views.create_reply),
    path('reply/',views.reply_details),

]