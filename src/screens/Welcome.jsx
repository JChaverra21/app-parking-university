import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"

import { Card, CardHeader, CardBody, Image, Button, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { vehicles, carBrand, motorcycleBrand, carModel, motorcycleCylinder } from "../data/Vehicle";

const Welcome = () => {

    const { user } = useContext(UserContext)

    const [plate, setPlate] = useState('')

    const handlerChange = (e) => {
        setPlate(e.target.value)
    }

    /*     const [selectVehicle, setSelectVehicle] = useState('')
    
        const handlerSelectVehicle = (e) => {
            setSelectVehicle(e.target.value)
        }
    
        console.log("selectedValue:", selectVehicle); */

    const [selectedVehicleType, setSelectedVehicleType] = useState('')
    /* const [selectedValue, setSelectedValue] = useState('') */
    const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([])
    const [brandChange, setBrandChange] = useState([])

    const handlerSelectVehicle = (e) => {
        setSelectedVehicleType(e.target.innerText)
        console.log(e.target.innerText);

        if (e.target.innerText === 'car') {
            console.log("entro car")
            setSecondAutocompleteOptions(carModel)
            setBrandChange(carBrand)
        } else if (e.target.innerText === 'motorcycle') {
            console.log("entro motorcycle")
            setSecondAutocompleteOptions(motorcycleCylinder)
            setBrandChange(motorcycleBrand)
        }

        /* setSelectedValue('') */
    }

    console.log("setAuto:", setSecondAutocompleteOptions);
    console.log("SelectedVehicleType:", selectedVehicleType);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* <h1 className="font-bold text-4xl italic mb-8">Bienvenido {user.username.charAt(0).toUpperCase() + user.username.slice(1)} a PoliParking</h1>
            <p className="italic">En este espacio tendras el control de acceso de vehiculos al parqueadero de nuestra institucion</p> */}
            <Card className="py-4 w-11/12 h-5/6">
                <CardHeader className="pb-0 pt-2 px-4 flex-col">
                    {/* <p className="text-tiny uppercase font-bold">Bienvenido {user.username.charAt(0).toUpperCase() + user.username.slice(1)} a PoliParking</p> */}
                    <h4 className="font-bold text-large mb-8">Bienvenido {user.username.charAt(0).toUpperCase() + user.username.slice(1)} a PoliParking</h4>
                    <small className="text-default-500 mb-8">En este espacio tendras el control de acceso de vehiculos al parqueadero de nuestra institucion</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 items-center">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl mb-4"
                        src="/src/assets/poli.jpeg"
                    />
                    <Button onPress={onOpen} className="bg-gradient-to-tr from-lime-500 to-yellow-500 text-white shadow-lg mb-4 w-40">
                        Register
                    </Button>
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="center"
                        className="w-1/3"
                    >
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
                                            {(item) => <AutocompleteItem value={item.value} onClick={handlerSelectVehicle} key={item.value} className="text-black">{item.label}</AutocompleteItem>}
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
                                            placeholder={`Select ${selectedVehicleType === 'car' ? 'model' : 'cylinder'}`}
                                            defaultItems={secondAutocompleteOptions}
                                            className="max-w-xs"
                                            /* onSelect={(value) => setSelectedValue(value)} */
                                        >
                                            {(item) => <AutocompleteItem key={item.value} className="text-black">{item.label}</AutocompleteItem>}
                                        </Autocomplete>
                                        <Autocomplete
                                            isRequired
                                            placeholder={`Select ${selectedVehicleType === 'car' ? 'car brand' : 'motorcycle brand'}`}
                                            defaultItems={brandChange}
                                            className="max-w-xs"
                                            /* onSelect={(value) => setSelectedValue(value)} */
                                        >
                                            {(item) => <AutocompleteItem key={item.value} className="text-black">{item.label}</AutocompleteItem>}
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
                </CardBody>
            </Card>
        </div>
    )
}

export default Welcome