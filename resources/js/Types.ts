
type ColumnAlign = "left" | "right" | "center";
interface TableColumn {
    searchable: boolean;
    sortable: boolean;
    field: string;
    align: ColumnAlign;
    label: string;
    type: string;
    visible: boolean;
    data: any;
    file_path?: string;
    editable: string;

}

interface TableFilter {
    filters: {
        groups: [];
        checkboxs: {
            [k: string]: {
                label: string;
                value: string;
            }[];
        }[];
        dropdowns: {
            field: string;
            label: string;
            placeholder: string;
            multiple: boolean;
            filter: boolean;
            option_value: string;
            option_label: string;
            filter_key: string;
        }[];
        texts: {
            field: string;
            label: string;
            placeholder: string;
        }[];
    };
    icon: string;
    style: string;
    type: string;
    show_reset: boolean;
    reset_button_label: string;
}
interface ActionMenu {
    type: "inline" | "dropdown";
    actions: {
        label: string;
        action: string;
        icon: string;
        color: string;
    }[];
}
interface TableData {
    columns: any[];
    filters: [];
    group_action: ActionMenu;
    // action: {
    //     type: "inline" | "dropdown";
    //     actions: {
    //         label: string;
    //         action: string;
    //         icon: string;
    //         color: string;
    //     }[];
    // };
    label: string;
    fixe_last_column: boolean;
    fixe_first_column: boolean;
    type: string;
    api_url: null;
    paginated: null;
    data: {
        items: [];
        pagination: {
            current_page: number;
            total_items: number;
            total: number;
            per_page: number;
            from: number;
            to: number;
            path: string;
        };
    };
}

interface ActionsList {
    [key: string]: (item: any) => void
}
interface FileInfo {
    imagePreview?: string;
    fileName: string;
    fileOriginalName: string;
    fileSize: string;
    fileFormatedSize: string;
    fileType: string;
    fileExtension: string;
    file?: File;
}

interface PageProps {
    props: {
        errors: [];
        auth: any;
        notifications: number;
        loading: boolean;
        user_menu: [];
        nav_menu: [];
        flash: {
            success: string;
            error: string;
            warn: string;
            info: string;
            alert: string;
        }
    }

}
interface FolderInterface {
    id: string;
    name: string;
    created_date: string;
    type: 'directory' | 'file' | 'other';
    items: number;
    file_info: {
        url: string;
        download_name: string;
        uuid: string;
        extension: string;
        mime_type: string;
        size: number;
    };
}


export type { TableColumn, TableData, ActionsList, ActionMenu, FileInfo, PageProps, FolderInterface, TableFilter }
