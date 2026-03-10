// import React from 'react'

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { gettingTokenInCookieAndLocalHost } from "../../../Helper/Token";
import { useDispatch, useSelector } from "react-redux";
import { setAllCategories } from "../../../Slices/AllProductSlice";
import { RootState } from "../../../store";

const CreateCategory = () => {
   const dispatch = useDispatch();

   const allCategories = useSelector(
      (state: RootState) => state.allProductWithCatReducer.cateoryAllData,
   );
   //    const allCategories = useSelector(
   //       (state: RootState) => state.allProductWithCatReducer.filterAllCateory,
   //    );

   const [updatingCategory, setUpdatingCategory] = useState<string>(
      allCategories[0]?.name || "",
   );

   const [switchCreateUpdateCat, setSwitchCreateUpdateCat] = useState(false);

   const [newCatData, setNewCatData] = useState<{ name: string; img: string }>({
      name: "",
      img: "",
   });

   useEffect(() => {
      if (updatingCategory) {
         let findCat = allCategories.find(
            (cat) => cat.name.toLowerCase() === updatingCategory.toLowerCase(),
         );
         if (findCat) {
            setNewCatData({ name: findCat.name, img: findCat.img });
         }
      }
   }, [updatingCategory]);

   useEffect(() => {
      if (switchCreateUpdateCat && allCategories.length > 0) {
         setNewCatData({
            name: allCategories[0].name,
            img: allCategories[0].img,
         });
      } else {
         setNewCatData({ name: "", img: "" });
      }
   }, [switchCreateUpdateCat]);

   const submitHandler = async () => {
      try {
         // // // chcek name and img is given or not and other ------------>>

         if (!newCatData.name) {
            toast.error("Category name is required");
            return;
         }

         // console.log(newCatData)

         // // // other validation ------------->>

         // // // Now call dispatch fn ---------->>

         const option: RequestInit = {
            method: switchCreateUpdateCat ? "PUT" : "POST",
            credentials: "include",
            headers: {
               token: `${gettingTokenInCookieAndLocalHost()}`,
               "Content-Type": "application/json", // // UseFul for POST and PUt methods.
               // "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({ ...newCatData }),
         };

         const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}${!switchCreateUpdateCat ? `/createCategory` : `/updateCategory/${updatingCategory || ""}  `}`,
            option,
         );
         const json = await response.json();
         // return data

         // console.log(json)

         if (json?.status) {
            setNewCatData({
               name: "",
               img: "",
            });

            setSwitchCreateUpdateCat(false);

            dispatch(setAllCategories(json.data?.name || ""));
            toast.success(json.message);
         } else {
            console.log(json);
            toast.error(json.message);
         }
      } catch (error) {
         console.log(error);
         toast.error("Something went wrong");
      }
   };

   return (
      <div
         className={` border rounded p-2 m-2  w-full sm:w-[40%] flex flex-col justify-center items-center ${!switchCreateUpdateCat ? "bg-fuchsia-200 dark:bg-fuchsia-950 " : "bg-rose-200 dark:bg-rose-950"} `}>
         <h1 className=" mb-2 underline text-xl sm:text-3xl font-semibold ">
            {" "}
            {switchCreateUpdateCat ? "Update" : "Create"} Category
         </h1>

         <div className=" flex gap-5">
            <div className=" flex items-center gap-1">
               <input
                  onClick={() => setSwitchCreateUpdateCat(false)}
                  defaultChecked={switchCreateUpdateCat === false}
                  type="radio"
                  name="switch_category"
                  id="create_category"
               />
               <label htmlFor="create_category">Create Category</label>
            </div>
            <div className=" flex items-center gap-1">
               <input
                  onClick={() => setSwitchCreateUpdateCat(true)}
                  type="radio"
                  name="switch_category"
                  id="update_category"
               />
               <label htmlFor="update_category">Update Category</label>
            </div>
         </div>

         <div className=" flex flex-col justify-center">
            {switchCreateUpdateCat ? (
               <div className="  p-1 rounded  flex  justify-center gap-2 m-1 mx-auto">
                  <label htmlFor="choose_category">Choose </label>
                  <select
                     className=" w-full bg-inherit border border-inherit  font-bold rounded capitalize py-1"
                     name=""
                     id="choose_category"
                     onChange={(e) => {
                        // console.log(e.target.value);
                        setUpdatingCategory(e.target.value);
                     }}
                     value={updatingCategory}>
                     {allCategories.length &&
                        allCategories.map((category, i) => {
                           return (
                              <option
                                 key={i}
                                 className="capitalize"
                                 value={`${category.name}`}>
                                 {category.name}
                              </option>
                           );
                        })}
                  </select>
               </div>
            ) : (
               <></>
            )}

            <div className=" flex  justify-center gap-2 m-1 ">
               <label htmlFor="cat_name" className=" ">
                  Name :{" "}
               </label>
               <input
                  placeholder="Category Name"
                  type="text"
                  name=""
                  id="cat_name"
                  //   value={
                  //      switchCreateUpdateCat
                  //         ? newCatData.name || updatingCategory
                  //         : ""
                  //   }
                  value={newCatData.name}
                  onChange={(e) =>
                     setNewCatData({ ...newCatData, name: e.target.value })
                  }
               />
            </div>
            <div className=" flex  justify-center gap-2 m-1 ">
               <label htmlFor="cat_img" className=" ">
                  URL :{" "}
               </label>
               <input
                  placeholder="Category Img Url"
                  type="text"
                  name=""
                  id="cat_img"
                  value={newCatData.img}
                  onChange={(e) =>
                     setNewCatData({ ...newCatData, img: e.target.value })
                  }
               />

               {newCatData?.img && (
                  <img
                     className=" h-10 w-10 rounded object-cover "
                     src={newCatData.img}
                  />
               )}
            </div>
            {/* <div> */}
            <button
               onClick={() => submitHandler()}
               className=" ml-48 border p-1.5 bg-green-500 text-white font-bold rounded border-black">
               Submit
            </button>
            {/* </div> */}
         </div>
      </div>
   );
};

export default CreateCategory;
