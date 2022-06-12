import { Board, BoardProps } from "../board/board";
import { Scroller, ScrollerProps } from "../scroller/scroller";

enum Feeds {
    Board = "board",
    Scroller = "scroller",
};

type FeedProps = {
    type: Feeds;
    content: BoardProps | ScrollerProps;
};

const Feed = ({type, content}: FeedProps) => {
    switch (type) {
        case Feeds.Board:
            return <Board {...content} />;
        case Feeds.Scroller:
            return <Scroller {...content} />;
        default:
            return <div>Nothing to see here!</>;
    }
};

export default Feed;