// import React from 'react'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { toast } from "sonner";
import { gettingTokenInCookieAndLocalHost } from "../../../Helper/Token";
import { setAllBrands } from "../../../Slices/AllProductSlice";

const CreateBrand = () => {
    const dispatch = useDispatch();

    const allBrands = useSelector(
        (state: RootState) => state.allProductWithCatReducer.brandAllData,
    );
    // const allBrands = useSelector(
    //     (state: RootState) => state.allProductWithCatReducer.filterAllBrands,
    // );
    const [updatingBrand, setUpdatingBrand] = useState(
        allBrands[0]?.name || "",
    );

    const [switchCreateUpdateBrand, setSwitchCreateUpdateBrand] = useState(false)
    const [newBrandData, setNewBrandData] = useState<{ name: string, img: string }>({
        name: '',
        img: ''
    })

    useEffect(() => {
        if (updatingBrand) {
            let findCat = allBrands.find(
                (cat) => cat.name.toLowerCase() === updatingBrand.toLowerCase(),
            );
            if (findCat) {
                setNewBrandData({ name: findCat.name, img: findCat.img });
            }
        }
    }, [updatingBrand]);

    useEffect(() => {
        if (switchCreateUpdateBrand && allBrands.length > 0) {
            setNewBrandData({
                name: allBrands[0].name,
                img: allBrands[0].img,
            });
        } else {
            setNewBrandData({ name: "", img: "" });
        }
    }, [switchCreateUpdateBrand]);

    const submitHandler = async () => {
        try {
            // // // chcek name and img is given or not and other ------------>>

            if (!newBrandData.name) {
                toast.error("Brand name is required");
                return;
            }


            if (allBrands.map(b => b.name).includes(newBrandData.name) && !switchCreateUpdateBrand) {
                toast.error("Brand name already exist");
                return
            }

            // console.log(newBrandData)

            // // // other validation ------------->>

            // // // Now call dispatch fn ---------->>

            const option: RequestInit = {
                method: switchCreateUpdateBrand ? "PUT" : "POST",
                credentials: "include",
                headers: {
                    token: `${gettingTokenInCookieAndLocalHost()}`,
                    "Content-Type": "application/json", // // UseFul for POST and PUt methods.
                    // "Access-Control-Allow-Credentials": true
                },
                body: JSON.stringify({ ...newBrandData }),
            };

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}${!switchCreateUpdateBrand ? `/brandCategory` : `/updateBarnd/${updatingBrand || ""}  `}`,
                option,
            );
            const json = await response.json();
            // return data

            // console.log(json)

            if (json?.status) {

                setNewBrandData({
                    name: "",
                    img: "",
                });

                setSwitchCreateUpdateBrand(false)

                dispatch(setAllBrands({ name: json.data?.name || "", img: json.data?.img || "" }));
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
        <div className={` border rounded p-2 m-2  w-full sm:w-[40%] flex flex-col justify-center items-center ${!switchCreateUpdateBrand ? 'bg-fuchsia-200 dark:bg-fuchsia-950 ' : 'bg-rose-200 dark:bg-rose-950'} `}>

            <h1 className="mb-2 underline text-xl sm:text-3xl font-semibold "> {switchCreateUpdateBrand ? 'Update' : 'Create'} Brand</h1>

            <div className=" flex gap-5">
                <div className=" flex items-center gap-1">
                    <input onClick={() => setSwitchCreateUpdateBrand(false)} defaultChecked={switchCreateUpdateBrand === false} type="radio" name="switch_brand" id="create_brand" />
                    <label htmlFor="create_brand">Create Brand</label>
                </div>
                <div className=" flex items-center gap-1">

                    <input onClick={() => setSwitchCreateUpdateBrand(true)} type="radio" name="switch_brand" id="update_brand" />
                    <label htmlFor="update_brand">Update Brand</label>
                </div>

            </div>

            <div className=" flex flex-col justify-center">
                {
                    switchCreateUpdateBrand ?
                        <div className="  p-1 rounded  flex  justify-center gap-2 m-1 mx-auto">
                            <label htmlFor="choose_brand">Choose </label>
                            <select
                                className=" w-full bg-inherit border border-inherit  font-bold rounded capitalize py-1"
                                name=""
                                id="choose_brand"
                                onChange={(e) => setUpdatingBrand(e.target.value)}
                                value={updatingBrand}>
                                {allBrands.length &&
                                    allBrands.map((brand, i) => {
                                        return (
                                            <option
                                                key={i}
                                                className="capitalize"
                                                value={`${brand?.name}`}>
                                                {brand?.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        : <></>
                }


                <div className=" flex justify-center gap-2 m-1 ">
                    <label htmlFor="brand_name" className=" " >Name : </label>
                    <input
                        placeholder="Brand Name"
                        type="text"
                        name=""
                        id="brand_name"
                        // value={
                        //     switchCreateUpdateBrand
                        //         ? newBrandData.name || updatingBrand
                        //         : ""
                        // }

                        value={newBrandData.name}
                        onChange={(e) => setNewBrandData({ ...newBrandData, name: e.target.value })}
                    />
                </div>
                <div className=" flex  justify-center gap-2 m-1 ">
                    <label htmlFor="brand_img" className=" ">URL : </label>
                    <input placeholder="Brand Img Url" type="text" name="" id="brand_img" value={newBrandData.img} onChange={(e) => setNewBrandData({ ...newBrandData, img: e.target.value })} />
                    {newBrandData?.img && (
                        <img
                            className=" h-10 w-10 rounded object-cover "
                            src={newBrandData.img}
                        />
                    )}
                </div>


                <button
                    onClick={() => submitHandler()}
                    className=" ml-48 border p-1.5 bg-green-500 text-white font-bold rounded border-black">
                    Submit
                </button>


            </div>


        </div>
    )
}

export default CreateBrand