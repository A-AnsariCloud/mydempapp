import React, { use } from 'react'
import {useState,useEffect} from 'react'

export default function Test() {
    const [count, setCount] = useState(0);
    useEffect(() => {
      // Update the document title using the browser API
     
      document.title = `You clicked ${count} times`;
       console.log('Component mounted or count changed');
    }, [count]); // Only re-run the effect if count changes
    useEffect(() => {
        // This effect runs only once after the initial render
        console.log('Component mounted');
    }, []);
    useEffect(() => {
        // This effect runs after every render
        console.log('Component rendered or updated');
    },);
     

  return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
    </div>
  )
}
