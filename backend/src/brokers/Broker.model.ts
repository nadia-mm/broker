import { Schema, model } from "mongoose";

type TBroker = {
  name: string;
  address: string;
  city: string;
  country: string;
};

const brokerSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

brokerSchema.index({ name: 1 });

export default model<TBroker>("Broker", brokerSchema);
