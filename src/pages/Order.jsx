import React, { useEffect, useState } from 'react'
import { OrdersUrl } from '../constats/api';
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/system';
import OrderCreateForm from '../components/Order/OrderCreateForm';
import OrderUpdateForm from '../components/Order/OrderUpdateForm';
import { DataRemoveTime } from '../constats/service';

const Order = () => {
  const [BASIC_DATA, SET_BASIC_DATA] = useState([]);
  const [SHOW_CREATE, SET_SHOW_CREATE] = useState(false);
  const [SHOW_UPDATE, SET_SHOW_UPDATE] = useState(null);
  const [formBikes, setFormBikes] = useState({bikeNames: ([]), bikeIds: ([])});
  const [discountAmount, setDiscountAmount] = useState(0);

  function getData() {
      const url = OrdersUrl.API_URL_BASE;

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
      const url = OrdersUrl.API_URL_BASE+`/${id}`;
  
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

    function showUpdate(row) {
        SET_SHOW_UPDATE(row); 
        SET_SHOW_CREATE(false);

        let newBikeNames = [];
        let newBikeIds = [];

        row.bikes.forEach(bike => {
            newBikeNames.push(bike.brandName+" "+bike.modelName);
            newBikeIds.push(bike.bikeId);
        })
        setFormBikes({
            ...formBikes,
            bikeNames: newBikeNames,
            bikeIds: newBikeIds
        });

        console.log("Order/showUpdate-");
        console.log(formBikes);
    }

return (
  <Grid container spacing={1}>
      <Grid item xs={6}>
          <h2>Все заказы</h2>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell>Номер</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Сумма</TableCell>
                  <TableCell>Клиенты</TableCell>
                  <TableCell>Байки</TableCell>
                  <TableCell>Действия</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {BASIC_DATA.map((row) => (
                  <TableRow
                      key={row.orderId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell component="th" scope="row">
                          {row.orderId}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {DataRemoveTime(row.createdDate)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.summa}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.clientFullName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.bikes.map((item) => (
                          item.brandName + " " + item.modelName + "; "
                        ))}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {/* <IconButton onClick={() => showUpdate(row)}><Edit /></IconButton> */}
                          <IconButton onClick={() => { if(window.confirm(`Вы уверены, что хотите удалить запись "${row.orderId}"?`)) deletePost(row.orderId) }}><Delete /></IconButton>
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
              {SHOW_CREATE && <OrderCreateForm onCreated={onCreated} setDiscountAmount={setDiscountAmount} />}
              {/* {SHOW_UPDATE !== null && <OrderUpdateForm BASIC_DATA={SHOW_UPDATE} onUpdated={onUpdated} formBikes={formBikes} discountAmount={discountAmount} />} */}
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
          if (copyDataPost.orderId === deletedItemByID) {
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

export default Order