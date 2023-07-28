import { DefaultLangs } from "@/config/languaje";
import { ReactNode } from "react";

export interface AppCtxPropsInterface {
    children?: ReactNode;
}

export interface AppCtxInterface {
    lang: string,
    changeData: (lang: string) => void;
} 

export const AppCtxInitialValues: AppCtxInterface ={
    lang: DefaultLangs[0],
    changeData: () => {}
}
