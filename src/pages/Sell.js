import * as React from 'react';
import { useState, useEffect, isLoaded } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

function Sell() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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

    const [id, setId] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [date, setDate] = React.useState('');


    const formChange = (event) => {
        setId(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "product_id": id,
            "sold_quantity": quantity,
            "sold_price": price,
            "sold_date": date
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/sold/create", requestOptions)
            .then(response => response.json())
            .then(result => {
                window.location.href = "/dashboard"

            })
            .catch(error => console.log('error', error));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">

                <Typography variant="h4" gutterBottom >
                    Sell Page
                </Typography>

                <form onSubmit={handleSubmit}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">

                        <InputLabel id="demo-select-small">Product</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={id}
                            label="Age"
                            onChange={formChange} required
                        >
                            < MenuItem value="" >

                            </MenuItem>
                            {items.map(item => (
                                < MenuItem value={item.product_id} >
                                    {item.product_name}
                                </MenuItem>

                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        id="standard-number"
                        label="Quantity"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                        onChange={(e) => setQuantity(e.target.value)} required
                    />

                    <FormControl fullWidth sx={{ mt: 5, mb: 5 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            onChange={(e) => setPrice(e.target.value)} required />
                    </FormControl>

                    <TextField id="standard-basic" label="YYYY-MM-DD" variant="standard" required onChange={(e) => setDate(e.target.value)} />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 5 }}>DONE</Button>

                </form>


            </Container>
        </React.Fragment >
    );

}

export default Sell;