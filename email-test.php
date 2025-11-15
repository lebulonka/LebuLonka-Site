<?php
/**
 * Email System Diagnostic Test
 * Access this file to test if emails are working: https://yourdomain.com/email-test.php
 */

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$diagnostics = [
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'server_os' => php_uname(),
    'mail_function_enabled' => function_exists('mail') ? 'YES ✓' : 'NO ✗',
    'sendmail_path' => ini_get('sendmail_path'),
    'smtp' => ini_get('SMTP'),
    'smtp_port' => ini_get('smtp_port'),
];

// Test 1: Check if send-email.php exists
$sendEmailPath = dirname(__FILE__) . '/send-email.php';
$diagnostics['send-email.php_exists'] = file_exists($sendEmailPath) ? 'YES ✓' : 'NO ✗';

// Test 2: Try sending a test email
if (function_exists('mail')) {
    $testTo = 'test@example.com';
    $testSubject = 'Lebu Lonka Email Test - ' . date('Y-m-d H:i:s');
    $testBody = '<h2>Email System Test</h2><p>This is a test email from Lebu Lonka</p>';
    $testHeaders = "From: help@lebulonka.in\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n";
    
    $mailResult = @mail($testTo, $testSubject, $testBody, $testHeaders);
    $diagnostics['test_mail_result'] = $mailResult ? 'SUCCESS ✓' : 'FAILED ✗';
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Email System Diagnostic</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
        }
        h1 {
            color: #C41E3A;
        }
        .diagnostic-item {
            padding: 10px;
            margin: 10px 0;
            background: #f9f9f9;
            border-left: 4px solid #228B22;
        }
        .diagnostic-item strong {
            display: inline-block;
            width: 200px;
        }
        .success { color: green; }
        .error { color: red; }
        .warning { color: orange; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📧 Email System Diagnostic</h1>
        
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <strong>⚠️ Security Note:</strong> This file is for testing only. Delete after verification or protect with .htpasswd
        </div>
        
        <h2>Server Configuration:</h2>
        <?php foreach ($diagnostics as $key => $value): ?>
            <div class="diagnostic-item">
                <strong><?php echo htmlspecialchars(str_replace('_', ' ', $key)); ?>:</strong>
                <span class="<?php echo (strpos($value, '✓') !== false) ? 'success' : ((strpos($value, '✗') !== false) ? 'error' : 'warning'); ?>">
                    <?php echo htmlspecialchars($value ?: 'Not configured'); ?>
                </span>
            </div>
        <?php endforeach; ?>
        
        <h2 style="margin-top: 30px;">Next Steps:</h2>
        <ul>
            <li>✓ If "mail_function_enabled" is YES - your server can send emails</li>
            <li>✓ If "send-email.php_exists" is YES - the backend file is in place</li>
            <li>⚠️ Check your cPanel email logs at: cPanel → Mail → Mail Queue</li>
            <li>⚠️ Verify help@lebulonka.in email account exists in cPanel</li>
            <li>⚠️ Check spam filters for emails from dev@lebulonka.in</li>
        </ul>
        
        <h2 style="margin-top: 30px;">Test PHP Mail Function:</h2>
        <form method="POST" style="background: #f9f9f9; padding: 15px; border-radius: 4px;">
            <div style="margin-bottom: 10px;">
                <label>Recipient Email:</label><br>
                <input type="email" name="test_email" value="dev@lebulonka.in" style="width: 100%; padding: 8px;">
            </div>
            <button type="submit" name="send_test" style="background: #C41E3A; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
                Send Test Email
            </button>
        </form>
        
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['send_test'])) {
            $testEmail = filter_var($_POST['test_email'], FILTER_VALIDATE_EMAIL);
            if ($testEmail) {
                $subject = 'Lebu Lonka Test Email - ' . date('Y-m-d H:i:s');
                $body = '<h2>Test Email</h2><p>This is a test email from your Lebu Lonka website.</p>';
                $headers = "From: help@lebulonka.in\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n";
                
                $result = @mail($testEmail, $subject, $body, $headers);
                echo '<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 4px; margin-top: 10px;">';
                if ($result) {
                    echo '✓ <strong>Email sent successfully!</strong><br>Check ' . htmlspecialchars($testEmail) . ' inbox (and spam folder)';
                } else {
                    echo '✗ <strong>Email send failed!</strong><br>Check the diagnostic info above and contact your hosting provider';
                }
                echo '</div>';
            }
        }
        ?>
    </div>
</body>
</html>
