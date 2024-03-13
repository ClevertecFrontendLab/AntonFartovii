export const formatDate = (value: string) => {
    const date = new Date(value);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
};

export const areAllFieldsEmpty = (obj: any): boolean => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
            return false;
        }
    }
    return true;
};
