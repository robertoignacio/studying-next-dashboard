// layout.tsx file: UI that is shared between multiple pages
import SideNav from '@/app/ui/dashboard/sidenav';

// export the Layout UI component
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

// The <Layout /> component receives a children prop.
// This {child} can either be a page or another layout.
// In this case, the pages inside /dashboard (/dashboard, /dashboard/invoices, /dashboard/customers) 
// will automatically be nested inside a <Layout />,inherited upstream the dashboard route.
// Click the sidebar links to see the layout in action.
// One benefit of using layouts in Next.js is that on navigation, 
// only the page components update while the layout won't re-render.
// This is called partial rendering.