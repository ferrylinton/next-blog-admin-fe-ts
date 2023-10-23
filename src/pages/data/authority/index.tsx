import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import FilterForm from '@/components/FilterForm';
import { COOKIE_TOKEN } from '@/configs/constant';
import BreadcrumbIcon from '@/icons/BredcrumbIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import HomeIcon from '@/icons/HomeIcon';
import { deleteAuthority, getAuthorities } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { Authority } from '@/types/authority-type';
import { ClientInfo } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';


type Props = {
    authorities: Authority[]
} & ClientInfo

export default function AuthorityListPage({ authorities, ...clientInfo }: Props) {

    const router = useRouter();

    const [showConfirm, setShowConfirm] = useState(false);

    const [id, setId] = useState<string | null>(null);

    const [filtered, setFiltered] = useState(authorities);

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    const showDeleteConfirmation = (id: string) => {
        setId(id);
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (id) {
            await deleteAuthority(id, clientInfo);
            setId(null);
            //window.location.href = '/data/authority';
            //Router.push('/data/authority');
            router.reload();
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px]'>
            <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
                <div className="w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex justify-start  items-center h-[40px] px-2 flex-wrap">
                    <Link href="/" className="h-full flex items-center px-2">
                        <HomeIcon className='w-5 h-5' />
                    </Link>
                    <div className='h-full flex items-center px-2'>
                        <BreadcrumbIcon className='w-3 h-3' />
                    </div>
                    <div className='h-full flex items-center px-2 uppercase'>
                        <span className='leading-none'>Authority</span>
                    </div>
                </div>
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <div className='w-full my-3'>
                    <FilterForm authorities={authorities} setFiltered={setFiltered} />
                </div>
                <table className='table-responsive w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Description</th>
                            <th className='actions'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!filtered || filtered.length === 0) ?
                                <tr>
                                    <td colSpan={4}>Empty Data</td>
                                </tr> :
                                (filtered && filtered.map((authority, index) => {
                                    return <tr key={authority.id}>
                                        <td data-label="#">{index + 1}</td>
                                        <td data-label="Code">{authority.code}</td>
                                        <td data-label="Description">{authority.description}</td>
                                        <td className='actions'>
                                            <div className='btn-box'>
                                                <Link href={`/data/authority/form/${authority.id}`} className='btn-edit'><EditIcon /></Link>
                                                <button className='btn-delete' onClick={() => showDeleteConfirmation(authority.id)}><DeleteIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                }))
                        }
                    </tbody>
                </table>
                <div className='w-full my-2'>
                    <button
                        className='btn btn-default'
                        onClick={() => router.push('/data/authority/form')}>
                        <span>Add New</span>
                    </button>
                </div>
                <DeleteConfirmDialog
                    showConfirm={showConfirm}
                    setShowConfirm={setShowConfirm}
                    okHandler={okHandler} />
            </div>
        </div>
    )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const props = await serverSideTranslations(context.locale ?? 'id', ['common'])
    
//     return {
//       props: {
//         ...props
//       },
//     };
//   }

export const getServerSideProps = withAuth(async ({ req, res, locale }: GetServerSidePropsContext) => {
    const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    const token = req.cookies[COOKIE_TOKEN];

    const {data: authorities} = await getAuthorities({ locale: locale ?? 'id', clientIp: clientIp as string, userAgent, token: token as string });
    return {
        props: {
            namespaces: ['common', 'authority'],
            authorities
        }
    }
})