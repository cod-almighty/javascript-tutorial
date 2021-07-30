//alert("I'm Working!");
const chromaticScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

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

function toggleClass(el, className) {
    if (el.className.indexOf(className) >= 0) {
        el.className = className.replace(className,"");
    }
    else {
        el.className += className;
    }
}

function toggleScale() {
    const table = document.getElementById("main-table");
    const scale = ["G","A#","C","D","F"];

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
    major.forEach(element => {
        note = nextNote(note,element);
        scale.push(note);      
    });

    console.log("scale[" + scale +"]");

}


generateTable();
generateScale("G");
toggleScale();
/* for (i = 0; i < 18; i++) {
    
    console.log("note" + i + ":" + note);
    note = nextNote(note);
} */