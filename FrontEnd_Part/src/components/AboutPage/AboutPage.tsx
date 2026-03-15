// import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
// import { userState } from "../../Slices/UserSlice"
// import DetailsOfUser from "./DetailsOfUser";
// import OrderOfUser from "./OrderOfUser";
import { userState } from "../../Slices/UserSlice";
import WishList from "./Components/WishList";
// import Modal from "../Modal/Modal"
import { setChildrenModal, setOpenMoadl } from "../../Slices/ModalSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserImageDiv from "./Components/UserImage";
import { checkEmail } from "./Components/helper";
import { UserNameAndUpadte } from "./Components/UserNameAndUpadte";
import { UserAllUploadedImgs } from "./Components/UserAllUploadedImgs";
import UserAddressDiv from "./Components/UserAddressDiv";
import OrderOfUser from "./Components/OrderOfUser";

type RightSection =
   | "profile_info"
   | "manage_address"
   | "shop_page"
   | "all_profile_pic"
   | "all_order"
   | "my_reviews"
   | "my_wish_list"
   | "my_cupons"
   | "saved_upi"
   | "saved_cards"
   | "";

const AboutPage = () => {
   const themeMode = useSelector((store: RootState) => store.themeReducer.mode);

   // // // Or give the user profile dependancy for animation of loading ----> (Below is used in animation of loading)
   // const hightLightProducts = useSelector((store: RootState) => store.allProductWithCatReducer.allHighlightProducts)

   const getUserData = userState().userData;
   // const dispatch = useDispatch();

   const [activeRightSection, setActiveRightSection] =
      useState<RightSection>("");

   // const pageNavigate = (page: RightSection) => {
   //    // // // Pushing into hstory ------->>
   //    const url = new URL(window.location.href);
   //    url.searchParams.set("page", `${page}`);
   //    history.pushState(null, "", url);

   //    // // // Psuhing into hstory ----->>
   //    setActiveRightSection(page);
   // };

   const searchParams = useLocation().search;
   // console.log(s.length > 0 && )

   useEffect(() => {
      const pageView = searchParams.split("=")[1];
      if (pageView !== activeRightSection) {
         setActiveRightSection(pageView as RightSection);
      }
   }, [searchParams]);

   return (
      <div
         className={`${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  p-2  w-full relative md:px-[7rem] md:!h-[90vh] overflow-auto flex flex-col md:flex-row `}>
         {/* Page Bar right */}
         <LeftSection
            activeRightSection={activeRightSection}
            setActiveRightSection={setActiveRightSection}
         />

         {/* Main Content ----->> */}
         <div className=" flex  flex-col  w-full my-5 md:my-0 md:w-[70%] relative top-0 md:top-10 md:ml-24 md:min-h-screen ">
            {/* <div className="text-center mt-10 text-3xl">
                    <p className=" underline">Welcome <span className=" capitalize font-bold ">{(getUserData.firstName || "") + " " + (getUserData.lastName || "")} 😊</span></p>
                </div> */}

            {activeRightSection === "shop_page" ? (
               <div>
                  <h1>Here we can show shop and products cretaed by user</h1>
               </div>
            ) : activeRightSection === "profile_info" ? (
               <>
                  <p className=" underline text-lg font-semibold text-center sm:text-start">
                     Profile Information
                  </p>

                  <div className=" flex flex-col items-center sm:items-start sm:flex-row gap-5  my-5">
                     <UserImageDiv userImgClass=" !w-32 !h-32  !rounded" />

                     <div>
                        <p
                           className={`  ${!themeMode ? "bg-slate-100" : "bg-slate-900"}   w-full rounded my-0.5 px-1 `}>
                           Email : {checkEmail(getUserData.email)}{" "}
                        </p>

                        <UserNameAndUpadte />
                     </div>
                  </div>
               </>
            ) : activeRightSection === "all_profile_pic" ? (
               <>
                  <p className=" underline text-lg font-semibold text-center sm:text-start">
                     All Profile Pics
                  </p>
                  <UserAllUploadedImgs />
               </>
            ) : activeRightSection === "manage_address" ? (
               <>
                  <p className="  mb-2 underline text-lg font-semibold text-center sm:text-start">
                     Manage Address
                  </p>
                  <UserAddressDiv containerClass=" max-w-xs " />
               </>
            ) : activeRightSection === "all_order" ? (
               <>
                  <p className=" underline text-lg font-semibold text-center sm:text-start">
                     All Orders
                  </p>
                  <OrderOfUser />
               </>
            ) : activeRightSection === "my_wish_list" ? (
               <>
                  <p className=" underline text-lg font-semibold text-center sm:text-start">
                     My Wish List
                  </p>
                  <WishList />
               </>
            ) : activeRightSection === "my_reviews" ? (
               <>
                  <p className=" underline text-lg font-semibold text-center sm:text-start">
                     My Reviews
                  </p>

                  <div className=" flex flex-col items-center sm:items-start sm:flex-row gap-5  my-5">
                     <p>Not implemented yet! my_reviews</p>
                  </div>
                  {/* <ReviewOfUser /> */}
               </>
            ) : activeRightSection === "my_cupons" ? (
               <>
                  <p className=" underline text-lg font-semibold text-center sm:text-start">
                     My Reviews
                  </p>

                  <div className=" flex flex-col items-center sm:items-start sm:flex-row gap-5  my-5">
                     <p>Not implemented yet! my_cupons</p>
                  </div>
                  {/* <ReviewOfUser /> */}
               </>
            ) : activeRightSection === "saved_upi" ? (
               <>
                  <p className=" underline text-lg font-semibold text-center sm:text-start">
                     My Reviews
                  </p>

                  <div className=" flex flex-col items-center sm:items-start sm:flex-row gap-5  my-5">
                     <p>Not implemented yet! saved_upi</p>
                  </div>
                  {/* <ReviewOfUser /> */}
               </>
            ) : activeRightSection === "saved_cards" ? (
               <>
                  <p className=" underline text-lg font-semibold text-center sm:text-start">
                     My Reviews
                  </p>

                  <div className=" flex flex-col items-center sm:items-start sm:flex-row gap-5  my-5">
                     <p>Not implemented yet! saved_cards</p>
                  </div>
                  {/* <ReviewOfUser /> */}
               </>
            ) : (
               // For else ---------->>
               <>
                  <>
                     <p className=" underline text-lg font-semibold text-center sm:text-start">
                        Profile Information
                     </p>

                     <div className=" flex flex-col items-center sm:items-start sm:flex-row gap-5  my-5">
                        <UserImageDiv userImgClass=" !w-32 !h-32  !rounded" />

                        <div>
                           <p
                              className={`  ${!themeMode ? "bg-slate-100" : "bg-slate-900"}   w-full rounded my-0.5 px-1 `}>
                              Email : {checkEmail(getUserData.email)}{" "}
                           </p>

                           <UserNameAndUpadte />
                        </div>
                     </div>
                  </>
                  {/* <DetailsOfUser /> */}
               </>
            )}

            <>
               {/* <div className="text-center mt-10 text-3xl">
                    <p className=" underline">Welcome <span className=" capitalize font-bold ">{(getUserData.firstName || "") + " " + (getUserData.lastName || "")} 😊</span></p>
                </div> */}

               {/* Details of user div ----------> */}
               {/* <DetailsOfUser /> */}

               {/* <WishList /> */}

               {/* Order Div ---------> */}
               {/* <OrderOfUser /> */}

               {/* Review on product div */}
               {/* <div></div> */}
            </>
         </div>
      </div>
   );
};

export default AboutPage;

const LeftSection = ({
   activeRightSection,
   setActiveRightSection,
}: {
   setActiveRightSection: React.Dispatch<React.SetStateAction<RightSection>>;
   activeRightSection: RightSection;
}) => {
   const getUserData = userState().userData;
   const dispatch = useDispatch();

   const isTabAndUpper = window.innerWidth > 768;

   const becomeSellerClickHandler = () => {
      // console.log(getUserData)
      // console.log(getUserData.shops)

      if (getUserData?.shops && getUserData?.shops.length > 0) {
         pageNavigate("shop_page");
         // // // add data into query of url ------>>

         // const url = new URL(window.location.href)
         // url.searchParams.set("page", 'shop_page')
         // history.pushState(null, '', url);

         // setActiveRightSection('shop_page')
         // TODO :    navigate to shop page
      } else {
         let ChildrenOfModal = (
            <div>
               <h1 className=" text-2xl font-semibold text-black">
                  No Shop found
               </h1>
            </div>
         );

         dispatch(setOpenMoadl(true));
         dispatch(setChildrenModal(ChildrenOfModal));
      }
   };

   const pageNavigate = (page: RightSection) => {
      // // // Pushing into hstory ------->>
      const url = new URL(window.location.href);
      url.searchParams.set("page", `${page}`);
      history.pushState(null, "", url);

      // // // Psuhing into hstory ----->>
      setActiveRightSection(page);
   };

   return (
      <div className=" w-full md:w-[30%] md:sticky  md:top-10 z-10  min-h-[25vh]  ">
         {/* Name div */}
         <div className=" flex gap-2 p-2 rounded shadow border">
            <img
               className=" w-14 h-14 rounded-full object-cover"
               src={getUserData.profilePic || ""}
               alt=""
            />
            <div>
               <div>Welcome,</div>
               <div className=" capitalize font-semibold text-lg">
                  {getUserData.firstName + " " + getUserData.lastName || ""}
               </div>
            </div>
         </div>

         {/* Other Links ----->> */}
         <div className=" md:my-2 p-2 rounded shadow border ">
            <div
               onClick={() => pageNavigate("all_order")}
               className={` cursor-pointer text-lg font-semibold uppercase md:border-b ${activeRightSection === "all_order" && "  bg-blue-100"} `}>
               My orders
            </div>

            <div>
               <details
                  open={isTabAndUpper && true}
                  className="md:border-b"
                  name={!isTabAndUpper ? "user_tab_group" : "#xyz"}>
                  <summary className="  text-lg font-semibold uppercase">
                     Account Setting
                  </summary>

                  <ul className="pl-5">
                     <li
                        onClick={() => pageNavigate("profile_info")}
                        className={` cursor-pointer ${activeRightSection === "profile_info" && "  bg-blue-100"}`}>
                        Profile Info
                     </li>
                     <li
                        onClick={() => pageNavigate("all_profile_pic")}
                        className={`  cursor-pointer ${activeRightSection === "all_profile_pic" && "  bg-blue-100"}`}>
                        All Profile Pics
                     </li>
                     <li
                        onClick={() => pageNavigate("manage_address")}
                        className={`  cursor-pointer ${activeRightSection === "manage_address" && "  bg-blue-100"}`}>
                        Manage Address
                     </li>
                  </ul>
               </details>
            </div>

            <div>
               <details
                  open={isTabAndUpper && true}
                  className="md:border-b"
                  name={!isTabAndUpper ? "user_tab_group" : "#yxz"}
                  // name="user_tab_group"
               >
                  <summary className=" text-lg font-semibold uppercase">
                     My Stuff
                  </summary>
                  <ul className="pl-5">
                     <li
                        className={` cursor-pointer ${activeRightSection === "my_reviews" && "  bg-blue-100"}  `}
                        onClick={() => pageNavigate("my_reviews")}>
                        My Reviwes
                     </li>
                     <li
                        className={` cursor-pointer ${activeRightSection === "my_wish_list" && "  bg-blue-100"}  `}
                        onClick={() => pageNavigate("my_wish_list")}>
                        My Wishlist
                     </li>
                     <li
                        className={` cursor-pointer ${activeRightSection === "my_cupons" && "  bg-blue-100"}  `}
                        onClick={() => pageNavigate("my_cupons")}>
                        My Cupons
                     </li>
                  </ul>
               </details>
            </div>

            <div>
               <details
                  open={isTabAndUpper && true}
                  className="md:border-b"
                  name={!isTabAndUpper ? "user_tab_group" : "#zyx"}
                  // name="user_tab_group"
               >
                  <summary className=" text-lg font-semibold uppercase">
                     Payments
                  </summary>
                  <ul className="pl-5">
                     <li
                        className={` cursor-pointer ${activeRightSection === "saved_upi" && "  bg-blue-100"}  `}
                        onClick={() => pageNavigate("saved_upi")}>
                        Saved UPI
                     </li>
                     <li
                        className={` cursor-pointer ${activeRightSection === "saved_cards" && "  bg-blue-100"}  `}
                        onClick={() => pageNavigate("saved_cards")}>
                        Saved Cards
                     </li>
                  </ul>
               </details>
            </div>

            <div
               onClick={becomeSellerClickHandler}
               className=" rounded bg-blue-500 p-2 text-white text-center text-lg font-bold md:my-2">
               Become Seller
            </div>
         </div>
      </div>
   );
};
