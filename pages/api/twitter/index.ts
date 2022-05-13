import { NextApiRequest, NextApiResponse } from "next";

const TwitterApi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const url = 'https://api.twitter.com/2/tweets/search/recent?query=will smith&user.fields=username&expansions=author_id';
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

        res.status(200).json(twitterContent);
    } catch (error: any) {
        res.status(404).json(error.message);
    }
}

export default TwitterApi;