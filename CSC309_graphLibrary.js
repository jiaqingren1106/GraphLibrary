"use strict";
let graphID = 0;


function BarChart() {
    const body = document.querySelector('body')

    this.ID = graphID;
    graphID++;
    this.chart = null;
    this.data = []


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

}

BarChart.prototype = {

    addData: function(amount, category) {
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
            let data = {
                category: category,
                number: amount
            }
            this.data.push(data);
        }
    },

    render: function() {
        const barChart = document.getElementById(this.ID).getElementsByClassName("DataRow")[0];
        let ratio = this.ratio();
        for (let i = 0; i < this.data.length; i++) {
            const columnBar = document.createElement('td');
            const content = document.createElement('div');
            content.style.height = String(this.data[i].number * ratio) + "px";
            content.style.marginRight = "10px"
            content.style.backgroundColor = 'aqua';
            content.style.border = "1px solid black";
            columnBar.appendChild(content);
            barChart.appendChild(columnBar);
        }
    },

    max: function() {
        let max = 0

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].number > max) {
                max = this.data[i].number;
            }
        }

        return max;
    },

    ratio: function() {
        const max = this.max();
        const tableHeight = parseInt(document.getElementById(this.ID).style.height, 10);

        let ratio = 1;
        ratio = (tableHeight - 10) / max - 0.1;
        return ratio;
    },
}







function PieChart() {
    this.ID = graphID;
    graphID++;
    this.chart = null;
    this.data = [];
    this.radius = null;
    this.title = null;
    this.height = null;
    this.width = null;

    const body = document.querySelector('body')

    const container = document.createElement('div');
    container.className = 'PieChartContainer';
    container.id = this.ID;
    container.style = 'height: 400px;';

    const PieChart = document.createElement('canvas');
    PieChart.className = 'PieChart';
    PieChart.id = this.ID;

    const graphTitle = document.createElement('div');
    graphTitle.className = 'graphTitle';
    graphTitle.id = this.ID;

    container.appendChild(graphTitle);
    container.appendChild(PieChart);
    body.appendChild(container);

    this.chart = container;

}

PieChart.prototype = {

    addData: function(amount, category) {
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
            let data = {
                category: category,
                number: amount
            }
            this.data.push(data);
        }
    },

    render: function() {
        let sortedData = this.toRatio(this.data);
        const PieChart = document.getElementById(this.ID).getElementsByClassName("PieChart")[0].getContext("2d");

        let position = 0;
        for (let i = 0; i < this.data.length; i++) {
            PieChart.fillStyle = '#ff0000';
            PieChart.beginPath();
            let degree = sortedData[i].number;
            PieChart.moveTo(150, 75);
            PieChart.arc(150, 75, 50, position, position + degree);
            PieChart.closePath();
            PieChart.stroke();
            position = position + degree;
        }
    },

    sum: function() {
        let sum = 0

        for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i].number;
        }

        return sum;
    },

    toRatio: function() {
        const sum = this.sum();

        let data = this.data.map((value) => { return { category: value.category, number: value.number / sum * 2 * Math.PI } });
        return data;
    },
}







function LineChart() {
    this.ID = graphID;
    graphID++;
    this.chart = null;
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

    const graphTitle = document.createElement('div');
    graphTitle.className = 'graphTitle';
    graphTitle.id = this.ID;

    container.appendChild(graphTitle);
    container.appendChild(lineChart);
    body.appendChild(container);

    this.chart = container;
}

LineChart.prototype = {

    addData: function(x_value, y_value) {
        let i = 0;
        let duplicate = false;
        for (i = 0; i < this.data.length; i++) {
            if ((this.data[i].x === x_value) && (this.data[i].y === y_value) || (this.data[i].x === x_value)) {
                duplicate = true;
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

    render: function() {
        let sortedData = this.sort();
        const lineChart = document.getElementById(this.ID).getElementsByClassName("lineChart")[0].getContext("2d");
        let ratio_x = this.ratio().ratio_x;
        let ratio_y = this.ratio().ratio_y;

        for (let i = 0; i < this.data.length - 1; i++) {
            const canvasHeight = parseInt(document.getElementById(this.ID).getElementsByClassName("lineChart")[0].height, 10);

            let x = sortedData[i].x * ratio_x;
            let y = sortedData[i].y * ratio_y;

            let xNext = sortedData[i + 1].x * ratio_x;
            let yNext = sortedData[i + 1].y * ratio_y;

            lineChart.moveTo(x, canvasHeight - y);
            lineChart.strokeStyle = 'aqua';
            lineChart.lineWidth = 2;
            lineChart.lineTo(xNext, canvasHeight - yNext);
            lineChart.stroke();
        }
    },

    sort: function() {
        return this.data.sort(function(a, b) { return a.x - b.x });
    },

    max_X_value: function() {
        let max = 0

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].x > max) {
                max = this.data[i].x;
            }
        }

        return max;
    },

    max_Y_value: function() {
        let max = 0

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].y > max) {
                max = this.data[i].y;
            }
        }

        return max;
    },

    ratio: function() {
        const max_x = this.max_X_value();
        const max_y = this.max_Y_value();

        const canvasHeight = parseInt(document.getElementById(this.ID).getElementsByClassName("lineChart")[0].height, 10);
        const canvasWidth = parseInt(document.getElementById(this.ID).getElementsByClassName("lineChart")[0].width, 10);


        let ratio_x = (canvasWidth - 10) / max_x;
        let ratio_y = (canvasHeight - 10) / max_y;

        return {
            ratio_x: ratio_x,
            ratio_y: ratio_y
        };
    },
}