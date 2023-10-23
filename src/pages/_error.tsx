import { NextPageContext } from "next";

type Props = {
    statusCode: number,
    message: string
}

const ErrorPage = ({ statusCode, message }: Props) => {
    console.log('####################### Error Page3');
    return (
        <div className='w-full h-full grow flex flex-col justify-center items-center'>
            <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
            <div>{statusCode}</div>
            <div>{message}</div>
        </div>
    )
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
    console.log('####################### Error Page1');
    const statusCode: number = res?.statusCode || (err?.statusCode || 500);
    const message: string = (statusCode === 404) ? 'Not Found' : (err?.message || `An error ${statusCode} occurred on server`);
    console.log('####################### Error Page2');
    return { statusCode, message };
};

export default ErrorPage;