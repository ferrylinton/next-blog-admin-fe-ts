import { GetServerSidePropsContext } from 'next';
import { SSRConfig } from 'next-i18next';

export type GetServerSidePropsFn = (ssrConfig: SSRConfig, token: string) => {}