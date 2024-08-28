
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ResponseResult, ToastDisplayType, ToastType } from "../interfaces/CommonTypes";
import { useRouter } from "next/router";

function useAuthFetch<T>(intial: T, toastDisplayType: ToastDisplayType = ToastDisplayType.None, toastMessage?: (type: ToastType) => string,): [T,
    (input: RequestInfo | URL, init?: RequestInit,) => void] {

    const [data, setData] = useState<T>(intial);
    const [status, setStatus] = useState<boolean | null>(null);
    const [toastId, setToastId] = useState<string | undefined>();
    const navigate = useRouter();

    useEffect(() => {
        if (status != null) {
            if (toastDisplayType !== ToastDisplayType.None && status) {
                if (toastDisplayType == ToastDisplayType.Custom && toastMessage)
                    toast.success(toastMessage(ToastType.Success), { id: toastId });
                else {
                    if ((data as ResponseResult).status)
                        toast.success((data as ResponseResult).status, { id: toastId });
                    else
                        toast.success("Process Successful", { id: toastId });
                }
            }
            else if (toastDisplayType !== ToastDisplayType.None && status == false) {
                if (toastDisplayType == ToastDisplayType.Custom && toastMessage)
                    toast.error(toastMessage(ToastType.Error), { id: toastId });
                else {
                    if ((data as ResponseResult).status)
                        toast.error((data as ResponseResult).status, { id: toastId });
                    else
                        toast.error("Something went Wrong", { id: toastId });
                }
            }
            setStatus(null);
        }
    }, [status]);

    return [data, async function (input: RequestInfo | URL, init?: RequestInit) {

        if (toastDisplayType != ToastDisplayType.None) {
            if (toastDisplayType == ToastDisplayType.Custom && toastMessage)
                setToastId(toast.loading(toastMessage(ToastType.Loading)));
            else
                setToastId(toast.loading("Processing.."));
        }
        if (init?.headers) {
            init.headers = {
                ...init.headers, 'Authorization': localStorage.getItem('auth-token')!
            };
        }
        else if (!init) {
            init = { headers: { 'Authorization': localStorage.getItem('auth-token')! } };
        } else {
            init = { ...init, headers: { 'Authorization': localStorage.getItem('auth-token')! } };
        }
        const response = await fetch(input, init);

        if (response.status == 401) {
            toast.remove();
            localStorage.clear();
            navigate.push('/login');
        }
        if (response.status == 403) {
            toast.remove();
            toast.error((await response.json() as ResponseResult).status)
        }
        else {
            setData(await response.json() as T);
            setStatus(response.ok ? true : false);
        }

    }];

}

export default useAuthFetch;