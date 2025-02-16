document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const startButton = document.getElementById("start-btn");
    const nextButton = document.getElementById("next-btn");
    const restartButton = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const categoryContainer = document.getElementById("category-container");
    const questionText = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");
    const scoreContainer = document.getElementById("score-container");

    let currentQuestionIndex = 0;
    let selectedCategory = "";
    let questions = [];
    let score = 0;

    const quizData = {
        general: [ 
            { question: "What is the capital of France?", answers: [ { text: "Berlin", correct: false }, { text: "Paris", correct: true }, { text: "Rome", correct: false }, { text: "Madrid", correct: false } ] }, 
            { question: "Who wrote 'Hamlet'?", answers: [ { text: "Shakespeare", correct: true }, { text: "Tolstoy", correct: false }, { text: "Hemingway", correct: false }, { text: "Dickens", correct: false } ] }, 
            { question: "What is the largest planet in our solar system?", answers: [ { text: "Earth", correct: false }, { text: "Jupiter", correct: true }, { text: "Mars", correct: false }, { text: "Saturn", correct: false } ] }, 
            { question: "Which year did World War II end?", answers: [ { text: "1945", correct: true }, { text: "1939", correct: false }, { text: "1918", correct: false }, { text: "1950", correct: false } ] }, 
            { question: "What is the square root of 64?", answers: [ { text: "6", correct: false }, { text: "8", correct: true }, { text: "10", correct: false }, { text: "12", correct: false } ] }, 
            { question: "Who painted the Mona Lisa?", answers: [ { text: "Vincent van Gogh", correct: false }, { text: "Pablo Picasso", correct: false }, { text: "Leonardo da Vinci", correct: true }, { text: "Claude Monet", correct: false } ] }, 
            { question: "What is the chemical symbol for water?", answers: [ { text: "O2", correct: false }, { text: "H2O", correct: true }, { text: "CO2", correct: false }, { text: "NaCl", correct: false } ] }, 
            { question: "Which continent is known as the 'Land of Kangaroos'?", answers: [ { text: "Asia", correct: false }, { text: "Africa", correct: false }, { text: "Australia", correct: true }, { text: "South America", correct: false } ] }, 
            { question: "What is the longest river in the world?", answers: [ { text: "Amazon River", correct: false }, { text: "Nile River", correct: true }, { text: "Yangtze River", correct: false }, { text: "Mississippi River", correct: false } ] }, 
            { question: "Who was the first person to step on the moon?", answers: [ { text: "Neil Armstrong", correct: true }, { text: "Buzz Aldrin", correct: false }, { text: "Yuri Gagarin", correct: false }, { text: "Michael Collins", correct: false } ] } 
        ],        
        math: [ 
            { question: "What is 5 + 3?", answers: [ { text: "8", correct: true }, { text: "9", correct: false }, { text: "7", correct: false }, { text: "10", correct: false } ] }, 
            { question: "What is 12 / 4?", answers: [ { text: "3", correct: true }, { text: "4", correct: false }, { text: "2", correct: false }, { text: "6", correct: false } ] }, 
            { question: "What is 9 × 7?", answers: [ { text: "63", correct: true }, { text: "72", correct: false }, { text: "56", correct: false }, { text: "49", correct: false } ] }, 
            { question: "What is the square root of 81?", answers: [ { text: "9", correct: true }, { text: "8", correct: false }, { text: "10", correct: false }, { text: "7", correct: false } ] }, 
            { question: "What is 15 - 7?", answers: [ { text: "8", correct: true }, { text: "6", correct: false }, { text: "7", correct: false }, { text: "9", correct: false } ] }, 
            { question: "What is 25 ÷ 5?", answers: [ { text: "5", correct: true }, { text: "6", correct: false }, { text: "4", correct: false }, { text: "7", correct: false } ] }, 
            { question: "What is 6 × 6?", answers: [ { text: "36", correct: true }, { text: "30", correct: false }, { text: "42", correct: false }, { text: "24", correct: false } ] }, 
            { question: "What is 100 - 45?", answers: [ { text: "55", correct: true }, { text: "50", correct: false }, { text: "60", correct: false }, { text: "65", correct: false } ] }, 
            { question: "What is 7 × 8?", answers: [ { text: "56", correct: true }, { text: "49", correct: false }, { text: "64", correct: false }, { text: "42", correct: false } ] }, 
            { question: "What is 144 ÷ 12?", answers: [ { text: "12", correct: true }, { text: "10", correct: false }, { text: "14", correct: false }, { text: "11", correct: false } ] } 
        ],        
        coding: [
            { question: "Which language is primarily used for web development?", answers: [ { text: "Python", correct: false }, { text: "Java", correct: false }, { text: "JavaScript", correct: true }, { text: "C++", correct: false } ] },
            { question: "What does HTML stand for?", answers: [ { text: "Hyper Text Markup Language", correct: true }, { text: "High Tech Machine Learning", correct: false }, { text: "Home Tool Multi Language", correct: false }, { text: "Hyper Transfer Markup Language", correct: false } ] },
            { question: "Which symbol is used for comments in JavaScript?", answers: [ { text: "//", correct: true }, { text: "/* */", correct: false }, { text: "#", correct: false }, { text: "<!-- -->", correct: false } ] },
            { question: "Which of the following is NOT a programming language?", answers: [ { text: "Python", correct: false }, { text: "Java", correct: false }, { text: "HTML", correct: true }, { text: "C#", correct: false } ] },
            { question: "Which data structure works on a Last In First Out (LIFO) principle?", answers: [ { text: "Queue", correct: false }, { text: "Stack", correct: true }, { text: "Array", correct: false }, { text: "Linked List", correct: false } ] },
            { question: "What is the correct way to declare a variable in JavaScript?", answers: [ { text: "var x = 10;", correct: true }, { text: "x := 10;", correct: false }, { text: "int x = 10;", correct: false }, { text: "declare x = 10;", correct: false } ] },
            { question: "Which of the following is a backend programming language?", answers: [ { text: "CSS", correct: false }, { text: "Java", correct: true }, { text: "HTML", correct: false }, { text: "Bootstrap", correct: false } ] },
            { question: "Which of the following is used for styling web pages?", answers: [ { text: "HTML", correct: false }, { text: "CSS", correct: true }, { text: "JavaScript", correct: false }, { text: "Python", correct: false } ] },
            { question: "Which function is used to print output in Python?", answers: [ { text: "print()", correct: true }, { text: "echo()", correct: false }, { text: "console.log()", correct: false }, { text: "write()", correct: false } ] },
            { question: "What does SQL stand for?", answers: [ { text: "Structured Query Language", correct: true }, { text: "System Query Logic", correct: false }, { text: "Sequential Query Language", correct: false }, { text: "Scripted Query Library", correct: false } ] }
        ]        
    };

    // ✅ Hide buttons initially
    function resetUI() {
        questionContainer.classList.add("hide");
        startButton.classList.add("hide");
        nextButton.classList.add("hide");
        restartButton.classList.add("hide");
        scoreContainer.classList.add("hide");
        startButton.disabled = true;
        startButton.style.opacity = "0.6";
    }
    resetUI();

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;
            questions = quizData[selectedCategory];
            categoryContainer.classList.add("hide");
            startButton.classList.remove("hide");
            startButton.disabled = false;
            startButton.style.opacity = "1";
        });
    });

    startButton.addEventListener("click", startQuiz);
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            endQuiz();
        }
    });

    restartButton.addEventListener("click", restartQuiz);

    function startQuiz() {
        startButton.classList.add("hide");
        questionContainer.classList.remove("hide");
        nextButton.classList.add("hide");
        restartButton.classList.add("hide");
        scoreContainer.classList.add("hide");

        currentQuestionIndex = 0;
        score = 0;
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionText.innerText = question.question;
        answerButtons.innerHTML = "";

        question.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            button.dataset.correct = answer.correct;
            button.addEventListener("click", selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    function selectAnswer(event) {
        const selectedButton = event.target;
        const correct = selectedButton.dataset.correct === "true";

        if (correct) {
            score++;
        }

        selectedButton.classList.add(correct ? "correct" : "wrong");
        Array.from(answerButtons.children).forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.correct === "true") {
                btn.classList.add("correct");
            }
        });
        nextButton.classList.remove("hide");
    }

    function resetState() {
        nextButton.classList.add("hide");
        answerButtons.innerHTML = "";
    }

    function endQuiz() {
        questionContainer.classList.add("hide");
        nextButton.classList.add("hide");
        scoreContainer.innerText = `🎯 Your Score: ${score} / ${questions.length}`;
        scoreContainer.classList.add("show");
        restartButton.classList.remove("hide");
    }

    function restartQuiz() {
        categoryContainer.classList.remove("hide");
        restartButton.classList.add("hide");
        scoreContainer.classList.add("hide");
        startButton.classList.add("hide");
        scoreContainer.classList.remove("show");
        scoreContainer.innerText = "";
    }
});