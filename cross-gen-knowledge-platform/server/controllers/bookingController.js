import Booking from "../models/Booking.js";


export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking", error });
  }
};

export const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings", error });
  }
};

export const getBookingsByMentor = async (req, res) => {
  try {
    const bookings = await Booking.find({ mentorId: req.params.mentorId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings", error });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking", error });
  }
};
