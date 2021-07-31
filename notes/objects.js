//object literal. Would need to copy for every new object. bugs can be multiplied doing this
/* const circle = {
    radius: 1,
    location: {
        x: 1,
        y: 1
    },
    draw: function() { //object method aka behaviour
        console.log('draw');
    }
};

circle.draw(); */

//Factory function, creates new objects from template
function createCircle(radius){
    return{
        radius: radius,
        draw: function() {
            console.log('draw')
        }
    };
}

const circle = createCircle(1);
circle.draw();

//Constructor Function
function Circle(radius) { //convention is PascalCase for constructor functions
    this.radius = radius; //'this' refers to the globla object, Circle() in this case
    this.draw = function() {
        console.log('draw');
    }
}

const another = new Circle(12);
console.log(another.radius)


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

const majorSteps = [2,2,1,2,2,2,1]
const minorSteps = [2,1,2,2,1,2,2]
function Scale(rootNote) {
    this.root = rootNote;
    this.getMajor = [];
    this.minor = [];
    this.minorPentatonic = [];
    this.majorPentatonic = [];
    }
}

chord = new Scale("G");d
chord.getScales();
console.log(`chord is [${chord.minor}]`);