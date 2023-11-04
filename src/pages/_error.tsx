import BreadCrumb from "@/components/BreadCrumb";
import { NextPageContext } from "next";

type Props = {
    statusCode: number,
    message: string
}

const ErrorPage = ({ statusCode, message }: Props) => {
    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: 'error' }
                    ]} />
            </div>
            <div className='mt-16 flex flex-col gap-6 justify-center items-center text-stone-600'>
                <div>{statusCode}</div>
                <div>{message}</div>
            </div>
        </div>

    )
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode: number = res?.statusCode || (err?.statusCode || 500);
    const message: string = (statusCode === 404) ? 'Not Found' : (err?.message || `An error ${statusCode} occurred on server`);
    return { statusCode, message };
};

export default ErrorPage;