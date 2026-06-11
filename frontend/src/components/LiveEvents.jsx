import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function LiveEvents() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");
      console.log("EVENTS DATA:", response.data);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(() => {
      fetchEvents();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Live Events From Backend
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.id}</TableCell>
                  <TableCell>{event.user_id}</TableCell>
                  <TableCell>{event.product}</TableCell>
                  <TableCell>{event.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default LiveEvents;