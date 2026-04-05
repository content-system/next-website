'use client'

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export function NavClient({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <li className={isActive ? "active" : ""}>{children}</li>
  )
}
