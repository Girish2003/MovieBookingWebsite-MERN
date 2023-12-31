import express from "express"
import { deleteBooking, getBookingsById, newBooking } from "../controllers/booking-controller";
const bookingRouter=express.Router();
bookingRouter.post('/',newBooking)
bookingRouter.get("/:id",getBookingsById);

bookingRouter.delete("/:id",deleteBooking);
export default bookingRouter;