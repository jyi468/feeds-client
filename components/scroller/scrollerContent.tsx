import { useEffect, useRef, useState } from "react";

import useOnScreen from "../../utils/hooks";

export type ScrollerContentProps = {
    id: string;
    type: ContentType;
    url?: string;
    html?: string;
    index?: number;
};

export enum ContentType {
    TWITTER = 'TWITTER',
    YOUTUBE = 'YOUTUBE',
};

export const ScrollerContent = ({ id, url, type, html }: ScrollerContentProps) => {
    const embedRef = useRef();
    const isOnScreen = useOnScreen(embedRef);
    const [isTwitterLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (ContentType.TWITTER && global.twttr?.widgets && isOnScreen && !isTwitterLoaded) {
            // TODO: Optimize Twitter events with Redux on load. 
            // This includes the work to show a single spinner while anything on screen is still loading.
            global.twttr.events.bind(
                'rendered',
                function (event) {
                    if (embedRef.current?.firstChild === event.target) {
                        setIsLoaded(true);
                    }
                }
            );
            global.twttr.widgets.load(embedRef.current);
        }
    }, [isOnScreen]);


    const renderContent = () => {
        if (html) {
            return (<div className={`${!isTwitterLoaded && 'invisible'}`}
                ref={embedRef}
                dangerouslySetInnerHTML={{ __html: html }}>
            </div>);
        } else {
            switch (type) {
                case ContentType.YOUTUBE:
                    // TODO: Add Redux for APIs loaded.
                    if (!url) return;
                    const videoId = url.match(/(?<=watch\?v\=).*$/); // Use Positive lookahead to get the video id.
                    const baseUrl = 'https://www.youtube.com/embed/';
                    // TODO: Add embeds for clips. Need original video id and clip id (both).
                    return (
                        <iframe className="m-10" id={id} src={`${baseUrl}${videoId}`} height="360" width="640"/>
                    );
            }
        }
    }

    return renderContent();
}