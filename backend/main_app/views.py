from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth.models import User
from django.http import JsonResponse
# from .forms import RegisterForm
from .models import UserProgress
import json

def check(request):
    return JsonResponse({"message": "Backend is OK"})

def check_auth(request):
    if request.user.is_authenticated:
        # Return user profile data if authenticated
        user = request.user
        user_profile = {
                "username": user.username,
                "email": user.email,
                "date_joined": str(user.date_joined).split(" ")[0]
            }
        return JsonResponse({"isAuthenticated": True, "userProfile": user_profile})
    else:
        # Return JSON for unauthenticated users
        return JsonResponse({"isAuthenticated": False, "userProfile": None})


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"message":"CSRF cookie set"})

def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if data["password"] == data["confirmPassword"]:
            user = User.objects.create(username=data["username"], email=data["email"])
            user.set_password(data["password"])
            user.save()
            login(request, user)
            return JsonResponse({
                'success': True,
                'message': 'Register successfully',
            }, status=200)
        else:
            return JsonResponse({
                'success': False,
                'message': "Password doesn't equal confirmed password",
            }, status=400)
    return JsonResponse({
                'success': False,
                'message': 'Only POST requests are allowed',
            }, status=405)

@ensure_csrf_cookie
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        username = data['username']
        password = data['password']
                
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user is not None:
            login(request, user)
            
            # JSON response for successful login
            return JsonResponse({
                'success': True,
                'message': 'Login successful',
                'next': request.POST.get('next', '/')  # Send next URL or default to root
            }, status=200)
        else:
            # JSON response for failed login
            return JsonResponse({
                'success': False,
                'error': 'Invalid username or password'
            }, status=400)
    
    # Method not allowed
    return JsonResponse({
        'success': False,
        'error': 'Only POST requests are allowed'
    }, status=405)

@require_POST
def logout_view(request):
    logout(request)
    return JsonResponse({"success": True, "message": "Logout successful"})
    
@login_required
def profile_view(request):
    return render(request, 'profile.html', {'logged_in': request.user.is_authenticated})

def index_view(request):
    return render(request, 'index.html', {'logged_in': request.user.is_authenticated})

def aboutus_view(request):
    return render(request, 'aboutus.html', {'logged_in': request.user.is_authenticated})

@login_required
def courses_view(request):
    return render(request, 'courses.html', {'logged_in': True})

@login_required
def decom_view(request):
    return render(request, 'decom.html', {'logged_in': True, 'user_id': request.user.id})

@require_POST
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
@login_required
def get_progress(request):
    exercise_id = "decomposition"
    try:
        # Get the user's progress for the specific exercise
        user_progress = UserProgress.objects.get(user=request.user, exercise_id=exercise_id)
        # Prepare the data to return as JSON
        print(user_progress.progress)
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
        # Return empty progress if no record exists for the user
        return JsonResponse({"items": [], "completed": False})

def comingsoon_view(request):
    return render(request, 'comingsoon.html', {'logged_in': request.user.is_authenticated})
