import Head from 'next/head'
import { Feed } from './feed'
import Header from './header'

export default function Home() {
  return (
    <>
      <Head>
        <title>SneakerHead</title>
        <meta name="description" content="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Feed />
    </>
  )
}
