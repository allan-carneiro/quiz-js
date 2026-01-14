const questions = [
    {
        question: "O que significa HTML?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HighText Machine Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Qual linguagem é usada para estilizar páginas web?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Qual linguagem é usada para criar interatividade no site?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "PHP", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizFinished = false;

const questionElement = document.getElementById("question");
const answersContainer = document.querySelector(".answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

// Exibe a pergunta atual
function showQuestion() {
    resetState();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer");

        button.addEventListener("click", () => selectAnswer(answer, button));
        answersContainer.appendChild(button);
    });
}

// Seleciona a resposta e dá feedback
function selectAnswer(answer, button) {
    if (answer.correct) {
        button.classList.add("correct");
        feedback.textContent = "Resposta correta!";
        score++;
    } else {
        button.classList.add("wrong");
        feedback.textContent = "Resposta errada!";
    }

    Array.from(answersContainer.children).forEach(btn => {
        btn.disabled = true;
    });

    nextButton.style.display = "block";
}

// Reseta o estado para a próxima pergunta
function resetState() {
    feedback.textContent = "";
    nextButton.style.display = "none";
    answersContainer.innerHTML = "";
}

// Botão "Próxima pergunta"
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

// Mostra o resultado final
function showScore() {
    quizFinished = true;
    questionElement.textContent = "🎉 Quiz finalizado!";
    answersContainer.innerHTML = "";
    feedback.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;

    nextButton.style.display = "none";
    restartButton.style.display = "block";
}

// Botão "Reiniciar Quiz"
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    quizFinished = false;

    restartButton.style.display = "none";
    nextButton.style.display = "none";

    showQuestion();
});

// Inicializa o quiz
showQuestion();
