// fonts file
// on dev mode will download each time, but on build they will be stored staticly

// primary font
import { Inter } from 'next/font/google';

// specify which subset you would want to load
export const inter = Inter({ subsets: ['latin'] });


// secondary font
import { Lusitana } from 'next/font/google';

// specify which options you would want to load from it
export const lusitana = Lusitana({ 
  weight: ['400', '700'],
  subsets: ['latin'],
})

