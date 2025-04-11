USE workout_tracker_db;
SELECT *
FROM routine_exercise;
DELETE FROM routine_exercise WHERE id = 13;
SELECT *
FROM routine_exercise;