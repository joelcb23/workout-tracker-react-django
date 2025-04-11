
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Routine(models.Model):
    name = models.CharField(max_length=100) # name of the routine
    is_active = models.BooleanField(default=False) # whether or not the routine is active
    user = models.ForeignKey(User, on_delete=models.CASCADE) # the user who created the routine
    created_at = models.DateTimeField(auto_now_add=True) # the date and time the routine was created

    def __str__(self):
        return f"{self.name} - {'Routine active' if self.is_active else 'Routine inactive'}"

    def mark_active(self):
        """Mark routine as active"""
        self.is_active = True
        self.save()


class Exercise(models.Model):
    name = models.CharField(max_length=100) # name of the exercise
    description = models.TextField(null=True, blank=True) # a short description of the exercise
    day = models.CharField(default="MONDAY", max_length=10)  # MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    sets = models.PositiveIntegerField(default=1) # number of sets to complete
    reps = models.PositiveIntegerField(default=1) # number of reps per set
    routine = models.ForeignKey(Routine, on_delete=models.CASCADE) # the routine this exercise belongs to
    created_at = models.DateTimeField(auto_now_add=True) # the date and time the exercise was created

    def __str__(self):
        return f"{self.routine.name}: {self.name} - {self.sets}x{self.reps}"



class SetDone(models.Model):
    done = models.BooleanField(default=False) # whether or not the set is done
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE) # the exercise this set belongs to
    created_at = models.DateTimeField(auto_now_add=True) # the date and time the set was created

    def mark_done(self):
        """Mark set as done"""
        self.done = True
        self.save()


    def mark_not_done(self):
        """Mark set as not done"""
        self.done = False
        self.save()
