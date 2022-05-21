import * as React from 'react';
import { useState, useEffect, isLoaded } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chart, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { DateRange } from '@mui/icons-material';

function Dashboard() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/sold")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    var datelist = []
    var quantitylist = []
    var pricelist = []
    var product_name_list = []
    var f, d, nd


    {
        items.map(item => (

            product_name_list.push(item.product_name),
            datelist.push(item.sold_date),
            quantitylist.push(item.sold_quantity),
            pricelist.push(item.sold_price)
        ))
    }



    var newDateArr = []
    var newQuantityArr = []
    let total_sold = 0

    let chars = ['A', 'B', 'A', 'C', 'B'];
    newDateArr = [...new Set(datelist)];

    for (var i = 0; i < datelist.length; i++) {
        if (datelist[i] == datelist[i + 1]) {
            newQuantityArr.push(quantitylist[i] += quantitylist[i + 1])
        } else if (datelist[i] == datelist[i - 1]) {
            //pass
        } else {
            newQuantityArr.push(quantitylist[i])
        }
    }


    for (var i = 0; i < pricelist.length; i++) {
        total_sold += pricelist[i]
    }






    //Chart Data
    const data = {
        labels: newDateArr,
        datasets: [{
            data: newQuantityArr,
            borderColor: 'rgb(75, 192, 192)'
        }]

    }

    //Grid function
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (


        <React.Fragment>
            <CssBaseline />



            <Container maxWidth="xl" >

                <Typography variant="h4" gutterBottom sx={{ mt: 5, mb: 5 }}>
                    Dashboard
                </Typography>



                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={3}>
                            <Item>
                                <h2>Total</h2>
                                <h4>{total_sold}$</h4>
                            </Item>
                            <Item sx={{ mt: 5 }}>
                                <h2>BEST</h2>
                                <h4></h4>
                            </Item>
                            <Item sx={{ mt: 5 }}>
                                <h2>WORST</h2>
                                <h4></h4>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Line data={data} />
                        </Grid>
                    </Grid>
                </Box>


                <TableContainer component={Paper} sx={{ mt: 10, mb: 80 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Id</TableCell>
                                <TableCell align="right">Sold product</TableCell>
                                <TableCell align="right">Sold quantity</TableCell>
                                <TableCell align="right">Sold price</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow
                                    key={item.sold_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0, p: 2 } }}>
                                    <TableCell component="th" scope="item">
                                        {item.sold_id}
                                    </TableCell >
                                    <TableCell align="right">{item.product_name}</TableCell>
                                    <TableCell align="right">{item.sold_quantity}</TableCell>
                                    <TableCell align="right">{item.sold_price}</TableCell>
                                    <TableCell align="right">{item.sold_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment >
    );

}

export default Dashboard;