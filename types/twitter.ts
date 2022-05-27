interface TweetResponse {
    id: string;
}

interface TweetSearch {
    id: string;
    username: string;
}

interface TwitterOEmbed {
    html: string;
}

export type { TweetResponse, TweetSearch, TwitterOEmbed };