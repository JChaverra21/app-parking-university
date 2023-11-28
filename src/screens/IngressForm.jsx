import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react"
import { useState } from "react";

const IngressForm = () => {

    const [idPlate, setIdPlate] = useState("");
    const [dateTime, setDateTime] = useState("");

    const handleIdPlateChange = (e) => {
        setIdPlate(e.target.value);
    };

    const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);
    };

    return (
        <form className="flex flex-col items-center gap-5">
            <Input
                isRequired
                name="plate"
                type="text"
                label="Cédula o Placa"
                placeholder="Ingresa la cédula o la placa del vehiculo"
                value={idPlate}
                onChange={handleIdPlateChange}
                className="max-w-xs text-black"
            />
            <Input
                isRequired
                name="datetime"
                type="datetime-local"
                label="Fecha y Hora"
                value={dateTime}
                onChange={handleDateTimeChange}
                className="max-w-xs text-black"
            />
        </form>
    );
};

export default IngressForm;