import { useState } from 'react'
import { api } from '../../services/api'
import { useAsync } from '../../hooks/useAsync'
import { Async, Empty } from '../../components/ui'
import type { Item, Partner, Project, Resource } from '../../types'

export function AdminDashboard(){const rs:Resource[]=['projects','services','skills','requests','messages','users']
 const d=useAsync(()=>Promise.all(rs.map(r=>api.list(r))),[])
 return<div><h1 className="mb-4 text-2xl font-bold">Tableau de bord</h1><Async loading={d.loading} error={d.error}><div className="grid gap-4 sm:grid-cols-3">{rs.map((r,i)=><div key={r} className="card"><p className="text-3xl font-extrabold text-sky">{d.data?.[i].length}</p><p className="text-sm capitalize text-slate-600">{r}</p></div>)}</div></Async></div>}

/* CRUD générique (état local; brancher sur POST/PUT/DELETE de l'API) */
export function Crud({resource,title}:{resource:Resource;title:string}){
 const d=useAsync(()=>api.list<Item>(resource),[resource]);const [q,setQ]=useState('');const [nn,setNn]=useState('')
 const set=(f:(a:Item[])=>Item[])=>d.setData(f(d.data??[]))
 const rows=d.data?.filter(x=>x.name.toLowerCase().includes(q.toLowerCase()))
 return<div><h1 className="mb-4 text-2xl font-bold">{title}</h1>
  <div className="mb-4 flex flex-wrap gap-2"><input className="input max-w-xs" placeholder="Rechercher…" aria-label="Rechercher" value={q} onChange={e=>setQ(e.target.value)}/>
   <input className="input max-w-xs" placeholder="Nouveau nom…" aria-label="Nouveau" value={nn} onChange={e=>setNn(e.target.value)}/>
   <button className="btn" disabled={!nn.trim()} onClick={()=>{set(a=>[...a,{id:Date.now(),name:nn,description:'',active:true}]);setNn('')}}>Ajouter</button></div>
  <Async loading={d.loading} error={d.error}>{rows?.length?<ul className="space-y-2">{rows.map((x,i)=><li key={x.id} className="card flex flex-wrap items-center justify-between gap-2"><span className={x.active?'':'text-slate-400 line-through'}>{x.name}</span>
   <span className="flex gap-2 text-sm"><button className="btn-o" onClick={()=>set(a=>a.map(y=>y.id===x.id?{...y,active:!y.active}:y))}>{x.active?'Désactiver':'Activer'}</button>
   <button className="btn-o" disabled={i===0} onClick={()=>set(a=>{const b=[...a];[b[i-1],b[i]]=[b[i],b[i-1]];return b})}>↑</button>
   <button className="btn-o" onClick={()=>{const n=prompt('Nouveau nom',x.name);if(n)set(a=>a.map(y=>y.id===x.id?{...y,name:n}:y))}}>Modifier</button>
   <button className="btn-o text-red-600" onClick={()=>confirm('Supprimer ?')&&set(a=>a.filter(y=>y.id!==x.id))}>Supprimer</button></span></li>)}</ul>:<Empty>Aucun élément.</Empty>}</Async></div>}

export function ProjectsManager(){
 const d=useAsync(()=>api.list<Project>('projects'),[])
 const [name,setName]=useState('')
 const [description,setDescription]=useState('')
 const [image,setImage]=useState('')
 const [error,setError]=useState('')
 const [notice,setNotice]=useState('')
 const [saving,setSaving]=useState(false)

 function selectImage(event:React.ChangeEvent<HTMLInputElement>){
  const file=event.target.files?.[0]
  setError('')
  setImage('')
  if(!file)return
  if(!file.type.startsWith('image/')){setError('Veuillez sélectionner un fichier image.');return}
  if(file.size>5*1024*1024){setError('L’image ne doit pas dépasser 5 Mo.');return}
  const reader=new FileReader()
  reader.onload=()=>{if(typeof reader.result==='string')setImage(reader.result)}
  reader.onerror=()=>setError('Impossible de lire cette image. Sélectionnez un autre fichier.')
  reader.readAsDataURL(file)
 }

 async function add(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault()
  const form=event.currentTarget
  setError('')
  setNotice('')
  setSaving(true)
  try{
   const project=await api.addProject({name:name.trim(),description:description.trim(),image})
   d.setData([...(d.data??[]),project])
   setName('')
   setDescription('')
   setImage('')
   form.reset()
   setNotice(import.meta.env.VITE_USE_MOCK==='false'
    ?'Réalisation enregistrée. Elle sera publiée dès la mise à jour du site.'
    :'Réalisation enregistrée sur cet appareil. Elle sera publiée sur le site en ligne après configuration de l’API ou intégration avant le prochain déploiement.')
  }catch(exception){
   setError(exception instanceof Error?exception.message:'Impossible d’enregistrer cette réalisation.')
  }finally{
   setSaving(false)
  }
 }

 return <div className="project-admin">
  <h1 className="admin-page-title">Réalisations</h1>
  <p className="admin-page-lead">Ajoutez une image et une courte description pour chaque projet.</p>
  <form className="project-admin-form" onSubmit={add}>
   <label className="partner-admin-label">Nom du projet<input className="input mt-2" required maxLength={120} value={name} onChange={event=>setName(event.target.value)} placeholder="Ex. Site vitrine"/></label>
   <label className="partner-admin-label">Image du projet<input className="input mt-2" type="file" accept="image/*" required onChange={selectImage}/></label>
   {image&&<img className="project-admin-preview" src={image} alt="Aperçu de la réalisation"/>}
   <label className="partner-admin-label sm:col-span-2">Brève description<textarea className="input mt-2" rows={3} required maxLength={500} value={description} onChange={event=>setDescription(event.target.value)} placeholder="Présentez brièvement le projet."/></label>
   <p className="project-admin-note sm:col-span-2">Les ajouts en mode local sont enregistrés dans ce navigateur uniquement. Pour les partager sur le site en ligne, l’API de gestion des réalisations doit être configurée.</p>
   {error&&<p role="alert" className="auth-error sm:col-span-2">{error}</p>}
   {notice&&<p role="status" className="project-admin-success sm:col-span-2">{notice}</p>}
   <button className="btn sm:col-span-2 sm:justify-self-start" disabled={saving||!image}>{saving?'Enregistrement…':'Ajouter la réalisation'}</button>
  </form>
  <Async loading={d.loading} error={d.error}>{d.data?.length
   ?<div className="project-admin-list">{d.data.map(project=><article className="project-admin-row" key={project.id}><img src={project.image} alt=""/><div><h2>{project.name}</h2><p>{project.description}</p></div></article>)}</div>
   :<Empty>Aucune réalisation enregistrée.</Empty>}</Async>
 </div>
}

   export function PartnerManager(){
    const d=useAsync(()=>api.list<Partner>('partners'),[])
    const [name,setName]=useState('')
    const [logoUrl,setLogoUrl]=useState('')
    const [error,setError]=useState('')
    const [saving,setSaving]=useState(false)
    async function add(e:React.FormEvent){
     e.preventDefault();setError('');setSaving(true)
     try{const partner=await api.addPartner({name:name.trim(),logoUrl:logoUrl.trim()});d.setData([...(d.data??[]),partner]);setName('');setLogoUrl('')}
     catch(x){setError(x instanceof Error?x.message:'Impossible d’ajouter le partenaire.')}
     finally{setSaving(false)}
    }
    return <div className="partner-admin">
     <h1 className="admin-page-title">Partenaires</h1>
     <p className="admin-page-lead">Ajoutez les entreprises partenaires et l’adresse publique de leur logo.</p>
     <form className="partner-admin-form" onSubmit={add}>
      <label className="partner-admin-label">Nom de l’entreprise<input className="input mt-2" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="Ex. Entreprise partenaire"/></label>
      <label className="partner-admin-label">URL du logo<input className="input mt-2" type="url" required value={logoUrl} onChange={e=>setLogoUrl(e.target.value)} placeholder="https://exemple.com/logo.png"/></label>
      {error&&<p role="alert" className="auth-error sm:col-span-2">{error}</p>}
      <button className="btn sm:col-span-2 sm:justify-self-start" disabled={saving}>{saving?'Ajout…':'Ajouter le partenaire'}</button>
     </form>
     <Async loading={d.loading} error={d.error}>{d.data?.length
      ?<div className="partner-admin-list">{d.data.map(partner=><article className="partner-admin-row" key={partner.id}><img src={partner.logoUrl} alt={`Logo ${partner.name}`} /><div><h2>{partner.name}</h2><p>{partner.logoUrl}</p></div></article>)}</div>
      :<Empty>Aucun partenaire pour le moment.</Empty>}</Async>
    </div>
   }

   export const Settings=()=><div><h1 className="mb-4 text-2xl font-bold">Paramètres</h1><p className="text-slate-600">Nom du site, SEO, réseaux : à connecter à l'API (placeholder).</p></div>
