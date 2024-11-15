from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('', views.check),
    path('api/register/', views.register_view),
    path('api/login/', views.login_view),
    path('api/logout/', views.logout_view),
    path('api/check-auth/', views.check_auth),
    path('api/get-progress/', views.get_progress),
    path('api/save-progress/', views.save_progress),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
