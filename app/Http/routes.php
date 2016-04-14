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

Route::group(['prefix' => 'admin'], function(){
    Route::group(['prefix' => 'categories'], function(){
        Route::get (''           , ['as'   => 'admin.categories.index' , 'uses' => 'CategoriesController@index']);
        Route::get ('create'     , ['as'   => 'admin.categories.create', 'uses' => 'CategoriesController@create']);
        Route::post('store'      , ['as'   => 'admin.categories.store' , 'uses' => 'CategoriesController@store']);
        Route::get ('edit/{id}'  , ['as'   => 'admin.categories.edit'  , 'uses' => 'CategoriesController@edit']);
        Route::post('update/{id}', ['as'   => 'admin.categories.update', 'uses' => 'CategoriesController@update']);
    });
});

Route::group(['prefix' => 'admin'], function(){
    Route::group(['prefix' => 'products'], function(){
        Route::get (''           , ['as'   => 'admin.products.index' , 'uses' => 'productsController@index']);
        Route::get ('create'     , ['as'   => 'admin.products.create', 'uses' => 'productsController@create']);
        Route::post('store'      , ['as'   => 'admin.products.store' , 'uses' => 'productsController@store']);
        Route::get ('edit/{id}'  , ['as'   => 'admin.products.edit'  , 'uses' => 'productsController@edit']);
        Route::post('update/{id}', ['as'   => 'admin.products.update', 'uses' => 'productsController@update']);
    });
});
