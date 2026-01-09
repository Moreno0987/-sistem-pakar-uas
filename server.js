const express = require("express");
const path = require("path");
const forwardChaining = require("./inference/forwardChaining");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/diagnose", (req, res) => {
  const { answers } = req.body;

  const result = forwardChaining(answers);

  if (!result) {
    return res.json({
      disease: "Tidak terdeteksi",
      cf: 0,
      message: "Gejala tidak cukup",
    });
  }

  res.json({
    disease: result.disease,
    cf: result.cf,
    message: "Diagnosis awal (bukan pengganti dokter)",
  });
});

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
