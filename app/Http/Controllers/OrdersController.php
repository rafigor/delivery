<?php
/**
 * Created by PhpStorm.
 * User: rafael
 * Date: 18/04/2016
 * Time: 15:38
 */

namespace CodeDelivery\Http\Controllers;


use Illuminate\Http\Request;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;

class OrdersController extends Controller
{
    private $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(){
        $orders = $this->repository->paginate();
        return view('admin.orders.index', compact('orders'));
    }

    public function edit($id, UserRepository $userRepository){
        $list_status = [0 => 'Pendente',
                        1 => 'A caminho',
                        2 => 'Entregue',
                        3 => 'Cancelado']
        ;

        $list_deliveryman = $userRepository->getDeliverymen();

        $order = $this->repository->find($id);

        return view('admin.orders.edit', compact('order', 'list_status', 'list_deliveryman'));
    }

    public function update(Request $request, $id){
        $this->repository->update($request->all(), $id);
        return redirect()->route('admin.orders.index');
    }

}