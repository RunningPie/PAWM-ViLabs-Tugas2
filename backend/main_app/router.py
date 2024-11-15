from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.check, name = "health-check"),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/check-auth/', views.check_auth, name='check-auth'),
    path('api/get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),
    path('api/register/', views.register_view, name='register'),
    path('api/save_progress/', views.save_progress, name='save_progress'),
    path('api/get_progress/', views.get_progress, name='get_progress')
]