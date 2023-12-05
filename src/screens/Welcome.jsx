import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import BtnModal from "../components/BtnModal";
import RegisterForm from "./RegisterForm";
import IngressForm from "./IngressForm";
import { ExitForm } from "./ExitForm";
import { BsBoxArrowInLeft, BsBoxArrowInRight } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { FaParking } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  const { user, userRegister } = useContext(UserContext);

  console.log("registros", userRegister);

  return (
    <section className="flex flex-col items-center  pt-28">
      <img className="object-cover absolute top-0  w-screen h-screen" src="/src/assets/poliParking.jpeg" alt="Poli" />
      <div className="absolute top-0 w-screen h-screen bg-black opacity-80"></div>
      <header className="text-center z-10 text-white">
        <h4 className="font-bold text-large mb-4 mt-5 ">
          {/* Bienvenido {user.username.charAt(0).toUpperCase() + user.username.slice(1)} a PoliParking */}
        </h4>
        <p className="text-lg mb-8">
          En este espacio tendras el control de acceso de vehiculos al parqueadero de nuestra institucion
        </p>
      </header>
      <main>
        {/* <Image
          alt="Card background"
          className="object-cover rounded-xl mb-4 w-screen h-[50%]"
          src="/src/assets/poli.jpeg"
        /> */}
      </main>

      <div className="grid grid-cols-2 gap-5 ">
        <Button onClick={() => navigate("/parking")} className="bg-primary text-white shadow-lg mb-4 w-52 h-24 ">
          Parqueadero <FaParking fontSize={20} />
        </Button>

        <BtnModal title={"Ingreso"} textButton={"Ingreso"} icon={<BsBoxArrowInLeft fontSize={20} />}>
          <IngressForm />
        </BtnModal>
        <BtnModal title={"Registro"} textButton={"Registrar"} icon={<BsPencilSquare fontSize={20} />}>
          <RegisterForm />
        </BtnModal>

        <BtnModal title={"Salida"} textButton={"Salida"} icon={<BsBoxArrowInRight fontSize={20} />}>
          <ExitForm />
        </BtnModal>
      </div>
      <footer></footer>
    </section>
  );
};

export default Welcome;
