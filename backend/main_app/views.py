from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import UserProgress
import json
import logging

logger = logging.getLogger(__name__)

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def check(request):
    return JsonResponse({"message": "Backend is OK"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
    # Use JWT token to verify authentication
    user = request.user
    user_profile = {
        "username": user.username,
        "email": user.email,
        "date_joined": str(user.date_joined).split(" ")[0]
    }
    return JsonResponse({"isAuthenticated": True, "userProfile": user_profile})

@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if data["password"] == data["confirmPassword"]:
            user = User.objects.create(username=data["username"], email=data["email"])
            user.set_password(data["password"])
            user.save()

            tokens = get_tokens_for_user(user)
            return JsonResponse({
                'success': True,
                'message': 'Registration successful',
                'tokens': tokens,  # Contains 'access' and 'refresh'
                'user_profile': {  # Include user profile data if needed
                    'username': user.username,
                    'email': user.email,
                    'date_joined': str(user.date_joined).split(" ")[0]
                }
            }, status=200)
        else:
            return JsonResponse({
                'success': False,
                'message': "Password doesn't match confirmed password",
            }, status=400)
    return JsonResponse({
        'success': False,
        'message': 'Only POST requests are allowed',
    }, status=405)

@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            tokens = get_tokens_for_user(user)
            return JsonResponse({
                'success': True,
                'message': 'Login successful',
                'tokens': tokens,  # Contains 'access' and 'refresh'
                'user_profile': {  # Include user profile data if needed
                    'username': user.username,
                    'email': user.email,
                    'date_joined': str(user.date_joined).split(" ")[0]
                }
            }, status=200)
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid username or password'
            }, status=400)
    return JsonResponse({
        'success': False,
        'error': 'Only POST requests are allowed'
    }, status=405)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    # With JWT, logout can simply be handled client-side by removing the token
    return JsonResponse({"success": True, "message": "Logout successful"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_progress(request):
    data = json.loads(request.body)
    exercise_id = data['exerciseId']
    items = data['items']
    completed = data['completed']
    reset = data['reset']

    progress, created = UserProgress.objects.update_or_create(
        user=request.user,
        exercise_id=exercise_id,
        defaults={'progress': items, 'completed': completed, 'reset': reset}
    )
    return JsonResponse({'status': 'success'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_progress(request):
    exercise_id = "decomposition"
    try:
        user_progress = UserProgress.objects.get(user=request.user, exercise_id=exercise_id)
        progress_data = {
            "items": [
                {"id": item["id"], "category": item.get("category", "main-recipe")}
                for item in user_progress.progress
            ],
            "completed": user_progress.completed,
            "reset": user_progress.reset
        }
        return JsonResponse(progress_data)
    except UserProgress.DoesNotExist:
        return JsonResponse({"items": [], "completed": False})