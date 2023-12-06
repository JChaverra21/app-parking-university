import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";
import { vehicles } from "../data/Vehicle";

export const ExitForm = () => {
  const { deleteCarCell, carCells, motorcycleCells, deleteMotorcycleCell } = useContext(UserContext);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedPlate, setSelectedPlate] = useState("");

  console.log(carCells);

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
    if (selectedVehicleType === "car") {
      deleteCarCell(selectedPlate);
      Swal.fire({
        position: "top-end",
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
        /* isInvalid={error}
      errorMessage={error ? "Por favor selecciona el tipo de vehiculo" : ""} */
      >
        {(item) => (
          <AutocompleteItem value={item.value} onClick={handlerSelectVehicle} key={item.value} className="text-black">
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        isRequired
        label="Tipo de vehiculo"
        defaultItems={
          selectedVehicleType === "car"
            ? carCells
                .filter((item) => item.vehicle) // Filtrar solo vehículos no vacíos
                .map((item, index) => ({ value: item.vehicle, key: index }))
            : motorcycleCells
                .filter((item) => item.vehicle) // Filtrar solo vehículos no vacíos
                .map((item, index) => ({ value: item.vehicle, key: index }))
        }
        placeholder="Selecciona el vehiculo"
        className="max-w-xs"
        /* isInvalid={error}
      errorMessage={error ? "Por favor selecciona el tipo de vehiculo" : ""} */
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
      {/* <Input
        isRequired
        name="value"
        type="text"
        label="placa"
        placeholder="ingrese la placa del vehiculo que saldra"
        value={value}
        onChange={handleChange}
        className="max-w-xs text-black mb-3"
      // isInvalid={error}
      // errorMessage={error ? "Por favor ingresa la cédula del usuario" : ""}
      /> */}
      <Button onClick={handleExit} className="max-w-xs" color="primary">
        Dar salida
      </Button>
    </form>
  );
};
