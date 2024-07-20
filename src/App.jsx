import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'https://parking-task.onrender.com/api/parkinglot';

function App() {
  const [vehicleType, setVehicleType] = useState('CAR');
  const [regNumber, setRegNumber] = useState('');
  const [color, setColor] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [result, setResult] = useState('');

  const parkVehicle = async () => {
    try {
      console.log(vehicleType);
      console.log(regNumber);
      console.log(color);
      const response = await axios.post(`${API_BASE_URL}/park`, {
        Type: vehicleType,
        RegistrationNumber: regNumber,
        Color: color
      });
      setResult(response.data);
    } catch (error) {
      setResult('Error: Unable to park vehicle');
    }
  };

  const unparkVehicle = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/unpark`, JSON.stringify(ticketId), {
        headers: { 'Content-Type': 'application/json' }
      });
      setResult(response.data);
    } catch (error) {
      setResult('Error: Unable to unpark vehicle');
    }
  };

  const displayInfo = async (infoType) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${infoType}/${vehicleType}`);
      setResult(response.data.join('\n'));
    } catch (error) {
      setResult(`Error: Unable to fetch ${infoType}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Parking Lot System
      </Typography>
      <Box my={4}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Vehicle Type</InputLabel>
          <Select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <MenuItem value="CAR">Car</MenuItem>
            <MenuItem value="BIKE">Bike</MenuItem>
            <MenuItem value="TRUCK">Truck</MenuItem>
          </Select>
        </FormControl>
        <TextField fullWidth margin="normal" label="Registration Number" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} />
        <TextField fullWidth margin="normal" label="Color" value={color} onChange={(e) => setColor(e.target.value)} />
        <Button fullWidth variant="contained" color="primary" onClick={parkVehicle}>Park Vehicle</Button>
      </Box>
      <Box my={4}>
        <TextField fullWidth margin="normal" label="Ticket ID" value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
        <Button fullWidth variant="contained" color="secondary" onClick={unparkVehicle}>Unpark Vehicle</Button>
      </Box>
      <Box my={4}>
        <Button variant="outlined" onClick={() => displayInfo('free-count')}>Display Free Count</Button>
        <Button variant="outlined" onClick={() => displayInfo('free-slots')}>Display Free Slots</Button>
        <Button variant="outlined" onClick={() => displayInfo('occupied-slots')}>Display Occupied Slots</Button>
      </Box>
      <Box my={4}>
        <Typography variant="h6">Result:</Typography>
        <pre>{result}</pre>
      </Box>
    </Container>
  );
}

export default App;