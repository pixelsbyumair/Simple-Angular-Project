angular.module('quizApp').controller('turtlesController', ['$scope', 'quizFactory', 'metricsFactory' , function($scope, quizFactory, metricsFactory){


	$scope.turtles = quizFactory.getTurtles();

	$scope.activeTurtle = {};
	$scope.searchFilter = "";
	$scope.quizFactory = quizFactory;
	$scope.metricsFactory = metricsFactory;

	$scope.quizStatus = quizFactory.activateQuiz;

	$scope.errors = false;



	$scope.toggleQuiz =  function() {
		quizFactory.toggleQuiz(true);
	}

	$scope.changeActiveTurtle = function(turtle) {
		$scope.activeTurtle = turtle;
	}

}]).controller('QuizController', ['$scope', 'quizFactory', 'metricsFactory' ,function($scope, quizFactory, metricsFactory){

	$scope.quizFactory = quizFactory;
	$scope.metricsFactory = metricsFactory;
	$scope.questions = quizFactory.getQuestions();
	$scope.answered = 0;

	$scope.finalized = false;


	$scope.isText = function(question) {
		return (question.type=='text');
	}

	$scope.isImg = function(question) {
		return (question.type=='image');
	}	


	$scope.finalizeAnswers = function() {
		$scope.finalized = false;
		$scope.quizFactory.quizNumber = 1;
		$scope.answered = 0;
	
		$scope.metricsFactory.changeState('quiz', false);
		$scope.metricsFactory.changeState('results', true);
	
		$scope.metricsFactory.markQuiz();
	}


	$scope.setQuizNum = function(index) {
		$scope.quizFactory.quizNumber = index+1;
	}


	$scope.selectAnswer = function(index) {
		$scope.quizFactory.questions[$scope.quizFactory.quizNumber-1].selected = index;

	}


	$scope.increment = function() {
		
		var quizLength = $scope.quizFactory.questions.length;


		if ($scope.quizFactory.questions[$scope.quizFactory.quizNumber-1].selected!==null) {
			$scope.answered++;

			console.log($scope.answered);

			if ($scope.answered >= quizLength) {
				//console.log('running for loop');

				for(var i=0; i<$scope.quizFactory.questions.length; i++) {
					if ($scope.quizFactory.questions[i].selected==null) {
						$scope.quizFactory.quizNumber = i+1;
						return;
					}

					//console.log('finalizing quiz');

					$scope.errors = false;
					$scope.finalized = true;
					return;
				}

			}
		}

		var breakout = false;

		while(!breakout) {
		
			if ($scope.quizFactory.quizNumber-1 < quizLength-1) {
				$scope.quizFactory.quizNumber++;
			} else {
				$scope.quizFactory.quizNumber = 1;				
			}

			if ($scope.quizFactory.quizNumber==1) {
				$scope.errors = true;
			}

			if ($scope.questions[$scope.quizFactory.quizNumber-1].selected == null) {
				breakout = true;
			}
		}
 
		
	}

}]).controller('ResultsController', ['$scope', 'metricsFactory', 'quizFactory', function($scope, metricsFactory, quizFactory){

	$scope.metricsFactory = metricsFactory;
	$scope.quizFactory = quizFactory;

	$scope.questions = quizFactory.questions;
	$scope.activeQuiz = 0;




	$scope.reset = function() {
		metricsFactory.changeState('results', false);
		metricsFactory.correct = 0;
	
		for(var i=0; i<quizFactory.questions.length; i++) {
			var data = quizFactory.questions[i];
			data.selected = null;
			data.correct = null;
		}
	}


	$scope.calculatePerc = function(){
		return metricsFactory.correct/quizFactory.questions.length * 100;
	}

	$scope.setQuizNum  =  function(index) {
		$scope.activeQuiz = index;	
	}

	$scope.isText = function(question) {
		return (question.type=='text');
	}

	$scope.isImg = function(question) {
		return (question.type=='image');
	}



}]);