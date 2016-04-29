<?php

namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Cupom;

/**
 * Class CupomTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class CupomTransformer extends TransformerAbstract
{

    /**
     * Transform the \Cupom entity
     * @param \Cupom $model
     *
     * @return array
     */
    public function transform(Cupom $model)
    {
        return [
            'id'           => (int) $model->id,
            'code'         => (string) $model->code,
        ];
    }
}
