
interface IProduct{
    title: string,

    description: {
        fullName : string ,
        aboutProduct : string ,
        highLights : [] ,
        specifications : [] ,
        product_Details : [] ,
        dimensions : []

    },

    price: number,

    type: [
        {
            typeName: string[],
            typeStock: number,
            typeVerity: string[]
        }
    ],

    discountPercentage: number,

    brand: string,

    rating: {
        totalPerson: number,
        avgRating: number
    },

    category: string,
    thumbnail: string,
    images: string[]

}

