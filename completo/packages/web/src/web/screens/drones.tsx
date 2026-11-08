import { useState } from 'react';
import { useGame } from '@/game/save';
import { drones } from '../drones-data';
import { droneCost,droneOreCost,droneEffect } from '@/game/drone-system';
import { upgradeDrone,toggleDrone } from '@/game/drone-actions';
import { TopBar } from './roster';
export function DroneScreen({onBack}:{onBack:()=>void}) {
 const g=useGame();const [search,setSearch]=useState('');const [message,setMessage]=useState('');
 const owned=g.robots.filter(r=>drones[r.id]&&`${drones[r.id].name} ${drones[r.id].ownerName}`.toLowerCase().includes(search.toLowerCase()));
 return <div className="mc-drone-screen"><TopBar title="DRONES DE VÍNCULO" gold={g.gold} onBack={onBack}/><div className="mk-scroll mc-drone-body">
 <header><span>HANGAR DE SUPORTE · NV 3</span><h2>Um vínculo.<br/>Mais possibilidades.</h2><p>291 projetos exclusivos. Construa o drone do seu chassi e evolua até o nível 10. Sem slots extras na equipe e sem vantagem no PvP.</p><small>FERRO DISPONÍVEL: {g.mining.ores.ferro??0} · CONSTRUÍDOS: {Object.keys(g.drones.levels).length}</small></header>
 <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar dono ou drone" aria-label="Buscar drone"/>
 <p role="status">{message}</p>
 {owned.length===0&&<p>Nenhum chassi fixo disponível nesta busca. Recrute robôs para abrir seus projetos.</p>}
 {owned.map(r=>{const d=drones[r.id],level=g.drones.levels[r.id]??0,active=level>0&&g.drones.enabled[r.id]!==false,cost=droneCost(level),iron=droneOreCost(level);return <article key={r.id} className="mc-drone-card"><div className="mc-drone-art"><img src={`/drones/${r.id}_drone.png?v=3`} alt={d.name}/><img className="mc-drone-owner" src={`/portraits/${r.id}_face.png?v=3`} alt={d.ownerName}/></div><span>{d.role} · {d.ownerName}</span><h3>{d.name}</h3><small>{level?`NÍVEL ${level}/10 · ${active?'ATIVO':'DESATIVADO'}`:'PROJETO DISPONÍVEL'}</small><p>{droneEffect(r.id,Math.max(1,level))}</p><div className="mc-drone-buttons"><button disabled={level>=10||g.gold<cost||(g.mining.ores.ferro??0)<iron} onClick={()=>setMessage(upgradeDrone(r.id)?`${d.ownerName}: drone ${level?'melhorado':'construído'}.`:'Recursos insuficientes.')}>
 {level>=10?'NÍVEL MÁXIMO':`${level?'EVOLUIR':'CONSTRUIR'} · ${cost}g${iron?` + ${iron} ferro`:''}`}</button>{level>0&&<button aria-pressed={active} onClick={()=>toggleDrone(r.id)}>{active?'DESATIVAR':'ATIVAR'}</button>}</div></article>})}
 <a href="/galeria">Ver os 291 projetos e baixar PNGs →</a></div></div>;
}