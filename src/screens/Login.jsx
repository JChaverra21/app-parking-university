import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./extras/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./extras/EyeSlashFilledIcon";

import { useState } from "react";

const Login = () => {

    const [users] = useState([
        { username: 'daniel', password: '9999' },
        { username: 'jose', password: '7777' }
    ]);

    //Estado para guardar el usuario y contraseña
    const [user, setUser] = useState({ username: '', password: '' });

    //Manejar cambios en el formulario
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    //Manejar el envio del formulario
    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        console.log(users);

        //Validar si el usuario y contraseña son correctos
        const userFound = users.find(u => u.username === user.username && u.password === user.password);

        if (userFound) {
            console.log('Usuario encontrado');
            alert('Bienvenido');
        } else {
            console.log('Usuario no encontrado');
            alert('Usuario o Contraseña incorrectos');
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
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
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
            {/* <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-1/3">
                <Input
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                    width="300px"
                    size="large"
                    className="mb-4"
                />
                <Input.Password
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                    width="300px"
                    size="large"
                    className="mb-4"
                />
                <Button
                    type="submit"
                    color="primary"
                    auto
                    className="mb-4"
                >
                    Login
                </Button>
            </form> */}
        </div>
    );
};

export default Login