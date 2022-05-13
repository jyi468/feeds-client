import Script from 'next/script';

import { BoardContentProps, BoardContent } from './boardContent';

type BoardProps = {
    id: string;
    content: BoardContentProps[];
};

export const Board = ({ id, content }: BoardProps) => {
    const initializeTwitterApi = () => {
    };
    return (
        <div>
            <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload"
                    onLoad={initializeTwitterApi}
             />
            <div>{id}</div>
            <ul>
                {content.map((content, index) => {
                    return <BoardContent key={index} {...content}/>;
                })}
            </ul>
        </div>
    );
};