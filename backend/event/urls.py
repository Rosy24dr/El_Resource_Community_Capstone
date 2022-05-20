from . import views
from django.urls import path

urlpatterns = [
    path('',views.get_all_events),
    path('<int:pk>/', views.forum_event_by_id),
    path('create/',views.create_event),

]