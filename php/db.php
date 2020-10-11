<?php

$link = mysqli_connect('127.0.0.1', 'root', '123456', 'users_verification');

function insertUser($id, $hashFingerprint, $geolocation){
    global $link;
    $ins = "INSERT INTO user(id, desktop_fingerprint, geolocation) VALUES ('$id', '$hashFingerprint', '$geolocation')";
    $resultQueryInsert = mysqli_query($link, $ins);

    $record = getRecordById($id);
    fillPurchaseForUser($record['id']);

    return $resultQueryInsert;
}

function getRecordById($id){
    global $link;
    $query = "SELECT * FROM user where id = '$id'";
    $resultQuery = mysqli_query($link, $query);
    return mysqli_fetch_assoc($resultQuery);

}

function updateUser($id, $fingerprint, $geolocation) {
    global $link;
    $upd = "UPDATE user SET `desktop_fingerprint` = '$fingerprint', `geolocation` = '$geolocation'  WHERE id = '$id'";
    $resultQueryUpdate = mysqli_query($link, $upd);
    return true;
}

function getPurchaseStatistic($id) {
    global $link;
    $query = "SELECT c.category as category, p.period_purchase as period_purchase, p.average_sum as average_sum, p.last_date_purchase as last_date_purchase
    FROM purchase_statistic as p JOIN purchase_category as c ON c.id = p.category where p.user_id = '$id'";
    //запрос пиздарики какие - то
    $resultQuery = mysqli_query($link, $query);
    //resultQuery возвращает false

    return mysqli_fetch_all($resultQuery, MYSQLI_ASSOC);
    }

function checkPurchaseCategory() {
    global $link;
    $query = "SELECT * FROM purchase_category;";
    $resultQuery = mysqli_query($link, $query);
    return mysqli_fetch_assoc($resultQuery);
}

function insertPurchaseCategory() {
    global $link;
    $insCat = "INSERT INTO purchase_category(`id`, `category`)
    VALUES
    (1, 'Бытовая техника'),
    (2, 'Одежда'),
    (3, 'Мебель и товары для дома'),
    (4, 'Продукты питания'),
    (5, 'Автозапчасти');";
    $resultQueryInsert = mysqli_query($link, $insCat);
    //resultQueryInsert вызывается?
}

function fillPurchaseForUser($userId) {
    if (!checkPurchaseCategory()) {
        insertPurchaseCategory();
    }
    $categories = [
        '1' => 1,  //бытовая техника
        '2' => 1, //одежда
        '3' => 1,  //Мебель
        '4' => 1, //продукты
        '5' => 1,   //автозапчасти
    ];

    foreach ($categories as $category => $count) {
        if ($category == '1') {
            $minSum = 2000;
            $maxSum = 100000;
            $period = rand(30, 180);
        } elseif($category == '2') {
            $minSum = 200;
            $maxSum = 7000;
            $period = rand(15, 120);
        } elseif($category == '3') {
            $minSum = 1000;
            $maxSum = 20000;
            $period = rand(60, 210);
        } elseif($category == '4') {
            $minSum = 50;
            $maxSum = 1000;
            $period = rand(1, 5);
        } elseif($category == '5') {
            $minSum = 400;
            $maxSum = 15000;
            $period = rand(45, 190);
        }

        for ($i = 0; $i < $count; $i++) {
            $sum = rand($minSum, $maxSum);
            $mounth = rand(1, 12);
            if (count($mounth) < 2 ) {
                $mounth = "0$mounth";
            }
            $day = rand(1, 12);
            if (count($day) < 2 ) {
                $day = "0$day";
            }
            $date = "2020-$mounth-$day";
            insertPurchase($userId, $category, $period, $sum, $date);
        }

    }

}

function insertPurchase($userId, $category, $period, $sum, $date) {
    global $link;
    $insPur = "INSERT INTO purchase_statistic(`user_id`, `category`, `period_purchase`, `average_sum`, `last_date_purchase`)
    VALUES
    ('$userId', $category, $period, $sum, '$date');";
    $resultQueryInsert = mysqli_query($link, $insPur);
}