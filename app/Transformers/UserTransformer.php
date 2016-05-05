<?php

namespace CodeDelivery\Transformers;

use CodeDelivery\Models\User;
use League\Fractal\TransformerAbstract;

/**
 * Class ClientTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class UserTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['client'];

    /**
     * Transform the \Client entity
     * @param \Client $model
     *
     * @return array
     */
    public function transform(User $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => (string) $model->name,
            'email'      => (string) $model->email,
            'role'       => (string) $model->role,
        ];
    }

    public function includeClient(User $model){
        return $this->item($model->client, new ClientTransformer());
    }
}
