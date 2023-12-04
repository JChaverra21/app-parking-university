import { Button, Input } from "@nextui-org/react";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const ExitForm = () => {
  const [value, setValue] = React.useState("");
  const { deleteCarCell, carCells } = useContext(UserContext);

  const handleChange = (e) => {
    setValue(e.target.value.toUpperCase());
  };

  const handleExit = () => {
    deleteCarCell(value);
  };

  console.log(carCells);

  return (
    <form>
      <Input
        isRequired
        name="value"
        type="text"
        label="placa"
        /* variant="bordered" */
        placeholder="ingrese la placa del vehiculo que saldra"
        value={value}
        onChange={handleChange}
        className="max-w-xs text-black mb-3"
        // isInvalid={error}
        // errorMessage={error ? "Por favor ingresa la cédula del usuario" : ""}
      />
      <Button onClick={handleExit} className="max-w-xs" color="primary">
        Dar salida
      </Button>
    </form>
  );
};
