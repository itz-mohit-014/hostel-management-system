"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const Auth = () => {
    const session = useSession();

    useEffect(() => {
        if(session.data?.user.id){
            window.location.href = "/dashboard";
        }
    }, [ session ])

  return null;
}

export default Auth