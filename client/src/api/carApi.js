import { useParams } from "react-router-dom";
import axios from "./axios";


export const CarsRequest = (data) => axios.get("/cars");
export const createCarRequest = (car) => axios.post("/cars", car);
