'use client';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RefObject } from 'react';
import { NavItem, NavSubItem } from '../types/navigation';

interface DropdownMenuProps {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef?: RefObject<HTMLLIElement | null>;
}

const DropdownMenu = ({ item, isOpen, onToggle, dropdownRef }: DropdownMenuProps) => {
  const pathname = usePathname();

  if (!item.children) return null;

  const hasActiveChild = item.children.some((child) => pathname === child.href);

  return (
    <li className="nav-item relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        onMouseEnter={() => onToggle()}
        onMouseLeave={() => onToggle()}
        className={`nav-link flex items-center hover:text-primary transition-colors ${
          hasActiveChild ? 'text-primary' : ''
        }`}
      >
        {item.label} <FontAwesomeIcon icon={faAngleDown} className="ms-2 align-middle" />
      </button>

      <div
        onMouseEnter={() => onToggle()}
        onMouseLeave={() => onToggle()}
        className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 w-48 space-y-1.5 transition-all duration-200 ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-3 invisible'
        }`}
      >
        {item.children.map((subItem: NavSubItem) => (
          <div key={subItem.href} className="nav-item">
            <Link
              className={`nav-link block px-3 py-2 rounded hover:bg-gray-50 transition-colors ${
                pathname === subItem.href ? 'text-primary bg-gray-50' : ''
              }`}
              href={subItem.href}
              target={subItem.isExternal ? '_blank' : undefined}
            >
              {subItem.label}
            </Link>
          </div>
        ))}
      </div>
    </li>
  );
};

export default DropdownMenu;
