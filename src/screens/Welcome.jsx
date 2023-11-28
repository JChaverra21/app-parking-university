import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import BtnModal from "../components/BtnModal";
import { Image } from "@nextui-org/react";
import RegisterForm from "./RegisterForm";
import IngressForm from "./IngressForm";

const Welcome = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="flex flex-col items-center pt-5">
      <header className="text-center">
        <h4 className="font-bold text-large mb-4 mt-5 ">
          Bienvenido {user.username.charAt(0).toUpperCase() + user.username.slice(1)} a PoliParking
        </h4>
        <p className="text-lg mb-8">
          En este espacio tendras el control de acceso de vehiculos al parqueadero de nuestra institucion
        </p>
      </header>
      <main>
        <Image alt="Card background" className="object-cover rounded-xl mb-4" src="/src/assets/poli.jpeg" />
      </main>

      <BtnModal title={"Registro"} textButton={"Registrar"}>
        <RegisterForm />
      </BtnModal>
      <BtnModal title={"Ingreso"} textButton={"Ingresar"}>
        <IngressForm />
      </BtnModal>
      <footer></footer>
    </section>
  );
};

export default Welcome;
