let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";

async function loadQuestions() {
  const response = await fetch("/questions");
  questions = await response.json();

  showQuestion();
}

function showQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");

  optionsDiv.innerHTML = "";

  let options = [q.option1, q.option2, q.option3, q.option4];

  options.forEach((option) => {
    let btn = document.createElement("button");

    btn.className = "option";
    btn.innerText = option;

    btn.onclick = () => {
      selectedAnswer = option;
    };

    optionsDiv.appendChild(btn);
  });
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (selectedAnswer === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById("quiz").style.display = "none";

    document.getElementById("result").innerText =
      `Your Score: ${score}/${questions.length}`;
  }
});

loadQuestions();
