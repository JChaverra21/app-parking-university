/* eslint-disable react/prop-types */
import { Image, Tooltip } from "@nextui-org/react";
export const CellCar = ({ item }) => {
  return (
    <div className="w-60 h-60 border border-x-5 text-white border-t-0 my-8  border-b-0 border-white flex justify-center items-center ">
      {item.empty ? (
        <h1 className="">Vacio</h1>
      ) : (
        <div className="flex flex-col text-center">
          <Tooltip content={item.vehicle}>
            <Image src="/src/assets/car.png" width="300" height="100" alt="icono" />
          </Tooltip>

          <h1 className="">{item.vehicle}</h1>
        </div>
      )}
    </div>
  );
};
