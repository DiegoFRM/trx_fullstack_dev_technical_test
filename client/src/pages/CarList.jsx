import banner from "../assets/nissan_banner.jpg";
import { useEffect, useState } from "react";
import { useCars } from "../context/CarContext";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { mapIcon } from "../components/icons";

function CarList() {
  const { getCars, Cars } = useCars();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getCars()
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "BRAND", headerName: "Marca", width: 100 },
    { field: "MODEL", headerName: "Modelo", width: 130 },
    { field: "YEAR", headerName: "Año", width: 130 },
    { field: "COLOR", headerName: "Color", width: 130 },
    { field: "placa", headerName: "Placa", width: 130 },
    { field: "asientos", headerName: "Asientos", width: 130 },
    { field: "numero_economico", headerName: "Número económico", width: 130 },
  ];

  function modalCar(_id) {
    console.log(_id)
    const object = Cars.find(element => element.id === _id[0]);
    console.log(object)
    function renderHTML() {
      let html = "";

      for (let propiedad in object) {
        if (object.hasOwnProperty(propiedad)) {
          if (
            propiedad != "viajes" && propiedad != "createdAt" && propiedad !="updatedAt" && propiedad !="__v" && propiedad !="id"
          ) {
            html +=
              "<li><b>" +
              propiedad.replace('_', " ").toUpperCase() +
              ": </b> " +
              "<input value='" +
              object[propiedad] +
              "'/></li>";
          }
        }
      }
      return html;
    }

    Swal.fire({
      title: "<strong>" + object.BRAND.toUpperCase() + "</strong>",
      html: "<ul class='text-left'>" + renderHTML() + "</ul>",

      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: `
      <i class="fa fa-thumbs-up"></i> Ver rutas
        `,
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "/mappage/" + object.id
        }
      });
  }

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="container mx-auto px-4">
          <img className="w-full" src={banner} />
          <div className="bg-zinc-500">
            <DataGrid
              className="table-style"
              disableColumnMenu
              columns={columns}
              rows={Cars}
              onRowSelectionModelChange={(newRowSelectionModel) =>
                modalCar(newRowSelectionModel)
              }
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CarList;
