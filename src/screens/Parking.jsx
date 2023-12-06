import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { CellCar } from "../components/CellCar";
import { CellMotorcycle } from "../components/CellMotorcycle";
import { IoIosArrowBack } from "react-icons/io";
export const Parking = () => {
  const navigate = useNavigate();
  const { carCells, motorcycleCells } = useContext(UserContext);
  console.log(carCells);

  return (
    <section className="bg-gray-500 h-screen ">
      <Button
        size="sm"
        className="bg-transparent text-white text-lg flex items-center h"
        onClick={() => navigate("/welcome")}
      >
        <IoIosArrowBack />
        Volver
      </Button>

      <article className="flex gap-48 mx-7">
        <div className="  flex w-[59%] flex-wrap">
          <h1 className="text-2xl text-white font-bold text-center w-full mb-1">Carros</h1>
          {carCells.map((item, index) => (
            <CellCar key={index} item={item} />
          ))}
        </div>
        <div className="flex w-[25%] flex-wrap ">
          <h1 className="text-2xl text-white font-bold text-center w-full  mb-1">Motos</h1>
          {motorcycleCells.map((item, index) => (
            <CellMotorcycle key={index} item={item} />
          ))}
        </div>
      </article>
    </section>
  );
};
