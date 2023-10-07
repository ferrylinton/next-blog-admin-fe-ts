import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';

const md = MarkdownIt().use(highlightjs);
export const markdownToHtml = (str: string | undefined) : string => {
    if(str){
        return md.render(str)
    }else{
        return 'undefined';
    }
    
}