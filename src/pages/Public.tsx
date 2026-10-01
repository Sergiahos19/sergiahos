import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAsync } from '../hooks/useAsync'
import { Async, Empty, Page } from '../components/ui'
import { Icon, type IconName } from '../components/Icon'
import { profile } from '../data/profile'
import SimpleForm from '../components/SimpleForm'
import type { Item, Partner, Project, SeoResult } from '../types'

const serviceIcons: IconName[] = ['code', 'smartphone', 'plug', 'search', 'workflow', 'sparkles']

export function Home(){const s=useAsync(()=>api.list<Item>('services'),[])
 return<><section className="hero-section">
   <div className="hero-grid mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:py-24">
    <div className="hero-copy">
     <p className="eyebrow"><span className="status-dot"/> Développeur Full Stack Web & Mobile</p>
     <h1>Transformation des idées en <span>expériences numériques</span> utiles.</h1>
     <p className="hero-lead">Je transforme vos idées et vos besoins en solutions numériques claires, modernes, performantes et adaptées à votre activité.
</p>
     <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
      <Link className="btn" to="/request">Parlons de votre projet <Icon name="arrow-up-right" size={17}/></Link>
      <Link className="btn-o" to="/projects">Découvrir mes réalisations</Link>
     </div>
     <div className="hero-proof"><span className=""/><span>Un jour à Cotonou, au Bénin, pour l’Afrique et le monde.</span></div>
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
  <section id="services-list" className="section-wrap" tabIndex={-1}>
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
    <div className="about-photo-caption">Un cerveau trop curieux pour rester tranquille.</div>
   </div>
   <div className="about-copy">
    <p className="eyebrow">Mon histoire</p>
    <h2>De l’Informatique de Gestion aux solutions digitales.</h2>
    <p>Mon parcours universitaire a commencé par une formation en Informatique de Gestion à l’Université Catholique de l'Afrique de l'Ouest Unité Universitaire à Cotonou (UCAO-UUC), qui m’a apporté une compréhension à la fois technique et attentive aux besoins des organisations. Cette base m’a conduit vers le développement web et mobile, où chaque projet nourrit ma pratique et ma curiosité.</p>
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
   {[['01','Écouter','Comprendre votre contexte et les personnes à qui vous vous adressez.'],['02','Concevoir','Définir une expérience et une solution cohérente avec vos objectifs.'],['03','Construire','Livrer un produit soigné, responsive et prêt à évoluer.']].map(([n,t,d])=><article className="approach-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
  </div>
 </section>}

export function Projects(){const p=useAsync(()=>api.list<Project>('projects'),[])
 const published=p.data?.filter(x=>x.active&&x.published!==false)??[]
 return<Page title="Quelques réalisations">
  <Async loading={p.loading} error={p.error}>{published.length?<div className="project-gallery">{published.map(project=><article key={project.id} className="project-card"><img className="project-image" src={project.image} alt={`Image du projet ${project.name}`} loading="lazy"/><div className="project-card-copy"><h2>{project.name}</h2><p>{project.description}</p></div></article>)}</div>:<Empty>Les réalisations seront publiées bientôt. Revenez prochainement.</Empty>}</Async></Page>}

export function Request(){const [sp]=useSearchParams();const s=useAsync(()=>api.list<Item>('services'),[])
 return<Page title="Demander un projet"><div className="request-form-card"><p>Décrivez votre besoin pour que nous puissions étudier la meilleure approche.</p><SimpleForm cta="Envoyer ma demande" initial={{service:sp.get('service')??''}} onSubmit={d=>api.submit('requests',d)} fields={[{name:'nom',label:'Nom',required:true},{name:'email',label:'E-mail',type:'email',required:true},{name:'service',label:'Service demandé',type:'select',options:s.data?.map(x=>x.name),otherOption:true,required:true},{name:'budget',label:'Budget estimé (FCFA)',type:'select',options:['À discuter','Moins de 100 000 FCFA','100 000 à 300 000 FCFA','300 000 à 750 000 FCFA','750 000 à 1 500 000 FCFA','Plus de 1 500 000 FCFA']},{name:'desc',label:'Description',type:'textarea',required:true}]}/></div></Page>}

export function Contact(){return <section className="section-wrap contact-wrap">
 <div className="contact-heading"><p className="eyebrow">Contact</p><h1>Parlons de votre prochain projet.</h1><p className="section-lead">Une question, une idée ou un besoin précis ? Décrivez-moi ce que vous avez en tête, je vous répondrai avec plaisir.</p></div>
 <div className="contact-grid">
  <div className="contact-methods">
   <article className="contact-method"><span className="contact-icon"><Icon name="mail" size={20}/></span><div><small>E-mail</small><a href={`mailto:${profile.email}`}>{profile.email}</a></div></article>
   {profile.phone && <article className="contact-method"><span className="contact-icon"><Icon name="phone" size={20}/></span><div><small>Téléphone</small><a href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`}>{profile.phone}</a></div></article>}
  </div>
  <div className="contact-extras">
   <div className="contact-note"><p className="eyebrow">Une collaboration simple</p><p>Parlez-moi de votre contexte et de vos objectifs. Nous pourrons ensuite voir ensemble la meilleure façon d’avancer.</p></div>
  </div>
  <div className="contact-form-card"><h2>Envoyez-moi un message</h2><SimpleForm cta="Envoyer le message" onSubmit={d=>api.submit('messages',d)} fields={[{name:'nom',label:'Votre nom *',required:true},{name:'email',label:'Votre e-mail *',type:'email',required:true},{name:'sujet',label:'Sujet *',required:true},{name:'msg',label:'Votre message *',type:'textarea',required:true}]}/></div>
  {profile.socials.length > 0 && <div className="contact-socials"><h2>Retrouvez-moi aussi ici</h2><div className="contact-social-links">{profile.socials.map(social=><a className={`social-pill${social.url ? '' : ' social-pill-disabled'}`} key={social.label} href={social.url || undefined} aria-label={social.url ? social.label : `${social.label}, lien à ajouter`} title={social.url ? social.label : 'Lien à ajouter'} target={social.url ? '_blank' : undefined} rel={social.url ? 'noreferrer' : undefined}><Icon name={social.icon} size={17}/>{social.label}</a>)}</div></div>}
 </div>
 </section>}

export function Faq(){const f=useAsync(()=>api.list<Item>('faqs'),[]);const [o,setO]=useState<number>()
 return<Page title="FAQ"><Async loading={f.loading} error={f.error}><div className="faq-list">{f.data?.filter(x=>x.active).map(x=><div key={x.id} className="faq-card"><button className="faq-question" aria-expanded={o===x.id} onClick={()=>setO(o===x.id?undefined:x.id)}><span>{x.name}</span><span className="faq-indicator">{o===x.id?'−':'+'}</span></button>{o===x.id&&<p className="faq-answer">{x.description}</p>}</div>)}</div></Async></Page>}

export function SeoAudit(){const [url,setUrl]=useState('');const [loading,setLoading]=useState(false);const [error,setError]=useState('');const [r,setR]=useState<SeoResult>();const nav=useNavigate()
 async function go(e:React.FormEvent){e.preventDefault();if(!url.trim())return;setR(undefined);setError('');setLoading(true);try{const result=await api.analyze(url);setR(result)}catch(x){setError(x instanceof Error?x.message:'Le diagnostic a échoué. Réessayez.')}finally{setLoading(false)}}
 const L=(t:string,a:string[],c:string)=><div className="card"><h3 className={`font-bold ${c}`}>{t}</h3><ul className="list-disc pl-5 text-sm">{a.map(x=><li key={x}>{x}</li>)}</ul></div>
 return<Page title="Diagnostic SEO"><div className="seo-content"><p className="seo-intro">Analysez les principaux points de visibilité de votre site et identifiez les pistes d’amélioration.</p><form onSubmit={go} className="seo-form"><input className="input" type="url" required placeholder="https://monsite.com" aria-label="URL du site à analyser" value={url} onChange={e=>setUrl(e.target.value)}/><button className="btn" disabled={loading}>{loading?'Vérification…':'Analyser mon site'}</button></form>
  {loading&&<div role="status" className="seo-checking">Vérification de l’existence du site avant l’analyse…</div>}
  {error&&<p role="alert" className="auth-error">{error}</p>}
  {r&&<div className="seo-results"><p className="seo-score">{r.score}<span>/100</span></p><div className="seo-result-grid">{L('Critiques',r.critical??[],'text-red-600')}{L('À améliorer',r.warnings??[],'text-amber-600')}{L('Points positifs',r.good??[],'text-green-600')}</div><button className="btn" onClick={()=>nav('/request?service=SEO')}>Améliorer mon référencement <Icon name="arrow-up-right" size={17}/></button></div>}</div></Page>}

export function Partners(){const p=useAsync(()=>api.list<Partner>('partners'),[])
 const partners=p.data?.filter(x=>x.active)??[]
 return<Page title="Partenaires"><div className="partners-content"><p className="partners-intro">Je suis heureux de collaborer avec des entreprises qui partagent le goût du travail bien fait et des solutions utiles.</p><Async loading={p.loading} error={p.error}>{partners.length?<div className="partner-grid">{partners.map(partner=><article className="partner-card" key={partner.id}><img src={partner.logoUrl} alt={`Logo ${partner.name}`} loading="lazy"/></article>)}</div>:<Empty>Les partenaires seront bientôt présentés ici.</Empty>}</Async></div></Page>}
