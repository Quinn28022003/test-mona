import { useEffect, useState } from "react"

export const useDebounce = (text: string) => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setValue(text)
        }, 500)

        return () => clearTimeout(handler)
    }, [text])

    return value;
}