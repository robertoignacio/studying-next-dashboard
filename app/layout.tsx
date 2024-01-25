// This is called a root layout and is required. 
// Any UI you add to the root layout will be shared across all pages in your application.
// You can use the root layout to modify your <html> and <body> tags, and add metadata.

// import css globals
import '@/app/ui/global.css'

// import primary font
import { inter } from '@/app/ui/fonts';
// then add it as a class to the <body>
// Tailwind antialiased class smooths out the font


export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
