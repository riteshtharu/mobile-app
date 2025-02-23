<?php
require 'connect.php'; // Include the database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $username = $_POST['txt'];
    $email = $_POST['email'];
    $password = password_hash($_POST['pswd'], PASSWORD_BCRYPT); // Hash the password

    try {
        // Check if the email already exists
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user) {
            // If email already exists, show an error message
            echo "This email is already associated with an account.";
        } else {
            // If email does not exist, insert the new user
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
            if ($stmt->execute([$username, $email, $password])) {
                echo "Signup successful!";
            } else {
                echo "Signup failed!";
            }
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>