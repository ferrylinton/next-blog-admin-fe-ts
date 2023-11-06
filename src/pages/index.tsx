import { withAuth } from '@/services/wrapper-service';
import { AuthData } from '@/types/auth-type';
import { ClientInfo } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import parser from 'ua-parser-js';


type Props = {
  clientInfo: ClientInfo,
  userAgent: parser.IResult
}

export default function HomePage({ clientInfo, userAgent }: Props) {

  const { t } = useTranslation('common');

  const authData = clientInfo.authData as AuthData;

  return (
    <div className='w-full h-full grow flex flex-col justify-center items-center'>
      <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5 text-center'>
        <div className='text-4xl sm:text-5xl drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{t('welcome')}</div>
        <div className='text-2xl sm:text-3xl my-3 text-lime-500 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{authData.username}</div>

        {userAgent && <>
          <div className='text-xl mt-6'>{t('information')}</div>
          <div>Browser : {userAgent.browser.name}</div>
          <div>OS : {userAgent.os.name}</div>
          <div className='text-sm sm:max-w-[400px]'>{userAgent.ua}</div>
        </>}
      </div>
    </div>
  )
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
  const userAgent = JSON.stringify(parser(context.req.headers['user-agent']));

  return {
    props: {
      userAgent: JSON.parse(userAgent),
      namespaces: ['common'],
    }
  }
})
