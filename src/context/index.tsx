"use client"
import { createContext, useContext, useState } from "react";
import {
    AppCtxPropsInterface,
    AppCtxInterface,
    AppCtxInitialValues
} from "./applicationInterface";

export const AppCtx = createContext<AppCtxInterface | null>(AppCtxInitialValues);

export const useAppData = () => {
    const context = useContext(AppCtx);
    if(!context) throw new Error('useAppData must used within a provider');
    return context;
}

export const AppProvider = ({children}:AppCtxPropsInterface) => {
    const [lang, setLang] = useState<string>(AppCtxInitialValues.lang);

    const changeData = (lang:string) => {
        setLang(lang);
    };

    return(
        <AppCtx.Provider value={{ lang, changeData}}>
            {children}
        </AppCtx.Provider>
    )
}