import { NextApiRequest, NextApiResponse } from "next";
import TwitterAPI from "../../../utils/twitterApi";

const TwitterApiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const params = request.params;
        const twitterContent = await TwitterAPI.searchTweets();

        res.status(200).json(twitterContent);
    } catch (error: any) {
        res.status(404).json(error.message);
    }
}

export default TwitterApiRoute;