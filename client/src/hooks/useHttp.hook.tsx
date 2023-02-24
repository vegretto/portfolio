import {useCallback, useState} from "react";

type FormValuesType = {
    id?: string,
    email?: string
    img?: FileList | null
    companyDescription?: string
}; //TODO Fix this shit

const useHttp = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const request = useCallback(async <T extends FormValuesType>(
        url: string,
        method: "GET" | "POST" | "DELETE" = "GET",
        body: T | null = null,
        headers: HeadersInit = {}) => {

        try {
            setIsLoading(true)
            let formData;
            if (body) {
                if (body.img) {
                    formData = new FormData();
                    const {img, ...textData} = {...body}
                    if (img) {
                        formData.append('img', img[0]);
                    }
                    formData.append('document', JSON.stringify(textData));
                }
            }

            const options = {
                method,
                body: formData ? formData : body ? JSON.stringify(body) : null,
                headers
            }

            const response = await fetch(url, options)
            const data = await response.json()

            if (!response.ok) {
                setError(data.message)
                return
            }
            return data
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }

    }, [])
    return {request, error, isLoading}
}

export default useHttp

