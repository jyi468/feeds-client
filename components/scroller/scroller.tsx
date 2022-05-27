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

export const Scroller = ({ id, content, twitterOEmbedData }: ScrollerProps) => {
    const [scrollerContent, setScrollerContent] = useState<any[]>();
    const [isTwitterLoaded, setIsTwitterLoaded] = useState(true);
    if (!scrollerContent) {
        setScrollerContent(content);
    }

    return (
        <>
            {scrollerContent && scrollerContent.map((content, index) => {
                return <ScrollerContent key={index} {...content} />;
            })}
        </>
    );
};

// export Scroller;