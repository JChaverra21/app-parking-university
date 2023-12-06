import { Autocomplete, AutocompleteItem, Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";

const IngressForm = () => {
  const { error, userRegister, addCarCell, carCells, motorcycleCells, addMotorcycleCell } = useContext(UserContext);

  const [idPlate, setIdPlate] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [cell, setCell] = useState("");
  const [validation, setValidation] = useState(false);
  const [selected, setSelected] = useState("cedula");
  const [newPlate, setNewPlate] = useState("");
  const [carSelected, setCarSelected] = useState({});
  const [vehicleUser, setVehicleUser] = useState([]);

  const handleIdPlateChange = (e) => {
    setIdPlate(e.target.value.toUpperCase());
  };

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const ingressForId = (id) => {
    const searchUser = userRegister.find((user) => user.idUser === id);

    if (searchUser === undefined) {
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: "El usuario no existe",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    setCarSelected(searchUser.vehiclesPlates.find((vehicle) => vehicle.plate === id));

    const userVehiclesPlates = searchUser ? searchUser.vehiclesPlates.map((vehicle) => vehicle.plate) : [];
    setVehicleUser(userVehiclesPlates);
    setValidation(true);
  };

  const ingressForPlate = (plate) => {
    if (plate == "")
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: `${selected === "cedula" ? "La cedula" : "La placa"} no puede estar vacia`,
        showConfirmButton: false,
        timer: 1000,
      });

    const validationPlate = userRegister.find((user) => {
      return user.vehiclesPlates.some((vehicle) => vehicle.plate === plate);
    });

    if (validationPlate === undefined) {
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: "La placa no existe",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    const existVehicle =
      carCells.some((item) => item.vehicle === plate) || motorcycleCells.some((item) => item.vehicle === plate);
    if (existVehicle) {
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: "El vehiculo ya se encuentra en el parqueadero",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    let regexCar;
    let regexMotorcycle;

    regexCar = /^[A-Z]{3}\d{3}$/;
    regexMotorcycle = /^[A-Z]{3}\d{2}[A-Z]{1}$/;
    if (!regexCar.test(plate) && !regexMotorcycle.test(plate)) {
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: "El formato de la placa no es válido.",
        showConfirmButton: false,
        timer: 1000,
      });
    }

    if (validationPlate === undefined)
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: `${selected === "cedula" ? "El usuario no existe" : "La placa no existe"}`,
        showConfirmButton: false,
        timer: 1000,
      });

    setCarSelected(validationPlate.vehiclesPlates.find((vehicle) => vehicle.plate === plate));
    setNewPlate(plate);
    setValidation(true);
  };

  const handleRegisterIngress = () => {
    if (selected === "cedula") {
      ingressForId(idPlate);
    } else {
      ingressForPlate(idPlate);
    }
  };

  // Efecto para resetear el estado cuando se cambia el tipo de identificación
  useEffect(() => {
    setValidation(false);
    setIdPlate("");
    setDateTime("");
    setCell("");
    setVehicleUser([]);
  }, [selected]);

  // useEffect(() => {
  //   if (carCells.length === 0 || motorcycleCells.length === 0) {
  //     console.log("celdas carros", carCells);
  //     console.log("celdas motos", motorcycleCells);
  //   }
  // }, [carCells, motorcycleCells]);

  // Funcion para llamar a la funcion addCarCell o addMotorcycleCell
  let regexCar = /^[A-Z]{3}\d{3}$/;
  let regexMotorcycle = /^[A-Z]{3}\d{2}[A-Z]{1}$/;

  const handleIngress = (newPlate, cell) => {
    if (regexCar.test(newPlate)) {
      console.log("placa de carro");
      addCarCell(newPlate, dateTime, cell);
    } else if (regexMotorcycle.test(newPlate)) {
      console.log("placa de moto");
      addMotorcycleCell(newPlate, dateTime, cell);
    }
  };

  const validationCells = (plate) =>
    regexCar.test(plate)
      ? carCells.filter((item) => item.empty === true)
      : motorcycleCells.filter((item) => item.empty === true);

  console.log(dateTime);
  return (
    <form className="flex flex-col items-center gap-5">
      <RadioGroup
        isDisabled={validation}
        label="Tipo de indetificacion: "
        orientation="horizontal"
        value={selected}
        onValueChange={setSelected}
      >
        <Radio value="cedula">Cedula</Radio>
        <Radio value="placa">Placa</Radio>
      </RadioGroup>
      <Input
        isRequired
        readOnly={validation}
        name="idPlate"
        type="text"
        label={selected === "cedula" ? "Identificación del usuario" : "Placa del vehiculo"}
        placeholder="Ingresa la cédula o la placa del vehiculo"
        value={idPlate}
        onChange={handleIdPlateChange}
        className="max-w-xs text-black"
      />
      {validation && (
        <>
          {selected !== "placa" ? (
            <Autocomplete
              isRequired
              label="Tipo de vehiculo"
              defaultItems={vehicleUser.map((item, index) => ({ value: item, key: index }))}
              placeholder="Selecciona el vehiculo"
              onSelectionChange={() => {
                const validationPlate = userRegister.find((user) => {
                  return user.vehiclesPlates.some((vehicle) => vehicle.plate === newPlate);
                });
                setCarSelected(validationPlate.vehiclesPlates.find((vehicle) => vehicle.plate === newPlate));
              }}
              className="max-w-xs"
              isInvalid={error}
              errorMessage={error ? "Por favor selecciona el tipo de vehiculo" : ""}
            >
              {(item) => (
                <AutocompleteItem
                  onClick={(e) => setNewPlate(e.target.innerText)}
                  value={item.value}
                  key={item.key}
                  className="text-black"
                >
                  {item.value}
                </AutocompleteItem>
              )}
            </Autocomplete>
          ) : (
            <>
              <Textarea
                readOnly
                label="Informacion vehiculo"
                labelPlacement="outside"
                defaultValue={`Marca: ${carSelected.brand}\n${
                  carSelected.vehicleType === "car" ? "Modelo" : "Cilindraje"
                }: ${carSelected.modelCylinder}`}
                className="max-w-xs"
              />
            </>
          )}

          <Input
            isRequired
            name="datetime"
            type="datetime-local"
            label="Fecha y Hora"
            placeholder="Ingresa la fecha y hora de ingreso"
            value={dateTime}
            onChange={handleDateTimeChange}
            className="max-w-xs text-black"
          />

          <Autocomplete
            isRequired
            label="Celda"
            defaultItems={
              selected === "placa" ? validationCells(idPlate) : newPlate === "" ? [] : validationCells(newPlate)
            }
            placeholder="Ingresa el numero de celda"
            defaultSelectedKey="1"
            className="max-w-xs"
            isInvalid={error}
            onSelectionChange={(e) => setCell(e)}
            errorMessage={error ? "Por favor selecciona el tipo de vehiculo" : ""}
          >
            {(item) => (
              <AutocompleteItem value={item.cell} key={item.cell} className="text-black">
                {item.cell}
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Button onClick={() => handleIngress(newPlate, cell)} className="max-w-xs" color="primary">
            Ingresar
          </Button>
        </>
      )}
      {!validation && (
        <Button onClick={handleRegisterIngress} className="max-w-xs" color="primary">
          Visualisar
        </Button>
      )}
    </form>
  );
};

export default IngressForm;
