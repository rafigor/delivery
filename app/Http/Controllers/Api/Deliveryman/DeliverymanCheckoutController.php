<?php

namespace CodeDelivery\Http\Controllers\Api\Deliveryman;

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

class DeliverymanCheckoutController extends Controller
{
    private $repository;
    private $userRepository;
    private $orderService;

    public function __construct(OrderRepository $repository,
                                UserRepository $userRepository,
                                OrderService $orderService

    )
    {
        $this->repository = $repository;
        $this->userRepository = $userRepository;
        $this->orderService = $orderService;
    }

    public function index(){
        $idDeliveryman = Authorizer::getResourceOwnerId();
        $orders = $this->repository->with('items')->scopeQuery(function($query) use($idDeliveryman){
            return $query->where('user_deliveryman_id', '=', $idDeliveryman);
        })->paginate();

        return $orders;
    }

    public function show($id){
        $idDeliveryman = Authorizer::getResourceOwnerId();
        return $this->repository->getByIdAndDeliveryman($id, $idDeliveryman);
    }

    public function update(Request $request, $id){
        $idDeliveryman = Authorizer::getResourceOwnerId();
        $order = $this->orderService->update($id, $idDeliveryman, $request->get('status'));
        if($order) {
            return $order;
        }
        abort(400, "Ordem não encontrada.");
    }

}
