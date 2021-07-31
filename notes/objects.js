// Building objects from rootNote

const chromaticScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const majorSteps = [2,2,1,2,2,2];
const minorSteps = [2,1,2,2,1,2];
const majorPentatonicSteps = [2,2,3,4];
const minorPentatonicSteps = [2,1,4,3];

//format output when doing cosole.log()
function logging(loginfo, context = '') {
    console.log(`DEBUG:: ${context} : [${loginfo}]`);
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

function Scale(rootNote) {

    let getScale = function(steps){
        let note = rootNote;
        let scale = [note];
        steps.forEach(element => {
            logging(element, "step");
            note = nextNote(note, element);
            scale.push(note);
        });
        return scale;
    };

    this.root = rootNote;
    this.major = getScale(majorSteps);
    this.minor = getScale(minorSteps);
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

const cScale = new Scale("C");
let table = document.getElementById("scale-chart");
let data = Object.keys(cScale);
let tdata = Object.values(cScale);
logging(tdata, "tdata variable")
logging(data, "data variable")
//generateTableHead(table, data);
generateTable(table, tdata); 

//chord = new Scale("A");
//let minorScale = chord.minor;
//console.log(`minor is [${minorScale}]`);
//console.log(`minor pent is [${mpent}]`);