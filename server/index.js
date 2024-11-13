const express = require('express');
const app = express();
const port = 5001;  // Backend API runs on port 5000

app.use(express.json());

// Example route
app.get('/api/greet', (req, res) => {
  res.json({ message: "Rony" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
