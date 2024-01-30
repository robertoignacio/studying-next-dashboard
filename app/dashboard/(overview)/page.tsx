// only the directories with a page.tsx file will be shown at the site app path (called 'leaves')

import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

// moved fetchrevenue() to a Suspense component
// import { fetchRevenue } from '@/app/lib/data';
// moved fetchLatestInvoices() to a Suspense component;
//import { fetchLatestInvoices } from '@/app/lib/data';
import { fetchCardData } from '@/app/lib/data'; 

// import <Suspense> from React, to wrap it around <RevenueChart /> and <LatestInvoices />
import { Suspense } from 'react';
// You can pass it fallback components
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { LatestInvoicesSkeleton } from '@/app/ui/skeletons';


// Page is an async component, which allows you to use await to fetch data
export default async function Page() {

  // removed
  // const revenue = await fetchRevenue();

  // removed 
  // const latestInvoices = await fetchLatestInvoices();

  // destructure the data returned from fetchCardData
  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = await fetchCardData();

  // Note that we need to wait for fetchRevenue() to execute before fetchLatestInvoices() can start running,
  // which is a pattern called "network waterfall". 
  // There are cases where you want waterfalls because you want a condition to be satisfied before you make the next request.
  // But in this case, we don't need to wait for one request to finish before we make the next one.
  // We can improve this by using Promise.all() to run both functions at the same time.
  // By using this pattern, you can start executing all data fetches at the same time, which can lead to performance gains.
  // However, there is one disadvantage of relying only on this JavaScript pattern: what happens if one data request is slower than all the others?
  // With dynamic rendering, your application is only as fast as your slowest data fetch.

  const data = await Promise.all([ totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers]);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* remove the props */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}