<?php

namespace CodeDelivery\Http\Controllers\Api\Deliveryman;

use CodeDelivery\Http\Requests;
use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class DeliverymanCheckoutController extends Controller
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

    public function index(){
        $idDeliveryman = Authorizer::getResourceOwnerId();
        $orders = $this->repository
            ->skipPresenter(false)
            ->with($this->with)
            ->scopeQuery(function($query) use($idDeliveryman){
            return $query->where('user_deliveryman_id', '=', $idDeliveryman);
        })->paginate();

        return $orders;
    }

    public function show($id){
        $idDeliveryman = Authorizer::getResourceOwnerId();
        return $this->repository
            ->skipPresenter(false)
            ->getByIdAndDeliveryman($id, $idDeliveryman);
    }

    public function update(Request $request, $id){
        $idDeliveryman = Authorizer::getResourceOwnerId();
        $order = $this->orderService->update($id, $idDeliveryman, $request->get('status'));
        if($order) {
            return $this->repository
                ->skipPresenter(false)
                ->find($order->id);
        }
        abort(400, "Ordem não encontrada.");
    }

}
