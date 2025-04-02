import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SubscribersList from './components/SubscribersList';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Kit API Admin Panel
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
          Lista Subskrybentów
        </Typography>
        <SubscribersList />
      </Box>
    </Container>
  );
}

export default App; 