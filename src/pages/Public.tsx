import { useState } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAsync } from '../hooks/useAsync'
import { Async, Empty, Page } from '../components/ui'
import { Icon, type IconName } from '../components/Icon'
import { profile } from '../data/profile'
import { Brand } from '../components/Brand'
import SimpleForm from '../components/SimpleForm'
import type { Item, Partner, SeoResult } from '../types'

const serviceIcons: IconName[] = ['code', 'smartphone', 'plug', 'search', 'workflow', 'sparkles']

export function Home(){const s=useAsync(()=>api.list<Item>('services'),[])
 return<><section className="hero-section">
   <div className="hero-grid mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
    <div className="hero-copy">
     <p className="eyebrow"><span className="status-dot"/> Développeur Full Stack Web & Mobile</p>
     <h1>Transformation des idées en <span>expériences numériques</span> utiles.</h1>
     <p className="hero-lead">Moi, c’est Sergiahos. Je transforme vos idées et vos besoins en solutions numériques claires, modernes, performantes et adaptées à votre activité.
</p>
     <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
      <Link className="btn" to="/request">Parlons de votre projet <Icon name="arrow-up-right" size={17}/></Link>
      <Link className="btn-o" to="/projects">Découvrir mes réalisations</Link>
     </div>
     <div className="hero-proof"><span className=""/><span>Né à Cotonou, au Bénin, pour l'Afrique et le monde.</span></div>
    </div>
    <div className="hero-visual" role="img" aria-label={`Portrait de ${profile.name}`}>
     <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
     <div className="portrait-frame">
      {profile.portrait ? <img src={profile.portrait} alt={`Portrait de ${profile.name}`} className="portrait-image"/> : <div className="portrait-placeholder"><span>SH</span><small>Développement · Créativité · Impact</small></div>}
     </div>
     <div className="floating-note"><span className="note-icon"><Icon name="sparkles" size={18}/></span><span><strong>Du concept au concret</strong><small>Des solutions pensées pour vous</small></span></div>
     
    </div>
   </div>
  </section>
  <section id="services-list" className="section-wrap">
   <div className="section-heading"><div><p className="eyebrow">Ce que je peux faire pour vous</p><h2>Des services adaptés à vos ambitions.</h2></div><Link className="text-link" to="/services">Tous les services <Icon name="arrow-right" size={17}/></Link></div>
   <Async loading={s.loading} error={s.error}><div className="service-grid">{s.data?.filter(x=>x.active).map((x,i)=><article key={x.id} className="service-card"><div className="service-icon"><Icon name={serviceIcons[i%serviceIcons.length]} size={23}/></div><h3>{x.name}</h3><p>{x.description}</p><Link className="text-link mt-5" to={`/request?service=${encodeURIComponent(x.name)}`}>Découvrir <Icon name="arrow-right" size={16}/></Link></article>)}</div></Async>
  </section>
  <section className="callout-section"><div className="callout-inner"><div><p className="eyebrow eyebrow-light">Vous avez une idée ?</p><h2>Faisons-en votre prochain succès.</h2></div><Link className="btn btn-light" to="/contact">Entrer en contact <Icon name="arrow-up-right" size={17}/></Link></div></section>
 </>}

export function About(){return <section className="section-wrap about-wrap">
  <div className="section-heading"><div><p className="eyebrow">Cotonou, Bénin, pour l'Afrique et le monde.</p><h1>Je suis Sergio AHOSSI, développeur Full Stack Web & Mobile.</h1><p className="section-lead">Créateur de Sergiahos, une marque dédiée au développement et aux solutions digitales pensées pour transformer les idées en projets utiles.</p></div></div>
  <div className="about-grid">
   <div className="about-portrait">
    {profile.portrait ? <img src={profile.portrait} alt={`Portrait de ${profile.name}`} className="portrait-image"/> : <div className="portrait-placeholder"><span>SH</span><small>Portrait de Sergiahos</small></div>}
    <div className="about-photo-caption">Curiosité, rigueur et sens du détail.</div>
   </div>
   <div className="about-copy">
    <p className="eyebrow">Mon histoire</p>
    <h2>De l’informatique de gestion aux solutions digitales.</h2>
    <p>Mon parcours a commencé par une formation en informatique de gestion, qui m’a apporté une compréhension à la fois technique et attentive aux besoins des organisations. Cette base m’a conduit vers le développement web et mobile, où chaque projet nourrit ma pratique et ma curiosité.</p>
    <p>Un projet est pour moi plus qu’un défi technique : c’est l’occasion d’apprendre, d’innover et de transformer un besoin concret en une solution moderne et adaptée. Cette vision a donné naissance à Sergiahos : créer, développer et faire évoluer des idées qui ont du sens.</p>
    <p>Aujourd’hui, je conçois des sites web, des applications et des solutions sur mesure. J’interviens du frontend au backend, ainsi qu’en SEO, automatisation, intelligence artificielle, marketing digital et visibilité en ligne.</p>
    <div className="about-tags"><span>Full Stack</span><span>Web & mobile</span><span>SEO</span><span>Automatisation</span><span>Intelligence artificielle</span><span>Marketing digital</span></div>
    <Link className="btn mt-7" to="/contact">Faire connaissance <Icon name="arrow-up-right" size={17}/></Link>
   </div>
  </div>
  <div className="journey-heading"><p className="eyebrow">Mon parcours</p><h2>Une évolution portée par l’envie de construire.</h2></div>
  <div className="journey-grid">
   {[['01','Formation','Informatique de gestion','Une base à la croisée de la technique et des besoins des organisations.'],['02','Exploration','Du web au mobile','Des projets, des technologies nouvelles et un apprentissage continu dans le numérique.'],['03','Aujourd’hui','Créateur de Sergiahos','Des sites, applications et solutions digitales conçus pour répondre à des besoins réels.']].map(([n,k,t,d])=><article className="journey-card" key={n}><span className="journey-number">{n}</span><p className="eyebrow">{k}</p><h3>{t}</h3><p>{d}</p></article>)}
  </div>
  <div className="journey-heading approach-heading"><p className="eyebrow">Ma façon de travailler</p><h2>Du besoin à une solution qui évolue.</h2></div>
  <div className="approach-grid">
   {[['01','Écouter','Comprendre votre contexte et les personnes à qui vous vous adressez.'],['02','Concevoir','Définir une expérience et une solution cohérentes avec vos objectifs.'],['03','Construire','Livrer un produit soigné, responsive et prêt à évoluer.']].map(([n,t,d])=><article className="approach-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
  </div>
 </section>}

export function Projects(){const [q,setQ]=useState('');const [cat,setCat]=useState('Tous');const p=useAsync(()=>api.list<Item>('projects'),[])
 const cats=['Tous',...new Set(p.data?.map(x=>x.category))];const l=p.data?.filter(x=>x.published!==false&&(cat==='Tous'||x.category===cat)&&x.name.toLowerCase().includes(q.toLowerCase()))
 return<Page title="Mes réalisations"><div className="mb-6 flex flex-wrap gap-2"><input className="input max-w-xs" placeholder="Rechercher…" aria-label="Rechercher" value={q} onChange={e=>setQ(e.target.value)}/>{cats.map(c=><button key={c} aria-pressed={c===cat} onClick={()=>setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm ${c===cat?'bg-sky text-white':''}`}>{c}</button>)}</div>
  <Async loading={p.loading} error={p.error}>{l?.length?<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{l.map(x=><Link key={x.id} to={`/projects/${x.id}`} className="card"><div className="mb-3 grid h-28 place-items-center rounded-lg bg-sky-light text-3xl">🖼️</div><span className="text-xs font-bold uppercase text-sky">{x.category}</span><h2 className="font-bold">{x.name}</h2><p className="text-sm text-slate-600">{x.description}</p></Link>)}</div>:<Empty>Aucun projet trouvé.</Empty>}</Async></Page>}

export function ProjectDetail(){const {id}=useParams();const p=useAsync(()=>api.get<Item>('projects',Number(id)),[id])
 return<Page title={p.data?.name??'Réalisation'}><Async loading={p.loading} error={p.error}>{p.data?<article className="project-detail-card"><p className="project-description">{p.data.description}</p><div className="project-detail-grid"><section><h2>Problématique</h2><p>{p.data.problem}</p></section><section><h2>Solution</h2><p>{p.data.solution}</p></section></div>{p.data.techs?.length>0&&<p className="project-techs">{p.data.techs.join(' · ')}</p>}{p.data.url&&p.data.url!=='#'&&<a className="btn project-visit" href={p.data.url} target="_blank" rel="noreferrer">Visiter le projet <Icon name="arrow-up-right" size={17}/></a>}</article>:<Empty>Projet introuvable.</Empty>}</Async></Page>}

export function Request(){const [sp]=useSearchParams();const s=useAsync(()=>api.list<Item>('services'),[])
 return<Page title="Demander un projet"><div className="request-form-card"><p>Décrivez votre besoin pour que nous puissions étudier la meilleure approche.</p><SimpleForm cta="Envoyer ma demande" initial={{service:sp.get('service')??''}} onSubmit={d=>api.submit('requests',d)} fields={[{name:'nom',label:'Nom',required:true},{name:'email',label:'E-mail',type:'email',required:true},{name:'service',label:'Service demandé',type:'select',options:s.data?.map(x=>x.name),otherOption:true,required:true},{name:'budget',label:'Budget estimé (FCFA)',type:'select',options:['À discuter','Moins de 100 000 FCFA','100 000 à 300 000 FCFA','300 000 à 750 000 FCFA','750 000 à 1 500 000 FCFA','Plus de 1 500 000 FCFA']},{name:'desc',label:'Description',type:'textarea',required:true}]}/></div></Page>}

export function Contact(){return <section className="section-wrap contact-wrap">
 <div className="section-heading"><div><p className="eyebrow">Contact</p><h1>Parlons de votre prochain projet.</h1><p className="section-lead">Une question, une idée ou un besoin précis ? Décrivez-moi ce que vous avez en tête, je vous répondrai avec plaisir.</p></div></div>
 <div className="contact-grid">
  <div className="contact-aside">
   <article className="contact-method"><span className="contact-icon"><Icon name="mail" size={20}/></span><div><small>E-mail</small><a href={`mailto:${profile.email}`}>{profile.email}</a></div></article>
   {profile.phone && <article className="contact-method"><span className="contact-icon"><Icon name="phone" size={20}/></span><div><small>Téléphone</small><a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}>{profile.phone}</a></div></article>}
   <div className="contact-note"><p className="eyebrow">Une collaboration simple</p><p>Parlez-moi de votre contexte et de vos objectifs. Nous pourrons ensuite voir ensemble la meilleure façon d’avancer.</p></div>
   {profile.socials.length > 0 && <div className="contact-socials"><h2>Retrouvez-moi aussi ici</h2><div className="flex flex-wrap gap-3">{profile.socials.map(social=><a className={`social-pill${social.url ? '' : ' social-pill-disabled'}`} key={social.label} href={social.url || undefined} title={social.url ? social.label : 'Lien à ajouter'} target={social.url ? '_blank' : undefined} rel={social.url ? 'noreferrer' : undefined}><Icon name={social.icon} size={17}/>{social.label}</a>)}</div></div>}
  </div>
  <div className="contact-form-card"><h2>Envoyez-moi un message</h2><p>Les champs marqués d’un astérisque sont obligatoires.</p><SimpleForm cta="Envoyer le message" onSubmit={d=>api.submit('messages',d)} fields={[{name:'nom',label:'Votre nom *',required:true},{name:'email',label:'Votre e-mail *',type:'email',required:true},{name:'sujet',label:'Sujet *',required:true},{name:'msg',label:'Votre message *',type:'textarea',required:true}]}/></div>
 </div>
 </section>}

export function Faq(){const f=useAsync(()=>api.list<Item>('faqs'),[]);const [o,setO]=useState<number>()
 return<Page title="FAQ"><Async loading={f.loading} error={f.error}><div className="faq-list">{f.data?.filter(x=>x.active).map(x=><div key={x.id} className="faq-card"><button className="faq-question" aria-expanded={o===x.id} onClick={()=>setO(o===x.id?undefined:x.id)}><span>{x.name}</span><span className="faq-indicator">{o===x.id?'−':'+'}</span></button>{o===x.id&&<p className="faq-answer">{x.description}</p>}</div>)}</div></Async></Page>}

export function SeoAudit(){const [url,setUrl]=useState('');const [pct,setPct]=useState(0);const [r,setR]=useState<SeoResult>();const nav=useNavigate()
 async function go(e:React.FormEvent){e.preventDefault();if(!url.trim())return;setR(undefined);setPct(1);for(let i=1;i<=10;i++){await new Promise(x=>setTimeout(x,250));setPct(i*10)};setR(await api.analyze(url));setPct(0)}
 const L=(t:string,a:string[],c:string)=><div className="card"><h3 className={`font-bold ${c}`}>{t}</h3><ul className="list-disc pl-5 text-sm">{a.map(x=><li key={x}>{x}</li>)}</ul></div>
 return<Page title="Diagnostic SEO"><div className="seo-content"><p className="seo-intro">Analysez les principaux points de visibilité de votre site et identifiez les pistes d’amélioration.</p><form onSubmit={go} className="seo-form"><input className="input" type="url" required placeholder="https://monsite.com" aria-label="URL du site à analyser" value={url} onChange={e=>setUrl(e.target.value)}/><button className="btn" disabled={pct>0}>{pct>0?'Analyse…':'Analyser mon site'}</button></form>
  {pct>0&&<div role="progressbar" aria-label="Progression de l’analyse" aria-valuenow={pct} className="seo-progress"><div className="h-full rounded-full bg-sky transition-all" style={{width:`${pct}%`}}/></div>}
  {r&&<div className="seo-results"><p className="seo-score">{r.score}<span>/100</span></p><div className="seo-result-grid">{L('Critiques',r.critical,'text-red-600')}{L('À améliorer',r.warnings,'text-amber-600')}{L('Points positifs',r.good,'text-green-600')}</div><button className="btn" onClick={()=>nav('/request?service=SEO')}>Améliorer mon référencement <Icon name="arrow-up-right" size={17}/></button></div>}</div></Page>}

export function Partners(){const p=useAsync(()=>api.list<Partner>('partners'),[])
 return<Page title="Partenaires"><div className="partners-content"><p className="partners-intro">Je suis heureux de collaborer avec des entreprises qui partagent le goût du travail bien fait et des solutions utiles.</p><Async loading={p.loading} error={p.error}>{p.data?.filter(x=>x.active).length?<div className="partner-grid">{p.data.filter(x=>x.active).map(partner=><article className="partner-card" key={partner.id}><img src={partner.logoUrl} alt={`Logo ${partner.name}`} loading="lazy"/><h2>{partner.name}</h2></article>)}</div>:<Empty>Les partenaires seront bientôt présentés ici.</Empty>}</Async></div></Page>}

export function Login({admin=false}:{admin?:boolean}){const nav=useNavigate();const [e,setE]=useState('');const [p,setP]=useState('');const [err,setErr]=useState('');const [ld,setLd]=useState(false);const [showPassword,setShowPassword]=useState(false)
 async function go(ev:React.FormEvent){ev.preventDefault();setErr('');setLd(true)
  try{const r=await api.login(e,p);if(admin&&r.role!=='admin')throw new Error('Ce compte ne dispose pas des droits administrateur.')
   localStorage.setItem('token',r.token);localStorage.setItem('role',r.role);nav(r.role==='admin'?'/admin/dashboard':'/dashboard')
  }catch(x){setErr(x instanceof Error?x.message:'La connexion a échoué. Veuillez réessayer.')}finally{setLd(false)}}
 return <section className="auth-page">
  <div className="auth-card">
   <Brand className="auth-brand" />
   <p className="eyebrow mt-8">{admin?'Espace sécurisé':'Espace client'}</p>
   <h1>{admin?'Connexion Admin':'Bon retour parmi nous'}</h1>
   <form onSubmit={go} className="mt-7 space-y-5">
    <label className="auth-label">Adresse e-mail
     <input className="input mt-2" type="email" autoComplete="username" required placeholder="nom@exemple.com" value={e} onChange={x=>setE(x.target.value)}/>
    </label>
    <label className="auth-label">Mot de passe
     <span className="password-field"><input className="input mt-2" type={showPassword?'text':'password'} autoComplete="current-password" required placeholder="Votre mot de passe" value={p} onChange={x=>setP(x.target.value)}/><button className="password-toggle" type="button" aria-label={showPassword?'Masquer le mot de passe':'Afficher le mot de passe'} aria-pressed={showPassword} onClick={()=>setShowPassword(!showPassword)}><Icon name={showPassword?'eye-off':'eye'} size={19}/></button></span>
    </label>
    {err&&<p role="alert" className="auth-error">{err}</p>}
    <button className="btn w-full justify-center" disabled={ld}>{ld?'Connexion en cours…':'Se connecter'}</button>
   </form>
   <Link className="auth-back" to="/">← Retour au site</Link>
  </div>
 </section>}
