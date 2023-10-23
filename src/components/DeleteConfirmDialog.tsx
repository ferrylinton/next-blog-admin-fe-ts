import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';


type Props = {
    showConfirm: boolean;
    setShowConfirm: Dispatch<SetStateAction<boolean>>;
    okHandler: () => void;
}

const DeleteConfirmDialog = ({ showConfirm, setShowConfirm, okHandler }: Props) => {


    return (
        <AlertDialog.Root open={showConfirm} onOpenChange={setShowConfirm}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="z-20 bg-slate-500 opacity-50 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="z-30 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none border border-slate-500">
                    <AlertDialog.Title className="m-0 text-[17px] font-medium">
                        Confirmation
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-4 mb-5 text-[15px] leading-normal">
                        Delete data?
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[5px]">
                        <AlertDialog.Cancel asChild>
                            <button className="group text-center w-[100px] bg-white hover:bg-slate-100 py-2 leading-none border border-slate-400 rounded">
                                <span className='font-semibold text-slate-500 group-hover:text-slate-700'>Cancel</span>
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button onClick={() => okHandler()} className="group text-center w-[100px] bg-white hover:bg-green-100 py-2 leading-none border border-green-500 rounded">
                                <span className='font-semibold text-green-500 group-hover:text-green-600'>Ok</span>
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

export default DeleteConfirmDialog