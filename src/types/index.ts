export interface Item{id:number;name:string;description:string;active:boolean;[k:string]:any}
export type Resource='skills'|'services'|'projects'|'faqs'|'requests'|'messages'|'users'|'partners'
export interface Partner extends Item { logoUrl:string }
export interface SeoResult{score:number;critical:string[];warnings:string[];good:string[]}
