import * as React from 'react';
import InfoCuartos from '../Components/Papers/InfoCuartos.jsx';
import { Paper, Typography, Grid, Box, Container } from "@mui/material";


export default function Home() {

  return (
    <Box margin={"2rem"}>
      <Typography variant="h3" noWrap >
        Home
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <InfoCuartos />
        </Grid>
        <Grid item xs={3} sm={3} >
          <Typography variant="h5" noWrap sx={{ backgroundColor:"colors.green" }} paddingBottom={33}>
          Algo que se me ocurra aqui que vaya
           </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
          <Typography variant="h5" noWrap sx={{ backgroundColor:"colors.red" }} paddingBottom={33}>
          Notificaciones o algo
           </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant="h5" noWrap sx={{ backgroundColor:"colors.gold" }} paddingBottom={33}>
          Lista de Habitaciones que estan ocupadas en este momento
           </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
