<template>
    <TransitionRoot appear :show="show">
        <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
            <div
                class="fixed inset-0 bg-black/80 backdrop:blur-lg z-[100]"
                @click="close"
            />
        </TransitionChild>
        <TransitionChild
            as="template"
            enter="duration-600 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-600 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
        >
            <div class="lvp-modal">
                <div class="modal-header">
                    <button
                        type="button"
                        @click="close"
                        class="lvp-modal-close-btn"
                    >
                        <CloseIcon class="w-5 h-5" />
                    </button>
                    <h6 class="font-bold">{{ title }}</h6>
                </div>
                <div class="modal-content">
                    <slot />
                </div>
            </div>
        </TransitionChild>
    </TransitionRoot>
</template>
<script setup lang="ts">
import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import { defineProps, defineEmits, ref, onMounted } from "vue";
import CloseIcon from "@heroicons/vue/24/outline/XMarkIcon";
const props = defineProps({
    show: Boolean,
    title: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["close", "update:close"]);
const close = () => {
    emit("update:close");
};
</script>
