<?php
// Подключаем файл конфигурации
include("config.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST["login"];
    $password = $_POST["password"];

    
    $sql = "SELECT * FROM users WHERE login = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $login, $password);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows == 1) {
            // Пользователь авторизован
            session_start(); // Запускаем сессию (если не использовали ранее)
            $_SESSION['user'] = $login; // Устанавливаем сессию
            header("Location: index.html?login=success");
            exit(); // Прекращаем выполнение скрипта
        } else {
            echo "Неверный логин или пароль";
        }
    } else {
        echo "Ошибка выполнения запроса: " . $stmt->error;
    }

    // Закрываем подготовленный запрос
    $stmt->close();
}

// Закрываем соединение с БД
$conn->close();
?>
