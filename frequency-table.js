class FrequencyTable {
    constructor(data) {
        this.data = data;
        this.n = data.length;
        this.minValue = Math.min.apply(null, this.data);
        this.maxValue = Math.max.apply(null, this.data);
    }
    get GetData() {
        return this.data;
    }
    get GetN() {
        return this.n;
    }
    get GetMinValue() {
        return this.minValue;
    }
    get GetMaxValue() {
        return this.maxValue;
    }
    CalculateRange() {
        return this.maxValue - this.minValue;
    }
    CalculateNumberOfClasses() {
        return Math.round(1 + (3.3 * Math.log10(this.n)));
    }
    CalculateClassWidth() {
        return Math.round(this.CalculateRange() / this.CalculateNumberOfClasses());
    }
    GetClassIntervals() {
        const classWidth = this.CalculateClassWidth();
        let classIntervals = [];
        let currentLowerLimit = this.minValue;
        for (let i = 0; i < this.CalculateNumberOfClasses(); i++) {
            classIntervals.push([currentLowerLimit, currentLowerLimit + classWidth]);
            currentLowerLimit = currentLowerLimit + classWidth + 1;
        }
        return classIntervals;
    }
    GetClassFrequency(classNumber) {
        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {
            const classInterval = this.GetClassIntervals()[classNumber - 1];
            return this.data.filter((e) => e >= classInterval[0] && e <= classInterval[1]).length;
        }
        return null;
    }
    GetMidPoint(classNumber) {
        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {
            const classInterval = this.GetClassIntervals()[classNumber - 1];
            return (classInterval[0] + classInterval[1]) / 2;
        }
        return null;
    }
    GetMidPoints() {
        let midPoints = [];
        for (let i = 1; i <= this.CalculateNumberOfClasses(); i++) {
            midPoints.push(this.GetMidPoint(i));
        }
        return midPoints;
    }
    GetFrequencies() {
        const frequencies = new Array();
        for (let i = 1; i <= this.CalculateNumberOfClasses(); i++) {
            frequencies.push(this.GetClassFrequency(i));
        }
        return frequencies;
    }
    GetCumulativeFrequencies() {
        const frequencies = this.GetFrequencies();
        let accumulator = 0;
        let cumulativeFrequencies = [];
        frequencies.forEach((fi) => {
            accumulator += fi;
            cumulativeFrequencies.push(accumulator);
        });
        return cumulativeFrequencies;
    }
    GetRelativeFrequency(classNumber) {
        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {
            return Math.round((this.GetClassFrequency(classNumber)
                / this.n) * 100) / 100;
        }
        return null;
    }
    GetRelativeFrequencies() {
        let relativePercentageFrequencies = [];
        for (let i = 1; i <= this.CalculateNumberOfClasses(); i++) {
            relativePercentageFrequencies.push(this.GetRelativeFrequency(i));
        }
        return relativePercentageFrequencies;
    }
    GetRelativePercentageFrequency(classNumber) {
        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {
            return this.GetRelativeFrequency(classNumber) * 100;
        }
        return null;
    }
    GetRelativePercentageFrequencies() {
        return this.GetRelativeFrequencies().map((fr) => fr * 100);
    }
    GetCumulativeRelativeFrequencies() {
        const relativeFrequencies = this.GetRelativeFrequencies();
        let accumumulator = 0;
        let cumulativeRelativeFrequencies = [];
        relativeFrequencies.forEach((fr) => {
            accumumulator += fr;
            cumulativeRelativeFrequencies.push(Math.round(accumumulator * 100) / 100);
        });
        return cumulativeRelativeFrequencies;
    }
    GetCumulativeRelativePercentageFrequencies() {
        return this.GetCumulativeRelativeFrequencies().map((far) => far * 100);
    }
    GenerateRow(classNumber) {
        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {
            let row = [];
            row.push(classNumber);
            row.push(this.GetClassIntervals()[classNumber - 1]);
            row.push(this.GetFrequencies()[classNumber - 1]);
            row.push(this.GetMidPoints()[classNumber - 1]);
            row.push(this.GetCumulativeFrequencies()[classNumber - 1]);
            row.push(this.GetRelativeFrequencies()[classNumber - 1]);
            row.push(this.GetRelativePercentageFrequencies()[classNumber - 1]);
            row.push(this.GetCumulativeRelativeFrequencies()[classNumber - 1]);
            row.push(this.GetCumulativeRelativePercentageFrequencies()[classNumber - 1]);
            return row;
        }
        return null;
    }
    GenerateTable() {
        let table = [];
        for (let i = 1; i <= this.CalculateNumberOfClasses(); i++) {
            table.push(this.GenerateRow(i));
        }
        return table;
    }
}
// const frenquencyTable: FrequencyTable = new FrequencyTable([3, 35, 6, 13, 31, 25, 13, 10, 22, 12, 9, 19, 14, 26, 35, 29, 24, 33, 20, 21, 34, 25, 30, 28, 26, 30, 26, 21, 23, 7]);
// console.log(frenquencyTable.GetData);
// console.log(frenquencyTable.GetN);
// console.log(frenquencyTable.CalculateNumberOfClasses());
// console.log(frenquencyTable.CalculateClassWidth());
// console.log(frenquencyTable.GetClassIntervals());
// console.log(frenquencyTable.GetClassFrequency(3));
// console.log(frenquencyTable.GetMidPoint(6));
// console.log(frenquencyTable.GetFrequencies());
// console.log(frenquencyTable.GetCumulativeFrequencies());
// console.log(frenquencyTable.GetRelativeFrequency(3));
// console.log(frenquencyTable.GetRelativePercentageFrequencies());
// console.log(frenquencyTable.GetCumulativeRelativeFrequencies());
// console.log(frenquencyTable.GetCumulativeRelativePercentageFrequencies());
// console.log(frenquencyTable.GenerateRow(3));
const table = document.querySelector(".table");
const mainRow = document.querySelector(".row");
const input = document.querySelector(".dataset__input");
const button = document.querySelector(".btn");
button.addEventListener("click", function () {
    const frenquencyTable = new FrequencyTable(input.value.split(",").map(e => parseInt(e.trim())));
    const testFrequencyTable = frenquencyTable.GenerateTable();
    testFrequencyTable.forEach((row) => {
        const tableRow = document.createElement("div");
        tableRow.setAttribute("class", "row");
        table.appendChild(tableRow);
        row.forEach((col) => {
            const tableCol = document.createElement("div");
            tableCol.setAttribute("class", "col");
            tableCol.textContent = col.toString();
            tableRow.appendChild(tableCol);
        });
    });
});
