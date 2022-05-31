import Script from 'next/script';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { TweetResponse } from '../../types/twitter';

import { BoardContentProps, BoardContent } from './boardContent';

type BoardProps = {
    id: string;
    content: BoardContentProps[];
};

export const Board = ({ id, content }: BoardProps) => {
    const [boardContent, setBoardContent] = useState<any[]>();
    const [isTwitterLoaded, setIsTwitterLoaded] = useState(true);

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const multiFetcher = (tweets: any) => {
        const tweetUserNames: any = {};
        tweets.includes.users.forEach((user: any) => {
            tweetUserNames[user.id] = user.username;
        });
        const urls = tweets.data.map((tweet: TweetResponse) => `/api/twitter/oEmbed?id=${tweet.id}&username=${tweetUserNames[tweet.author_id]}`);
        return Promise.all(urls.map((url: string) => fetcher(url)))
    };
    const queryParams = {
        query: 'bitcoin',
        'tweet.fields': 'entities',
        'user.fields': 'name',
    };
    const { data: tweets, error } = useSWR(`/api/twitter?${new URLSearchParams(queryParams).toString()}`, fetcher);
    // Make calls for embed data
    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

    const { data: twitterEmbeds } = useSWR(tweets, multiFetcher);
    if (twitterEmbeds && !boardContent) {
        setBoardContent(twitterEmbeds);
    }
    return (
        <ul>
            {isTwitterLoaded && boardContent && boardContent.map((content, index) => {
                return <BoardContent key={index} {...content} />;
            })}
        </ul>
    );
};