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
    {
        question: "What does the WWE stand for?",
        image: ["assets/images/wwe.png"],
        answers: [
          { text: "Wild West Entertainment", correct: false },
          { text: "World Wide Entertainment", correct: false },
          { text: "Wrestling World Entertainment", correct: false },
          { text: "World Wrestling Entertainment", correct: true },
        ]
      },
      {
        question: "How many gold medals does Michael Phelps have?",
        image: ["assets/images/phealps.jpeg"],
        answers: [
          { text: "10", correct: false },
          { text: "23", correct: true },
          { text: "5", correct: false },
          { text: "18", correct: false },
        ]
      },
      {
        question: "What time is the 100m World Record?",
        image: ["assets/images/100m.jpg"],
        answers: [
          { text: "9.58 seconds", correct: true },
          { text: "9.58 minuets", correct: false },
          { text: "9.58 hours", correct: false },
          { text: "9.58 years", correct: false },
        ]
      },
      {
        question: "In which sport do teams compete to win the Stanley Cup?",
        image: ["assets/images/stanleycup.jpg"],
        answers: [
          { text: "National Basketball League", correct: false },
          { text: "Premier League", correct: false },
          { text: "National Hockey League", correct: true },
          { text: "Diamond League", correct: false },
        ]
      },
      {
        question: "How many World Balance Beam titles does Simone Biles have?",
        image: ["assets/images/biles.avif"],
        answers: [
          { text: "2", correct: false },
          { text: "6", correct: false },
          { text: "4", correct: true },
          { text: "7", correct: false },
        ]
      },
  ];
  
// Get Id's from HTML
const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const next = document.getElementById("next");
const timer = document.getElementById("timer");
  

// Set up variables
let currentQuestion = 0;
let pics = 0;
let score = 0;

/* Start Quiz */
function startQuiz() {
  currentQuestion = 0;
  pics = 0;
  score = 0;
  next.innerHTML = "Next";
  showQuestion();
}

/* Creates Timer */ 
const startingMinuets = 10;
let time = startingMinuets * 2;

let refresh = setInterval(updateTimer, 1000); // Update every 1 second

function updateTimer() {
  const minuets = Math.floor(time / 60); // Rounds number down to the nearest integer
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' +seconds : seconds;

  timer.innerHTML = `${minuets}:${seconds}`;
  
  time--;
  
  time = time < 0 ? 0:time;

  // End quiz once time is finished
  if (minuets <= 0 && seconds <= 0){
    showScore();
  }
}

/* Resets Timer */
function resetTimer() {
  clearInterval(refresh);
  updateTimer();
}

/* Show Question */
function showQuestion() {
  resetState();
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
    score++; //Adds + 1 to the scored variable
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
  clearInterval(refresh);
  // If score is 10 display pefect score
  if (score == 10) {
      question.innerHTML = `Nice, You scored ${score} out of ${questions.length} a perfect score!`;
      image1 = ["assets/images/perfect.jpg"];
      document.getElementById("image").src = image1;

  // If score is greater than 5 dispaly okay score
  } else if (score >=5) {
      question.innerHTML = `Okay, You scored ${score} out of ${questions.length}!`;
      image2 = ["assets/images/thumbsup.png"];
      document.getElementById("image").src = image2;
  
  // If score is less than 0 display terrible score
  } else if (score == 0) {
      question.innerHTML = `TERRIBLE!!!, You scored ${score} out of ${questions.length}!`;
      image4 = ["assets/images/angry.jpg"];
      document.getElementById("image").src = image4;
  
  // If score is not in any of the other categories display not good score
  } else {
      question.innerHTML = `Not Good, You scored ${score} out of ${questions.length}!`;
      image5 = ["assets/images/thumbsdown.png"];
      document.getElementById("image").src = image5;
  }
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

// Function for the next button
next.addEventListener("click", () => {
  if (currentQuestion < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();