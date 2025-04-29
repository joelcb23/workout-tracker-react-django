import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, TokenError
from routine.decorators import jwt_cookie_auth_required


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create your views here.


@csrf_exempt
@ensure_csrf_cookie
def register(request):
    if request.method == "POST":
        try:
            # Get the data from the request
            data = json.loads(request.body)
            username = data["username"]
            email = data["email"]
            password = data["password"]
            confirm_password = data["confirmPassword"]

            # Validate the data
            if not username or not email or not password or not confirm_password:
                return JsonResponse({"message": "All fields are required"})

            # Check if the username already exists
            username_exists = User.objects.filter(username=username).exists()
            if username_exists:
                return JsonResponse({"error": "Username already exists"}, status=400)

            # Compare the passwords
            if password != confirm_password:
                return JsonResponse({"message": "Passwords do not match"}, status=400)

            # Create the user and return a success response
            user = User.objects.create_user(
                username=username, email=email, password=password)
            user.save()

            # Generate JWT tokens
            tokens = get_tokens_for_user(user)

            response = JsonResponse({"message": "Login successful"},
                                    )
            response.set_cookie("access_token", tokens["access"], httponly=True, secure=False, samesite='Lax')
            response.set_cookie("refresh_token", tokens["refresh"], httponly=True, secure=False, samesite='Lax')
            return response

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)


@csrf_exempt
@ensure_csrf_cookie
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data["username"]
            password = data["password"]

            if not username or not password:
                return JsonResponse({"error": "All fields are required"}, status=400)

            user = authenticate(request, username=username, password=password)
            if user is None:
                return JsonResponse({"error": "Invalid credentials"}, status=400)
            login(request, user)
            
            tokens = get_tokens_for_user(user)

            response = JsonResponse({"message": "Login successful"})
             # Acceso temporal (5 min) y refresh más largo (1 día por defecto)
            response.set_cookie(
                key="access_token",
                value=tokens["access"],
                httponly=True,
                secure=True,  # cambia a True en producción con HTTPS
                samesite="None",
                max_age=300  # opcional, 5 minutos
            )
            response.set_cookie(
                key="refresh_token",
                value=tokens["refresh"],
                httponly=True,
                secure=True,
                samesite="None",
                max_age=86400  # opcional, 1 día
            )
            return response

        except User.DoesNotExist:
            return JsonResponse({"message": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)


@csrf_exempt
def logout_view(request):
    if request.method == "POST":
        response = JsonResponse({"message": "Logout successful"})
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)


@jwt_cookie_auth_required
def get_user(request):
    if request.method == "GET":
        try:
            user = request.user
            return JsonResponse({"message": "User authenticated", "username": user.username, "email": user.email}, status=200)

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=401)

    return JsonResponse({"message": "Invalid request method"}, status=400)


@csrf_exempt
def token_refresh(request):
    if request.method != "POST":
        return JsonResponse({"message": "Invalid request method"}, status=405)

    try:
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return JsonResponse({"error": "Refresh token not found"}, status=401)

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)

            response = JsonResponse({"message": "Token refreshed successfully"})
            response.set_cookie(
                key="access_token",
                value=new_access_token,
                httponly=True,
                secure=False,  # Cambia a True si usas HTTPS
                samesite="Lax",
                max_age=300  # 5 minutos, o el tiempo que quieras
            )

            return response

        except TokenError as e:
            return JsonResponse({"error": "Invalid or expired refresh token"}, status=401)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
