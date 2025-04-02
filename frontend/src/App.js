import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Kit API Admin Panel
        </Typography>
        <Typography variant="body1">
          Witaj w panelu administracyjnym Kit API
        </Typography>
      </Box>
    </Container>
  );
}

export default App; 