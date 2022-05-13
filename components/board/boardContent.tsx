export type BoardContentProps = {
    url: string;
    type: ContentType;
    index?: number;
};

export enum ContentType {
    TWITTER = 'TWITTER',
    YOUTUBE = 'YOUTUBE',
};

export const BoardContent = ({ url, type }: BoardContentProps) => {
    return (
        <div>
            <div>{url}</div>
            <br/>
            <div>{type}</div>
        </div>
    )
}