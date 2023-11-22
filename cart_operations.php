<?php
header('Content-Type: application/json');

$servername = "your_server";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents("php://input"), true);

    if (isset($postData['action'])) {
        switch ($postData['action']) {
            case 'addItemToCart':
                handleAddItemToCart($conn, $postData['userId'], $postData['itemId']);
                break;
            case 'removeItemFromCart':
                handleRemoveItemFromCart($conn, $postData['userId'], $postData['itemId']);
                break;
        }
    }
}

function handleAddItemToCart($conn, $userId, $itemId) {
    $sql = "INSERT INTO user_cart (user_id, item_id) VALUES ($userId, $itemId)";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

function handleRemoveItemFromCart($conn, $userId, $itemId) {
    $sql = "DELETE FROM user_cart WHERE user_id = $userId AND item_id = $itemId";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

$conn->close();
?>
