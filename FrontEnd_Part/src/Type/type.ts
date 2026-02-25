
export interface NewProductInput extends Omit<IProduct, "type"> {
    // type: TypeObj[];
    type: OptionInterface[];
    thumbnailIndex: number;
    imageInputBy: string;
    whenCreted: string;
}

export type SingleTypeObject = {
    "typeName": string[],
    "typeStock": number,
    "typeVerity": string[],
    "typeId": string,
    "typePrice": number
}

export interface IProduct {
    "id": number | string;
    "title": string;
    "description"?: {
        "fullName": string;
        "aboutProduct": string;
        "highLights": string[],
        "specifications": Entry[],
        "product_Details": Entry[],
        "dimensions": Entry[]
    };
    "price": number;
    "discountPercentage": number;

    "type"?: []

    "brand": string;
    "category": string;

    "rating": {
        "totalPerson": number;
        "avgRating": number;
    };

    "thumbnail": string;
    "images": string[];
    "isHighlight": boolean;

    "isDeleted": boolean;
    "review"?: ReviewData[];

    "likes": number,
    "dislikes": number,

    "likedUserIds": string[],

    "dislikedUserIds": string[],

}

export interface AdminAllOrders extends OrderData {
    id: string
}

export type GroupedByProductAndSold = {
    [key: string]: number
}

export type GroupedByData = {
    [key: string]: CardDataInter[]
}

export interface IAllProductsWithCat {
    allProducts: IProduct[],
    allCaegory: string[],
    filterAllBrands: string[],
    filterAllCateory: string[],
    allHighlightProducts: IProduct[],
    totalProducts: number,
    searchByQuery: boolean,
    sortByPrice: string,
    onePageLimit: number,
    singleProductId: string | number,
    singleProductData: IProduct,
    simmilarProductWithOnePro: IProduct[],
    searchBrandAndCate: {
        brand: string,
        category: string
    }
    isLoading: boolean,
    isError: boolean
}

export type PropForLikeAndDislike = {
    productId: string | number;
    userId: string;
    isLiking?: boolean;
    isDisliking?: boolean
}

export type productId = {
    productId: string | number
}

export type SearchObj = {
    brand?: string,
    category?: string,
    price?: string,
    page?: string,
    limit?: string,
}

// // // This is how card data look like
export interface CardDataInter extends IProduct {
    quantity: number;
    verity: SingleTypeObject;
}

export interface CartInter {
    cartData: CardDataInter[],
    totalPrice: number;
}

export interface FeedBackSingle {
    "feedbackName": string,
    "feedbackType": string,
    "feedbackMsg": string,
    "whenCreated": string,
    "reply": string
}

export interface InitialState {
    allFeedbackArr: FeedBackSingle[],
    isLoading: boolean,
    isError: boolean,
    isFullFilled: boolean
}

// // // This is how single type look like -->
export type TypeObj = {
    typeName: string[];
    typeVerity: string[];
    typeStock: number;
    typePrice: number;
};

export interface ModalInter {
    open: boolean,
    children: React.ReactNode;
}

export interface OrderInterface {
    orderArr: OrderData,
    isLoading: boolean,
    isError: boolean,
    isFullFilled: boolean
}

export interface SearchProduct {
    isLoading: boolean,
    isFullFilled: boolean,
    isError: boolean,
    errMsg: string,
    keyText: string,
    productSuggetionArr: IProduct[]
}

export interface ThemeInter {
    mode: boolean,
}

export interface UserOrderOj extends Omit<OrderData, "phone"> {
    phone: string,
    id: string
}

export type ReviewData = {
    "userData": {
        "userName": string,
        "userImg": string,
        "userUID": string,
    },

    "userId": {
        firstName: string,
        lastName: string,
        id: string,
        profilePic: string
    },

    "productName": string,
    "comment": string,

    "stars": number,
    "likes": number,
    "dislikes": number,
    "id": string,
    "whenCreated": string,
    "likedUserIds": string[],
    "dislikedUserIds": string[]
}

export type TypeObject = {
    typeName: string[],
    typeStock: number,
    typeVerity: string[],
    typePrice: number
    isChanged: boolean
}

export type OrderData = {
    fullName: string,
    phone: number,
    address: UserAddressObj,
    paymentMethod: string,
    cartData: CardDataInter[],
    userId: string,
    whenCreated: string,
    totalItems: number,
    totalPrice: string,
    status: string,
}

export type UserAddressObj = {
    id: string;
    city: string,
    street: string,
    country: string,
    pincode: string
}

export interface VerityDataItem {
    id: string; // internal key only
    name: string;
    price: number | "";
    stock: number | "";
}

export interface Verity {
    id: string; // internal key only
    label: string;
    data: VerityDataItem[];
}

export interface OptionInterface {
    id: string; // internal key only
    name: string;
    imgs: string[];
    verity: Verity[];
}

export interface OptionOut {
    name: string;
    imgs: string[];
    verity: VerityOut[];
}


export interface VerityDataItemOut {
    name: string;
    price: number;
    stock: number;
}

export interface VerityOut {
    label: string;
    data: VerityDataItemOut[];
}

/** Internal — each entry carries a stable React key */
export interface Entry {
    id: string;
    key: string;
    value: string;
}

export interface AdminDataInterface {
    isLoading: boolean;
    isError: boolean;
    isFullfilled: boolean;
    errMsg: string;
    allProduct: IProduct[],
    allOrders: AdminAllOrders[],
    searchAllOrders: {
        sortBy: "1" | "-1"
    },
    groupedByCategoryObj: GroupedByData,
    groupedByBrandObj: GroupedByData,
    groupedByProductAndSold: GroupedByProductAndSold,
    updatingProduct: boolean,
    newProduct: NewProductInput
}