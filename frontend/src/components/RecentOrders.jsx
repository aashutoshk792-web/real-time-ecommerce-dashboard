import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

const orders = [
  {
    id: "#1001",
    customer: "Amit Kumar",
    amount: "₹2,500",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Rahul Singh",
    amount: "₹1,800",
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Priya Sharma",
    amount: "₹4,200",
    status: "Delivered",
  },
  {
    id: "#1004",
    customer: "Neha Gupta",
    amount: "₹3,100",
    status: "Processing",
  },
];

function RecentOrders() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        backgroundColor: "#111827",
      }}
    >
      <Typography
        variant="h6"
        sx={{ p: 2 }}
      >
        Recent Orders 📦
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>
                <Chip
                  label={order.status}
                  color={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Pending"
                      ? "warning"
                      : "info"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecentOrders;