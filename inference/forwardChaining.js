const rules = require("../rules/rules");
const gejalaMap = require("./gejalaMap");

function forwardChaining(answers) {
  if (!answers || typeof answers !== "object") return null;

  // 1️⃣ object answers → fakta
  const faktaUser = Object.keys(answers)
    .filter((k) => answers[k] === true)
    .map((k) => gejalaMap[k])
    .filter(Boolean);

  if (faktaUser.length === 0) return null;

  // 2️⃣ hitung CF per penyakit
  const hasil = {};

  rules.forEach((rule) => {
    const cocok = rule.if.filter((g) => faktaUser.includes(g));

    if (cocok.length >= 1) {
      const cfUser = cocok.length / rule.if.length;
      const cfRule = rule.cf * cfUser;

      if (!hasil[rule.then]) {
        hasil[rule.then] = cfRule;
      } else {
        // rumus combine CF
        hasil[rule.then] = hasil[rule.then] + cfRule * (1 - hasil[rule.then]);
      }
    }
  });

  if (Object.keys(hasil).length === 0) return null;

  // 3️⃣ ambil CF tertinggi
  let disease = null;
  let cfTerbaik = 0;

  for (const p in hasil) {
    if (hasil[p] > cfTerbaik) {
      disease = p;
      cfTerbaik = hasil[p];
    }
  }

  // 🔒 BATASI CF (diagnosa awal tidak boleh 100%)
  const MAX_CF = 0.95;

  return {
    disease,
    cf: Math.round(Math.min(cfTerbaik, MAX_CF) * 100),
  };
}

module.exports = forwardChaining;
