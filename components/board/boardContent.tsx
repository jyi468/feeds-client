import { useEffect, useRef, useState } from "react";

import useOnScreen from "../../utils/hooks";

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
    const isOnScreen = useOnScreen(twitterBlockRef);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (global.twttr.widgets && isOnScreen && !isLoaded) {
            global.twttr.widgets.load(twitterBlockRef.current);
            setIsLoaded(true);
        }
    }, [isOnScreen]);

    return (
        <li
         ref={twitterBlockRef} 
         dangerouslySetInnerHTML={{__html: html}}>
        </li>
    )
}