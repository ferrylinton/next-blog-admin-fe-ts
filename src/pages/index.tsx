import { withAuth } from '@/services/wrapper-service';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';


export default function HomePage() {

  const { t } = useTranslation('common');

  return (
    <div className='w-full h-full grow flex flex-col justify-center items-center'>
      <h2>Home</h2>
    </div>
  )
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
  return {
      props: {
          namespaces: ['common'],
      }
  }
})