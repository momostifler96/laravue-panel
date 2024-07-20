<template>
    <div class="flex flex-col">
        <div class="flex">
            <label v-if="label" :for="id">{{ label }}</label>
            <span v-if="required" class="text-red-500">*</span>
        </div>
        <VueDatePicker
            v-model="(date as any)"
            :range="range"
            :locale="locale"
            :format="formatDate"
            :cancelText="cancelButtonLabel"
            :selectText="validateButtonLabel"
            :min-date="minDate"
            :max-date="maxDate"
            :start-date="startDate"
        />
    </div>
</template>
<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";

import { PropType, ref, watch } from "vue";
const props = defineProps({
    label: {
        type: String,
        required: false,
    },
    helperText: {
        type: String,
        required: false,
    },
    errorText: {
        type: String,
        required: false,
    },
    placeholder: {
        type: String,
        required: false,
    },
    id: {
        type: String,
        required: false,
    },
    disabled: Boolean,
    readonly: Boolean,
    required: Boolean,
    minDate: String,
    maxDate: String,
    startDate: String,
    validateButtonLabel: {
        type: String,
        default: "Validate",
    },
    cancelButtonLabel: {
        type: String,
        default: "Cancel",
    },
    locale: {
        type: String,
        default: "en-US",
    },

    modelValue: {
        type: Object as PropType<String | String[]>,
        required: true,
    },
    type: {
        type: String as PropType<
            "date" | "month" | "year" | "time" | "datetime"
        >,
        default: "date",
    },
    range: Boolean,
});
const date = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);
watch(date, (value) => {
    emit("update:modelValue", value);
});

watch(
    () => props.modelValue,
    (value) => {
        date.value = value;
    }
);
const getType = (type) => {
    switch (type) {
        case "datetime":
            return props.type == "datetime";
        case "date":
            return props.type == "datetime";
        case "month":
            return props.type == "month";
        case "year":
            return props.type == "year";
        case "time":
            return props.type == "time";
        default:
            return props.type == "date";
    }
};

const formats = {
    date: (date: Date | null) => {
        return date ? date.toLocaleDateString("fr-FR") : "";
    },
    month: (date: Date | null) => {
        return date ? date.toLocaleDateString("fr-FR", { month: "long" }) : "";
    },
    year: (date: Date | null) => {
        return date ? date.getFullYear() : "";
    },
    time: (date: Date | null) => {
        return date ? date.toLocaleTimeString("fr-FR") : "";
    },
    datetime: (date: Date | null) => {
        return date ? date.toLocaleString("fr-FR") : "";
    },
};
const formatDate = (date: any) => {
    return Array.isArray(date)
        ? date.map((d) => formats[props.type](d)).join(" - ")
        : formats[props.type](date);
};
</script>
