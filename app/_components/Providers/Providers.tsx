"use client"
import { SessionProvider } from "next-auth/react";
import { store } from '@/Store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

export default function Providers({children}:{children:ReactNode}) {
  
  const client = new QueryClient();
  
    return (
    <>
    
    <Provider store={store}>
<SessionProvider>
<QueryClientProvider client={client}>

{children}

</QueryClientProvider>
</SessionProvider>

    </Provider>
    
    
    </>
  )
}
