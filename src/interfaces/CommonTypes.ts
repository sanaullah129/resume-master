export enum ToastType {
    Loading,
    Success,
    Error
}

export enum ToastDisplayType {
    None,
    Default,
    Custom
}

export interface ResponseResult {
    statusId: number,
    status: string
}

export interface DropDowns { 
    value : string
    label: string,
    isSelected: boolean
}