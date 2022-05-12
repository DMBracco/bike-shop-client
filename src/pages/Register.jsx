import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AccountsUrl } from '../constats/api';

const Register = () => {

    const [formData, setFormData] = useState({
        email:"",
        password: "",
        passwordConfirm: "",
        roleName: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const register = event => {
        event.preventDefault();

        if(formData.password !== formData.passwordConfirm){
            alert(`Пароли не совпадают`);
            return
        }

        const itemToCreate = {
            email: formData.email,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm,
            roleName: formData.roleName
        };

        const url = AccountsUrl.API_URL_REGISTER_USER;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer.message);
                alert(responseFromServer.message);
            })
            .catch((error) => {
                console.log(error);
                //alert(error);
            });
    }
      
  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
    >
        <h1>Регистрация</h1>
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
            <TextField
                name="passwordConfirm"
                label="Подтвердить пароль"
                value={formData.passwordConfirm}
                onChange={handleChange}
                fullWidth
                type="password"
                autoComplete="current-password"
                sx={{ my: 1}}
            />
            <SelectRole handleChange={handleChange} formData={formData}></SelectRole>

            <Button variant="contained" onClick={register}>Зарегистрироваться</Button>
            <Button variant="contained" component={Link} to={'/login'} color="secondary" sx={{ m: 1 }}>Войти</Button>
        </form>
    </Grid>
  )
}

export default Register

function SelectRole(props) {
    const [rolesData, setRolesData] = useState(null);
  
    useEffect(() => {
        const url = AccountsUrl.API_URL_GET_ROLES;
      
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(dataFromServer => {
            setRolesData(dataFromServer);
            console.log(dataFromServer);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }, []);

    if (rolesData === null) {
      return <h2>Loading role...</h2>;
    }
    return (
        <TextField
          name="roleName"
          select
          label="Выберите роль"
          value={props.formData.roleName}
          onChange={props.handleChange}
          fullWidth
          sx={{ my: 1}}
        >
          {rolesData.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </TextField>
    );
  }