import Head from 'next/head'
import Home from './home'

export default function Root() {
  return (
    <>
      <Head>
        <title>SneakerHead</title>
      </Head>
      <Home />
    </>
  )
}
