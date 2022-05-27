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
      return await TwitterAPI.embedTweet({id: tweet.id, username: tweetUserNames[tweet.author_id]});
  }));
  return { 
      props: {
          twitterOEmbedData,
      }
  };
}

const Home: NextPage = ({twitterOEmbedData}) => {
  const scrollerContent = [{ url: 'url1', type: ContentType.TWITTER }, { url: 'url2', type: ContentType.YOUTUBE }];
  return (
    <div>
      <Head>
        <title>Feeds</title>
        <meta name="description" content="Feeds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid container place-content-center">
        <Scroller id={'1'} content={twitterOEmbedData}></Scroller>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
