import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const activities = [
  "🛒 New Order #1025 received",
  "💳 Payment of ₹5,200 completed",
  "📦 Product shipped to Delhi",
  "👤 New user registered",
  "⭐ Customer left a 5-star review",
];

function LiveActivity() {
  return (
    <Card sx={{ mt: 4, borderRadius: 4 }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Live Activity Feed ⚡
        </Typography>

        <List>
          {activities.map((activity, index) => (
            <ListItem key={index}>
              <ListItemText primary={activity} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default LiveActivity;