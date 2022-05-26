from . import views
from django.urls import path

urlpatterns = [
    # path('',views.get_all_favorite_events),
    path('<int:pk>/', views.favorite_event_by_comment_id),
    path('create/',views.create_favorite_event),
    path('delete/<int:pk>/',views.delete_event),
]