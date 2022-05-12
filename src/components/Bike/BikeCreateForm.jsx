import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { BikesUrl } from '../../constats/api';

export default function BikeCreateForm(props) {
    const initialFormData = Object.freeze({
        maxSpeed: "",
        availability: "",
        brandName: "",
        colorName: "",
        complectationName: "",
        modelName: "",
        power: "",
        price: "",
        torque: "",
        transmissionType: ""
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const itemToCreate = {
            maxSpeed: formData.maxSpeed,
            availability: formData.availability,
            brandName: formData.brandName,
            colorName: formData.colorName,
            complectationName: formData.complectationName,
            modelName: formData.modelName,
            power: formData.power,
            price: formData.price,
            torque: formData.torque,
            transmissionType: formData.transmissionType
        };

        const url = BikesUrl.API_URL_BASE;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                props.onCreated(itemToCreate, responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h2>Создать новую запись</h2>

            <TextField
                name="brandName"
                label="Бренд"
                value={formData.brandName}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="modelName"
                label="Модель"
                value={formData.modelName}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="colorName"
                label="Цвет"
                value={formData.colorName}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="maxSpeed"
                label="Скорость"
                value={formData.maxSpeed}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="availability"
                label="Наличие"
                value={formData.availability}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="price"
                label="Цена"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />

            <Button variant="contained"  onClick={handleSubmit} sx={{ m: 1 }}>Сохранить</Button>
            <Button variant="contained"  onClick={() => props.onCreated(null)} color="warning" sx={{ m: 1 }}>Назад</Button>
        </Grid>
    );
}