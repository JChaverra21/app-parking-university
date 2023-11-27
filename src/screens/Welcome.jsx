import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import BtnModal from "../components/BtnModal";
import { Image } from "@nextui-org/react";

const Welcome = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="flex flex-col items-center pt-11">
      <header className="text-center">
        <h4 className="font-bold text-large mb-4">
          Bienvenido {user.username.charAt(0).toUpperCase() + user.username.slice(1)} a PoliParking
        </h4>
        <p className="text-2xl mb-8">
          En este espacio tendras el control de acceso de vehiculos al parqueadero de nuestra institucion
        </p>
      </header>
      <main>
        <Image alt="Card background" className="object-cover rounded-xl mb-4" src="/src/assets/poli.jpeg" />
      </main>

      <BtnModal />
      <footer></footer>
    </section>
  );
};

export default Welcome;
