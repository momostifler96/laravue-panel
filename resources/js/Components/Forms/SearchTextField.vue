<template>
    <div class="lvp-search-text-field">
        <label v-if="label" for="">{{ label }}</label>
        <div class="lvp-search-text-field-input">
            <SearchIcon class="w-4 h-4" />
            <input
                type="text"
                class="w-full p-0 py-0 bg-transparent border-none outline-0 focus:ring-0"
                placeholder="Search..."
                @input="updateModelValue"
                :value="modelValue"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import SearchIcon from "@heroicons/vue/24/outline/MagnifyingGlassIcon";
const props = defineProps({
    label: String,
    modelValue: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(["update:modelValue"]);
const updateModelValue = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
