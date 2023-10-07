import Layout from '@/components/Layout';
import { AppProvider } from '@/providers/app-provider';
import '@/styles/globals.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useState } from 'react';

const instance = new QueryClient();

function App({ Component, pageProps }: AppProps) {

  const [queryClient] = useState(instance);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App)