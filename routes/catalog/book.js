const express = require("express");
const router = express.Router();

const book_controller = require("./../../controllers/bookController");

router.get("/", book_controller.index);
router.get("/book/create", book_controller.book_create_get);
router.post("/book/create", book_controller.book_create_post);
router.get("/book/:id/delete", book_controller.book_delete_get);
router.post("/book/:id/delete", book_controller.book_delete_post);
router.get("/book/:id/update", book_controller.book_update_get);
router.post("/book/:id/update", book_controller.book_update_post);
router.get("/book/:id", book_controller.book_detail);
router.get("/books", book_controller.book_list);

module.exports = router;
