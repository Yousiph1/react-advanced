import logo from './logo.svg';
import './App.css';
import RedditMachine from './redditmachine'
import {useMachine} from '@xstate/react'
import Subreddit from './subreddit'
import Timer from './timer'
const subreddits = ["frontend","react","vue"]
function App() {
  const [current, send] = useMachine(RedditMachine)
  const {subreddit} = current.context

  return (
    <div>
    <Timer />
    <select onChange ={e => send('SELECT', {name: e.target.value})}>
    <option disabled>Select one</option>
    {subreddits.map(s => <option key = {s}>{s}</option>)}
    </select>
    {current.matches("idle") && <h1>select subreddit</h1>}
    {subreddit && <Subreddit service = {subreddit} key = {subreddit.id}/>}
    </div>
  );
}

export default App;
