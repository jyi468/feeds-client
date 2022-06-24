
// import gql from 'graphql-tag';
import Script from 'next/script';
import { useState } from 'react';
import { useLazyQuery, gql, useMutation } from '@apollo/client';

import { ScrollerContentProps, ScrollerContent } from './scrollerContent';

export type ScrollerProps = {
    content: ScrollerContentProps[];
};

const GET_CONTENTS = gql`
    query {
        contents {
            _id
            url
        }
    }
`

const CREATE_CONTENT = gql`
    mutation InsertOneContent($data: ContentInsertInput!) {
        insertOneContent(data: $data) {
            _id
            url
        }
    }
`

export const Scroller = ({ content }: ScrollerProps) => {
    const [scrollerContent, setScrollerContent] = useState<any[]>();
    const [isTwitterLoaded, setIsTwitterLoaded] = useState(true);
    const [isYoutubeLoaded, setIsYoutubeLoaded] = useState(true);
    const [url, setUrl] = useState();
    const [getContents, {loading, data}] = useLazyQuery(GET_CONTENTS);
    const [addContent, { addContentData, error }] = useMutation(CREATE_CONTENT, {
        variables: {
            data: {
                url
            }
        }
    });
    if (!scrollerContent) {
        setScrollerContent(content);
    }

    const onYoutubeLoaded = () => {
        setIsYoutubeLoaded(true);
    };

    const onTwitterLoaded = () => {
        setIsTwitterLoaded(true);
    };

    const handleOnClick = () => {
        addContent();
    }

    const handleOnChange = (event: any) => {
        setUrl(event.target.value);
    };
    
    if (data) {
        console.log(data);
    }

    return (
        <>
            <Script src="/scripts/widgets.js" onLoad={onTwitterLoaded}></Script>
            <Script src="https://www.youtube.com/iframe_api" onLoad={onYoutubeLoaded}></Script>
            <button className="btn btn-primary" onClick={handleOnClick}>Create Content</button>
            <input type="text" value={url} onChange={handleOnChange}></input>
            {isYoutubeLoaded && scrollerContent && scrollerContent.map((content, index) => {
                return <ScrollerContent id={index} {...content} />;
            })}
        </>
    );
};

// export Scroller;