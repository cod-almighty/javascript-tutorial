//alert("I'm Working!");

function nextNote(currentNote) {
    const chromaticScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    let noteIndex = chromaticScale.indexOf(currentNote);
    if (currentNote === "B") {
        noteIndex = 0
    }
    else noteIndex++;
    currentNote = chromaticScale[noteIndex]

    return currentNote;
}

function generateTable(){
    let body = document.getElementsByTagName("body")[0];
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    let strings = ['E','B','G','D','A','E'];

    tbl.classList.add("gridview");
    
    for (let index in strings) {
        let note = strings[index];

        console.log(note);
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

generateTable();

/* for (i = 0; i < 18; i++) {
    
    console.log("note" + i + ":" + note);
    note = nextNote(note);
} */