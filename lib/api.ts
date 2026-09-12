const REMOTE_API = process.env.NEXT_PUBLIC_API_MODE === 'remote' ? process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') : undefined;

export type Summary={electricityKwh:number;waterLiters:number;wasteKg:number;costInr:number;co2Kg:number;sustainabilityScore:number;records:number};
export type Point={date:string;electricity:number;water:number;waste:number;cost:number;co2:number};
export type Building={id:number;name:string;occupancy:number;electricityKwh:number;waterLiters:number;wasteKg:number;co2Kg:number;score:number};
export type Alert={id:number;type:string;severity:string;message:string;status:string;createdAt:string;building:string};

type DemoResponse=Summary|Point[]|Building[]|Alert[]|{token:string;email:string;role:string}|{received:number;imported:number;duplicates:number;invalid:number};

const demoPoints:Point[]=Array.from({length:14},(_,i)=>{const d=new Date(Date.now()-((13-i)*86400000));const date=d.toISOString().slice(0,10);const wave=Math.sin(i/2.2)*90;return {date,electricity:920+Math.round(wave)+i*7,water:12800+Math.round(Math.cos(i/2.5)*520),waste:112+Math.round(Math.sin(i/1.8)*15),cost:11800+Math.round(wave*8),co2:420+Math.round(wave/2)}});
const demoBuildings:Building[]=[{id:1,name:'HQ North',occupancy:420,electricityKwh:42180,waterLiters:186400,wasteKg:940,co2Kg:19300,score:91},{id:2,name:'Innovation Lab',occupancy:210,electricityKwh:28740,waterLiters:112900,wasteKg:610,co2Kg:13200,score:84},{id:3,name:'Operations',occupancy:355,electricityKwh:46320,waterLiters:208700,wasteKg:1180,co2Kg:21400,score:76},{id:4,name:'Warehouse',occupancy:150,electricityKwh:19480,waterLiters:63400,wasteKg:820,co2Kg:9100,score:69}];
const demoAlerts:Alert[]=[{id:1,type:'electricity',severity:'HIGH',message:'Operations recorded a 42% electricity spike against its 30-day baseline.',status:'OPEN',createdAt:new Date(Date.now()-86400000).toISOString(),building:'Operations'},{id:2,type:'water',severity:'MEDIUM',message:'HQ North water consumption is trending 18% above the weekly target.',status:'OPEN',createdAt:new Date(Date.now()-2*86400000).toISOString(),building:'HQ North'},{id:3,type:'waste',severity:'MEDIUM',message:'Warehouse waste volume crossed the configured diversion threshold.',status:'OPEN',createdAt:new Date(Date.now()-4*86400000).toISOString(),building:'Warehouse'}];
const demoSummary:Summary={electricityKwh:136720,waterLiters:571400,wasteKg:3550,costInr:384260,co2Kg:63000,sustainabilityScore:82,records:1842};

function demo<T extends DemoResponse>(path:string,options:RequestInit):Promise<T>{
 if(path==='/auth/login'){let body:{email?:string;password?:string}={};try{body=JSON.parse(String(options.body||'{}'))}catch{}if(body.email!=='demo@ecopulse.local'||body.password!=='password')return Promise.reject(new Error('Invalid demo credentials. Use demo@ecopulse.local / password'));return Promise.resolve({token:'demo-session-token',email:body.email,role:'ADMIN'} as T)}
 if(path==='/dashboard')return Promise.resolve(demoSummary as T);if(path==='/analytics/trends')return Promise.resolve(demoPoints as T);if(path==='/analytics/buildings')return Promise.resolve(demoBuildings as T);if(path==='/anomalies')return Promise.resolve(demoAlerts as T);
 if(path==='/consumption/import'){const form=options.body instanceof FormData?options.body:null;const file=form?.get('file');if(!(file instanceof File))return Promise.reject(new Error('Please choose a CSV file first.'));return file.text().then(text=>{const rows=Math.max(0,text.split(/\r?\n/).filter(Boolean).length-1);const imported=Math.min(rows,Math.max(0,rows-2));return {received:rows,imported,duplicates:Math.max(0,rows-imported-1),invalid:rows>0?1:0} as T})}
 return Promise.reject(new Error('Demo API route not implemented: '+path));
}

export async function api<T>(path:string,options:RequestInit={}):Promise<T>{
 if(!REMOTE_API){if(typeof window==='undefined')throw new Error('EcoPulse demo API is available in the browser only.');return demo<T>(path,options)}
 const token=typeof window!=='undefined'?localStorage.getItem('ecopulse_token'):null;const headers=new Headers(options.headers);if(!(options.body instanceof FormData))headers.set('Content-Type','application/json');if(token)headers.set('Authorization',`Bearer ${token}`);const response=await fetch(`${REMOTE_API}${path}`,{...options,headers,cache:'no-store'});if(!response.ok){let message='Request failed';try{message=(await response.json()).message||message}catch{}throw new Error(message)}return response.json() as Promise<T>;
}
