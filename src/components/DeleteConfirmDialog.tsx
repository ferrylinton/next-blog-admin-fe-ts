import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction } from 'react';


type Props = {
    showConfirm: boolean;
    setShowConfirm: Dispatch<SetStateAction<boolean>>;
    okHandler: () => void;
}

const DeleteConfirmDialog = ({ showConfirm, setShowConfirm, okHandler }: Props) => {

    const { t } = useTranslation('common');

    return (
        <AlertDialog.Root open={showConfirm} onOpenChange={setShowConfirm}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="z-20 bg-slate-500 opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="z-30 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none border border-slate-500">
                    <AlertDialog.Title className="m-0 text-[17px] font-medium">
                        {t('confirmation')}
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-4 mb-5 text-[15px] leading-normal">
                        {t('deleteQuestion')}
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[5px]">
                        <AlertDialog.Cancel asChild>
                            <button className="w-[100px] h-[40px] btn btn-secondary">
                                <span>{t('cancel')}</span>
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button onClick={() => okHandler()} className="w-[100px]  h-[40px] btn btn-primary">
                                <span>{t('ok')}</span>
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

export default DeleteConfirmDialog