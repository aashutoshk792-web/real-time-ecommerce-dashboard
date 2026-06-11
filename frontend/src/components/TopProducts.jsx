import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const products = [
  {
    name: "iPhone 15",
    sales: 120,
    revenue: "₹1,20,000",
  },
  {
    name: "Samsung S24",
    sales: 95,
    revenue: "₹95,000",
  },
  {
    name: "MacBook Air",
    sales: 60,
    revenue: "₹1,80,000",
  },
  {
    name: "AirPods Pro",
    sales: 150,
    revenue: "₹75,000",
  },
];

function TopProducts() {
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
        sx={{
          p: 2,
        }}
      >
        Top Products 🛒
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Sales</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sales}</TableCell>
              <TableCell>{product.revenue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TopProducts;