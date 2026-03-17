// import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { userState } from "../../Slices/UserSlice";
import { ShopInterface } from "../../Type/type";

function getInitial(email: string) {
   return email.charAt(0).toUpperCase();
}

const ShopDetails = () => {
   const params = useParams();
   //    const shops = userState().userData?.shops;
   const [shopData, setShopData] = useState<ShopInterface | null>(null);
   const [imgLoaded, setImgLoaded] = useState(false);

   const fetchShopDetails = async () => {
      try {
         const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/shop/${params.id}`,
         );
         const json = await response.json();
         if (json.status && json.data) {
            setShopData(json.data);
         }
      } catch (error) {
         console.error("Error fetching shop details:", error);
      }
   };

   useEffect(() => {
      //   if (params.id && shops && shops?.length > 0) {
      //      const shop = shops?.find(
      //         (shop) => typeof shop === "object" && shop.name === params.id,
      //      );
      //      console.log(shop);
      //   }

      if (params.id) fetchShopDetails();
   }, [params.id]);

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center flex-col gap-1 p-6">
         {/* <div>{JSON.stringify(shopData)}</div>; */}
         {shopData?.status === "inactive" && (
            <>
               {shopData?.msg && (
                  <p className=" text-black font-semibold">
                     Message : {shopData?.msg}
                  </p>
               )}
               <p className=" font-semibold text-red-500">
                  This shop is not verified yet! wait for admin response
               </p>
            </>
         )}
         <div
            className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden"
            style={{ border: "0.5px solid rgba(0,0,0,0.12)" }}>
            {/* Cover image */}
            <div className="relative h-64 bg-zinc-900 overflow-hidden group">
               <img
                  src={shopData?.img || ""}
                  alt={shopData?.name}
                  onLoad={() => setImgLoaded(true)}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                     imgLoaded
                        ? "opacity-85 group-hover:opacity-100"
                        : "opacity-0"
                  }`}
               />
               {/* gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />

               {/* Status badge */}
               <span
                  className={`absolute top-4 right-4 text-[11px] font-medium uppercase tracking-widest px-3 py-1 rounded-full border border-white/25 text-white backdrop-blur-sm ${
                     shopData?.status === "active"
                        ? "bg-emerald-700/60"
                        : " bg-red-800/50 "
                  }`}>
                  {shopData?.status}
               </span>

               {/* Title on image */}
               <h1
                  className="absolute bottom-5 left-6 text-white font-bold leading-none tracking-tight"
                  style={{
                     fontFamily: "'Playfair Display', Georgia, serif",
                     fontSize: "2rem",
                     textShadow: "0 2px 18px rgba(0,0,0,0.45)",
                  }}>
                  {shopData?.name}
               </h1>
            </div>

            <div className="px-6 pt-5 pb-6">
               <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                     {shopData?.createdBy?.profilePic ? (
                        <img
                           className="w-8 h-8 rounded-full object-cover border"
                           src={shopData?.createdBy?.profilePic}
                           alt=""
                        />
                     ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[12px] font-medium text-zinc-600 dark:text-zinc-300 shrink-0">
                           {getInitial(shopData?.createdBy?.email || "")}
                        </div>
                     )}
                     <div>
                        <p className="text-[11px] text-zinc-400">Created by</p>
                        <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200 truncate max-w-[160px]">
                           {shopData?.createdBy.email}
                        </p>
                     </div>
                  </div>

                  {/* <span className="text-[11px] text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg shrink-0">
                     {formatDate(shopData?.createdAt || "")}
                  </span> */}
               </div>
               <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-4" />
               <div className="grid grid-cols-3 gap-3 mb-5">
                  <StatCard value={shopData?.views || 0} label="Views" />
                  <StatCard value={shopData?.likes || 0} label="Likes" />
                  <StatCard
                     value={shopData?.products.length || 0}
                     label="Products"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ShopDetails;

const StatCard = ({ value, label }: { value: number; label: string }) => (
   <div className="flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-xl py-3 px-2">
      <span className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 leading-none">
         {value}
      </span>
      <span className="mt-1 text-[11px] tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
         {label}
      </span>
   </div>
);
