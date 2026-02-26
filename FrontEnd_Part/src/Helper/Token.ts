

// // fn write to check only based on this ---> calling fetch user ---> in LocalHost also -->
export const gettingTokenInCookieAndLocalHost = () => {

    let token: boolean | string = false;

    // let checkTokenInLoaclHost = localStorage.getItem("userToken")
    // if (checkTokenInLoaclHost) {
    //     token = JSON.parse(checkTokenInLoaclHost)
    // }

    // // // now check token in cookie also ---->

    // let checkInCookie = document.cookie
    // let cookieInArr = checkInCookie.split("=")
    // let checkTokenPresent = cookieInArr.indexOf("acom_token")

    let checkInCookie = document.cookie
    // let cookieInArr = checkInCookie.split("; ").map((cookie) => cookie.split("=")).flat()
    let cookieInArr = checkInCookie.split("; ").map((cookie) => cookie.split("=")).flat()
    let checkTokenPresent = cookieInArr.indexOf("acom_token")

    // console.log(document.cookie)
    // console.log({ cookieInArr, checkTokenPresent })
    if (checkTokenPresent !== -1) {
        // token = true;
        let actualToken = cookieInArr[checkTokenPresent + 1]
        // console.log("Token in cookie is present and token is ", actualToken)
        token = actualToken
    }

    return token
}



// // // set user token in cookie and localHost both ---->
export const setUserTokenInCookie = (token: string) => {
    // localStorage.setItem("userToken", JSON.stringify(token))
    // // // Set token in cookie also ---->
    // document.cookie = `token=${token}; path=/; max-age=3600; secure; samesite=strict`;
    document.cookie = `acom_token=${token}; path=/; max-age=259200; secure; samesite=strict`;
}





export const removeUserTokenInCookie = () => {
    localStorage.removeItem("userToken")
    // // // Remove token from cookie also ---->
    // document.cookie = "token=; path

    document.cookie = "acom_token=; path=/; max-age=0; secure; samesite=strict";
}


