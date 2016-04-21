<?php
/**
 * Created by PhpStorm.
 * User: rafael
 * Date: 21/04/2016
 * Time: 14:06
 */

namespace CodeDelivery\OAuth2;


use Illuminate\Support\Facades\Auth;

class PasswordVerifier
{
    public function verify($username, $password)
    {
        $credentials = [
            'email'    => $username,
            'password' => $password,
        ];

        if (Auth::once($credentials)) {
            return Auth::user()->id;
        }

        return false;
    }

}