<?php

include 'service.php';
include 'db.php';
include 'fingerprint.php';
include 'purchase.php';
include 'geo.php';


$request = $_SERVER['REQUEST_URI'];

$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, TRUE); //convert JSON into array

$criteria = [
    'fingerprint' => [
        'weight' => 10,
    ],
    'country' => [
        'weight' => 9,
    ],
    'purchase' => [
        'weight' => 4,
    ]
    ];



if ($request == '/php/api.php/payment') {
    // $criteria = $body['criteria'];

    $userData = $body['data'];
    $ip = $body['data']['ip'];
    $purchase = $body['purchase'];
    $cardInfo = $body['card'];


    $id = getHashedId($cardInfo['cardKey'], $cardInfo['dateEnd'], $cardInfo['cvv']);

    $record = getRecordById($id);
    $country = getCountry($ip);

    $hashedFingerprint = getHashedFingerprint($userData);

    $fingerprintResult = getResultFingerprint($hashedFingerprint, $record['desktop_fingerprint']);
    $geoResult = getResultGeo($country, $record['geolocation']);
    $purchaseResult = getResultPurchase($record, $purchase);


    $weightedArithmeticMean = ($criteria['fingerprint']['weight'] * $fingerprintResult + $criteria['country']['weight'] * $geoResult + $criteria['purchase']['weight'] * $purchaseResult / 100) / 3;
    $highestMean = 8;
    $resultInPercent = round($weightedArithmeticMean / $highestMean * 100, 1);

    $data = [
        'fingerprint' => [
            'status' => $fingerprintResult ? 'positive' : 'negative',
            'value' => $hashedFingerprint
        ],
        'country' => [
            'status' => $geoResult ? 'positive' : 'negative',
            'value' => $country
        ],
        'purchase' => [
            'category' => $purchase['category'],
            'sum' => $purchase['sum'],
            'date' => $purchase['date'],
            'percent' => $purchaseResult
        ],
        'formula' => [
            'criteria' => [
                'fingerprint' => [
                    'weight' => $criteria['fingerprint']['weight'],
                    'result' => $fingerprintResult ?: 0
                ],
                'country' => [
                    'weight' => $criteria['country']['weight'],
                    'result' => $geoResult ?: 0
                ],
                'purchase' => [
                    'weight' => $criteria['purchase']['weight'],
                    'result' => $purchaseResult ?: 0
                ]
            ],
            'result' => [
                'need' => 80,
                'value' => $resultInPercent,
                'status' => $resultInPercent > 80 ? 'positive' : 'negative'
            ]
        ]
    ];

    header('Content-Type: application/json');
    echo json_encode($data);
} elseif ($request == '/php/api.php/init') {
    $userData = $body['data'];
    $cardInfo = $body['card'];

    $hashedId = getHashedId($cardInfo['cardKey'], $cardInfo['dateEnd'], $cardInfo['cvv']);

    $country = getCountry($body['data']['ip']);
    $record = getRecordById($hashedId);
    $hashedFingerprint = getHashedFingerprint($userData);
    //добавил отпечаток
    //вардампит на серваке хуйню, на постмене чё надо
    if (!$record) {
        insertUser($hashedId, $hashedFingerprint, $country);
    } else {
        updateUser($hashedId, $hashedFingerprint, $country);
    }


    $data = [
        'countries' =>  [
            ['label' => $country, 'value' => $body['data']['ip']],
            ['label' => 'Казахстан', 'value' => '2.72.34.211' ],
            ['label' => 'Китай', 'value' => '122.51.232.157' ],
            ['label' => 'США', 'value' => '173.252.83.116' ]
        ],
        'formula' => [
            'criteria' => [
                'fingerprint' => [
                    'weight' => $criteria['fingerprint']['weight'],
                    'result' => $fingerprintResult ?: 0
                ],
                'country' => [
                    'weight' => $criteria['country']['weight'],
                    'result' => $geoResult ?: 0
                ],
                'purchase' => [
                    'weight' => $criteria['purchase']['weight'],
                    'result' => $purchaseResult ?: 0
                ]
            ],
            'result' => [
                'need' => 80,
                'value' => $resultInPercent,
                'status' => $resultInPercent > 80 ? 'positive' : 'negative'
            ]
        ]
    ];
    header('Content-Type: application/json');
    echo json_encode($data);

} elseif ($request == '/php/api.php/update') {
    $userData = $body['data'];
    $cardInfo = $body['card'];
    $country = getCountry($body['data']['ip']);

    $id = getHashedId($cardInfo['cardKey'], $cardInfo['dateEnd'], $cardInfo['cvv']);
    $hashedFingerprint = getHashedFingerprint($userData);

    updateUser($id, $hashedFingerprint, $country);

    // апдейт всех полей пользователя
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok']);

} elseif ($request == '/php/api.php/actual') {
    $cardInfo = $body['card'];
    $id = getHashedId($cardInfo['cardKey'], $cardInfo['dateEnd'], $cardInfo['cvv']);

    $record = getRecordById($id);

    $fingerprint = $record['desktop_fingerprint'];
    $country = $record['geolocation'];
    $purchaseStatistic = getPurchaseStatistic($id);
    //purchaseStatistic не массив
    $purchaseHistory = [];
    foreach ($purchaseStatistic as $row) {
        $purchaseHistory[] = [
            'category' => $row['category'],
            'everageDate' => $row['period_purchase'],
            'check' => $row['average_sum'],
            'lastDate' => $row['last_date_purchase']
        ];
    }

    $data = [
        'fingerprint' => $fingerprint,
        'country' => $country,
        'purchaseHistory' => $purchaseHistory
    ];
    header('Content-Type: application/json');
    echo json_encode($data);
}


