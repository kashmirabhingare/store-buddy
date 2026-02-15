import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const AlertCard = ({ alert, onApprove }) => {
  return (
    <Card style={{ marginBottom: "10px" }}>
      <CardContent>
        <Typography variant="h6">{alert.message}</Typography>
        <Typography color="textSecondary">
          Suggested: {alert.suggestedAction}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onApprove(alert._id)}
        >
          Approve Action
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
