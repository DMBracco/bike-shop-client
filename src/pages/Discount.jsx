import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/system';
import DiscountCreateForm from '../components/Discount/DiscountCreateForm';
import { DiscountsUrl } from '../constats/api';
import DiscountUpdateForm from '../components/Discount/DiscountUpdateForm';
import { DataRemoveTime } from '../constats/service';

const Discount = () => {
    const [BASIC_DATA, SET_BASIC_DATA] = useState([]);
    const [SHOW_CREATE, SET_SHOW_CREATE] = useState(false);
    const [SHOW_UPDATE, SET_SHOW_UPDATE] = useState(null);

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

    function deletePost(id) {
        const url = DiscountsUrl.API_URL_BASE+`/${id}`;
    
        fetch(url, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(responseFromServer);
            onDeleted(id, responseFromServer);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }

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
                    <TableCell>Действия</TableCell>
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
                            {row.discountAmount}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {DataRemoveTime(row.dateStart)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {DataRemoveTime(row.dateEnd)}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <IconButton onClick={() => {SET_SHOW_UPDATE(row); SET_SHOW_CREATE(false)}}><Edit /></IconButton>
                            <IconButton 
                                onClick={() => { if(window.confirm(`Вы уверены, что хотите удалить запись под названием "${row.discountName}"?`)) deletePost(row.discountId) }}
                            >
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Button variant="contained"  onClick={() => {SET_SHOW_CREATE(true); SET_SHOW_UPDATE(null)}} sx={{ m: 1 }}>Создать запись</Button>
        </Grid>
        <Grid item xs={6}>
            <Box sx={{ m: 2 }}>
                {SHOW_CREATE && <DiscountCreateForm onCreated={onCreated}/>}
                {SHOW_UPDATE !== null && <DiscountUpdateForm BASIC_DATA={SHOW_UPDATE} onUpdated={onUpdated}/>}
            </Box>
        </Grid>
    </Grid>
  )
  
    function onCreated(createdData, responseFromServer) {
        SET_SHOW_CREATE(false);

        if (createdData === null) {
        return;
        }

        alert(`${responseFromServer}`);

        getData();
    }

    function onUpdated(updatedData, responseFromServer) {
        SET_SHOW_UPDATE(null);

        if (updatedData === null) {
            return;
        }

        getData();

        alert(`${responseFromServer}`);
    }

    function onDeleted(deletedItemByID, response) {
        let copyData = [...BASIC_DATA];

        const index = copyData.findIndex((copyDataPost) => {
            if (copyDataPost.discountId === deletedItemByID) {
            return true;
            }
        });

        if (index !== -1) {
            copyData.splice(index, 1);
        }

        SET_BASIC_DATA(copyData);

        alert(response);
    }
}

export default Discount