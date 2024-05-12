"use client"

import Cart from '@/app/layouts/Cart';
import Hero from '@/app/layouts/Hero';
import Nav from '@/app/layouts/Nav';
import { client } from '@/app/services/queryClient';
import { QueryClientProvider } from 'react-query';
import OpenCartProvider from '@/app/contexts/openCartProvider';
import AddCartProvider from '@/app/contexts/addCartProvider';

export default function Home() {
  
  return (
    <QueryClientProvider client={client}>
      <AddCartProvider>
        <OpenCartProvider>
          <main>
            <Nav />
            <Cart />
            <Hero />
          </main>
        </OpenCartProvider>
      </AddCartProvider>
    </QueryClientProvider>
  );
}
