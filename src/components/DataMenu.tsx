import AngelDownIcon from '@/icons/AngelDownIcon';
import DataIcon from '@/icons/DataIcon';
import { AuthData } from '@/types/auth-type';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

type Props = {
    authData: AuthData | null
}

const DataMenu = ({ authData }: Props) => {

    const router = useRouter();

    const { t } = useTranslation('common');

    const handleSelect = (href: string) => {
        router.push(href);
    }

    if (!authData)
        return null;
    else
        return (
            <>
                <DropdownMenu.Root modal={false}>
                    <DropdownMenu.Trigger className='nav-dropdown-trigger' asChild>
                        <button type='button' aria-label="ProfileMenu" >
                            <DataIcon className='w-[20px] h-[20px]' />
                            <AngelDownIcon className='caret' />
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="nav-dropdown-content" side='bottom' sideOffset={5} align='end' alignOffset={5}>
                            <DropdownMenu.Item onSelect={() => handleSelect('/data/image')} className="nav-dropdown-item">
                                {t('image')}
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onSelect={() => handleSelect('/data/post')} className="nav-dropdown-item">
                                {t('post')}
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onSelect={() => handleSelect('/data/tag')} className="nav-dropdown-item">
                                {t('tag')}
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="h-[1px] bg-stone-300 m-[5px]" />
                            <DropdownMenu.Item onSelect={() => handleSelect('/data/user')} className="nav-dropdown-item">
                                {t('user')}
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onSelect={() => handleSelect('/data/authority')} className="nav-dropdown-item">
                                {t('authority')}
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="h-[1px] bg-stone-300 m-[5px]" />
                            <DropdownMenu.Item onSelect={() => handleSelect('/data/whitelist')} className="nav-dropdown-item">
                                {t('whitelist')}
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </>
        );
};

export default DataMenu;