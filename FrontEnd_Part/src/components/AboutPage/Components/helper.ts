const validateEmail = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/;
export const checkEmail = (email: string) => {
   // // // If data not matched with email then show this type ----->
   if (!validateEmail.test(email)) {
      email = `Google Account (${email.slice(0, 7)}...)`;
   }

   return email;
};