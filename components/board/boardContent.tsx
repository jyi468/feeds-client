export type BoardContentProps = {
    type: ContentType;
    url?: string;
    html?: string;
    index?: number;
};

export enum ContentType {
    TWITTER = 'TWITTER',
    YOUTUBE = 'YOUTUBE',
};

export const BoardContent = ({ url, type, html }: BoardContentProps) => {
    return (
        <li>
            <div dangerouslySetInnerHTML={{__html: html}}></div>
            <div>{url}</div>
            <br/>
            <div>{type}</div>
        </li>
    )
}