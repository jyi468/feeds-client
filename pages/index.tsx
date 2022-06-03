import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Scroller } from '../components/scroller/scroller'
import { ContentType } from '../components/scroller/scrollerContent'
import TwitterAPI from '../utils/twitterApi'

export async function getServerSideProps() {
  const tweets = await TwitterAPI.searchTweets('cool whip');
  const tweetUserNames: any = {};
  tweets.includes.users.forEach((user: any) => {
    tweetUserNames[user.id] = user.username;
  });
  const twitterOEmbedData = await Promise.all(tweets.data.map(async (tweet: any) => {
    return await TwitterAPI.embedTweet({ id: tweet.id, username: tweetUserNames[tweet.author_id] });
  }));
  return {
    props: {
      twitterOEmbedData,
    }
  };
}

type HomeProps = {
  twitterOEmbedData: any[];
}

const Home: NextPage = ({ twitterOEmbedData }: HomeProps) => {
  const twitterContent = twitterOEmbedData.map((tweetData: any) => {
    tweetData.type = ContentType.TWITTER;
    return tweetData;
  });

  const youtubeContent = [{
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: ContentType.YOUTUBE,
  }, {
    url: 'https://www.youtube.com/watch?v=mC43pZkpTec',
    type: ContentType.YOUTUBE
  }];

  const content = [...twitterContent, ...youtubeContent];
  return (
    <div>
      <Head>
        <title>Feeds</title>
        <meta name="description" content="Feeds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid container place-content-center">
        <Scroller id="1" content={twitterOEmbedData}></Scroller>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
