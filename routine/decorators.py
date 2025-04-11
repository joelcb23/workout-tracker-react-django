from functools import wraps
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User

def jwt_cookie_auth_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        access_token = request.COOKIES.get("access_token")
        if not access_token:
            return JsonResponse({"message": "Access token missing"}, status=401)

        try:
            token = AccessToken(access_token)  # Valida firma y expiración
            user_id = token["user_id"]
            user = User.objects.get(id=user_id)
            request.user = user  # Asigna el usuario a request para acceder en la vista
            return view_func(request, *args, **kwargs)
        except Exception as e:
            return JsonResponse({"message": f"Authentication failed: {str(e)}"}, status=401)

    return _wrapped_view
