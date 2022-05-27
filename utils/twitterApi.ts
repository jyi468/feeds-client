import { TweetSearch } from "../types/twitter";

const searchTweets = async (query?: string) => {
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${query || 'bitcoin'}&user.fields=username&expansions=author_id`;
    // const params = request.params;
    const fetchParams = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            'Accept': '*/*',
        }
    }
    const response = await fetch(url, fetchParams);
    const twitterContent = await response.json();
    return twitterContent;
}

const embedTweet = async ({username, id}: TweetSearch) => {
    const url = `https://publish.twitter.com/oembed?url=https://twitter.com/${username}/status/${id}&&omit_script=true`;
    const fetchParams = {
        method: 'GET',
        headers: {
            'Accept': '*/*',
        }
    }
    const response = await fetch(url, fetchParams);
    const twitterContent = await response.json();
    return twitterContent;
};

const TwitterAPI = { searchTweets, embedTweet };

export default TwitterAPI;