<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get ('/home', function(){
    return view('welcome');
});

Route::group(['prefix' => 'admin', 'middleware' => 'auth.checkrole:admin', 'as' => 'admin.'], function(){
    Route::group(['prefix' => 'categories', 'as' => 'categories.'], function(){
        Route::get (''           , ['as'   => 'index' , 'uses' => 'CategoriesController@index']);
        Route::get ('create'     , ['as'   => 'create', 'uses' => 'CategoriesController@create']);
        Route::post('store'      , ['as'   => 'store' , 'uses' => 'CategoriesController@store']);
        Route::get ('edit/{id}'  , ['as'   => 'edit'  , 'uses' => 'CategoriesController@edit']);
        Route::post('update/{id}', ['as'   => 'update', 'uses' => 'CategoriesController@update']);
    });

    Route::group(['prefix' => 'products', 'as' => 'products.'], function(){
        Route::get (''            , ['as'   => 'index'  , 'uses' => 'ProductsController@index']);
        Route::get ('create'      , ['as'   => 'create' , 'uses' => 'ProductsController@create']);
        Route::post('store'       , ['as'   => 'store'  , 'uses' => 'ProductsController@store']);
        Route::get ('edit/{id}'   , ['as'   => 'edit'   , 'uses' => 'ProductsController@edit']);
        Route::post('update/{id}' , ['as'   => 'update' , 'uses' => 'ProductsController@update']);
        Route::get ('destroy/{id}', ['as'   => 'destroy', 'uses' => 'ProductsController@destroy']);
    });

    Route::group(['prefix' => 'clients', 'as' => 'clients.'], function(){
        Route::get (''            , ['as'   => 'index'  , 'uses' => 'ClientsController@index']);
        Route::get ('create'      , ['as'   => 'create' , 'uses' => 'ClientsController@create']);
        Route::post('store'       , ['as'   => 'store'  , 'uses' => 'ClientsController@store']);
        Route::get ('edit/{id}'   , ['as'   => 'edit'   , 'uses' => 'ClientsController@edit']);
        Route::post('update/{id}' , ['as'   => 'update' , 'uses' => 'ClientsController@update']);
    });

    Route::group(['prefix' => 'orders', 'as' => 'orders.'], function(){
        Route::get (''            , ['as'   => 'index'  , 'uses' => 'OrdersController@index']);
        Route::get ('edit/{id}'   , ['as'   => 'edit'   , 'uses' => 'OrdersController@edit']);
        Route::post('update/{id}' , ['as'   => 'update' , 'uses' => 'OrdersController@update']);
    });

    Route::group(['prefix' => 'cupoms', 'as' => 'cupoms.'], function(){
        Route::get (''           , ['as'   => 'index' , 'uses' => 'CupomsController@index']);
        Route::get ('create'     , ['as'   => 'create', 'uses' => 'CupomsController@create']);
        Route::post('store'      , ['as'   => 'store' , 'uses' => 'CupomsController@store']);
        Route::get ('edit/{id}'  , ['as'   => 'edit'  , 'uses' => 'CupomsController@edit']);
        Route::post('update/{id}', ['as'   => 'update', 'uses' => 'CupomsController@update']);
    });
});

Route::group(['prefix' => 'customer', 'middleware' => 'auth.checkrole:client', 'as' => 'customer.'], function(){
    Route::group(['prefix' => 'order', 'as' => 'order.'], function(){
        Route::get (''      , ['as'   => 'index'  , 'uses' => 'CheckoutController@index']);
        Route::get ('create', ['as'   => 'create' , 'uses' => 'CheckoutController@create']);
        Route::post('store' , ['as'   => 'store'  , 'uses' => 'CheckoutController@store']);
    });
});

Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});

Route::group(['prefix' => 'api', 'middleware' => 'oauth', 'as' => 'api.'], function(){
    Route::get ('teste', ['as' => 'teste', 'uses' => function(){
        return [
            'message' => 'success',
            'error' => false,
            'status' => 'ok'
        ];
    }]);
 

    Route::group(['prefix' => 'client', 'middleware' => 'oauth.checkrole:client'], function(){
        Route::resource('order', 'Api\Client\ClientCheckoutController', ['except' => ['create', 'edit', 'destroy']]);
    });

    Route::group(['prefix' => 'deliveryman', 'middleware' => 'oauth.checkrole:deliveryman'], function(){
        Route::resource('order', 'Api\Deliveryman\DeliverymanCheckoutController', ['except' => ['create', 'edit', 'destroy', 'store']]);
    });
});
