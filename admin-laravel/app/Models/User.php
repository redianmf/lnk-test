<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class User extends Model
{
    protected $connection = 'mongodb';
}
