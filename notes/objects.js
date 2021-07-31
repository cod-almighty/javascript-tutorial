// Building objects from rootNote

const chromaticScale = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const majorSteps = [2,2,1,2,2,2,1];
const minorSteps = [2,1,2,2,1,2,2];
const majorPentatonicSteps = [2,2,3,4];
const minorPentatonicSteps = [2,1,4,3];

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


chord = new Scale("A");

console.log(`minor scale is [${chord.minor}]`);
console.log(`major scale is [${chord.major}]`);
console.log(`major pent is [${chord.majorPentatonic}]`);
console.log(`minor pent is [${chord.minorPentatonic}]`);