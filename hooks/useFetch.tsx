'use client'
import { useState, useEffect } from "react";

export type APIResponse<T> = {
    status: number,
    statusText: string,
    data: T | null,
    error: Error | null,
    loading: boolean,
}

export function useFetch<T>(url: string): APIResponse<T>{
    const [status, setStatus] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    const executeGet = async () => {
        setLoading(true);
        try{
            const res =  await fetch(url);
            setStatus(res.status);
            setStatusText(res.statusText);
            if(res.ok){
                setData(await res.json());
            }
        }catch (err: unknown){
            setError(err as Error);
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        executeGet();
    }, [url])

    return {status, statusText, data, error, loading};
}