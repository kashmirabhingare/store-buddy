import { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import API from "../services/api";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", currentStock: "" });

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async () => {
    await API.post("/products", form);
    setForm({ name: "", currentStock: "" });
    fetchProducts();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Add Product</Typography>

      <TextField fullWidth margin="normal"
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <TextField fullWidth margin="normal"
        label="Stock"
        value={form.currentStock}
        onChange={(e) => setForm({ ...form, currentStock: e.target.value })}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Add
      </Button>

      {products.map((p) => (
        <Card key={p._id} sx={{ mt: 2 }}>
          <CardContent>
            {p.name} - {p.currentStock}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Inventory;