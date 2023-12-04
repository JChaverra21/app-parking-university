import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Input,
    Radio,
    RadioGroup,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";

const IngressForm = () => {
    const { error, userRegister } = useContext(UserContext);

    const [idPlate, setIdPlate] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [cell, setCell] = useState("");
    const [validation, setValidation] = useState(false);
    const [selected, setSelected] = useState("cedula");

    const handleIdPlateChange = (e) => {
        setIdPlate(e.target.value.toUpperCase());
    };

    const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);
    };

    const handleCellChange = (e) => {
        setCell(e.target.value);
    };

    // Funcion para el ingreso al parqueadero
    /*     const handleRegisterIngress = () => {
      
              console.log(userRegister);
              console.log(idPlate);
              const searchUser = handlerGetUsers(idPlate);
              console.log(searchUser);
          }; */

    // Efecto para buscar el id cuando ingresa el idPlate
    /*     useEffect(() => {
              const filteredVehicles = userRegister
                  .filter((user) => user.idUser.includes(idPlate))
                  .flatMap((user) => user.vehiclesPlates.map((vehicle) => vehicle.plate));
      
              setVehicleUser(filteredVehicles);
          }, [idPlate, userRegister]);
      
          const handleAutocompleteItemClick = (selectedItem) => {
              console.log("Item seleccionado:", selectedItem);
              // Puedes realizar acciones adicionales cuando se selecciona un elemento del Autocomplete
          }; */

    const [vehicleUser, setVehicleUser] = useState([]);

    const handleRegisterIngress = () => {
        const searchUser = userRegister.find((user) => user.idUser === idPlate);
        const validationPlate = userRegister.find((user) => {
            return user.vehiclesPlates.some((vehicle) => vehicle.plate === idPlate);
        });

        // Mostrar la placa del vehiculo
        let vehicleInfo;
        if (validationPlate) {
            vehicleInfo = validationPlate.vehiclesPlates.find((vehicle) => vehicle.plate === idPlate);
        }

        console.log("existe el", validationPlate);
        console.log("la placa", vehicleInfo, "existe");

        if (idPlate == "")
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${selected === "cedula" ? "La cedula" : "La placa"} no puede estar vacia`,
                showConfirmButton: false,
                timer: 1000,
            });

        // Validar la placa con la expresión regular según el tipo de vehículo
        let regexCar;
        let regexMotorcycle;
        if (selected === "placa") {
            regexCar = /^[A-Z]{3}\d{3}$/;
            regexMotorcycle = /^[A-Z]{3}\d{2}[A-Z]{1}$/;
            if (!regexCar.test(idPlate) && !regexMotorcycle.test(idPlate)) {
                return Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "El formato de la placa no es válido.",
                    showConfirmButton: false,
                    timer: 1000,
                });
            }

            // Validar que la placa exista
            /* if (!validationPlate)
                return Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "La placa no existe",
                    showConfirmButton: false,
                    timer: 1000,
                }); */
        } else {
            // Validar que la cedula exista
            if (!searchUser)
                return Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "El usuario no existe",
                    showConfirmButton: false,
                    timer: 1000,
                });
        }

        /* if (!searchUser)
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: "El usuario no existe",
                showConfirmButton: false,
                timer: 1000,
            }); */

        setValidation(true);
        //setVehicleUser(searchUser.vehiclesPlates.map((vehicle) => vehicle.plate));
        // Manejar el caso en el que searchUser sea undefined
        const userVehiclesPlates = searchUser ? searchUser.vehiclesPlates.map((vehicle) => vehicle.plate) : [];
        setVehicleUser(userVehiclesPlates);
        console.log(vehicleUser);
    };

    // Efecto para resetear el estado cuando se cambia el tipo de identificación
    useEffect(() => {
        setValidation(false);
        setIdPlate("");
        setDateTime("");
        setCell("");
        setVehicleUser([]);
    }, [selected]);

    return (
        <form className="flex flex-col items-center gap-5">
            <RadioGroup label="Tipo de indetificacion: " orientation="horizontal" value={selected} onValueChange={setSelected}>
                <Radio value="cedula">Cedula</Radio>
                <Radio value="placa">Placa</Radio>
            </RadioGroup>
            <Input
                isRequired
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
                    {selected !== "placa" && (
                        <Autocomplete
                            isRequired
                            label="Tipo de vehiculo"
                            defaultItems={vehicleUser.map((item, index) => ({ value: item, key: index }))}
                            placeholder="Selecciona el vehiculo"
                            defaultSelectedKey="1"
                            className="max-w-xs"
                            isInvalid={error}
                            errorMessage={error ? "Por favor selecciona el tipo de vehiculo" : ""}
                        >
                            {(item) => (
                                <AutocompleteItem value={item.value} key={item.key} className="text-black">
                                    {item.value}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
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
                    <Input
                        isRequired
                        name="celda"
                        type="text"
                        label="Numero de celda"
                        placeholder="Ingresa el numero de celda"
                        value={cell}
                        onChange={handleCellChange}
                        className="max-w-xs text-black"
                    />
                </>
            )}
            <Button onClick={handleRegisterIngress} className="max-w-xs" color="primary">
                Visualisar
            </Button>
        </form>
    );
};

export default IngressForm;
