<?php
$salt = 'a4p3F9Jr';

function getSaltedHash($string) {
    global $salt;
    return md5(deleteSpace($string) . $salt);
}

function deleteSpace($str) {
    return str_replace(' ', '', $str);
}

function getCountry($ip) {
    switch ($ip) {
        case '2.72.34.211':
            return 'Казахстан';
        case '122.51.232.157':
            return 'Китай';
        case '173.252.83.116':
            return 'США';
        case '127.0.0.1':
            return 'Россия';
    }

    $dadataToken = '4270032f09efc624ef9bc5ef76493d8dc9321bcc';

    $url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=' . $ip;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Accept: application/json',
        "Authorization: Token $dadataToken"
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $res = curl_exec($ch);
    curl_close($ch);
    $data = json_decode($res, JSON_OBJECT_AS_ARRAY);
    $country = isset($data['location']['data']['country']) ? $data['location']['data']['country'] : '';
    if (!$country) {
        return 'Россия';
    }
    // Получение текущей страны по ip
    return $country;

}

function getHashedId($cardKey, $dateEnd, $cvv) {
    $string = $cardKey . $dateEnd . $cvv;
    return getSaltedHash($string);
}

