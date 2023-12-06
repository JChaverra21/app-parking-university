/* eslint-disable react/prop-types */
import { Image, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
export const CellMotorcycle = ({ item }) => {
  return (
    <div className="w-24 h-60 border border-x-5 text-white border-t-0   border-b-0 border-white flex justify-center items-center ">
      {item.empty ? (
        <h1 className="">{item.cell}</h1>
      ) : (
        <div className="flex flex-col text-center">
          {/* <Tooltip content={item.vehicle}>
            <Image src="/src/assets/car.png" width="300" height="100" alt="icono" />
          </Tooltip> */}
          <Popover placement="top">
            <PopoverTrigger>
              <Image
                src="/src/assets/motico.png"
                className="cursor-pointer   hover:scale-110"
                width="1200"
                height="200"
                alt="icono"
              />
            </PopoverTrigger>
            <PopoverContent className="text-center mt-4">
              <div className=" py-2  text-left">
                <p>
                  <span className="font-semibold">Cilindraje:</span>
                </p>
                <p>
                  <span className="font-semibold">Marca:</span>
                </p>
                <p>
                  <span className="font-semibold">Dueño:</span>
                </p>
                <p>
                  <span className="font-semibold">Hora de entrada:</span>
                </p>
              </div>
            </PopoverContent>
          </Popover>

          <h1 className="">{item.vehicle}</h1>
        </div>
      )}
    </div>
  );
};
