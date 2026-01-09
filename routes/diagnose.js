const forwardChaining = require("../inference/forwardChaining");

router.post("/diagnose", (req, res) => {
  const { answers } = req.body;

  console.log("ANSWERS DARI FRONTEND:", answers);

  const result = forwardChaining(answers);

  if (!result) {
    return res.json({
      disease: "Tidak terdeteksi",
      cf: 0,
      message: "Gejala tidak cukup atau tidak cocok dengan rule.",
    });
  }

  res.json({
    disease: result.disease,
    cf: result.cf,
    message: "Hasil berdasarkan forward chaining",
  });
});

