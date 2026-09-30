import healthpassImage from '../../images/healthpass.png'
import nouvanImage from '../../images/nouvan.png'
import maryxLogo from '../../images/maryx.png'
import aworixLogo from '../../images/aworix.png'

/* Contenu intégré au frontend ; aucune donnée n’est chargée depuis une base. */
const mk=(rows:string[][],extra:(r:string[])=>object=()=>({}))=>rows.map((r,i)=>({id:i+1,name:r[0],category:r[1],description:r[2]??r[1],active:true,...extra(r)}))
export const content:Record<string,any[]> = {
services:mk([['Développement web','🌐'],['Applications mobiles','📱'],['API et intégrations','🔌'],['SEO','🔍'],['Automatisation','🤖'],['Solutions IA','✨']].map(r=>[r[0],r[1],`Service ${r[0]} sur mesure.`]),r=>({icon:r[1]})),
projects:[
 {id:1,name:'HealthPass',description:'Plateforme de gestion médicale : conception et développement d’une plateforme destinée à la gestion numérique des données médicales. HealthPass centralise les dossiers patients, rendez-vous, consultations, prescriptions et analyses, avec des espaces adaptés aux différents profils : administration, médecins et services.',image:healthpassImage,active:true,published:true},
 {id:2,name:'NouvAn',description:'Plateforme e-commerce : conception et développement d’une plateforme e-commerce dédiée aux produits et offres de fin d’année. Le projet met l’accent sur une présentation moderne des produits, une expérience utilisateur fluide et une interface adaptée à la vente en ligne.',image:nouvanImage,active:true,published:true},
],
faqs:[
 {id:1,name:'Quels services proposez-vous ?',description:'Nous proposons des services adaptés aux besoins de chaque client. Les prestations peuvent inclure la conception, la réalisation, l’accompagnement et le suivi de projets selon votre domaine d’activité.',active:true},
 {id:2,name:'Comment demander un devis ?',description:'Il suffit de nous contacter via le formulaire du site, WhatsApp, e-mail ou téléphone en précisant votre besoin. Nous étudions votre projet et vous transmettons une proposition adaptée.',active:true},
 {id:3,name:'Combien coûtent vos services ?',description:'Le tarif dépend de la nature du projet, de sa complexité, des fonctionnalités demandées et des délais. Un devis personnalisé est établi après étude de votre besoin.',active:true},
 {id:4,name:'Combien de temps faut-il pour réaliser un projet ?',description:'La durée varie selon le type et l’ampleur du projet. Après analyse de votre demande, nous vous communiquons un délai estimatif avant le démarrage.',active:true},
 {id:5,name:'Travaillez-vous avec des particuliers et des entreprises ?',description:'Oui. Nous accompagnons aussi bien les particuliers, entrepreneurs, startups, associations que les entreprises dans la réalisation de leurs projets.',active:true},
 {id:6,name:'Peut-on personnaliser la prestation selon nos besoins ?',description:'Oui. Chaque projet est étudié individuellement afin de proposer une solution correspondant réellement aux besoins, aux objectifs et au budget du client.',active:true},
 {id:7,name:'Comment se déroule une collaboration ?',description:'La collaboration se déroule généralement en plusieurs étapes : échange sur le besoin, analyse du projet, proposition/devis, validation, réalisation, présentation du résultat puis corrections ou ajustements si nécessaire.',active:true},
 {id:8,name:'Comment vous contacter rapidement ?',description:'Vous pouvez nous contacter directement via WhatsApp, téléphone, e-mail ou le formulaire de contact disponible sur le site. Nous vous répondrons dans les meilleurs délais.',active:true},
],
partners:[
 {id:1,name:'Maryx',description:'Partenaire',logoUrl:maryxLogo,active:true},
 {id:2,name:'Aworix',description:'Partenaire',logoUrl:aworixLogo,active:true},
]}
