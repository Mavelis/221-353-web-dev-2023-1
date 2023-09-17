<?php
$host = "sql311.infinityfree.com"; 
$username = "if0_35028059"; 
$password = "QpuJ46UyqyNu"; 
$dbname = "if0_35028059_users"; 

// Подключение к БД
$conn = new mysqli($host, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
