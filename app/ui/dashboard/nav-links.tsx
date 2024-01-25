'use client';
// Next.js provides a hook called usePathname() that you can use to check the path of the current page.
// A common UI pattern is to show an active link to indicate to the user what page they are currently on.
// Since usePathname() is a hook, you'll need to turn nav-links.tsx into a Client Component: 'use client' directive to the top of the file.
import { usePathname } from 'next/navigation';

// import clsx library to conditionally apply class names when the link is active.
import clsx from 'clsx';

// import icons from Heroicons
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

// with <a> links there will be a full reload of the page
// with <Link> components there will be a client-side transition
// with <Link> you should be able to navigate between the pages without seeing a full refresh.
import Link from 'next/link';

// Links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { 
    name: 'Home', 
    href: '/dashboard', 
    icon: HomeIcon 
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { 
    name: 'Customers', 
    href: '/dashboard/customers', 
    icon: UserGroupIcon 
  },
];


// :::::::::::::::::::::::::
// ::: export NavLinks component (to be loaded in the SideNav component)

export default function NavLinks() {
  // usePathname() hook to check the path of the current page
  const pathname = usePathname();
  // You can use the clsx library introduced in the chapter on CSS styling,
  // to conditionally apply class names when the link is active.

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
