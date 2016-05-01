<?php

namespace CodeDelivery\Transformers;

use CodeDelivery\Models\Product;
use League\Fractal\TransformerAbstract;

/**
 * Class ClientTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class ProductTransformer extends TransformerAbstract
{

    /**
     * Transform the \Client entity
     * @param \Client $model
     *
     * @return array
     */
    public function transform(Product $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => (string) $model->name,
            'description'=> (string) $model->description,
            'price'      => (float) $model->price,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,
        ];
    }
}
