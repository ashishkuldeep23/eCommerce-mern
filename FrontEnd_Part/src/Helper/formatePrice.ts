// // // This fn is used to create more readable number
export function makeMoreRaedablePrice(num: number): string {
    let newPrice = new Intl.NumberFormat("en-IN").format(num);

    // console.log(newPrice)
    return newPrice;
}
