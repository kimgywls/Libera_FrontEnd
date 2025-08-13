import './globals.css';
import { ReactNode } from 'react';
import ClientProviders from './ClientProviders';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
