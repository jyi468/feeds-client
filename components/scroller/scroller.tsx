import Script from 'next/script';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { TwitterOEmbed } from '../../types/twitter';
import TwitterAPI from '../../utils/twitterApi';

import { ScrollerContentProps, ScrollerContent } from './scrollerContent';

type ScrollerProps = {
    id: string;
    content: ScrollerContentProps[];
    twitterOEmbedData: TwitterOEmbed[];
};

export const Scroller = ({ id, content }: ScrollerProps) => {
    const [scrollerContent, setScrollerContent] = useState<any[]>();
    const [isTwitterLoaded, setIsTwitterLoaded] = useState(true);
    const [isYoutubeLoaded, setIsYoutubeLoaded] = useState(true);
    if (!scrollerContent) {
        setScrollerContent(content);
    }

    const onYoutubeLoaded = () => {
        setIsYoutubeLoaded(true);
    };

    const onTwitterLoaded = () => {
        setIsTwitterLoaded(true);
    };

    return (
        <>
            <Script src="/scripts/widgets.js" onLoad={onTwitterLoaded}></Script>
            <Script src="https://www.youtube.com/iframe_api" onLoad={onYoutubeLoaded}></Script>
            {isYoutubeLoaded && scrollerContent && scrollerContent.map((content, index) => {
                return <ScrollerContent id={index} {...content} />;
            })}
        </>
    );
};

// export Scroller;