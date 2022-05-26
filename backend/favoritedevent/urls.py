from . import views
from django.urls import path

urlpatterns = [
    path('',views.get_user_favorite_events),
    path('<int:pk>/', views.favorite_event_by_event_id),
    path('create/<int:event_id>/',views.create_favorite_event),
    path('delete/<int:pk>/',views.delete_event),
]