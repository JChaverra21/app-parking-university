import { Input, Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { vehicles } from "../data/Vehicle";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const RegisterForm = () => {
  const {
    idUser,
    plate,
    selectedVehicleType,
    secondAutocompleteOptions,
    brandChange,
    error,
    handlerSelectModel,
    handlerSelectBrand,
    handlerPlateChange,
    handlerSelectVehicle,
    handlerIdUserChange,
    handlerRegister,
    errorPlate,
  } = useContext(UserContext);

  return (
    <form className="flex flex-col items-center gap-5">
      <Input
        isRequired
        name="idUser"
        type="text"
        label="Identificación del usuario"
        /* variant="bordered" */
        placeholder="Ingresa la cédula del usuario"
        value={idUser}
        onChange={handlerIdUserChange}
        className="max-w-xs text-black"
        isInvalid={error}
        errorMessage={error ? "Por favor ingresa la cédula del usuario" : ""}
      />
      <Autocomplete
        isRequired
        label="Tipo de vehiculo"
        defaultItems={vehicles}
        placeholder="Busca un tipo de vehiculo"
        defaultSelectedKey=""
        className="max-w-xs"
        isInvalid={error}
        errorMessage={error ? "Por favor selecciona el tipo de vehiculo" : ""}
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
        onChange={handlerPlateChange}
        className="max-w-xs text-black"
        isInvalid={error}
        errorMessage={
          /* error ? "Por favor ingresa la placa del vehiculo" : "" */
          error
            ? "Por favor ingresa la placa del vehiculo"
            : errorPlate
            ? selectedVehicleType === "car"
              ? "El formato de placa de carro no es válido. Ejemplo: ABC123"
              : selectedVehicleType === "motorcycle"
              ? "El formato de placa de moto no es válido. Ejemplo: EWH09F"
              : "El formato de placa no es válido"
            : ""
        }
      />
      <Autocomplete
        isRequired
        placeholder={`Seleccione ${selectedVehicleType === "car" ? "Modelo" : "Cilindraje"}`}
        defaultItems={secondAutocompleteOptions}
        className="max-w-xs"
        isInvalid={error}
        errorMessage={error ? "Por favor seleccione el modelo o cilindraje" : ""}
      >
        {(item) => (
          <AutocompleteItem onClick={handlerSelectModel} key={item.value} className="text-black">
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        isRequired
        placeholder={`Seleccione ${selectedVehicleType === "car" ? "Marca del carro" : "marca de la moto"}`}
        defaultItems={brandChange}
        className="max-w-xs"
        isInvalid={error}
        errorMessage={error ? "Por favor seleccione la marca del vehiculo" : ""}
        /* onSelect={(value) => setSelectedValue(value)} */
      >
        {(item) => (
          <AutocompleteItem onClick={handlerSelectBrand} key={item.value} className="text-black">
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Button onClick={handlerRegister} className="max-w-xs" color="primary">
        Registrar
      </Button>
    </form>
  );
};

export default RegisterForm;
