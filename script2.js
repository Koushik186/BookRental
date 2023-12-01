const timerElement=document.getElementById('timer');
const quizData = [
    {
      question: 'Q1.Which is the National fruit of India?',
      options: ['Mango', 'Apple', 'Banana', 'Guava'],
      answer: 'Mango',
    },
    {
      question: 'Q2. What is the largest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
      answer: 'Jupiter',
    },
    {
      question: 'Q3. Which is the biggest continent in the world?',
      options: ['Antarctica', 'Europe', 'Asia', 'America'],
      answer: 'Asia',
    },
    {
      question: 'Q4. What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      answer: 'Mount Everest',
    },
    {
      question: 'Q5. Which is the largest ocean on Earth?',
      options: [
        'Pacific Ocean',
        'Indian Ocean',
        'Atlantic Ocean',
        'Arctic Ocean',
      ],
      answer: 'Pacific Ocean',
    },
    {
      question: 'Q6. Which is the smallest continent in the world?',
      options: ['Asia', 'Europe', 'Australia', 'South America'],
      answer: 'Australia',
    },
    {
      question: 'Q7. Who painted the Mona Lisa?',
      options: [
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Michelangelo',
      ],
      answer: 'Leonardo da Vinci',
    },
    {
      question: 'Q8. Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
      answer: 'Mars',
    },
    {
      question: 'Q9. Who is known as the Iron Man Of India?',
      options: [
        'Nehru',
        'Sardar Vallabhai Patel',
        'Mahatma Gandhi',
        'Subhash Chandra Bose',
      ],
      answer: 'Sardar Vallabhai Patel',
    },
    {
      question: 'Q10. Which animal is known as the King of the Jungle?',
      options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
      answer: 'Lion',
    },
    {
        question: 'Q11. Where is the parliament of India located?',
        options: ['Mumbai', 'New Delhi', 'Madras', 'Gujarat'],
        answer: 'New Delhi',
    },
    
    {
        question: 'Q12. When is Independence Day celebrated?',
        options: ['15 Aug', '26 Jan', '29 Sep', '1 Jan'],
        answer: '15 Aug',
    },

    {
        question: 'Q13. Which festival is called the festival of colors?',
        options: ['Diwali', 'Holi', 'Dasara', 'Christmas'],
        answer: 'Holi',
    },

    {
        question: 'Q14. Who built the Taj Mahal?',
        options: ['Jahangir', 'Shah Jahan', 'Chanakya', 'Qutubuddin'],
        answer: 'Shah Jahan',
    },

    {
        question: 'Q15. Which is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Chile', 'Ganga'],
        answer: 'Amazon',
    },

    {
        question: 'Q16. What is the metal filament in a light bulb made of?',
        options: ['Iron', 'Gold', 'Tungsten', 'Steel'],
        answer: 'Tungsten',
    },

    {
        question: 'Q17. Which is the nearest star to Earth?',
        options: ['Mars', 'Kepler', 'Sun', 'Nebula'],
        answer: 'Sun',
    },


    {
        question: 'Q18. Who is the present PM of India?',
        options: ['Modi', 'Droupadi', 'Amith Shaw', 'Jagan'],
        answer: 'Modi',
    },

    {
        question: 'Q19. Who is the author of the famous Harry Potter book series?',
        options: ['Henry', 'Jack', 'Johny', 'J K Rowling'],
        answer: 'J K Rowling',
    },

    {
        question: 'Q20. The largest country in the world is?',
        options: ['India', 'Russia', 'Japan', 'America'],
        answer: 'Russia',
    },

  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  let timerInterval;
  let secondsLeft=30;
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  

  function startTimer(){
    clearInterval(timerInterval)
    timerInterval= setInterval(function (){
        secondsLeft--;
        timerElement.textContent = `Time Left: ${secondsLeft}`;
        if(secondsLeft ===0){
            clearInterval(timerInterval);
            alert('Time\'s up!');
            submitAnswer();
            nextQuestion();
        }
    }, 1000);
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
    secondsLeft=30;
    startTimer();
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
        if(!selectedOption){
            alert('Please select an answer.');
            return;
        }
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    const timerElement = document.getElementById('timer');
    timerElement.style.display = 'none';
    showRatingReview();
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
  let userRating = 0;

function rate(stars) {
  userRating = stars;
  const allStars = document.querySelectorAll('.star');
  allStars.forEach((star, index) => {
    if (index < stars) {
      star.style.color = 'gold';
    } else {
      star.style.color = 'black';
    }
  });
}

function submitReview() {
  const rating = userRating;
  const review = document.getElementById('review').value;

}

function showRatingReview() {
  const ratingReviewContainer = document.querySelector('.rating-review-container');
  ratingReviewContainer.style.display = 'block'; // Show the section
}