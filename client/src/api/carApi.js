import { useParams } from "react-router-dom";
import axios from "./axios";


export const CarsRequest = (data) => axios.get("/cars");
export const CarRequest = (id) => axios.get(`/cars/${id}`);
export const createCarRequest = (car) => axios.post("/cars", car);
export const CarUpdate = (id, car) => axios.put(`/cars/${id}`, car);
