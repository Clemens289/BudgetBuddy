function actualizeMonth(){
    const date = new Date(); 
    const month = date.toLocaleString('EN', { month: 'long' });
    console.log(month);
    headerMonth.innerText=month;
}

function getExpensesForWholeMonth(month, year){
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {getExpensesForWholeMonth : "getExpensesForWholeMonth", month : month, year : year},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
            monthlyExpense.innerText=data.Currency+" "+data.TotalAmount;             
        }
    });
}

function getExpensesForAllMonths(year){
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {getExpensesForAllMonths : "getExpensesForAllMonths", year : year},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
            updateChart(data);             
        }
    });
}


function updateChart(data){
    var result=
    {
        "type": "line",
        "data": {
            "labels": Object.keys(data),
            "datasets": [{
                "label": "Expenses",
                "fill": true,
                "data": Object.values(data),
                "backgroundColor": "rgba(78, 115, 223, 0.05)",
                "borderColor": "rgba(78, 115, 223, 1)"
            }]
        },
        "options": {
            "maintainAspectRatio": false,
            "legend": {
                "display": false,
                "labels": {
                    "fontStyle": "normal"
                }
            },
            "title": {
                "fontStyle": "normal"
            },
            "scales": {
                "xAxes": [{
                    "gridLines": {
                        "color": "rgb(234, 236, 244)",
                        "zeroLineColor": "rgb(234, 236, 244)",
                        "drawBorder": false,
                        "drawTicks": false,
                        "borderDash": ["2"],
                        "zeroLineBorderDash": ["2"],
                        "drawOnChartArea": false
                    },
                    "ticks": {
                        "fontColor": "#858796",
                        "fontStyle": "normal",
                        "padding": 20
                    }
                }],
                "yAxes": [{
                    "gridLines": {
                        "color": "rgb(234, 236, 244)",
                        "zeroLineColor": "rgb(234, 236, 244)",
                        "drawBorder": false,
                        "drawTicks": false,
                        "borderDash": ["2"],
                        "zeroLineBorderDash": ["2"]
                    },
                    "ticks": {
                        "fontColor": "#858796",
                        "fontStyle": "normal",
                        "padding": 20
                    }
                }]
            }
        }
    };
    
    monthlyChartLine.setAttribute("data-bss-chart", JSON.stringify(result));
    var charts = document.querySelectorAll('[data-bss-chart]');

	for (var chart of charts) {
		chart.chart = new Chart(chart, JSON.parse(chart.dataset.bssChart));
	}
}

function showAmountOfCategoriesPerMonth(date,year){
    var month=date.getUTCMonth()+1;    
    doughnutHeader.innerHTML=date.toLocaleString('En', { month: 'long' });

    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {showAmountOfCategoriesPerMonth : "showAmountOfCategoriesPerMonth", month : month, year : year},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);  
            updateDoughnut(data);           
        }
    });
}

function updateDoughnut(data){
    var categoryList=data.map(a => a.Category);
    var colorList=[];
    var borderColorList=[];

    for(var i=0;i<categoryList.length;i++){
        var color="#" + ((1<<24)*Math.random() | 0).toString(16);
        colorList.push(color);
    }
    for(var i=0;i<categoryList.length;i++){
        
        borderColorList.push("#ffffff");
    }
    
    var result=
    {
        "type": "doughnut",
        "data": {
            "labels": categoryList,
            "datasets": [{
                "label": "",
                "backgroundColor": colorList,
                "borderColor": borderColorList,
                "data": data.map(a => a.TotalAmount)
            }]
        },
        "options": {
            "maintainAspectRatio": false,
            "legend": {
                "display": false,
                "labels": {
                    "fontStyle": "normal"
                }
            },
            "title": {
                "fontStyle": "normal"
            }
        }
    };
    chartDoughnut.setAttribute("data-bss-chart", JSON.stringify(result));
    var charts = document.querySelectorAll('[data-bss-chart]');

	for (var chart of charts) {
		chart.chart = new Chart(chart, JSON.parse(chart.dataset.bssChart));
	}
    doughnutChartLegend.innerHTML="";

    for(var i=0;i<categoryList.length;i++){
        var legend=document.createElement("span");
    legend.setAttribute("class", "me-2");
    var circle=document.createElement("i");
    circle.setAttribute("class", "fas fa-circle");
    circle.setAttribute("style", "color:"+colorList[i]);
    var circleLable=document.createElement("label");
    circleLable.innerText=categoryList[i];
    legend.appendChild(circle);
    legend.appendChild(circleLable);
    doughnutChartLegend.appendChild(legend);

    }
}