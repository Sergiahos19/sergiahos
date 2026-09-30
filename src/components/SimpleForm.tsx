import { useState } from 'react'
import { Icon } from './Icon'
export interface Field{name:string;label:string;type?:'text'|'email'|'textarea'|'select';options?:string[];required?:boolean;otherOption?:boolean}
export default function SimpleForm({fields,onSubmit,initial={},cta}:{fields:Field[];onSubmit:(d:Record<string,string>)=>Promise<unknown>;initial?:Record<string,string>;cta:string}){
 const [v,setV]=useState<Record<string,string>>(initial);const [err,setErr]=useState<Record<string,string>>({});const [st,setSt]=useState('idle');const [whatsAppUrl,setWhatsAppUrl]=useState('')
 const set=(n:string,x:string)=>setV({...v,[n]:x})
 async function go(e:React.FormEvent){e.preventDefault();const er:Record<string,string>={}
  fields.forEach(f=>{const x=(v[f.name]||'').trim();if(f.required&&!x)er[f.name]='Champ obligatoire.';else if(f.type==='email'&&x&&!/^\S+@\S+\.\S+$/.test(x))er[f.name]='E-mail invalide.';if(f.otherOption&&x==='Autres'&&!(v[`${f.name}Other`]||'').trim())er[`${f.name}Other`]='Veuillez préciser votre choix.'})
  setErr(er);if(Object.keys(er).length)return;setSt('load');setWhatsAppUrl('');try{const data={...v};fields.filter(f=>f.otherOption&&v[f.name]==='Autres').forEach(f=>{data[f.name]=(v[`${f.name}Other`]||'').trim();delete data[`${f.name}Other`]});const result=await onSubmit(data);if(typeof result==='object'&&result!==null&&'url'in result&&typeof result.url==='string')setWhatsAppUrl(result.url);setSt('ok');setV({})}catch{setSt('ko')}}
 return<form onSubmit={go} noValidate className="space-y-4">
  {fields.map(f=><label key={f.name} className="block text-sm font-semibold">{f.label}
   {f.type==='textarea'?<textarea className="input mt-1 font-normal" rows={4} value={v[f.name]||''} onChange={e=>set(f.name,e.target.value)}/>
   :f.type==='select'?<><select className="input mt-1 font-normal" value={v[f.name]||''} onChange={e=>set(f.name,e.target.value)}><option value="">Choisir…</option>{f.options?.map(o=><option key={o}>{o}</option>)}{f.otherOption&&<option value="Autres">Autres</option>}</select>{f.otherOption&&v[f.name]==='Autres'&&<input className="input mt-2 font-normal" aria-label="Précisez le service souhaité" placeholder="Précisez le service souhaité" value={v[`${f.name}Other`]||''} onChange={e=>set(`${f.name}Other`,e.target.value)} aria-invalid={!!err[`${f.name}Other`]}/>}</>
   :<input className="input mt-1 font-normal" type={f.type||'text'} value={v[f.name]||''} onChange={e=>set(f.name,e.target.value)} aria-invalid={!!err[f.name]}/>}
   <span className="block min-h-4 text-xs font-normal text-red-600">{err[f.name]||err[`${f.name}Other`]}</span></label>)}
  <button className="btn" disabled={st==='load'}>{st==='load'?'Envoi…':cta}</button>
  {st==='ok'&&<div role="status" className="rounded-lg bg-green-50 p-3 text-green-800"><p>Votre message est prêt dans WhatsApp. Vérifiez-le, puis appuyez sur Envoyer pour nous le transmettre.</p>{whatsAppUrl&&<a className="mt-2 inline-flex items-center gap-2 font-semibold underline" href={whatsAppUrl} target="_blank" rel="noreferrer">Ouvrir WhatsApp <Icon name="arrow-up-right" size={15}/></a>}</div>}
  {st==='ko'&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">Échec de l'envoi. Réessayez.</p>}</form>}
