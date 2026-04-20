// Table and Cells
/* 
•	Table
    o	Cell extends Table
        ■	Start extends Cell
        ■	Goal extends Cell
    o	Solver extends Grid
        ■	BreadthFirst extends Solver
        ■	AStar extends Solver
 */

class Table {
    constructor(width, height) {
        this.width = width; // Columns
        this.height = height; // Rows
        this.dimensions = [height, width]

        // Building the Table Array
        this.table = [];
        for (let i = 0; i < height; i++) { // Rows
            let newRow = [];
            for (let j = 0; j < width; j++) { // Cell in Row
                newRow.push(new Cell([j, i]));
            }
            this.table.push(newRow);
        }
        console.log(this.table);
    }

    // Render the table as a <table> element in HTML
    render() {
        let base = document.createElement("table");
        base.style.border = 1;
        for (let i = 0; i < this.height; i++) {
            let newRow = base.appendChild(document.createElement("tr"));
            for (let j = 0; j < this.width; j++) {
                let newCell = newRow.appendChild(document.createElement("td"));
                console.log(`Will try to search for cell in ${i}, ${j}`)
                newCell.appendChild(document.createTextNode(this.table[i][j].coords));
            }
        }
    }
}

class Cell extends Table {
    constructor(coords) {
        super()
        this.coords = coords;
    }
}

class Start extends Cell {

}

class Goal extends Cell {

}


// Solvers
class Solver extends Table {

}

class BreadthFirst extends Solver {

}

class AStar extends Solver {

}

// Code

myTable = new Table(7, 5)
myTable.render()