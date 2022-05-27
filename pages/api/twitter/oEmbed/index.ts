import { NextApiRequest, NextApiResponse } from "next";
import { TweetSearch } from "../../../../types/twitter";
import TwitterAPI from "../../../../utils/twitterApi";

const TwitterOEmbedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, id } = req.query;
    try {
        const twitterContent = await TwitterAPI.embedTweet({username, id} as TweetSearch);
        res.status(200).json(twitterContent);
    } catch (error: any) {
        res.status(404).json(error.message);
    }
}

export default TwitterOEmbedHandler;