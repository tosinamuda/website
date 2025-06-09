'use client';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem, NavSubItem } from '../types/navigation';

interface MobileDropdownProps {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onMenuClose: () => void;
}

const MobileDropdown = ({ item, isOpen, onToggle, onMenuClose }: MobileDropdownProps) => {
  const pathname = usePathname();

  if (!item.children) return null;

  const hasActiveChild = item.children.some((child) => pathname === child.href);

  return (
    <li className="nav-item">
      <button
        onClick={onToggle}
        className={`nav-link flex items-center justify-between w-full text-left ${
          hasActiveChild ? 'text-primary' : ''
        }`}
      >
        {item.label}
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`align-middle transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <ul
        className={`overflow-hidden transition-all duration-300 space-y-2 ${
          isOpen ? 'max-h-96 mt-2' : 'max-h-0'
        }`}
      >
        {item.children.map((subItem: NavSubItem) => (
          <li key={subItem.href} className="nav-item">
            <Link
              className={`nav-link block pl-4 transition-colors ${
                pathname === subItem.href ? 'text-primary' : 'text-slate-800'
              }`}
              href={subItem.href}
              target={subItem.isExternal ? '_blank' : undefined}
              onClick={onMenuClose}
            >
              {subItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MobileDropdown;
