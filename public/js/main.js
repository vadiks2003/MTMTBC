//import { mapForBinaryToText } from './binMap.json';
//import { mapForHEXToText } from './hexMap.json';

let mapForHEXToText;
let mapForBinaryToText;

// cant turn it into function because 1. returning on load doesnt return anything... 2. cant pass arguments by reference, unless its parameter of an object. which would require me to rewrite a lot of my code and im too lazy
{
    const xmlhttpBin = new XMLHttpRequest();
    xmlhttpBin.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            const jsonObj = JSON.parse(this.responseText);
            mapForBinaryToText = new Map(Object.entries(jsonObj));
        }
    }
    xmlhttpBin.open("GET", "/json/binMap")  
    xmlhttpBin.send();
    
}
{
    const xmlhttpBin = new XMLHttpRequest();
    xmlhttpBin.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            const jsonObj = JSON.parse(this.responseText);
            mapForHEXToText = new Map(Object.entries(jsonObj));
        }
    }
    xmlhttpBin.open("GET", "/json/hexMap")  
    xmlhttpBin.send();
    
}


var mode = "binary";

var outputBox = "";
var outputBoxArr = [];
outputBoxArr[0] = "";
var outputBoxArrPointer = 0;
var translatedBox = "";

$( "#input_0" ).click(function(){
    addDigit("0");
})

$( "#input_1" ).click(function(){
    addDigit("1");
})

$( '#backspace').click(function()
{
    removeDigit();
})

$( '#buttonSubmit').click(function()
{
    addNewPost();
})
$( '#binSelect').click(function()
{
    switchToBinMode();
})
$( '#HEXSelect').click(function()
{
    switchToHEXMode();
})
let docBinInput = document.getElementById("inputs");
let docHEXinput = document.getElementById("inputsHEX");
let docBinSheet = document.getElementById("binSheet");
let docHEXSheet = document.getElementById("HEXSheet");
let switchToBinMode = function(){
    mode = "binary";
    docBinInput.style.display = "flex";
    docHEXinput.style.display = "none";
    docBinSheet.style.display = "flex";
    docHEXSheet.style.display = "none";
    resetInput();
}
let switchToHEXMode = function()
{
    mode = "HEX";
    docBinInput.style.display = "none";
    docHEXinput.style.display = "flex";
    docBinSheet.style.display = "none";
    docHEXSheet.style.display = "flex";
    resetInput();
}

let addNewPost = function()
{
    $('#contentStorage').append('<div class="post"><p>' + translatedBox + '</p></div>') // turn to send requrest in future
    resetInput();
    
}

let resetInput = function()
{
    outputBox = ""
    outputBoxArr = [];
    outputBoxArr[0] = "";
    outputBoxArrPointer = 0;
    translatedBox = "";
    updateInput(false);
    $( '#outputTranslated' ).html(translatedBox);
}
$('#buttonReset').click(resetInput);


var addDigit = function(inputDigit)
{
    if(outputBoxArr[outputBoxArrPointer].length%8 == 0 && outputBox.length != 0 && mode == "binary")
    {
        outputBox += " "
        outputBoxArrPointer += 1;
        outputBoxArr[outputBoxArrPointer] = "";
    }

    else if(outputBoxArr[outputBoxArrPointer].length%2 == 0 && outputBox.length != 0 && mode == "HEX")
    {
        outputBox += " "
        outputBoxArrPointer += 1;
        outputBoxArr[outputBoxArrPointer] = "";
    }

    outputBox += inputDigit;
    outputBoxArr[outputBoxArrPointer] += inputDigit;
    updateInput(true);
}
var removeDigit = function()
{
    //if(outputBox[outputBox.length] == null)
    //{
        outputBox = outputBox.slice(0, outputBox.length-1) // remove 1 letter backward
    //}
    //god knows what purpose was for the double slice with if statement, if everything breaks, remove //. the purpose as i remember was removing the blank spacebAR
    //outputBox = outputBox.slice(0, outputBox.length) 
    outputBoxArr[outputBoxArrPointer] = outputBoxArr[outputBoxArrPointer].slice(0, outputBoxArr[outputBoxArrPointer].length-1) // remove one letter backward in array i guess i dont know
    if(outputBoxArr[outputBoxArrPointer].length == 7 && mode == "binary")
    {
        translatedBox = translatedBox.slice(0,translatedBox.length-1);
    }
    else if(outputBoxArr[outputBoxArrPointer].length == 1 && mode == "HEX")
    {
        translatedBox = translatedBox.slice(0,translatedBox.length-1);
    }

    if(outputBox[outputBox.length-1] == " ")
    {
        outputBox = outputBox.slice(0, outputBox.length-1)
        outputBoxArrPointer -= 1;
    }

    updateInput(false);
    updateTranslated();
}

var updateInput = function(doITranslate)
{
    $('#outputDisplay').html(outputBox);
    if(doITranslate){
        attemptToTranslate();
    }
    
    
}
var updateTranslated = function()
{
    $('#outputTranslated').html(translatedBox);
    if(translatedBox == '')
    {
        $('#outputTranslated').html("empty field!");
    }
    
}

var attemptToTranslate = function()
{
    if(outputBoxArr[outputBoxArrPointer].length == 8 && mode == "binary")
    {
        
        let a = mapForBinaryToText.get(outputBoxArr[outputBoxArrPointer]);
        if(a !== undefined)
        {
            translatedBox += a;
            updateTranslated();
        }
        else{
            outputBox = outputBox.slice(0,outputBox.length-9);
            outputBoxArr[outputBoxArrPointer] = "";
            if(outputBoxArrPointer > 0)
            {
                outputBoxArrPointer -= 1;
            }
            
            updateInput(false);
        }
    }
    else if(outputBoxArr[outputBoxArrPointer].length == 2 && mode == "HEX")
    {
        let a = mapForHEXToText.get(outputBoxArr[outputBoxArrPointer]);
        if(a !== undefined)
        {
            translatedBox += a;
            updateTranslated();
        }
        else{
            outputBox = outputBox.slice(0,outputBox.length-2);
            outputBoxArr[outputBoxArrPointer] = "";
            if(outputBoxArrPointer > 0)
            {
                outputBoxArrPointer -= 1;
            }
            updateInput(false);
        }
    }
}

// type in hex part
$( "#inputHEX_0" ).click(function(){
    addDigit("0");
})
$( "#inputHEX_1" ).click(function(){
    addDigit("1");
})
$( "#inputHEX_2" ).click(function(){
    addDigit("2");
})
$( "#inputHEX_3" ).click(function(){
    addDigit("3");
})
$( "#inputHEX_4" ).click(function(){
    addDigit("4");
})
$( "#inputHEX_5" ).click(function(){
    addDigit("5");
})
$( "#inputHEX_6" ).click(function(){
    addDigit("6");
})
$( "#inputHEX_7" ).click(function(){
    addDigit("7");
})
$( "#inputHEX_8" ).click(function(){
    addDigit("8");
})
$( "#inputHEX_9" ).click(function(){
    addDigit("9");
})
$( "#inputHEX_10" ).click(function(){
    addDigit("A");
})
$( "#inputHEX_11" ).click(function(){
    addDigit("B");
})
$( "#inputHEX_12" ).click(function(){
    addDigit("C");
})
$( "#inputHEX_13" ).click(function(){
    addDigit("D");
})
$( "#inputHEX_14" ).click(function(){
    addDigit("E");
})
$( "#inputHEX_15" ).click(function(){
    addDigit("F");
})
