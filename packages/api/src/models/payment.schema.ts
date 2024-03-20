import { model, Schema } from "mongoose";
import { Payment } from "../interface/models";

const PaymentSchema = new Schema<Payment>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  reservationId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
    enum: ["stripe", "paypal"],
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "declined", "completed", "cancelled"],
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

PaymentSchema.set("toJSON", {
  virtuals: true,
});

export default model<Payment>("Payment", PaymentSchema);
