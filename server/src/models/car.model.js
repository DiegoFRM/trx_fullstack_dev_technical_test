import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    placa: {
      type: String,
      required: true,
      trim: true,
    },
    numero_economico: {
      type: Number,
      required: true,
      trim: true,
    },
    vin: {
      type: String,
      required: true,
      trim: true,
    },
    asientos: {
      type: Number,
      required: true,
      trim: true,
    },
    seguro_nombre: {
      type: String,
      required: true,
    },
    seguro_numero: {
      type: Number,
      required: true,
      trim: true,
    },
    BRAND: {
      type: String,
      required: true,
    },
    MODEL: {
      type: String,
      required: true,
      trim: true,
    },
    YEAR: {
      type: Number,
      required: true,
      trim: true,
    },
    COLOR: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Car", carSchema);
