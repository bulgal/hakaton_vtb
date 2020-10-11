<?php
function getResultFingerprint($hashFingerprint, $reference) {

    if ($hashFingerprint == $reference) {
        return 1;
    } else {
        return 0;
    }
}

function getHashedFingerprint($userData) {
    $fingerprint = $userData['GPUDriver'] . $userData['hardwareConcurrency'] . $userData['language'] . $userData['platform'] . $userData['timezoneOffset'] . $userData['userAgent'] . $userData['extenstions'];

    return getSaltedHash($fingerprint);
}