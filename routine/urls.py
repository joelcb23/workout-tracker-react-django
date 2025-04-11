from django.urls import path
from . import views

urlpatterns = [
    # Routines
    path("get-routines", views.get_routines, name="get-routines"),
    path("get-routine-active", views.get_routine_active, name="get-routine-active"),
    path("create-routine", views.create_routine, name="create-routine"),
    path("activate-routine/<int:routine_id>",
         views.activate_routine, name="activate-routine"),
    path("delete-routine/<int:routine_id>",
         views.delete_routine, name="delete-routine"),

    # Exercises
    path("routine/<int:routine_id>/get-exercises",
         views.get_exercises, name="get-exercises"),
    
    path("routine/<int:routine_id>/get-exercise/<int:exercise_id>", views.get_exercise, name="get-exercise",),
    path("routine/<int:routine_id>/add-exercise",
         views.add_exercise, name="add-exercise"),
    path("routine/<int:routine_id>/update-exercise/<int:exercise_id>",
         views.update_exercise, name="update-exercise"),
    path("routine/<int:routine_id>/delete-exercise/<int:exercise_id>",
         views.delete_exercise, name="delete-exercise"),

    # Sets
    path("routine/<int:routine_id>/exercise/<int:exercise_id>/get-sets",
         views.get_sets_from_exercise, name="get-sets-from-exercise"),
    path("routine/<int:routine_id>/exercise/<int:exercise_id>/set/<int:set_id>/mark-set-done",
         views.mark_done_set, name="mark-done-set"),
    path("routine/<int:routine_id>/unmark-set-done",
         views.mark_not_done_all_set, name="unmark-done-set"),
    
]
