const async = require("async");
const validator = require("express-validator");

const Genre = require("./../models/genre");
const Book = require("../models/book");

const genre_list = (req, res) => {
  Genre.find()
    .sort([["name", "ascending"]])
    .exec(function(err, list_genres) {
      if (err) {
        next(err);
      }
      console.log(list_genres);
      res.render("genre_list", {
        title: "Genre List",
        genre_list: list_genres
      });
    });
};

const genre_detail = (req, res) => {
  async.parallel(
    {
      genre: function(callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        var err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      res.render("genre_detail", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books
      });
    }
  );
};

const genre_create_get = (req, res) => {
  res.render("genre_form", { title: "Create Genre" });
};

const genre_create_post = [
  validator
    .body("name", "Genre name required")
    .isLength({ min: 1 })
    .trim(),

  validator.sanitizeBody("name").escape(),

  (req, res, next) => {
    const errors = validator.validationResult(req);

    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array()
      });
      return;
    } else {
      Genre.findOne({ name: req.body.name }).exec(function(err, found_genre) {
        if (err) {
          return next(err);
        }

        if (found_genre) {
          res.redirect(found_genre.url);
        } else {
          genre.save(function(err) {
            if (err) {
              return next(err);
            }
            res.redirect(genre.url);
          });
        }
      });
    }
  }
];

const genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

const genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

const genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

const genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
};

module.exports = {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post
};
