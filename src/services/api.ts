import { mock, seoMock } from '../data/mock'
import type { Partner, Resource, SeoResult } from '../types'
const BASE=import.meta.env.VITE_API_URL??'http://localhost:3000/api'
const MOCK=import.meta.env.VITE_USE_MOCK!=='false'
const PARTNERS_KEY='portfolio-partners'
const wait=(ms=500)=>new Promise(r=>setTimeout(r,ms))
async function http<T>(path:string,init?:RequestInit):Promise<T>{
 const t=localStorage.getItem('token')
 const res=await fetch(BASE+path,{...init,headers:{'Content-Type':'application/json',...(t?{Authorization:`Bearer ${t}`}:{})}})
 if(!res.ok)throw new Error(`Erreur ${res.status}`);return res.json()}
export const api={
 async list<T=any>(r:Resource):Promise<T[]>{if(!MOCK)return http(`/${r}`);await wait();if(r==='partners'){const saved=localStorage.getItem(PARTNERS_KEY);return structuredClone(saved?JSON.parse(saved) as Partner[]:mock.partners) as T[]}return structuredClone(mock[r])},
 async addPartner(partner:Pick<Partner,'name'|'logoUrl'>):Promise<Partner>{
  if(!MOCK)return http<Partner>('/partners',{method:'POST',body:JSON.stringify(partner)})
  await wait(300)
  const current=await this.list<Partner>('partners')
  const created:Partner={id:Date.now(),...partner,description:'',active:true}
  localStorage.setItem(PARTNERS_KEY,JSON.stringify([...current,created]))
  return created
 },
 async get<T=any>(r:Resource,id:number):Promise<T|undefined>{if(!MOCK)return http(`/${r}/${id}`);await wait(300);return mock[r].find(x=>x.id===id)},
 async submit(kind:'requests'|'messages',data:unknown){if(!MOCK)return http(`/${kind}`,{method:'POST',body:JSON.stringify(data)});await wait(900);return{ok:true}},
 async analyze(url:string):Promise<SeoResult>{if(!MOCK)return http('/seo-audits',{method:'POST',body:JSON.stringify({url})});await wait(300);return seoMock},
 async login(email:string,password:string){
  if(MOCK)throw new Error('La connexion nécessite un serveur configuré. Désactivez le mode démo et configurez l’API.')
  return http<{token:string;role:string}>('/auth/login',{method:'POST',body:JSON.stringify({email,password})})
 }}
