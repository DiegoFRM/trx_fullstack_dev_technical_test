import banner from "../assets/nissan_banner.jpg";
import { useEffect, useState } from "react";
import { useCars } from "../context/CarContext";
import { DataGrid,GridToolbarFilterButton,GridLogicOperator   } from "@mui/x-data-grid";


function CarList() {
  const { getCars, Cars } = useCars();
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    getCars()
      .then(response => {
        console.log(response)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
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
              disableRowSelectionOnClick
              disableColumnMenu
              
              columns={columns}
              rows={Cars}
              
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
