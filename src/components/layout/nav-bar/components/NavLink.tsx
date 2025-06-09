'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '../types/navigation';

interface NavLinkProps {
  item: NavItem;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ item, onClick, className = '' }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  if (!item.href) return null;

  return (
    <Link
      className={`nav-link transition-colors ${isActive ? 'text-primary' : ''} ${className}`}
      href={item.href}
      target={item.isExternal ? '_blank' : undefined}
      onClick={onClick}
    >
      {item.label}
    </Link>
  );
};

export default NavLink;
