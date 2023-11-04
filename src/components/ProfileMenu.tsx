import AngelDownIcon from '@/icons/AngelDownIcon';
import UserIcon from '@/icons/UserIcon';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const ProfileMenu = () => {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const formRef = useRef<HTMLFormElement>(null);

    const handleSelect = (href: string) => {
        router.push(href);
    }

    const handleLogout = () => {
        formRef.current?.submit();
    }

    return (
        <>
            <DropdownMenu.Root modal={false}>
                <DropdownMenu.Trigger className='nav-dropdown-trigger' asChild>
                    <button type='button' aria-label="ProfileMenu" >
                        <UserIcon className='w-[20px] h-[20px]' />
                        <AngelDownIcon className='caret' />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="nav-dropdown-content" side='bottom' sideOffset={5} align='end' alignOffset={5}>
                        {
                            router.pathname === '/login' && <DropdownMenu.Item onSelect={() => handleSelect('/login')} className="nav-dropdown-item">
                                Login
                            </DropdownMenu.Item>
                        }
                        {router.pathname !== '/login' && <>
                            <DropdownMenu.Item onSelect={() => handleSelect('/profile')} className="nav-dropdown-item">
                                Profile
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onSelect={() => handleSelect('/changepasword')} className="nav-dropdown-item">
                                Change Password
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="h-[1px] bg-slate-300 m-[5px]" />
                            <DropdownMenu.Item onSelect={() => handleLogout()} className="nav-dropdown-item">
                                Logout
                            </DropdownMenu.Item>
                        </>
                        }
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <form ref={formRef} action='/api/logout' method='POST'>
                <input type='hidden' id='locale' name='locale' value={i18n.language}></input>
            </form>
        </>
    );
};

export default ProfileMenu;