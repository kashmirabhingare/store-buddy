import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const RiskCard = ({ score }) => {
  let color = "green";
  if (score > 60) color = "red";
  else if (score > 30) color = "orange";

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Business Risk Score</Typography>
        <Typography variant="h4" style={{ color }}>
          {score}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RiskCard;
