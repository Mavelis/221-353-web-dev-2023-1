<?php
// Подключаем файл конфигурации
include("config.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Проверка, что пользователь с таким именем не существует
    $checkUserQuery = "SELECT * FROM users WHERE login = ?";
    $stmt = $conn->prepare($checkUserQuery);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Пользователь с таким именем уже существует.";
    } else {
        // Запрос к БД для добавления нового пользователя
        $insertUserQuery = "INSERT INTO users (login, password) VALUES (?, ?)";
        $stmt = $conn->prepare($insertUserQuery);
        $stmt->bind_param("ss", $username, $password);

        if ($stmt->execute()) {
            echo "Регистрация успешно завершена. Вы можете войти.";
            header("Location: authentication.html?login=success");
        } else {
            echo "Ошибка при регистрации: " . $stmt->error;
        }
    }

    // Закрываем подготовленный запрос
    $stmt->close();
}

// Закрываем соединение с БД
$conn->close();
?>
