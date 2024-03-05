import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCars } from "../context/CarContext";
import Swal from "sweetalert2"

function Carform() {
  const { register, handleSubmit, reset  } = useForm();
  const { createCar } = useCars();

  const onSubmit = handleSubmit(async (values) => {
    const  coordenadas = [{lat:Number,lng:Number}];
    console.log("Registrar AUTO 3");
    values["viajes"] = {"coordenadas":coordenadas} 
    console.log(values)
    //reset();
    //createCar(values);
    Swal.fire("¡Se registro con éxito el auto!");

  });

  return (
    <div>
      <div className="div-register">
        <div className="flex min-h-[92vh]">
          <div className="w-full min-h-fit bg-black bg-car-bg-register bg-no-repeat bg-cover bg-center"></div>
          <div className="bg-zinc-800  container  p-10 rounded-md">
            <h1 className="font-bold text-white text-2xl mb-3">
              Ingresar nuevo auto
            </h1>
            <form onSubmit={onSubmit} className="">
              <div className="columns-1 md:columns-3">
                <input
                  type="text"
                  {...register("BRAND", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="Marca del Auto"
                />

                <input
                  type="text"
                  {...register("MODEL", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="Modelo"
                />

                <input
                  type="number"
                  {...register("YEAR", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="Año del auto"
                />

                <input
                  type="string"
                  {...register("COLOR", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="Color"
                />
                <input
                  type="text"
                  {...register("placa", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="Placa"
                />

                <input
                  type="text"
                  {...register("numero_economico", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="numero economico"
                />
                <input
                  type="text"
                  {...register("vin", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="VIN"
                />
                <input
                  type="number"
                  {...register("asientos", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="asientos"
                />
                <input
                  type="text"
                  {...register("seguro_nombre", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="Seguro"
                />
                <input
                  type="number"
                  {...register("seguro_numero", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="Número de seguro"
                />
              </div>
              <button
                className="bg-cyan-800 py-1 px-4 rounded-sm mt-3"
                type="submit"
              >
                Registrar Auto
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carform;
