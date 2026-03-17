import { useDispatch, useSelector } from "react-redux";
import { upadteUserData, userState } from "../../../Slices/UserSlice";
import { AppDispatch, RootState } from "../../../store";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

type UpdateName = {
   firstName: string;
   lastName: string;
};

// const formData = new FormData();

export function UserNameAndUpadte() {
   const formData = useRef(new FormData()).current;
   const getUserData = userState().userData;

   const themeMode = useSelector((state: RootState) => state.themeReducer.mode);

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<UpdateName>({
      values: {
         firstName: `${getUserData.firstName}`,
         lastName: `${getUserData.lastName}`,
      },
   });

   const [updateName, setUpadteName] = useState(false);

   const dispatch = useDispatch<AppDispatch>();

   // // // So This is actual fucton that handles onSubit event
   const onSubmit: SubmitHandler<UpdateName> = (data) => {
      // console.log(data);

      // // // Here you can call you backend

      if (Object.keys(errors).length <= 0) {
         // const { confirmPassword, ...resData } = data

         // const formData = new FormData()

         for (let [key, value] of Object.entries(data)) {
            formData.set(key, `${value}`);

            // // // Don't use append in form data use set() -----> See MDN form data docs.
         }

         formData.set("whatUpadte", "updateUserName");
      }

      // alert()

      dispatch(upadteUserData({ formData: formData }));
   };

   // console.log(errors)

   const isFullfiled = userState().isFullFilled;

   // // // back to normal all things ---->
   useEffect(() => {
      // // // back to normal all things ---->
      if (isFullfiled) {
         setValue("firstName", "", {
            shouldValidate: true,
            shouldDirty: true,
         });
         setValue("lastName", "", {
            shouldValidate: true,
            shouldDirty: true,
         });

         setUpadteName(false);
      }
   }, [isFullfiled]);

   return (
      <div
         className={`  ${!updateName ? "h-9 " : " h-60 "} duration-500 transition-all overflow-hidden `}>
         <h2
            className={` ${!themeMode ? "bg-slate-100" : "bg-slate-900"}  font-bold w-full rounded my-0.5 px-1`}>
            Name :{" "}
            {(getUserData.firstName || "") + " " + (getUserData.lastName || "")}
            <button
               onClick={() => {
                  setUpadteName(!updateName);
               }}
               className=" ml-10 border rounded px-1 hover:bg-green-400">
               {!updateName ? (
                  <i className="ri-pencil-fill"></i>
               ) : (
                  <i className="ri-close-fill text-red-500"></i>
               )}
            </button>
         </h2>

         {/* {updateName && ( */}
         <form
            noValidate
            className="space-y-3 flex flex-col max-w-[85vw] sm:max-w-[50vh] "
            onSubmit={handleSubmit(onSubmit)}>
            <div>
               <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6  ">
                  First Name <span className=" text-red-500">*</span>
               </label>
               <div className="mt-2">
                  <input
                     id="firstName"
                     placeholder="First Name"
                     type="text"
                     {...register("firstName", {
                        required: "Full Name is Required",
                        pattern: {
                           value: /[a-zA-Z][a-zA-Z0-9-_ .]{3,25}/gi,
                           message:
                              "Must start with an alphabetic character. Can contain the following characters: a-z A-Z 0-9 - . _ and should be in between 5 to 25",
                        },
                     })}
                     className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                  />
                  <p className="text-sm pl-2 text-red-500 font-bold">
                     {" "}
                     {errors.firstName?.message}{" "}
                  </p>
               </div>
            </div>

            <div className="mt-2">
               <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6">
                  Last Name <span className=" text-red-500">*</span>
               </label>
               <div className="mt-2">
                  <input
                     id="lastName"
                     placeholder="Last Name"
                     type="text"
                     {...register("lastName", {
                        required: "Last Name is Required",
                        pattern: {
                           value: /[a-zA-Z][a-zA-Z0-9-_ .]{5,25}/gi,
                           message:
                              "Must start with an alphabetic character. Can contain the following characters: a-z A-Z 0-9 - . _ and should be in between 5 to 25",
                        },
                     })}
                     className={`block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${!themeMode ? " bg-white text-gray-900 " : "bg-gray-900 text-white"}`}
                  />

                  <p className="text-sm pl-2 text-red-500 font-bold">
                     {" "}
                     {errors.lastName?.message}{" "}
                  </p>
               </div>
            </div>

            <button
               type="submit"
               className=" ml-auto rounded-md bg-green-600 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 font-bold">
               Update Name
            </button>
         </form>
         {/* )} */}
      </div>
   );
}
