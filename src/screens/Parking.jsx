import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { CellCar } from "../components/CellCar";
import { CellMotorcycle } from "../components/CellMotorcycle";

export const Parking = () => {
  const navigate = useNavigate();
  const { carCells, motorcycleCells } = useContext(UserContext);

  return (
    <section className="bg-gray-500 h-screen ">
      {/* <Image src="/src/assets/pavimento.jpeg" className="" alt="icono" /> */}
      <Button onClick={() => navigate("/welcome")}>Volver</Button>

      <article className="flex">
        <div className=" border-r-3 border-yellow-500 mx-10 flex  w-[70%] flex-wrap">
          {carCells.map((item, index) => (
            <CellCar key={index} item={item} />
          ))}
        </div>
        <div className="flex w-[30%] flex-wrap">
          {motorcycleCells.map((item, index) => (
            <CellMotorcycle key={index} item={item} />
          ))}
        </div>
      </article>
    </section>
  );
};
