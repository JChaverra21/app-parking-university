import { Autocomplete, AutocompleteItem, Button, Input } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const IngressForm = () => {

    const { error, userRegister, setUserRegister, /*handlerGetUsers*/ } = useContext(UserContext);

    const [idPlate, setIdPlate] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [cell, setCell] = useState("");

    const handleIdPlateChange = (e) => {
        setIdPlate(e.target.value);
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

        if (searchUser) {
            setVehicleUser(searchUser.vehiclesPlates.map((vehicle) => vehicle.plate));
            console.log(vehicleUser);
        }
    }

    return (
        <form className="flex flex-col items-center gap-5">
            <Input
                isRequired
                name="idPlate"
                type="text"
                label="Cédula o Placa"
                placeholder="Ingresa la cédula o la placa del vehiculo"
                value={idPlate}
                onChange={handleIdPlateChange}
                className="max-w-xs text-black"
            />
            <Autocomplete
                isRequired
                label="Tipo de vehiculo"
                defaultItems={vehicleUser.map((item, index) => ({ value: item, key: index.toString() }))}
                placeholder="Busca un tipo de vehiculo"
                defaultSelectedKey=""
                className="max-w-xs"
                isInvalid={error}
                errorMessage={error ? "Por favor selecciona el tipo de vehiculo" : ""}
                onClick={handleRegisterIngress}
            >
                {(item) => (
                    <AutocompleteItem value={item.value} key={item.key} className="text-black">
                        {item.value}
                    </AutocompleteItem>
                )}
            </Autocomplete>
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
            <Button onClick={handleRegisterIngress} className="max-w-xs" color="primary">
                Visualisar
            </Button>
        </form>
    );
};

export default IngressForm;