const express = require("express");
const router = express.Router();

const book_instance_controller = require("./../../controllers/bookinstanceController");

router.get(
  "/bookinstance/create",
  book_instance_controller.bookinstance_create_get
);
router.post(
  "/bookinstance/create",
  book_instance_controller.bookinstance_create_post
);
router.get(
  "/bookinstance/:id/delete",
  book_instance_controller.bookinstance_delete_get
);
router.post(
  "/bookinstance/:id/delete",
  book_instance_controller.bookinstance_delete_post
);
router.get(
  "/bookinstance/:id/update",
  book_instance_controller.bookinstance_update_get
);
router.post(
  "/bookinstance/:id/update",
  book_instance_controller.bookinstance_update_post
);
router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);
router.get("/bookinstances", book_instance_controller.bookinstance_list);

module.exports = router;
