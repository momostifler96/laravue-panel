<template>
    <template v-if="$page.props.errors">
        <span>
            {{ updateLoadErrors($page.props.errors) }}
        </span>
    </template>
    <FormModal
        :show="show"
        @submit="submit"
        @close="cancel"
        :modalTitle="modalTitle"
        :cancelLabel="cancelLabel"
        :submitLabel="submitLabel"
    >
        <div class="grid grid-cols-2 gap-4 mb-5">
            <template v-for="(field, i) in formFields">
                <TextField
                    v-if="!field.hidden_on[_action] && field.type === 'text'"
                    :class="[
                        `col-span-${field.colspan}`,
                        {
                            'col-span-full': field.colspan == 'full',
                        },
                    ]"
                    v-model="_formData[field.field]"
                    :label="field.label"
                    :placeholder="field.placeholder"
                    :readonly="field.readonly_on[action]"
                    :disabled="field.disabled_on[action]"
                    :errorText="errorIsArray(field.field)"
                    :required="field.rules.includes('required')"
                />
                <TextAreaField
                    v-else-if="
                        !field.hidden_on[_action] && field.type === 'textarea'
                    "
                    :class="[
                        `col-span-${field.colspan}`,
                        {
                            'col-span-full': field.colspan == 'full',
                        },
                    ]"
                    v-model="_formData[field.field]"
                    :label="field.label"
                    :placeholder="field.placeholder"
                    :readonly="field.readonly_on[action]"
                    :disabled="field.disabled_on[action]"
                    :errorText="errorIsArray(field.field)"
                    :required="field.rules.includes('required')"
                />
                <FormSelectField
                    v-else-if="
                        !field.hidden_on[_action] && field.type === 'select'
                    "
                    :class="[
                        `col-span-${field.colspan}`,
                        {
                            'col-span-full': field.colspan == 'full',
                        },
                    ]"
                    v-model="_formData[field.field]"
                    :label="field.label"
                    :placeholder="field.label"
                    :required="field.rules.includes('required')"
                    :readonly="field.readonly_on[action]"
                    :disabled="field.disabled_on[action]"
                    :errorText="errorIsArray(field.field)"
                    :options="field.options"
                />

                <FileUploader
                    v-else-if="
                        !field.hidden_on[_action] && field.type === 'file'
                    "
                    :class="[
                        `col-span-${field.colspan}`,
                        {
                            'col-span-full': field.colspan == 'full',
                        },
                    ]"
                    v-model="_formData[field.field]"
                    :label="field.label"
                    :placeholder="field.label"
                    :required="field.rules.includes('required')"
                    :readonly="field.readonly_on[action]"
                    :disabled="field.disabled_on[action]"
                    :errorText="errorIsArray(field.field)"
                    :options="field.options"
                />
            </template>
        </div>
    </FormModal>
</template>
<script setup lang="ts">
import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import { defineProps, defineEmits, ref, onMounted, watch, computed } from "vue";
import CloseIcon from "@heroicons/vue/24/outline/XMarkIcon";
import { Link, router, useForm, usePage } from "@inertiajs/vue3";
import FormSelectField from "lvp/Components/Forms/FormSelectField.vue";
import TextField from "lvp/Components/Forms/TextField.vue";
import Select from "lvp/Components/Forms/Select.vue";
import TextAreaField from "lvp/Components/Forms/TextAreaField.vue";
import SimpleButton from "lvp/Components/Forms/SimpleButton.vue";
import FileUploader from "lvp/Components/Forms/FileUploader.vue";
import FormModal from "lvp/Components/Dialogs/FormModal.vue";

const props = defineProps({
    show: Boolean,
    titles: {
        type: Object,
        riquired: true,
    },
    formFields: {
        type: Object,
        riquired: true,
    },
    formData: {
        type: Object as () => any,
        riquired: true,
    },
    action: {
        type: String,
        default: "create",
    },
    routes_names: {
        type: Object as () => any,
        riquired: true,
    },
    cancelLabel: {
        type: String,
        default: "Annuler",
    },
    submitLabel: {
        type: String,
        default: "Crée",
    },
    modalTitle: {
        type: String,
        default: "Crée",
    },
    errors: Object,
});
console.log("Resource props.formData", props.formData);
const _formData = ref(props.formData);
const _action = ref(props.action);
const updateLoadErrors = ($errors: any) => {
    console.log("updateLoadErrors", $errors);
    formErrors.value = $errors;
};
const emit = defineEmits(["close", "submit"]);
const formErrors = ref(usePage().props.errors);
const errorIsArray = (field: string): string | null => {
    const error = formErrors.value[field];
    return error ? (Array.isArray(error) ? error[0] : error) : null;
};
const submit = () => {
    router.post(
        route(
            props.routes_names[_action.value === "create" ? "store" : "update"]
        ),
        _formData.value,
        {
            onSuccess: () => {
                formErrors.value = {};
                emit("close", true);
            },
        }
    );
};
const cancel = () => {
    formErrors.value = {};
    emit("close", true);
};
watch(
    () => props.show,
    (value) => {
        console.log("props change", value);
        _formData.value = props.formData;
        _action.value = props.action;
    }
);

onMounted(() => {});
</script>
