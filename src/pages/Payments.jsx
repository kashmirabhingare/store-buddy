import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  Grid,
  Chip,
} from "@mui/material";
import API from "../services/api";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
  customerName: "",
  amount: "",
  dueDate: "",
});


  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // 🔄 Fetch payments
  const fetchPayments = async () => {
    const res = await API.get("/payments");
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ✅ Validation
  const validate = () => {
    let tempErrors = {};

    if (!form.customerName.trim()) {
      tempErrors.customerName = "Customer name is required";
    }

    if (!form.amount) {
      tempErrors.amount = "Amount is required";
    } else if (isNaN(form.amount) || Number(form.amount) <= 0) {
      tempErrors.amount = "Enter a valid positive amount";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ➕ Add payment
  const handleSubmit = async () => {
    setSuccess("");

    if (!validate()) return;

    try {
      await API.post("/payments", {
  customerName: form.customerName,
  amount: Number(form.amount),
  dueDate: form.dueDate,
});

      setForm({ customerName: "", amount: "" });
      setErrors({});
      setSuccess("Payment added successfully ✅");
      fetchPayments();
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Mark as paid
  const markAsPaid = async (id) => {
    try {
      await API.put(`/payments/${id}`, { status: "paid" });
      fetchPayments();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔍 Split payments
  const paidPayments = payments.filter((p) => p.status === "paid");
  const pendingPayments = payments.filter((p) => p.status !== "paid");

  return (
    <Container sx={{ mt: 4 }}>
      {/* ===== Add Payment Form ===== */}
      <Typography variant="h5" gutterBottom>
        Add Payment
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        fullWidth
        margin="normal"
        label="Customer"
        value={form.customerName}
        error={!!errors.customerName}
        helperText={errors.customerName}
        onChange={(e) =>
          setForm({ ...form, customerName: e.target.value })
        }
      />

      <TextField
        fullWidth
        margin="normal"
        label="Amount"
        type="number"
        value={form.amount}
        error={!!errors.amount}
        helperText={errors.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <TextField
  fullWidth
  margin="normal"
  label="Due Date"
  type="date"
  InputLabelProps={{ shrink: true }}
  value={form.dueDate}
  onChange={(e) =>
    setForm({ ...form, dueDate: e.target.value })
  }
/>


      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={!form.customerName || !form.amount}
      >
        Add Payment
      </Button>

      {/* ===== Pending Payments ===== */}
      <Typography variant="h6" sx={{ mt: 5 }}>
        Pending Payments
      </Typography>

      {pendingPayments.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No pending payments
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {pendingPayments.map((p) => (
          <Grid item xs={12} md={6} key={p._id}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography fontWeight={600}>
                    {p.customerName}
                  </Typography>
                  <Typography color="text.secondary">
                    ₹{p.amount}
                  </Typography>
                </div>

                <Button
                  variant="contained"
                  color="success"
                  onClick={() => markAsPaid(p._id)}
                >
                  Mark Paid
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== Paid Payments ===== */}
      <Typography variant="h6" sx={{ mt: 5 }}>
        Paid Payments
      </Typography>

      {paidPayments.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No paid payments yet
        </Alert>
      )}

      {/* ===== PAID PAYMENTS ===== */}
<Typography variant="h5" sx={{ mt: 5, mb: 2, fontWeight: 600 }}>
  Paid Payments
</Typography>

<Grid container spacing={3}>
  {payments
    .filter((p) => p.status === "paid")
    .map((p) => (
      <Grid item xs={12} sm={6} md={4} key={p._id}>
        <Card
          sx={{
            borderRadius: 3,
            background: "linear-gradient(145deg,#052e16,#022c22)",
            color: "#d1fae5",
            boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
            transition: "0.3s",
            "&:hover": { transform: "translateY(-4px)" },
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {p.customerName}
            </Typography>

            <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
              ₹{p.amount}
            </Typography>

            <Chip
              label="Paid"
              color="success"
              sx={{ mt: 2, fontWeight: 600 }}
            />
          </CardContent>
        </Card>
      </Grid>
    ))}
</Grid>

    </Container>
  );
};

export default Payments;
