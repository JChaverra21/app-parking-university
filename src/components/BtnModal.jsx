import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Autocomplete,
  AutocompleteItem,
  useDisclosure,
} from "@nextui-org/react";

import { carBrand, carModel, motorcycleBrand, motorcycleCylinder, vehicles } from "../data/Vehicle";
import { useState } from "react";

const BtnModal = () => {
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="bg-gradient-to-tr from-lime-500 to-yellow-500 text-white shadow-lg mb-4 w-40">
        Register
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" className="w-1/3">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black text-center">Register</ModalHeader>
              <ModalBody className="flex flex-col items-center">
                <Autocomplete
                  isRequired
                  label="Vehicle type"
                  defaultItems={vehicles}
                  placeholder="Search an type of vehicle"
                  defaultSelectedKey=""
                  className="max-w-xs"
                >
                  {(item) => (
                    <AutocompleteItem
                      value={item.value}
                      onClick={handlerSelectVehicle}
                      key={item.value}
                      className="text-black"
                    >
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Input
                  isRequired
                  name="plate"
                  type="text"
                  label="Plate"
                  /* variant="bordered" */
                  placeholder="Enter your plate"
                  value={plate}
                  onChange={handlerChange}
                  className="max-w-xs text-black"
                />
                <Autocomplete
                  isRequired
                  placeholder={`Select ${selectedVehicleType === "car" ? "model" : "cylinder"}`}
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
                  placeholder={`Select ${selectedVehicleType === "car" ? "car brand" : "motorcycle brand"}`}
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BtnModal;
