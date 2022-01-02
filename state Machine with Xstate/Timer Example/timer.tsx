import React from 'react'
import {useMachine} from '@xstate/react'
import timerMachine from './timer'


const Timer: React.FC = () => {

  const [current, send] = useMachine(timerMachine)
  const {elapsed, duration} = current.context
  return (
    <div>
    <span>Time elasped</span>
    <h5>{elapsed}s/{duration}s</h5>
    <progress max ={duration} value = {elapsed}/>
    <input type = "range" value = {duration} max = {30}
     onChange = {(e: React.FormEvent<HTMLInputElement>) => send('DURATION.UPDATE', {value: e.target.value})}
    />
    <button onClick = {() => send("RESET")} >reset </button>
    </div>
  )
}


export default Timer
