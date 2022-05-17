import Script from 'next/script';
import { useState } from 'react';
import useSWR from 'swr';

import { BoardContentProps, BoardContent } from './boardContent';

type BoardProps = {
    id: string;
    content: BoardContentProps[];
};

export const Board = ({ id, content }: BoardProps) => {
    const [boardContent, setBoardContent] = useState([]);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const multiFetcher = (tweets: any) => {
        const tweetUserNames: any = {};
        tweets.includes.users.forEach(user => {
            tweetUserNames[user.id] = user.username;
        });
        const urls = tweets.data.map(tweet => `/api/twitter/oEmbed?id=${tweet.id}&username=${tweetUserNames[tweet.author_id]}`);
        return Promise.all(urls.map(url => fetcher(url)))
    };

    let twitterContent: any = [];
    let embeddedTwitterHtml: any = [];
    const queryParams = {
        query: 'will smith',
        'tweet.fields': 'entities',
        'user.fields': 'name',
    };
    const {data: tweets, error} = useSWR(`/api/twitter?${new URLSearchParams(queryParams).toString()}`, fetcher);
    // Make calls for embed data
    // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
    
    const {data: embeds} = useSWR(tweets, multiFetcher);
    console.log(JSON.stringify(embeds));

    // console.log("Twitter Response", twitterContent);
    // const tweetUserNames: any = {};
    // twitterContent = tweets;
    // if (twitterContent && twitterContent.includes) {
    //     twitterContent.includes.users.forEach(user => {
    //         tweetUserNames[user.id] = user.username;
    //     });

        
    //     console.log(JSON.stringify(embeds))
    // }
    // console.log('Embed Response: ' + JSON.stringify(embeddedTwitterHtml));
    const initializeTwitterApi = async () => {
        
    };
    return (
        <div>
            <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload"
                    onLoad={initializeTwitterApi}
             />
            <div>{id}</div>
            <ul>
                {boardContent.map((content, index) => {
                    return <BoardContent key={index} {...content}/>;
                })}
            </ul>
        </div>
    );
};