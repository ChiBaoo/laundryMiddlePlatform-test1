import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Role1() {
    const [data, setData] = useState({ })
    useEffect(() => {
        const res = window.localStorage.getItem("userData")
        setData(res)
      }, []);
      
      console.log('item res: ', data.firstName)
      console.log('data: ', data)
    // const takeItem = () => {
    //     console.log('item res: ', data.firstname)
    //     console.log('data: ', data)
    // }
    
    return (
        <div>
            <button >submit{data.email}</button>
        </div>
    )
}
