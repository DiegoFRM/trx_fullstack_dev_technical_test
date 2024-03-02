import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getCar,
  getCars,
  updateCar,
  deleteCar,
  createCar,
  searchCar,
} from "../controllers/cars.controller.js";

const router = Router();
const carParams = [
  "placa",
  "numero_economico",
  "vin",
  "asientos",
  "seguro_nombre",
  "seguro_numero",
  "BRAND",
  "MODEL",
  "YEAR",
  "COLOR",
];


for(let i = 0; i<=carParams.length-1;i++){
  router.get("/searchcar/"+carParams[i]+"/:" + carParams[i],searchCar);
}




router.get("/cars", getCars);
router.get("/cars/:id", getCar);
router.post("/cars", createCar);
router.delete("/cars/:id", deleteCar);
router.put("/cars/:id", updateCar);

/*with user log
router.get("/cars", authRequired, getCars);
router.get("/cars/:id", authRequired, getCar);
router.post("/cars", authRequired, createCar);
router.delete("/cars/:id", authRequired, deleteCar);
router.put("/cars/:id", authRequired, updateCar);
*/
export default router;
