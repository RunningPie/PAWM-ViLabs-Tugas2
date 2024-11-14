from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/check-auth/', views.check_auth, name='check-auth'),
    path('api/get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),
    path('api/register/', views.register_view, name='register'),
    # path('profile/', views.profile_view, name='profile'),
    # path('aboutus/', views.aboutus_view, name='aboutus'),
    # path('courses/', views.courses_view, name='courses'),
    # path('decom/', views.decom_view, name='decom'),
    # path('comingsoon/', views.comingsoon_view, name='comingsoon'),
    path('api/save_progress/', views.save_progress, name='save_progress'),
    path('api/get_progress/', views.get_progress, name='get_progress')
]