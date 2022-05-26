import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Scroller } from '../components/scroller/scroller'
import { ContentType } from '../components/scroller/scrollerContent'

const Home: NextPage = () => {
  const scrollerContent = [{ url: 'url1', type: ContentType.TWITTER }, { url: 'url2', type: ContentType.YOUTUBE }];
  return (
    <div>
      <Head>
        <title>Feeds</title>
        <meta name="description" content="Feeds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid container place-content-center">
        <Scroller id={'1'} content={scrollerContent}></Scroller>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
