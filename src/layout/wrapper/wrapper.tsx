import React, { ReactNode } from 'react'
import Header from '../header';


interface LayoutProps {
    children: ReactNode;
}

const Wrapper = ({ children }: LayoutProps) => {
  return (
    <>
        <Header />
            <main>{children}</main>
    </>
  )
}

export default Wrapper