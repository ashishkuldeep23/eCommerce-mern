import { Fragment, useEffect, useState } from "react";
// import {  fetchUser, userState } from "../../Slices/UserSlice"
// import { makeMoreRaedablePrice } from '../CartComp/CartComponent'
import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from '../../store'
import { useNavigate } from "react-router-dom";
import { fetchUser, userState } from "../../../Slices/UserSlice";
import { AppDispatch, RootState } from "../../../store";
import { CardDataInter, UserOrderOj } from "../../../Type/type";
import { orderState, updateOrder } from "../../../Slices/OrderSlice";
import { gettingTokenInCookieAndLocalHost } from "../../../Helper/Token";
import {
   fetchOneProductByID,
   setSingleProductData,
} from "../../../Slices/AllProductSlice";
import { makeMoreRaedablePrice } from "../../CartComp/CartComponent";
import { removeUnderScore } from "../../../Helper/removeUnderScore";
// import { fetchOneProductByID, setSingleProductData } from '../../Slices/AllProductSlice'
// import { CardDataInter } from '../../Slices/CartSlice'
// import { gettingTokenInCookieAndLocalHost } from '../../App'
// import { orderState, updateOrder } from '../../Slices/OrderSlice'
// import { CardDataInter, UserOrderOj } from '../../Type/type'
// import { gettingTokenInCookieAndLocalHost } from '../../Helper/Token'

let previousOrders = [
   {
      id: 1,
      name: "Earthen Bottle",
      href: "#",
      price: "$48",
      imageSrc:
         "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
         "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
   },
   {
      id: 2,
      name: "Nomad Tumbler",
      href: "#",
      price: "$35",
      imageSrc:
         "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
         "Olive drab green insulated bottle with flared screw lid and flat top.",
   },
   {
      id: 3,
      name: "Focus Paper Refill",
      href: "#",
      price: "$89",
      imageSrc:
         "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
         "Person using a pen to cross a task off a productivity paper card.",
   },
];

const OrderOfUser = () => {
   const getUserData = userState().userData;

   const themeMode = useSelector((state: RootState) => state.themeReducer.mode);

   const dispatch = useDispatch<AppDispatch>();

   const navigate = useNavigate();

   const [allOrdersOfUser, setAllOrdersOfUser] = useState<UserOrderOj[]>([]);

   // console.log(allOrdersOfUser)

   const isFullfilled = orderState().isFullFilled;

   useEffect(() => {
      if (gettingTokenInCookieAndLocalHost()) {
         // // // Call server to fetch user (calling server to fetch orders Or updated order data ---> ) ----->
         dispatch(fetchUser());
      }
   }, [isFullfilled]);

   // // // Set data for everytime when changes ------->
   useEffect(() => {
      if (getUserData.orders) {
         setAllOrdersOfUser([...getUserData.orders]);
      }
   }, [getUserData]);

   return (
      <div
         className={`${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"} py-10 flex justify-center flex-col items-center md:items-start `}>
         {/* order div */}

         <h2 className=" my-4 text-4xl text-center md:text-start  underline text-green-300">
            Your previous orders{" "}
         </h2>

         {/* Hide this div for now (remove hidden class when everything is done with logic) ---------> */}
         <div className="my-10 ">
            <OrderFilterSection
               allOrdersOfUser={allOrdersOfUser}
               setAllOrdersOfUser={setAllOrdersOfUser}
            />
         </div>

         {getUserData.orders && getUserData.orders.length > 0 ? (
            // // Actual UI code ---->

            <div className="flex flex-wrap justify-center md:justify-start items-start px-5 ">
               {allOrdersOfUser.map((order, i) => {
                  return (
                     <Fragment key={order.id}>
                        {/* {`${JSON.stringify(allOrdersOfUser.orders)}`} */}

                        <div className=" pb-28 flex justify-center">
                           <div
                              className={`  w-fit h-fit sm:pr-3 rounded  flex flex-wrap gap-2 justify-center md:justify-start items-center relative  border-b-2 border-l-2 ${!themeMode ? "border-green-500" : "border-green-300"} transition-all `}>
                              {/* single order detaio */}
                              <div
                                 className={`  w-full smm:w-72 h-72 border-2 rounded md:max-w-sm px-1 flex flex-col justify-center text-center relative ${!themeMode ? "bg-green-300 border-green-500 " : "bg-green-800 border-green-300 "}  transition-all`}>
                                 <p className=" font-bold font-mono underline text-xl absolute top-2 left-1/2 -translate-x-1/2 w-full">
                                    {" "}
                                    {allOrdersOfUser &&
                                       allOrdersOfUser?.length - i + ")"}
                                    Order Details
                                 </p>

                                 <div className=" text-start ml-3 pl-2  rounded ">
                                    <p className="capitalize text-xl font-bold ">
                                       {" "}
                                       {/* <span className="  underline ">
                                          Name
                                       </span>{" "} */}
                                       {order.fullName}
                                    </p>

                                    <div className="flex text-xl">
                                       {/* <span className=" underline ">
                                          Mo. No.:
                                       </span> */}
                                       <p>{order.phone},</p>
                                       <p className=" font-bold">
                                          {order.paymentMethod}
                                       </p>
                                    </div>

                                    <p className=" text-sm ">
                                       {/* <span className=" underline text-lg">
                                          Address
                                       </span>{" "} :{" "} */}
                                       {order.address.street +
                                          ", " +
                                          order.address.city +
                                          ", " +
                                          order.address.country +
                                          ", " +
                                          order.address.pincode}
                                    </p>

                                    <p className=" text-sm">
                                       <span className="  ">Date & Time</span> :{" "}
                                       {new Date(
                                          order.whenCreated,
                                       ).toLocaleString()}
                                    </p>

                                    <p>
                                       <span className="font-extrabold bg-yellow-500 px-1 rounded">
                                          {order.cartData.length}
                                       </span>{" "}
                                       Items{" "}
                                       <span className=" hidden sm:inline">
                                          ➡️
                                       </span>{" "}
                                       <span className=" inline sm:hidden">
                                          ⬇️
                                       </span>{" "}
                                    </p>

                                    <p>
                                       <span className=" font-bold">
                                          {order.totalPrice}
                                       </span>
                                    </p>
                                 </div>

                                 <div className=" w-11/12 flex  justify-end absolute bottom-0 right-0">
                                    {order.status !== "Received" && (
                                       <button
                                          className=" bg-yellow-400 px-2 text-black rounded font-bold hover:text-red-500 hover:bg-yellow-200 absolute left-0"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             dispatch(
                                                updateOrder({
                                                   body: {
                                                      whatUpdate: "status",
                                                      orderId: `${order.id}`,
                                                   },
                                                }),
                                             );
                                          }}>
                                          Make Received
                                       </button>
                                    )}
                                    <p
                                       className={`border-2 px-2 rounded ${!themeMode ? "border-green-500" : "border-green-300"}`}>
                                       Status : {order.status}
                                    </p>
                                 </div>
                              </div>

                              {/* <div className=' flex flex-wrap justify-evenly gap-2'> */}

                              {order.cartData &&
                                 order.cartData.length > 0 &&
                                 order.cartData.map(
                                    (order: CardDataInter, i) => (
                                       <SingleOrderData key={i} order={order} />
                                    ),
                                 )}

                              {/* </div> */}
                           </div>
                        </div>
                     </Fragment>
                  );
               })}
            </div>
         ) : (
            // // // Skeleton code ---->
            <div className="flex flex-col items-center px-5">
               {allOrdersOfUser && allOrdersOfUser.length === 0 && (
                  <div className="flex flex-col items-center">
                     <p className=" text-3xl">
                        No order found, order something first
                     </p>
                     <button
                        className=" bg-blue-500 px-2 rounded font-bold mt-3"
                        onClick={(e) => {
                           e.stopPropagation();
                           navigate("/");
                        }}>
                        GoTo Home🏠
                     </button>
                  </div>
               )}

               {/* Skeleton div -----> */}
               <div className=" flex justify-center flex-wrap gap-3 ">
                  {previousOrders &&
                     previousOrders.map((item, i) => {
                        return (
                           <div
                              key={i}
                              className="mt-10 w-full sm:w-auto text-black">
                              {/* <img className=" w-72 md:max-w-sm rounded" src={item.imageSrc} ></img> */}

                              <div className=" w-full sm:w-72  h-56 sm:h-72 bg-slate-300 rounded md:max-w-sm animate-pulse"></div>

                              <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1 mt-4 animate-pulse">
                                 {item.name}
                              </p>
                              <p className=" bg-slate-300 h-6 w-full rounded my-0.5 px-1 font-bold animate-pulse">
                                 {item.price}
                              </p>
                              <h2 className="bg-slate-300 h-6 w-full rounded my-0.5 px-1 animate-pulse">
                                 Date and Time{" "}
                              </h2>
                           </div>
                        );
                     })}
               </div>
            </div>
         )}
      </div>
   );
};

export default OrderOfUser;

function SingleOrderData({ order }: { order: CardDataInter }) {
   const navigate = useNavigate();

   const dispatch = useDispatch<AppDispatch>();

   const themeMode = useSelector((state: RootState) => state.themeReducer.mode);

   return (
      <div
         key={order.id}
         id="single_order_div"
         className="w-full smm:w-44 flex flex-col items-center overflow-hidden hover:cursor-pointer"
         onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${order.id}`);
            dispatch(fetchOneProductByID({ productId: order.id }));
            dispatch(setSingleProductData({ id: order.id }));
            window.scroll(0, 0);
         }}>
         <img
            className=" w-44 h-44 object-cover md:max-w-sm rounded hover:scale-150 transition-all"
            src={order.thumbnail}></img>

         {/* <div className=" w-full sm:w-72  h-56 sm:h-72 bg-slate-300 rounded md:max-w-sm"></div> */}

         <p
            className={` ${!themeMode ? "bg-slate-300" : "bg-slate-700"} h-6 w-full rounded my-0.5 px-1 mt-4 z-10 overflow-hidden`}>
            {order.title}
         </p>
         <p
            className={`${!themeMode ? "bg-slate-300" : "bg-slate-700"} h-6 w-full rounded my-0.5 px-1 font-bold z-10 overflow-hidden`}>
            ₹{makeMoreRaedablePrice(order.price)} X {order.quantity}
         </p>
         {order.type && (
            <>
               {/* <p>{JSON.stringify(order.verity)}</p> */}
               <p
                  className={`${!themeMode ? "bg-slate-300" : "bg-slate-700"} h-6 w-full rounded my-0.5 px-1 font-bold z-10 overflow-hidden`}>
                  <span className=" font-semibold  capitalize">
                     {removeUnderScore(order?.verity?.name)}{" "}
                  </span>{" "}
                  {" : "}{" "}
                  <span className=" font-semibold  capitalize">
                     {order?.verity?.verity &&
                        order?.verity?.verity[0]?.data &&
                        removeUnderScore(
                           order?.verity?.verity[0]?.data[0]?.name,
                        )}
                  </span>
               </p>
            </>
         )}
         {/* <h2 className="bg-slate-300 h-6 w-full rounded my-0.5 px-1">Date and Time </h2> */}
      </div>
   );
}

function OrderFilterSection({
   allOrdersOfUser,
   setAllOrdersOfUser,
}: {
   allOrdersOfUser: UserOrderOj[];
   setAllOrdersOfUser: React.Dispatch<React.SetStateAction<UserOrderOj[]>>;
}) {
   type TypeArrOfFilterOption =
      | "Oldest"
      | "Newest"
      | "Min Price"
      | "Max Price"
      | "Category"
      | "Status";

   const arrOfFilterOption: TypeArrOfFilterOption[] = [
      "Oldest",
      "Newest",
      "Min Price",
      "Max Price",
      "Category",
      "Status",
   ];

   function filterOrders(whichOneClicked: TypeArrOfFilterOption) {
      switch (whichOneClicked) {
         // case 'Oldest':
         // case 'Newest':
         // case 'Min Price':
         // case 'Max Price':
         // case 'Category':
         // case 'Status':

         case "Status":
            // console.log(allOrdersOfUser[0].totalPrice)
            let arr1 = allOrdersOfUser.sort((a, b) => {
               if (a.status < b.status) {
                  return -1;
               } else {
                  return 1;
               }
            });

            // console.log(arr)

            setAllOrdersOfUser([...arr1]);
            break;

         default:
            break;
      }
   }

   return (
      <>
         {allOrdersOfUser.length !== 0 ? (
            <div className="flex justify-center items-center">
               <h1 className="mx-2 font-bold rounded border px-2 py-1">
                  Filter By ➡️
               </h1>
               <ul className="flex flex-wrap justify-center gap-3 px-2 py-1 rounded ">
                  {arrOfFilterOption.map((ele, i) => {
                     return (
                        // <>
                        <li
                           key={i}
                           className="border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all"
                           onClick={(e) => {
                              e.stopPropagation();
                              filterOrders(ele);
                           }}>
                           {ele}
                        </li>

                        // </>
                     );
                  })}

                  {/* <li
                                className='border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all'
                                onClick={(e) => { e.stopPropagation(); filterOrders("oldest") }}
                            >Oldest</li>
                            <li
                                className='border font-bold  rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all'
                                onClick={(e) => { e.stopPropagation(); filterOrders('newest') }}
                            >Newest</li>
                            <li
                                className='border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all'
                                onClick={(e) => { e.stopPropagation(); filterOrders('minprice') }}
                            >Min Price</li>
                            <li
                                className='border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all'
                                onClick={(e) => { e.stopPropagation(); filterOrders('maxprice') }}
                            >Max Price</li>
                            <li
                                className='border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all'
                                onClick={(e) => { e.stopPropagation(); filterOrders('category') }}
                            >Category</li>
                            <li
                                className='border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all'
                                onClick={(e) => { e.stopPropagation(); filterOrders('status') }}
                            >Status</li> */}
               </ul>
            </div>
         ) : (
            <div className="flex justify-center items-center">
               <h1 className="mx-2 font-bold rounded border px-2 py-1">
                  Filter By ➡️
               </h1>
               <ul className="flex flex-wrap justify-center gap-3 px-2 py-1 rounded ">
                  <li className="w-16 h-6  bg-slate-300 animate-pulse border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all"></li>
                  <li className="w-16 h-6 bg-slate-300 animate-pulse border font-bold  rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all"></li>
                  <li className="w-16 h-6 bg-slate-300 animate-pulse border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all"></li>
                  <li className="w-16 h-6 bg-slate-300 animate-pulse border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all"></li>
                  <li className="w-16 h-6 bg-slate-300 animate-pulse border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all"></li>
                  <li className="w-16 h-6 bg-slate-300 animate-pulse border font-bold rounded px-2 hover:-translate-y-1 hover:cursor-pointer hover:opacity-50 transition-all"></li>
               </ul>
            </div>
         )}

         {/* <p>{allOrdersOfUser.length}</p> */}
      </>
   );
}
