export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("CHECK SESSION START", from);
  const currentTime = Math.floor(Date.now() / 1000);
  const loggedIn = localStorage.getItem("loggedIn");
  console.log("storage status:", loggedIn);
  if (loggedIn === "true") {
    const bearerToken = useCookie("accessToken").value;
    const tokenExp = useCookie("accessTokenExp").value;
    if (!bearerToken || !tokenExp || Number(tokenExp) - currentTime <= 15) {
      console.log("GET NEW ACCESS TOKEN");
      // get new JWT
      const newJWT = await useRefreshToken(
        useCookie("refreshToken").value as string
      );
      const jwtCookie = useCookie<JWT>("jwt");
      jwtCookie.value = newJWT;
      // save in cookies
      await useJwt(newJWT);
      console.log("AFTER LOAD", useCookie("accessToken").value);
    }
    return; //load static data?
  } else {
    // check if access token exists in cookies; if not login
    console.log("Access Cookie exists?", useCookie("accessToken").value);
    if (!useCookie("accessToken").value) {
      console.log("navigate to login, no access token");
      return navigateTo("/login", { replace: true }); // what happens if param to was already login?
    } else {
      console.log("Access Cookie exists!");
      const accessTokenExp = Number(useCookie("accessTokenExp").value);
      // check if access token is still valid
      if (accessTokenExp >= currentTime) {
        localStorage.setItem("loggedIn", "true");
        return; //load static data?
      } else {
        // if access token is invalid check if refresh token is still valid
        const refreshTokenExp = Number(useCookie("refreshTokenExp").value);
        // refresh token is valid: get a new jwt and store tokens in cookies
        if (refreshTokenExp >= currentTime) {
          // get new JWT
          const newJWT = await useRefreshToken(
            useCookie("refreshToken").value as string
          );
          const jwtCookie = useCookie<JWT>("jwt");
          jwtCookie.value = newJWT;

          // save in cookies
          await useJwt(newJWT);
          // ???? Load config and static data here ? ????
          localStorage.setItem("loggedIn", "true");
          return; //load static data?
        } else {
          return navigateTo("/login"); // what happens if param to was already login?
        }
      }
    }
  }
  /**
   * 0. Check localStorage sessionValid?
   *  if (valid) return
   *  else continue below
   *
   * 1. Check Cookie exists
   *  if (no)
   *      navigateTo("login")
   *  else
   *      2. Check Cookie (access token)
   *          if (valid) return
   *          else
   *              3. Check Cookie (refresh token)
   *                  if (valid)
   *                      get new JWT
   *                      save in cookies
   *                      ???? Load config and static data here? ????
   *                      return
   *                  else
   *                       navigateTo("login")
   *
   *
   *
   * x. before valid session return: should be the static data loaded? or in another file?
   */
});
