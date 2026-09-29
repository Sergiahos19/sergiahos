import { api } from '../services/api'
import { useAsync } from '../hooks/useAsync'
import { Async, Empty } from '../components/ui'
import type { Item } from '../types'
export function UserHome(){const r=useAsync(()=>api.list<Item>('requests'),[])
 return<div><h1 className="mb-4 text-2xl font-bold">Mes demandes</h1><Async loading={r.loading} error={r.error}>{r.data?.length?<ul className="space-y-2">{r.data.map(x=><li key={x.id} className="card flex justify-between"><span>{x.name}</span><span className="rounded bg-sky-light px-2 text-sm">{x.description}</span></li>)}</ul>:<Empty>Aucune demande pour le moment.</Empty>}</Async></div>}
export const Notifications=()=><div><h1 className="mb-4 text-2xl font-bold">Notifications</h1><Empty>Aucune notification (démo).</Empty></div>
