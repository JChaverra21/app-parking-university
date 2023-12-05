import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { CellCar } from "../components/CellCar";

export const Parking = () => {
  const navigate = useNavigate();
  const { carCells } = useContext(UserContext);

  return (
    <section className="bg-gray-500 h-screen ">
      {/* <Image src="/src/assets/pavimento.jpeg" className="" alt="icono" /> */}
      <Button onClick={() => navigate("/welcome")}>Volver</Button>

      <article className="absolute flex flex-wrap w-[70%] ml-10 mt-5 gap-1 z-10">
        {carCells.map((item, index) => (
          <CellCar key={index} item={item} />
        ))}
      </article>
    </section>
  );
};
