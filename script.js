
let trainedNet; // This is the variable to create a computational worker. 

//Below are the four functions that make up this javascript file. 
//Each function represents a program that will be run.  

//The function immediately below converts the text into a numeric character code. 
function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

// This function processes the training data into its separate arrays. 
function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

// This function trains the neural network
function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data, {
     errorThresh: 0.005,  // error threshold to reach
  iterations: 20000,   // maximum training iterations
  log: true,           // console.log() progress periodically
  logPeriod: 10,       // number of iterations between logging
  learningRate: 0.1    // learning rate
}));
    trainedNet = net.toFunction();
	document.getElementById("rslts").innerHTML = "Trajnimi i përfunduar.";
	
};

//This function begins the process and then outputs the results to the web page. 
function execute() {
	var sentence = document.getElementById("textfield").value;
	var input = sentence; 
    let results = trainedNet(encode(input));
    let output;
    let certainty;
	//The if-then statement below picks the winner based on the greater certainty
    if (results.compsent > results.incompsent) { //This determines the results
        output = 'një fjali e plotë.' //Tells you that the sentence is complete.
        certainty = Math.floor(results.compsent * 100) //Provides certainty of choice.
		document.getElementById("rslts").innerHTML = "" + certainty + "% i sigurt se '" + sentence + "' është " + output;  // Outputs to the web page.
		document.getElementById("rslts").style.color='green';

    } else { 
        output = 'një fjali e paplotë.'
        certainty = Math.floor(results.incompsent * 100)
		document.getElementById("rslts").innerHTML = "" + certainty + "% i sigurt se '" + sentence + "' është " + output; // Outputs to the web page. 
		document.getElementById("rslts").style.color='red';
    }

    
}

train(trainingData); // This runs function train(data). 
