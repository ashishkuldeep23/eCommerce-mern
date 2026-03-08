import { useEffect, useState } from "react";
import { toast } from "sonner";
import { gettingTokenInCookieAndLocalHost } from "../../../Helper/Token";
import { LoaderCircle } from "../../LoaderCircle/LoaderCircle";

export const GetUrlOfImgDiv: React.FC = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [images, setImages] = useState<File[] | null>(null);
   const [allInputImagesUrl, setAllInputImagesUrl] = useState<string[]>([]);
   const [allUploadedImagesUrl, setAllUploadedImagesUrl] = useState<string[]>(
      [],
   );

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
            // formData.append("file", file);

            setImages((prev) => {
               if (prev) {
                  return [...prev, file];
               } else {
                  return [file];
               }
            });

            if (i >= 4) break;
         }

         setAllInputImagesUrl(arrOfAllInput);
      }
   }

   function submitHandler() {
      // console.log(formData.getAll("file"));

      try {
         setIsLoading(true);
         // console.log(allInputImagesUrl);

         const formData = new FormData();

         if (images) {
            images.forEach((ele) => {
               formData.append("file", ele);
            });
         }

         // console.log(formData.getAll("file"));

         // Simulate sending formData to backend (e.g., using fetch)
         fetch(`${import.meta.env.VITE_BACKEND_URL}/generate-img-url`, {
            method: "POST",
            body: formData,
            credentials: "include",
            headers: {
               token: `${gettingTokenInCookieAndLocalHost()}`,
            },
         })
            .then((response) => response.json())
            .then((data) => {
               // console.log(data);

               if (data.status) {
                  // // // Here push url into main url arr ------------>>
                  setAllUploadedImagesUrl((prev) => [
                     ...data?.uploadedUrls,
                     ...prev,
                  ]);
                  toast.success("Images uploaded successfully!");

                  setImages(null);
                  setAllInputImagesUrl([]);
               } else {
                  return toast.error(data.message);
               }
            })
            .catch((error) => {
               console.error("Error:", error);
            });
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   }

   useEffect(() => {
      // // get url -------->>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/get-all-img-urls`, {
         method: "GET",
         credentials: "include",
         headers: {
            token: `${gettingTokenInCookieAndLocalHost()}`,
         },
      })
         .then((response) => response.json())
         .then((json) => {
            // console.log(json);

            if (json?.status) {
               setAllUploadedImagesUrl(json?.data);
            } else {
               return toast.error(json.message);
            }
         })
         .catch((error) => {
            console.error("Error:", error);
         });
   }, []);

   //    console.log(formData.getAll("file"));

   return (
      <div className=" relative py-2 sm:py-20 sm:px-2 ">
         <LoaderCircle isLoading={isLoading} />

         <div className=" flex flex-col gap-2 p-2 items-center border border-black dark:border-white rounded">
            <p className=" text-2xl font-bold text-center underline">
               Get urls of Imgs
            </p>

            <div className=" flex flex-col justify-center items-center">
               <div className=" flex gap-2 justify-center items-center ">
                  <input
                     className=" border rounded-full my-1"
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
                  {allInputImagesUrl.length > 0 && (
                     <button
                        className=" bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => {
                           setAllInputImagesUrl([]);
                           // formData.delete("file");
                           setImages(null);
                        }}>
                        Clear
                     </button>
                  )}
               </div>

               <div>
                  <label htmlFor="change_img" className="text-green-500">
                     Give images of Product (Min : 1 and Max : 5){" "}
                  </label>
               </div>
            </div>

            {allInputImagesUrl.length > 0 && (
               <>
                  <div className=" flex flex-wrap gap-2 justify-center items-center mt-4 ">
                     {allInputImagesUrl.map((ele, i) => {
                        return (
                           <div
                              key={i}
                              className=" rounded border border-gray-500">
                              <img
                                 src={ele}
                                 alt=""
                                 className=" h-40 aspect-1 object-cover rounded"
                              />
                           </div>
                        );
                     })}
                  </div>
                  <button
                     type="button"
                     disabled={isLoading}
                     onClick={submitHandler}
                     className=" mx-auto bg-blue-500 text-white px-4 py-2 rounded">
                     Submit Images
                  </button>
               </>
            )}
         </div>

         <div className="  border p-2 rounded mt-5 border-black dark:border-white flex flex-col justify-center items-center ">
            <p>All uploaded images</p>
            {allUploadedImagesUrl.length > 0 ? (
               <div className=" max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-wrap gap-2 justify-center items-center mt-4 ">
                  {allUploadedImagesUrl.map((ele, i) => {
                     return (
                        <div
                           key={i}
                           className=" w-28 rounded border border-black dark:border-white  ">
                           <img
                              src={ele}
                              alt=""
                              className=" h-28 aspect-1 object-cover rounded"
                           />

                           <div className=" overflow-hidden p-1 m-1 border  border-gray-500 rounded">
                              <p
                                 style={{ lineBreak: "anywhere" }}
                                 className=" text-[.5rem] ">
                                 {ele}
                              </p>
                              <button
                                 className=" w-full text-xs bg-blue-500 text-white px-1 py-0.5 rounded"
                                 onClick={() => {
                                    navigator.clipboard.writeText(ele);
                                    toast.success("URL copied to clipboard!");
                                 }}>
                                 copy
                              </button>
                           </div>
                        </div>
                     );
                  })}
               </div>
            ) : (
               <p className=" text-gray-500">No images uploaded yet.</p>
            )}
         </div>
      </div>
   );
};
