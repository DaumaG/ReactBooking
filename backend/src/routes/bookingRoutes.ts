import express from "express";
import Booking from "../models/Booking";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Extract date and time from the request body  
    const { date, time } = req.body;  
   
    // Check if there is already a booking with the same date and time  
    const existingBooking = await Booking.findOne({ date: date, time: time });  
  
    if (existingBooking) {  
      // If a booking exists, respond with an error  
      return res.status(400).json({  
        message: "A booking already exists for this date and time."  
      });  
    }  

    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({
      message: "Error creating booking",
      error: (err as Error)?.message ?? err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching bookings for the user", error: err });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const userBookings = await Booking.find({ userEmail: req.params.email });
    res.json(userBookings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching bookings for the user", error: err });
  }
});

export default router;
