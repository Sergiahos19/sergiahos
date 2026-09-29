import { Routes, Route, Navigate } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import { Home, About, Projects, ProjectDetail, Request, Contact, Faq, SeoAudit, Login, Partners } from './pages/Public'
import { UserHome, Notifications } from './pages/Space'
import { AdminDashboard, Crud, PartnerManager, Settings } from './pages/admin/Admin'
import type { Resource } from './types'
const crud:[string,Resource,string][]=[['skills','skills','Compétences'],['services','services','Services'],['projects','projects','Réalisations'],['partners','partners','Partenaires'],['requests','requests','Demandes'],['seo-audits','requests','Diagnostics SEO'],['messages','messages','Messages'],['faqs','faqs','FAQ'],['users','users','Utilisateurs']]
export default function App(){return<Routes>
 <Route element={<PublicLayout/>}><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Home/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:id" element={<ProjectDetail/>}/>
  <Route path="/request" element={<Request/>}/><Route path="/seo-audit" element={<SeoAudit/>}/><Route path="/faq" element={<Faq/>}/><Route path="/partners" element={<Partners/>}/><Route path="/contact" element={<Contact/>}/><Route path="/login" element={<Login/>}/><Route path="/admin/login" element={<Login admin/>}/></Route>
 <Route path="/dashboard" element={<AdminLayout scope="dashboard"/>}><Route index element={<UserHome/>}/><Route path="requests" element={<UserHome/>}/><Route path="notifications" element={<Notifications/>}/></Route>
 <Route path="/admin" element={<AdminLayout scope="admin"/>}><Route index element={<Navigate to="dashboard"/>}/><Route path="dashboard" element={<AdminDashboard/>}/>
  {crud.map(([p,r,t])=><Route key={p} path={p} element={r==='partners'?<PartnerManager/>:<Crud resource={r} title={t}/>}/>)}<Route path="settings" element={<Settings/>}/></Route>
 <Route path="*" element={<Navigate to="/"/>}/></Routes>}
