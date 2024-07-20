<?php

namespace LVP\Table;

use LVP\Facades\TableColumn;

class DropdownColumn extends TableColumn
{

    protected string $_color;
    protected string $_field;
    protected array $_options = [];
    protected bool $_has_confirmation = false;

    protected string $_confirmation_title;
    protected string $_confirmation_body;

    protected array $_value_colors = [];


    public function dateFormat(string $format)
    {
        $this->_date_format = $format;
        return $this;
    }

    public function badgeColors(array $colors)
    {
        $this->_value_colors = $colors;
        return $this;
    }
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $this->_type = 'dropdown';
        $this->_editable = false;
    }

    public function options(array $options)
    {
        $this->_options = $options;
        return $this;
    }
    public function setConfirmationTitle(string $title)
    {
        $this->_confirmation_title = $title;
        return $this;
    }
    public function setConfirmationBody(string $body)
    {
        $this->_confirmation_body = $body;
        return $this;
    }
    public function hasConfirmation()
    {
        $this->_has_confirmation = true;
        return $this;
    }
    public function beforeRender(array $data)
    {
        $data['options'] = $this->_options;
        $data['value_colors'] = $this->_value_colors;

        $data['has_confirmation'] = $this->_has_confirmation;
        if (!empty($this->_confirmation_title)) {
            $data['confirmation_title'] = $this->_confirmation_title;
        }
        if (!empty($this->_confirmation_body)) {
            $data['confirmation_body'] = $this->_confirmation_body;
        }

        return $data;
    }
}
