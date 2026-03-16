// import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { AppDispatch } from "../../../store";
import { createNewShop } from "../../../Slices/UserSlice";
import { setChildrenModal, setOpenMoadl } from "../../../Slices/ModalSlice";

type ShopForm = {
   name: string;
   description: string;
   file: File | null;
};

const formData = new FormData();

const CreateNewShop = () => {
   const dispatch = useDispatch<AppDispatch>();
   const [shopForm, setShopForm] = useState<ShopForm>({
      name: "",
      description: "",
      file: null,
   });

   const onChangeHandler = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      //   console.log(e.target);

      //   e.type

      //   if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      //      //  let files = e.target.files as any;

      //   setShopForm((prev) => {
      //      if (e.target instanceof HTMLInputElement) {
      //         return {
      //            ...prev,
      //            file: e.target.files ? e.target.files[0] : null,
      //            [e.target.name]: e.target.value,
      //         };
      //      } else {
      //         return {
      //            ...prev,
      //            file: null,
      //            [e.target.name]: e.target.value,
      //         };
      //      }
      //   });
      //   }

      setShopForm((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const file = e?.target?.files[0];
         formData.set("file", file);
         setShopForm((prev) => ({ ...prev, file }));
      }
   };

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      try {
         //  console.log(e.currentTarget);
         e.preventDefault();
         if (!shopForm.name) {
            toast.error("Shop name is required");
            return;
         } else if (!shopForm.description) {
            toast.error("Shop description is required");
            return;
         }

         formData.set("name", shopForm.name);
         formData.set("description", shopForm.description);
         //  formData.append("file", shopForm.file || "");

         dispatch(createNewShop(formData));

         // // // Make modal to close after 2 sec
         setTimeout(() => {
            dispatch(setOpenMoadl(false));
            dispatch(setChildrenModal(<></>));
         }, 2000);
         
      } catch (error: any) {
         console.log(error);
         toast.error(error.message || "Something went wrong");
      }
   };

   return (
      <div className=" text-center max-w-2xl text-black dark:text-white ">
         <h1 className="text-2xl font-bold mb-4 text-center">
            Create New Shop
         </h1>
         {/* <p>
            This is the Create New Shop page. Here you can add a new shop to the
            platform.
         </p> */}
         {/* Add your form or content for creating a new shop here */}

         <p className=" text-sm underline">
            NOTE : Create a new Shop by filling the form to list your products
            and once your shop is verified you will be able to sell your
            products
         </p>
         <p></p>
         <form
            onSubmit={handleSubmit}
            className="  my-2 flex flex-col items-end gap-2 w-full sm:w-[60%] mx-auto">
            <div className=" flex flex-wrap justify-center">
               <label className=" mb-auto mx-2 text-xl" htmlFor="shop_name">
                  Shop Name :{" "}
               </label>
               <input
                  className=" w-56  rounded dark:bg-slate-700 dark:text-white"
                  type="text"
                  id="shop_name"
                  placeholder="Enter Shop Name"
                  value={shopForm.name}
                  name="name"
                  onChange={onChangeHandler}
               />
            </div>

            <div className=" flex flex-wrap justify-center">
               <label
                  className=" mb-auto mx-2 text-xl"
                  htmlFor="shop_description">
                  Shop Description :{" "}
               </label>
               <textarea
                  id="shop_description"
                  placeholder="Enter Shop Description"
                  name="description"
                  value={shopForm.description}
                  onChange={onChangeHandler}
                  className=" w-56 rounded dark:bg-slate-700 dark:text-white resize-none"></textarea>
            </div>

            <div>
               <label className=" mb-auto mx-2 text-xl" htmlFor="shop_image">
                  Shop Image :{" "}
               </label>
               <input
                  className=" w-56 rounded dark:bg-slate-700 dark:text-white"
                  type="file"
                  id="shop_image"
                  placeholder="Enter Shop Name"
                  accept=".png, .jpeg, .jpg"
                  //   value={shopForm.file}
                  name="file"
                  //   onChange={onChangeHandler}
                  onChange={imageChangeHandler}
               />
            </div>

            <button
               type="submit"
               className=" bg-green-500 rounded  py-1 px-2 font-bold ">
               Create shop
            </button>
         </form>
      </div>
   );
};

export default CreateNewShop;
