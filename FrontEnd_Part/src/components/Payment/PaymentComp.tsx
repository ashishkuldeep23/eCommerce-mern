
// import React from 'react'

import { useSelector } from "react-redux"
import { RootState } from "../../store"

import CartComponent from "../CartComp/CartComponent"


const PaymentComp = () => {

  const themeMode = useSelector((store: RootState) => store.themeReducer.mode)

  return (
    <>

      <div className={` h-allAk flex flex-col items-center overflow-y-scroll shadow-xl ${!themeMode ? "bg-white text-gray-900" : "bg-black text-gray-200"}  `}>




        <div className=" flex flex-col-reverse md:flex-row">

          <div className=" md:w-3/5 p-2 px-3 flex flex-col items-center">

            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit assumenda, aliquam dolorem corporis quod nostrum sint tempora esse. Ducimus pariatur officia officiis, rem qui quo porro perspiciatis commodi fuga! Ipsam incidunt sed iste exercitationem veritatis, corrupti beatae. Nesciunt porro placeat a nostrum ut nulla possimus esse vero minima! Ipsam iusto reprehenderit officia omnis, nulla magnam dolor esse aliquam eveniet magni, minus porro facere consectetur. Deleniti vero, exercitationem nobis, ipsum voluptatem iure corporis laborum modi, rerum similique necessitatibus voluptatibus numquam. Animi accusamus, id nemo nihil obcaecati quia dolores incidunt. Eligendi molestias quasi corrupti illum, quisquam laudantium exercitationem commodi temporibus quibusdam nulla deserunt! Similique non et voluptatum consequatur adipisci iusto quis, voluptate inventore blanditiis soluta ipsum? Tempora omnis reprehenderit, aspernatur dicta magni saepe suscipit animi recusandae iusto, soluta libero voluptates sit odit, fugit quae! Enim suscipit earum vitae repellat obcaecati error, aspernatur perferendis, quam accusamus incidunt minus accusantium necessitatibus vel nihil corrupti quidem dignissimos aperiam. Tempora quibusdam quis est iure neque perferendis, culpa vero pariatur laboriosam similique eligendi fugit sunt mollitia optio praesentium? Distinctio magnam ipsa, quibusdam laboriosam quas enim quasi est suscipit, culpa dolore tempora nemo harum optio rem quam, facere magni esse eligendi possimus sunt consectetur? Minus quidem non ratione? Rerum, quisquam dicta! Aliquid beatae officia harum iste optio deleniti, perferendis ipsa alias, corporis nemo doloremque quos exercitationem, sint quas!

            <div className=" hidden md:flex hover:cursor-pointer ">
              <p className="text-5xl my-10 border px-10 py-2 font-bold rounded-full bg-green-500 text-white">Pay Now</p>
            </div>

          </div>


          <div className=" md:w-2/5">
            <CartComponent mainCartComp={false} />
          </div>

        </div>



        <div className=" md:hidden hover:cursor-pointer">
          <p className="text-5xl my-10 border px-10 py-2 font-bold rounded-full bg-green-500 text-white">Pay Now</p>
        </div>


      </div>


    </>
  )
}

export default PaymentComp
