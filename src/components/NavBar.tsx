import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


export const NavBar = () => {
    const {data} = useSession()

    return (
        <nav className="flex w-full max-w-lg justify-between bg-slate-600 border rounded-md font-semibold border-solid border-slate-800 p-3 mt-5 mx-auto">
            <ul className='flex gap-x-6'>
                <li>
                    <Link href={"/"} 
                        className='text-lg text-blue-400 hover:text-blue-200 transition-all'
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={"/login"} 
                        className='text-lg text-blue-400 hover:text-blue-200 transition-all'
                    >
                        Sign in
                    </Link>
                </li>
                <li>
                    <Link href={"/register"} 
                        className='text-lg text-blue-400 hover:text-blue-200 transition-all'
                    >
                        Sign up
                    </Link>
                </li>
            </ul>

            <div>
                { data && <button className='bg-red-500 text-red-800 border 
                    rounded hover:bg-red-400 transition-colors py-2 px-3' 
                onClick={( ) => {signOut({callbackUrl:"/login"})}}
                > 
                    Logout
                </button>
                }
            </div>
        </nav>
  )
}
