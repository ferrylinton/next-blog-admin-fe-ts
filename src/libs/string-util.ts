export function removeSpace(str: string){
    return str.replace(/\s+/g, '').toLowerCase();
}

export function hasNoSpace(str: string){
    const regexp = /^\S*$/;
    return regexp.test(str)
}

export const valueToUppercase = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toUpperCase();
}