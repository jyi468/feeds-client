import { BoardContentProps, BoardContent } from './boardContent';

type BoardProps = {
    id: string;
    content: BoardContentProps[];
};

export const Board = ({ id, content }: BoardProps) => {
    return (
        <div>
            <div>{id}</div>
            <ul>
                {content.map((content, index) => {
                    return <BoardContent key={index} {...content}/>;
                })}
            </ul>
        </div>
    );
};