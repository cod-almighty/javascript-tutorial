/* 
    app to generate scales from a given root note,
    show the positions of each note on the guitar neck,
    allow notes to be selected/deselected by click
*/
// Arrays being used. these should be moved into an object, maybe?
const chromaticScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const majorSteps = [2,2,1,2,2,2];
const minorSteps = [2,1,2,2,1,2];
const majorPentatonicSteps = [2,2,3,4];
const minorPentatonicSteps = [2,1,4,3];

//format output before console.log
function logging(logtext, context=""){
    console.log(`DEBUG output [${logtext}], ${context}`);
}

//get note from text box when button is pushed
function getScaleButton() {
    let note = document.getElementById("noteText").value;
    let penta = document.getElementById("penta-check").checked;
    let minor = document.getElementById("minor-check").checked;
    logging(note, "getNote");
    logging(penta, "penta-check");
    logging(minor, "minor-check");
    scale = generateScale(note);
    logging(scale, "getScaleButton");
    toggleScale(scale);
}

//helper function to get next note in sequence
function nextNote(currentNote, step = 1) {
    //console.log(chromaticScale.length);
    let noteIndex = chromaticScale.indexOf(currentNote);
    if (noteIndex + step > chromaticScale.length - 1){
        noteIndex = (noteIndex + step) - chromaticScale.length;
    }
    else noteIndex = noteIndex + step;
    newNote = chromaticScale[noteIndex];

    return newNote;
}

//generate the fretboard table
function generateTable(){
    let body = document.getElementsByTagName("body")[0];
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    const strings = ['E','B','G','D','A','E'];

    tbl.classList.add("gridview");
    tbl.setAttribute("id","main-table");

    for (let index in strings) {
        let note = strings[index];

        //console.log(note);
        let row = document.createElement("tr")
        
        for (let j = 0; j < 18; j++) {

            let cell = document.createElement("td");
            let cellText = document.createTextNode(note);
            cell.appendChild(cellText);
            row.appendChild(cell);
            cell.setAttribute("onclick","toggleClass(this,'selected');");
            note = nextNote(note);
        }
        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

//toggle note highlight with click
function toggleClass(el, className) {
    if (el.className.indexOf(className) >= 0) {
        el.className = className.replace(className,"");
    }
    else {
        el.className += className;
    }
}

//toggle highlighted scale
function toggleScale(scale) {
    const table = document.getElementById("main-table");
    //const scale = ["G","A#","C","D","F"];

    for (const row of table.rows){
        for (const cell of row.cells){
            if (scale.includes(cell.innerHTML)) {
                cell.className += 'selected';
            }
        
        }
    }
}

function generateScale(note){
    const major = [2,2,1,2,2,2,1]
    const minor = [2,1,2,2,1,2,2]
    //let noteIndex = chromaticScale.indexOf(note);
    let scale = [note];
    minor.forEach(element => {
        note = nextNote(note,element);
        scale.push(note);       
    });

    logging(scale, "generateScale");
    return scale;
}

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for 
}

generateTable();
let table = document.getElementById("scale-chart");
generateTableHead(table);
//scale = generateScale("G");
//Logging('returned scale',scale);
//toggleScale(scale);
