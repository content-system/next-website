'use client'

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function NavClient({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li style={{
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? 'blue' : 'white'
      }}>
      {children}
    </li>
  )
}
