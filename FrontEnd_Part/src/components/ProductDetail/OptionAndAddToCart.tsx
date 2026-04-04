// import React from "react";

import { useEffect, useState } from "react";
import { IProduct, OptionInterface } from "../../Type/type";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
import { userState } from "../../Slices/UserSlice";
import { removeUnderScore } from "../../Helper/removeUnderScore";
import { useDispatch, useSelector } from "react-redux";
import { addItemInCart } from "../../Slices/CartSlice";
import { fetchOneProductByID } from "../../Slices/AllProductSlice";
import { AppDispatch, RootState } from "../../store";
// import { RootState } from "../../store";

const OptionAndAddToCart: React.FC<{
   singleProductData?: IProduct;
   singleProductId?: string | number;
}> = ({ singleProductData, singleProductId }) => {
   // const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
   const userDataId = userState().userData.id;
   const [newOption, setNewOption] = useState<OptionInterface | null>(null);

   const singleProductDataFromRTK = useSelector(
      (state: RootState) => state.allProductWithCatReducer.singleProductData,
   );
   const isLoadingForSingleProduct = useSelector(
      (state: RootState) =>
         state.allProductWithCatReducer.isLoadingForSingleProduct,
   );

   const productData = singleProductData || singleProductDataFromRTK;

   // const cartData = useSelector(
   //    (state: RootState) => state.CartReducer.cartData,
   // );

   const optionChangeHandler = (option: OptionInterface) => {
      // console.log(p);

      setNewOption(option);

      //   console.log(option);

      //   console.log(productData.type);

      // // // This is how we can reduce the stock ------------>>
      productData.type?.forEach((singleType) => {
         if (singleType?.name === option?.name) {
            singleType?.verity?.forEach((singleVerity) => {
               if (singleVerity?.label === option?.verity[0]?.label) {
                  singleVerity.data.forEach((optionItem) => {
                     if (
                        optionItem?.name === option?.verity[0]?.data[0]?.name
                     ) {
                        console.log("Clicked");

                        // console.log(optionItem?.stock);
                        // console.log(Number(optionItem?.stock) - 1);
                     }
                  });
               }
            });
         }
      });
   };

   // // // // Add to cart fn --->
   function addToCartHandler(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   ) {
      e.stopPropagation();
      // e.preventDefault();

      // // // FN calling to check Login ---->
      if (!userDataId) {
         toast.error("Please logIn.");
         return;
      }

      const { id, title, price } = productData;

      if (!id && !title && !price) {
         console.log(productData);

         console.log("Page is Empty , go to home and try again");

         toast.error(`Page is Empty , go to home and try again , GoTo Home`);

         return;
      }

      // // check option here -------->>

      if (!newOption?.name && !newOption?.verity[0].label) {
         toast.error("Please select the option.");
         return;
      }

      dispatch(
         addItemInCart({
            ...productData,
            verity: newOption,
            quantity: 1,
         }),
      );

      toast.success(`${title}, added in cart`);

      // // // Add to Cart here ----------->>

      // // // Check user choosed type or not -->
      //   if (!type.isChanged) {
      //      console.log("Option not changed.");
      //      toast.error(`Please choose one in available option.`);
      //      return;
      //   }

      // console.log(productData)

      //   let newObjWithType = {
      //      ...productData,
      //      type: type,
      //      price: Math.round(
      //         type.typePrice -
      //            (productData.discountPercentage * type.typePrice) / 100,
      //      ),
      //   };

      // console.log(newObjWithType)

      //   let addaleCartItem = {
      //      ...newObjWithType,
      //      quantity: 1,
      //      verity: { ...type },
      //   };

      //   dispatch(addItemInCart(addaleCartItem)); // // // Adding into cart state

      // localStorage.setItem("cardData", JSON.stringify([...cardData , addaleCartItem ]))

      // // Sending Alert
      // toast.success(`${title}, added in cart`);
      // toast.success(`${title}, added in cart.`, {
      //    action: {
      //       label: "Goto🛒",
      //       onClick: () => {
      //          window.scroll(0, 0);
      //          navigate("/cart");
      //       },
      //    },
      // });
   }

   useEffect(() => {
      if (singleProductId) {
         dispatch(
            fetchOneProductByID({
               productId: singleProductId,
               noSimmilarProducts: true,
            }),
         );
      }
   }, [singleProductId]);

   return (
      <>
         <div>
            <h3 className="text-sm font-medium capitalize ">
               {" "}
               Select options{" "}
            </h3>

            <div>
               {isLoadingForSingleProduct ? (
                  <>
                     <p>Loading...</p>
                  </>
               ) : (
                  productData?.type &&
                  productData?.type.length > 0 &&
                  productData?.type?.map((singleType, index) => {
                     return (
                        <div className=" my-2 " key={index}>
                           <p className=" capitalize ml-1 font-semibold tracking-widest ">
                              {removeUnderScore(singleType.name)}
                           </p>

                           <div>
                              {singleType?.verity &&
                                 singleType?.verity?.length > 0 &&
                                 singleType?.verity?.map(
                                    (singleVerity, ind) => {
                                       return (
                                          <div key={ind}>
                                             <div className=" flex flex-wrap gap-4 ">
                                                {singleVerity?.data &&
                                                   singleVerity?.data?.length >
                                                      0 &&
                                                   singleVerity.data.map(
                                                      (optionItem, i) => {
                                                         return (
                                                            <div
                                                               key={i}
                                                               className={`flex flex-col p-1 rounded border border-black dark:border-white font-semibold cursor-pointer hover:scale-110 transition-all ${
                                                                  productData?.type &&
                                                                  newOption?.name ===
                                                                     productData
                                                                        ?.type[
                                                                        index
                                                                     ]?.name &&
                                                                  newOption
                                                                     ?.verity[0]
                                                                     ?.data[0]
                                                                     ?.name ===
                                                                     productData
                                                                        ?.type[
                                                                        index
                                                                     ]?.verity[
                                                                        ind
                                                                     ]?.data[i]
                                                                        ?.name &&
                                                                  " !border-blue-500 scale-110 border-2 text-blue-500 "
                                                               }  `}
                                                               onClick={() => {
                                                                  optionChangeHandler(
                                                                     {
                                                                        ...singleType,
                                                                        verity:
                                                                           [
                                                                              {
                                                                                 ...singleVerity,
                                                                                 data: [
                                                                                    {
                                                                                       ...optionItem,
                                                                                       price: productData?.discountPercentage
                                                                                          ? Math.round(
                                                                                               +optionItem?.price -
                                                                                                  (productData.discountPercentage *
                                                                                                     +optionItem.price) /
                                                                                                     100,
                                                                                            )
                                                                                          : +optionItem.price,
                                                                                    },
                                                                                 ],
                                                                              },
                                                                           ],
                                                                     },
                                                                  );
                                                               }}>
                                                               <p>
                                                                  {
                                                                     optionItem?.name
                                                                  }
                                                               </p>
                                                               <p>
                                                                  {productData?.discountPercentage ? (
                                                                     <span
                                                                        className={`  leading-5 text-lg font-medium   `}>
                                                                        {" "}
                                                                        <span className=" text-sm font-thin line-through">
                                                                           ₹
                                                                           {
                                                                              optionItem?.price
                                                                           }
                                                                        </span>{" "}
                                                                        ₹
                                                                        {Math.round(
                                                                           +optionItem?.price -
                                                                              (productData.discountPercentage *
                                                                                 +optionItem.price) /
                                                                                 100,
                                                                        )}
                                                                     </span>
                                                                  ) : (
                                                                     <span
                                                                        className={`  leading-5 text-lg font-medium   `}>
                                                                        {" "}
                                                                        ₹
                                                                        {
                                                                           +optionItem.price
                                                                        }{" "}
                                                                     </span>
                                                                  )}
                                                               </p>
                                                               <p>
                                                                  {Number(
                                                                     optionItem?.stock,
                                                                  ) <= 10 && (
                                                                     <span className=" text-red-400 text-xs ">
                                                                        Only{" "}
                                                                        {
                                                                           optionItem?.stock
                                                                        }{" "}
                                                                        left{" "}
                                                                     </span>
                                                                  )}
                                                               </p>
                                                            </div>
                                                         );
                                                      },
                                                   )}
                                             </div>
                                          </div>
                                       );
                                    },
                                 )}
                           </div>
                        </div>
                     );
                  })
               )}
            </div>
         </div>

         <button
            type="submit"
            className="mt-10 flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  lg:w-3/4"
            onClick={addToCartHandler}>
            Add to Cart
         </button>
      </>
   );
};

export default OptionAndAddToCart;
