import { NextApiRequest, NextApiResponse } from "next";

const TwitterOEmbedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, id } = req.query;
    try {
        const url = `https://publish.twitter.com/oembed?url=https://twitter.com/${username}/status/${id}&&omit_script=true`;
        const fetchParams = {
            method: 'GET',
            headers: {
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

export default TwitterOEmbedHandler;