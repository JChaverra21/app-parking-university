import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import BtnModal from "../components/BtnModal";
import RegisterForm from "./RegisterForm";
import IngressForm from "./IngressForm";
import { ExitForm } from "./ExitForm";
import { BsBoxArrowInLeft, BsBoxArrowInRight } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { FaParking } from "react-icons/fa";
import { Button, Image, User } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";

function capitalizeName(cadena) {
  var palabras = cadena.split(" ");

  var resultado = palabras.map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1));

  return resultado.join(" ");
}

const Welcome = () => {
  const navigate = useNavigate();
  const { user, userRegister } = useContext(UserContext);

  useEffect(() => {
    console.log("Registros", userRegister);
  }, [userRegister]);

  return (
    <section className="flex flex-col items-center  pt-20">
      <img className="object-cover absolute top-0  w-screen h-screen" src="/poliParking.jpeg" alt="Poli" />
      <div className="absolute top-0 w-screen h-screen bg-black opacity-80"></div>
      <User
        className="absolute top-0 right-0 z-10 pr-4 pt-4 text-white"
        name={user ? capitalizeName(user.username) : ""}
        description="Software developer"
        avatarProps={{
          src: "",
          color: "primary",
        }}
      />
      <Button
        className="bg-transparent text-sm absolute top-0 left-0 z-10 ml-4 mt-4 text-white"
        onClick={() => navigate("/")}
      >
        <RiLogoutCircleLine size={20} />
        Cerrar Sesion
      </Button>
      <header className=" z-10 text-white">
        <div className="flex flex-col items-center">
          <Image alt="Logo" src="/iconoPoli.png" width="50" height="50" />
          <h4 className="font-bold text-large mb-4  ">PoliParking</h4>
        </div>
        <p className="text-lg mb-8">
          En este espacio tendras el control de acceso de vehiculos al parqueadero de nuestra institucion
        </p>
      </header>
      <main className="grid grid-cols-2 gap-5 ">
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
      </main>

      <footer className="absolute  flex justify-center items-center z-10 w-full bottom-10">
        <p className=" text-white text-sm ">© 2023 PoliParking. Desarrollado por Jose Chaverra y Daniel Ramirez</p>
      </footer>
    </section>
  );
};

export default Welcome;
