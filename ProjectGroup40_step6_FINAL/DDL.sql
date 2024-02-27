CREATE TABLE genres(
    genre_id int AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    genre_title varchar(50) NOT NULL,
    genre_description varchar(250)
);

INSERT INTO genres(genre_title)
VALUES
('Comedy'),
('Action'),
('Romance'),
('Horror');

CREATE TABLE directors(
    director_id int AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    director_firstname varchar(100) NOT NULL,
    director_lastname varchar(100) NOT NULL,
    gender varchar(1) NOT NULL,
    movies_directed int NOT NULL
);

INSERT INTO directors(director_firstname, director_lastname, gender, movies_directed)
VALUES
('John', 'Doe', 'Male', 2),
('Jane', 'Doe', 'Female', 3),
('Peter', 'Jackson', 'Male', 10);

CREATE TABLE movies(
    movie_id INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    movie_title varchar(200) NOT NULL,
    studio_id int NOT NULL,
    genre_id int NOT NULL,
    release_date DATE,
    FOREIGN KEY (studio_id) REFERENCES studios(studio_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

INSERT INTO movies(movie_title, studio_id, genre_id, release_date)
VALUES
('John Doe Strikes Back', 1, 1, '1994-01-01'),
('Jane', 2, 2, '1996-02-02'),
('Peter', 3, 3, '2001-12-19');

CREATE TABLE studios (
    studio_id INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    studio_name varchar(100) NOT NULL,
    founded_date DATE
);

INSERT INTO studios(studio_name, founded_date)
VALUES
('John Doe Studios', '2005-01-01'),
('Jane Doe Studios', '2006-02-02'),
('New Line Cinemas', '1967-01-01');

CREATE TABLE movie_genres (
    movie_id INT NOT NULL,
    movie_title VARCHAR(200),
    genre_id INT NOT NULL,
    genre_title VARCHAR(50)
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (movie_title) REFERENCES movies(movie_title),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id),
    FOREIGN KEY (genre_title) REFERENCES genres(genre_title)
);

INSERT INTO movie_directors (movie_id, director_id)
VALUES 
(1, 'John Doe Strikes Back', 2, 'Action'),
(2, 'Jane Doe Revenge',2,'Action'),
(3, 'Cars', 1, 'Comedy');
