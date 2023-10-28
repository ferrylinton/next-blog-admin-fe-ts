import BreadCrumb from '@/components/BreadCrumb';
import UploadIcon from '@/icons/UploadIcon';
import { translate } from '@/libs/validation-util';
import { createImage } from '@/services/image-service';
import { withAuth } from '@/services/wrapper-service';
import { ImageProps } from '@/types/image-type';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreateImageSchema, MAX_FILE_SIZE, MIN_FILE_SIZE } from '@/validations/image-schema';
import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import ImageIcon from '@/icons/ImageIcon';


export default function ImageCreatePage({ clientInfo }: ImageProps) {
    
    const router = useRouter();

    const { t } = useTranslation('common');

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        } else {
            setSelectedFile(e.target.files[0]);
        }
    };

    const onClickFile = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.value = "";
        setSelectedFile(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            console.log({ file: selectedFile });
            const validation = CreateImageSchema.safeParse({ file: selectedFile });

            if (validation.success) {
                const response = await createImage(validation.data, clientInfo);

                if (response.status === 201) {
                    router.push('/data/image');
                } else if (response.status === 400) {
                    setValidationErrors(response.data);
                } else if (response.status === 409) {
                    setMessageError(response.data);
                } else if (response.status === 401) {
                    router.push('/login?status=401');
                } else if (response.status === 403) {
                    router.push('/login?status=403');
                }
            } else {
                setValidationErrors(translate(validation.error.issues, t));
            }


        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.data) {
                    setMessageError(axiosError.response?.data as MessageError);
                } else {
                    setMessageError({ message: axiosError.message });
                }
            } else {
                setMessageError({ message: error.message })
            }

        }
    };

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px]'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('image'), url: `/data/image` },
                        { label: t('add') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <div className='form'>
                    {
                        messageError && <div className='w-full border border-red-300 bg-red-50 px-3 py-2 mb-8 text-sm flex flex-col text-red-500'>
                            {messageError.message}
                        </div>
                    }
                    <form
                        className='w-full'
                        onSubmit={handleSubmit}
                        method='post'
                        noValidate
                        autoComplete='off' >

                        <div className="form-group">
                            <label className='form-label' htmlFor="code">{t('image')}</label>
                            <div className='w-full bg-stone-200'>
                                <label htmlFor='file' className={`h-[50px] flex justify-center items-center gap-2 border rounded cursor-pointer hover:bg-slate-100 ${validationErrors.file ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}>
                                    <UploadIcon className='w-[24px] h-[24px]' />
                                    <span className="leading-none">Select an image</span>
                                    <input
                                        type="file"
                                        id="file"
                                        accept="image/*"
                                        onClick={onClickFile}
                                        className="hidden"
                                        onChange={onFileChange}
                                    />
                                </label>
                            </div>
                            {validationErrors.file && <div className="form-error-label"> {validationErrors.file} </div>}
                        </div>

                        <div className='flex justify-center items-center w-full mt-1  p-2 border border-slate-400 rounded bg-white'>
                            {
                                (selectedFile) ?
                                    (<div className='flex flex-col justify-center items-center w-full'>
                                        <div className='w-[300px] h-[300px] relative'>
                                            <Image src={URL.createObjectURL(selectedFile)} fill className="object-cover rounded" alt="Uploaded Image" />
                                        </div>
                                        <div className='mt-2 text-xs'>{selectedFile?.name}</div>
                                    </div>)
                                    :
                                    (<div className='my-6'>
                                        <ImageIcon className='w-[100px] h-[100px] text-slate-300' />
                                        <div className='text-center text-slate-400'>No Image</div>
                                    </div>)
                            }
                        </div>

                        <div className="mt-5 text-center flex gap-1">
                            <button
                                onClick={() => router.push('/data/image')}
                                type='button'
                                className="w-full btn">
                                <span>{t('cancel')}</span>
                            </button>

                            <button
                                type="submit"
                                className="w-full btn btn-primary">
                                <span>{t('save')}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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