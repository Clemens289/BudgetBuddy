 

 function initExpense(){
    calendarHeaderTabs.innerHTML="";
   // navTabContent.innerHTML="";
    var monthList=["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var currentDate=new Date();
    var currentMonth=currentDate.toLocaleString('En', { month: 'long' })

    for(var i=0;i<monthList.length;i++){
        
        var tab=document.createElement("li");
        tab.setAttribute("class", "nav-item");
   
        var anchor=document.createElement("a");
        if(monthList[i]== currentMonth ){
            anchor.setAttribute("class", "nav-link active");
        }else{
            anchor.setAttribute("class", "nav-link");
        }
       
        anchor.setAttribute("id", "item-1-"+i+"-tab");
        anchor.setAttribute("role", "tab");
       // anchor.setAttribute("aria-controls", "item-1-"+i);
        anchor.setAttribute("aria-selected", "true");
        if(i==0){
            anchor.setAttribute("onclick", "getAllExpenses('')");            
        }else{
            anchor.setAttribute("onclick", "createTabBody('"+i+"')");
        }
      
        anchor.setAttribute("data-bs-toggle", "tab");
   
        anchor.innerText=monthList[i];
        tab.appendChild(anchor);
   
        calendarHeaderTabs.appendChild(tab);
    }
      
    createTabBody(currentDate.getUTCMonth()+1);
 }

 function createTabBody(month){
    
    console.log(month);
     tabGetExpensesByMonth(month);
 }

 function tabGetExpensesByMonth(month){
    
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {getExpensesByMonth : "getExpensesByMonth", month : month},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
             updateTable(data);
             
        }
    });
}

function getAllExpenses(searchVal){
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {getAllExpenses : "getAllExpenses", searchVal : searchVal},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
             updateTable(data);
             
        }
    });
} 

function getCategories(){
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {getCategories : "getCategories"},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
             updateCategorySelectField(data);
             
        }
    });
} 

function updateCategorySelectField(data){

    for(var i=0;i<data.length;i++){
        var option=document.createElement("option");
        option.innerHTML=data[i].Category;
        option.value=data[i].Category;
        categoriesdatalist.appendChild(option);
    }
}

function onCreateExpense(){
    var expenseData={};
    expenseData.Date=date.value; 
    expenseData.Expense=expense.value;
    expenseData.Category=category.value;
    expenseData.PaymentType=paymentType.value;
    expenseData.Amount=amount.value;
    expenseData.Currency=currency.value;
    expenseData.Recurrent=recurrent.value;
   if(expenseData.Recurrent== "Monthly"){
       createExpenseMonthly(expenseData);
   }else{
    createExpense(expenseData);
   }
}

function createExpenseMonthly(expenseData){
    var insertMonth=new Date(expenseData.Date);
    var i=insertMonth.getUTCMonth();

    for (;i<12;i++){
        insertMonth.setMonth(i);        
        expenseData.Date=insertMonth.toLocaleDateString('en-CA');
        createExpense(expenseData);
    }
}

function createExpense(expenseData){
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {createExpense : "createExpense", expenseData : expenseData},
        success: function(data){
        data=JSON.parse(data);
            console.log(data);
        updateTable(data);
         if(data.response){
                alert(data.message);
            }else{
                alert(data.message);
            }
        }
    });
}

function deleteExpense(deleteObject){
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {deleteExpense : "deleteExpense", deleteObject : deleteObject},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
            getAllExpenses("");             
        }
    });
}

function onSearch(evt){
    if(evt.value.length>0) {
        getAllExpenses(evt.value);
    }
   

}

function getExpensesByMonth(){
    var month=monthSelect.value;
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {getExpensesByMonth : "getExpensesByMonth", month : month},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
             updateTable(data);
             
        }
    });
}

function getExpensesByCategory(){
    var category=categorySelect.value;
    var month=monthSelect.value;
    if(month==0){
        $.ajax({
            type: "POST",
            url : "DatabaseApi.php",
            dataType: "html",
            data : {getExpensesByCategory : "getExpensesByCategory", category : category},
            success: function(data){
                data=JSON.parse(data);
                console.log(data);
                 updateTable(data);
                 
            }
        });
    }else{
        $.ajax({
            type: "POST",
            url : "DatabaseApi.php",
            dataType: "html",
            data : {getExpensesByCategoryAndMonth : "getExpensesByCategoryAndMonth", category : category, month : month},
            success: function(data){
                data=JSON.parse(data);
                console.log(data);
                 updateTable(data);
                 
            }
        }); 
    }
}

function showAmountOfCategories(){
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {showAmountOfCategories : "showAmountOfCategories"},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
            updateCategoryTable(data);
             
        }
    });
}

function showAmountOfCategoriesPerMonth(){
    var month=monthSelect.value;
    var date=new Date();
    var year=date.getUTCFullYear(date);
    if(month==0){
        showAmountOfCategories();
    }else{
        $.ajax({
            type: "POST",
            url : "DatabaseApi.php",
            dataType: "html",
            data : {showAmountOfCategoriesPerMonth : "showAmountOfCategoriesPerMonth", month : month, year : year},
            success: function(data){
                data=JSON.parse(data);
                console.log(data);
                updateCategoryTable(data);
            }
        });
    }
    
}

function showCategoryDetails(Category){
    
    window.location.href = 'categoryDetail.php?category='+Category;
    console.log(Category);
}

function showCategoryDetailsStatistic(category){
    $.ajax({
        type: "POST",
        url : "DatabaseApi.php",
        dataType: "html",
        data : {showCategoryDetailsStatistic : "showCategoryDetailsStatistic", category : category},
        success: function(data){
            data=JSON.parse(data);
            console.log(data);
            updateCategoryDetailTable(data);
        }
    });
}



function updateTable(displayRows){ 
    var tablehead=document.getElementById("expenseTableHead");
    tablehead.innerText="";
    var total=0;
 
    var tableRowHeader=document.createElement("tr");
    tablehead.appendChild(tableRowHeader);     
    var columns=[{descriptionText:"Date", isRequired:true, propertyName:"Date"},
                {descriptionText:"Expense", isRequired:false, propertyName:"Expense"},
                {descriptionText:"Category", isRequired:false, propertyName:"Category"},
                {descriptionText:"Payment Type", isRequired:false, propertyName:"PaymentType"},
                {descriptionText:"Currency", isRequired:false, propertyName:"Currency"},
                {descriptionText:"Amount", isRequired:false, propertyName:"Amount"},
                {descriptionText:"", isRequired:false, propertyName:"actions"} ];
    for(var i=0;i<columns.length;i++){
        var tableHeader=document.createElement("th");
        var columnLabel=document.createElement("label");
        var displayText=columns[i].descriptionText;
        columnLabel.innerText=displayText;
        tableHeader.appendChild(columnLabel);
        tableRowHeader.appendChild(tableHeader);
    } 



    
    var tablebody=document.getElementById("expenseTableBody");
    tablebody.innerText="";


    for(var i=0;i<displayRows.length;i++){
       var dataRow=document.createElement("tr");
       tablebody.appendChild(dataRow);
       
       var row=displayRows[i];
       total+=Number(row.Amount);

       for(var j=0;j<columns.length;j++){
            var column=columns[j];
            var tableData=document.createElement("td");
            dataRow.appendChild(tableData);
            if(column.propertyName == "actions"){
                var showBtn=document.createElement("button");
                showBtn.innerText="Delete";
                showBtn.setAttribute("onclick","deleteExpense("+row.Id+")")

                tableData.appendChild(showBtn);
                showBtn.className="btn btn-primary btn-sm";

            }else{
                
                var txt=row[column.propertyName];
                if(!txt){
                    txt="";                                       
                } 
                tableData.innerText=txt;
                
            }
           
       }

    }


    tableDataTotal.innerText=total.toFixed(2);
      console.log(total);
} 

//this function will update the Category Page!!
function updateCategoryTable(displayRows){ 
    var tablehead=document.getElementById("expenseTableHead");
    tablehead.innerText="";
    var total=0;
 
    var tableRowHeader=document.createElement("tr");
    tablehead.appendChild(tableRowHeader);     
    var columns=[{descriptionText:"Category", isRequired:false, propertyName:"Category"},
                {descriptionText:"Currency", isRequired:false, propertyName:"Currency"},
                {descriptionText:"Amount", isRequired:false, propertyName:"TotalAmount"},
                {descriptionText:"", isRequired:false, propertyName:"actions"} ];
    for(var i=0;i<columns.length;i++){
        var tableHeader=document.createElement("th");
        var columnLabel=document.createElement("label");
        var displayText=columns[i].descriptionText;
        columnLabel.innerText=displayText;
        tableHeader.appendChild(columnLabel);
        tableRowHeader.appendChild(tableHeader);
    } 



    
    var tablebody=document.getElementById("expenseTableBody");
    tablebody.innerText="";


    for(var i=0;i<displayRows.length;i++){
       var dataRow=document.createElement("tr");
       tablebody.appendChild(dataRow);
       
       var row=displayRows[i];
       total+=Number(row.Amount);

       for(var j=0;j<columns.length;j++){
            var column=columns[j];
            var tableData=document.createElement("td");
            dataRow.appendChild(tableData);
            if(column.propertyName == "actions"){
                var showBtn=document.createElement("button");
                showBtn.innerText="Show";
                showBtn.setAttribute("onclick","showCategoryDetails('"+row.Category+"')")

                tableData.appendChild(showBtn);
                showBtn.className="btn btn-primary btn-sm";

            }else{
                
                var txt=row[column.propertyName];
                if(!txt){
                    txt="";                                       
                } 
                tableData.innerText=txt;
                
            }
           
       }

    }


    tableDataTotal.innerText=total.toFixed(2);
      console.log(total);
} 


function updateCategoryDetailTable(displayRows){ 
    var tablehead=document.getElementById("expenseTableHead");
    tablehead.innerText="";
    var total=0;
 
    var tableRowHeader=document.createElement("tr");
    tablehead.appendChild(tableRowHeader);     
    var columns=[{descriptionText: "January", isRequired:false, propertyName:"January"},
                {descriptionText:"February", isRequired:false, propertyName:"February"},
                {descriptionText:"March", isRequired:false, propertyName:"March"},
                {descriptionText:"April", isRequired:false, propertyName:"April"},
                {descriptionText:"May", isRequired:false, propertyName:"May"},
                {descriptionText:"June", isRequired:false, propertyName:"June"},
                {descriptionText:"July", isRequired:false, propertyName:"July"},
                {descriptionText:"August", isRequired:false, propertyName:"August"},
                {descriptionText:"September", isRequired:false, propertyName:"September"},
                {descriptionText:"October", isRequired:false, propertyName:"October"},
                {descriptionText:"November", isRequired:false, propertyName:"November"},
                {descriptionText:"December", isRequired:false, propertyName:"December"},
                {descriptionText:"", isRequired:false, propertyName:"actions"} ];
    for(var i=0;i<columns.length;i++){
        var tableHeader=document.createElement("th");
            var columnLabel=document.createElement("a");
            var displayText=columns[i].descriptionText;
            columnLabel.innerText=displayText;
            columnLabel.href="statistics.php?month="+displayText;
            tableHeader.appendChild(columnLabel);

       
        tableRowHeader.appendChild(tableHeader);
    } 



    
    var tablebody=document.getElementById("expenseTableBody");
    tablebody.innerText="";


    for(var i=0;i<displayRows.length;i++){
       var dataRow=document.createElement("tr");
       tablebody.appendChild(dataRow);
       
       var row=displayRows[i];
       total+=Number(row.Amount);

       for(var j=0;j<columns.length;j++){
            var column=columns[j];
            var tableData=document.createElement("td");
            dataRow.appendChild(tableData);
            if(column.propertyName == "actions"){
                var showBtn=document.createElement("button");
                showBtn.innerText="Show";
                showBtn.setAttribute("onclick","showCategoryDetails('"+row.Category+"')")

                tableData.appendChild(showBtn);
                showBtn.className="btn btn-primary btn-sm";

            }else{
                
                var txt=row[column.propertyName];
                if(!txt){
                    txt="";                                       
                } 
                tableData.innerText=txt;
                
            }
           
       }

    }


    tableDataTotal.innerText=total.toFixed(2);
      console.log(total);
} 