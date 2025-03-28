import './globals.css';
import './print.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flexible Functions AI - Financial Dashboard',
  description: 'Financial statements for Flexible Functions AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}