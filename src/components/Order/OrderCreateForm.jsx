import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BikesUrl, ClientUrl, DiscountsUrl, OrdersUrl } from '../../constats/api';
import { DataRemoveTime, Logging } from '../../constats/service';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

export default function OrderCreateForm(props) {
    const initialFormData = Object.freeze({
        createdDate: "",
        summa: 0,
        clientId: 0,
        bikeIds: ([]),
        itog: 0
    });

    const [formData, setFormData] = useState(initialFormData);
    const [clients, setClients] = useState(null);
    const [bikes, setBikes] = useState(null);
    const [formBikes, setFormBikes] = useState({bikeNames: ([]), bikeIds: ([])});
    const [discounts, setDiscounts] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeBikes = (e) => {
        let newIds = [];
        let newSumma = 0;
        bikes.forEach(bike => {
            e.target.value.forEach(name => {
                if((bike.brandName+" "+bike.modelName) === name){
                    newIds.push(bike.bikeId);
                    newSumma += bike.price;
                }
            })
        })

        setFormBikes({
            ...formBikes,
            bikeNames: e.target.value,
            bikeIds: newIds
        });

        setFormData({
            ...formData,
            summa: newSumma,
        });

        console.log("OrderCreateForm/handleChangeBikes-");
        console.log(newIds);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const itemToCreate = {
            CreatedDate: formData.createdDate,
            Summa: formData.itog,
            ClientId: formData.clientId,
            BikeIds: (formBikes.bikeIds)
        };

        const url = OrdersUrl.API_URL_BASE;

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

    useEffect(() => {
        const url = ClientUrl.API_URL_BASE;

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(responseFromServer => {
                setClients(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        const urlBike = BikesUrl.API_URL_BASE;

        fetch(urlBike, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(responseFromServer => {
                setBikes(responseFromServer);
                Logging("OrderCreateForm/Bikes-", responseFromServer, false)
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        const urlDiscount = DiscountsUrl.API_URL_BASE;

        fetch(urlDiscount, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(dataFromServer => {
            setDiscounts(dataFromServer);
            Logging("OrderCreateForm/GetDiscount-", dataFromServer, true)
            })
        .catch((error) => {
            console.log(error);
            alert(error);
            });
    },[])

    function DiscountCheck() {
        let oldDiscountAmount = true;
        let newDiscountAmount = 0;
        discounts.forEach(discount => {
            if(DataRemoveTime(discount.dateStart) <= formData.createdDate && DataRemoveTime(discount.dateEnd) >= formData.createdDate){
                setDiscountAmount(discount.discountAmount);
                newDiscountAmount = discount.discountAmount;
                oldDiscountAmount = false;
                Logging("OrderDiscountInput/DiscountCheck-", discount.discountAmount, true)
            }
        })

        if(oldDiscountAmount){
            setDiscountAmount(0);
        }

        setFormData({
            ...formData,
            itog: formData.summa-newDiscountAmount,
        });
        
        Logging("OrderDiscountInput/DiscountCheck-", discountAmount, false)
    }

    useEffect(() => {
        if(null !== discounts) {
            DiscountCheck()
        }
        
    },[formData.createdDate, formBikes])

    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <h2>Создать новую запись</h2>

            <TextField
                name="createdDate"
                label="Дата и время"
                type="date"
                value={formData.createdDate}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ my: 1}}
                fullWidth
                onChange={handleChange}
            />  
            <TextField
                name="summa"
                label="Сумма"
                value={formData.summa}
                fullWidth
                sx={{ my: 1}}
            />

            <TextField
                label="Скидка в ₽"
                value={discountAmount}
                fullWidth
                sx={{ my: 1}}
            />

            <TextField
                name="itog"
                label="Итог"
                value={formData.itog}
                fullWidth
                sx={{ my: 1}}
            />

            {clients !== null &&
              <TextField
                name="clientId"
                select
                label="Выберите клиента"
                value={formData.clientId}
                onChange={handleChange}
                fullWidth
                sx={{ my: 1}}
                >
                {clients.map((item) => (
                        <MenuItem key={item.clientId} value={item.clientId}>
                            {item.surname} {item.name}
                        </MenuItem>
                    ))}
              </TextField>
            }

            {bikes !== null &&
            <FormControl sx={{ m: 1}} fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">Байки</InputLabel>
                <Select
                multiple
                name="bikeNames"
                value={formBikes.bikeNames}
                onChange={handleChangeBikes}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {bikes.map((bike) => (
                    <MenuItem 
                        key={bike.bikeId} 
                        value={bike.brandName+" "+bike.modelName} 
                    >
                        <Checkbox 
                            checked={formBikes.bikeNames.indexOf(bike.brandName+" "+bike.modelName) > -1} 
                        />
                        <ListItemText primary={bike.brandName+" "+bike.modelName} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            }

            <Button variant="contained"  onClick={handleSubmit} sx={{ m: 1 }}>Сохранить</Button>
            <Button variant="contained"  onClick={() => props.onCreated(null)} color="warning" sx={{ m: 1 }}>Назад</Button>
        </Grid>
    );
}