from django.urls import path
from . import views

urlpatterns = [
    # Routines
    path("", views.get_routines, name="get-routines"),  
    path("create", views.create_routine, name="create-routine"),
    path("active", views.get_routine_active, name="get-routine-active"),
    path("activate/<int:routine_id>", views.activate_routine, name="activate-routine"),
    path("delete/<int:routine_id>", views.delete_routine, name="delete-routine"),

    # Exercises
    path("<int:routine_id>/exercises", views.get_exercises, name="get-exercises"),
    path("<int:routine_id>/exercises/add", views.add_exercise, name="add-exercise"),
    path("<int:routine_id>/exercises/<str:day>", views.get_exercises_from_day, name="get-exercises-from-day"),
    path("<int:routine_id>/exercises/<int:exercise_id>/detail", views.get_exercise, name="get-exercise"),
    path("<int:routine_id>/exercises/<int:exercise_id>/update", views.update_exercise, name="update-exercise"),
    path("<int:routine_id>/exercises/<int:exercise_id>/delete", views.delete_exercise, name="delete-exercise"),

    # Sets
    path("<int:routine_id>/exercises/<int:exercise_id>/sets", views.get_sets_from_exercise, name="get-sets-from-exercise"),
    path("<int:routine_id>/exercises/<int:exercise_id>/sets/<int:set_id>/mark-done", views.mark_done_set, name="mark-done-set"),
    path("<int:routine_id>/sets/unmark-all", views.mark_not_done_all_set, name="unmark-all-sets"),

]
