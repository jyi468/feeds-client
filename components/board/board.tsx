import Script from 'next/script';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

import { BoardContentProps, BoardContent } from './boardContent';

type BoardProps = {
    id: string;
    content: BoardContentProps[];
};

export const Board = ({ id, content }: BoardProps) => {
    const [boardContent, setBoardContent] = useState<[]>();
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
    if (twitterEmbeds && !boardContent) {
        setBoardContent(twitterEmbeds);
    }

    // useEffect(() => {
    //     if (global.twttr && global.twttr.widgets) {
    //         global.twttr.widgets.load();
    //         global.twttr.ready(() => {
    //             setIsTwitterLoaded(true);
    //         });
    //     }
    // }, [global.twttr]);

    /**
     * Required for Twitter embeds to work
     */
    const initializeTwitterApi = () => {

    };
    return (
        <>
            {/* <Script
                    src="https://platform.twitter.com/widgets.js"
                    onLoad={initializeTwitterApi}
            >
                {`window.twttr = (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                    t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function(f) {
                    t._e.push(f);
                };

                return t;
                }(document, "script", "twitter-wjs"));`}
            </Script> */}
            <div>{id}</div>
            <ul>
                {isTwitterLoaded && boardContent && boardContent.map((content, index) => {
                    return <BoardContent key={index} {...content} />;
                })}
            </ul>
        </>
    );
};