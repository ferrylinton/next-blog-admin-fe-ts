export function removeSpace(str: string){
    return str.replace(/\s+/g, '').toLowerCase();
}

export function hasNoSpace(str: string){
    const regexp = /^\S*$/;
    return regexp.test(str)
}