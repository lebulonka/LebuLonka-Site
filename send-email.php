<?php
// Email API Handler for Lebu Lonka Website
// Place this file in your cPanel public_html directory

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', dirname(__FILE__) . '/email-errors.log');

// Headers for CORS and JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['to'], $input['subject'], $input['htmlContent'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

$to = filter_var($input['to'], FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars($input['subject']);
$htmlContent = $input['htmlContent'];

if (!$to) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Email configuration - UPDATE THESE WITH YOUR CREDENTIALS
$fromEmail = 'help@lebulonka.in';
$fromName = 'Lebu Lonka';

// Send email using PHP's mail function (works with cPanel)
$headers = "From: $fromName <$fromEmail>\r\n";
$headers .= "Reply-To: $fromEmail\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Priority: 1 (Highest)\r\n";
$headers .= "X-MSMail-Priority: High\r\n";

// Send the email
if (mail($to, $subject, $htmlContent, $headers)) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully',
        'to' => $to
    ]);
    
    // Log successful email
    error_log(date('Y-m-d H:i:s') . " - Email sent to: $to, Subject: $subject\n", 3, dirname(__FILE__) . '/email-log.txt');
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send email'
    ]);
    
    // Log failed email
    error_log(date('Y-m-d H:i:s') . " - Failed to send email to: $to\n", 3, dirname(__FILE__) . '/email-log.txt');
}
?>
