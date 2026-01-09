// ==============================
// DATA PERTANYAAN
// ==============================
const questions = [
  { code: "G01", text: "Apakah Anda mengalami demam?" },
  { code: "G02", text: "Apakah Anda sakit kepala?" },
  { code: "G03", text: "Apakah nyeri otot?" },
  { code: "G04", text: "Apakah ada ruam?" },
  { code: "G05", text: "Apakah sering menggigil?" },
  { code: "G06", text: "Apakah Anda merasa lemas?" },
  { code: "G07", text: "Apakah mual?" },
  { code: "G08", text: "Apakah nyeri sendi?" },
];

// ==============================
// STATE
// ==============================
let index = 0;
let answers = {};

// ==============================
// ELEMENT
// ==============================
const homeEl = document.getElementById("home");
const startBtn = document.getElementById("startBtn");

const questionBox = document.getElementById("question-box");
const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");

// ==============================
// START DIAGNOSA
// ==============================
function startDiagnosis() {
  homeEl.style.display = "none";
  questionBox.style.display = "block";
  progressEl.style.display = "block";

  index = 0;
  answers = {};

  yesBtn.disabled = false;
  noBtn.disabled = false;

  showQuestion();
}

// ==============================
// TAMPILKAN PERTANYAAN
// ==============================
function showQuestion() {
  questionEl.innerText = questions[index].text;
  progressEl.innerText = `Pertanyaan ${index + 1} dari ${questions.length}`;
}

// ==============================
// JAWABAN
// ==============================
function answer(val) {
  answers[questions[index].code] = val;
  index++;

  if (index < questions.length) {
    showQuestion();
  } else {
    submit();
  }
}

// ==============================
// SUBMIT KE BACKEND
// ==============================
function submit() {
  questionBox.style.display = "none";
  progressEl.style.display = "none";

  resultEl.style.display = "block";
  resultEl.innerHTML = "<p>⏳ Memproses diagnosis...</p>";

  yesBtn.disabled = true;
  noBtn.disabled = true;

  fetch("/diagnose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  })
    .then((r) => r.json())
    .then((d) => {
      resultEl.innerHTML = `
        <h3>Hasil Diagnosa</h3>

        <p><strong>Penyakit:</strong></p>
        <h4>${d.disease}</h4>

        <p><strong>Tingkat Keyakinan:</strong></p>
        <p class="confidence">${d.cf}%</p>

        <p class="note">
          ${
            d.message ||
            "Hasil ini merupakan diagnosis awal dan bukan keputusan medis."
          }
        </p>

        <button class="btn reset" onclick="resetApp()">
          ⬅ Kembali ke Menu
        </button>
      `;
    })
    .catch(() => {
      resultEl.innerHTML =
        "<p>❌ Terjadi kesalahan saat memproses diagnosis</p>";
    });
}

// ============================== 
// RESET KE MENU
// ==============================
function resetApp() {
  resultEl.style.display = "none";
  homeEl.style.display = "block";
}

// ==============================
// EVENT
// ==============================
startBtn.onclick = startDiagnosis;
yesBtn.onclick = () => answer(true);
noBtn.onclick = () => answer(false);
