<?php

namespace CodeDelivery\Http\Controllers\Api\Client;

use CodeDelivery\Http\Requests;
use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Http\Requests\CheckoutRequest;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ClientCheckoutController extends Controller
{
    private $repository;
    private $userRepository;
    private $orderService;

    private $with = ['client', 'cupom', 'items'];

    public function __construct(OrderRepository $repository,
                                UserRepository $userRepository,
                                OrderService $orderService

    )
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
    }

    public function store(CheckoutRequest $request){
        $data = $request->all();
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $data['client_id'] = $clientId;
        $o = $this->orderService->create($data);
        $order = $this->repository
            ->skipPresenter(false)
            ->with($this->with)
            ->find($o->id);

        return $order;
    }

    public function index(){
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $orders = $this->repository
            ->skipPresenter(false)
            ->with($this->with)
            ->scopeQuery(function($query) use($clientId){
            return $query->where('client_id', '=', $clientId);
        })->paginate();

        return $orders;
    }

    public function show($id){
        $o = $this->repository
            ->skipPresenter(false)
            ->with($this->with)
            ->find($id);
        return $o;
    }
}
