import express from "express";
import {
  createBooking,
  getBookingsByUser,
  getBookingsByMentor,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/user/:userId", getBookingsByUser);

router.get("/mentor/:mentorId", getBookingsByMentor);

router.put("/:id/status", updateBookingStatus);

export default router;
