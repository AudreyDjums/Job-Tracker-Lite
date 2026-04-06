const express = require("express");
const router = express.Router();
const controller = require("../controllers/application.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");
const { applicationSchema, updateApplicationSchema } = require("../validators/application.validator");

// Toutes les routes protegees
router.use(authMiddleware);

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", validate(applicationSchema), controller.create);
router.put("/:id", validate(updateApplicationSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;