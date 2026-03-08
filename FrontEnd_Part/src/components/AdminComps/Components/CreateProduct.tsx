import { useForm, SubmitHandler } from "react-hook-form";
// import { IProduct } from "../ProductListing/ProductLists";
import { useEffect, useState } from "react";
// import {
//    adminDataState,
//    createNewProduct,
//    setUpdatingProduct,
//    updateProductAdmin,
// } from "../../Slices/AdminSliceFile";
// import AllProducts from "./AllProducts"
// import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
// import { LoaderCircle } from "../LoaderCircle/LoaderCircle";
// import { Entry, NewProductInput, OptionInterface } from "../../Type/type";
// import ProductOptionForm from "./Comps/ProductType";
// import { newEntry, newOption } from "../../Helper/helper";
import { toast } from "sonner";
import { adminDataState, createNewProduct, setUpdatingProduct, updateProductAdmin } from "../../../Slices/AdminSliceFile";
import { AppDispatch, RootState } from "../../../store";
import { Entry, NewProductInput, OptionInterface } from "../../../Type/type";
import { newEntry, newOption } from "../../../Helper/helper";
import { LoaderCircle } from "../../LoaderCircle/LoaderCircle";
import StringArrayFormApp from "./DivUsedInCommaSeprated";
import KeyValueFormApp from "./KeyValueDiv";
import ProductOptionForm from "./ProductType";
// import KeyValueFormApp from "./Comps/KeyValueDiv";
// import StringArrayFormApp from "./Comps/DivUsedInCommaSeprated";

// // // This form data will hold inputs ---->
const formData = new FormData();

// // // // Added date and time first --->
// formData.set("whenCreted", `${new Date()}`)

// // // Omit is the key word that we can use to change the feild value type in extended  ----> (Very improtant)

function CreateNewProduct() {
   const isLoading = adminDataState().isLoading;

   const dispatch = useDispatch<AppDispatch>();

   const themeMode = useSelector((state: RootState) => state.themeReducer.mode);

   // // // Update product states --->

   const { updatingProduct, newProduct } = adminDataState();

   // // // From state var --->
   const {
      register,
      handleSubmit,
      formState,
      setValue,
      getValues,
      setError,
      reset,
      setFocus,
   } = useForm<NewProductInput>();

   const errors = formState.errors;

   const allCategories = useSelector(
      (state: RootState) => state.allProductWithCatReducer.filterAllCateory,
   );

   const allBrands = useSelector(
      (state: RootState) => state.allProductWithCatReducer.filterAllBrands,
   );

   // Category fields ---->
   const [pluscategory, setPlusCategory] = useState(false);
   const [plusCategoryText, setPlusCategoryText] = useState("");

   // Brand fields ---->
   const [plusBrand, setPlusBrand] = useState(false);
   const [plusBrandText, setPlusBrandText] = useState("");

   // // // Discroption useState ---->

   // const [productHighlight, setProductHighlight] = useState("");

   const [productSpecs, setProductSpecs] = useState("");

   const [productDimen, setProductDimen] = useState("");

   const [productDetailOfDes, setProductDetailOfDes] = useState("");

   // // // Options state variables ----->

   // const [productOption, setProductOption] = useState("");

   const [options, setOptions] = useState<OptionInterface[]>([newOption()]);

   // // // Image Input types --->

   const [imageInputBy, setImageInputBy] = useState<"by_url" | "by_image">(
      "by_url",
   );

   // const [allImgUrls, setAllImgUrls] = useState<{ url: string, id: number }[]>([])

   // // // ALl input images ---->
   // // // Input Image : By actual image --->
   const [allInputImagesUrl, setAllInputImagesUrl] = useState<any[]>([]);

   const [thumbnailIndex, setThumbnailIndex] = useState<number>(-1);

   // // // All URL of images input --->
   // // // Input Image :  BY url --->
   const [allImgUrls, setAllImgUrls] = useState<string[]>([""]);

   const [prodHighlightArr, setProductHighlightArr] = useState<string[]>([""]);

   const [specificationEntries, setSpecificationEntries] = useState<Entry[]>([
      newEntry(),
   ]);

   const [dimenstionsEntries, setDimenstionsEntries] = useState<Entry[]>([
      newEntry(),
   ]);

   const [productDetailsEntries, setProductDetailsEntries] = useState<Entry[]>([
      newEntry(),
   ]);

   function categoryOnChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
      e.stopPropagation();
      e.preventDefault();

      // console.log(e.target.value);

      // let category = e.target.value

      setPlusCategoryText(e.target.value);
      setValue("category", `${e.target.value}`);

      if (e.target.value === "plus") {
         setPlusCategory(true);
      } else {
         setPlusCategory(false);
      }

      // setValue("category", `${e.target.value}`);
   }

   function brandOnChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
      e.stopPropagation();
      e.preventDefault();

      // console.log(e.target.value);

      // let category = e.target.value

      setPlusBrandText(e.target.value);
      setValue("brand", `${e.target.value}`);

      if (e.target.value === "plus") {
         setPlusBrand(true);
      } else {
         setPlusBrand(false);
      }

      // setValue("category", `${e.target.value}`);
   }

   // // // Below fn is used to formate 3 things --> (Specification of product , Dimention of product and Product_detail of product )
   // function makeActualValueFormate(text: string): { [x: string]: string }[] {
   //    let arrByComma = text.split(",");

   //    // console.log(arrByComma)

   //    let showThisArr = [];

   //    for (let key of arrByComma) {
   //       // console.log(key)

   //       // // here semicolon is used to seprate the values ---->

   //       if (key) {
   //          let arrWithBothData = key.split(";");

   //          // console.log(arrWithBothData)

   //          if (arrWithBothData.length >= 0) {
   //             let actualObject = {
   //                [arrWithBothData[0]?.trim()]: arrWithBothData[1]
   //                   ?.trim()
   //                   ?.replaceAll(" ", ","),
   //             };

   //             // // // Here replacing space to comma in value
   //             // // // Here i have faced a typescript err and solved by changing value in tsconfig (lib : [ES2021]) now used from ES2020

   //             // console.log(actualObject)

   //             showThisArr.push(actualObject);
   //          }
   //       }
   //    }

   //    // console.log(showThisArr)

   //    return showThisArr;
   // }

   // // // Below fn will make option of product --->
   //   function makeTypesOfProductFormate(text: string): TypeObj[] {
   //     // // // coming text ---> "typeName;color white|typeVerity;processor i3|typeStock;90|typePrice;100,"

   //     if (!text) return [];

   //     let arrByComma = text.split(',');

   //     // console.log(arrByComma)

   //     let showThisArr: TypeObj[] = [];

   //     for (let key1 of arrByComma) {
   //       // // // key = 'typeName;color white|typeVerity;processor i3|typeStock;90|typePrice;100'

   //       // console.log(key1)

   //       // // here semicolon is used to seprate the values ---->

   //       if (key1) {
   //         let arrWithBothData = key1.split('|');

   //         // // // arrWithBothData = [typeName;color white , typeVerity;processor i3 , typeStock;90 , typePrice;100 ]

   //         // console.log(arrWithBothData)

   //         // if (arrWithBothData.length >= 0) {

   //         //     let actualObject = { [arrWithBothData[0]?.trim()]: arrWithBothData[1]?.trim()?.replaceAll(" ", ",") }

   //         //     // // // Here replacing space to comma in value
   //         //     // // // Here i have faced a typescript err and solved by changing value in tsconfig (lib : [ES2021]) now used from ES2020

   //         //     // console.log(actualObject)

   //         //     showThisArr.push(actualObject)
   //         // }

   //         let typeObj: TypeObj = {
   //           typeName: [''],
   //           typeVerity: [''],
   //           typeStock: 0,
   //           typePrice: 0,
   //         };

   //         for (let key2 of arrWithBothData) {
   //           // // key2 = typeName;color white

   //           let typeKeyArr = key2.split(';');

   //           switch (typeKeyArr[0]) {
   //             case 'typeName':
   //               typeObj[typeKeyArr[0]] = typeKeyArr[1].split(' ');
   //               break;
   //             case 'typeVerity':
   //               typeObj[typeKeyArr[0]] = typeKeyArr[1].split(' ');
   //               break;
   //             case 'typeStock':
   //               typeObj[typeKeyArr[0]] = +typeKeyArr[1];
   //               break;
   //             case 'typePrice':
   //               typeObj[typeKeyArr[0]] = +typeKeyArr[1];
   //               break;

   //             default:
   //               typeObj = typeObj;
   //               break;
   //           }
   //         }

   //         showThisArr.push(typeObj);
   //       }
   //     }

   //     // console.log(showThisArr)

   //     return showThisArr;
   //   }

   // // // Onchange handler of Actual image ---->
   function imgOnChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
      e.stopPropagation();
      e.preventDefault();

      // // Show image arr --->
      if (e.target.files) {
         // // // If any image already present then delete it. ---->
         // formData.delete("file");

         // // // This arr will hold the url of all input images and then set in state --->
         let arrOfAllInput = [];
         for (let i = 0; i < e?.target?.files.length; i++) {
            let file = e?.target?.files[i];

            // // // Crate URl with actual images --->
            arrOfAllInput.push(URL.createObjectURL(file));

            // // // now append file to formdata
            formData.append("file", file);

            if (i >= 4) break;
         }

         setAllInputImagesUrl(arrOfAllInput);
      }

      // // // Send image to backend
      // if (e?.target?.files) {
      //    // formData.append("file" , e?.target?.files[0])

      //    // // // If any image already present then delete it.
      //    formData.delete("file");

      //    for (let i = 0; i < e?.target?.files.length; i++) {
      //       const file = e.target.files[i];
      //       formData.append("file", file);

      //       if (i >= 4) break;
      //    }
      // }
   }

   // // // Input type change handler --->
   function imageTyepChangehandler(set: "by_url" | "by_image") {
      setImageInputBy(`${set}`);

      // // Back to normal input data -->
      setAllInputImagesUrl([]);
      setAllImgUrls([""]);

      // // // ThumbNial index backto normail
      setThumbnailIndex(-1);
   }

   // // // Below fn is used to handle create and update product ---->
   const onSubmit: SubmitHandler<NewProductInput> = (data) => {
      try {
         console.log("Data comming in submit handler ---> ", data);
         // // // Validation for discription --->

         if (!productSpecs) {
            setError("description.specifications", {
               type: "manual",
               message: "Give specification of product.",
            });
         }

         // else {
         //    setValue(
         //       "description.specifications",
         //       makeActualValueFormate(productSpecs),
         //    );
         // }

         if (!productDimen) {
            setError("description.dimensions", {
               type: "manual",
               message: "Give Dimentions of product.",
            });
         }

         // else {
         //    setValue(
         //       "description.dimensions",
         //       makeActualValueFormate(productDimen),
         //    );
         // }

         if (!productDetailOfDes) {
            setError("description.product_Details", {
               type: "manual",
               message: "Give product details of product.",
            });
         }

         // else {
         //    setValue(
         //       "description.product_Details",
         //       makeActualValueFormate(productDetailOfDes),
         //    );
         // }

         // if (!productOption) {
         //   setError('type', {
         //     type: 'manual',
         //     message: 'Give options of the product (Very carefully).',
         //   });
         // } else {
         //   setValue('type', makeTypesOfProductFormate(productOption));
         // }

         // // // check options of product ---->
         if (options.length === 0) {
            setError("type", {
               type: "manual",
               message: "Give options of the product (Very carefully).",
            });
         }

         // else {
         //    //   setValue('type', makeTypesOfProductFormate(options));
         //    // // check more ------------>>
         //    setValue("type", options);
         // }

         // // // Image validation (And also set thumbnail value also) (And ) ---->
         if (allImgUrls.length === 0 && allInputImagesUrl.length === 0) {
            setError("images", {
               type: "manual",
               message: "Give images of product.",
            });
         }

         // // // Set thumbnail index ---->
         // if (thumbnailIndex === -1) {
         //    setValue("thumbnailIndex", -1);
         // } else {
         //    setValue("thumbnailIndex", thumbnailIndex);
         // }

         // // // set type of url ---->
         // setValue("imageInputBy", imageInputBy);

         // // // // Set when created --->
         // setValue("whenCreted", `${new Date()}`);

         // // // // Set images ---->
         // if (imageInputBy === "by_url") {
         //    setValue("images", allImgUrls.split(","));

         //    // // // Don't send image to backend
         //    formData.delete("file");
         // }

         // // // Check the cateory value comming in data (Catch and check category value.) ---->
         // if (data.category === "plus") {
         //    // alert("Do .........")
         //    if (!plusCategoryInput.added) {
         //       alert(
         //          "If you want to add new category then give name of new category and then press add btn.",
         //       );
         //    } else {
         //       setValue("category", `${plusCategoryInput.added}`);
         //    }
         // }

         // // Now all input done ------->
         if (Object.keys(errors).keys.length > 0) {
            alert("An error in input.");
         }

         // console.log(data)

         // return
         // // // making every data in JSON string formate ----->
         for (let key of Object.keys(data)) {
            formData.set(
               `${[key]}`,
               `${JSON.stringify(data[key as keyof NewProductInput])}`,
            );
         }

         // console.log("Now display as in form --->")
         // // Display the key/value pairs
         // for (const pair of formData.entries()) {
         //     console.log(`${pair[0]}, ${pair[1]}`);
         // }

         // // // Check data have mandatory feilds or not ------>

         let { title, price, brand, category, description, type } = data;

         let {
            fullName,
            aboutProduct,
            highLights,
            specifications,
            product_Details,
            dimensions,
         } = description!;

         let checAllMandatoryFeilds =
            !title ||
            !price ||
            !brand ||
            !category ||
            !description ||
            !type ||
            !fullName ||
            !aboutProduct ||
            !highLights ||
            !specifications ||
            !product_Details ||
            !dimensions;

         if (checAllMandatoryFeilds) {
            console.log(checAllMandatoryFeilds);
            return alert("All mandatory feilds shoud given.");
         }

         // // Now call dispatch ---->

         if (!updatingProduct) {
            dispatch(createNewProduct(formData));
         } else {
            // console.log(data)

            formData.set("whatUpadte", "allUpdate");
            formData.set("productId", `${data.id}`);

            dispatch(updateProductAdmin(formData));
         }
      } catch (error) {
         if (error instanceof Error) {
            toast.error(error.message);
         } else {
            toast.error("An unknown error occurred.");
         }
      } finally {
         // reset();
         resetFromAllFeilds();
      }
   };

   // // // This formate will convert from arr[objct] to str for input --->
   // function makeStrValFromCatSpecs(arr: object[]): string {
   //    // console.log(arr)
   //    // width;5mm,height;5mm,length;5mm
   //    let strFormate = "";

   //    for (let item of arr) {
   //       // console.log( Object.entries(item))

   //       let key = Object.entries(item)[0]
   //          ? Object.entries(item)[0][0].trim()
   //          : "null";

   //       let value = Object.entries(item)[0]
   //          ? Object.entries(item)[0][1].trim().replaceAll(",", " ")
   //          : "null";

   //       strFormate += `${key};${value},`;
   //    }

   //    // console.log(strFormate)

   //    return strFormate;
   // }

   // // // making options in str formate ---->
   //   function makeOptionFromate(arr: TypeObj[]): string {
   //     // typeName;color white|typeVerity;processor i3|typeStock;90|typePrice;100,

   //     // console.log(arr)

   //     let strFormate = '';

   //     for (let item of arr) {
   //       // console.log(item)
   //       // console.log(item.typeName)
   //       // console.log(item.typeVerity)
   //       // console.log(item.typePrice)
   //       // console.log(item.typeStock)

   //       strFormate += `typeName;${item.typeName[0]} ${item.typeName[1]}|typeVerity;${item.typeVerity[0]} ${item.typeVerity[1]}|typeStock;${item.typeStock}|typePrice;${item.typePrice},`;
   //     }

   //     // console.log(strFormate)

   //     return strFormate;
   //   }

   function resetFromAllFeilds() {
      reset(); // // Reset the feilds
      dispatch(setUpdatingProduct(false)); // // updatng product should be false

      // setProductHighlight("");
      setProductSpecs("");
      setProductDimen("");
      setProductDetailOfDes("");
      // setProductOption('');
      setOptions([newOption()]);
      setImageInputBy("by_url");
      setAllImgUrls([""]);
      setAllInputImagesUrl([]);
      setThumbnailIndex(-1);
      setProductHighlightArr([""]);
      setSpecificationEntries([newEntry()]);
      setDimenstionsEntries([newEntry()]);
      setProductDetailsEntries([newEntry()]);
      setOptions([newOption()]);
   }

   function resetFormByBtnClick() {
      let ask = confirm("Do you really want to reset Data??");

      if (!ask) return;
      else resetFromAllFeilds();
   }

   // // // // ------------------- At Update product here ------->
   useEffect(() => {
      // console.log("use effect ", newProduct)

      if (updatingProduct) {
         // // // Focus the title input when update product clicked
         setFocus("title", { shouldSelect: true });

         // // // You should provide some optional value during the setting value inside input feilds ----->
         // // Values are { shouldValidate: true, shouldDirty: true } as third parameter of setValue.

         setValue("brand", newProduct.brand, {
            shouldValidate: true,
            shouldDirty: true,
         });
         setValue("title", newProduct.title, {
            shouldValidate: true,
            shouldDirty: true,
         });
         setValue("price", newProduct.price, {
            shouldValidate: true,
            shouldDirty: true,
         });
         setValue("discountPercentage", newProduct.discountPercentage, {
            shouldValidate: true,
            shouldDirty: true,
         });
         setValue("category", newProduct.category, {
            shouldValidate: true,
            shouldDirty: true,
         });
         setValue("description.fullName", newProduct?.description?.fullName!, {
            shouldValidate: true,
            shouldDirty: true,
         });
         setValue(
            "description.aboutProduct",
            newProduct?.description?.aboutProduct!,
            {
               shouldValidate: true,
               shouldDirty: true,
            },
         );
         setValue("id", newProduct.id, {
            shouldValidate: true,
            shouldDirty: true,
         });

         // // // Now set the images and ThumNail------------>

         setImageInputBy("by_url");

         let allUrlsOfImage = newProduct.images.reduce(
            (acc, cur) => `${acc},${cur}`,
         );

         setAllImgUrls(allUrlsOfImage.split(","));

         setImageInputBy("by_url");

         setThumbnailIndex(newProduct?.thumbnailIndex || 0);

         // // In actual formate (Category , specification , dimentions) ---->
         // setProductSpecs(
         //    makeStrValFromCatSpecs(newProduct?.description?.specifications!),
         // );

         // setProductDimen(
         //    makeStrValFromCatSpecs(newProduct?.description?.dimensions!),
         // );

         // setProductDetailOfDes(
         //    makeStrValFromCatSpecs(newProduct?.description?.product_Details!),
         // );

         setProductHighlightArr(newProduct?.description?.highLights || [""]);

         setSpecificationEntries(
            newProduct?.description?.specifications || [newEntry()],
         );
         setDimenstionsEntries(
            newProduct?.description?.dimensions || [newEntry()],
         );
         setProductDetailsEntries(
            newProduct?.description?.product_Details || [newEntry()],
         );

         // // // making options in str formate ---->
         //   setProductOption(makeOptionFromate(newProduct.type));
         setOptions(newProduct.type);
         // console.log(newProduct)
      }

      // else {
      //     // // //Back to normal all form feilds ----->
      //     // reset();
      //     // setProductHighlight("")
      //     // setProductSpecs('')
      //     // setProductDimen('')
      //     // setProductDetailOfDes('')
      //     // setProductOption('')
      //     // setImageInputBy("by_url")
      //     // setAllImgUrls('')
      //     // setAllInputImagesUrl([])
      //     // setThumbnailIndex(-1)
      // }
   }, [newProduct]);

   // // // ------------------------ Reset the forms --------->
   useEffect(() => {
      if (!updatingProduct) {
         // // // scroll to top --->
         window.scroll(0, 0);
         resetFromAllFeilds();
      }
   }, [updatingProduct]);

   console.log(errors);

   // // // ----------------- Make form upto dated -------------------->>>
   useEffect(() => {
      // setValue("description.highLights", productHighlight.split(","));

      // setValue(
      //    "description.specifications",
      //    makeActualValueFormate(productSpecs),
      // );

      // setValue("description.dimensions", makeActualValueFormate(productDimen));

      // setValue(
      //    "description.product_Details",
      //    makeActualValueFormate(productDetailOfDes),
      // );

      // some other value set
      setValue("type", options);

      // // Set thumbnail index ---->
      if (thumbnailIndex === -1) {
         setValue("thumbnailIndex", -1);
      } else {
         setValue("thumbnailIndex", thumbnailIndex);
      }

      // // set type of url ---->
      setValue("imageInputBy", imageInputBy);

      // // // Set when created --->
      setValue("whenCreted", `${new Date()}`);

      // // // Set images ---->
      if (imageInputBy === "by_url") {
         setValue("images", allImgUrls);

         // // // Don't send image to backend
         formData.delete("file");
      }

      setValue(
         "category",
         pluscategory ? plusCategoryText : getValues("category"),
      );

      setValue("brand", plusBrand ? plusBrandText : getValues("brand"));

      setValue("description.highLights", prodHighlightArr);

      setValue("description.specifications", specificationEntries);

      setValue("description.dimensions", dimenstionsEntries);

      setValue("description.product_Details", productDetailsEntries);
   }, [
      // productHighlight,
      productSpecs,
      productDimen,
      productDetailOfDes,
      options,
      imageInputBy,
      allImgUrls,
      thumbnailIndex,
      plusCategoryText,
      plusBrandText,
      prodHighlightArr,
      pluscategory,
      plusBrand,
      prodHighlightArr,
      specificationEntries,
      dimenstionsEntries,
      productDetailsEntries,
   ]);

   useEffect(() => {
      window.scroll(0, 0);
   }, []);

   return (
      <div className=" relative flex flex-col sm:flex-row gap-2 justify-center items-center sm:items-start py-2 sm:py-20 sm:px-2 ">
         {/* Loading ----> */}
         <LoaderCircle isLoading={isLoading} />

         <div
            className={`  relative w-full py-2 px-1.5 rounded border 
            ${
               themeMode
                  ? ` ${!updatingProduct ? "bg-fuchsia-950" : " bg-rose-950"}  border-white `
                  : ` ${!updatingProduct ? "bg-fuchsia-200" : "bg-rose-200"}  border-black `
            }`}
            id="createOrderDiv">
            <p className=" font-semibold mt-1 mb-4 underline text-3xl text-center ">
               {!updatingProduct
                  ? "Create new product"
                  : `Updating, ${newProduct.title}`}
            </p>

            {/* Reset btn If pdating  */}

            {updatingProduct && (
               <span
                  className=" absolute right-2 top-2 z-10 bg-red-500 px-3 py-0.5 rounded-full font-bold font-mono text-white hover:bg-red-400 hover:cursor-pointer"
                  onClick={() => {
                     resetFormByBtnClick();
                  }}>
                  Reset
               </span>
            )}

            <form
               noValidate={true}
               className="space-y-6 overflow-hidden "
               onSubmit={handleSubmit(onSubmit)}>
               {/*name and barnd of Product  */}
               <div className=" flex flex-wrap justify-stretch">
                  {/* Title */}
                  <div className=" w-full sm:w-[40%] px-0.5">
                     <label
                        htmlFor="title_product"
                        className="block text-sm font-medium leading-6 ">
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
                           {...register("title", {
                              required: "Title is Required",
                           })}
                           className={`block w-full rounded-md border border-inherit bg-inherit py-1.5  shadow-sm   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? "  text-gray-900 " : " text-white"}`}
                        />
                        <p className="text-sm pl-2 text-red-500 font-bold">
                           {" "}
                           {errors.title?.message}{" "}
                        </p>
                     </div>
                  </div>

                  {/* Price ---> */}
                  <div className=" w-full sm:w-[30%] px-0.5">
                     <label
                        htmlFor="price_product"
                        className="block text-sm font-medium leading-6 ">
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
                           {...register("price", {
                              required: "Price is Required",
                           })}
                           className={`block w-full rounded-md border border-inherit bg-inherit py-1.5  shadow-sm   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? "  text-gray-900 " : " text-white"}`}
                        />
                        <p className="text-sm pl-2 text-red-500 font-bold">
                           {" "}
                           {errors.price?.message}{" "}
                        </p>
                     </div>
                  </div>

                  {/* Discount ---> */}
                  <div className=" w-full sm:w-[30%] px-0.5 flex gap-1 flex-wrap sm:flex-nowrap">
                     <div>
                        <label
                           htmlFor="discount_product"
                           className="block text-sm font-medium leading-6 ">
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
                              {...register("discountPercentage", {
                                 required: "Discount is Required",
                              })}
                              className={`block w-full rounded-md border border-inherit bg-inherit py-1.5  shadow-sm   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? "  text-gray-900 " : " text-white"}`}
                           />
                           <p className="text-sm pl-2 text-red-500 font-bold">
                              {" "}
                              {errors.discountPercentage?.message}{" "}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className=" flex flex-wrap justify-between items-start">
                  {/* Brand here --------->> */}
                  {/* <div className=" w-full sm:w-1/2 px-0.5">
                     <label
                        htmlFor="brand_product"
                        className="block text-sm font-medium leading-6 ">
                        Brand
                     </label>
                     <div className="mt-2">
                        <input
                           id="brand_product"
                           type="text"
                           placeholder="Brand of Product"
                           // autoComplete="email"
                           // required={true}
                           {...register("brand", {
                              required: "Brand is Required",
                           })}
                           className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                        />
                        <p className="text-sm pl-2 text-red-500 font-bold">
                           {" "}
                           {errors.brand?.message}{" "}
                        </p>
                     </div>
                  </div> */}

                  {/* Brand all code ---> */}
                  <div className=" w-full sm:w-1/2 px-0.5  ml-auto">
                     <label
                        htmlFor="brand_product"
                        className="block text-sm font-medium leading-6 mb-2 mr-10 ">
                        Brand
                     </label>

                     <select
                        className=" w-full bg-inherit border border-inherit font-bold rounded capitalize py-1"
                        name=""
                        id="brand_product"
                        onChange={(e) => brandOnChangeHandler(e)}
                        value={plusBrandText}>
                        {allBrands.length &&
                           allBrands.map((brand, i) => {
                              return (
                                 <option
                                    key={i}
                                    className="capitalize"
                                    value={`${brand}`}>
                                    {brand}
                                 </option>
                              );
                           })}

                        {/* Plus option for new brand -----> */}

                        <option
                           value="plus"
                           onClick={() => {
                              setPlusBrand(true);
                           }}>
                           +Plus
                        </option>
                     </select>

                     {/* Add new brand All code ----> */}

                     {plusBrand && (
                        // // Take new brand input here --->
                        <div className=" flex  flex-wrap items-center justify-end">
                           <p>New Brand :{"  "} </p>
                           {/*value get this input ---> */}
                           <input
                              id="brand_product"
                              type="text"
                              placeholder="Give 'New Brand' as text."
                              className={`block rounded-md border border-inherit py-1.5  shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-inherit  ${!themeMode ? "  text-gray-900 " : " text-white"}`}
                              value={
                                 plusBrandText === "plus" ? "" : plusBrandText
                              }
                              onChange={(e) => {
                                 setPlusBrandText(e.target.value);
                              }}
                           />
                        </div>
                     )}

                     <p className="text-sm pl-2 text-red-500 font-bold">
                        {" "}
                        {errors.brand?.message}{" "}
                     </p>
                  </div>
                  {/* category all code ---> */}
                  <div className=" w-full sm:w-1/2 px-0.5  ml-auto">
                     <label
                        htmlFor="category_product"
                        className="block text-sm font-medium leading-6 mb-2 mr-10 ">
                        Category
                     </label>

                     <select
                        className=" w-full bg-inherit border border-inherit  font-bold rounded capitalize py-1"
                        name=""
                        id="category_product"
                        onChange={(e) => categoryOnChangeHandler(e)}
                        value={plusCategoryText}>
                        {allCategories.length &&
                           allCategories.map((category, i) => {
                              return (
                                 <option
                                    key={i}
                                    className="capitalize"
                                    value={`${category}`}>
                                    {category}
                                 </option>
                              );
                           })}

                        {/* Plus option for new category -----> */}

                        <option
                           value="plus"
                           onClick={() => {
                              setPlusCategory(true);
                           }}>
                           +Plus
                        </option>
                     </select>

                     {/* Add new category All code ----> */}

                     {pluscategory && (
                        // // Take new category input here --->
                        <div className=" flex  flex-wrap items-center justify-end">
                           <p>New Category :{"  "} </p>
                           {/*value get this input ---> */}
                           <input
                              id="category_product"
                              type="text"
                              placeholder="Give 'New Category' as text."
                              className={`block rounded-md border border-inherit py-1.5  shadow-sm focus:ring-2 focus:ring-inset  bg-inherit focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? "  text-gray-900 " : " text-white"}`}
                              value={
                                 plusCategoryText === "plus"
                                    ? ""
                                    : plusCategoryText
                              }
                              onChange={(e) => {
                                 setPlusCategoryText(e.target.value);
                              }}
                           />
                        </div>
                     )}

                     <p className="text-sm pl-2 text-red-500 font-bold">
                        {" "}
                        {errors.category?.message}{" "}
                     </p>
                  </div>
               </div>

               {/* description of product */}
               <div>
                  {/* Full name */}
                  <div className=" w-full px-0.5">
                     <label
                        htmlFor="fullName_product"
                        className="block text-sm font-medium leading-6 ">
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
                           {...register("description.fullName", {
                              required: "Full name is Required",
                           })}
                           className={` border border-inherit block w-full rounded-md  py-1.5  shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-inherit ${!themeMode ? "  text-gray-900 " : " text-white"}`}
                        />
                        <p className="text-sm pl-2 text-red-500 font-bold">
                           {" "}
                           {errors.description?.fullName?.message}{" "}
                        </p>
                     </div>
                  </div>

                  {/* Aboult product --> */}
                  <div className=" w-full px-0.5 mt-3">
                     <label
                        htmlFor="About_product"
                        className="block text-sm font-medium leading-6 ">
                        About Product
                     </label>
                     <div className=" mt-2">
                        <textarea
                           id="About_product"
                           rows={5}
                           style={{ resize: "none" }}
                           placeholder="Write short descriptin about product. Explain your product."
                           {...register("description.aboutProduct", {
                              required: "About of Required",
                           })}
                           className={`block w-full rounded-md border border-inherit py-1.5  shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-inherit ${!themeMode ? "  text-gray-900 " : " text-white"}`}></textarea>

                        <p className="text-sm pl-2 text-red-500 font-bold">
                           {" "}
                           {errors.description?.aboutProduct?.message}{" "}
                        </p>
                     </div>
                  </div>

                  {/* Highlights  */}
                  <div className=" w-full px-0.5 mt-3">
                     <label
                        htmlFor="highlight_product"
                        className="block text-sm font-medium leading-6 ">
                        Highlight
                     </label>

                     <StringArrayFormApp
                        items={prodHighlightArr}
                        setItems={setProductHighlightArr}
                     />
                  </div>

                  {/* Discription of product ---> */}
                  <div className=" flex flex-wrap flex-col md:flex-row">
                     {/* <p
                        className="bg-red-300 px-2 mt-5 rounded"
                        style={{
                           lineBreak: "anywhere",
                        }}>
                        {" "}
                        <span className=" underline">NOTE</span> : Value give in
                        this (width;5mm,height;5mm,length;5mm) formate. key
                        value pair seprate by semicolon(;) and next item seprate
                        by comma(,)
                     </p> */}

                     {/* Specifications */}
                     <div className=" w-full md:w-1/2 px-0.5 mt-3">
                        <label
                           htmlFor="specifications_product"
                           className="block text-sm font-medium leading-6 ">
                           Specifications
                        </label>

                        <KeyValueFormApp
                           entries={specificationEntries}
                           setEntries={setSpecificationEntries}
                        />

                        <p>{errors.description?.specifications?.message}</p>
                     </div>

                     {/* dimensions */}
                     <div className="  w-full md:w-1/2 px-0.5 mt-3">
                        <label
                           htmlFor="dimenstions"
                           className="block text-sm font-medium leading-6 ">
                           Dimenstions
                        </label>

                        <KeyValueFormApp
                           entries={dimenstionsEntries}
                           setEntries={setDimenstionsEntries}
                        />
                     </div>

                     {/* Products Details ---> */}
                     <div className="  w-full md:w-1/2 px-0.5 mt-3">
                        <label
                           htmlFor="dimenstions"
                           className="block text-sm font-medium leading-6 ">
                           Product Details
                        </label>
                        <KeyValueFormApp
                           entries={productDetailsEntries}
                           setEntries={setProductDetailsEntries}
                        />
                     </div>
                  </div>
               </div>

               {/* Option of product ----> */}
               <div className=" w-full px-0.5 ">
                  <label
                     htmlFor="option_product"
                     className="block text-sm font-medium leading-6 mt-2 ">
                     Option of Products
                  </label>
                  <ProductOptionForm
                     options={options}
                     setOptions={setOptions}
                  />

                  <p className="text-sm pl-2 text-red-500 font-bold">
                     {" "}
                     {errors.type?.message}{" "}
                  </p>
               </div>

               {/* Image Div -----> */}
               <div className=" w-full">
                  {/* Image type input y radio ----> */}
                  <div
                     className={` border-b mx-5 sm:mx-10 md:mx-20 flex items-center justify-around ${themeMode ? " border-white" : "border-black"}`}>
                     <div className="  flex items-center">
                        <input
                           type="radio"
                           name="img_type"
                           id="by_image"
                           value={imageInputBy}
                           onChange={() => {
                              imageTyepChangehandler("by_image");
                           }}
                           onClick={() => {
                              imageTyepChangehandler("by_image");
                           }}
                        />
                        <label
                           htmlFor="by_image"
                           className={`pl-0.5 font-bold hover:cursor-pointer ${imageInputBy === "by_image" && "scale-125 underline ml-1 text-yellow-500"} `}
                           onClick={() => {
                              imageTyepChangehandler("by_image");
                           }}>
                           Image
                        </label>
                     </div>

                     {/* <p>{imageInputBy}</p> */}

                     <div className=" flex items-center">
                        <input
                           type="radio"
                           name="img_type"
                           id="by_url"
                           value={imageInputBy}
                           onChange={() => {
                              imageTyepChangehandler("by_url");
                           }}
                           onClick={() => {
                              imageTyepChangehandler("by_url");
                           }}
                           checked
                        />
                        <label
                           htmlFor="by_url"
                           className={`pl-0.5 font-bold hover:cursor-pointer  ${imageInputBy === "by_url" && "scale-125 underline ml-2 text-yellow-500"}`}
                           onClick={() => {
                              imageTyepChangehandler("by_url");
                           }}>
                           URL
                        </label>
                     </div>
                  </div>

                  {/* Actual Image input div ---> */}

                  <div className=" w-full py-1 px-1 sm:px-5 md:px-14 flex justify-center items-center ">
                     {imageInputBy === "by_url" ? (
                        // // // BY URL ---->
                        <div className=" flex flex-col items-center">
                           <h1 className=" underline">By URL link </h1>

                           <StringArrayFormApp
                              items={allImgUrls}
                              setItems={setAllImgUrls}
                           />

                           {/* Show all images ---> Experiment  */}
                           <div className=" flex flex-wrap justify-center">
                              {allImgUrls.length > 0 &&
                                 allImgUrls.map((ele, i) => {
                                    return (
                                       <img
                                          className={`rounded m-0.5 object-contain hover:cursor-pointer  ${allImgUrls.length > 1 && "h-56 "} `}
                                          src={ele}
                                          alt={ele}
                                          key={i}
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             setThumbnailIndex(i);
                                          }}
                                       />
                                    );
                                 })}
                           </div>
                        </div>
                     ) : (
                        // // // BY Image ---->
                        <div>
                           <h1 className=" underline text-center">
                              By Actual Image{" "}
                           </h1>
                           <div className=" flex flex-col items-center">
                              <input
                                 className=" border rounded-full my-1 w-[60%] "
                                 type="file"
                                 name=""
                                 accept="image/png, image/png, image/jpeg"
                                 id="change_img"
                                 multiple={true}
                                 max={5}
                                 onChange={(e) => {
                                    imgOnChangeHandler(e);
                                 }}
                              />

                              <div>
                                 <label
                                    htmlFor="change_img"
                                    className="text-green-500">
                                    Give images of Product (Min : 1 and Max :
                                    5){" "}
                                 </label>
                              </div>
                           </div>

                           <div>
                              {allInputImagesUrl.length > 0 ? (
                                 <>
                                    <p className=" text-center">
                                       {" "}
                                       Click on image to select thumbnail image.
                                    </p>

                                    <div className=" flex flex-wrap justify-center">
                                       {allInputImagesUrl.map((ele, i) => {
                                          return (
                                             <img
                                                key={i}
                                                src={ele}
                                                alt=""
                                                className=" rounded m-0.5 h-56 object-contain hover:cursor-pointer"
                                                onClick={(e) => {
                                                   e.stopPropagation();
                                                   setThumbnailIndex(i);
                                                }}
                                             />
                                          );
                                       })}
                                    </div>
                                 </>
                              ) : (
                                 <p>
                                    Choose some image files, and see preview.
                                 </p>
                              )}
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Thumbmail image ----> */}

                  {allInputImagesUrl[thumbnailIndex] ||
                     (allImgUrls[thumbnailIndex] && (
                        <div className=" flex flex-col items-center">
                           <p className=" font-semibold underline">
                              Thumbnail Image👇
                           </p>
                           <img
                              className={`rounded  h-72 object-contain`}
                              src={
                                 allInputImagesUrl[thumbnailIndex] ||
                                 allImgUrls[thumbnailIndex]
                              }
                              alt=""
                           />
                           <p
                              // style={{ lineBreak: "anywhere" }}
                              className=" w-full text-[0.7rem] border rounded border-gray-500 ">
                              {`${allInputImagesUrl[thumbnailIndex] || allImgUrls[thumbnailIndex]}`}
                           </p>
                        </div>
                     ))}

                  {/* <div>
                     {thumbnailIndex !== -1 ? (
                        imageInputBy === "by_url" ? (
                           <div className=" flex flex-col items-center">
                              <p className=" font-semibold underline">
                                 Thumbnail Image👇
                              </p>
                              <img
                                 className={`rounded  h-72 object-contain`}
                                 src={allImgUrls[thumbnailIndex]}
                                 alt=""
                              />
                              <p
                                 // style={{ lineBreak: "anywhere" }}
                                 className=" w-full text-sm ">
                                 {allInputImagesUrl[thumbnailIndex]}
                              </p>
                           </div>
                        ) : (
                           <div className=" flex flex-col items-center">
                              <p className=" font-semibold underline">
                                 Thumbnail Image👇
                              </p>
                              <img
                                 className={`rounded  h-72 object-contain`}
                                 src={allInputImagesUrl[thumbnailIndex]}
                                 alt=""
                              />
                              <p
                                 style={{ lineBreak: "anywhere" }}
                                 className=" w-full text-sm ">
                                 {allInputImagesUrl[thumbnailIndex]}
                              </p>
                           </div>
                        )
                     ) : (
                        <p className=" overline">
                           Give image and Select thumbnail image otherwise 0th
                           image will be thumbnail of product.
                        </p>
                     )}
                  </div> */}

                  <p className="text-sm pl-2 text-red-500 font-bold text-center">
                     {" "}
                     {errors.images?.message}{" "}
                  </p>
               </div>

               {/* Create New product button ----> */}
               <div>
                  <p className=" text-center underline font-semibold my-1">
                     NOTE : Read carefully all the gievn inputs.(Specially
                     Discription of product and option for product.)
                  </p>

                  <button
                     type="submit"
                     className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                     {updatingProduct
                        ? `Update, ${newProduct.title}`
                        : "Create new product"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateNewProduct;
