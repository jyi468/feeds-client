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
            // TODO: Optimize Twitter events with Redux on load. 
            // This includes the work to show a single spinner while anything on screen is still loading.
            global.twttr.events.bind(
                'rendered',
                function (event) {
                    if (twitterBlockRef.current?.firstChild === event.target) {
                        setIsLoaded(true);
                    }
                }
            );
            global.twttr.widgets.load(twitterBlockRef.current);
        }
    }, [isOnScreen]);
    
    return (
        <>
            <div className={`${!isLoaded && 'invisible'}`}
                ref={twitterBlockRef}
                dangerouslySetInnerHTML={{ __html: html }}>
            </div>
        </>
    )
}