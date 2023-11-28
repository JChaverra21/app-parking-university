import { useState } from "react";
import { Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { carBrand, carModel, motorcycleBrand, motorcycleCylinder, vehicles } from "../data/Vehicle";

const RegisterForm = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([]);
  const [brandChange, setBrandChange] = useState([]);
  const [plate, setPlate] = useState("");

  const handlerChange = (e) => {
    setPlate(e.target.value);
  };

  const handlerSelectVehicle = (e) => {
    setSelectedVehicleType(e.target.innerText);
    console.log(e.target.innerText);

    if (e.target.innerText === "car") {
      setSecondAutocompleteOptions(carModel);
      setBrandChange(carBrand);
    } else if (e.target.innerText === "motorcycle") {
      setSecondAutocompleteOptions(motorcycleCylinder);
      setBrandChange(motorcycleBrand);
    }
  };

  console.log("setAuto:", setSecondAutocompleteOptions);
  console.log("SelectedVehicleType:", selectedVehicleType);

  return (
    <form className="flex flex-col items-center gap-5">
      <Autocomplete
        isRequired
        label="Tipo de vehiculo"
        defaultItems={vehicles}
        placeholder="Busca un tipo de vehiculo"
        defaultSelectedKey=""
        className="max-w-xs"
      >
        {(item) => (
          <AutocompleteItem value={item.value} onClick={handlerSelectVehicle} key={item.value} className="text-black">
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Input
        isRequired
        name="plate"
        type="text"
        label="Placa"
        /* variant="bordered" */
        placeholder="Ingresa la placa del vehiculo"
        value={plate}
        onChange={handlerChange}
        className="max-w-xs text-black"
      />
      <Autocomplete
        isRequired
        placeholder={`Seleccione ${selectedVehicleType === "car" ? "Modelo" : "Cilindraje"}`}
        defaultItems={secondAutocompleteOptions}
        className="max-w-xs"
        /* onSelect={(value) => setSelectedValue(value)} */
      >
        {(item) => (
          <AutocompleteItem key={item.value} className="text-black">
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        isRequired
        placeholder={`Seleccione ${selectedVehicleType === "car" ? "Marca del carro" : "marca de la moto"}`}
        defaultItems={brandChange}
        className="max-w-xs"
        /* onSelect={(value) => setSelectedValue(value)} */
      >
        {(item) => (
          <AutocompleteItem key={item.value} className="text-black">
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </form>
  );
};

export default RegisterForm;
