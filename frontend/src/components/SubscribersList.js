import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  TablePagination,
  Link,
} from '@mui/material';
import axios from 'axios';

// Serwis do pobierania danych
class SubscriberService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getSubscribers() {
    const response = await axios.get(`${this.apiUrl}/subscribers`);
    return response.data;
  }
}

// Komponent do wyświetlania pojedynczego wiersza
const SubscriberRow = ({ subscriber }) => {
  const phoneNumber = subscriber.fields?.undefined;
  const phoneLink = phoneNumber ? `tel:${phoneNumber}` : '#';

  return (
    <TableRow key={subscriber.id}>
      <TableCell>{subscriber.id}</TableCell>
      <TableCell>{subscriber.first_name || '-'}</TableCell>
      <TableCell>{subscriber.email_address}</TableCell>
      <TableCell>{subscriber.state}</TableCell>
      <TableCell>{new Date(subscriber.created_at).toLocaleDateString()}</TableCell>
      <TableCell>
        {phoneNumber ? (
          <Link href={phoneLink} color="primary">
            {phoneNumber}
          </Link>
        ) : (
          '-'
        )}
      </TableCell>
    </TableRow>
  );
};

// Komponent do wyświetlania nagłówka tabeli
const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>ID</TableCell>
      <TableCell>Imię</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Data utworzenia</TableCell>
      <TableCell>Telefon</TableCell>
    </TableRow>
  </TableHead>
);

// Komponent do wyświetlania stanu ładowania
const LoadingState = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
);

// Komponent do wyświetlania stanu błędu
const ErrorState = ({ error }) => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <Typography color="error">{error}</Typography>
  </Box>
);

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const subscriberService = new SubscriberService(process.env.REACT_APP_API_URL);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const data = await subscriberService.getSubscribers();
        setSubscribers(data.subscribers);
        setTotalCount(data.subscribers.length);
      } catch (err) {
        setError('Wystąpił błąd podczas pobierania subskrybentów');
        console.error('Błąd:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHeader />
          <TableBody>
            {subscribers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber) => (
                <SubscriberRow key={subscriber.id} subscriber={subscriber} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Wierszy na stronie:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
      />
    </Paper>
  );
};

export default SubscribersList; 