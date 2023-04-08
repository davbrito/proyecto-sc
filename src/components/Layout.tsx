import React, { PropsWithChildren } from 'react'

export const LayoutContent = ({children}:PropsWithChildren) => {
  return (
    <main className='flex min-h-screen flex-col justify-center items-center '>
      {children}
    </main>
  )
}
