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
    $('#contentStorage').append('<div class="post"><p>' + translatedBox + '</p></div>') // turn to send requrest
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

var mapForHEXToText = new Map([
    ["00", " "],
    ["01", "a"],
    ["02", "b"],
    ["03", "c"],
    ["04", "d"],
    ["05", "e"],
    ["06", "f"],
    ["07", "g"],
    ["08", "h"],
    ["09", "i"],
    ["0A", "j"],
    ["0B", "k"],
    ["0C", "l"],
    ["0D", "m"],
    ["0E", "n"],
    ["0F", "o"],
    ["10", "p"],
    ["11", "q"],
    ["12", "r"],
    ["13", "s"],
    ["14", "t"],
    ["15", "u"],
    ["16", "v"],
    ["17", "w"],
    ["18", "x"],
    ["19", "y"],
    ["1A", "z"],
    ["1B", "1"],
    ["1C", "2"],
    ["1D", "3"],
    ["1E", "4"],
    ["1F", "5"],
    ["20", "6"],
    ["21", "A"],
    ["22", "B"],
    ["23", "C"],
    ["24", "D"],
    ["25", "E"],
    ["26", "F"],
    ["27", "G"],
    ["28", "H"],
    ["29", "I"],
    ["2A", "J"],
    ["2B", "K"],
    ["2C", "L"],
    ["2D", "M"],
    ["2E", "N"],
    ["2F", "O"],
    ["30", "P"],
    ["31", "Q"],
    ["32", "R"],
    ["33", "S"],
    ["34", "T"],
    ["35", "U"],
    ["36", "V"],
    ["37", "W"],
    ["38", "X"],
    ["39", "Y"],
    ["3A", "Z"],
    ["3B", "7"],
    ["3C", "8"],
    ["3D", "9"],
    ["3E", "0"],
    ["3F", "!"],
    ["40", " "],
    ["41", ","],
    ["42", "."]
])

var mapForBinaryToText = new Map([
    ["00000000", " "],
    ["00000001", "a"],
    ["00000010", "b"],
    ["00000011", "c"],
    ["00000100", "d"],
    ["00000101", "e"],
    ["00000110", "f"],
    ["00000111", "g"],
    ["00001000", "h"],
    ["00001001", "i"],
    ["00001010", "j"],
    ["00001011", "k"],
    ["00001100", "l"],
    ["00001101", "m"],
    ["00001110", "n"],
    ["00001111", "o"],
    ["00010000", "p"],
    ["00010001", "q"],
    ["00010010", "r"],
    ["00010011", "s"],
    ["00010100", "t"],
    ["00010101", "u"],
    ["00010110", "v"],
    ["00010111", "w"],
    ["00011000", "x"],
    ["00011001", "y"],
    ["00011010", "z"],
    ["00011011", "1"],
    ["00011100", "2"],
    ["00011101", "3"],
    ["00011110", "4"],
    ["00011111", "5"],
    ["00100000", "6"],
    ["00100001", "A"],
    ["00100010", "B"],
    ["00100011", "C"],
    ["00100100", "D"],
    ["00100101", "E"],
    ["00100110", "F"],
    ["00100111", "G"],
    ["00101000", "H"],
    ["00101001", "I"],
    ["00101010", "J"],
    ["00101011", "K"],
    ["00101100", "L"],
    ["00101101", "M"],
    ["00101110", "N"],
    ["00101111", "O"],
    ["00110000", "P"],
    ["00110001", "Q"],
    ["00110010", "R"],
    ["00110011", "S"],
    ["00110100", "T"],
    ["00110101", "U"],
    ["00110110", "V"],
    ["00110111", "W"],
    ["00111000", "X"],
    ["00111001", "Y"],
    ["00111010", "Z"],
    ["00111011", "7"],
    ["00111100", "8"],
    ["00111101", "9"],
    ["00111110", "0"],
    ["00111111", "!"],
    ["01000000", " "],
    ["01000001", ","],
    ["01000010", "."]
]
);

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
