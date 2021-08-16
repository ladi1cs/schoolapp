export const isValidArray = (arr:any): boolean => {
    return arr && Array.isArray(arr) && arr.length > 0;
}