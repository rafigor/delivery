<?php
/**
 * Created by PhpStorm.
 * User: rafael
 * Date: 18/04/2016
 * Time: 15:12
 */

namespace CodeDelivery\Services;


use CodeDelivery\Repositories\ClientRepository;
use CodeDelivery\Repositories\UserRepository;

class ClientService
{
    private $clientRepository;
    private $userRepository;

    public function __construct(ClientRepository $clientRepository, UserRepository $userRepository){
        $this->clientRepository = $clientRepository;
        $this->userRepository   = $userRepository;
    }

    public function update(array $data, $id){
        $this->clientRepository->update($data, $id);
        $userId = $this->clientRepository->find($id, ['user_id'])->user_id;
        $this->userRepository->update($data['user'], $userId);
    }

    public function create(array $data){

        $data['user']['password'] = bcrypt(123456);
        $userId = $this->userRepository->create($data['user'])->id;

        $data['user_id'] = $userId;
        $this->clientRepository->create($data);
    }

}