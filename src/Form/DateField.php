<?php

namespace LVP\Form;

use LVP\Facades\FormField;
use LVP\Enums\Date;
use LVP\Traits\IsTextField;

class DateField extends FormField
{
    use IsTextField;

    protected string $_component_path = 'date_piker';

    protected bool $_is_range = false;


    public function __construct()
    {
        $this->_type = Date::Date->value;
    }

    public function type(Date $type)
    {
        $this->_type = $type->value;
    }


    public function isRange(bool $value = true)
    {
        $this->_is_range = $value;
    }
}
