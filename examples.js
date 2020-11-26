"use strict";



const body = document.querySelector("body")
// BarChart demonstration
const graph = new BarChart()
graph.addForm();

graph.addData(4, "pear")
graph.addData(4, "pear")
graph.addData(2, "apple")
graph.addData(5, "banana")
graph.addData(7, "orange")
graph.addData(10, "peach")
graph.addData(5, "mango")
graph.render();



// const body = document.querySelector('body')
// const div = document.createElement("div")
// div.style.height = "300px";
// div.style.width = "300px";
// div.style.backgroundColor = "aqua";
// div.style.border = "10px solid black";
// div.style.margin = "10px";
// body.appendChild(div)



const graphB = new BarChart()
graphB.addData(4, "pear")
graphB.addData(4, "pear")
graphB.addData(2, "apple")
graphB.addData(5, "banana")
graphB.addData(7, "orange")
graphB.render();





// Pie Chart demonstration
const pieGraph = new PieChart()
pieGraph.addForm();

pieGraph.addData(4, "pear")
pieGraph.addData(4, "pear")
pieGraph.addData(2, "apple")
pieGraph.addData(5, "banana")
pieGraph.addData(7, "orange")
pieGraph.addData(10, "peach")
pieGraph.addData(5, "mango")
pieGraph.render();

console.log(pieGraph.colors)




// line Chart demonstration
const lineGraphA = new LineChart()
lineGraphA.addForm();

lineGraphA.addData(10, 0);
lineGraphA.addData(1, 2);
lineGraphA.addData(4, 6);
lineGraphA.addData(2, 9);
lineGraphA.addData(5, 10);
lineGraphA.addData(7, 12);
lineGraphA.addData(5, 8);
lineGraphA.addData(5, 8);
lineGraphA.addData(10, 0);

lineGraphA.render();
