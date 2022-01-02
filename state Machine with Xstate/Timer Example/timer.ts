import {createMachine, assign} from 'xstate'

interface Timercontext {
  elapsed: number;
  duration: number;
  interval: number
}

type TimerEvent =
| {type: 'TICK'}
| {type: 'DURATION.UPDATE', value: number}
| {type: 'RESET'}

const timerMachine = createMachine<Timercontext, TimerEvent>({
   id: "timer",
   initial: "running",
   context: {
     elapsed: 0,
     duration: 5,
     interval: 0.1
   },
   states: {
     running: {
       invoke: {
         src: context => cb => {
           const interval = setInterval(()=> cb('TICK'), 1000 * context.interval)
           return () => clearInterval(interval)
         }
       },
       on: {
         '': {
           target: 'paused',
           cond: context => {
             return context.duration <= context.elapsed
           }
         },
         TICK: {
           actions: assign({
             elapsed: context => +(context.elapsed + context.interval).toFixed(2)
           })
         }
       }
     },
     paused: {
       on: {
         "": {
           target: 'running',
           cond: context => context.duration > context.elapsed
         },
       }
     }
   },
   on: {
     "DURATION.UPDATE": {
       actions: assign({
         duration: (_, event) => event.value
       })
     },
     RESET: {
       actions: assign<Timercontext>({
         elapsed: 0
       })
     }
   }
})

export default timerMachine
