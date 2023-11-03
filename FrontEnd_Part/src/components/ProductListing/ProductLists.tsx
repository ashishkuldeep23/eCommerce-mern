
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Fragment } from "react"


import SingleProduct from "./SingleProduct"



export type SingleTypeObject = {
  "typeName": string[],
  "typeStock": number,
  "typeVerity": string[] ,
  "typeId" : string
}



export interface IProduct {


  "id": number | string;
  "title": string;
  "description"?: {
    "fullName": string;
    "aboutProduct": string;
    "highLights": string[],
    "specifications": object[],
    "product_Details": object[],
    "dimensions": object[]
  };
  "price": number;
  "discountPercentage": number;

  "type"?: SingleTypeObject[]

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
  "review"?: []

}



export default function ProductLists() {


  // const [products, setProducts] = useState<IProduct[]>([])

  // const arrOfProductCat = ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"]

  // const [productCategory, setProductCategory] = useState<string[]>([])


  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  const productCategory = useSelector((store: RootState) => store.allProductWithCatReducer.allCaegory)

  const products = useSelector((store: RootState) => store.allProductWithCatReducer.allProducts)


  const styleOfCatgioryDiv = {
    paddingRight: 0,
  }


  return (
    <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"}`} style={styleOfCatgioryDiv} >

      <div className="mx-auto px-0  md:px-4  sm:px-6  lg:max-w-7xl lg:px-8   flex flex-col ">


        <h2 className="sr-only">Products</h2>

        {

          (productCategory && productCategory.length > 0)

            ?

            productCategory.map((element, i) => {

              return (

                <Fragment key={i}>

                  <p className="pt-10 capitalize text-2xl font-bold pl-2 underline">{element}</p>

                  <div className="h-96 flex flex-wrap flex-col overflow-y-hidden overflow-x-auto my-2  pb-3 ">

                    {
                      (products.length > 0)
                        ?

                        products.filter((item) => {
                          if (item.category === element) {
                            return item;
                          }
                        })
                          .map((product, i) => (
                            <SingleProduct product={product} key={i} />
                          ))

                        : <h1>Getting data , Place skeleton here </h1>
                    }


                  </div>

                </Fragment>
              )

            })





            :

            "Category getting "

        }













      </div>






















    </div>
  )
}







