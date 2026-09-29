/* DONNÉES DE DÉMONSTRATION — à remplacer par l'API Nest.js */
const mk=(rows:string[][],extra:(r:string[])=>object=()=>({}))=>rows.map((r,i)=>({id:i+1,name:r[0],category:r[1],description:r[2]??r[1],active:true,...extra(r)}))
export const mock:Record<string,any[]>={
skills:mk([['HTML','Frontend'],['CSS','Frontend'],['React','Frontend'],['Tailwind CSS','Frontend'],['PHP','Backend'],['Nest.js','Backend'],['PostgreSQL','Base de données'],['Git','Outils'],['SEO','Digital'],['Solutions IA','Digital']]),
services:mk([['Développement web','🌐'],['Applications mobiles','📱'],['API et intégrations','🔌'],['SEO','🔍'],['Automatisation','🤖'],['Solutions IA','✨']].map(r=>[r[0],r[1],`Service ${r[0]} sur mesure.`]),r=>({icon:r[1]})),
projects:mk([['Boutique (démo)','Web'],['App de suivi (démo)','Mobile'],['Dashboard SEO (démo)','Digital'],['API réservation (démo)','API']].map(r=>[r[0],r[1],'Projet fictif de démonstration.']),()=>({techs:['React','Nest.js'],url:'#',problem:'Problématique fictive.',solution:'Solution fictive.'})),
faqs:[{id:1,name:'Quels sont vos délais ?',description:'De 2 à 8 semaines selon le projet (démo).',active:true},{id:2,name:'Proposez-vous la maintenance ?',description:'Oui, sur demande (démo).',active:true}],
requests:[{id:1,name:'Site vitrine — A. Client',description:'Nouvelle',active:true},{id:2,name:'Audit SEO — B. Client',description:'En cours',active:true}],
messages:[{id:1,name:'C. Visiteur',description:'Bonjour, une question…',active:true}],
users:[{id:1,name:'Admin',description:'administrateur',active:true},{id:2,name:'Utilisateur',description:'utilisateur',active:true}],
partners:[]}
export const seoMock={score:72,critical:['Meta description manquante sur 3 pages'],warnings:['Images sans ALT','Chargement mobile lent'],good:['HTTPS actif','Sitemap détecté','H1 correct']}
