

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


//push the questions into availableQuestions Array
function setAvailableQuestions(){
	const totalQuestion = quiz.length;
	for (let i = 0; i < totalQuestion; i++) {
		availableQuestions.push(quiz[i])
	}
}

//set question number and queston and otions
function getNewQuestion(){
	//set question number
	questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

	//set question text 
	// get random question
	const questonIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
	currentQuestion = questonIndex;
	questionText.innerHTML = currentQuestion.q;
	//get the position of 'questionIndex' from the availableQuestion Array
	const index1 = availableQuestions.indexOf(questonIndex);
	//remove the 'questionIndex' from the availableQuestion Array , so that the question does not repeat
	availableQuestions.splice(index1,1);
	
	//set options, get the length of options 
	const optionLen = currentQuestion.options.length
	// push options into availableOptions Array
	for(let i=0; i<optionLen;i++)
	{
		availableOptions.push(i)
	}
	optionContainer.innerHTML= '';
	let animationDelay = 0.15;
	// create options in html
	for(let i=0;i<optionLen;i++)
	{
		//random option 
		const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		// get the position of 'optonIndex' from the availableOptions
		const index2 = availableOptions.indexOf(optonIndex);
		// remove the 'optonIndex' from the availableOptions, so that  the options does not repeat
		availableOptions.splice(index2,1);
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optonIndex];
		option.id = optonIndex;
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.15;
		option.className = "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick","getResult(this)");
	}



	questionCounter++
}

//get the result of current attempt qusetion
function getResult(element){
	const id = parseInt(element.id);
	if(id == currentQuestion.answer){
		element.classList.add("correct");
		updateAnswerIndicator("correct");
		correctAnswers++;
	}
	else{
		element.classList.add("wrong");
		updateAnswerIndicator("wrong");

		const optionLen = optionContainer.children.length;
		for(let i=0;i<optionLen;i++){
			if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
				optionContainer.children[i].classList.add("correct");
			}
		}
	}
	attempt++;
	unclickableOptions();
}
function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i=0;i<optionLen;i++){
		optionContainer.children[i].classList.add("already-answered");
	}
}
          
function answersIndicator(){
	answersIndicatorContainer.innerHTML = '';
	const totalQuestion = quiz.length;
	for(let i=0; i<totalQuestion; i++)
	{
		const indicator = document.createElement("div");
		answersIndicatorContainer.appendChild(indicator);
	}
}

function updateAnswerIndicator(markType){
	answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
	if (questionCounter === quiz.length) {
		quizOver();
	}
	else{
		getNewQuestion();
	}
}

function quizOver(){
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	quizResult();
}
function quizResult(){
	resultBox.querySelector(".total-question").innerHTML = quiz.length;
	resultBox.querySelector(".total-attempt").innerHTML = attempt;
	resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
	resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
	const percentage = (correctAnswers/quiz.length)*100;
	resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(2) + "%";
	resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}
function resetQuiz(){
	questionCounter = 0;
	correctAnswers = 0;
	attempt = 0;
}
function tryAgainQuiz(){
	resultBox.classList.add("hide");
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();
}
function goToHome(){
	resultBox.classList.add("hide");
	homeBox.classList.remove("hide");
	resetQuiz();
}

function startQuiz(){

	homeBox.classList.add("hide");
	quizBox.classList.remove("hide");
	//first we will set all questions in availableQuestions Array
	setAvailableQuestions();
	//second we will call getNewQuestion() function
	getNewQuestion();

	answersIndicator();
}



window.onload = function (){
	homeBox.querySelector(".total-questions").innerHTML = quiz.length;
}