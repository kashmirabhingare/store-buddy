import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, color }) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(145deg,#1e293b,#111827)",
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 0 20px ${color}`,
        },
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="gray">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;