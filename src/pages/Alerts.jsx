import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import API from "../services/api";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/alerts");
      setAlerts(res.data);
    };
    load();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Alerts</Typography>

      {alerts.map((a) => (
        <Card
          key={a._id}
          sx={{
            mt: 2,
            borderLeft: `5px solid ${
              a.severity === "high" ? "#ff5252" : "#ffa726"
            }`,
          }}
        >
          <CardContent>
            <Typography>{a.message}</Typography>
            <Typography color="error">{a.severity}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Alerts;