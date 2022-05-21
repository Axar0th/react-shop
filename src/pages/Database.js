import * as React from 'react';
import { useState, useEffect, isLoaded } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Button, ButtonGroup } from '@mui/material/';

function Database() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const getData = () => {

        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                }
            )

    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:5000/products")
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

    const ProductUpdate = id => {
        window.location.href = "/update/" + id
    }

    const InsertProduct = () => {
        window.location.href = "/create";
    }

    const ProductDelete = id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/products/delete", requestOptions)
            .then(response => response.json())
            .then(result => {
                getData();
            })
            .catch(error => console.log('error', error));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mt: 3 }} >
                <Button variant="contained" sx={{ mb: 5 }} onClick={() => InsertProduct()}>Add Product</Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Id</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Product</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow
                                    key={item.product_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0, p: 2 } }}>
                                    <TableCell component="th" scope="item">
                                        {item.product_id}
                                    </TableCell >
                                    <TableCell align="center">
                                        <Box display="flex" justifyContent="center" alignItem="center">
                                            <Avatar src={item.product_image} />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">{item.product_name}</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{item.price}$</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup disableElevation variant="contained" size="small">
                                            <Button sx={{ width: 50 }} onClick={() => ProductUpdate(item.product_id)}>EDIT</Button>
                                            <Button sx={{ backgroundColor: '#f44336' }} onClick={() => ProductDelete(item.product_id)}>DELETE</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    );
}

export default Database;