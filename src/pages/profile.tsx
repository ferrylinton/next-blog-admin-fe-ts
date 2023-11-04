import BreadCrumb from '@/components/BreadCrumb';
import DetailValue from '@/components/detail-value';
import { getClientInfo } from '@/libs/auth-util';
import { getUser } from '@/services/user-service';
import { withAuth } from '@/services/wrapper-service';
import { AuthData } from '@/types/auth-type';
import { ClientInfo } from '@/types/common-type';
import { User } from '@/types/user-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';

type Props = {
  user: User,
  clientInfo: ClientInfo
}

export default function ProfilePage({ user: { username, authorities, email }, clientInfo }: Props) {

  const profileInfo = { username, email, authorities };

  const { t } = useTranslation('common');

  return (
    <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
      <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
        <BreadCrumb
          items={[
            { label: t('profile') }
          ]} />
      </div>
      <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
        {
          profileInfo && <table className='table-detail'>
            <tbody>
              {
                Object.keys(profileInfo).map(key => {
                  return <tr key={key}>
                    <th>{t(key)}</th>
                    <td><DetailValue val={profileInfo[key as keyof typeof profileInfo]} /></td>
                  </tr>
                })
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
  const clientInfo = getClientInfo(context);
  const authData = clientInfo.authData as AuthData;
  const { data } = await getUser(authData.username, clientInfo);

  return {
    props: {
      namespaces: ['common'],
      user: data
    }
  }
})