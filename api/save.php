<?php
$data = json_decode(file_get_contents("php://input"), true);

file_put_contents("../tree.json", json_encode($data["tree"], JSON_PRETTY_PRINT));
file_put_contents("../status.json", json_encode($data["status"], JSON_PRETTY_PRINT));

echo json_encode(["success" => true]);
?>
