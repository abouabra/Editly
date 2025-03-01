"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from './search-input'
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'

const NavBar = () => {
  return (
    <nav className='flex justify-between items-center h-full w-full'>
        <div className='flex gap-3 items-center shrink-0 pr-6'>
          <Link href='/'>
            <Image src='/logo.svg' alt='logo' width={36} height={36} />
          </Link>
          <h3 className='text-xl font-medium'>
            Editly
          </h3>
        </div>
        <SearchInput />
        <div className='flex gap-3 items-center pl-6'>
          <OrganizationSwitcher
            afterCreateOrganizationUrl={"/"}
            afterLeaveOrganizationUrl={"/"}
            afterSelectOrganizationUrl={"/"}
            afterSelectPersonalUrl={"/"}
          />
          <UserButton />
        </div>
    </nav>
  )
}

export default NavBar