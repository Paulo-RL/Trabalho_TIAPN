<?php
class UserOperations {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function addUser($name, $telephone, $email, $password, $status) {
        $stmt = $this->conn->prepare("INSERT INTO users (name, telephone, email, password, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$name, $telephone, $email, $password, $status]);
        return $this->conn->lastInsertId();
    }

    public function getUserByEmailAndPassword($email, $password) {
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
        $stmt->execute([$email, $password]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Additional methods for fetching, updating, and deleting users can be added here
}
?>
