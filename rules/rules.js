module.exports = [
  // ===== DBD =====
  {
    if: ["demam", "sakit_kepala", "nyeri_otot", "ruam"],
    then: "DBD",
    cf: 0.85,
  },
  { if: ["demam", "nyeri_otot", "lemas"], then: "DBD", cf: 0.75 },
  { if: ["demam", "sakit_kepala", "ruam"], then: "DBD", cf: 0.8 },
  { if: ["demam", "mual", "nyeri_otot"], then: "DBD", cf: 0.7 },
  { if: ["demam", "lemas", "ruam"], then: "DBD", cf: 0.75 },

  // ===== MALARIA =====
  { if: ["demam", "menggigil", "lemas"], then: "Malaria", cf: 0.85 },
  { if: ["demam", "menggigil"], then: "Malaria", cf: 0.75 },
  { if: ["demam", "sakit_kepala", "menggigil"], then: "Malaria", cf: 0.8 },
  { if: ["demam", "mual", "menggigil"], then: "Malaria", cf: 0.7 },
  { if: ["demam", "lemas"], then: "Malaria", cf: 0.6 },

  // ===== TIFUS =====
  { if: ["demam", "mual", "lemas"], then: "Tifus", cf: 0.8 },
  { if: ["demam", "sakit_kepala", "lemas"], then: "Tifus", cf: 0.75 },
  { if: ["demam", "mual"], then: "Tifus", cf: 0.65 },
  { if: ["demam", "sakit_kepala"], then: "Tifus", cf: 0.6 },
  { if: ["demam", "lemas"], then: "Tifus", cf: 0.7 },

  // ===== CHIKUNGUNYA =====
  { if: ["demam", "nyeri_sendi", "ruam"], then: "Chikungunya", cf: 0.85 },
  { if: ["demam", "nyeri_sendi"], then: "Chikungunya", cf: 0.75 },
  { if: ["demam", "nyeri_otot", "nyeri_sendi"], then: "Chikungunya", cf: 0.8 },
  { if: ["demam", "ruam"], then: "Chikungunya", cf: 0.7 },
  { if: ["demam", "nyeri_sendi", "lemas"], then: "Chikungunya", cf: 0.75 },
];
