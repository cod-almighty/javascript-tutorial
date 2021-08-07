// Building objects from rootNote

const chromaticScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const majorSteps = [2,2,1,2,2,2];
const minorSteps = [2,1,2,2,1,2];
const majorPentatonicSteps = [2,2,3,2];
const minorPentatonicSteps = [3,2,2,3];

//format output when doing cosole.log()
function logging(loginfo, context = '') {
    console.log(`DEBUG:: ${context} : [${loginfo}]`);
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
    const table = document.getElementById("fretboard-table");

    for (const row of table.rows){
        for (const cell of row.cells){
            if (scale.includes(cell.innerHTML)) {
                cell.className = 'selected';
            }
            else {
                cell.className = "";
            }
        
        }
    }
}

//helper function to get next note in sequence
function nextNote(currentNote, step = 1) {
    let noteIndex = chromaticScale.indexOf(currentNote);
    
    if (noteIndex + step > chromaticScale.length - 1){
        noteIndex = (noteIndex + step) - chromaticScale.length;
    }
    else noteIndex = noteIndex + step;
    newNote = chromaticScale[noteIndex];

    return newNote;
}

// Helper function to generate scale
let getScale = function(rootNote, steps){
    let note = rootNote;
    let scaleOut = [note];
    steps.forEach(element => {
        logging(element, "step");
        note = nextNote(note, element);
        scaleOut.push(note);
    });
    return scaleOut;
}

//generate the fretboard table
function generateFretboard(){
    let body = document.getElementById("fretboard-id");   
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    const strings = ['E','B','G','D','A','E'];

    tbl.classList.add("fretboard-table");
    tbl.setAttribute("id", "fretboard-table");

    for (let index in strings) {
        let note = strings[index];

        //console.log(note);
        let row = document.createElement("tr")
        
        for (let fret = 0; fret < 18; fret++) {

            let cell = document.createElement("td");
            let cellText = document.createTextNode(note);
            cell.appendChild(cellText);
            row.appendChild(cell);
            cell.setAttribute("onclick","toggleClass(this,'selected');");
            cell.setAttribute("id", "fret");
            note = nextNote(note);
        }
        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
} // Generate Table END

function Scale(rootNote, steps) {
    const scale = getScale(rootNote, steps);
    logging(scale, "returned from getScale()")

    this.I = scale[0],
    this.II = scale[1],
    this.III = scale[2],
    this.IV = scale[3],
    this.V = scale[4],
    this.VI = scale[5],
    this.VII = scale[6]
    
} //Scale END

function NoteInfo(rootNote) {

    this.root = rootNote;
    //logging(`${rootNote} ${majorSteps}`, "data sent to Scale()")
    this.major = new Scale(rootNote, majorSteps);
    this.minor = new Scale(rootNote, minorSteps);
    this.majorPentatonic = getScale(majorPentatonicSteps);
    this.minorPentatonic = getScale(minorPentatonicSteps);
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data){
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, scaleObject) {
    rootNote = scaleObject.rootNote;
    values = (Object.values(scaleObject));
    logging(values, "scale.values")
    logging(values[1], "scale.values[1]")
    for (let i=0; i<5; i++) {
        let row = table.insertRow();
        let notes = values[i+1];
        logging(notes, "notes=values[i+1]")
        for (let note in notes) {
            let cell = row.insertCell();
            let text = document.createTextNode(notes[note]);
            cell.appendChild(text);
        }
    }
}



function showMajor() {
    const keySelect = document.getElementById("key-select");
    const key = keySelect.options[keySelect.selectedIndex].value;

    if (document.getElementById("penta-check").checked) {
        scale = getScale(key, majorPentatonicSteps);
    }
    else {
        scale = getScale(key, majorSteps);
    }

    toggleScale(scale);
}

function showMinor() {
    const keySelect = document.getElementById("key-select");
    const key = keySelect.options[keySelect.selectedIndex].value;

    if (document.getElementById("penta-check").checked) {
        scale = getScale(key, minorPentatonicSteps);
    }
    else {
        scale = getScale(key, minorSteps);
    }

    toggleScale(scale);
}

function clearBoard() {
    const table = document.getElementById("fretboard-table");

    for (const row of table.rows){
        for (const cell of row.cells){
            cell.className = "";        
        }
    }
}


generateFretboard();

//chord = new Scale("A");
//let minorScale = chord.minor;
//console.log(`minor is [${minorScale}]`);
//console.log(`minor pent is [${mpent}]`);