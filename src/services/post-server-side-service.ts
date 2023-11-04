import { RequestParams } from "@/types/request-params-type";
import { GetServerSidePropsContext } from 'next';

const isValidPage = (str: string) => {
    const number = Number(str);
    const isInteger = Number.isInteger(number);
    const isPositive = number > 0;

    return isInteger && isPositive;
}

export function getRequestParams(context: GetServerSidePropsContext) {
    const locale = context.locale ?? 'id';
    const requestParams: RequestParams = { page: 1 };

    if (context.query?.tag && context.query.tag.length > 2) {
        requestParams.tag = context.query.tag as string
    }

    if (context.query?.keyword && context.query?.keyword.length > 2) {
        requestParams.keyword = context.query?.keyword as string
    }

    if (context.query.page && !isValidPage(context.query.page as string)) {
        requestParams.destination = (locale === 'id' ? '' : '/' + locale)
            + (context.resolvedUrl.split("?")[0] + '?page=1')
            + (context.query?.keyword ? '&keyword=' + context.query?.keyword : '');
    }

    requestParams.page = (context.query.page && isValidPage(context.query.page as string)) ? parseInt(context.query.page as string) : 1;
    return requestParams;
}