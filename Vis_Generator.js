//This is the final project for Krisztian Pal for CS 4460.
var data

d3.csv('TransportFatalitiesByYear.csv', function(dataset) {
    data = dataset;
    //This is a test to see if the csv was imported correctly.
    //Should be 1975.
    console.log(data[0].Year);

    //The code below clones a blank plot using clonenode.
    //This is just for positioning for now and the x position
    //of each of the plots is showsn. It should be:
    //10px,   432.5px,   855px

    /*
    var copyElement = document.getElementById("blankPlot");
    var copiedElement = copyElement.cloneNode(true);
    document.body.appendChild(copiedElement);
    copiedElement.style.left = "432.5px"; 
    var copiedElement = copyElement.cloneNode(true);
    document.body.appendChild(copiedElement);
    copiedElement.style.left = "855px";
    */
   
    for (var i = 0; i < data.length; i++ ) {
        createSVG(i);
       
    }


});



var counter = 1;
var yPosition = 250;
var copyElement = document.getElementById("blankPlot");

//This creates a blank plot svg for every year that is in the dataset.
//It will then link to the funciton that creates the actual visualization;
//This is accomplished by copying the blank plot over and over and changing the 
//position to create a grid for the small multiples. 
function createSVG(position) {

    
   
    var copiedElement = copyElement.cloneNode(true);
    copiedElement.id = "plot" + position;
    if(counter == 1) {
        copiedElement.style.left = "10px";
        counter++;
    }
    else if(counter == 2) {
        copiedElement.style.left = "432.5px";
        counter++;
    }
    else if (counter == 3) {
        copiedElement.style.left = "850px";
        counter++;
        
    }
    copiedElement.style.top = yPosition + "px";

    if (counter == 4) {
        counter = 1;
        yPosition += 330;}

    document.body.appendChild(copiedElement);
    createPlot(copiedElement , position);
}

//These are all the variable that will be copied and modified to create the actual donut plot.
var copyInner = document.getElementById("clearCenter");
var copyCar = document.getElementById("carPartition");
var copyPed = document.getElementById("pedPartition");
var copyMotor = document.getElementById("motorPartition");
var copyBicycle = document.getElementById("bicyclePartition");
var copyTruck = document.getElementById("truckPartition");
var copyTitle = document.getElementById("graphTitle");
var copyYear = document.getElementById("largeYear");

var totalAccidents;
var percentageCar;
var percentagePed;
var percentageMotor;
var percentageBicycle;
var percentageTruck;

var copyLegend1 = document.getElementById("legend1");
var copyLegend2 = document.getElementById("legend2");
var copyLegend3 = document.getElementById("legend3");
var copyLegend4 = document.getElementById("legend4");
var copyLegend5 = document.getElementById("legend5");

var copyPercent1 = document.getElementById("percentL1");
var copyPercent2 = document.getElementById("percentL2");
var copyPercent3 = document.getElementById("percentL3");
var copyPercent4 = document.getElementById("percentL4");
var copyPercent5 = document.getElementById("percentL5");
var tempString;
//This creates all the elements of the donut plot.
//This includes the title, year identifier, and the actual plot itself.
function createPlot(svgPlot, position) {
    
    //This calculates the amount of traffic deaths that only include the five categories mentioned
    //earlier.
    totalAccidents = (data[position]["Car_Per_100K"] * 1) + (1 * data[position]["Ped_Per_100K"])
    + (1 * data[position]["Motorcycle_Per_100K"]) + (1 * data[position]["Bicycle_Per_100K"]) 
    + (1 * data[position]["Trucks_Per_100K"]);



    //This creates the legend in each individual graph.
    var copiedLegend1= copyLegend1.cloneNode(true);
    var copiedLegend2= copyLegend2.cloneNode(true);
    var copiedLegend3= copyLegend3.cloneNode(true);
    var copiedLegend4= copyLegend4.cloneNode(true);
    var copiedLegend5= copyLegend5.cloneNode(true);

    svgPlot.appendChild(copiedLegend1);
    svgPlot.appendChild(copiedLegend2);
    svgPlot.appendChild(copiedLegend3);
    svgPlot.appendChild(copiedLegend4);
    svgPlot.appendChild(copiedLegend5);

    var copiedPercent1 = copyPercent1.cloneNode(true);
    var copiedPercent2 = copyPercent2.cloneNode(true);
    var copiedPercent3 = copyPercent3.cloneNode(true);
    var copiedPercent4 = copyPercent4.cloneNode(true);
    var copiedPercent5 = copyPercent5.cloneNode(true);

    //This copies and sets the individual graph titel for each year.
    var copiedTitle = copyTitle.cloneNode(true);
    copiedTitle.textContent = "Transportation Fatality Distribution For "
    + data[position].Year;
    svgPlot.appendChild(copiedTitle);

    //This copies and sets the large year identifier at the bottom of each graph.
    var copiedYear = copyYear.cloneNode(true);
    copiedYear.textContent = data[position].Year;
    svgPlot.appendChild(copiedYear);


    //Make sure to use 177.5 as the overall percentage.

    //This creates the segemnt of the percentage of car deaths.
    percentageCar = (data[position]["Car_Per_100K"] * 1)/totalAccidents;
    var copiedCar = copyCar.cloneNode(true);
    
    tempString = String(percentageCar * 100).slice(0, 2);
    copiedPercent1.textContent = tempString + "%";
    svgPlot.appendChild(copiedPercent1);

    percentageCar *= 177.5;
    copiedCar.style.strokeDasharray = percentageCar + "% 1000%";
    

    svgPlot.appendChild(copiedCar);





    //This creates the segment for the pedestrian deaths in the donut plot.
    percentagePed = (data[position]["Ped_Per_100K"] * 1)/totalAccidents;
    var copiedPed = copyPed.cloneNode(true);

    tempString = String(percentagePed * 100).slice(0, 2);
    copiedPercent2.textContent = tempString + "%";
    svgPlot.appendChild(copiedPercent2);

    percentagePed *= 177.5;
    copiedPed.style.strokeDasharray = "0% " + percentageCar + "% " + percentagePed +"% 1000%";

    svgPlot.appendChild(copiedPed);





    //This creates the segment for the motorcycle deaths in the donut plot.
    percentageMotor = (data[position]["Motorcycle_Per_100K"] * 1)/totalAccidents;
    var copiedMotor = copyMotor.cloneNode(true);

    tempString = String(percentageMotor * 100).slice(0, 2);
    if (tempString.charAt(1) == ".") {
        tempString = String(percentageMotor * 100).slice(0, 1);
    }
    copiedPercent3.textContent = tempString + "%";
    svgPlot.appendChild(copiedPercent3);

    percentageMotor *= 177.5;
    copiedMotor.style.strokeDasharray = "0% " + ((percentageCar*1) + (percentagePed*1)) + "% " 
    + percentageMotor +"% 1000%";

    svgPlot.appendChild(copiedMotor);




    //This creates the segment for the bicycle deaths in the donut plot.
    percentageBicycle = (data[position]["Bicycle_Per_100K"] * 1)/totalAccidents;
    var copiedBicycle = copyBicycle.cloneNode(true);

    tempString = String(percentageBicycle * 100).slice(0, 2);
    if (tempString.charAt(1) == ".") {
        tempString = String(percentageBicycle * 100).slice(0, 1);
    }
    copiedPercent4.textContent = tempString + "%";
    svgPlot.appendChild(copiedPercent4);

    percentageBicycle *= 177.5;
    copiedBicycle.style.strokeDasharray = "0% " + ((percentageCar*1) + (percentagePed*1)
    + (percentageMotor*1)) + "% " + percentageBicycle +"% 1000%";

    svgPlot.appendChild(copiedBicycle);




    //This creates the segment for the truck deaths in the donut plot.
    percentageTruck = (data[position]["Trucks_Per_100K"] * 1)/totalAccidents;
    var copiedTruck = copyTruck.cloneNode(true);

    tempString = String(percentageTruck * 100).slice(0, 2);
    if (tempString.charAt(1) == ".") {
        tempString = String(percentageTruck * 100).slice(0, 1);
    }
    copiedPercent5.textContent = tempString + "%";
    svgPlot.appendChild(copiedPercent5);

    percentageTruck *= 177.5;
    copiedTruck.style.strokeDasharray = "0% " + ((percentageCar*1) + (percentagePed*1)
    + (percentageMotor*1) + (percentageBicycle*1)) + "% " + percentageTruck +"% 1000%";

    svgPlot.appendChild(copiedTruck);


}

var textInput;
var tempNum;
var tempNum2;
var numArr = [];
var numArr2 = [];
var secondCounter = 1;
var secondY = 250;
var testBool = 0;


//This filters the data.
//There are 3 main ways to filter it:
//It selects only 1 year to view
//It selects a range of years to view
//It selects specific years to view
//After each filter it must be reset

function filterData() {
    //This removes unneccessary elements that will interfere with the filtering. 
    document.getElementById('blankPlot').remove();
    document.getElementById('mainPlot').remove();

    //This gets the text input from the text box.
    textInput = document.getElementById('textInput').value;
    document.getElementById('textInput').value = "";

    //This first section filters for 1 specific year.
    if(textInput.length == 4) {
        for(var i = 0; i < data.length; i++) {
            if(textInput != data[i].Year) {
               document.getElementById("plot" + i).remove();
            }
            else {
                document.getElementById("plot" + i).style.left = "10px";
                document.getElementById("plot" + i).style.top = "250px";

            }
        }
    }
    //This section filters for a range of years.
    //For example 1999-2002 will display the years between 1999 and 2002 including
    //1999 and 2002 as well.
    else if (textInput.charAt(4) == "-") {
        tempNum = Number(textInput.slice(0, 4));
        tempNum2 = Number(textInput.slice(5, 9));
        for(var i = tempNum; i <= tempNum2; i++) {
            numArr.push(i);
        }
        
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < numArr.length; j++) {
                if(numArr[j] == data[i].Year) {
                    testBool = 1;
                }
            }
            if(testBool == 0) {
                document.getElementById("plot" + i).remove();
            }
            else {
                testBool = 0;
                if(secondCounter == 1) {
                    document.getElementById("plot" + i).style.left = "10px"
                    document.getElementById("plot" + i).style.top = secondY +"px";
                    secondCounter++;
                }
                else if(secondCounter == 2) {
                    document.getElementById("plot" + i).style.left = "432.5px"
                    document.getElementById("plot" + i).style.top = secondY +"px";
                    secondCounter++;
                }
                else if(secondCounter == 3) {
                    document.getElementById("plot" + i).style.left = "850x"
                    document.getElementById("plot" + i).style.top = secondY +"px";
                    secondY += 330;
                    secondCounter = 1;
                }
            }
        }
    }

    //This will filter by the exact years specified/
    //For example, if the input is 1999,2000,2004
    //then those three years will be displayed.
    else if (textInput.charAt(4) == ",") {
        secondCounter = 1;
        secondY = 250;
        testBool = 0;
        for(var i = 4; i < textInput.length + 2; i += 5) {
            numArr2.push(Number(textInput.slice((i-4), i)) * 1);
        }
        numArr2.sort(function(i, j) {
            return i - j;
        });

        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < numArr2.length; j++) {
                if(numArr2[j] == data[i].Year) {
                    testBool = 1;
                }
            }

            if(testBool == 0) {
                document.getElementById("plot" + i).remove();
            }
            else {
                testBool = 0;
                if(secondCounter == 1) {
                    document.getElementById("plot" + i).style.left = "10px"
                    document.getElementById("plot" + i).style.top = secondY +"px";
                    secondCounter++;
                }
                else if(secondCounter == 2) {
                    document.getElementById("plot" + i).style.left = "432.5px"
                    document.getElementById("plot" + i).style.top = secondY +"px";
                    secondCounter++;
                }
                else if(secondCounter == 3) {
                    document.getElementById("plot" + i).style.left = "850x"
                    document.getElementById("plot" + i).style.top = secondY +"px";
                    secondY += 330;
                    secondCounter = 1;
                }
            }
        }


    }
}

function resetData() {
    location.reload();
}