"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Logout = () => {

    const router = useRouter();
    useEffect(()=>{
        localStorage.clear();
        router.push("/login")
    }, []);

  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
