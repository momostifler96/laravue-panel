<template>
    <div class="">
        <div class="flex">
            <label for="">{{ label }}</label>
            <span v-if="required" class="text-red-500">*</span>
        </div>

        <Dropdown
            :modelValue="modelValue"
            @update:modelValue="emit('update:modelValue', $event)"
            :options="options"
            :placeholder="placeholder"
            option-label="label"
            option-value="value"
            :filter="filter"
            :loading="loading"
            class="w-full"
            @filter="search"
        />
        <small></small>
    </div>
</template>
<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import HTTP from "lvp/helpers/http";
import { ref } from "vue";
const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: null,
    },
    options: {
        type: Array,
        default: [],
    },
    label: {
        type: String,
        default: null,
    },
    placeholder: {
        type: String,
        default: "Select an option",
    },
    required: {
        type: Boolean,
        default: false,
    },
    filter: {
        type: Boolean,
        default: false,
    },
    helperText: {
        type: String,
        default: null,
    },
    ajaxCall: {
        type: Object as () => string | null,
        default: null,
    },
});

const emit = defineEmits(["update:modelValue"]);

const updateModelValue = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const options = ref(props.options);
const loading = ref(false);
var search_debounce: any = null;
const search =  (val: any) => {
    if (search_debounce) clearTimeout(search_debounce);
    search_debounce = setTimeout(async () => {
        //@ts-ignore
        loading.value = true;
        const { data } = await HTTP.get(
            props.ajaxCall + "?search=" + val.value
        );
        options.value = data.data;
        loading.value = false;
    }, 1000);
};
</script>
