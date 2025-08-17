const quizData = [
  {
    question: "Which language is used for web styling?",
    options: ["HTML", "CSS", "Python", "C++"],
    correct: "CSS",
  },
  {
    question: "Which tag is used for the largest heading in HTML?",
    options: ["<h6>", "<head>", "<h1>", "<header>"],
    correct: "<h1>",
  },
  {
    question: "Which JavaScript keyword declares a variable?",
    options: ["var", "let", "const", "All of the above"],
    correct: "All of the above",
  },
  {
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Stylish Question Language",
      "Statement Question Language",
      "Strong Query List",
    ],
    correct: "Structured Query Language",
  },
  {
    question: "Which company developed Java?",
    options: ["Google", "Microsoft", "Sun Microsystems", "Apple"],
    correct: "Sun Microsystems",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Syntax",
      "Colorful Style System",
    ],
    correct: "Cascading Style Sheets",
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "/* */", "#", "<!-- -->"],
    correct: "#",
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    correct: "<a>",
  },
  {
    question: "What is the correct extension of Python files?",
    options: [".java", ".py", ".pyt", ".txt"],
    correct: ".py",
  },
  {
    question: "Which of the following is a frontend framework?",
    options: ["Django", "Flask", "React", "Spring"],
    correct: "React",
  },
];

let currentQuestion = 0;
let score = 0;
let quizQuestions = [];

// Escape HTML so <h1>, <a>, etc. show properly
function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function startQuiz() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("quiz-result").innerText = "";
  quizQuestions = quizData.sort(() => 0.5 - Math.random()).slice(0, 5);
  showQuestion();
}

function showQuestion() {
  if (currentQuestion < quizQuestions.length) {
    const q = quizQuestions[currentQuestion];
    let quizHTML = `<p class="quiz-question">Q${currentQuestion + 1}: ${q.question}</p><div class="options">`;
    q.options.forEach((opt) => {
      quizHTML += `<button onclick="checkAnswer('${opt.replace(/'/g, "\\'")}')">${escapeHTML(opt)}</button>`;
    });
    quizHTML += `</div>`;
    document.getElementById("quiz-container").innerHTML = quizHTML;
  } else {
    document.getElementById("quiz-container").innerHTML = "";
    document.getElementById("quiz-result").innerText =
      `🎉 You scored ${score} out of ${quizQuestions.length}`;
  }
}

function checkAnswer(answer) {
  if (answer === quizQuestions[currentQuestion].correct) {
    score++;
  }
  currentQuestion++;
  showQuestion();
}

async function getJoke() {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await response.json();
    document.getElementById("joke").innerText =
      data.setup + " - " + data.punchline;
  } catch (error) {
    document.getElementById("joke").innerText =
      "⚠️ Failed to load joke. Try again!";
  }
}
