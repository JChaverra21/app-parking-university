import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Login from "./screens/Login";
import Welcome from "./screens/Welcome";
import { Parking } from "./screens/Parking";

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/parking" element={<Parking />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
