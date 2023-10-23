import AngelDownIcon from '@/icons/AngelDownIcon';
import DataIcon from '@/icons/DataIcon';
import UserIcon from '@/icons/UserIcon';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const DataMenu = () => {

    const formRef = useRef<HTMLFormElement>(null);

    const router = useRouter();

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
                        <DataIcon className='w-[20px] h-[20px]' />
                        <AngelDownIcon className='caret' />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                <DropdownMenu.Content className="nav-dropdown-content" side='bottom' sideOffset={5} align='end' alignOffset={5}>
                        <DropdownMenu.Item onSelect={() => handleSelect('/data/image')} className="nav-dropdown-item">
                            Image
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onSelect={() => handleSelect('/data/post')} className="nav-dropdown-item">
                            Post
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onSelect={() => handleSelect('/data/tag')} className="nav-dropdown-item">
                            Tag
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="h-[1px] bg-stone-300 m-[5px]" />
                        <DropdownMenu.Item onSelect={() => handleSelect('/data/user')} className="nav-dropdown-item">
                            User
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onSelect={() => handleSelect('/data/authority')} className="nav-dropdown-item">
                            Authority
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </>
    );
};

export default DataMenu;