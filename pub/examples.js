"use strict";
const body = document.querySelector("body")


const div = document.createElement("div")
div.textContent = "click on one of the bars of the graph to perform deletion."
body.appendChild(div)


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







const graphB = new BarChart()
graphB.addData(4, "pear")
graphB.addData(4, "pear")
graphB.addData(2, "apple")
graphB.addData(5, "banana")
graphB.addData(7, "orange")
graphB.render();





const div1 = document.createElement("div")
div1.textContent = "click on one of the stats bar on the right of the graph to delete a pie."
body.appendChild(div1)



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



const div2 = document.createElement("div")
div2.textContent = "click on a point to perform deletion."
body.appendChild(div2)


// line Chart demonstration
const lineGraphA = new LineChart()
lineGraphA.addForm();

lineGraphA.addData(10, 4);
lineGraphA.addData(1, 2);
lineGraphA.addData(4, 6);
lineGraphA.addData(2, 9);
lineGraphA.addData(5, 10);
lineGraphA.addData(7, 12);
lineGraphA.render();



const lineGraphB = new LineChart()
lineGraphB.addForm();

lineGraphB.addData(10, 0);
lineGraphB.addData(1, 2);
lineGraphB.addData(4, 6);
lineGraphB.addData(2, 9);
lineGraphB.render();
