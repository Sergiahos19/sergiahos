import { useLayoutEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import { Home, About, Projects, Request, Contact, Faq, SeoAudit, Partners } from './pages/Public'
function ScrollToRoute(){const {pathname,hash}=useLocation()
 useLayoutEffect(()=>{
  if(hash){
   const target=document.getElementById(decodeURIComponent(hash.slice(1)))
   if(target){
    target.focus({preventScroll:true})
    target.scrollIntoView({behavior:'smooth',block:'start'})
   }else window.scrollTo({top:0,left:0,behavior:'instant'})
   return
  }
  document.getElementById('main-content')?.focus({preventScroll:true})
  window.scrollTo({top:0,left:0,behavior:'instant'})
 },[pathname,hash])
 return null
}
export default function App(){return<>
 <ScrollToRoute/>
 <Routes>
 <Route element={<PublicLayout/>}><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Home/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:id" element={<Navigate to="/projects" replace/>}/>
  <Route path="/request" element={<Request/>}/><Route path="/seo-audit" element={<SeoAudit/>}/><Route path="/faq" element={<Faq/>}/><Route path="/partners" element={<Partners/>}/><Route path="/contact" element={<Contact/>}/></Route>
 <Route path="*" element={<Navigate to="/" replace/>}/></Routes>
 </>}
