import { createContext, useState } from "react";
import Swal from "sweetalert2";
import { carBrand, carModel, motorcycleBrand, motorcycleCylinder } from "../data/Vehicle";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [users] = useState([
    { username: "daniel ramirez", password: "9999" },
    { username: "jose chaverra", password: "7777" },
  ]);

  const cellsCar = [
    { cell: "01", empty: true, vehicle: "", date: "" },
    { cell: "02", empty: true, vehicle: "", date: "" },
    { cell: "03", empty: true, vehicle: "", date: "" },
    { cell: "04", empty: true, vehicle: "", date: "" },
    { cell: "05", empty: true, vehicle: "", date: "" },
    { cell: "06", empty: true, vehicle: "", date: "" },
  ];

  const cellsMotorcycle = [
    { cell: "09", empty: true, vehicle: "", date: "" },
    { cell: "10", empty: true, vehicle: "", date: "" },
    { cell: "11", empty: true, vehicle: "", date: "" },
    { cell: "12", empty: true, vehicle: "", date: "" },
    { cell: "13", empty: true, vehicle: "", date: "" },
    { cell: "14", empty: true, vehicle: "", date: "" },
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
  const [motorcycleCells, setMotorcycleCells] = useState(cellsMotorcycle);

  //Crea el estado para almacenar los registros
  const [userRegister, setUserRegister] = useState([]);

  //identificacion de la persona
  const [idUser, setIdUser] = useState("");

  //Estados para almacenar los datos del brand y model
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const addCarCell = (car, fecha, cell) => {
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
        return { ...item, empty: false, vehicle: car, date: fecha };
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
      position: "center",
      icon: "success",
      title: "Vehiculo ingresado correctamente",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const deleteCarCell = (plate) => {
    console.log("placa a eliminar", plate);
    const newCells = carCells.map((item) => {
      if (item.vehicle === plate && !item.empty) {
        return { ...item, empty: true, vehicle: "" };
      }
      return item;
    });

    setCarCells(newCells);
  };

  //Funciones para el ingreso de las motos
  const addMotorcycleCell = (motorcycle, fecha, cell) => {
    console.log("moto a ingresar", motorcycle);
    const existVehicle = motorcycleCells.some((item) => item.vehicle === motorcycle);
    console.log("existVehicle", existVehicle);

    if (existVehicle) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El vehiculo ya esta en el parqueadero",
      });
    }

    const newCells = motorcycleCells.map((item) => {
      if (item.cell === cell && item.empty) {
        return { ...item, empty: false, vehicle: motorcycle, date: fecha };
      } else if (item.cell === cell && !item.empty) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La celda ya esta ocupada",
        });
      }
      return item;
    });

    setMotorcycleCells(newCells);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Vehiculo ingresado correctamente",
      showConfirmButton: false,
      timer: 1000,
    });

    console.log("cells", motorcycleCells);
  };

  const deleteMotorcycleCell = (plate) => {
    const newCells = motorcycleCells.map((item) => {
      if (item.vehicle === plate && !item.empty) {
        return { ...item, empty: true, vehicle: "" };
      }
      return item;
    });
    setMotorcycleCells(newCells);
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

  const handlerIdUserChange = (e) => {
    setIdUser(e.target.value);
  };

  //Autocomplete dinamico para el modelo y marca
  const handlerSelectVehicle = (e) => {
    setSelectedVehicleType(e.target.innerText);

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
    //Verifica si algun campo requerido esta vacio
    if (!idUser || !selectedVehicleType || !plate || !model || !brand) {
      setError(true);
      return;
    }

    const regexPlate = selectedVehicleType === "car" ? /^[A-Z]{3}\d{3}$/ : /^[A-Z]{3}\d{2}[A-Z]{1}$/;

    // Si la placa no cumple con el formato, muestra un mensaje de error
    if (!regexPlate.test(plate)) {
      setErrorPlate(true);
      return;
    } else {
      setErrorPlate(false);
    }

    // Verifica si el usuario ya existe
    const userExist = userRegister.find((user) => user.idUser === idUser);
    console.log("userRegister", userExist);

    //Verifica si la placa ya existe
    const plateExist = userRegister.some((user) => user.vehiclesPlates.some((vehicle) => vehicle.plate === plate));

    if (plateExist) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "La placa ya existe.",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    if (userExist) {
      if (userExist.vehiclesPlates.length === 2) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "El usuario ya tiene 2 vehiculos registrados.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      userExist.vehiclesPlates.push({ plate, vehicleType: selectedVehicleType, modelCylinder: model, brand });
    } else {
      const newRegister = {
        idUser,
        vehiclesPlates: [{ plate, vehicleType: selectedVehicleType, modelCylinder: model, brand: brand }],
      };
      setUserRegister([...userRegister, newRegister]);
    }

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "El vehiculo se ha registrado correctamente",
    });

    // Limpia los campos del formulario
    setIdUser("");
    setPlate("");
    setSelectedVehicleType("");
  };

  //Funcion para reiniar el estado de error
  const handlerError = () => {
    setError(false);
    setErrorPlate(false);
    setIdUser("");
    setPlate("");
  };

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
        errorPlate,
        setErrorPlate,
        addCarCell,
        carCells,
        motorcycleCells,
        addMotorcycleCell,
        deleteMotorcycleCell,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
