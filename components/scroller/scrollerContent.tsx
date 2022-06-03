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
    const embedRef = useRef();
    const isOnScreen = useOnScreen(embedRef);
    const [isTwitterLoaded, setIsLoaded] = useState(false);
    
    if (type === ContentType.TWITTER) {
        useEffect(() => {
            if (global.twttr.widgets && isOnScreen && !isTwitterLoaded) {
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
    }

    const renderContent = () => {
        if (html) {
            return (<div className={`${!isTwitterLoaded && 'invisible'}`}
                ref={embedRef}
                dangerouslySetInnerHTML={{ __html: html }}>
            </div>);
        }
    }
    
    return renderContent();
}