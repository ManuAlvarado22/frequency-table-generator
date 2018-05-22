class FrequencyTable {
    
    public data: number[];
    public n: number;
    public minValue: number;
    public maxValue: number;

    public constructor(data: number[]) {
        this.data = data;
        this.n = data.length;
        this.minValue = Math.min.apply(null, this.data);
        this.maxValue = Math.max.apply(null, this.data);
    }

    get GetData(): number[] {
        return this.data;
    }

    get GetN(): number {
        return this.n;
    }
    
    get GetMinValue(): number {
        return this.minValue;
    }
    
    get GetMaxValue(): number {
        return this.maxValue;
    }

    public CalculateRange(): number {
        return this.maxValue - this.minValue;
    }

    public CalculateNumberOfClasses(): number {
        return Math.round(1 + (3.3 * Math.log10(this.n)));
    }

    public CalculateClassWidth(): number {
        return Math.round(this.CalculateRange() / this.CalculateNumberOfClasses());
    }

    public GetClassIntervals(): number[][] {

        const classWidth = this.CalculateClassWidth();
        let classIntervals: number[][] = [];
        let currentLowerLimit = this.minValue;

        for (let i: number = 0; i < this.CalculateNumberOfClasses(); i++) {
            classIntervals.push([currentLowerLimit, currentLowerLimit + classWidth]);
            currentLowerLimit = currentLowerLimit + classWidth + 1;
        }

        return classIntervals;

    }

    public GetClassFrequency(classNumber: number): number {

        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {

            const classInterval: number[] = this.GetClassIntervals()[classNumber - 1];

            return this.data.filter((e: number) => 
                e >= classInterval[0] && e <= classInterval[1]
            ).length;

        }

        return null;

    }

    public GetMidPoint(classNumber: number): number {
    
        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {

            const classInterval: number[] = this.GetClassIntervals()[classNumber - 1];

            return (classInterval[0] + classInterval[1]) / 2;

        }

        return null;

    }
    
    public GetMidPoints(): number[] {
    
        let midPoints: number[] = [];

        for (let i: number = 1; i <= this.CalculateNumberOfClasses(); i++) {
            midPoints.push(this.GetMidPoint(i));
        }

        return midPoints;

    }

    public GetFrequencies(): number[] {

        const frequencies: number[] = new Array();

        for (let i: number = 1; i <= this.CalculateNumberOfClasses(); i++) {
            frequencies.push(this.GetClassFrequency(i));
        }

        return frequencies;

    }

    public GetCumulativeFrequencies(): number[] {

        const frequencies: number[] = this.GetFrequencies();
        let accumulator: number = 0;
        let cumulativeFrequencies: number[] = [];

        frequencies.forEach((fi: number) => {
            accumulator += fi;
            cumulativeFrequencies.push(accumulator);
        });

        return cumulativeFrequencies;

    }

    public GetRelativeFrequency(classNumber: number): number {

        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {
            return Math.round((this.GetClassFrequency(classNumber) 
                              / this.n) * 100) / 100;
        }

        return null;

    }

    public GetRelativeFrequencies(): number[] {
        
        let relativePercentageFrequencies: number[] = [];

        for (let i: number = 1; i <= this.CalculateNumberOfClasses(); i++) {
            relativePercentageFrequencies.push(this.GetRelativeFrequency(i));
        }

        return relativePercentageFrequencies;

    }

    public GetRelativePercentageFrequency(classNumber: number): number {

        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {
            return this.GetRelativeFrequency(classNumber) * 100;
        }

        return null;

    }

    public GetRelativePercentageFrequencies(): number[] {

        return this.GetRelativeFrequencies().map((fr: number) => fr * 100);

    }

    public GetCumulativeRelativeFrequencies(): number[] {

        const relativeFrequencies: number[] = this.GetRelativeFrequencies();
        let accumumulator: number = 0;
        let cumulativeRelativeFrequencies: number[] = [];

        relativeFrequencies.forEach((fr: number) => {
            accumumulator += fr;
            cumulativeRelativeFrequencies.push(
                Math.round(accumumulator * 100) / 100
            );
        });

        return cumulativeRelativeFrequencies;

    }

    public GetCumulativeRelativePercentageFrequencies(): number[] {

        return this.GetCumulativeRelativeFrequencies().map((far: number) => 
            far * 100
        );

    }

    public GenerateRow(classNumber: number): number[] {

        if (classNumber > 0 && classNumber <= this.GetClassIntervals().length) {
            
            let row: any[] = [];

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

    public GenerateTable(): number[][] {

        let table: number[][] = [];

        for (let i: number = 1; i <= this.CalculateNumberOfClasses(); i++) {
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


const table: HTMLDivElement = document.querySelector(".table");
const mainRow: HTMLDivElement = document.querySelector(".row");
const input: HTMLTextAreaElement = document.querySelector(".dataset__input");
const button: HTMLButtonElement = document.querySelector(".btn");

button.addEventListener("click", function() {
    const frenquencyTable: FrequencyTable = new FrequencyTable(input.value.split(",").map(e => parseInt(e.trim())));
    
    const testFrequencyTable: number[][] = frenquencyTable.GenerateTable();

    testFrequencyTable.forEach((row: number[]) => {
        const tableRow = document.createElement("div");
        tableRow.setAttribute("class", "row");
        table.appendChild(tableRow);

        row.forEach((col: number) => {
            const tableCol = document.createElement("div");
            tableCol.setAttribute("class", "col");
            tableCol.textContent = col.toString();
            tableRow.appendChild(tableCol);
        });

    });

});