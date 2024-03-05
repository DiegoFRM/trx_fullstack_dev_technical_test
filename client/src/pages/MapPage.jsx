import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useCars } from "../context/CarContext";

const center = { lat: 19.3821393, lng: -99.0267164 };

function mapRouteCar() {
  const params = useParams();
  const { getCar, updateCar } = useCars();
  const [loading, setLoading] = useState(true);
  const [carCurrent, setcarCurrent] = useState({});

  function loadCar() {
    getCar(params.id)
      .then((response) => {
        setcarCurrent(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadCar();
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCfSVt9yzQi-iyo-XkzGjX8Ez7Vsk-tQew",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destiantionRef = useRef();

  if (!isLoaded) {
    return;
  }
  const directionsService = new google.maps.DirectionsService();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  async function saveRoute() {
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const latitud = results.routes[0].legs[0].start_location.lat();
    const longitud = results.routes[0].legs[0].start_location.lng();
    const startorigin = originRef.current.value;
    const endDestination = destiantionRef.current.value;

    carCurrent.viajes.coordenadas.push({
      lat: latitud,
      lng: longitud,
      origin: startorigin,
      destination: endDestination,
    });
    updateCar(params.id, carCurrent);
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  async function loadRoute(originRoute, destiRoute) {
    clearRoute();
    
    const results = await directionsService.route({
      origin: originRoute,
      destination: destiRoute,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(null);
    setDirectionsResponse(results);
  }

  return (
    <div className=" w-full columns-2 flex">
      <div className=" h-96 mb-4 w-1/2 mx-4">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>

        <div className="p-10 bg-white text-black mt-2">
          <div>
            <div className="columns-2 pb-3">
              <Autocomplete>
                <input
                  className="p-2 border-zinc-200"
                  type="text"
                  placeholder="Punto de partida"
                  ref={originRef}
                />
              </Autocomplete>
              <Autocomplete>
                <input
                  className="p-2 border-zinc-200"
                  type="text"
                  placeholder="Destino"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-pink-500 p-3 rounded-xl text-white"
                type="submit"
                onClick={calculateRoute}
              >
                Calcular Ruta
              </button>
              <button
                className="bg-cyan-500 p-2 rounded-xl text-white"
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                }}
              >
                Centrar
              </button>
              <button
                className="bg-pink-700 p-3 rounded-xl text-white"
                onClick={clearRoute}
              >
                borrar datos
              </button>
            </div>
          </div>
          <div className="flex columns-2 justify-between pt-5">
            <div>Distancia: {distance} </div>
            <div>Duración: {duration} </div>
          </div>

          <button
            className="bg-green-500 p-3 rounded-xl text-white"
            type="submit"
            onClick={saveRoute}
          >
            Agregar Ruta
          </button>
        </div>
      </div>
      
      <div>
  
        <div>
          <div className="text-2xl flex justify-around">
            <span> Auto : {carCurrent.BRAND}</span>
            <span> Placas : {carCurrent.placa}</span>
          </div>
          <h1 className="text-4xl py-5">Rutas </h1>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              {carCurrent.viajes.coordenadas.map((element) => (
                <div className="my-1 p-10 bg-white text-black">
                  <div>
                    <b>Partida:</b> {element.origin}
                  </div>
                  <div>
                    <b>Destino:</b> {element.destination}
                  </div>
                  <button
                    className="bg-green-500 p-2 px-4 my-2 rounded-xl text-white"
                    onClick={() =>
                      loadRoute(element.origin, element.destination)
                    }
                  >
                    Ver ruta
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default mapRouteCar;
