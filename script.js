// Table and Cells
/* 
•	Table
    o	Solver extends Grid
        ■	BreadthFirst extends Solver
        ■	AStar extends Solver
•	Cell
    o	Start extends Cell
    o	Goal extends Cell
 */

function indexOf2dArray(array2d, itemtofind) {
    // This code borrowed from lage.us
    // https://lage.us/Javascript-Item-in-2d-Array-Using-indexOf.html
    index = [].concat.apply([], ([].concat.apply([], array2d))).indexOf(itemtofind);
                
    // return "false" if the item is not found
    if (index === -1) { return false; }
    
    // Use any row to get the rows' array length
    // Note, this assumes the rows are arrays of the same length
    numColumns = array2d[0].length;
    
    // row = the index in the 1d array divided by the row length (number of columns)
    row = parseInt(index / numColumns);
    
    // col = index modulus the number of columns
    col = index % numColumns;
    
    return [row, col]; 
}

class Table {
    constructor(width, height) {
        this.width = width; // Columns
        this.height = height; // Rows
        this.dimensions = [height, width]

        // Building the Table Array
        this.table = [];
        let id = 0
        for (let i = 0; i < height; i++) { // Rows
            let newRow = [];
            for (let j = 0; j < width; j++) { // Cell in Row
                newRow.push(new Cell([j, i], id));
                id++;
            }
            this.table.push(newRow);
        }
        console.log("Ran the Table constructor")
    }

    // Render the table as a <table> element in HTML
    render() {
        tableDiv.innerHTML = ""; // Clear out previous table
        let id = 0;
        let base = document.createElement("table");
        base.style.border = 1;
        for (let i = 0; i < this.height; i++) { // Rows
            let newRow = base.appendChild(document.createElement("tr"));
            for (let j = 0; j < this.width; j++) { // Cell in Row
                let newCell = newRow.appendChild(document.createElement("td"));
                newCell.appendChild(document.createTextNode(this.table[i][j].coords));
                newCell.id = id;
                newCell.addEventListener("click", this.table[i][j].changeWallStatus)
                id++;
            }
        }
        tableDiv.appendChild(base);
        console.log("Rendered or rerendered the table")
    }

    changeStart() {
        console.log("Change Start Button Pressed");
    }

    changeGoal() {
        console.log("Change Goal Button Pressed");
    }

    go() {
        let algorithm;
        if (breadthFirstRadio.checked) {
            algorithm = new BreadthFirst(myTable);
        } else if (aStarRadio.checked) {
            algorithm = new AStar(myTable);
        }
        console.log(`Starting solve with ${algorithm.name}`)
        console.log(this);
        algorithm.onGo();
    }
}

class Cell{
    constructor(coords, id) {
        this.coords = coords;
        this.id = id;
        this.isWall = false;
    }

    changeWallStatus() {
        if (!this.isWall) {
            this.isWall = true;
        } else {
            this.isWall = false;
        }
        console.log(`Changed wall status of ${this.coords}: ${this.isWall}`);
    }
}

class Start extends Cell {
    constructor(coords) {
        super(coords)
    }
}

class Goal extends Cell {
    constructor(coords) {
        super()
        this.coords = coords;
    }
}


// Solvers
class Solver extends Table {
    constructor(table) {
        super();
    }

    onGo() {
        console.log("Go button pressed")
    }
}

class BreadthFirst extends Solver {
    constructor(table) {
        super();
        this.name = "Breadth-First Search";
    }
}

class AStar extends Solver {
    constructor(table) {
        super();
        this.name = "A* Search";
    }
}

// Code

myTable = new Table(7, 5)
myTable.render()

function createNewTable() {
    let nr = parseInt(rows.value); // Rows
    let nc = parseInt(columns.value); // Columns
    console.log(`Creating new table with dimensions ${[nc, nr]}`);
    myTable = new Table(nc, nr);
    myTable.render();
}

function tryClear() {
    if (window.confirm("Are you sure you want to clear everything and start over?")) {
        window.location.reload();
    }
}

