<?php

namespace LVP\Enums;

enum Date: string
{

    case Date = 'date';
    case DateTime = 'date-time';
    case Time = 'time';
    case Day = 'day';
    case Month = 'month';
    case Year = 'year';
}
