import { useEffect, useState } from 'react'
export function useAsync<T>(fn:()=>Promise<T>,deps:unknown[]=[]){
 const [data,setData]=useState<T>();const [loading,setLoading]=useState(true);const [error,setError]=useState<string>()
 useEffect(()=>{setLoading(true);setError(undefined);fn().then(setData).catch(e=>setError(e.message)).finally(()=>setLoading(false))},deps)
 return{data,loading,error,setData}}
