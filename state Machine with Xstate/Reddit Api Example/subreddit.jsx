import React from 'react'

import {useService} from '@xstate/react'

const date = new Intl.DateTimeFormat('en-US',{
  timeStyle: "long"
})

export default function Subreddit({service}) {
  const [current, send] = useService(service)
  const {subreddit, lastUpdated, posts} = current.context
  return (
    <div>
    <h1> {subreddit}</h1>
    <h5> {date.format(lastUpdated)}</h5>
    <button onClick = {_ => send('REFRESH')}>refresh</button>
    {current.matches("loading") && <h6>loading...</h6>}
    {current.matches("failure") && <button onClick = {() => send('RETRY')}>retry</button>}
    {
      (!current.matches("loading") && posts) && posts.map(post => <li key = {post.title}>{post.title}</li>)
    }
    </div>
  )
}
