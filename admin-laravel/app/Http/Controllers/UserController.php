<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use DateTime;

class UserController extends Controller
{
    public function index()
    {
        $res = User::all();

        $data = array();
        foreach ($res as $key => $val) {
            $data[$key]['name'] = $val->name;
            $data[$key]['email'] = $val->email;
            $data[$key]['last_login'] = isset($val->last_login) ? $this->getLocalTime($val->last_login) : null;
            $data[$key]['last_logout'] = isset($val->last_logout) ? $this->getLocalTime($val->last_logout) : null;
            $data[$key]['duration'] = $this->getDurationHours($val->last_login, $val->last_logout);
        }

        $user_data = array();
        foreach ($res as $key => $val) {
            $user_data[$key] = $val->name;
        }

        $duration_data = array();
        foreach ($res as $key => $val) {
            $duration_data[$key] = $this->getDurationHours($val->last_login, $val->last_logout);
        }

        $collectionData = new \Illuminate\Database\Eloquent\Collection($data);
        $collectionUser = new \Illuminate\Database\Eloquent\Collection($user_data);
        $collectionDuration = new \Illuminate\Database\Eloquent\Collection($duration_data);

        return view("home", ['data' => $collectionData, 'user' => $collectionUser, 'duration' => $collectionDuration]);
    }

    public function getLocalTime($date)
    {
        // Set timezone
        $timezone = 'Asia/Jakarta';
        $format_date = "d M Y H:i:s";

        // Change mongo date to php date
        $newDate = $date->toDateTime();
        $mongoDate = new \MongoDB\BSON\UTCDateTime($newDate);
        $dateTime = $mongoDate->toDateTime()->setTimezone(new \DateTimeZone($timezone))->format($format_date);

        return $dateTime;
    }

    public function getDurationHours($dateBefore, $dateAfter)
    {
        // Date before
        $newDateBefore = isset($dateBefore) ? $dateBefore->toDateTime() : new DateTime();
        $mongoDateBefore = new \MongoDB\BSON\UTCDateTime($newDateBefore);
        $newDateBefore = $mongoDateBefore->toDateTime();

        // Date after
        $newDateAfter = isset($dateAfter) ? $dateAfter->toDateTime() : new DateTime();
        $mongoDateAfter = new \MongoDB\BSON\UTCDateTime($newDateAfter);
        $newDateAfter = $mongoDateAfter->toDateTime();

        // Calculate
        $duration = abs($newDateAfter->getTimestamp() - $newDateBefore->getTimestamp()) / 60;

        return round($duration, 2);
    }
}
