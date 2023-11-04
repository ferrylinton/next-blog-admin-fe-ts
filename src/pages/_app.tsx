import Layout from '@/components/Layout';
import { AppProvider } from '@/providers/app-provider';
import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';


function App({ Component, pageProps }: AppProps) {

  return (
    <AppProvider>
      <Layout clientInfo={pageProps.clientInfo}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default appWithTranslation(App)