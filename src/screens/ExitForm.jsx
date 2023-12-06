import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";
import { vehicles } from "../data/Vehicle";

export const ExitForm = () => {
  const { deleteCarCell, carCells, motorcycleCells, deleteMotorcycleCell } = useContext(UserContext);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedPlate, setSelectedPlate] = useState("");
  const [errorExit, setErrorExit] = useState(false);

  console.log(carCells);errorExit

  const handlerSelectVehicle = (e) => {
    setSelectedVehicleType(e.target.innerText);
    console.log(e.target.innerText);

    if (e.target.innerText === "car") {
      setSelectedVehicleType(e.target.innerText);
    } else if (e.target.innerText === "motorcycle") {
      setSelectedVehicleType(e.target.innerText);
    }
  };

  const handleExit = () => {
    /* if (selectedVehicleType === "" || selectedPlate === "") {
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Por favor selecciona el tipo de vehiculo y la placa",
        showConfirmButton: false,
        timer: 1000,
      });
    } */
    if (selectedVehicleType === "" || selectedPlate === "") {
      setErrorExit(true);
      return;
    }

    if (selectedVehicleType === "car") {
      deleteCarCell(selectedPlate);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "El vehiculo salio correctamente",
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (selectedVehicleType === "motorcycle") {
      deleteMotorcycleCell(selectedPlate);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El vehiculo salio correctamente",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <form className="flex flex-col items-center gap-5">
      <Autocomplete
        isRequired
        label="Tipo de vehiculo"
        defaultItems={vehicles}
        placeholder="Tipo de vehiculo que saldra"
        defaultSelectedKey=""
        className="max-w-xs"
        isInvalid={errorExit}
        errorMessage={errorExit ? "Por favor selecciona el tipo de vehiculo" : ""}
      >
        {(item) => (
          <AutocompleteItem value={item.value} onClick={handlerSelectVehicle} key={item.value} className="text-black">
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        isRequired
        label="Placa de vehiculo"
        defaultItems={
          selectedVehicleType === "car"
            ? carCells
              .filter((item) => item.vehicle) // Filtrar solo vehículos no vacíos
              .map((item, index) => ({ value: item.vehicle, key: index }))
            : motorcycleCells
              .filter((item) => item.vehicle) // Filtrar solo vehículos no vacíos
              .map((item, index) => ({ value: item.vehicle, key: index }))
        }
        placeholder="Selecciona la placa del vehiculo"
        className="max-w-xs"
        isInvalid={errorExit}
        errorMessage={errorExit ? "Por favor selecciona la placa del vehiculo" : ""}
      >
        {(item) => (
          <AutocompleteItem
            onClick={(e) => setSelectedPlate(e.target.innerText)}
            value={item.value}
            key={item.key}
            className="text-black"
          >
            {item.value}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Button onClick={handleExit} className="max-w-xs" color="primary">
        Dar salida
      </Button>
    </form>
  );
};
