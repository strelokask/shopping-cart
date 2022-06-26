import { useEffect, useState } from "react"

type LocalStorageProps<T> = {
    key: string,
    defaultValue: T
}
export function useLocalStorage<T>(key: string, defaultValue: T){
    const [val, setVal] = useState<T>(() => {
        const jsonVal = localStorage.getItem(key)

        if(jsonVal != null) return JSON.parse(jsonVal)

        return defaultValue
    })


    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(val))
    }, [key, val])

    return [val, setVal] as [T, typeof setVal]
}