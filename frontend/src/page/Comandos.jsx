import * as React from 'react';
import { Paper, Typography, Grid, Box, Container, Button } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { reloadBD, saveBackup, downloadBackup } from '../api/comandsRequest';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
const arrayComands = [
  {
    name: "Descargar backup.json",
    info: "descargar la base de datos en formato json",
    backgroundColor: "primary.main",
    icon: <AdbIcon sx={{ fontSize: '4rem' }} />,
    // function: () => {
    //     console.log("crea BD")
    // },
     function: downloadBackup
  },
  {
    name: "Recargar BD",
    info: "Comando para Recargar la Base de Datos",
    backgroundColor: "primary.main",

    icon: <AdbIcon sx={{ fontSize: '4rem' }} />,
    function: reloadBD
  },
  {
    name: "Guardar una copia backup.json",
    info: "Guardan la bd en formato json",
    backgroundColor: "primary.main",

    icon: <AdbIcon sx={{ fontSize: '4rem' }} />,
    function:saveBackup
    // function: async () => {
    //   await saveBackup()
    // },
  },

];

export default function Comandos() {

  // const [arrayComands, setComands] = React.useState(comands);




  return (
    <Grid container sx={{ justifyContent: 'center' }} spacing={1} marginTop={5}>
      {arrayComands.map((comand, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Paper elevation={5} sx={{ backgroundColor: comand.backgroundColor, marginBottom: 1 }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"100%"}
                  padding={1}
                  sx={{ backgroundColor: comand.backgroundColor, overflow: "hidden" }}
                >
                  <Typography variant="h7"  color={"text.accent"}>
                    {comand.name}
                  </Typography>
                  <Box sx={{ marginTop: 1 }} />
                  <Typography variant="h8" color={"text.accent"}>
                    {comand.info}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"100%"}
                  padding={2}
                  sx={{ backgroundColor: comand.backgroundColor, overflow: "hidden" }}
                >
                  <Box sx={{ color: 'rgba(0, 0, 0, 0.1)', filter: 'brightness(0.9)' }}>
                    {comand.icon}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  position="relative"
                  padding={1}
                  sx={{
                    backgroundColor: comand.backgroundColor,
                    filter: 'brightness(0.9)',
                    marginTop: 1,
                    overflow: "hidden",
                  }}
                >
                  <Button color="secondary" variant="contained" onClick={() => {comand.function() }}>
                    EJECUTAR
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
