export const isValidPage = (str: string) => {
    const number = Number(str);
    const isInteger = Number.isInteger(number);
    const isPositive = number > 0;

    return isInteger && isPositive;
}