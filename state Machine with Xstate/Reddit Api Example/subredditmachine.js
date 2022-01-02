import {Machine, assign} from 'xstate'


const invokeSubreddit = context => {
   const {subreddit} = context
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
         .then(res => res.json())
         .then(json => json.data.children.map(child => child.data))
}

const createSubReddiMachine = name => {
  return Machine({
    id: "subreddit",
    initial: "loading",
    context: {
      subreddit: name,
      posts: null,
      lastUpdated: null
    },
    states: {
      loading: {
        invoke: {
          id: "fetch-subreddit",
          src: invokeSubreddit,
          onDone: {
            target: "loaded",
            actions: assign({
              posts: (_, event) => event.data,
              lastUpdated: () => Date.now()
            })
          },
          onError: "failure"
        }
      },
      loaded: {
        on: {
          REFRESH: {target: 'loading'}
        }

      },
      failure: {
        on: {
          RETRY: {target: "loading"}
        }
      }
    }
  })
}
export default createSubReddiMachine
