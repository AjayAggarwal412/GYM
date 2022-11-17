const express = require("express");
const {
  getClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getClients);
router.route("/create").post(protect, createClient);
router
  .route("/:id")
  .get(getClientById)
  .put(protect, updateClient)
  .delete(protect, deleteClient);

module.exports = router;
