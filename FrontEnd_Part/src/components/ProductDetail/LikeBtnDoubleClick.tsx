
export const LikeBtnDoubleClick = ({ doubleClickLike = false, left = false }: { doubleClickLike: boolean, left: boolean }) => {
    return (
        <>
            {

                doubleClickLike
                &&
                <i
                    className={`ri-heart-3-fill text-9xl absolute top-1/2 -translate-y-1/2 text-red-500 animate__animated animate__zoomIn ${!left ? "left-5 " : "left-1/2  -translate-x-1/2"} `}
                    id='double_click_like_eff'
                ></i>

            }
        </>
    )
}
