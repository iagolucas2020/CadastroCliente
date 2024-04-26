import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clientes from "../Pages/Clientes";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clientes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
