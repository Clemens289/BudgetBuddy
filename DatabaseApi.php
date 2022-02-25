<?php 


require_once("DatabaseQueries.php");
$DBQ= new DatabaseQueries();
 
 


if(isset($_POST['getAllExpenses'])&& isset($_POST['searchVal'])){
	echo json_encode($DBQ->getAllExpenses($_POST['searchVal'])); 
}else if(isset($_POST['getAllExpenses'])){
	echo json_encode($DBQ->getAllExpenses('')); 
}
if(isset($_POST['createExpense'])&& isset($_POST['expenseData']) ){
	echo json_encode($DBQ->createExpense($_POST['expenseData'])); 
}
if(isset($_POST['deleteExpense'])&& isset($_POST['deleteObject']) ){
	echo json_encode($DBQ->deleteExpense($_POST['deleteObject'])); 
}
if(isset($_POST['getExpensesByMonth'])&& isset($_POST['month']) ){
	echo json_encode($DBQ->getExpensesByMonth($_POST['month'])); 
}

if(isset($_POST['getExpensesByCategoryAndMonth'])&& isset($_POST['category'])&& isset($_POST['month']) ){
	echo json_encode($DBQ->getExpensesByCategoryAndMonth($_POST['category'], $_POST['month'])); 
}else if(isset($_POST['getExpensesByCategory'])&& isset($_POST['category']) ){
	echo json_encode($DBQ->getExpensesByCategory($_POST['category'])); 
}


if(isset($_POST['getCategories']) ){
	echo json_encode($DBQ->getCategories()); 
}
if(isset($_POST['showAmountOfCategories']) ){
	echo json_encode($DBQ->showAmountOfCategories()); 
}
if(isset($_POST['showAmountOfCategoriesPerMonth'])&& isset($_POST['month'])&& isset($_POST['year']) ){
	echo json_encode($DBQ->showAmountOfCategoriesPerMonth($_POST['month'], $_POST['year'])); 
}
if(isset($_POST['showCategoryDetailsStatistic'])&& isset($_POST['category']) ){
	echo json_encode($DBQ->showCategoryDetailsStatistic($_POST['category'])); 
}



if(isset($_POST['getExpensesForWholeMonth'])&& isset($_POST['month'])&& isset($_POST['year']) ){
	echo json_encode($DBQ->getExpensesForWholeMonth($_POST['month'], $_POST['year']));
}
if(isset($_POST['getExpensesForAllMonths'])&& isset($_POST['year']) ){
	echo json_encode($DBQ->getExpensesForAllMonths($_POST['year']));
}
?>