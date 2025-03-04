import { withAuth } from 'next-auth/middleware'


export default withAuth (
    {
        pages:{
            signIn:"/auth/signin"
        }
    }
) 

// protected route
export const config = {
    matcher: ["/dashboard/:path*"],
};