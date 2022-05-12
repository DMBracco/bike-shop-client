import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

export const AdminNavbar = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'clients'}
        >
            Клиенты
        </Button>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'bikes'}
        >
            Добавление товара
        </Button>
        <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            component={Link} 
            to={'discount'}
        >
            Скидки
        </Button>
    </Box>
  )
}