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
                // Special section to create START and GOAL
                if (i == 0 && j == 0) {
                    newRow.push(new Start([j, i], id));
                    continue;
                }
                if (i == height-1 && j == width-1) {
                    newRow.push(new Goal([j, i], id))
                    continue;
                }
                newRow.push(new Cell([j, i], id));
                id++;
            }
            this.table.push(newRow);
        }
        console.log("Ran the Table constructor");
        console.log(this.table);
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
                // Special code to render START and GOAL
                if (i == 0 && j == 0) {
                    let newCell = newRow.appendChild(document.createElement("td"));
                    newCell.appendChild(document.createTextNode("S"));
                    newCell.id = id;
                    newCell.classList.add("start");
                    continue;
                }
                if (i == this.height-1 && j == this.width-1) {
                    let newCell = newRow.appendChild(document.createElement("td"));
                    newCell.appendChild(document.createTextNode("G"));
                    newCell.id = id;
                    newCell.classList.add("goal");
                    continue;
                }
                let newCell = newRow.appendChild(document.createElement("td"));
                newCell.appendChild(document.createTextNode(this.table[i][j].coords));
                newCell.addEventListener("click", this.table[i][j].changeWallStatus)
                newCell.id = id;
                newCell.classList.add("cell");
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

class Cell {
    constructor(coords, id) {
        this.coords = coords;
        this.id = id;
        this.isWall = false;
        // These variables are used by the solvers when validating that the table has a start and goal & during the solve to see if the goal has been reached        
        this.isStart = true;
        this.isGoal = false;
    }

    changeWallStatus() {
        if (!this.isWall) {
            this.isWall = true;
            this.classList.toggle("wall")
            myTable.table[this.id%myTable.height+1][Math.floor(this.id/myTable.height)].isWall = true;
        } else {
            this.isWall = false;
            this.classList.toggle("wall")
            myTable.table[this.id%myTable.height+1][Math.floor(this.id/myTable.height)].isWall = false;
        }
        console.log(myTable.height)
        console.log(Math.floor(this.id/myTable.height), this.id%myTable.height+1)
        console.log(myTable.table[this.id%myTable.height+1][Math.floor(this.id/myTable.height)]);
        console.log(`Changed wall status of ${Math.floor(this.id/myTable.height)}, ${this.id%myTable.height+1}: ${this.isWall}`);
    }
}

class Start extends Cell {
    constructor(coords, id) {
        super(coords, id)
        this.coords = coords;
        this.id = id;
        this.isStart = true;
        this.isGoal = false;
    }
}

class Goal extends Cell {
    constructor(coords, id) {
        super(coords, id)
        this.coords = coords;
        this.id = id;
        this.isStart = false;
        this.isGoal = true;
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
        this.table = table;
    }

    getNeighbors(coords) {
        let out = []
    }

    onGo() {
        let queue = [];
        for (let i = 0; i < this.table.height; i++) {
            for (let j = 0; j < this.table.length; j++) {

            }
        }
    }
}

class AStar extends Solver {
    constructor(table) {
        super();
        this.name = "A* Search";
    }
}

// Code

myTable = new Table(10, 10) // This is the table used in all calculations
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

