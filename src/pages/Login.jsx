import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AccountsUrl } from '../constats/api';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const auth = useAuth();

    const [formData, setFormData] = useState({
        email:"",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    async function fetchLogin(url,itemToCreate) {
        const response = await fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToCreate)
        });
        if (!response.ok) {
          const message = `Ошибка: ${response.status}`;
          throw new Error(message);
        }
        const result = await response.json();
        return result;
      }

    const login = event => {
        event.preventDefault();

        const itemToCreate = {
            email: formData.email,
            password: formData.password
        };

        const url = AccountsUrl.API_URL_LOGIN_USER;

        try {
            const loginData = fetchLogin(url, itemToCreate);
            loginData.then(function(result) {
                if(result.user !== null){
                    auth.setUser(result.user);
                    auth.setUserRole(result.roleName);
                }

                console.log(auth.user);

                alert(result.message)
            });
            
        } catch (e) {
            alert("ошибка");
        } finally {
        }
    }

    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h1>Вход</h1>
            <form>
                <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    sx={{ my: 1}}
                />
                <TextField
                    name="password"
                    label="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    type="password"
                    autoComplete="current-password"
                    sx={{ my: 1}}
                />
                <Button variant="contained" onClick={login}>Войти</Button>
                <Button variant="contained" component={Link} to={'/register'} color="secondary" sx={{ m: 1 }}>Регистрация</Button>
            </form>
        </Grid>
    );
};

export default Login