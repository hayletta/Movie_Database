-- get all genders to populate the Gender dropdown 
SELECT gender from Directors

--get all Directors and their information for the director page
SELECT * FROM Directors

-- get all movies and their information for the movie page
SELECT * FROM Movies

-- get all studios and their information for the studio page
SELECT * FROM Studios

-- add a movie to the movie page
INSERT INTO Movies(movie_title, studio_id, genre_id, release_date) VALUES (:movie_titleInput, :studio_idInput, :genre_idInput, :release_dateInput)

-- add a director
INSERT INTO Directors(director_firstname, director_lastname, gender, movies_directed) VALUES (:director_firstnameInput, :director_lastnameInput, :genderInput, :movies_directedInput)

-- add a genre
INSERT INTO Genres(genre_title, genre_description) VALUES (:genre_titleInput, :genre_descriptionInput)

-- add a studio
INSERT INTO Studios(studio_name, founded_date) VALUES (:studio_nameInput, :founded_dateInput)

-- associate a movie with a director
INSERT INTO movie_genres (movie_id, movie_title, genre_id, genre_title) VALUES (:movie_idInput, movie_titleInput :director_idInput, director_titleInput)

-- update a movie based on the submission of the update movie form
UPDATE Movies SET movie_title = :movie_titleInput, studio_id = :studio_idInput genre_id = :genre_idInput, release_date = :release_dateInput
WHERE movie_id = :movie_idInput; 

-- update director based on the submission of the update director form
UPDATE Directors SET director_firstname = :director_firstnameInput, director_lastname = :director_lastnameInput, gender = :genderInput, movies_directed = :movies_directedInput
WHERE director_id = :director_idInput;

-- update genre based on the submission of the update genre form
UPDATE Genres SET genre_title = :genre_titleInput, genre_description = genre_descriptionInput
WHERE genre_id = :genre_idInput

-- update studio based on the submission of the update studio form
UPDATE Studios SET studio_name = :studio_nameInput, founded_date = :founded_dateInput 
WHERE studio_id = :studio_id;

-- delete from movies where movie id is equal to selected movie id
DELETE FROM Movies WHERE movie_id = :movie_id_selected_from_movie_page

-- delete from director
DELETE FROM Directors where director_id = :director_id_selected_from_director_page

-- delete from studio
DELETE FROM Studio where studio_id = :studio_id_selected_from_studio_page

-- delete from the m to m relationship:
DELETE FROM movie_genres WHERE movie_id = = :movie_id_selected_from_movie_and_genre_list AND genre_id = :genre_id_selected_from_movie_and_genre_list