<?php

namespace LVP\Facades;

use LVP\Enums\Alignment;
use Illuminate\Support\Facades\Storage;

class TableColumn
{

    protected string $_field;
    protected string $_label;
    protected string $_type;
    protected string $_file_path = '/';
    protected bool $_editable;
    protected bool $_sortable;
    protected bool $_searchable = false;

    protected string $_align;
    protected string $_relation_column;
    protected bool $_relation_count;
    protected string|null $_date_format = null;
    protected array $_column;

    public function __construct()
    {
    }

    public function isSearchable()
    {
        return $this->_searchable;
    }



    public static function make($field)
    {
        $instance = new static();
        $instance->_field = $field;
        $instance->_label = str($field)->camel();
        $instance->_align = Alignment::LEFT->value;
        $instance->_editable = false;
        $instance->_sortable = false;
        $instance->_searchable = false;
        return $instance;
    }
    public  function aligment(Alignment $field = Alignment::RIGHT)
    {
        $this->_align = $field->value;
        return $this;
    }

    public  function relation(string $relation)
    {
        $this->_relation_column = $relation;
        return $this;
    }
    public  function relationCount()
    {
        $this->_relation_count = true;
        return $this;
    }

    public function label(string $value)
    {
        $this->_label = $value;
        return $this;
    }

    public function field()
    {
        return $this->_field;
    }


    public function beforeRender(array $data)
    {
        return $data;
    }
    public function render()
    {
        $data = [
            'field' => $this->_field,
            'label' => $this->_label,
            'file_path' => $this->_file_path,
            'align' => $this->_align,
            'type' => $this->_type,
            'editable' => $this->_editable,
            'sortable' => $this->_sortable,
            'searchable' => $this->_searchable,
            'date_format' => $this->_date_format,
        ];

        return $this->beforeRender($data);
    }
}
