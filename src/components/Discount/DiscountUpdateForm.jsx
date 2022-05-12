import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import { DiscountsUrl } from '../../constats/api';
import { DataRemoveTime } from '../../constats/service';

export default function DiscountUpdateForm(props) {
    const initialFormData = Object.freeze({
        discountName: props.BASIC_DATA.discountName,
        discountAmount: props.BASIC_DATA.discountAmount,
        dateStart: DataRemoveTime(props.BASIC_DATA.dateStart),
        dateEnd: DataRemoveTime(props.BASIC_DATA.dateEnd)
    });

    console.log("DiscountUpdateForm-");
    console.log(props.BASIC_DATA);

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
            discountName: formData.discountName,
            discountAmount: formData.discountAmount,
            dateStart: formData.dateStart,
            dateEnd: formData.dateEnd
        };

        const url = DiscountsUrl.API_URL_BASE;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
                props.onUpdated(itemToCreate, responseFromServer);
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
                name="discountName"
                label="Название"
                value={formData.discountName}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="discountAmount"
                label="Скидка в рублях"
                value={formData.discountAmount}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
            />
            <TextField
                name="dateStart"
                label="Дата начала"
                type="date"
                value={formData.dateStart}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ my: 1}}
                fullWidth
                onChange={handleChange}
            />
            <TextField
                name="dateEnd"
                label="Дата конца"
                type="date"
                value={formData.dateEnd}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ my: 1}}
                fullWidth
                onChange={handleChange}
            /> 

            <Button variant="contained"  onClick={handleSubmit} sx={{ m: 1 }}>Сохранить</Button>
            <Button variant="contained"  onClick={() => props.onUpdated(null)} color="warning" sx={{ m: 1 }}>Назад</Button>
        </Grid>
    );
}
