import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avartar from '@mui/material/Avatar';


function Update() {

    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/products/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setProductName(result[0]['product_name']);
                    setQuantity(result[0]['quantity']);
                    setPrice(result[0]['price']);
                    setProductImage(result[0]['product_image']);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [id])



    const [product_name, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [product_image, setProductImage] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "product_id": id,
            "product_name": product_name,
            "quantity": quantity,
            "price": price,
            "product_image": product_image
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/products/update", requestOptions)
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
                <Typography variant="h4" gutterBottom componenet="div" sx={{ mt: 10 }}>
                    Update Product
                </Typography>
                <Box sx={{ height: '100vh', display: 'flex' }} justifyContent="center" >

                    <form onSubmit={handleSubmit}>
                        <div sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center" alignItem="center" >

                            {items.map(item => (
                                <Avartar src={item.product_image} sx={{ width: "100%", height: 400 }} variant="square" />
                            ))}

                            <TextField id="product_name" label="Product Name" variant="standard" sx={{ display: 'block', mt: 10, pb: 5 }} fullWidth required onChange={(e) => setProductName(e.target.value)} value={product_name} />

                            <TextField id="quantity" label="Quantity" variant="standard" sx={{ display: 'block', pb: 5 }} fullWidth required onChange={(e) => setQuantity(e.target.value)} value={quantity} />

                            <TextField id="price" label="Price" variant="standard" sx={{ display: 'block', pb: 5 }} fullWidth required onChange={(e) => setPrice(e.target.value)} value={price} />

                            <TextField id="image" label="Image" variant="standard" sx={{ display: 'block', pb: 5 }} fullWidth required onChange={(e) => setProductImage(e.target.value)} value={product_image} />
                        </div>

                        <Button type="submit" variant="contained" fullWidth>Update</Button>

                    </form>

                </Box>

            </Container>
        </React.Fragment>
    );
}

export default Update;