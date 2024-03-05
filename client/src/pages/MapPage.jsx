import { useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 19.3821393, lng: -99.0267164 };

function MyComponent() {
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

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results.routes[0].legs[0].start_location.lat())
    console.log(results.routes[0].legs[0].start_location.lng())
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <div className=" w-full columns-2">
      <div className=" h-screen">
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
      </div>
      <div className="p-10 bg-white text-black">
        <div>
          <div className="columns-2 pb-3">
            <Autocomplete>
              <input className="p-2 border-zinc-200" type="text" placeholder="Punto de partida" ref={originRef} />
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
            <button className="bg-pink-700 p-3 rounded-xl text-white" onClick={clearRoute}>borrar datos</button>
          </div>
        </div>
        <div className="flex columns-2 justify-between pt-5">
          <div>Distancia: {distance} </div>
          <div>Duración: {duration} </div>
          <button
            className="bg-cyan-500 p-2 rounded-xl text-white"
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          >
            Centrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
