import { CircularProgress, Container, Grid } from '@mui/material';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import useAuth from '../hooks/useAuth';
import Bike from '../pages/Bike';
import Client from '../pages/Client';
import Discount from '../pages/Discount';
import DiscountTable from '../pages/DiscountTable';
import Login from '../pages/Login';
import Order from '../pages/Order';
import Register from '../pages/Register';

export default function AppRoutes() {
    const auth = useAuth();

  return auth.isLoaded ? (
    <Container maxWidth="xl">
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Start />}/>
        <Route path="clients" element={
          <RequireAuth role={"admin"}>
            <Client />
          </RequireAuth>
        } />
        <Route path="bikes" element={
          <RequireAuth role={"admin"}>
            <Bike />
          </RequireAuth>
        } />
        <Route path="discount" element={
          <RequireAuth role={"admin"}>
            <Discount />
          </RequireAuth>
        } />
        <Route path="order" element={
          <RequireAuth role={"salesman"}>
            <Order />
          </RequireAuth>
        } />
        <Route path="discountTable" element={
          <RequireAuth role={"salesman"}>
            <DiscountTable />
          </RequireAuth>
        } />
    </Routes>
    </Container>
  ) : (
    <Container maxWidth="md">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item>
            <CircularProgress color="inherit" />
        </Grid>
        </Grid>
    </Container>
  )
}

  function Start() {
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1>Стартовое окно</h1>
        </Grid>
    );
  }