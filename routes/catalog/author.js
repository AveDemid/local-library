const express = require("express");
const router = express.Router();

const author_controller = require("./../../controllers/authorController");

router.get("/author/create", author_controller.author_create_get);
router.post("/author/create", author_controller.author_create_post);
router.get("/author/:id/delete", author_controller.author_delete_get);
router.post("/author/:id/delete", author_controller.author_delete_post);
router.get("/author/:id/update", author_controller.author_update_get);
router.post("/author/:id/update", author_controller.author_update_post);
router.get("/author/:id", author_controller.author_detail);
router.get("/authors", author_controller.author_list);

module.exports = router;
