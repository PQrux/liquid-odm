export default function round(value: number, digits: number = 2){
    const exp = Math.pow(10, digits);
    return Math.round((value + Number.EPSILON) * exp) / exp;
}