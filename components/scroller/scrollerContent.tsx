import { useEffect, useRef, useState } from "react";

import useOnScreen from "../../utils/hooks";

export type ScrollerContentProps = {
    type: ContentType;
    url?: string;
    html?: string;
    index?: number;
};

export enum ContentType {
    TWITTER = 'TWITTER',
    YOUTUBE = 'YOUTUBE',
};

export const ScrollerContent = ({ url, type, html }: ScrollerContentProps) => {
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
        <div className='grid grid-cols-1 place-content-center'
            ref={twitterBlockRef}
            dangerouslySetInnerHTML={{ __html: html }}>
        </div>
    )
}