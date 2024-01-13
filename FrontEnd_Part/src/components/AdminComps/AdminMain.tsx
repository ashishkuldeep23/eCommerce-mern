

// import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { userState } from "../../Slices/UserSlice"
// import { useEffect } from "react"
import { Navigate } from "react-router-dom"

const AdminMain = () => {

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const isUserAdmin = userState().userData.role

    const isLoading = userState().isLoading

    // console.log(isUserAdmin)



    // // // If user in not admin then redirect on home page ------>
    if (isLoading && isUserAdmin !== "admin") {

        return <Navigate to="/"  ></Navigate>;
    }



    return (
        <>

            <div className={`${!themeMode ? "bg-white text-gray-700" : "bg-black text-gray-100"} transition-all`}  >

                <div className="lg:max-w-7xl lg:px-8 md:px-4 sm:px-6 mx-auto py-10 px-1.5 flex flex-col justify-center items-center ">

                    <div>
                        <p className=" text-center text-5xl mb-5 underline font-bold">Admin page</p>
                    </div>

                    {/* Create new product */}
                    <CreateNewProduct />



                </div>

            </div>

        </>

    )
}

export default AdminMain









import { useForm, SubmitHandler } from "react-hook-form"
import { IProduct } from "../ProductListing/ProductLists"
import { useEffect, useState } from "react"
import { adminDataState, createNewProduct } from "../../Slices/adminSlice"



// // // This is how single type look like -->
type TypeObj = {
    typeName: string[];
    typeVerity: string[];
    typeStock: number;
    typePrice: number,
}



// // // This form data will hold inputs ---->
const formData = new FormData()

// // // // Added date and time first --->
// formData.set("whenCreted", `${new Date()}`)



// // // Omit is the key word that we can use to change the feild value type in extended interface ----> (Very improtant)

interface NewProductInput extends Omit<IProduct, 'type'> {
    type: TypeObj[],
    thumbnailIndex: number,
    imageInputBy: string,
    whenCreted: string,
}



function CreateNewProduct() {

    const isLoading = adminDataState().isLoading

    const dispatch = useDispatch<AppDispatch>()

    const themeMode = useSelector((state: RootState) => state.themeReducer.mode)

    const { register, handleSubmit, formState: { errors }, setValue, getValues, setError } = useForm<NewProductInput>()

    const allCategories = useSelector((state: RootState) => state.allProductWithCatReducer.filterAllCateory)

    // Button that to show feilds ---->
    const [pluscategory, setPlusCategory] = useState(false)

    const [plusCategoryInput, setPlusCategoryInput] = useState<{ typing: string, added: string }>({ typing: "", added: "" })


    // // // Discroption useState ---->

    const [productHighlight, setProductHighlight] = useState("")

    const [productSpecs, setProductSpecs] = useState("")

    const [productDimen, setProductDimen] = useState("")

    const [productDetailOfDes, setProductDetailOfDes] = useState("")

    // // // Options state variables ----->

    const [productOption, setProductOption] = useState("")

    // // // Image Input types --->

    const [imageInputBy, setImageInputBy] = useState<"by_url" | "by_image">("by_url")

    // // // All URL of images input --->

    // const [allImgUrls, setAllImgUrls] = useState<{ url: string, id: number }[]>([])

    // // // Input Image :  BY url --->
    const [allImgUrls, setAllImgUrls] = useState<string>('')


    // // // ALl input images ---->
    // // // Input Image : By actual image --->
    const [allInputImagesUrl, setAllInputImagesUrl] = useState<any[]>([])


    const [thumbnailIndex, setThumbnailIndex] = useState<number>(-1)


    function categoryOnChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        e.stopPropagation();
        e.preventDefault();


        console.log(e.target.value)

        // let category = e.target.value


        if (e.target.value === "plus") {
            setPlusCategory(true)
        } else {
            setPlusCategory(false)
        }

        setValue("category", `${e.target.value}`)


    }


    // // // Below fn is used to formate 3 things --> (Specification of product , Dimention of product and Product_detail of product )
    function makeActualValueFormate(text: string): { [x: string]: string; }[] {


        let arrByComma = text.split(",")

        // console.log(arrByComma)


        let showThisArr = []


        for (let key of arrByComma) {

            // console.log(key)

            // // here semicolon is used to seprate the values ---->

            if (key) {


                let arrWithBothData = key.split(";")

                // console.log(arrWithBothData)

                if (arrWithBothData.length >= 0) {

                    let actualObject = { [arrWithBothData[0]?.trim()]: arrWithBothData[1]?.trim()?.replaceAll(" ", ",") }

                    // // // Here replacing space to comma in value 
                    // // // Here i have faced a typescript err and solved by changing value in tsconfig (lib : [ES2021]) now used from ES2020 

                    // console.log(actualObject)

                    showThisArr.push(actualObject)
                }

            }

        }

        // console.log(showThisArr)

        return showThisArr
    }


    // // // Below fn will make option of product --->
    function makeTypesOfProductFormate(text: string): TypeObj[] {

        // // // coming text ---> "typeName;color white|typeVerity;processor i3|typeStock;90|typePrice;100,"

        let arrByComma = text.split(",")

        // console.log(arrByComma)



        let showThisArr: TypeObj[] = []






        for (let key1 of arrByComma) {


            // // // key = 'typeName;color white|typeVerity;processor i3|typeStock;90|typePrice;100'

            // console.log(key)

            // // here semicolon is used to seprate the values ---->

            if (key1) {


                let arrWithBothData = key1.split("|")


                // // // arrWithBothData = [typeName;color white , typeVerity;processor i3 , typeStock;90 , typePrice;100 ]

                // console.log(arrWithBothData)

                // if (arrWithBothData.length >= 0) {

                //     let actualObject = { [arrWithBothData[0]?.trim()]: arrWithBothData[1]?.trim()?.replaceAll(" ", ",") }

                //     // // // Here replacing space to comma in value 
                //     // // // Here i have faced a typescript err and solved by changing value in tsconfig (lib : [ES2021]) now used from ES2020 

                //     // console.log(actualObject)

                //     showThisArr.push(actualObject)
                // }



                let typeObj: TypeObj = {
                    typeName: [''],
                    typeVerity: [''],
                    typeStock: 0,
                    typePrice: 0,
                }



                for (let key2 of arrWithBothData) {

                    // // key2 = typeName;color white


                    let typeKeyArr = key2.split(";")

                    switch (typeKeyArr[0]) {
                        case "typeName":
                            typeObj[typeKeyArr[0]] = typeKeyArr[1].split(" ")
                            break;
                        case "typeVerity":
                            typeObj[typeKeyArr[0]] = typeKeyArr[1].split(" ")
                            break;
                        case "typeStock":
                            typeObj[typeKeyArr[0]] = +(typeKeyArr[1])
                            break;
                        case "typePrice":
                            typeObj[typeKeyArr[0]] = +(typeKeyArr[1])
                            break;

                        default:
                            break;
                    }


                }


                showThisArr.push(typeObj)




            }

        }

        // console.log(showThisArr)

        return showThisArr

    }


    // // // Onchange handler of Actual image ---->
    function imgOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        e.stopPropagation();
        e.preventDefault();

        // // Show image arr --->
        if (e.target.files) {

            let arrOfAllInput = []

            for (let i = 0; i < e?.target?.files.length; i++) {

                let file = e?.target?.files[i]

                // // // Crate URl with actual images --->
                arrOfAllInput.push(URL.createObjectURL(file))

                if (i >= 4) break

            }

            setAllInputImagesUrl(arrOfAllInput)

        }

        // // // Send image to backend
        if (e?.target?.files) {

            // formData.append("file" , e?.target?.files[0])

            // // // If any image already present then delete it.
            formData.delete("file");


            for (let i = 0; i < e?.target?.files.length; i++) {
                const file = e.target.files[i]
                formData.append("file", file)

                if (i >= 4) break

            }

        }

    }



    // // // Input type change handler --->
    function imageTyepChangehandler(set: "by_url" | "by_image") {

        setImageInputBy(`${set}`)

        // // Back to normal input data -->
        setAllInputImagesUrl([])
        setAllImgUrls("")

        // // // ThumbNial index backto normail 
        setThumbnailIndex(-1)
    }



    const onSubmit: SubmitHandler<NewProductInput> = (data) => {


        // // // Validation for discription --->

        if (!productHighlight) {
            setError("description.highLights", { type: "manual", message: "Give Highlights of product." })
        } else {
            setValue('description.highLights', productHighlight.split(","))
        }


        if (!productSpecs) {
            setError("description.specifications", { type: "manual", message: "Give specification of product." })
        } else {
            setValue("description.specifications", makeActualValueFormate(productSpecs))
        }



        if (!productDimen) {
            setError('description.dimensions', { type: "manual", message: "Give Dimentions of product." })
        } else {
            setValue("description.dimensions", makeActualValueFormate(productDimen))
        }



        if (!productDetailOfDes) {
            setError("description.product_Details", { type: "manual", message: "Give product details of product." })
        } else {
            setValue("description.product_Details", makeActualValueFormate(productDetailOfDes))
        }



        if (!productOption) {
            setError("type", { type: "manual", message: "Give options of the product (Very carefully)." })
        } else {
            setValue("type", makeTypesOfProductFormate(productOption))
        }


        // // // Image validation (And also set thumbnail value also) (And ) ---->
        if (allImgUrls.length === 0 && allInputImagesUrl.length === 0) {
            setError('images', { type: "manual", message: "Give images of product." })
        }


        // // Set thumbnail index ---->
        if (thumbnailIndex === -1) {

            setValue("thumbnailIndex", 0)

        } else {

            setValue("thumbnailIndex", thumbnailIndex)

        }

        // // set type of url ---->
        setValue("imageInputBy", imageInputBy)

        // // // Set when created --->
        setValue("whenCreted", `${new Date()}`)

        // // // Set images ---->

        if (imageInputBy === "by_url") {
            setValue('images', allImgUrls.split(","))

            // // // Don't send image to backend
            formData.delete("file");
        }




        // // Now all input done ------->
        if (Object.keys(errors).keys.length > 0) {
            alert("An error in input.")
        }



        // // // Check the cateory value comming in data (Catch and check category value.) ---->
        if (data.category === "plus") {
            // alert("Do .........")


            if(!plusCategoryInput.added){
                alert("If you want to add new category then give name of category and press add btn.")
            }

        }


        console.log(data)

        // return


        for (let key of Object.keys(data)) {


            // console.log(key)


            formData.set(`${[key]}`, `${JSON.stringify(data[key as keyof NewProductInput])}`)


        }


        // console.log("Now display as in form --->")
        // // Display the key/value pairs
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }


        // // Now call dispatch ---->

        dispatch(createNewProduct(formData))

    }


    console.log(errors)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])



    return (

        <>

            {/* Loading ----> */}
            <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100">
                {
                    isLoading
                    &&
                    <div role="status">
                        <svg aria-hidden="true" className="inline w-20 h-20  animate-spin fill-red-600 opacity-100 " viewBox="0 0 100 101" fill="none" >
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                }
            </div>

            <div className={` w-full smm:w-10/12 sm:w-3/4 md:w-3/5 my-5 py-2 px-1.5 rounded border ${themeMode ? "bg-fuchsia-950 border-white" : "bg-fuchsia-200 border-black"}`}>

                <p className=" text-center my-1 text-lg underline ">Create new product</p>


                <form noValidate={true} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    {/*name and barnd of Product  */}
                    <div className=" flex flex-wrap justify-stretch">


                        <div className=" w-full sm:w-1/2 px-0.5">
                            <label htmlFor="title_product" className="block text-sm font-medium leading-6 ">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title_product"
                                    // name="email"
                                    type="text"
                                    placeholder="Title of Product"
                                    // autoComplete="email"
                                    // required={true}
                                    {...register("title", { required: "Email is Required" })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.title?.message} </p>

                            </div>
                        </div>

                        <div className=" w-full sm:w-1/2 px-0.5">
                            <label htmlFor="brand_product" className="block text-sm font-medium leading-6 ">
                                Brand
                            </label>
                            <div className="mt-2">
                                <input
                                    id="brand_product"
                                    type="text"
                                    placeholder="Brand of Product"
                                    // autoComplete="email"
                                    // required={true}
                                    {...register("brand", { required: "Email is Required" })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.brand?.message} </p>

                            </div>
                        </div>


                    </div>


                    {/* Price , discount and category of product --> */}
                    <div className=" flex flex-wrap justify-between items-start">

                        {/* Price ---> */}
                        <div className=" w-full sm:w-1/2 md:w-1/3 px-0.5">

                            <label htmlFor="price_product" className="block text-sm font-medium leading-6 ">
                                Price
                            </label>

                            <div className="mt-2">
                                <input
                                    id="price_product"
                                    // name="email"
                                    type="number"
                                    placeholder="Price of Product"
                                    // autoComplete="email"
                                    // required={true}
                                    {...register("price", { required: "Price is Required" })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.price?.message} </p>

                            </div>

                        </div>

                        {/* Discount ---> */}
                        <div className=" w-full sm:w-1/2 md:w-1/3 px-0.5">

                            <label htmlFor="discount_product" className="block text-sm font-medium leading-6 ">
                                Discount
                            </label>

                            <div className="mt-2">
                                <input
                                    id="discount_product"
                                    // name="email"
                                    type="number"
                                    placeholder="Discount on Product in persent"
                                    // autoComplete="email"
                                    // required={true}
                                    // // // Not more then 100 and not less then 0
                                    {...register("discountPercentage", { required: "Discount is Required" })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.discountPercentage?.message} </p>

                            </div>

                        </div>

                        {/* category all code ---> */}
                        <div className=" w-full md:w-1/3 px-0.5 flex flex-col items-end justify-end ml-auto">

                            <label htmlFor="category_product" className="block text-sm font-medium leading-6 mb-2 mr-10 ">
                                Category
                            </label>

                            <select
                                onChange={(e) => categoryOnChangeHandler(e)}
                                // {...register("category", { required: "Category is Required" })}
                                className=" text-black font-bold rounded capitalize py-1"
                                name="" id="category_product"
                            >

                                {
                                    allCategories.length
                                    &&
                                    allCategories.map((category, i) => {
                                        return (
                                            <option
                                                // {...register("category", { required: "Category is Required" })}
                                                key={i}
                                                className="capitalize"
                                                value={`${category}`}
                                            >{category}</option>
                                        )
                                    })
                                }



                                {/* Plus option for new category -----> */}

                                <option
                                    value="plus"
                                    onClick={()=>{setPlusCategory(true)}}
                                // onClick={()=>setPlusCategory(true)}
                                // {...register("category", { required: "Category is Required" })}
                                >+Plus</option>


                            </select>


                            {/* Add new category All code ----> */}


                            {

                                pluscategory

                                &&

                                <div className=" flex flex-col flex-wrap items-end justify-end" >

                                    {/*value get this input ---> */}
                                    <input
                                        id="category_product" type="text"
                                        placeholder="New category"
                                        className={`block rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        value={plusCategoryInput.typing}
                                        onChange={(e) => {
                                            // console.log(plusCategoryInput);
                                            setPlusCategoryInput({ ...plusCategoryInput, typing: e.target.value });
                                        }}
                                    />

                                    <div>
                                        {
                                            plusCategoryInput.added
                                            &&
                                            <p style={{ lineBreak: "anywhere", textAlign: "center" }} className="mx-2">Fill out the rest of form, new category will be created with product creation.</p>
                                        }
                                    </div>

                                    <div className=" flex items-center">

                                        {
                                            plusCategoryInput.added
                                            &&
                                            <p style={{ lineBreak: "anywhere" }} className="mx-2">Category : {plusCategoryInput.added}</p>
                                        }

                                        <button
                                            className="border h-full py-2 px-1 rounded"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setPlusCategoryInput({ typing: "", added: plusCategoryInput.typing });
                                                setValue("category" , `${plusCategoryInput.typing}`)
                                            }}
                                        >Add category</button>

                                    </div>

                                </div>

                            }


                            <p className="text-sm pl-2 text-red-500 font-bold"> {errors.category?.message} </p>




                        </div>

                    </div>


                    {/* description of product */}
                    <div>


                        {/* Full name */}
                        <div className=" w-full px-0.5">
                            <label htmlFor="fullName_product" className="block text-sm font-medium leading-6 ">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="fullName_product"
                                    // name="email"
                                    type="text"
                                    placeholder="Full Name of Product"
                                    // autoComplete="email"
                                    // required={true}
                                    // // // This feild should default by title by can be overwrite --->
                                    {...register("description.fullName", { required: "Full name is Required" })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                />
                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.description?.fullName?.message} </p>

                            </div>
                        </div>


                        {/* Aboult product --> */}

                        <div className=" w-full px-0.5 mt-3">
                            <label htmlFor="About_product" className="block text-sm font-medium leading-6 ">
                                About Product
                            </label>
                            <div className=" mt-2">

                                <textarea

                                    id="About_product"
                                    rows={5}
                                    style={{ resize: "none" }}
                                    placeholder="Write short descriptin about product. Explain your product."

                                    {...register("description.aboutProduct", { required: "About of Required" })}

                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                ></textarea>

                                <p className="text-sm pl-2 text-red-500 font-bold"> {errors.description?.aboutProduct?.message} </p>
                            </div>

                        </div>


                        {/* Highlights  */}
                        <div className=" w-full px-0.5 mt-3">
                            <label htmlFor="highlight_product" className="block text-sm font-medium leading-6 ">
                                Highlight
                            </label>
                            <div className="mt-2">
                                <input
                                    id="highlight_product"
                                    // name="email"
                                    type="text"
                                    placeholder="Some highlight points about product. (Seprated by comma)"
                                    // autoComplete="email"
                                    // required={true}
                                    // // // This feild should default by title by can be overwrite --->
                                    // {...register("description.highLights", { required: "Highlight is Required" })}
                                    className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}

                                    value={productHighlight}
                                    onChange={
                                        (e) => { setProductHighlight(e.target.value) }
                                    }

                                />
                                <p>Give multiple highlights about product seprated by comma(,)</p>

                            </div>

                            <ul className=" list-disc list-inside marker:text-sky-400 flex flex-wrap justify-center">
                                {
                                    productHighlight.split(",").length > 0
                                    &&
                                    productHighlight.split(",").map((ele, i) => {
                                        return <li key={i} className=" mx-0.5">{ele},</li>
                                    })
                                }
                            </ul>



                        </div>

                        {/* Discription of product ---> */}
                        <div className=" flex flex-wrap flex-col md:flex-row">

                            <p className="bg-red-300 px-2 mt-5 rounded" style={{ lineBreak: "anywhere" }}> <span className=" underline">NOTE</span> : Value give in this (width;5mm,height;5mm,length;5mm) formate. key value pair seprate by semicolon(;) and next item seprate by comma(,)</p>



                            {/* Specifications */}
                            <div className=" w-full md:w-1/2 px-0.5 mt-3">
                                <label htmlFor="specifications_product" className="block text-sm font-medium leading-6 ">
                                    Specifications
                                </label>
                                <div className="mt-2 flex flex-col">


                                    <div className="flex flex-col">

                                        <div >
                                            <input
                                                id="specifications_product"
                                                value={productSpecs}
                                                onChange={(e) => { setProductSpecs(e.target.value) }}
                                                // name="email"
                                                type="text"
                                                placeholder="Specifications of Product (width;5mm,height;5mm,length;5mm) use this formate."
                                                // autoComplete="email"
                                                // required={true}
                                                // // // This feild should default by title by can be overwrite --->
                                                // {...register("description.dimensions", { required: "Full name is Required" })}
                                                className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                            />
                                            <p className="text-sm pl-2 text-red-500 font-bold"> {errors.description?.specifications?.message} </p>

                                        </div>


                                        <div>
                                            {
                                                (makeActualValueFormate(productSpecs).length > 0)
                                                    ?


                                                    makeActualValueFormate(productSpecs).map((ele, i) => {
                                                        return (
                                                            <p key={i}>👉{`${Object.keys(ele)} - ${Object.values(ele)}`}</p>
                                                        )
                                                    })

                                                    :
                                                    <div>
                                                        <p className="text-sm pl-5 font-medium">Value will convert like :-</p>
                                                        <p >👉{`Pack of - 1`}</p>
                                                        <p >👉{`Designed by - Brand`}</p>
                                                    </div>
                                            }
                                        </div>



                                    </div>



                                </div>

                                <p>{errors.description?.specifications?.message}</p>

                            </div>



                            {/* dimensions */}
                            <div className="  w-full md:w-1/2 px-0.5 mt-3">
                                <label htmlFor="dimenstions" className="block text-sm font-medium leading-6 ">
                                    Dimenstions
                                </label>
                                <div className="mt-2 flex flex-col">

                                    <div>
                                        <input
                                            id="dimenstions"
                                            value={productDimen}
                                            onChange={(e) => { setProductDimen(e.target.value) }}
                                            // name="email"
                                            type="text"
                                            placeholder="Dimentions of Product (width;5mm,height;5mm,length;5mm) use this formate."
                                            // autoComplete="email"
                                            // required={true}
                                            // // // This feild should default by title by can be overwrite --->
                                            // {...register("description.dimensions", { required: "Full name is Required" })}
                                            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        />
                                        <p className="text-sm pl-2 text-red-500 font-bold"> {errors.description?.dimensions?.message} </p>

                                    </div>


                                    <div>
                                        {
                                            (makeActualValueFormate(productDimen).length > 0)
                                                ?


                                                makeActualValueFormate(productDimen).map((ele, i) => {
                                                    return (
                                                        <p key={i}>👉{`${Object.keys(ele)} - ${Object.values(ele)}`}</p>
                                                    )
                                                })

                                                :
                                                <div>
                                                    <p className="text-sm pl-5 font-medium">Value will convert like :-</p>
                                                    <p >👉{`Width - 61mm`}</p>
                                                    <p >👉{`Height - 183mm`}</p>
                                                </div>
                                        }
                                    </div>



                                </div>

                            </div>



                            {/* Products Details ---> */}
                            <div className="  w-full md:w-1/2 px-0.5 mt-3">
                                <label htmlFor="dimenstions" className="block text-sm font-medium leading-6 ">
                                    Product Details
                                </label>
                                <div className="mt-2 flex flex-col">

                                    <div>
                                        <input
                                            id="dimenstions"
                                            value={productDetailOfDes}
                                            onChange={(e) => { setProductDetailOfDes(e.target.value) }}
                                            // name="email"
                                            type="text"
                                            placeholder="Dimentions of Product (width;5mm,height;5mm,length;5mm) use this formate."
                                            // autoComplete="email"
                                            // required={true}
                                            // // // This feild should default by title by can be overwrite --->
                                            // {...register("description.dimensions", { required: "Full name is Required" })}
                                            className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                        />
                                        <p className="text-sm pl-2 text-red-500 font-bold"> {errors.description?.product_Details?.message} </p>

                                    </div>


                                    <div>
                                        {
                                            (makeActualValueFormate(productDetailOfDes).length > 0)
                                                ?


                                                makeActualValueFormate(productDetailOfDes).map((ele, i) => {
                                                    return (
                                                        <p key={i}>👉{`${Object.keys(ele)} - ${Object.values(ele)}`}</p>
                                                    )
                                                })

                                                :
                                                <div>
                                                    <p className="text-sm pl-5 font-medium">Value will convert like :-</p>
                                                    <p >👉{`Ideal For - Men, Women, Kids`}</p>
                                                    <p >👉{`Shape - Rectangular`}</p>
                                                </div>
                                        }
                                    </div>



                                </div>

                            </div>


                        </div>


                    </div>


                    {/* Option of product ----> */}
                    <div className=" w-full px-0.5 mt-3">


                        <p className="bg-red-300 px-2 mt-5 rounded" style={{ lineBreak: "anywhere" }} ><span className=" uppercase underline">Note</span>: Value of option should be (  <span className=" font-bold underline">typeName;color white|typeVerity;processor i3|typeStock;90|typePrice;100,</span>  ) or copy and paste left formate and edit the value.
                            <span className=" font-semibold"> Be careful during setting the option </span> <span className=" font-bold">Because user only able to order that option.</span></p>


                        <label htmlFor="option_product" className="block text-sm font-medium leading-6 mt-2 ">
                            Option of Products
                        </label>
                        <div className="mt-2 flex flex-col">


                            <div className="flex flex-col">

                                <div >
                                    <input
                                        id="option_product"
                                        value={productOption}
                                        onChange={(e) => { setProductOption(e.target.value) }}
                                        // name="email"
                                        type="text"
                                        placeholder="Options of Product (  typeName;color white|typeVerity;processor i3|typeStock;90|typePrice;100  ) use this formate."
                                        // autoComplete="email"
                                        // required={true}
                                        // // // This feild should default by title by can be overwrite --->
                                        // {...register("description.dimensions", { required: "Full name is Required" })}
                                        className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                    />
                                    <p className="text-sm pl-2 text-red-500 font-bold"> {errors.type?.message} </p>

                                </div>


                                <div>
                                    {
                                        (makeTypesOfProductFormate(productOption).length > 0)
                                            ?


                                            makeTypesOfProductFormate(productOption).map((item, i) => {
                                                return (
                                                    <p key={i}>👉{

                                                        `${item.typeName[0]} :  ${item.typeName[1]} | ${item.typeVerity[0]} : ${item.typeVerity[1]} | Stocks : ${item.typeStock} | Price : ₹${(Math.round(item.typePrice - ((+(getValues("discountPercentage")) * item.typePrice) / 100)))}`

                                                    }</p>
                                                )
                                            })

                                            :
                                            <div>
                                                <p className="text-sm pl-5 font-medium">Value will convert like :-</p>
                                                <p >👉color : white | processor : i3 | Stocks : 90 | Price : ₹100</p>
                                                <p >👉color : white | processor : i3 | Stocks : 90 | Price : ₹100</p>

                                            </div>
                                    }
                                </div>



                            </div>


                        </div>

                    </div>


                    {/* Image Div -----> */}
                    <div className=" w-full">

                        {/* Image type input y radio ----> */}
                        <div className={` border-b mx-5 sm:mx-10 md:mx-20 flex items-center justify-around ${themeMode ? " border-white" : "border-black"}`}>

                            <div
                                className="  flex items-center"
                            >
                                <input
                                    type="radio"
                                    name="img_type"
                                    id='by_image'
                                    value={imageInputBy}
                                    onChange={() => { imageTyepChangehandler("by_image") }}
                                    onClick={() => { imageTyepChangehandler("by_image") }}
                                />
                                <label
                                    htmlFor="by_image"
                                    className={`pl-0.5 font-bold hover:cursor-pointer ${imageInputBy === "by_image" && "scale-125 underline ml-1 text-yellow-500"} `}
                                    onClick={() => { imageTyepChangehandler("by_image") }}
                                >Image</label>

                            </div>

                            {/* <p>{imageInputBy}</p> */}

                            <div
                                className=" flex items-center"

                            >
                                <input
                                    type="radio"
                                    name="img_type"
                                    id='by_url'
                                    value={imageInputBy}
                                    onChange={() => { imageTyepChangehandler("by_url") }}
                                    onClick={() => { imageTyepChangehandler("by_url") }}
                                    checked
                                />
                                <label
                                    htmlFor="by_url"
                                    className={`pl-0.5 font-bold hover:cursor-pointer  ${imageInputBy === "by_url" && "scale-125 underline ml-2 text-yellow-500"}`}
                                    onClick={() => { imageTyepChangehandler("by_url") }}
                                >URL</label>

                            </div>

                        </div>


                        {/* Actual Image input div ---> */}

                        <div className=" w-full py-1 px-1 sm:px-5 md:px-14 flex justify-center items-center ">

                            {
                                imageInputBy === "by_url"
                                    ?
                                    // // // BY URL ---->
                                    <div className=" flex flex-col items-center">

                                        <h1 className=" underline">By URL link </h1>

                                        {/* URL Link  1 */}

                                        <p>Give multiple image urls seprated by comma(,)</p>


                                        <div

                                            className={` my-1 flex `}

                                        >
                                            <label
                                                htmlFor={`image_input_urls`}
                                                className={`mx-1 border p-1 rounded font-semibold ${themeMode ? " border-white" : "border-black"}`}
                                            >URLs:</label>
                                            <input

                                                value={allImgUrls}
                                                onChange={
                                                    (e) => { setAllImgUrls(e.target.value) }
                                                }
                                                type="text" name="" id={`image_input_urls`}
                                                className={`rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                                            />
                                        </div>




                                        <ul className=" list-disc list-inside marker:text-sky-400 flex flex-wrap justify-center">

                                            {
                                                allImgUrls.split(",").length > 0
                                                &&
                                                allImgUrls.split(",").map((ele, i) => {

                                                    return <li key={i} className=" mx-0.5">{ele},</li>
                                                })

                                            }

                                        </ul>

                                        {/* Show all images ---> Experiment  */}
                                        <div className=" flex flex-wrap justify-center">
                                            {
                                                allImgUrls.split(",").length > 0
                                                &&
                                                allImgUrls.split(",").map((ele, i) => {

                                                    return (
                                                        <img
                                                            className={`rounded m-0.5 object-contain hover:cursor-pointer  ${allImgUrls.split(",").length > 1 && 'h-56 '} `}
                                                            src={ele}
                                                            alt={ele}
                                                            key={i}
                                                            onClick={(e) => { e.stopPropagation(); setThumbnailIndex(i) }}
                                                        />
                                                    )
                                                })

                                            }
                                        </div>


                                    </div>

                                    :
                                    // // // BY Image ---->
                                    <div>

                                        <h1 className=" underline text-center">By Actual Image </h1>
                                        <div className=" flex flex-col items-center">



                                            <input
                                                className='rounded-full my-1'
                                                type="file"
                                                name=""
                                                accept="image/png, image/png, image/jpeg"
                                                id="change_img"
                                                multiple={true}
                                                onChange={(e) => { imgOnChangeHandler(e) }}
                                            />


                                            <div >
                                                <label htmlFor="change_img" className='text-green-500'>Give images of Product (Min : 1 and Max : 5) </label>
                                            </div>

                                        </div>



                                        <div  >
                                            {
                                                allInputImagesUrl.length > 0
                                                    ?
                                                    <>
                                                        <p className=" text-center"> Click on image to select thumbnail image.</p>

                                                        <div className=" flex flex-wrap justify-center">

                                                            {
                                                                allInputImagesUrl.map((ele, i) => {
                                                                    return (
                                                                        <img
                                                                            key={i}
                                                                            src={ele}
                                                                            alt=""
                                                                            className=" rounded m-0.5 h-56 object-contain hover:cursor-pointer"
                                                                            onClick={(e) => { e.stopPropagation(); setThumbnailIndex(i) }}
                                                                        />
                                                                    )
                                                                })

                                                            }
                                                        </div>


                                                    </>



                                                    :
                                                    <p>Choose some image files, and see preview.</p>
                                            }
                                        </div>


                                    </div>

                            }

                        </div>


                        {/* Thumbmail image ----> */}
                        <div>
                            {
                                thumbnailIndex !== -1
                                    ?

                                    (imageInputBy === "by_url"
                                        ?


                                        <div className=" flex flex-col items-center">
                                            <p className=" font-semibold underline">Thumbnail Image👇</p>
                                            <img className={`rounded  h-72 object-contain`} src={allImgUrls.split(",")[thumbnailIndex]} alt="" />
                                            <p>{allImgUrls.split(",")[thumbnailIndex]}</p>
                                        </div>

                                        :

                                        <div className=" flex flex-col items-center">
                                            <p className=" font-semibold underline">Thumbnail Image👇</p>
                                            <img className={`rounded  h-72 object-contain`} src={allInputImagesUrl[thumbnailIndex]} alt="" />
                                            <p>{allInputImagesUrl[thumbnailIndex]}</p>
                                        </div>)

                                    :

                                    (<p className=" overline">Give image and Select thumbnail image otherwise 0th image will be thumbnail of product.</p>)
                            }
                        </div>


                        <p className="text-sm pl-2 text-red-500 font-bold text-center"> {errors.images?.message} </p>


                    </div>

                    {/* Create New product button ----> */}
                    <div>

                        <p className=" text-center underline font-semibold my-1">NOTE : Read carefully all the gievn inputs.(Specially Discription of product and option for product.)</p>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Create new product
                        </button>
                    </div>
                </form>



            </div>

        </>

    )

}









