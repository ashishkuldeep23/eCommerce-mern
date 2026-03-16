// import React from "react";

import { Link } from "react-router-dom";
import { userState } from "../../../Slices/UserSlice";
import CreateNewShop from "./CreateNewShop";
import { useDispatch } from "react-redux";
import { setChildrenModal, setOpenMoadl } from "../../../Slices/ModalSlice";

const AllShops = () => {
   const shops = userState().userData?.shops;
   const dispatch = useDispatch();

   const createNewShophandler = () => {
      let ChildrenOfModal = <CreateNewShop />;
      dispatch(setOpenMoadl(true));
      dispatch(setChildrenModal(ChildrenOfModal));
   };

   if (shops && shops.length > 0) {
      <>
         <p className=" ">No shop found</p>
         <CreateNewShop />
      </>;
   }

   return (
      <div className=" my-5 px-7">
         <p>Your shops are : </p>
         <div className="  my-2 text-center flex flex-wrap gap-2">
            {shops &&
               shops.map((shop, i) => {
                  return (
                     <Link
                        to={`/shop/${typeof shop === "string" ? shop : shop.name}`}
                        className=" border rounded p-1 "
                        key={i}>
                        {typeof shop === "string" ? (
                           <p>{shop}</p>
                        ) : (
                           <div className=" max-w-[9rem] h-52 overflow-hidden ">
                              {shop.status === "inactive" && (
                                 <details onClick={(e) => e.stopPropagation()}>
                                    <summary>Not verified yet</summary>
                                    <p className=" text-red-500 text-xs">
                                       This shop is not verified yet. Please
                                       wait.
                                    </p>
                                 </details>
                              )}

                              {shop.img && (
                                 <img
                                    className=" w-32 h-32 object-cover rounded "
                                    src={shop.img}
                                    alt=""
                                 />
                              )}
                              <p className=" font-semibold border-t">
                                 {shop.name}
                              </p>
                              <Link
                                 className=" border  px-2 rounded text-xs"
                                 to={`/shop/${shop.name}`}>
                                 See more
                              </Link>
                              {/* <p>{shop.description}</p> */}
                           </div>
                        )}
                     </Link>
                  );
               })}

            <div
               onClick={createNewShophandler}
               className=" p-1 w-32 h-48 border rounded overflow-hidden flex items-center justify-center">
               <button className=" text-3xl font-bold">Create new shop</button>
            </div>
         </div>
      </div>
   );
};

export default AllShops;
