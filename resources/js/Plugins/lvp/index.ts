import { App, Component, Plugin } from 'vue';
import { router } from '@inertiajs/vue3'
import icons from './../../helpers/lvp_icons'
import widgets from './../../Components/Widgets'
interface SingleItemActionsOptions {
    item: any,
    route_list: any,
    router: typeof router,
    showToast: (option: ToastOption) => void,
    confirmation_modal: {
        show: boolean,
        title: string,
        body: string,
        cancel_button_label: string,
        confirm_button_label: string,
        onConfirm: (result: boolean) => void,
        onCancel: (result: boolean) => void,
    },
}
interface ToastOption {
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
}
interface SelectedItemsActionOptions {
    selected_items: any,
    route_list: any,
    router: typeof router,
    showToast: (option: ToastOption) => void,
    confirmation_modal: {
        show: boolean,
        title: string,
        body: string,
        cancel_button_label: string,
        confirm_button_label: string,
        onConfirm: (result: boolean) => void,
        onCancel: (result: boolean) => void,
    },
}

interface LVPPluginOptions {
    single_item_actions?: { [key: string]: (options: SingleItemActionsOptions) => any },
    selected_items_actions?: { [key: string]: (options: SelectedItemsActionOptions) => any },
    svg_icons?: { [key: string]: string },
    widgets?: { [key: string]: Component },
}

const plugin: Plugin = {
    install(app: App, options: LVPPluginOptions = {
        single_item_actions: {},
        selected_items_actions: {},
        svg_icons: {},
        widgets: {},
    }) {
        // app.config.globalProperties.lvp_actions = options.actions;
        app.provide('lvp_single_item_actions', options.single_item_actions);
        app.provide('lvp_selected_items_actions', options.selected_items_actions);
        app.provide('lvp_widgets', { ...widgets, ...options.widgets });
        app.provide('lvp_icons', { ...icons, ...options.svg_icons });
    },
};

export type { LVPPluginOptions, SingleItemActionsOptions, SelectedItemsActionOptions }
export default plugin;
