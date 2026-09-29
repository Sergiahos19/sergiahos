import type { ReactNode } from 'react'
export const Empty=({children}:{children:ReactNode})=><p className="rounded-xl border border-dashed p-10 text-center text-slate-500">{children}</p>
export function Async({loading,error,children}:{loading:boolean;error?:string;children:ReactNode}){
 if(loading)return<div role="status" className="animate-pulse rounded-xl bg-slate-100 p-10 text-center text-slate-500">Chargement…</div>
 if(error)return<p role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
 return<>{children}</>}
export const Page=({title,children}:{title:string;children:ReactNode})=><section className="section-wrap page-wrap">
 <div className="page-title"><div><p className="eyebrow">Sergiahos</p><h1>{title}</h1></div></div>
 {children}
</section>
