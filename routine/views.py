import json
from datetime import datetime
from django.contrib.auth.models import User
from .models import Routine, Exercise, SetDone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.tokens import AccessToken
from .decorators import jwt_cookie_auth_required

# Create your views here.

# ---- Routines -----

# @login_required
@jwt_cookie_auth_required
def get_routines(request):
    if request.method == "GET":
        user = request.user

        routines = Routine.objects.filter(user=user)
        routines = list(routines.values(
            'id', 'name', 'is_active', 'created_at'))
        if not routines:
            return JsonResponse({"message": "Routines not yet"}, status=201)
        return JsonResponse({"routines": routines}, status=200)

    return JsonResponse({"message": "Invalid request method"}, status=400)

@jwt_cookie_auth_required
def get_routine_active(request):
    if request.method == "GET":
        try:
            user = request.user
            routines_from_user = Routine.objects.filter(user=user)
            routine_active = routines_from_user.filter(is_active=True).first()
            if routine_active:
                return JsonResponse({"routine_active": {
                    "id": routine_active.id,
                    "name": routine_active.name,
                    "is_active": routine_active.is_active,
                    "created_at": routine_active.created_at
                }}, status=200)
            return JsonResponse({"message": "Routines not yet"}, status=201)
        except Routine.DoesNotExist:
            return JsonResponse({"message": "Routine not found"}, status=404)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    return JsonResponse({"message": "Invalid request method"}, status=405)


# @login_required
@csrf_exempt
@jwt_cookie_auth_required
def create_routine(request):
    if request.method == "POST":

        try:
            user = request.user

            routines_from_user = Routine.objects.filter(user=user)
            routine_active = routines_from_user.filter(is_active=True).first()
            
            data = json.loads(request.body)
            routine_name = data["name"]
            is_active = False 
            if not routine_active:
                is_active = True
            routine = Routine.objects.create(
                name=routine_name, is_active=is_active, user=user)
            print(routine)
            return JsonResponse({"routine": {
                "id": routine.id,
                "name": routine.name,
                "is_active": routine.is_active,
                "created_at": routine.created_at
            }}, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)

# @login_required
@csrf_exempt
@jwt_cookie_auth_required
def activate_routine(request, routine_id):
    if request.method == "PUT":
        try:
            user = request.user

            routines_from_user = Routine.objects.filter(user=user)
            if not routines_from_user:
                return JsonResponse({"message": "You have no routines yet"}, status=400)

            # Find the current active routine
            routine_active = routines_from_user.filter(is_active=True).first()

            # Check if the user is authorized to deactivate this routine
            if routine_active:
                if routine_active.user != user:
                    return JsonResponse({"message": "You are not authorized to activate this routine"}, status=403)

                # Deactivate the current active routine
                routine_active.is_active = False
                routine_active.save()

            # Activate the selected routine and return a success response
            routine = Routine.objects.get(id=routine_id)
            if routine.user != user:
                return JsonResponse({"message": "You are not authorized to activate this routine"}, status=403)
            routine.mark_active()
            return JsonResponse({"message": "Routine activated successfully", "routine" : {
                "id": routine.id,
                "name": routine.name,
            }}, status=201)
        except Routine.DoesNotExist:
            return JsonResponse({"message": "Routine not found"}, status=404)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)

# @login_required
@csrf_exempt
@jwt_cookie_auth_required
def delete_routine(request, routine_id):
    if request.method == "DELETE":
        try:
            user = request.user

            # Find the routine
            routine = Routine.objects.get(id=routine_id)

            # Check if the user is authorized to delete this routine
            if routine.user != user:
                return JsonResponse({"message": "You are not authorized to delete this routine"}, status=403)

            # Delete the routine and return a success response
            routine.delete()
            return JsonResponse({"message": "Routine deleted successfully"}, status=200)
        except Routine.DoesNotExist:
            return JsonResponse({"message": "Routine not found"}, status=404)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)



# # ---- Exercises -----

# @login_required
def get_exercises(request, routine_id):
    if request.method == "GET":

        routine_found = Routine.objects.get(id=routine_id)
        
        if not routine_found:
            return JsonResponse({"message": "Routine not found"}, status=404)

        exercises = Exercise.objects.filter(routine=routine_found)

        exercises_list =[]
        for exercise in exercises:
            setsDone = list(SetDone.objects.filter(exercise=exercise).values("id", "done"))
            exercise_data={
                "id": exercise.id,
                "name": exercise.name,
                "description": exercise.description,
                "day": exercise.day,
                "sets": exercise.sets,
                "reps": exercise.reps,
                "sets_Done": setsDone,
                "routine": exercise.routine.id,
                "created_at": exercise.created_at
            }
            exercises_list.append(exercise_data)
        
        if not exercises:
            return JsonResponse({"message": "Exercises not yet"}, status=201)
        return JsonResponse({"exercises": exercises_list}, status=200)

    return JsonResponse({"message": "Invalid request method"}, status=400)

def get_exercise(request, routine_id, exercise_id):
    if request.method == "GET":
        
        try:
            exercise = Exercise.objects.get(id=exercise_id)
            setsDone = list(SetDone.objects.filter(exercise=exercise).values("id", "done"))
            exercise_data={
                "id": exercise.id,
                "name": exercise.name,
                "description": exercise.description,
                "day": exercise.day,
                "sets": exercise.sets,
                "reps": exercise.reps,
                "sets_Done": setsDone,
                "routine": exercise.routine.id,
                "created_at": exercise.created_at
            }
            return JsonResponse({"exercise": exercise_data}, status=200)
        except Exercise.DoesNotExist:
            return JsonResponse({"message": "Exercise not found"}, status=404)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    return JsonResponse({"message": "Invalid request method"}, status=400)

# @login_required
@csrf_exempt
def add_exercise(request, routine_id):
    if request.method == "POST":

        try:

            # Get the data from the request
            data = json.loads(request.body)
            exercise_name = data["name"]
            description = data["description"]
            day = data["day"]
            sets = data["sets"]
            reps = data["reps"]

            # Find the routine
            routine_found = Routine.objects.get(id=routine_id)


            if not routine_found:
                return JsonResponse({"message": "Routine not found"}, status=404)

            # Create the exercise and return a success response
            exercise = Exercise.objects.create(
                name=exercise_name, description=description, day=day.upper(), sets=sets, reps=reps, routine=routine_found)

            for i in range(sets):
                SetDone.objects.create(
                    exercise=exercise)
            return JsonResponse({"exercise": {
                "id": exercise.id,
                "name": exercise.name,
                "description": exercise.description,
                "day": exercise.day,
                "sets": exercise.sets,
                "reps": exercise.reps,
                "routine": exercise.routine.name,
                "created_at": exercise.created_at}}, status=201)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)

@csrf_exempt
def update_exercise(request, routine_id, exercise_id):
    if request.method == "PUT":
        try:
            # Get the data from the request
            data = json.loads(request.body)
            name = data["name"]
            description = data["description"]
            day = data["day"]
            sets = data["sets"]
            reps = data["reps"]

            # Find the exercise
            exercise = Exercise.objects.get(id=exercise_id)

                    # Check if the user is authorized to update this exercise
            if exercise.routine.id != routine_id:
                return JsonResponse({"message": "You are not authorized to update this routine exercise"}, status=403)

            # Update the exercise and return a success response
            exercise.name = name
            exercise.description = description
            exercise.day = day.upper()
            exercise.sets = sets
            exercise.reps = reps
            exercise.save()

            # update the sets in set done
            old_sets = SetDone.objects.filter(exercise=exercise)
            if old_sets.count() > sets:
                for i in range(sets, old_sets.count()):
                    old_sets[i].delete()
            elif old_sets.count() < sets:
                for i in range(old_sets.count(), sets):
                    SetDone.objects.create(exercise=exercise)

            return JsonResponse({"message": "Exercise updated successfully"}, status=201)

        except Exercise.DoesNotExist:
            return JsonResponse({"message": "Exercise not found"}, status=404)

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)

# @login_required
@csrf_exempt
def delete_exercise(request, routine_id, exercise_id):
    if request.method == "DELETE":
        try:
            # Find the exercise
            exercise = Exercise.objects.get(id=exercise_id)

            if exercise.routine.id != routine_id:
                return JsonResponse({"error": "Exercise does not belong to the routine!"})

            # Delete the exercise and return a success response
            exercise.delete()
            return JsonResponse({"message": "Exercise deleted successfully"}, status=200)
        except Exercise.DoesNotExist:
            return JsonResponse({"message": "Exercise not found"}, status=404)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)



#  ---- Sets ----

@csrf_exempt
def get_sets_from_exercise(request, routine_id, exercise_id):
    if request.method == "GET":
        try:
            exercise = Exercise.objects.get(id=exercise_id)
            sets = SetDone.objects.filter(exercise=exercise)
            sets = list(sets.values("id", "done", "exercise"))
            return JsonResponse({"sets": sets}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def mark_done_set(request, routine_id, exercise_id, set_id):
    if request.method == "PUT":
        try:
            # Find the set
            set_done = SetDone.objects.get(id=set_id)

            # Find the routine exercise
            exercise = Exercise.objects.get(
                id=exercise_id)

            # Check if set is part of the routine exercise
            if set_done.exercise.id != exercise_id or exercise.routine.id != routine_id:
                return JsonResponse({"message": "You are not authorized to mark this set as done"}, status=403)

            # Check if the set is already marked as done
            if set_done.done:
                return JsonResponse({"message": "Set already marked as done"}, status=400)

            completed_sets = 0
            # Mark the set as done
            set_done.mark_done()

            # Check if the routine exercise is completed
            all_sets = SetDone.objects.filter(
                exercise=exercise)
            for set_d in all_sets:
                if set_d.done:
                    completed_sets += 1

            # Return a success response
            return JsonResponse({"message": "Set marked as done"}, status=200)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=400)

@csrf_exempt
def mark_not_done_all_set(request, routine_id):
    if request.method == "PUT":
        try:
            exercises = Exercise.objects.filter(routine=routine_id)
            sets_done = SetDone.objects.filter(exercise__in=exercises)
            # print(sets_done.values())
            for set_d in sets_done:
                set_d.mark_not_done()
                
            return JsonResponse({"message": "Set marked as not done"}, status=200)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)
    else:
        return JsonResponse({"message": "Invalid request method"}, status=405)
    













""" 
PYTHON SHELL COMMANDS

from django.contrib.auth.models import User
from routine.models import Routine, Exercise, SetDone

user = User.objects.get(pk=1)
routine = Routine.objects.get(pk=1)
routine.mark_active()
exercise = Exercise.objects.get(pk=1)
set_done= SetDone.objects.get(pk=5)
set_done.mark_done()

"""