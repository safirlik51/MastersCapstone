let text = "";
let e = '';
let equation = "";
let answer = "";
var buildCompare = [];
var buildCompareFinal = "";
var resultsCompare = [];
var resultsCompareFinal = "";
let tableAnswer = [];
let tableAnswerFinal = "";
let matchto = "";
let match = "";
let match1 = "";
let match2 = "";
let match3 = "";
let match4 = "";
let dropdown = false;
let callTruth = false;
document.getElementById("circuitVerse").hidden = true;
document.getElementById("SubmitBTN").hidden = true;
document.getElementById("AnswerField").hidden = true;
document.getElementById("ShowBTN").hidden = true;
document.getElementById("answer").hidden = true;
document.getElementById("wolfram").hidden = true;
document.getElementById("circuit").hidden = true;
document.getElementById("TryAgainBTN").hidden = true;
document.getElementById("NewBTN").hidden = true;
document.getElementById("TruthToExpressionBTN").addEventListener("click", TruthToExpression);
document.getElementById("TruthToCircuitBTN").addEventListener("click", TruthToCircuit);
document.getElementById("ExpressionToTruthBTN").addEventListener("click", ExpressionToTruth);
document.getElementById("ExpressionToCircuitBTN").addEventListener("click", ExpressionToCircuit);
document.getElementById("CircuitToTruthBTN").addEventListener("click", CircuitToTruth);
document.getElementById("CircuitToExpressionBTN").addEventListener("click", CircuitToExpression);
document.getElementById("RandomBTN").addEventListener("click", Random);

function TruthToExpression() {
    dropdown = false;
    callTruth = "";
    document.getElementById("TryAgainBTN").hidden = true;
    document.getElementById("problem").hidden = false;
    document.getElementById("wolfram").hidden = true;
    document.getElementById("circuit").hidden = true;
    document.getElementById("equation").hidden = true;
    document.getElementById("SubmitBTN").hidden = false;
    document.getElementById("AnswerField").hidden = false;
    document.getElementById("resultText").hidden = true;
    document.getElementById("NewBTN").hidden = true;
    buildTruth();
    document.getElementById("problemDirections").innerHTML = "Enter the expression given the truth table below!" + "<br>" + "(AND = &&, OR = ||, NOT = ~)";
    document.getElementById("SubmitBTN").addEventListener("click", checkAnswer);
    document.getElementById("NewBTN").addEventListener("click", TruthToExpression);
    //document.getElementById("ShowBTN").addEventListener("click", TruthToExpression);
}

function TruthToCircuit() {
    document.getElementById("problemDirections").innerHTML = "This feature is not yet available...";
}

function ExpressionToTruth() {
    dropdown = true;
    callTruth = "";
    document.getElementById("NewBTN").hidden = true;
    document.getElementById("TryAgainBTN").hidden = true;
    document.getElementById("problem").hidden = false;
    document.getElementById("wolfram").hidden = true;
    document.getElementById("circuit").hidden = true;
    document.getElementById("resultText").hidden = true;
    document.getElementById("equation").hidden = false;
    document.getElementById("SubmitBTN").hidden = false;
    document.getElementById("AnswerField").hidden = true;
    document.getElementById("problemDirections").innerHTML = "Given the expression below complete the truth table!";
    buildTruth();
    document.getElementById("equation").innerHTML = e;
    document.getElementById("SubmitBTN").addEventListener("click", checkAnswerTruth);
    document.getElementById("NewBTN").addEventListener("click", ExpressionToTruth);
    //document.getElementById("ShowBTN").addEventListener("click", TruthToExpression);
}

function ExpressionToCircuit() {
    document.getElementById("problemDirections").innerHTML = "This feature is not yet avaialble...";
}

function CircuitToTruth() {
    dropdown = true;
    buildTruth();
    wolfram();
    callTruth = "";
    document.getElementById("NewBTN").hidden = true;
    document.getElementById("wolfram").hidden = false;
    document.getElementById("circuit").hidden = false;
    document.getElementById("equation").hidden = true;
    document.getElementById("SubmitBTN").hidden = false;
    document.getElementById("resultText").hidden = true;
    document.getElementById("problemDirections").innerHTML = "Given the logic circuit below complete the truth table!";
    document.getElementById("SubmitBTN").addEventListener("click", checkAnswerTruth);
    document.getElementById("TryAgainBTN").addEventListener("click", CircuitToTruth);
    document.getElementById("NewBTN").addEventListener("click", CircuitToTruth);
    //document.getElementById("ShowBTN").addEventListener("click", TruthToExpression);
}

function CircuitToExpression() {
    dropdown = false;
    buildTruth();
    wolfram();
    callTruth = "";
    document.getElementById("NewBTN").hidden = true;
    document.getElementById("wolfram").hidden = false;
    document.getElementById("circuit").hidden = false;
    document.getElementById("equation").hidden = true;
    document.getElementById("problem").hidden = true;
    document.getElementById("AnswerField").hidden = false;
    document.getElementById("SubmitBTN").hidden = false;
    document.getElementById("resultText").hidden = true;
    document.getElementById("problemDirections").innerHTML = "Enter the expression given the logic circuit below!" + "<br>" + "(AND = &&, OR = ||, NOT = ~)";
    document.getElementById("SubmitBTN").addEventListener("click", checkAnswer);
    document.getElementById("TryAgainBTN").addEventListener("click", CircuitToExpression);
    document.getElementById("NewBTN").addEventListener("click", CircuitToExpression);
    //document.getElementById("ShowBTN").addEventListener("click", TruthToExpression);
}

function Random() {
    let problem = Math.floor(Math.random() * 4) + 1;

    if (problem == 1){
        TruthToExpression();
    }
    if (problem == 2){
        CircuitToTruth();
    }
    if (problem == 3){
        ExpressionToTruth();
    }
    if (problem == 4){
        CircuitToExpression();
    }

    if (problem == 5){
        ExpressionToCircuit();
    }
    if (problem == 6){
        TruthToCircuit();
    }
}

function buildTruth() {
    buildCompare = [];
    buildCompareFinal = '';
    document.getElementById("problem").innerHTML = "";
    let i, j;
    let placeholder = document.getElementById("problem");
    text = buildExpression();
    if (text == "") {
        placeholder.innerHTML = "<div></div>";
        return;
    }
    if (text.match(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01+~|&() ]/g) != null) {
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
    string += "<tr><th>" + text + "</th></tr>";
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
        if (dropdown == true){
            solve(equation);
            console.log("START");
            string += "<td>" + "<select id='userInput' name='userInput'><option value='0'>0</option> <option value='1'>1</option></select>" + "</td></tr>";
            console.log("FINISH");
        }
        else{
            string += "<td>" + solve(equation) + "</td></tr>";
        }
        
        
    }
    string = "<table align='center' id='truth'>" + string + "</table>";
    if (string.indexOf("<td></td>") == -1)
        placeholder.innerHTML = string;
    else
    placeholder.innerHTML = "<p>Invalid expression.</p>";
    console.log("LOOK HERE! " + e);
    let table = document.getElementById("truth");
    for (let i = 0,row;row = table.rows[i];i++){
        for(let j=0,col; col = row.cells[j];j++){
            
            if (col.textContent == e){
                col.textContent = "";
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
                equation = equation.substring(0, start) + equation.substring(start + 1, end) + equation.substring(end + 1);
        }
        equation = equation.replace(/''/g, '');
        equation = equation.replace(/~0/g, '1');
        equation = equation.replace(/~1/g, '0');
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
    e = '(';
    let x = Math.floor(Math.random()*2)+2;
    
    for(let i=0;i<x;i++){
        match = "";
        matchto = "";
        console.log(x);
        let r = Math.floor(Math.random()*5);
        match = String.fromCharCode(65+r);
        console.log(match);
        while (match=matchto){
            r = Math.floor(Math.random()*5);
            match = String.fromCharCode(65+r);
            console.log("Match While" + match);
        }
        matchto = match;
        console.log("Match " + match);
        console.log("Match To " + matchto);
        e += match; 
        console.log("Expression " + e);
        console.log("Number of times "+i);

        if (i==1 || i==3 || i==5){
            e += ")";
            let y = Math.floor(Math.random()*4);
            if (y==0){
                e += "&(";
                let s = Math.floor(Math.random()*5);
                match1 = String.fromCharCode(65+s); 
                console.log("Match " + match);
                do{
                    s = Math.floor(Math.random()*5);
                    console.log("match1 " + match1);
                    match1 = String.fromCharCode(65+s);
                }
                while (match1==match);
                e += match1;
            }
            if (y==1){
                e += "||(";
                let t = Math.floor(Math.random()*5);
                match2 = String.fromCharCode(65+t); 
                console.log("Match " + match);
                do{
                    t = Math.floor(Math.random()*5);
                    console.log("match2 " + match2);
                    match2 = String.fromCharCode(65+t);
                }
                while (match2=match);
                e += match2; 
            }
            if (y==2){
                e += "&~(";
                let u = Math.floor(Math.random()*5);
                match3 = String.fromCharCode(65+u);
                console.log("Match " + match);
                do{
                    u = Math.floor(Math.random()*5);
                    match3 = String.fromCharCode(65+u);
                    console.log("match3 " + match3);
                }
                while (match3=match);
                e += match3; 
            }
            if (y==3){
                e += "||~(";
                let v = Math.floor(Math.random()*5);
                match4 = String.fromCharCode(65+v); 
                console.log("Match " + match);
                do{
                    v = Math.floor(Math.random()*5);
                    console.log("match4 " + match4);
                    match4 = String.fromCharCode(65+v);
                }
                while (match4=match);
                e += match4; 
            }
        }

        if (i<x-1){
            let y = Math.floor(Math.random()*4);
            if (y==0){
                e += "&";
            }
            if (y==1){
                e += "||";
            }
            if (y==2){
                e += "&~";
            }
            if (y==3){
                e += "||~";
            }
        }
    }
    e += ')';
    console.log(e);
    return e;
}

function buildResults() {
    resultsCompare = [];
    resultsCompareFinal = '';
    let i, j;
    let placeholder = document.getElementById("answer");
    if(callTruth == false){    
        text = getResult(); 
    }
    else{
        text = getResultTruth();
    }
    if (text == "") {
        placeholder.innerHTML = "<div></div>";
        return;
    }
    if (text.match(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01+'~|!&() ]/g) != null) {
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
    string += "<tr><th>" + text + "</th></tr>";
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
                equation = equation.substring(0, start) + equation.substring(start + 1, end) + equation.substring(end + 1);
                console.log("EQUATION PARA " + equation);
        }
        equation = equation.replace(/''/g, '');
        equation = equation.replace(/~0/g, '1');
        equation = equation.replace(/~1/g, '0');
        equation = equation.replace(/!0/g, '1');
        equation = equation.replace(/!1/g, '0');
        
        for (let i = 0; i < equation.length - 1; i++)
            if ((equation[i] == '0' || equation[i] == '1') && (equation[i + 1] == '0' || equation[i + 1] == '1'))
                equation = equation.substring(0, i + 1) + '*' + equation.substring(i + 1, equation.length);
                console.log("EVAL " + equation);
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
    document.getElementById("wolfram").src = "";
    document.getElementById("TryAgainBTN").hidden = true;
    document.getElementById("circuit").style.color = "black";
    document.getElementById("circuit").innerHTML = "Generating Circuit...";
    console.log("BEFORE URI " + e);
    let wolframURI = "https://api.wolframalpha.com/v2/query?appid=GRWHG2-8TQ9WK8J4J&input=logic+circuit+";
    let eURI = encodeURI(e);
    eURI = eURI.replace(/\(/g, '%28');
    eURI = eURI.replace(/\)/g, '%29');
    eURI = eURI.replace(/&/g, '%26');
    eURI = eURI.replace(/\|/g, '%7');
    wolframURI += eURI;
    wolframURI += "&output=json";
    console.log("AFTER URI " + wolframURI);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://booleanpractice.herokuapp.com/wolfram", true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(wolframURI);

    xhr.onreadystatechange = () => {
        console.log("Detected a change to readyState: " + xhr.readyState);
        console.log(xhr)
        if (xhr.readyState == 4) {
            console.log("The data is ready");
            console.log("Data as received:");
            console.log(xhr.response);
            let data = JSON.parse(xhr.response);
            console.log(data);
            try{
                if (data.queryresult != null){
                    let circuit = data.queryresult.pods[1].subpods[0].img.src;
                    document.getElementById("wolfram").src = circuit;
                    document.getElementById("circuit").innerHTML = "";
            }
            } 
            catch{
                document.getElementById("circuit").style.color = "red";
                document.getElementById("circuit").innerHTML = "Error Generating Circuit Please Try Again...";
                document.getElementById("TryAgainBTN").hidden = false;
            }
        }
    }    
}

function getResult(result){
    answer = document.getElementById("AnswerField").value;
    console.log("Answer " + answer);
    return answer;
    
}

function getResultTruth(result){
    tableAnswer = [];
    tableAnswerFinal = "";
    for(i=0;i<userInput.length;i++){
        tableAnswer.push(userInput[i].value);    }
    tableAnswerFinal = tableAnswer.toString();
    console.log("TableAnswer " + tableAnswerFinal);
    return tableAnswerFinal;
}

function checkAnswer() {
    callTruth = false;
    buildResults();
    console.log("Answer " + resultsCompareFinal);
    console.log("Build " + buildCompareFinal)
    if (resultsCompareFinal==buildCompareFinal){
        document.getElementById("resultText").hidden = false;
        document.getElementById("resultText").style.backgroundColor = "green";
        document.getElementById("resultText").innerHTML = "CORRECT!"
        document.getElementById("NewBTN").hidden = false;
        document.getElementById("ShowBTN").hidden = true;
    }
    else{
        document.getElementById("resultText").hidden = false;
        document.getElementById("resultText").style.backgroundColor = "red";
        document.getElementById("resultText").innerHTML = "INCORRECT..."
        document.getElementById("ShowBTN").hidden = false;
    }
}

function checkAnswerTruth() {
    callTruth = true;
    buildResults();
    console.log("TableAnswer " + tableAnswerFinal);
    console.log("Build " + buildCompareFinal)
    if (tableAnswerFinal==buildCompareFinal){
        document.getElementById("resultText").hidden = false;
        document.getElementById("resultText").style.backgroundColor = "green";
        document.getElementById("resultText").innerHTML = "CORRECT!"
        document.getElementById("NewBTN").hidden = false;
        document.getElementById("ShowBTN").hidden = true;
    }
    else{
        document.getElementById("resultText").hidden = false;
        document.getElementById("resultText").style.backgroundColor = "red";
        document.getElementById("resultText").innerHTML = "INCORRECT..."
        document.getElementById("ShowBTN").hidden = false;
    }
}