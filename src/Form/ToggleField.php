<?php

namespace LVP\Form;

use LVP\Facades\FormField;

class ToggleField extends FormField
{
    protected string $_component_path = 'toogle_field';

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $this->_type = 'toggle';
    }
}
