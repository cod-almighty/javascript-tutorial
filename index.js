//alert("I'm Working!");

function nextNote(currentNote) {
    const chromaticScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    let noteIndex = chromaticScale.indexOf(currentNote);
    if (currentNote === "B") {
        noteIndex = 0
    }
    else noteIndex++;
    currentNote = chromaticScale[noteIndex]

    return currentNote
}

let note = "G";

for (i = 0; i < 17; i++) {
    
    console.log("note" + i + ":" + note);
    note = nextNote(note);
}