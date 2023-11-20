import { Button, NextUIProvider } from "@nextui-org/react";
import Login from "./screens/Login";

function App() {

  return (
    <NextUIProvider>
{/*       <p className="text-green-400">Hola mundo</p>
      <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
        Button
      </Button> */}
      <Login />
    </NextUIProvider>
  )
}

export default App
