import { Input, Button } from "@nextui-org/react";
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
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handlerSubmit} className="flex flex-col items-center justify-center w-1/3">
        <h1 className="font-bold underline mb-4">Login PoliParking</h1>
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
          className="bg-gradient-to-tr from-lime-500 to-green-500 text-white shadow-lg font-bold mb-4"
          variant="shadow"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
