import { Input, Button, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { users } = useContext(UserContext);

  //Estado para guardar el usuario y contraseña
  const [user, setUser] = useState({ username: "", password: "" });

  //Manejar cambios en el formulario
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const { setUser: setAuthUser } = useContext(UserContext);

  //Manejar el envio del formulario
  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    console.log(users);

    //Validar si el usuario y contraseña son correctos
    const userFound = users.find((u) => u.username === user.username && u.password === user.password);

    if (userFound) {
      console.log("Usuario encontrado");
      //Guardar el usuario en el estado global
      setAuthUser(userFound);
      navigate("/welcome");
    } else {
      console.log("Usuario no encontrado");
      alert("Usuario o Contraseña incorrectos");
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center  bg-primary h-screen">
      <Card className="py-4 w-72">
        <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center">
          <Image src="/src/assets/iconoPoli.png" width="50" height="100" alt="icono" />
          <h1 className="font-bold">PoliParking</h1>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <form onSubmit={handlerSubmit} className="flex flex-col items-center justify-center">
            <Input
              isRequired
              name="username"
              type="text"
              label="Username"
              variant="bordered"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleChange}
              className="max-w-xs mb-4"
            />
            <Input
              isRequired
              name="password"
              label="Password"
              value={user.password}
              onChange={handleChange}
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? <IoEye style={{ fontSize: "1.5rem" }} /> : <IoMdEyeOff style={{ fontSize: "1.5rem" }} />}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs mb-4"
            />
            <Button
              type="submit"
              color="primary"
              auto
              className="bg-gradient-to-tr from-lime-600 to-green-600 text-white shadow-lg font-bold mb-4"
              variant="shadow"
            >
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
