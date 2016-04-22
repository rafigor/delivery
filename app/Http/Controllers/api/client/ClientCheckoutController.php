<?php

namespace CodeDelivery\Http\Controllers\Api\Client;

use CodeDelivery\Http\Requests\AdminCategoryRequest;
use CodeDelivery\Repositories\CategoryRepository;
use CodeDelivery\Http\Requests;
use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ClientCheckoutController extends Controller
{
    private $repository;
    private $userRepository;
    private $productRepository;
    private $orderService;

    public function __construct(OrderRepository $repository,
                                UserRepository $userRepository,
                                ProductRepository $productRepository,
                                OrderService $orderService

    )
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->productRepository = $productRepository;
        $this->orderService = $orderService;
    }

    public function store(Request $request){
        $data = $request->all();
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $data['client_id'] = $clientId;
        $o = $this->orderService->create($data);
        $order = $this->repository->with('items')->find($o->id);

        return $order;
    }

    public function index(){
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $orders = $this->repository->with('items')->scopeQuery(function($query) use($clientId){
            return $query->where('client_id', '=', $clientId);
        })->paginate();

        return $orders;
    }

    public function show($id){
        $o = $this->repository->with(['client', 'items', 'cupom'])->find($id);
        $o->items->each(function($item){
            $item->product;
        });
        return $o;
    }

}
