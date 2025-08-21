import './globals.css';
import { ReactNode } from 'react';
import ClientProviders from './ClientProviders';
import ErrorBoundary from './components/ErrorBoundary';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true}>
        <ErrorBoundary>
          <ClientProviders>
            {children}
          </ClientProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}
