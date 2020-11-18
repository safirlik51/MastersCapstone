console.log("problem test");
console.log("TTE:  ");
console.log(TruthToExpression);

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('GRWHG2-8TQ9WK8J4J');

let text = "";
let e = '';
let equation = "";
let answer = "";
var buildCompare = []
var buildCompareFinal = "";
var resultsCompare = []
var resultsCompareFinal = "";
document.getElementById("SubmitBTN").hidden = true;
document.getElementById("AnswerField").hidden = true;
document.getElementById("ShowBTN").hidden = true;
document.getElementById("answer").hidden = true;
document.getElementById("TruthToExpressionBTN").addEventListener("click", TruthToExpression);
document.getElementById("TruthToCircuitBTN").addEventListener("click", TruthToCircuit);
document.getElementById("ExpressionToTruthBTN").addEventListener("click", ExpressionToTruth);
document.getElementById("ExpressionToCircuitBTN").addEventListener("click", ExpressionToCircuit);
document.getElementById("CircuitToTruthBTN").addEventListener("click", CircuitToTruth);
document.getElementById("CircuitToExpressionBTN").addEventListener("click", CircuitToExpression);
document.getElementById("RandomBTN").addEventListener("click", Random);

function TruthToExpression() {
    //waApi.getFull('sin x').then(console.log).catch(console.error);
    document.getElementById("equation").hidden = true;
    document.getElementById("SubmitBTN").hidden = false;
    document.getElementById("AnswerField").hidden = false;
    buildTruth();
    document.getElementById("problemDirections").innerHTML = "Enter the expression given the truth table below!" + "<br>" + "(AND = &, OR = ||, NOT = ')";
    document.getElementById("SubmitBTN").addEventListener("click", checkAnswer);
}

function TruthToCircuit() {
    document.getElementById("problemDirections").innerHTML = "Test TC";
}

function ExpressionToTruth() {
    document.getElementById("equation").hidden = false;
    document.getElementById("SubmitBTN").hidden = false;
    document.getElementById("AnswerField").hidden = false;
    document.getElementById("problemDirections").innerHTML = "Given the expression below complete the truth table!";
    buildTruth();
    document.getElementById("equation").innerHTML = e;
    document.getElementById("SubmitBTN").addEventListener("click", checkAnswer);
}

function ExpressionToCircuit() {
    document.getElementById("problemDirections").innerHTML = "Test EC";
}

function CircuitToTruth() {
    document.getElementById("problemDirections").innerHTML = "Test CT";
}

function CircuitToExpression() {
    document.getElementById("problemDirections").innerHTML = "Test CE";
}

function Random() {
    let problem = Math.floor(Math.random() * 6) + 1;

    if (problem == 1){
        TruthToExpression();
    }

    if (problem == 2){
        TruthToCircuit();
    }

    if (problem == 3){
        ExpressionToTruth();
    }

    if (problem == 4){
        ExpressionToCircuit();
    }

    if (problem == 5){
        CircuitToTruth();
    }

    if (problem == 6){
        CircuitToExpression();
    }
}

function buildTruth() {
    document.getElementById("problem").innerHTML = "";
    let i, j;
    let placeholder = document.getElementById("problem");
    text = buildExpression();
    if (text == "") {
        placeholder.innerHTML = "<div></div>";
        return;
    }
    if (text.match(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01+'|!&() ]/g) != null) {
        placeholder.innerHTML = "<p>One of the characters is not allowed.</p>";
        return;
    }
    console.log(text + " TEXT");
    text = text.replace(/ /g, '');
    text = text.toUpperCase();
    while (numOf(text, '(') > numOf(text, ')'))
        text += ")";
    let variables = [];
    for (i = 0; i < text.length; i++) {
        if ((text[i] >= 'A' && text[i] <= 'Z')) {
            if (text.indexOf(text[i]) == i) {
                variables.push(text[i]);
            }
        }
    }
    variables.sort();
    if (variables.length > 8) {
        placeholder.innerHTML = "<p>You can only have 8 variables at a time.</p>";
        return;
    }
    let string = "<tr><th style=\"letter-spacing: 0; padding: initial;\">minterm</th>";
    for (i = 0; i < variables.length; i++) {
        string += "<th>" + variables[i] + "</th>";
    }
    string += "<th>" + text + "</th></tr>";
    for (i = 0; i < Math.pow(2, variables.length); i++) {
        string += "<tr><td style=\"letter-spacing: 0; padding: initial;\">"+i.toString()+"</td>";
        let data = [];
        for (j = 0; j < variables.length; j++) {
            data[j] = Math.floor(i / Math.pow(2, variables.length - j - 1)) % 2;
            string += "<td>" + data[j] + "</td>";
        }
        equation = text;
        console.log(equation + " EQUATION");
        for (j = 0; j < variables.length; j++) {
            equation = equation.replace(new RegExp(variables[j], 'g'), data[j]);
        }
        string += "<td>" + solve(equation) + "</td></tr>";
    }
    string = "<table align='center' id='truth'>" + string + "</table>";
    if (string.indexOf("<td></td>") == -1)
        placeholder.innerHTML = string;
    else
    placeholder.innerHTML = "<p>Invalid expression.</p>";

    let table = document.getElementById("truth");
    for (let i = 0,row;row = table.rows[i];i++){
        for(let j=0,col; col = row.cells[j];j++){
            if (col.textContent == e){
                col.textContent = "X";
            } 
        }
    }

    function numOf(text, search) {
        let count = 0;
        for (let i = 0; i < text.length; i++)
            if (text[i] == search)
                count++;
        return count;
    }

    function solve(equation) {
        while (equation.indexOf("(") != -1) {
            let start = equation.lastIndexOf("(");
            let end = equation.indexOf(")", start);
            if (start != -1)
                equation = equation.substring(0, start)
                    + solve(equation.substring(start + 1, end))
                    + equation.substring(end + 1);
        }
        equation = equation.replace(/''/g, '');
        equation = equation.replace(/0'/g, '1');
        equation = equation.replace(/1'/g, '0');
        for (let i = 0; i < equation.length - 1; i++)
            if ((equation[i] == '0' || equation[i] == '1') && (equation[i + 1] == '0' || equation[i + 1] == '1'))
                equation = equation.substring(0, i + 1) + '*' + equation.substring(i + 1, equation.length);
        try {
            let safeEval = eval;
            let answer = safeEval(equation);
            buildCompare.push(answer);
            buildCompareFinal = buildCompare.toString();
            console.log("Build " + buildCompareFinal);
            if (answer == 0)
                return 0;
            if (answer > 0)
                return 1;
            return '';
        } catch (e) {
            return '';
        }
    }
}

function buildExpression(expression) {
    e = '';
    let x = Math.floor(Math.random()*5)+2;
    
    for(let i=0;i<x;i++){
        console.log(x);
        let r = Math.floor(Math.random()*5);
        e += String.fromCharCode(65+r); 
        console.log(e);
        console.log("Number of times "+i);

        if (i<x-1){
            let y = Math.floor(Math.random()*3);
            if (y==0){
                e += "&";
            }
            if (y==1){
                e += "||";
            }
            if (y==2){
                e += "'";
            }
        }
    }
    console.log(e);
    return e;
}

function buildResults() {
    let i, j;
    let placeholder = document.getElementById("answer");
    text = getResult();
    if (text == "") {
        placeholder.innerHTML = "<div></div>";
        return;
    }
    if (text.match(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01+'|!&() ]/g) != null) {
        placeholder.innerHTML = "<p>One of the characters is not allowed.</p>";
        return;
    }
    console.log(text + " TEXT");
    text = text.replace(/ /g, '');
    text = text.toUpperCase();
    while (numOfResult(text, '(') > numOfResult(text, ')'))
        text += ")";
    let variables = [];
    for (i = 0; i < text.length; i++) {
        if ((text[i] >= 'A' && text[i] <= 'Z')) {
            if (text.indexOf(text[i]) == i) {
                variables.push(text[i]);
            }
        }
    }
    variables.sort();
    if (variables.length > 8) {
        placeholder.innerHTML = "<p>You can only have 8 variables at a time.</p>";
        return;
    }
    let string = "<tr><th style=\"letter-spacing: 0; padding: initial;\">minterm</th>";
    for (i = 0; i < variables.length; i++) {
        string += "<th>" + variables[i] + "</th>";
    }
    string += "<th>" + text + "</th></tr>";
    for (i = 0; i < Math.pow(2, variables.length); i++) {
        string += "<tr><td style=\"letter-spacing: 0; padding: initial;\">"+i.toString()+"</td>";
        let data = [];
        for (j = 0; j < variables.length; j++) {
            data[j] = Math.floor(i / Math.pow(2, variables.length - j - 1)) % 2;
            string += "<td>" + data[j] + "</td>";
        }
        equation = text;
        console.log(equation + " RESULTS EQUATION");
        for (j = 0; j < variables.length; j++) {
            equation = equation.replace(new RegExp(variables[j], 'g'), data[j]);
        }
        string += "<td>" + solveResult(equation) + "</td></tr>";
    }
    string = "<table align='center' id='truth'>" + string + "</table>";
    if (string.indexOf("<td></td>") == -1)
        placeholder.innerHTML = string;
    else
    placeholder.innerHTML = "<p>Invalid expression.</p>";

    let table = document.getElementById("truth");
    for (let i = 0,row;row = table.rows[i];i++){
        for(let j=0,col; col = row.cells[j];j++){
            if (col.textContent == e){
                col.textContent = "";
            }
        }
    }

    function numOfResult(text, search) {
        let count = 0;
        for (let i = 0; i < text.length; i++)
            if (text[i] == search)
                count++;
        return count;
    }

    function solveResult(equation) {
        while (equation.indexOf("(") != -1) {
            let start = equation.lastIndexOf("(");
            let end = equation.indexOf(")", start);
            if (start != -1)
                equation = equation.substring(0, start)
                    + solveResult(equation.substring(start + 1, end))
                    + equation.substring(end + 1);
        }
        equation = equation.replace(/''/g, '');
        equation = equation.replace(/0'/g, '1');
        equation = equation.replace(/1'/g, '0');
        
        for (let i = 0; i < equation.length - 1; i++)
            if ((equation[i] == '0' || equation[i] == '1') && (equation[i + 1] == '0' || equation[i + 1] == '1'))
                equation = equation.substring(0, i + 1) + '*' + equation.substring(i + 1, equation.length);
        try {
            let safeEval = eval;
            let answer = safeEval(equation);
            resultsCompare.push(answer);
            resultsCompareFinal = resultsCompare.toString();
            console.log("Results " + resultsCompareFinal);
            if (answer == 0)
                return 0;
            if (answer > 0)
                return 1;
            return '';
        } catch (e) {
            return '';
        }
    }
}

function wolfram(){

}

function getResult(result){
    answer = document.getElementById("AnswerField").value;
    console.log("Answer " + answer);
    return answer;
}

function checkAnswer() {
    buildResults();
    console.log("Compare Results " + resultsCompareFinal);
    console.log("Build Results " + buildCompareFinal)
    if (resultsCompareFinal==buildCompareFinal){
        document.getElementById("resultText").style.backgroundColor = "green";
        document.getElementById("resultText").innerHTML = "CORRECT!"
    }
    else{
        document.getElementById("resultText").style.backgroundColor = "red";
        document.getElementById("resultText").innerHTML = "INCORRECT..."
        document.getElementById("ShowBTN").hidden = false;
    }
}