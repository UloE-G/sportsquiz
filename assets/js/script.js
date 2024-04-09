// Create Questions and Answers
const questions = [
    {
      question: "What is the name of the NBA championship trophy?",
      image: ["assets/images/NBATrophy.avif"],
      answers: [
        { text: "Larry O' Brien", correct: true },
        { text: "James Naismith", correct: false },
        { text: "Greg Popavich", correct: false },
        { text: "Nick Reese", correct: false },
      ]
    },
    {
      question: "What country Won the 2022 FIFA World Cup?",
      image: ["assets/images/worldcup.jpg"],
      answers: [
        { text: "France", correct: false },
        { text: "England", correct: false },
        { text: "Argentina", correct: true },
        { text: "Ireland", correct: false },
      ]
    },
    {
      question: "How many of Ireland's Six Nations games did they earn a try bonus point?",
      image: ["assets/images/sixnations.png"],
      answers: [
        { text: "4", correct: true },
        { text: "8", correct: false },
        { text: "2", correct: false },
        { text: "1", correct: false },
      ]
    },
    {
      question: "Which county has the most All-Ireland Senior Football Championship?",
      image: ["assets/images/GAA.jpeg"],
      answers: [
        { text: "Dublin", correct: false },
        { text: "Kerry", correct: true },
        { text: "Cork", correct: false },
        { text: "Mayo", correct: false },
      ]
    },
    {
      question: "Who won Wimbledon 2023 men's Championship?",
      image: ["assets/images/Wimbledon.png"],
      answers: [
        { text: "Serena Williams", correct: false },
        { text: "Novak Djokovic", correct: false },
        { text: "Casper Ruud", correct: false },
        { text: "Carlos Alcaraz", correct: true },
      ]
    },
  ];
  
  // Get Id's from HTML
  const question = document.getElementById("question");
  const images = document.getElementById("image");
  const answerButtons = document.getElementById("answer-buttons");
  const next = document.getElementById("next");
  
  // Set up variables
  let currentQuestion = 0;
  let pics = 0;
  let score = 0;
  
  
  function startQuiz() {
    currentQuestion = 0;
    pics = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
  }
  
  /* Show Question */
  function showQuestion() {
    resetState()
    let questionNow = questions[currentQuestion];
    let questionNum = currentQuestion + 1;
    question.innerHTML = questionNum + ". " + questionNow.question;
  
    /* Show image */
    document.getElementById("image").src = questionNow.image[pics];
  
    /* Show Answers */
    questionNow.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  /* Reset previous Questions and Answers */
  function resetState() {
    next.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  /* Checks if user inputed answer is correct */
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    /* Check if answer is correct or incorrect */
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++; //Adds 1 to the scored variable
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    next.style.display = "block";
  }
  
  /* Display Score */
  function showScore() {
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    next.innerHTML = "Try Again";
    next.style.display = "block";
  }
  
  /* Go to next Question  */
  function handleNextButton() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  next.addEventListener("click", () => {
    if (currentQuestion < questions.length) {
      handleNextButton();
    } else {
      startQuiz()
    }
  })
  
  startQuiz();