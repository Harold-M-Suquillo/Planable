import { useState, useCallback } from "react";
import { useSnackbar } from 'notistack';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);

        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? requestConfig.body : null,
                signal: requestConfig.signal ? requestConfig.signal: null
            });

            if (!response.ok) {
                const error = await response.json();
                throw error;
            }
            const data = await response.json();
            applyData(data);

            // Show succesfull request if provided
            if (requestConfig.response){
                enqueueSnackbar(requestConfig.response.message, {variant: requestConfig.response.variant})
            }
        } catch (error) {
            if (requestConfig.response){
                console.log(error)
                for (let msg in error.detail){
                    enqueueSnackbar( error.detail[msg], { variant:'error' });
                };
            };
        }
        setIsLoading(false);
    }, [enqueueSnackbar]);
    return {
        isLoading,
        sendRequest
    };
};

export { useHttp };
