import {Machine, spawn, assign} from 'xstate'
import createSubReddiMachine from './subredditmachine'


const redditMachine = Machine({
  id: "reddit",
  initial: "idle",
  context: {
    subreddits: {},
    subreddit: null
  },
  states: {idle:{}, selected:{}},
  on: {
    SELECT: {
      target: '.selected',
      actions: assign((context, event) => {

        let subreddit = context.subreddits[event.name]

         if(subreddit) {
          return {
            ...context,
             subreddit
          }
         }
         subreddit = spawn(createSubReddiMachine(event.name))
         return {
           subreddits: {
             ...context.subreddits, subreddit
           },
           subreddit
         }
      })
    }
  }
})



export default redditMachine
