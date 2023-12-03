import { useState } from "react";
import { Input, Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { carBrand, carModel, motorcycleBrand, motorcycleCylinder, vehicles } from "../data/Vehicle";
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
    handlerRegister, } = useContext(UserContext);

  /*   const [selectedVehicleType, setSelectedVehicleType] = useState("");
    const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([]);
    const [brandChange, setBrandChange] = useState([]);
    const [plate, setPlate] = useState("");
    const [error, setError] = useState(false);
  
    //Estados para almacenar los datos del brand y model
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
  
    const handlerSelectModel = (e) => {
      setModel(e.target.innerText);
    };
  
    const handlerSelectBrand = (e) => {
      setBrand(e.target.innerText);
    };
  
    const handlerPlateChange = (e) => {
      setPlate(e.target.value);
    };
  
    //identificacion de la persona
    const [idUser, setIdUser] = useState("");
  
    const handlerIdUserChange = (e) => {
      setIdUser(e.target.value);
    };
  
    //Crea el estado para almacenar los registros
    const [userRegister, setUserRegister] = useState([]);
  
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
  
    // Funcion para registrar los datos
    const handlerRegister = () => {
  
      console.log("Registros", userRegister)
  
      //Verifica si algun campo requerido esta vacio
      if (!idUser || !selectedVehicleType || !plate || !model || !brand) {
        setError(true);
        return;
      }
  
      //Verifica si el usuario ya existe
      const userExist = userRegister.find((user) => user.idUser === idUser);
  
      //Verifica si la placa ya existe
      const plateExist = userRegister.some((user) => user.vehiclesPlates.some((vehicle) => vehicle.plate === plate));
  
      if (plateExist) {
        alert("La placa ya existe");
      } else if (userExist) {
        if (userExist.vehiclesPlates.length < 2) {
          const newVehicle = {
            plate,
            vehicleType: selectedVehicleType, // car or motorcycle
            Cylinder: model,
            brand: brand,  
          };
          userExist.vehiclesPlates.push(newVehicle);
          setUserRegister([...userRegister]);
          setIdUser("");
          setPlate("");
          setSelectedVehicleType("");
        } else {
          alert("El usuario ya tiene 2 vehiculos registrados");
        }
      } else {
        const newRegister = {
          idUser,
          vehiclesPlates: [{ plate, vehicleType: selectedVehicleType, modelCylinder: model, brand: brand }],
        };
        setUserRegister([...userRegister, newRegister]);
  
        // Limpia los campos del formulario
        setIdUser("");
        setPlate("");
        setSelectedVehicleType("");
      }
    }; */

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
        errorMessage={error ? "Por favor ingresa la placa del vehiculo" : ""}
      />
      <Autocomplete
        isRequired
        placeholder={`Seleccione ${selectedVehicleType === "car" ? "Modelo" : "Cilindraje"}`}
        defaultItems={secondAutocompleteOptions}
        className="max-w-xs"
        isInvalid={error}
        errorMessage={error ? "Por favor seleccione el modelo o cilindraje" : ""}
      /* onSelect={(value) => setModel(value)} */
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
