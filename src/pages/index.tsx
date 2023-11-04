import { withAuth } from '@/services/wrapper-service';
import { AuthData } from '@/types/auth-type';
import { ClientInfo } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { Righteous } from 'next/font/google';
import parser from 'ua-parser-js';


type Props = {
  clientInfo: ClientInfo,
  userAgentHeader: string
}

export default function HomePage({ clientInfo, userAgentHeader }: Props) {

  const { t } = useTranslation('common');

  const authData = clientInfo.authData as AuthData;

  const userAgent = parser(userAgentHeader);

  return (
    <div className='w-full h-full grow flex flex-col justify-center items-center'>
      <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5 text-center'>
        <div className='text-4xl sm:text-5xl drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{t('welcome')}</div>
        <div className='text-2xl sm:text-3xl my-3 text-lime-500 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{authData.username}</div>

        <div className='text-xl mt-6'>{t('information')}</div>
        <div>Browser : {userAgent.browser.name}</div>
        <div>OS : {userAgent.os.name}</div>
        <div className='text-sm sm:max-w-[400px]'>{userAgent.ua}</div>
      </div>
    </div>
  )
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {


  return {
    props: {
      userAgentHeader: context.req.headers['user-agent'],
      namespaces: ['common'],
    }
  }
})