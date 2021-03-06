"use strict";

(function(global, document) { 

let graphID = 0;
let graphArray = [];


function colorGenerator(colorArray) {
    let code = "0123456789ABCDEF"
    while (true) {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            let char = code[Math.floor(Math.random() * 16)]
            color += char;
        }
        if (colorArray.includes(color) === false) {
            return color;
        }
    }
}


function searchGraph(id) {
    return graphArray.find((graph) => { return graph.ID == id; });
}





function BarChart() {
    const body = document.querySelector('body')

    this.ID = graphID;
    graphID++;
    this.chart = null;

    this.data = [];
    this.colors = [];

    // reset to 0 in clear
    // this.total = 0;

    const container = document.createElement('div');
    container.className = 'BarChartContainer';
    container.id = this.ID;
    container.style = 'height: 400px; '

    const barChart = document.createElement('table');
    barChart.className = 'barChart';
    barChart.id = this.ID;


    const graphTitle = document.createElement('tr');
    graphTitle.className = 'graphTitle';
    graphTitle.id = this.ID;

    const barRow = document.createElement('tr');
    barRow.className = 'DataRow';
    barRow.id = this.ID;
    barRow.style = "vertical-align: bottom;";

    barChart.appendChild(graphTitle);
    barChart.appendChild(barRow);
    container.appendChild(barChart);
    body.appendChild(container)


    this.chart = container;
    graphArray.push(this);

}

BarChart.prototype = {

    addData: function (amount, category) {
        let i = 0;
        let found = false;
        for (i = 0; i < this.data.length; i++) {
            if (this.data[i].category === category) {
                this.data[i].number += amount;
                found = true;
                break
            }
        }

        if (!found) {
            let color = colorGenerator(this.colors);
            this.colors.push(color)
            let data = {
                category: category,
                number: amount,
                color: color
            }
            this.data.push(data);
        }
    },

    render: function () {
        const barChart = document.getElementById(this.ID).getElementsByClassName("DataRow")[0];
        this.clear();

        // render here
        let total = this.sum();
        let ratio = this.ratio();
        for (let i = 0; i < this.data.length; i++) {
            let percentage = Math.floor(this.data[i].number / total * 100) + "%";
            const percent = document.createElement('div');
            percent.textContent = percentage;

            const columnBar = document.createElement('td');
            columnBar.id = this.ID.toString(10) + i.toString(10)
            const content = document.createElement('div');
            content.id = this.ID.toString(10) + i.toString(10)
            content.className = "dataBar";
            content.style.height = String(this.data[i].number * ratio) + "px";
            content.style.backgroundColor = this.data[i].color;
            content.style.border = "1px solid black";
            columnBar.appendChild(percent);
            columnBar.appendChild(content);
            barChart.appendChild(columnBar);
            columnBar.addEventListener('mouseenter', this.mouseOnBar);
            columnBar.addEventListener('mouseleave', this.mouseLeaveBar);
        }

        const description = document.createElement('td');
        barChart.appendChild(description);
        for (let i = 0; i < this.data.length; i++) {
            const stat = document.createElement('div');
            stat.className = "stat"
            stat.style.backgroundColor = this.data[i].color
            stat.textContent = this.data[i].category
            description.appendChild(stat)
        }
    },

    max: function () {
        let max = 0

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].number > max) {
                max = this.data[i].number;
            }
        }
        return max;
    },

    ratio: function () {
        const max = this.max();
        const tableHeight = parseInt(document.getElementById(this.ID).style.height, 10);

        let ratio = 1;
        ratio = (tableHeight / 1.4) / max;
        return ratio;
    },

    sum: function () {
        let sum = 0
        for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i].number;
        }
        return sum;
    },


    addForm: function () {

        const formContainer = document.createElement('form');
        formContainer.id = this.ID;
        formContainer.className = "form";

        const inputA = document.createElement('input');
        inputA.type = "text";
        inputA.placeholder = "Category";

        const inputB = document.createElement('input');
        inputB.type = "number";
        inputB.placeholder = "value";
        inputB.defaultValue = 1;

        const inputSubmit = document.createElement('input');
        inputSubmit.type = "submit";
        inputSubmit.value = "ADD";


        formContainer.appendChild(inputA);
        formContainer.appendChild(inputB);
        formContainer.appendChild(inputSubmit);

        const barchart = document.getElementById(this.ID);
        barchart.prepend(formContainer)

        formContainer.addEventListener('submit', this.addToBarChart);
    },

    addToBarChart: function (e) {
        e.preventDefault();
        const barchart = document.getElementById(e.target.id);
        const category = e.target.getElementsByTagName("input")[0].value;
        const value = e.target.getElementsByTagName("input")[1].value;

        if (isNaN(parseFloat(value))) {
            alert("not a number")
            return;
        }

        let graph = searchGraph(parseInt(e.target.id))
        graph.clear();
        graph.addData(parseFloat(value), category);
        graph.render();

    },


    clear: function () {
        const childArray = document.getElementById(this.ID).getElementsByClassName("DataRow")[0].childNodes;
        const count = childArray.length;
        for (let i = 0; i < count; i++) {
            childArray[0].remove();
        }
    },

    mouseOnBar: function (e) {
        let deleteButton = document.createElement('button');
        deleteButton.style.height = "15px";
        deleteButton.style.width = "15px";
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.padding = "0px"
        deleteButton.style.border = "0px"
        deleteButton.id = e.target.id;

        // let image = document.createElement('img');
        // image.style.height = "15px";
        // image.style.width = "15px";
        // image.src = "image/delete.jpg";
        // image.id = e.target.id;

        let image = document.createElement('div');
        image.style.height = "15px";
        image.style.width = "15px";
        image.style.backgroundColor = "red"
        image.id = e.target.id;

        e.target.prepend(deleteButton)
        deleteButton.appendChild(image)
        deleteButton.addEventListener('click', BarChart.prototype.deletePress);
        // image.addEventListener('click', BarChart.prototype.deletePress);
    },

    mouseLeaveBar: function (e) {
        let buttom = document.getElementsByTagName("button")[0]
        buttom.remove()
    },

    deletePress: function (e) {
        let parent = e.target.id[0]
        let index = e.target.id[1]

        let result = searchGraph(parseInt(parent))
        e.path[2].remove()

        result.data.splice(parseInt(index), 1);
        result.colors.splice(parseInt(index), 1);

        result.render();
    },
}





function PieChart() {
    this.ID = graphID;
    graphID++;
    this.chart = null;
    this.canvas = null
    this.data = [];
    this.radius = null;
    this.title = null;
    this.height = null;
    this.width = null;
    this.colors = [];

    const body = document.querySelector('body')

    const outer = document.createElement('div');
    outer.className = 'PieChartOuter';
    outer.id = this.ID;
    outer.style = 'height: 400px;';

    const container = document.createElement('table');
    container.className = 'PieChartContainer';
    container.id = this.ID;

    const PieChart = document.createElement('canvas');
    PieChart.className = 'PieChart';
    PieChart.id = this.ID;

    const graphTitle = document.createElement('tr');
    graphTitle.className = 'graphTitle';
    graphTitle.id = this.ID;

    const graph = document.createElement('tr');
    graph.className = 'graph';
    graph.id = this.ID;

    graph.appendChild(PieChart)

    container.appendChild(graphTitle);
    container.appendChild(graph);
    outer.appendChild(container)
    body.appendChild(outer);

    this.chart = graph;
    this.canvas = PieChart;
    graphArray.push(this);

}

PieChart.prototype = {

    addData: function (amount, category) {
        let i = 0;
        let found = false;
        for (i = 0; i < this.data.length; i++) {
            if (this.data[i].category === category) {
                this.data[i].number += amount;
                found = true;
                break
            }
        }

        if (!found) {
            let color = colorGenerator(this.colors);
            this.colors.push(color)
            let data = {
                category: category,
                number: amount,
                color: color
            }
            this.data.push(data);
        }
    },

    render: function () {

        this.clear();
        let sortedData = this.toRatio(this.data);
        const PieChart = document.getElementById(this.ID).getElementsByClassName("PieChart")[0].getContext("2d");

        let sum = 0

        let position = 0;
        for (let i = 0; i < this.data.length; i++) {
            PieChart.fillStyle = sortedData[i].color;
            PieChart.beginPath();
            let degree = sortedData[i].number;
            PieChart.moveTo(100, 75);
            PieChart.arc(100, 75, 50, position, position + degree);
            PieChart.closePath();
            PieChart.fill();

            position = position + degree;
            sum += this.data[i].number;
        }


        const description = document.createElement('td');
        this.chart.appendChild(description);
        for (let i = 0; i < this.data.length; i++) {
            const stat = document.createElement('div');
            stat.style.backgroundColor = this.data[i].color
            stat.className = "stat"
            stat.textContent = this.data[i].category + "  " + Math.floor(this.data[i].number/sum *100) + "%"
            description.appendChild(stat);
            stat.id = this.ID.toString(10) + i.toString(10);

            stat.addEventListener('mouseenter', this.mouseOnBar);
            stat.addEventListener('mouseleave', this.mouseLeaveBar);
        }

    },

    sum: function () {
        let sum = 0

        for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i].number;
        }

        return sum;
    },

    toRatio: function () {
        const sum = this.sum();

        let data = this.data.map((value) => { return { category: value.category, number: value.number / sum * 2 * Math.PI, color: value.color } });
        return data;
    },

    addForm: function () {

        const formContainer = document.createElement('form');
        formContainer.id = this.ID;
        formContainer.className = "form";

        const inputA = document.createElement('input');
        inputA.type = "text";
        inputA.placeholder = "Category";

        const inputB = document.createElement('input');
        inputB.type = "number";
        inputB.placeholder = "value";

        const inputSubmit = document.createElement('input');
        inputSubmit.type = "submit";
        inputSubmit.value = "ADD";


        formContainer.appendChild(inputA);
        formContainer.appendChild(inputB);
        formContainer.appendChild(inputSubmit);

        const piechart = document.getElementById(this.ID);
        piechart.prepend(formContainer)

        formContainer.addEventListener('submit', this.addToPieChart);
    },

    addToPieChart: function (e) {
        e.preventDefault();
        const category = e.target.getElementsByTagName("input")[0].value;
        const value = e.target.getElementsByTagName("input")[1].value;

        if (isNaN(parseFloat(value))) {
            alert("not a number")
            return;
        }

        let graph = searchGraph(parseInt(e.target.id))
        graph.chart.childNodes[1].remove();
        graph.clear();
        graph.addData(parseFloat(value), category);
        graph.render();

    },


    clear: function () {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const statistic = document.getElementById(this.ID).getElementsByTagName("div")

        let len = statistic.length
        for (let i=0; i< len; i++) {
            statistic[0].remove();
        }
    },

    mouseOnBar: function (e) {
        let deleteButton = document.createElement('button');
        deleteButton.style.height = "15px";
        deleteButton.style.width = "15px";
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.padding = "0px"
        deleteButton.style.border = "0px"
        deleteButton.id = e.target.id;

        // let image = document.createElement('img');
        // image.style.height = "15px";
        // image.style.width = "15px";
        // image.src = "image/delete.jpg";
        // image.id = e.target.id;

        let image = document.createElement('div');
        image.style.height = "15px";
        image.style.width = "15px";
        image.style.backgroundColor = "red"
        image.id = e.target.id;

        e.target.appendChild(deleteButton)
        deleteButton.appendChild(image)
        deleteButton.addEventListener('click', PieChart.prototype.deletePress);
    },

    mouseLeaveBar: function (e) {
        let buttom = document.getElementsByTagName("button")[0]
        buttom.remove()
    },

    deletePress: function (e) {
        let parent = e.target.id[0]
        let index = e.target.id[1]

        let result = searchGraph(parseInt(parent))
        e.path[2].remove()

        result.data.splice(parseInt(index), 1);
        result.colors.splice(parseInt(index), 1);

        result.render();
    },
}





function LineChart() {
    this.ID = graphID;
    graphID++;
    this.chart = null;
    this.canvas = null;
    this.data = [];
    this.x_axis = "x";
    this.y_axis = "y";
    this.title = null;
    this.height = null;
    this.width = null;

    const body = document.querySelector('body')

    const container = document.createElement('div');
    container.className = 'LineChartContainer';
    container.id = this.ID;
    container.style = 'height: 400px;';

    const lineChart = document.createElement('canvas');
    lineChart.className = 'lineChart';
    lineChart.id = this.ID;

    const canvasContainer = document.createElement('div');
    canvasContainer.className = "canvasContainer"
    canvasContainer.id = this.ID;

  
    // canvasContainer.appendChild(lineChart)
    // container.appendChild(canvasContainer);

    container.appendChild(lineChart);

    body.appendChild(container);

    this.chart = container;
    this.canvas = lineChart;
    graphArray.push(this);
}

LineChart.prototype = {

    addData: function (x_value, y_value) {
        let i = 0;
        let duplicate = false;
        for (i = 0; i < this.data.length; i++) {
            if ((this.data[i].x === x_value) && (this.data[i].y === y_value) || (this.data[i].x === x_value)) {
                duplicate = true;
                this.data[i].y = y_value;
                break;
            }
        }

        if (!duplicate) {
            let data = {
                x: x_value,
                y: y_value
            }
            this.data.push(data);
        }
    },

    render: function () {    
        this.clear();

        let sortedData = this.sort();
        const lineChart = document.getElementById(this.ID).getElementsByClassName("lineChart")[0].getContext("2d");
        let ratio_x = this.ratio().ratio_x;
        let ratio_y = this.ratio().ratio_y;

        const canvas = document.getElementById(this.ID)
        const canvasHeight = parseInt(document.getElementById(this.ID).getElementsByClassName("lineChart")[0].height, 10);
        for (let i = 0; i < this.data.length - 1; i++) {

            let x = sortedData[i].x * ratio_x;
            let y = sortedData[i].y * ratio_y;

            // const point = document.createElement('div');
            // point.style.position = "relative"
            // point.style.left = (sortedData[i].x * 47 - 10) + "px"
            // point.style.top = ((canvasHeight - sortedData[i].y*23) - 175) + "px"
            // point.style.width = "10px"
            // point.style.height = "10px"
            // point.style.backgroundColor = "red"
            // canvas.appendChild(point)

            const point = document.createElement('div');
            point.style.position = "relative"

            // point.style.left = (x * 1.7 - 8) + "px"
            // point.style.top = ((-y)*2.45) + "px"

            point.style.left = (x * 2.5 - 10) + "px"
            point.style.top = ((canvasHeight - y * 2.4) - 170) + "px"

            point.style.width = "10px"
            point.style.height = "10px"
            point.style.backgroundColor = "red"
            point.style.borderRadius = "5px"
            canvas.appendChild(point)

            point.addEventListener('mouseenter', this.mouseOnBar);
            point.addEventListener('mouseleave', this.mouseLeaveBar);
            point.id = this.ID.toString(10) + i.toString(10)


            let xNext = sortedData[i + 1].x * ratio_x;
            let yNext = sortedData[i + 1].y * ratio_y;
            lineChart.beginPath();
            lineChart.moveTo(x, canvasHeight - y);
            lineChart.strokeStyle = 'black';
            lineChart.lineWidth = 2;
            lineChart.lineTo(xNext, canvasHeight - yNext);
            lineChart.stroke();
        }
        if (this.data.length) {
            let x = sortedData[this.data.length - 1].x * ratio_x;
            let y = sortedData[this.data.length - 1].y * ratio_y;
    
            const point = document.createElement('div');
            point.style.position = "relative"
            point.style.left = (x * 2.6 - 10) + "px"
            point.style.top = ((canvasHeight - y * 2.4) - 170) + "px"
            point.style.width = "10px"
            point.style.height = "10px"
            point.style.backgroundColor = "red"
            point.style.borderRadius = "5px"
            point.id = this.ID.toString(10) + (this.data.length - 1).toString(10);
            point.addEventListener('mouseenter', this.mouseOnBar);
            point.addEventListener('mouseleave', this.mouseLeaveBar);
            canvas.appendChild(point)
        }   
    },

    sort: function () {
        return this.data.sort(function (a, b) { return a.x - b.x });
    },

    max_X_value: function () {
        let max = 0

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].x > max) {
                max = this.data[i].x;
            }
        }

        return max;
    },

    max_Y_value: function () {
        let max = 0

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].y > max) {
                max = this.data[i].y;
            }
        }

        return max;
    },

    ratio: function () {
        const max_x = this.max_X_value();
        const max_y = this.max_Y_value();

        const canvasHeight = parseInt(document.getElementById(this.ID).getElementsByClassName("lineChart")[0].height, 10);
        const canvasWidth = parseInt(document.getElementById(this.ID).getElementsByClassName("lineChart")[0].width, 10);


        let ratio_x = (canvasWidth / 1.1) / max_x;
        let ratio_y = (canvasHeight / 1.4) / max_y;

        return {
            ratio_x: ratio_x,
            ratio_y: ratio_y
        };
    },


    addForm: function () {

        const formContainer = document.createElement('form');
        formContainer.id = this.ID;
        formContainer.className = "form";

        const inputA = document.createElement('input');
        inputA.type = "number";
        inputA.placeholder = "x";

        const inputB = document.createElement('input');
        inputB.type = "number";
        inputB.placeholder = "y";

        const inputSubmit = document.createElement('input');
        inputSubmit.type = "submit";
        inputSubmit.value = "ADD";


        formContainer.appendChild(inputA);
        formContainer.appendChild(inputB);
        formContainer.appendChild(inputSubmit);

        const linechart = document.getElementById(this.ID);
        linechart.prepend(formContainer)

        formContainer.addEventListener('submit', this.addToLineChart);

    },

    addToLineChart: function (e) {
        e.preventDefault();
        const x_value = e.target.getElementsByTagName("input")[0].value;
        const y_value = e.target.getElementsByTagName("input")[1].value;

        let graph = searchGraph(parseInt(e.target.id))
        graph.clear();
        if (isNaN(parseFloat(x_value)) || isNaN(parseFloat(y_value))) {
            alert("not a number");
            graph.render();
        } else {
            graph.addData(parseFloat(x_value), parseFloat(y_value));
            graph.render();
        }
    },


    clear: function () {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const canvas = document.getElementById(this.ID).getElementsByTagName("div")

        let len = canvas.length
        for (let i = 0; i < len; i++) {
            canvas[0].remove();
        }
    },

    mouseOnBar: function (e) {
        let deleteButton = document.createElement('button');
        deleteButton.style.height = "15px";
        deleteButton.style.width = "100px";
        deleteButton.style.backgroundColor = "transparent";
        deleteButton.style.padding = "0px"
        deleteButton.style.border = "0px"
        deleteButton.id = e.target.id;

        // let image = document.createElement('img');
        // image.style.height = "15px";
        // image.style.width = "15px";
        // image.style.paddingLeft = "0px";
        // image.src = "image/delete.jpg";
        // image.id = e.target.id;

        let image = document.createElement('div');
        image.style.height = "15px";
        image.style.width = "15px";
        image.style.backgroundColor = "red"
        image.id = e.target.id;

        e.target.prepend(deleteButton)
        deleteButton.appendChild(image)
        deleteButton.addEventListener('click', LineChart.prototype.deletePress);
        // image.addEventListener('click', BarChart.prototype.deletePress);

        let parent = e.target.id[0]
        let index = e.target.id[1]

        let result = searchGraph(parseInt(parent))
        let targetdata = result.data[parseInt(index)]

        let display = document.createElement('div');
        display.textContent = "(x: "+targetdata.x +", "+"y: "+ targetdata.y + ")"
        display.style.color = "red"

        deleteButton.appendChild(display)
    },

    mouseLeaveBar: function (e) {
        let buttom = document.getElementsByTagName("button")[0]
        buttom.remove()
    },

    deletePress: function (e) {
        let parent = e.target.id[0]
        let index = e.target.id[1]

        let result = searchGraph(parseInt(parent))
        e.path[2].remove()
        result.data.splice(parseInt(index), 1);
        result.render();
    },
}

global.LineChart = global.LineChart || LineChart
global.PieChart = global.PieChart || PieChart
global.BarChart = global.BarChart || BarChart

})(window, window.document);