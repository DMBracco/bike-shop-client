import React, { useEffect, useState } from 'react'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DataRemoveTime } from '../constats/service';
import { DiscountsUrl } from '../constats/api';

const DiscountTable = () => {
    const [BASIC_DATA, SET_BASIC_DATA] = useState([]);

    function getData() {
        const url = DiscountsUrl.API_URL_BASE;

        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(dataFromServer => {
            SET_BASIC_DATA(dataFromServer);
            })
        .catch((error) => {
            console.log(error);
            alert(error);
            });
    }

    useEffect(() => {
        getData()
    },[])

  return (
    <Grid container spacing={1}>
        <Grid item xs={6}>
            <h2>Все скидки</h2>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Размер</TableCell>
                    <TableCell>Начало</TableCell>
                    <TableCell>Конец</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {BASIC_DATA.map((row) => (
                    <TableRow
                        key={row.discountId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.discountName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.discountAmount} ₽
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {DataRemoveTime(row.dateStart)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {DataRemoveTime(row.dateEnd)}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
    </Grid>
  )
}

export default DiscountTable