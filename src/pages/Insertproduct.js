import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';


function Insertproduct() {


    const [product_name, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [product_image, setProductImage] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "product_name": product_name,
            "quantity": quantity,
            "price": price,
            "product_image": product_image
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/products/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                window.location.href = "/database"

            })
            .catch(error => console.log('error', error));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Typography variant="h3" gutterBottom componenet="div" align="center" sx={{ mt: 10 }}>
                    Insert Product
                </Typography>
                <Box sx={{ height: '100vh', display: 'flex' }} justifyContent="center" >

                    <form onSubmit={handleSubmit}>

                        <div sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center" alignItem="center" >

                            <TextField id="product_name" label="Product Name" variant="standard" sx={{ display: 'block', mt: 10, pb: 5 }} fullWidth required onChange={(e) => setProductName(e.target.value)} />

                            <TextField id="quantity" label="Quantity" variant="standard" sx={{ display: 'block', pb: 5 }} fullWidth required onChange={(e) => setQuantity(e.target.value)} />

                            <TextField id="price" label="Price" variant="standard" sx={{ display: 'block', pb: 5 }} fullWidth required onChange={(e) => setPrice(e.target.value)} />

                            <TextField id="image" label="Image" variant="standard" sx={{ display: 'block', pb: 5 }} fullWidth onChange={(e) => setProductImage(e.target.value)} />
                        </div>

                        <Button type="submit" variant="contained" fullWidth>INSERT</Button>

                    </form>

                </Box>

            </Container>
        </React.Fragment>
    );

}

export default Insertproduct;