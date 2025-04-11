from django.urls import path
from . import views

urlpatterns = [
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("profile", views.get_user, name="profile"),
    path("token/refresh", views.token_refresh, name="token-refresh"),
]
