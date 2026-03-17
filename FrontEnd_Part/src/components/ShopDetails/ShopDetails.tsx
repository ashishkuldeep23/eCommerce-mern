// import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { userState } from "../../Slices/UserSlice";
import { ShopInterface } from "../../Type/type";

const ShopDetails = () => {
   const params = useParams();
   //    const shops = userState().userData?.shops;
   const [shopData, setShopData] = useState<ShopInterface | null>(null);

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

   return <div>{JSON.stringify(shopData)}</div>;
};

export default ShopDetails;
