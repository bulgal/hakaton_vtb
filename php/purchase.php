<?php

function getResultPurchase($record, $purchase) {

    $result = getPurchaseStatistic($record['id']);

    $statistic = [];
    foreach ($result as $row) {
        if ($row['category'] == $purchase['category']) {
            $statistic = $row;
            break;
        }
    }

    if (!$statistic) {
        return 0;
    }

    $lastDate = date_create($record['last_date_purchase']);
    $purchaseDate = date_create($purchase['date']);
    $interval = date_diff($lastDate, $purchaseDate);
    $daysAfterLastPurchase = (int) $interval->format('%d');

    $sumExpectation = mathExpectation($purchase['sum'], $statistic['average_sum']);
    $periodExpectation = mathExpectation($daysAfterLastPurchase, $statistic['period_purchase']);

    return round(($sumExpectation + $periodExpectation) / 3, 1);

}

function mathExpectation($value, $reference) {
    $maxResulInPercent = 0.064;

    $departure = floatval((int) $value / (int) $reference * 100);

    if ($departure < 2) {
        return 0;
    }

    $result = log($departure, 2);
    return round($result / $maxResulInPercent);
}