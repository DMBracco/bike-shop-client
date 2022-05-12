import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { BikesUrl } from '../../constats/api';

export default function BikeUpdateForm(props) {
  const initialFormData = Object.freeze({
    bikeId: props.BASIC_DATA.bikeId,
    maxSpeed: props.BASIC_DATA.maxSpeed,
    availability: props.BASIC_DATA.availability,
    brandName: props.BASIC_DATA.brandName,
    colorName: props.BASIC_DATA.colorName,
    complectationName: props.BASIC_DATA.complectationName,
    modelName: props.BASIC_DATA.modelName,
    power: props.BASIC_DATA.power,
    price: props.BASIC_DATA.price,
    torque: props.BASIC_DATA.torque,
    transmissionType: props.BASIC_DATA.transmissionType
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

    const itemToUpdate = {
      bikeId: props.BASIC_DATA.bikeId,
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

    const url = BikesUrl.API_URL_BASE+'/'+props.BASIC_DATA.bikeId;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemToUpdate)
    })
        .then(response => response.json())
        .then(responseFromServer => {
            console.log(responseFromServer);
            props.onUpdated(itemToUpdate, responseFromServer);
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
        <h2>Обновление записи под названием - "{props.BASIC_DATA.name}".</h2>

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
        <Button variant="contained"  onClick={() => props.onUpdated(null, null)} color="secondary" sx={{ m: 1 }}>Назад</Button>
    </Grid>
);
}
