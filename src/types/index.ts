export interface Item{id:number;name:string;description:string;active:boolean;[k:string]:any}
export type Resource='services'|'projects'|'faqs'|'partners'
export interface Partner extends Item { logoUrl:string }
export interface Project extends Item { image:string; published?:boolean }
export interface SeoResult{exists:boolean;message?:string;score?:number;critical?:string[];warnings?:string[];good?:string[]}
