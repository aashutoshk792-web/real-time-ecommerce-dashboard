import { Card, CardContent, Typography } from "@mui/material";

function StatCard({ title, value, growth }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontWeight: "bold",
          }}
        >
          {value}
        </Typography>

        <Typography
          color="success.main"
          sx={{
            mt: 1,
            fontWeight: 600,
          }}
        >
          {growth}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;