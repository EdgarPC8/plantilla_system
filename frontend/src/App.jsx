import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Login from "./page/Login";
import Home from "./page/Home";
import Comandos from "./page/Comandos";
import Analytics from "./page/Analytics";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Reservas from "./page/Reservas";
import Recepcion from "./page/Recepcion";
import Users from "./page/Users";
import InfoHotel from "./page/InfoHotel";
import All from "./Components/AllComponents/All.jsx";
import NivelesHotel from "./page/NivelesHotel.jsx";
import Profile from "./page/Profile.jsx";
import Accounts from "./page/Accounts.jsx";
import { SnackbarProvider } from 'notistack';
import Logs from "./page/Logs.jsx";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        >
      <AuthProvider>
        <BrowserRouter basename="/hotel">
          <NavBar>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                element={
                  <ProtectedRoute requiredRol={["Administrador", "Programador"]} />
                }
              >
              <Route path="/" element={<Home />} />
              <Route path="/comandos" element={<Comandos />} />
              <Route path="/usuarios" element={<Users />} />
              <Route path="/analisis" element={<Analytics />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/recepcion" element={<Recepcion />} />
              <Route path="/infoHotel" element={<InfoHotel />} />
              <Route path="/componentes" element={<All />} />
              <Route path="/nivel" element={<NivelesHotel />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/cuentas" element={<Accounts />} />
              <Route path="/logs" element={<Logs />} />
              </Route>
            </Routes>
          </NavBar>
        </BrowserRouter>
      </AuthProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default App;
