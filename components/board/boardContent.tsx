import { useEffect, useRef } from "react";

export type BoardContentProps = {
    type: ContentType;
    url?: string;
    html?: string;
    index?: number;
};

export enum ContentType {
    TWITTER = 'TWITTER',
    YOUTUBE = 'YOUTUBE',
};

export const BoardContent = ({ url, type, html }: BoardContentProps) => {
    const twitterBlockRef = useRef();

    useEffect(() => {
        if (global.twttr && global.twttr.widgets) {
            global.twttr.widgets.load(twitterBlockRef.current);
        }
    }, [global.twttr]);
    return (
        <li>
            <div ref={twitterBlockRef} dangerouslySetInnerHTML={{__html: html}}></div>
            <div>{url}</div>
            <br/>
            <div>{type}</div>
        </li>
    )
}