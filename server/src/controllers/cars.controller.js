import Car from "../models/car.model.js";

export const getCars = async (req, res) => {
  const Cars = await Car.find();
  res.json(Cars);
};
export const createCar = async (req, res) => {
  const {
    placa,
    numero_economico,
    vin,
    asientos,
    seguro_nombre,
    seguro_numero,
    BRAND,
    MODEL,
    YEAR,
    COLOR,
  } = req.body;

  const newCar = new Car({
    placa,
    numero_economico,
    vin,
    asientos,
    seguro_nombre,
    seguro_numero,
    BRAND,
    MODEL,
    YEAR,
    COLOR,
  });

  const savedCar = await newCar.save();
  res.json(savedCar);
};


export const searchCar = async (req,res) =>{
  const queryString = req.query
  const car = await Car.find(queryString)
  console.log(car)
  if (!car || car == "") return res.status(404).json({ message: "cars not found" });
  res.json(car);
}

export const getCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: "car not found" });
  res.json(car);
};

export const deleteCar = async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);
  if (!car) return res.status(404).json({ message: "car not found" });
  res.json(car);
};

export const updateCar = async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!car) return res.status(404).json({ message: "car not found" });
  res.json(car);
};
