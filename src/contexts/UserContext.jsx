import { createContext, useState } from "react";
import Swal from "sweetalert2";
import { carBrand, carModel, motorcycleBrand, motorcycleCylinder } from "../data/Vehicle";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [users] = useState([
    { username: "daniel", password: "9999" },
    { username: "jose", password: "7777" },
  ]);

  const cellsCar = [
    { cell: "01", empty: true, vehicle: "" },
    { cell: "02", empty: true, vehicle: "" },
    { cell: "03", empty: true, vehicle: "" },
    { cell: "04", empty: true, vehicle: "" },
    { cell: "05", empty: true, vehicle: "" },
    { cell: "06", empty: true, vehicle: "" },
    { cell: "07", empty: true, vehicle: "" },
    { cell: "08", empty: true, vehicle: "" },
  ];

  //Nuevo estado para el usuario logueado
  const [user, setUser] = useState(null);

  //Registro de usuarios
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([]);
  const [brandChange, setBrandChange] = useState([]);
  const [plate, setPlate] = useState("");
  const [error, setError] = useState(false);
  const [errorPlate, setErrorPlate] = useState(false);
  const [carCells, setCarCells] = useState(cellsCar);

  //Estados para almacenar los datos del brand y model
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const addCarCell = (car, cell) => {
    console.log("car a ingresar", car);
    const existVehicle = carCells.some((item) => item.vehicle === car);
    console.log("existVehicle", existVehicle);

    if (existVehicle) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El vehiculo ya esta en el parqueadero",
      });
    }

    const newCells = carCells.map((item) => {
      if (item.cell === cell && item.empty) {
        return { ...item, empty: false, vehicle: car };
      } else if (item.cell === cell && !item.empty) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La celda ya esta ocupada",
        });
      }
      return item;
    });

    setCarCells(newCells);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Vehiculo ingresado correctamente",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const deleteCarCell = (plate) => {
    const newCells = carCells.map((item) => {
      if (item.vehicle === plate && !item.empty) {
        return { ...item, empty: true, vehicle: "" };
      }
      return item;
    });

    setCarCells(newCells);
  };

  const handlerSelectModel = (e) => {
    setModel(e.target.innerText);
  };

  const handlerSelectBrand = (e) => {
    setBrand(e.target.innerText);
  };

  const handlerPlateChange = (e) => {
    setPlate(e.target.value.toUpperCase());
  };

  //identificacion de la persona
  const [idUser, setIdUser] = useState("");

  const handlerIdUserChange = (e) => {
    setIdUser(e.target.value);
  };

  //Autocomplete dinamico para el modelo y marca
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

  //Crea el estado para almacenar los registros
  const [userRegister, setUserRegister] = useState([]);

  // Funcion para registrar los datos
  const handlerRegister = () => {
    //Verifica si algun campo requerido esta vacio
    if (!idUser || !selectedVehicleType || !plate || !model || !brand) {
      setError(true);
      return;
    }

    // Valida el formato de la placa segun el tipo de vehiculo seleccionado
    let regexPlate;
    if (selectedVehicleType === "car") {
      regexPlate = /^[A-Z]{3}\d{3}$/;
    } else if (selectedVehicleType === "motorcycle") {
      //regexPlate = /^[A-Z0-9]{6}$/;
      console.log("entro a moto");
      regexPlate = /^[A-Z]{3}\d{2}[A-Z]{1}$/;
    }

    const isValidPlate = regexPlate.test(plate);
    console.log("isValidPlate", isValidPlate);
    // Si la placa no cumple con el formato, muestra un mensaje de error
    if (!isValidPlate) {
      setErrorPlate(true);
      return;
    } else {
      setErrorPlate(false);
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

        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "El vehiculo se ha registrado correctamente",
        });

        setUserRegister([...userRegister]);
        setIdUser("");
        setPlate("");
        setSelectedVehicleType("");
        /* setSecondAutocompleteOptions("");
        setBrandChange(""); */
      } else {
        alert("El usuario ya tiene 2 vehiculos registrados");
      }
    } else {
      const newRegister = {
        idUser,
        vehiclesPlates: [{ plate, vehicleType: selectedVehicleType, modelCylinder: model, brand: brand }],
      };
      setUserRegister([...userRegister, newRegister]);

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El vehiculo se ha registrado correctamente",
      });

      // Limpia los campos del formulario
      setIdUser("");
      setPlate("");
      setSelectedVehicleType("");
      /* setSecondAutocompleteOptions("");
      setBrandChange(""); */
    }
  };

  //Funcion para reiniar el estado de error
  const handlerError = () => {
    setError(false);
    setErrorPlate(false);
    setIdUser("");
    setPlate("");
  };

  /*     // Funcion para obtener los usuarios registrados
    const handlerGetUsers = () => {
        // Obtener la informacion de los vehiculos por medio del id o la placa
        const userExist = userRegister.find((user) => user.idUser === idUser);
        const plateExist = userRegister.find((user) => user.vehiclesPlates.some((vehicle) => vehicle.plate === plate));

        if (userExist) {
            //alert(`El usuario ${userExist.idUser} tiene los siguientes vehiculos registrados: ${userExist.vehiclesPlates.map((vehicle) => vehicle.plate)}`);
            alert(`El usuario ${userExist.idUser} tiene los siguientes vehiculos registrados: 
            ${userExist.vehiclesPlates.map((vehicle) => [vehicle.plate, vehicle.vehicleType, vehicle.brand, vehicle.modelCylinder])}`);
        } else if (plateExist) {
            alert(`El vehiculo con placa ${plateExist.vehiclesPlates.map((vehicle) => vehicle.plate)} pertenece al usuario ${plateExist.idUser}`);
        } else {
            alert("El usuario no existe");
        }
    } */

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        setUser,
        userRegister,
        setUserRegister,
        idUser,
        plate,
        selectedVehicleType,
        secondAutocompleteOptions,
        brandChange,
        error,
        handlerError,
        handlerSelectModel,
        handlerSelectBrand,
        handlerPlateChange,
        handlerSelectVehicle,
        handlerIdUserChange,
        handlerRegister,
        deleteCarCell,
        //handlerGetUsers,s
        errorPlate,
        setErrorPlate,
        addCarCell,
        carCells,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
