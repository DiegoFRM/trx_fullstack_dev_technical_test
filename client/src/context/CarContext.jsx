import { createContext, useContext, useState } from "react";
import { createCarRequest, CarsRequest } from "../api/carApi";

const CarContext = createContext();

export const useCars = () => {
    
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("UseCars must be used within a CarProvider");
  }

  return context;
};

export function CarProvider({ children }) {
    
  const [Cars, setCars] = useState([]);

  const getCars = async () => {
    try {
      const res = await CarsRequest();
      setCars(res.data);
      return res.data
    } catch (error) {
        console.log(error)
    }
  };

  const createCar = async (car) => {
    const res = await createCarRequest(car);
    console.log(res);
  };

  return (
    <CarContext.Provider
      value={{
        Cars,
        createCar,
        getCars,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
