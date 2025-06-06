import './globals.css';
import { Space_Grotesk } from 'next/font/google';
import ClientLayout from './ClientLayout';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata = {
  title: 'Flik - Architectural Visualization Studio',
  description: 'Professional architectural visualization studio specializing in architectural and interior design using Unreal Engine 5.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
