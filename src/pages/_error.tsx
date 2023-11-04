import { NextPageContext } from "next";

type Props = {
    statusCode: number,
    message: string
}

const ErrorPage = ({ statusCode, message }: Props) => {
    return (
        <div className='w-full h-full grow flex flex-col justify-center items-center'>
            <div>{statusCode}</div>
            <div>{message}</div>
        </div>
    )
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode: number = res?.statusCode || (err?.statusCode || 500);
    const message: string = (statusCode === 404) ? 'Not Found' : (err?.message || `An error ${statusCode} occurred on server`);
    return { statusCode, message };
};

export default ErrorPage;