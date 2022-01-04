

const nestedData = {
  a: 1,
  b: {
    b1: 4,
    b2: {
      b23: "ehllo"
    },
    b3: {
      b31: {
        message: "hi"
      },
      b32: {
        messag: "helo"
      }
    }
  },
  c: {
    c1: 2,
    c2: 3
  }
}
const isObject = (item) => typeof item === "object" && item !== null
const RecursiveComponent = ({data}) => {
   if(!isObject(data)) {
     return <span>{data}</span>
   }
   return (
     <>
     {
       Object.entries(data).map(([key,value]) => {
         return (
           <li>{key}: {<RecursiveComponent data = {value}/>}</li>
         )
       })
     }
     </>
   )
}


function App() {
  return (
    <div>
    <RecursiveComponent data = {nestedData} />
    </div>
  )
}

export default App;