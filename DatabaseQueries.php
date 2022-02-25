<?php
class DatabaseQueries{
	protected $dbConn;	
	public function __construct() {
        $this->getConnected();
    }
    public function getConnected(){
    	$dbName = "budgetbuddy"; 
	    $dbHost = "127.0.0.1";
	    $dbUser = "clemens";
	    $dbPass = "pass123";
        $this->dbConn = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
        $this->dbConn->set_charset("utf8mb4");
		if ($this->dbConn->connect_error) {
		  die("Connection failed: " . $this->dbConn->connect_error);
		}
        return $this->dbConn;
    }

	function getAllExpenses($searchVal){

		$query = "SELECT * FROM `expenses` WHERE Expense like '%".$searchVal."%' or Category like '%".$searchVal."%' order by date DESC";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
	 	while($row = $queryResult->fetch_assoc()){
			array_push($result, $row);
	 	} 
		return  $result;
	} 
  

	
	function createExpense($data){
		 
		$query = "INSERT INTO `expenses`(`Date`, `Expense`, `Category`, `PaymentType`, `Amount`, `Currency`, `Recurrent`) VALUES ('".$data['Date']."', '".$data['Expense']."', '".$data['Category']."', '".$data['PaymentType']."', '".$data['Amount']."', '".$data['Currency']."', '".$data['Recurrent']."')";
 		$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
		$result['response']=$queryResult;	
		$result['query']=$query;
		if($queryResult == true){
			$result['message']="Successfully Created";
	
		}else{
			$result['message']="Something went wrong ! Error : ".$queryResult ;
	
		}
			return $result;
	}

	function deleteExpense($data){
		 
		$query ="DELETE FROM `expenses` WHERE Id='".$data."' ";
		$queryResult= mysqli_query($this->getConnected(), $query);

		$result = array();
	 	$result['response']=$queryResult;
		return  $result;
	}
	

	function getExpensesByMonth($searchVal){

		$query = "SELECT * FROM `expenses` WHERE MONTH(Date) = $searchVal AND YEAR(Date) = 2022 order by date DESC";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
	 	while($row = $queryResult->fetch_assoc()){
			array_push($result, $row);
	 	} 
		return  $result;
	} 

	function getExpensesByCategoryAndMonth($searchVal, $month){
		$query = "SELECT * FROM `expenses` WHERE Category like '%".$searchVal."%' and MONTH(Date) = $month AND YEAR(Date) = 2022 order by date DESC";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
	 	while($row = $queryResult->fetch_assoc()){
			array_push($result, $row);
	 	} 
		return  $result;
	}

	function getExpensesByCategory($searchVal){
		$query = "SELECT * FROM `expenses` WHERE Category like '%".$searchVal."%' order by date DESC";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
	 	while($row = $queryResult->fetch_assoc()){
			array_push($result, $row);
	 	} 
		return  $result;
	}

	function getCategories(){
		$query = "SELECT DISTINCT Category from expenses order by Category asc";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
	 	while($row = $queryResult->fetch_assoc()){
			array_push($result, $row);
	 	} 
		return  $result;
	}

	function showAmountOfCategories(){
		$query = "SELECT Category, SUM(Amount) AS TotalAmount, Currency FROM expenses group by Category order by Category asc";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
	 	while($row = $queryResult->fetch_assoc()){
			array_push($result, $row);
	 	} 
		return  $result;
	}

	function showAmountOfCategoriesPerMonth($month, $year){
		$query = "SELECT Category, SUM(Amount) AS TotalAmount, Currency FROM expenses where Month(Date)= $month and Year(Date)= $year group by Category";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
	 	while($row = $queryResult->fetch_assoc()){
			array_push($result, $row);
	 	} 
		return  $result;
	}

	function showCategoryDetailsStatistic($Category){
		$query = "SELECT (SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 1) AS January, 
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 2) AS February,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 3) AS March,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 4) AS April,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 5) AS May,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 6) AS June,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 7) AS July,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 8) AS August,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 9) AS September,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 10) AS October,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 11) AS November,
		(SELECT sum(Amount) from Expenses where Category ='".$Category."' and Month(Date) = 12) AS December";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result = array();
	 	while($row = $queryResult->fetch_assoc()){
			array_push($result, $row);
	 	} 
		return  $result;
	}




	function getExpensesForWholeMonth($month, $year){

		$query = "SELECT SUM(Amount) AS 'TotalAmount', Currency FROM `expenses` WHERE Month(Date)=$month and Year(Date)=$year";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result =  $queryResult->fetch_assoc();
		return  $result;
	} 

	
	function getExpensesForAllMonths($year){
		$query = "SELECT (SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 1) AS January, 
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 2) AS February,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 3) AS March,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 4) AS April,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 5) AS May,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 6) AS June,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 7) AS July,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 8) AS August,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 9) AS September,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 10) AS October,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 11) AS November,
		(SELECT sum(Amount) from Expenses where Year(Date) ='".$year."' and Month(Date) = 12) AS December";
	 	$queryResult= mysqli_query($this->getConnected(), $query);
		$result =$queryResult->fetch_assoc();
		return  $result;
	}

} ?>