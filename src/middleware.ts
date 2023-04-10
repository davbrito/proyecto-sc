import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("MIDDLREWARE", req);
  },
  {
    callbacks: {
      authorized: ({ token ,req }) => {
        console.log("MIDLECALLBACK",token,req)
        return true
      }
    },
  }
);

export const config = {
  matcher: ["/admin"],
};
