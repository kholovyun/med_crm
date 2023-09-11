export const getTokenFromStorage = (): null | string => {
    try {
        const tokenFromStorage = localStorage.getItem("token");
        if (!tokenFromStorage) return null;
        return JSON.parse(tokenFromStorage);               
    } catch (error: unknown) {
        return null;        
    }
};