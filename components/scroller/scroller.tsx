import Script from 'next/script';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { ScrollerContentProps, ScrollerContent } from './scrollerContent';

type ScrollerProps = {
    id: string;
    content: ScrollerContentProps[];
};

export const Scroller = ({ id, content }: ScrollerProps) => {
    const [scrollerContent, setScrollerContent] = useState<[]>();
    const [isTwitterLoaded, setIsTwitterLoaded] = useState(true);

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const multiFetcher = (tweets: any) => {
        const tweetUserNames: any = {};
        tweets.includes.users.forEach(user => {
            tweetUserNames[user.id] = user.username;
        });
        const urls = tweets.data.map(tweet => `/api/twitter/oEmbed?id=${tweet.id}&username=${tweetUserNames[tweet.author_id]}`);
        return Promise.all(urls.map(url => fetcher(url)))
    };
    const queryParams = {
        query: 'will smith',
        'tweet.fields': 'entities',
        'user.fields': 'name',
    };
    const { data: tweets, error } = useSWR(`/api/twitter?${new URLSearchParams(queryParams).toString()}`, fetcher);
    // Make calls for embed data
    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

    const { data: twitterEmbeds } = useSWR(tweets, multiFetcher);
    if (twitterEmbeds && !scrollerContent) {
        setScrollerContent(twitterEmbeds);
    }

    return (
        <>
            <div>{id}</div>
            <ul>
                {scrollerContent && scrollerContent.map((content, index) => {
                    return <ScrollerContent key={index} {...content} />;
                })}
            </ul>
        </>
    );
};