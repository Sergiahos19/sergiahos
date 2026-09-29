import { NavLink, Outlet, Navigate } from 'react-router-dom'
import BackToTop from '../components/BackToTop'
import { Brand } from '../components/Brand'
const nav:Record<string,string[]>={admin:['dashboard','skills','services','projects','partners','requests','seo-audits','messages','faqs','users','settings'],dashboard:['','requests','notifications']}
export default function AdminLayout({scope}:{scope:'admin'|'dashboard'}){
 const token=localStorage.getItem('token')
 const role=localStorage.getItem('role')
 if(!token||!role||(scope==='admin'&&role!=='admin'))return<Navigate to={scope==='admin'?'/admin/login':'/login'} replace/>
 return<div className="admin-shell flex min-h-screen flex-col md:flex-row">
 <aside className="admin-sidebar p-4 text-sky-100 md:w-56"><Brand className="brand-mark-light mb-4" /><p className="mb-3 font-bold text-white">{scope==='admin'?'Administration':'Mon espace'}</p>
  <nav className="flex gap-1 overflow-x-auto md:flex-col">{nav[scope].map(i=><NavLink key={i} to={`/${scope}/${i}`.replace(/\/$/,'')} end className={({isActive})=>`whitespace-nowrap rounded px-3 py-2 text-sm ${isActive?'bg-sky text-white':'hover:bg-white/10'}`}>{i||'accueil'}</NavLink>)}
  <button className="px-3 py-2 text-left text-sm" onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('role');location.href='/'}}>Déconnexion</button></nav></aside>
 <div className="admin-content flex-1 p-5"><Outlet/></div><BackToTop /></div>}
