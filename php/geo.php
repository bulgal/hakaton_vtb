<?php
function getResultGeo($country, $reference) {

    if ($country == $reference) {
        return 1;
    } else {
        return 0;
    }
}