import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import User from '../models/user.model.js';

const meterRouter = express.Router();

meterRouter.post('/add', (req, res) => {
   const { email, meterId, serialNumber } = req.body;
   // Logic to add a new meter
   const user = User.findByIdAndUpdate({ email },
      { [`meter${meterId}`]: serialNumber },
      { new: true })
   res.status(201).json({ message: 'Meter added successfully', meterId });
});



export default meterRouter;
