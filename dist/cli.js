import{n,a,ke,Ge,E,Ze,He,l,i,We,R,P,we,Qe,f,Ue,u,o,w,s,D,r,h,ce,j,tt,nt,c,de,ue,rt,O,K,re,S,ot,_,b,pe,A,d,G,Be,ze,N,x,T,fe,me,Re,it,m,e,Pe,Se,Ve,qe,oe,xe,ie,_e,Y,H,Ae,ge,W,Ke,U,J,Z,se,Ye,Je,g,B,Te,De,Oe,L,Ne,Le,Me,y,t,X,he,v,C,k,st,$e,Fe,p,z}from"./chunks/index-knrf0x7q.js";import{ee,V,je,M,F}from"./chunks/index-124rx1ap.js";var Zd=["-h","--help"];function xt(I,q){let Q=Object.entries(I.booleans??{}),te=Object.entries(I.values??{}),ne=Object.entries(I.lists??{}),ae=Object.fromEntries(Q.map(([Ie])=>[Ie,!1])),le={},ye=Object.fromEntries(ne.map(([Ie])=>[Ie,[]])),ve=[],be=[],Ce=!1,Ee=-1;for(let[Ie,et]of q.entries()){if(Ie<=Ee)continue;if(et==="--"){ve.push(...q.slice(Ie+1));break}if(Zd.includes(et)){Ce=!0;continue}let Xe=Q.find(([,lt])=>lt.includes(et));if(Xe){ae[Xe[0]]=!0;continue}let at=te.find(([,lt])=>lt.includes(et));if(at){let lt=q[Ie+1];if(lt===void 0||lt.startsWith("-")){be.push(`${et} requires a value`);continue}le[at[0]]=lt,Ee=Ie+1;continue}let ct=ne.find(([,lt])=>lt.includes(et));if(ct){let lt=q.slice(Ie+1),ft=lt.findIndex((gt)=>gt.startsWith("-")),dt=lt.slice(0,ft===-1?lt.length:ft);if(dt.length===0){be.push(`${et} requires at least one value`);continue}ye[ct[0]]=[...ye[ct[0]]??[],...dt],Ee=Ie+dt.length;continue}if(et.startsWith("-")){be.push(`Unknown option for ${I.label}: ${et}`);continue}if(I.positionals==="tail"){ve.push(...q.slice(Ie));break}ve.push(et)}if(I.positionals!=="list"&&I.positionals!=="tail")be.push(...ve.map((Ie)=>`Unexpected argument for ${I.label}: ${Ie}`));return{flags:ae,values:le,lists:ye,positionals:ve,help:Ce,errors:be}}function qt(I){for(let q of I)console.error(q);return I.length>0}import{readdirSync as ou,statSync as Ji,unlinkSync as iu}from"node:fs";import{basename as Wi,dirname as su,isAbsolute as au,join as lu,relative as cu,resolve as du,sep as uu}from"node:path";var qi=(I)=>{let q=Date.now()-new Date(I).getTime();if(!Number.isFinite(q))return"";let Q=Math.floor(q/60000),te=Math.floor(Q/60),ne=Math.floor(te/24);if(ne>0)return`${ne}d ago`;if(te>0)return`${te}h ago`;if(Q>0)return`${Q}m ago`;return"just now"},oo=(I)=>{let q=(I??"").trim().split(/\s+/).filter((ne)=>ne&&!/^[A-Za-z_][A-Za-z0-9_]*=/.test(ne)),Q=q[0]?.split("/").pop();if(!Q)return null;let te=q[1];return te&&/^[a-z][a-z0-9-]*$/.test(te)?`${Q} ${te}`:Q};function Vi(I){let q=(ne)=>`${ne.sessionId}
${oo(ne.segment||ne.command)}`,Q=I.filter((ne)=>ne.decision!=="allow"),te=Q.filter((ne)=>ne.sessionId).reduce((ne,ae)=>ne.set(q(ae),(ne.get(q(ae))??0)+1),new Map);return new Set(Q.filter((ne)=>ne.failureStage||(te.get(q(ne))??0)>=2))}import{existsSync as Xd,readdirSync as Qd,readFileSync as eu}from"node:fs";import{join as tu}from"node:path";function Qt(I,q){try{return Qd(I,{withFileTypes:!0,encoding:"utf8"}).flatMap((Q)=>{let te=tu(I,Q.name);if(Q.isDirectory())return Qt(te,q);if(Q.name.endsWith(".jsonl"))return[te];return[]})}catch{if(q&&Xd(I))q.count++;return[]}}var nu=["segment","reason","sessionId","decision","agent","ruleId","failureStage"];function ru(I){if(!I||typeof I!=="object"||Array.isArray(I))return!1;let q=I;if(typeof q.ts!=="string"||typeof q.command!=="string")return!1;return nu.every((Q)=>q[Q]===void 0||typeof q[Q]==="string")}function fn(I,q){try{return eu(I,"utf-8").split(`
`).filter(Boolean).flatMap((Q)=>{try{let te=JSON.parse(Q);if(!ru(te)){if(q)q.count++;return[]}return[te]}catch{if(q)q.count++;return[]}})}catch{if(q)q.count++;return[]}}function Ct(I){return Array.from(I,(q)=>{let Q=q.charCodeAt(0);if(Q<=31||Q>=127&&Q<=159)return`\\x${Q.toString(16).padStart(2,"0")}`;return q}).join("")}function pu(I,q){let Q=ee(I),te=xt({label:"logs",booleans:{all:["--all"],suspect:["--suspect"],json:["--json"],pruneLegacy:["--prune-legacy"],dryRun:["--dry-run"]},values:{id:["--id"],limit:["--limit"],since:["--since"],agent:["--agent"],rule:["--rule"],session:["--session"],project:["--project"]}},q);if(qt(te.errors))return null;if(te.values.id!==void 0&&!/^[a-f0-9]{16}$/.test(te.values.id))return console.error("--id must be 16 hexadecimal characters"),null;let ne=te.values.limit===void 0?20:zi(te.values.limit);if(ne===null)return console.error("--limit must be a positive number"),null;let ae=te.values.since===void 0?Math.min(30,Q):zi(te.values.since);if(ae===null||ae>Q)return console.error(`--since must be a positive number of days no greater than ${Q}`),null;let le={limit:ne,limitExplicit:te.values.limit!==void 0,since:ae,sinceExplicit:te.values.since!==void 0,all:te.flags.all,json:te.flags.json,suspect:te.flags.suspect,pruneLegacy:te.flags.pruneLegacy,dryRun:te.flags.dryRun,id:te.values.id,agent:te.values.agent,rule:te.values.rule,session:te.values.session,project:te.values.project===void 0?void 0:du(te.values.project)};if(le.id&&(le.agent!==void 0||le.rule!==void 0||le.session!==void 0||le.project!==void 0||le.suspect||le.sinceExplicit||le.limitExplicit))return console.error("--id cannot be combined with --agent, --rule, --session, --project, --suspect, --since, or --limit"),null;if(le.pruneLegacy&&(le.id!==void 0||le.agent!==void 0||le.rule!==void 0||le.session!==void 0||le.project!==void 0||le.suspect||le.all||le.sinceExplicit||le.limitExplicit))return console.error("--prune-legacy cannot be combined with --id, --agent, --rule, --session, --project, --suspect, --all, --since, or --limit"),null;if(le.dryRun&&!le.pruneLegacy)return console.error("--dry-run requires --prune-legacy"),null;return le}async function Ki(I,q,Q={}){let te=pu(I,q);if(!te)return 1;let ne=Q.logsDir??M(I);if(te.pruneLegacy)return fu(ne,te.json,te.dryRun);if(!ne)return console.log(te.json?"[]":te.id?`No retained audit log entry found for id ${Ct(te.id)}.`:"No audit log entries found."),0;V(I,ne);let ae={count:0},le=Qt(ne,ae).flatMap((Ee)=>fn(Ee,ae).map((Ie)=>({entry:Ie,file:Ee})));if(ae.count>0)console.error(`warning: ${ae.count} audit log ${ae.count===1?"source":"sources"} could not be read; these results are incomplete`);if(te.id)return hu(le,te,Q.timeZone);let ye=Date.now()-te.since*24*60*60*1000,ve=le.filter((Ee)=>vu(Ee,te,ne,ye)),be=te.suspect?Vi(ve.map((Ee)=>Ee.entry)):null,Ce=(be?ve.filter((Ee)=>be.has(Ee.entry)):ve).sort((Ee,Ie)=>Date.parse(Ie.entry.ts)-Date.parse(Ee.entry.ts)).slice(0,te.limit);if(te.json)return console.log(JSON.stringify(Ce.map((Ee)=>Ee.entry),null,2)),0;if(Ce.length===0)return console.log("No audit log entries found."),0;for(let Ee of Ce)console.log(wu(Ee.entry,Q.timeZone));return 0}function fu(I,q,Q){let te=I?gu(I).map((ye)=>lu(I,ye)):[];if(Q)return mu(te,q);let ne=[],ae=0,le=0;for(let ye of te){let ve=Ji(ye,{throwIfNoEntry:!1})?.size??0,be=yu(ye);if(be){ne.push(`${Wi(ye)}: ${be}`);continue}ae++,le+=ve}if(q)return console.log(JSON.stringify({removedFiles:ae,removedBytes:le,failedFiles:ne.length})),ne.length===0?0:1;console.log(ae===0&&ne.length===0?"No legacy audit log files found.":`Removed ${ae} legacy audit log ${ae===1?"file":"files"} (${Yi(le)}).`);for(let ye of ne)console.error(`Could not remove ${Ct(ye)}`);if(console.log("Nested v2 audit logs were not changed."),ae>0)console.log("This deletion cannot be undone.");return ne.length===0?0:1}function mu(I,q){let Q=I.reduce((te,ne)=>te+(Ji(ne,{throwIfNoEntry:!1})?.size??0),0);if(q)return console.log(JSON.stringify({dryRun:!0,files:I.length,bytes:Q})),0;if(console.log(I.length===0?"No legacy audit log files found.":`Would remove ${I.length} legacy audit log ${I.length===1?"file":"files"} (${Yi(Q)}).`),console.log("Nested v2 audit logs are not included."),I.length>0)console.log("Run the same command without --dry-run to delete them.");return 0}function gu(I){try{return ou(I,{withFileTypes:!0}).filter((q)=>q.isFile()&&q.name.endsWith(".jsonl")).map((q)=>q.name)}catch{return[]}}function yu(I){try{return iu(I),null}catch(q){return q instanceof Error?q.message:String(q)}}function Yi(I){let q=["B","KiB","MiB","GiB"],Q=Math.min(Math.floor(Math.log2(Math.max(I,1))/10),q.length-1);return`${Math.round(I/1024**Q*10)/10} ${q[Q]}`}function hu(I,q,Q){let te=I.filter((ae)=>ae.entry.id===q.id);if(te.length>1)return console.error(`Multiple audit log entries found for id ${Ct(q.id??"")}.`),1;if(q.json)return console.log(JSON.stringify(te.map((ae)=>ae.entry),null,2)),0;let ne=te[0];if(!ne)return console.log(`No retained audit log entry found for id ${Ct(q.id??"")}.`),0;return console.log(ku(ne.entry,Q)),0}function vu(I,q,Q,te){if(!q.all&&I.entry.decision==="allow")return!1;if(Date.parse(I.entry.ts)<te)return!1;if(q.agent!==void 0&&I.entry.agent!==q.agent)return!1;if(q.rule!==void 0&&I.entry.ruleId!==q.rule)return!1;if(q.session!==void 0&&!bu(I,Q,q.session))return!1;if(q.project!==void 0&&!Lu(I.entry.cwd,q.project))return!1;return!0}function bu(I,q,Q){if(I.entry.sessionId===Q)return!0;return su(I.file)===q&&Wi(I.file,".jsonl")===Q}function Lu(I,q){if(!I)return!1;let Q=cu(q,I);return Q!==".."&&!Q.startsWith(`..${uu}`)&&!au(Q)}function wu(I,q){let Q=Ct(I.id??"-"),te=Ct(I.decision??"deny"),ne=I.cwd?`  [${Ct(I.cwd)}]`:"",ae=I.segment||I.command,le=ae===I.command?"":"↳ ",ye=ae.length>50?`${ae.slice(0,50)}…`:ae;return`${Q.padEnd(16)}  ${Ct(Zi(I.ts,q))}  ${te.padEnd(5)}  ${Ct(I.agent??"-").padEnd(15)}  ${Ct(I.ruleId??"-").padEnd(20)}  ${le}${Ct(ye)}${ne}`}function ku(I,q){let Q=(ne)=>Ct(ne===void 0||ne===null||ne===""?"-":ne),te=I.shape?`${I.agent??"-"} (shape: ${I.shape})`:I.agent??"-";return[`id:        ${Q(I.id)}`,`ts:        ${Q(Zi(I.ts,q))}`,`decision:  ${Q(I.decision)}`,`agent:     ${Q(te)}`,`level:     ${Q(I.level)}`,`tool:      ${Q(I.toolName)}`,`rule:      ${Q(I.ruleId)}`,`intent:    ${Q(I.intent)}`,`stage:     ${Q(I.failureStage)}`,`error:     ${Q(I.errorCode)}`,`session:   ${Q(I.sessionId)}`,`cwd:       ${Q(I.cwd)}`,`version:   ${Q(I.v)}`,`truncated: ${Q(I.truncated===!0?"yes":void 0)}`,`reason:    ${Q(I.reason)}`,`command:   ${Q(I.command)}`,`segment:   ${Q(I.segment)}`].join(`
`)}function Zi(I,q){let Q=new Date(I);if(Number.isNaN(Q.getTime()))return I;return new Intl.DateTimeFormat("sv-SE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23",timeZone:q}).format(Q)}function zi(I){let q=Number(I);return Number.isFinite(q)&&q>0?q:null}var Xi={name:"doctor",aliases:["--doctor"],description:"Run diagnostic checks to verify installation and configuration",usage:"doctor [options]",options:[{flags:"--json",description:"Output diagnostics as JSON"},{flags:"--skip-update-check",description:"Skip npm registry version check"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net doctor","cc-safety-net doctor --json","cc-safety-net doctor --skip-update-check"]};var Qi={name:"explain",description:"Show step-by-step analysis trace of how a command would be analyzed",usage:"explain [options] <command>",argument:"<command>",options:[{flags:"--json",description:"Output analysis as JSON"},{flags:"--cwd",argument:"<path>",description:"Use custom working directory"},{flags:"-h, --help",description:"Show this help"}],examples:['cc-safety-net explain "git reset --hard"','cc-safety-net explain --json "rm -rf /"','cc-safety-net explain --cwd /tmp "git status"']};var es={name:"gui",description:"Open the local policy editor GUI",usage:"gui [options]",options:[{flags:"--no-open",description:"Print the URL without opening a browser"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net gui","cc-safety-net gui --no-open"]};var En=[{id:"antigravity-cli",displayName:"Antigravity CLI",doctorOrder:3,runtime:{order:1,flags:["-ac","--agy-cli"],description:"Run as Antigravity CLI PreToolUse hook",legacyTopLevelFlags:[]},install:{order:2,flag:"--agy-cli",artifactKind:"hook config",probeCommand:["agy","--version"]}},{id:"claude-code",displayName:"Claude Code",doctorOrder:1,runtime:{order:2,displayName:"Coding CLI",flags:["-cc","--coding-cli"],legacyFlags:["--claude-code"],description:"Run as Coding CLI PreToolUse hook",legacyTopLevelFlags:["-cc","--claude-code"]},install:{order:3,flag:"--claude-code",artifactKind:"plugin",probeCommand:["claude","--version"]}},{id:"codex",displayName:"Codex",doctorOrder:4,runtime:{order:3,flags:["-cx","--codex"],description:"Run as a Codex PreToolUse hook",legacyTopLevelFlags:[]},install:{order:4,flag:"--codex",artifactKind:"plugin",probeCommand:["codex","--version"]}},{id:"copilot-cli",displayName:"GitHub Copilot CLI",doctorOrder:7,runtime:{order:6,flags:["-cp","--copilot-cli"],description:"Run as GitHub Copilot CLI PreToolUse hook",legacyTopLevelFlags:["-cp","--copilot-cli"]},install:{order:7,flag:"--copilot-cli",artifactKind:"plugin",probeCommand:["copilot","--binary-version"]}},{id:"gemini-cli",displayName:"Gemini CLI",doctorOrder:6,runtime:{order:5,flags:["-gc","--gemini-cli"],description:"Run as Gemini CLI BeforeTool hook",legacyTopLevelFlags:["-gc","--gemini-cli"]},install:{order:6,flag:"--gemini-cli",artifactKind:"extension",probeCommand:["gemini","--version"]}},{id:"grok-build",displayName:"Grok Build",doctorOrder:8,runtime:{order:7,flags:["-gb","--grok-build"],description:"Run as Grok Build PreToolUse hook",legacyTopLevelFlags:[]},install:{order:8,flag:"--grok-build",artifactKind:"hook config",probeCommand:["grok","--version"]}},{id:"hermes-agent",displayName:"Hermes Agent",doctorOrder:9,runtime:{order:8,flags:["-ha","--hermes-agent"],description:"Run as Hermes Agent pre_tool_call hook",legacyTopLevelFlags:[]},install:{order:9,flag:"--hermes-agent",artifactKind:"plugin",probeCommand:["hermes","--version"]}},{id:"kimi-code",displayName:"Kimi Code",doctorOrder:10,runtime:{order:9,flags:["-kc","--kimi-code"],description:"Run as Kimi Code PreToolUse hook",legacyTopLevelFlags:[]},install:{order:10,flag:"--kimi-code",artifactKind:"hook config",probeCommand:["kimi","--version"]}},{id:"openclaw",displayName:"OpenClaw",doctorOrder:11,install:{order:11,flag:"--openclaw",artifactKind:"plugin",probeCommand:["openclaw","--version"]}},{id:"opencode",displayName:"OpenCode",doctorOrder:12,install:{order:12,flag:"--opencode",artifactKind:"plugin",probeCommand:["opencode","--version"]}},{id:"pi",displayName:"Pi",doctorOrder:13,install:{order:13,flag:"--pi",artifactKind:"package",probeCommand:["pi","--version"]}},{id:"cursor",displayName:"Cursor",doctorOrder:5,runtime:{order:4,flags:["-cu","--cursor"],description:"Run as Cursor preToolUse hook",legacyTopLevelFlags:[]},install:{order:5,flag:"--cursor",artifactKind:"hook config",probeCommand:["cursor","--version"]}},{id:"amp",displayName:"Amp Code",doctorOrder:2,install:{order:1,flag:"--amp",artifactKind:"plugin",probeCommand:["amp","--version"]}},{id:"goose",displayName:"Goose",doctorOrder:14,runtime:{order:10,flags:["-go","--goose"],description:"Run as Goose PreToolUse hook",legacyTopLevelFlags:[]},install:{order:14,flag:"--goose",artifactKind:"hook config",probeCommand:["goose","--version"]}}],er=En.slice().sort((I,q)=>I.doctorOrder-q.doctorOrder).map((I)=>I.id),Dn=En.filter((I)=>("runtime"in I)).slice().sort((I,q)=>I.runtime.order-q.runtime.order).map((I)=>({id:I.id,displayName:"displayName"in I.runtime?I.runtime.displayName:I.displayName,flags:I.runtime.flags,legacyFlags:"legacyFlags"in I.runtime?I.runtime.legacyFlags:[],description:I.runtime.description,legacyTopLevelFlags:I.runtime.legacyTopLevelFlags})),It=En.slice().sort((I,q)=>I.install.order-q.install.order).map((I)=>({id:I.id,...I.install})).map(({order:I,...q})=>q),Qh=Object.fromEntries(En.map((I)=>[I.id,I.displayName]));function ht(I){return En.find((q)=>q.id===I)?.displayName??I}var xu=Dn.map((I)=>({flags:I.flags.join(", "),description:I.description})),Cu=Dn.flatMap((I)=>I.flags.map((q)=>`cc-safety-net hook ${q}`)),ts={name:"hook",description:"Run as an agent CLI hook (reads JSON from stdin)",usage:"hook INTEGRATION_FLAG",options:[...xu,{flags:"-h, --help",description:"Show this help"}],examples:Cu};var ns={name:"install",description:"Install CC Safety Net into a coding agent CLI",usage:"install [TARGET_FLAG]",options:[...It.map((I)=>({flags:I.flag,description:`Install ${ht(I.id)} ${I.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net install",...It.map((I)=>`cc-safety-net install ${I.flag}`)]},rs={name:"uninstall",description:"Uninstall CC Safety Net from a coding agent CLI",usage:"uninstall [TARGET_FLAG]",options:[...It.map((I)=>({flags:I.flag,description:`Uninstall ${ht(I.id)} ${I.artifactKind}`})),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net uninstall",...It.map((I)=>`cc-safety-net uninstall ${I.flag}`)]},os={name:"update",description:"Update every installed CC Safety Net integration to the latest version",usage:"update",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net update"]};var is={name:"logs",description:"Browse audit log entries recorded by hooks",usage:"logs [options]",options:[{flags:"--id",argument:"<id>",description:"Show one entry from retained history by its 16-character id (not guaranteed once it is older than the configured retention)"},{flags:"--limit",argument:"<n>",description:"Maximum entries to print",default:"20"},{flags:"--since",argument:"<days>",description:"Only include entries newer than this many days (max: the configured audit retention, 1-365)",default:"30"},{flags:"--agent",argument:"<name>",description:"Filter by agent name"},{flags:"--rule",argument:"<ruleId>",description:"Filter by rule id"},{flags:"--session",argument:"<id>",description:"Filter by session id"},{flags:"--project",argument:"<path>",description:"Filter by project path"},{flags:"--suspect",description:"Only denials that look like false positives"},{flags:"--all",description:"Include allow entries"},{flags:"--prune-legacy",description:"Permanently delete all legacy root-level logs; nested logs are untouched"},{flags:"--dry-run",description:"With --prune-legacy, report what would be deleted and delete nothing"},{flags:"--json",description:"Output entries as JSON"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net logs --id 3fa9c2d1a70e8b42","cc-safety-net logs --agent claude-code","cc-safety-net logs --project . --since 7","cc-safety-net logs --suspect --since 7","cc-safety-net logs --json","cc-safety-net logs --prune-legacy --dry-run","cc-safety-net logs --prune-legacy"]};var tr={name:"policy",description:"Check and apply project or user policy proposals",usage:"policy <subcommand>",subcommands:[{usage:"check <file>",description:"Validate a policy proposal and print its diff"},{usage:"apply <file>",description:"Apply a proposal after confirming in a terminal"}],options:[{flags:"-g, --global",description:"Use the user-scope policy instead of the project one"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net policy check proposal.json","cc-safety-net policy apply proposal.json","cc-safety-net policy apply proposal.json --global"]};var io=[{flags:"--ref",argument:"<ref>",description:"Use a branch, tag, or commit"},{flags:"--only",argument:"<rulebook...>",description:"Add only these repository rulebooks"},{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"-h, --help",description:"Show this help"}],so=["cc-safety-net rule add project-rules","cc-safety-net rule add acme/safety-rules","cc-safety-net rule add acme/safety-rules --only aws gcloud","cc-safety-net rule add acme/safety-rules --ref v2 --only aws","cc-safety-net rule add --only terraform aws"],mn={name:"rule",description:"Manage CC Safety Net rule config and rulebook sources",usage:"rule <subcommand>",subcommands:[{usage:"init [--example]",description:"Create inert rule config"},{usage:"add [source] [--ref <ref>] [--only <rulebook...>]",description:"Add rulebook sources and sync"},{usage:"remove <source>",description:"Remove a rulebook source and sync"},{usage:"update [source]",description:"Re-fetch and vendor remote rulebooks"},{usage:"sync",description:"Deprecated: migrate lock and cache leftovers"},{usage:"list",description:"List active rulebooks"},{usage:"wrapper add <command>",description:"Trust a transparent command wrapper"},{usage:"wrapper remove <command>",description:"Remove a transparent command wrapper"},{usage:"wrapper list",description:"List transparent command wrappers"},{usage:"migrate [--cleanup]",description:"Migrate legacy inline rules"},{usage:"doc",description:"Print the rulebook authoring guide"},{usage:"verify",description:"Validate rule config files"}],options:[{flags:"-g, --global",description:"Use user-scope rule config"},{flags:"--cleanup",description:"Delete legacy files after rule migrate verifies them"},{flags:"--delete-source",description:"Delete clean local source directory on remove"},{flags:"--example",description:"Create an inactive example rulebook with rule init"},...io.slice(0,2),{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net rule init","cc-safety-net rule init --example","cc-safety-net rule wrapper add rtk",...so,"cc-safety-net rule update","cc-safety-net rule migrate --cleanup","cc-safety-net rule verify"]};var ss={name:"status",description:"Show what the runtime is enforcing right now",usage:"status",options:[{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net status"]};var as={name:"statusline",description:"Print status line with mode indicators for shell integration",usage:"statusline --claude-code",options:[{flags:"-cc, --claude-code",description:"Print status line for Claude Code"},{flags:"-h, --help",description:"Show this help"}],examples:["cc-safety-net statusline -cc","cc-safety-net statusline --claude-code"]};var nr=[ss,Xi,is,Qi,mn,tr,ns,os,rs,ts,es,as];function Su(I){return I.aliases??[]}function rr(I){let q=I.toLowerCase();return nr.find((Q)=>Q.name.toLowerCase()===q||Su(Q).some((te)=>te.toLowerCase()===q))}import{basename as Ru}from"node:path";function or(I,q=7,Q=M(I)){let te=Date.now()-q*24*60*60*1000,ne=[],ae=new Set,le=0,ye,ve,be,Ce;if(Q)V(I,Q);let Ee={count:0},Ie=Q?Qt(Q,Ee):[];for(let Xe of Ie)for(let at of fn(Xe,Ee)){if(at.decision==="allow")continue;let ct=new Date(at.ts).getTime();if(ct>=te){if(le++,ae.add(at.sessionId??Ru(Xe,".jsonl")),ve===void 0||ct<=ve)ye=at.ts,ve=ct;if(Ce===void 0||ct>Ce)be=at.ts,Ce=ct;Pu(ne,at,ct)}}let et=ne.map((Xe)=>({timestamp:Xe.ts,command:Xe.command,reason:Xe.reason,relativeTime:qi(new Date(Xe.ts))}));return{totalBlocked:le,sessionCount:ae.size,recentEntries:et,oldestEntry:ye,newestEntry:be,unreadable:Ee.count}}function Pu(I,q,Q){let te=I.findIndex((ne)=>Q>new Date(ne.ts).getTime());if(te===-1){if(I.length<3)I.push(q);return}if(I.splice(te,0,q),I.length>3)I.pop()}import{dirname as Mu}from"node:path";import{dirname as Eu,join as Du,resolve as Au}from"node:path";var _u="config.json";function Rt(I,q,Q,te){h(Tu(I),`${JSON.stringify(q,null,2)}
`,Q,te)}function Tu(I){return typeof I==="string"?D(I):I}function lo(I){return{errors:oe(Iu(I),": "," "),ruleNames:new Set(_e(I).map((q)=>q.toLowerCase()))}}var $u="must match pattern (letters, numbers, hyphens, underscores; max 64 chars)",ls="must match pattern (letters, numbers, hyphens, underscores)";function Iu(I){if(!cs(I))return[e([],"Config must be an object")];return[...I.version===1?[]:[e(["version"],"must be 1")],...Ou(I.rules)]}function Ou(I){if(I===void 0)return[];if(!Array.isArray(I))return[e(["rules"],"must be an array")];return[...I.flatMap((q,Q)=>cs(q)?Fu(q,["rules",Q]):[e(["rules",Q],"must be an object")]),...Pe(I)]}function Fu(I,q){return[...ao(I.name,[...q,"name"],"required string",c,$u),...ao(I.command,[...q,"command"],"required string",x,ls),...I.subcommand===void 0?[]:ao(I.subcommand,[...q,"subcommand"],"must be a string if provided",x,ls),...ju(I.block_args,[...q,"block_args"]),...Nu(I.reason,[...q,"reason"]),...I.intent===void 0||xe(I.intent)?[]:[e([...q,"intent"],Se)]]}function ao(I,q,Q,te,ne){if(typeof I!=="string")return[e(q,Q)];return te.test(I)?[]:[e(q,ne)]}function ju(I,q){if(!Array.isArray(I))return[e(q,"required array")];if(I.length===0)return[e(q,"must have at least one element")];return I.flatMap((Q,te)=>{if(typeof Q!=="string")return[e([...q,te],"must be a string")];return Q===""?[e([...q,te],"must not be empty")]:[]})}function Nu(I,q){if(typeof I!=="string")return[e(q,"required string")];if(I==="")return[e(q,"must not be empty")];return I.length>T?[e(q,`must be at most ${T} characters`)]:[]}function cs(I){return!!I&&typeof I==="object"&&!Array.isArray(I)}function co(I){let q=ds(I);if(!q.ok)return q.result;return lo(q.parsed)}function ds(I){let q=[],Q=new Set;try{let te=typeof I==="string"?D(I):I,ne=r(te);if(ne===null)return q.push(`File not found: ${te.path}`),{ok:!1,result:{errors:q,ruleNames:Q}};if(!ne.trim())return q.push("Config file is empty"),{ok:!1,result:{errors:q,ruleNames:Q}};return{ok:!0,parsed:JSON.parse(ne)}}catch(te){if(te instanceof o)return q.push(te.message),{ok:!1,result:{errors:q,ruleNames:Q}};let ne=te instanceof Error?te.message:String(te);return q.push(te instanceof SyntaxError?"Invalid JSON":ne),{ok:!1,result:{errors:q,ruleNames:Q}}}}function us(I){return Au(I,".safety-net.json")}function Yt(I){let q=ds(I);if(!q.ok)return q.result;let Q=Ve(q.parsed);return{errors:Q.errors,ruleNames:Q.sources}}function ir(I,q={}){return Du(Eu(pe(I,q)),_u)}function ps(I,q,Q){let te;try{if(r(q)===null)return{path:I,exists:!1,valid:!1,ruleCount:0};te=Yt(q),te.errors.push(...H(I,Q))}catch(ne){if(!(ne instanceof o))throw ne;te={errors:[ne.message],ruleNames:new Set}}return{path:I,exists:!0,valid:te.errors.length===0,ruleCount:te.ruleNames.size,...te.errors.length>0?{errors:te.errors}:{}}}function Hu(I,q){return{source:q,name:I.name,command:I.command,subcommand:I.subcommand,blockArgs:[...I.block_args],reason:I.reason}}function fs(I,q,Q){let te=Q?.userConfigPath??A(I),ne=Q?.projectConfigPath??_(q),ae=Mu(te),le=Y(I,{cwd:q,userConfigPath:te,projectConfigPath:ne,userConfigDir:ae}),ye=G(I,{cwd:q,userConfigPath:te,projectConfigPath:ne,userConfigDir:ae}),ve=new Map(le.rulebooks.flatMap((be)=>be.rules.map((Ce)=>[Ce,be.source])));return{userConfig:ps(te,ye.userConfigTarget,ye.userScope),projectConfig:ps(ne,ye.projectConfigTarget,ye.projectScope),effectiveRules:le.rules.map((be)=>Hu(be,ve.get(be.name)??"project")),shadowedRules:[]}}var Uu=[{flag:i.level,description:"Safety level preset: standard, strict, or paranoid",defaultBehavior:"standard"},{flag:i.strict,description:"Legacy; equivalent to safety.overrides.fail_closed",defaultBehavior:"permissive"},{flag:i.paranoid,description:"Legacy; equivalent to safety.overrides.paranoid_rm and paranoid_interpreters",defaultBehavior:"off"},{flag:i.paranoidRm,description:"Legacy; equivalent to safety.overrides.paranoid_rm",defaultBehavior:"off"},{flag:i.paranoidInterpreters,description:"Legacy; equivalent to safety.overrides.paranoid_interpreters",defaultBehavior:"off"},{flag:i.worktree,description:"Allow local git discards in linked worktrees",defaultBehavior:"off"},{flag:i.debug,description:"Print diagnostic messages to stderr",defaultBehavior:"off"},{flag:i.auditScope,description:"Command decisions recorded: all, or blocked (privacy-minimizing, denials only)",defaultBehavior:"all"}];function ms(I){return[...Uu.map((q)=>({name:q.flag.name,value:we(q.flag,I.env),isSet:Qe(q.flag,I.env),legacyName:q.flag.legacyName,legacyValue:q.flag.legacyName?I.env.get(q.flag.legacyName):void 0,legacyIsSet:q.flag.legacyName?I.env.get(q.flag.legacyName)!==void 0:void 0,description:q.description,defaultBehavior:q.defaultBehavior})),{name:"CC_SAFETY_NET_HOME",value:I.env.get("CC_SAFETY_NET_HOME"),isSet:I.env.get("CC_SAFETY_NET_HOME")!==void 0,description:"Override user-scope config/cache directory",defaultBehavior:"~/.cc-safety-net"}]}var gs={error:0,warning:1,info:2},Gu=["policy","config","audit"];function Bu(I){return I.map((q)=>{if(q==="ownership")return"is not owned by the current user";if(q==="permissions")return"has unsafe permissions";if(q==="symlink")return"is a symbolic link";return"is not a directory"}).join(" and ")}var qu=[{derive:(I)=>I.hooks.length>0&&I.hooks.every((q)=>!q.configured)?[{checkId:"integration.none-configured",severity:"error",title:"No integration configured",detail:"CC Safety Net is not connected to any supported coding-agent integration.",fixHint:"Run `cc-safety-net install` and configure at least one integration."}]:[]},{derive:(I)=>I.hooks.filter((q)=>q.inspectionStatus==="failed").map((q)=>{let Q=ht(q.platform);return{checkId:"integration.inspection-failed",severity:"error",title:`${Q} inspection failed`,detail:`Doctor could not verify the ${Q} integration configuration.`,fixHint:`Correct the reported ${Q} configuration error, then run \`cc-safety-net doctor\` again.`,integration:q.platform}})},{derive:(I)=>I.userConfig.exists&&!I.userConfig.valid?[{checkId:"config.user-invalid",severity:"error",title:"User configuration is invalid",detail:"Doctor could not load a valid user rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:I.userConfig.path}]:[]},{derive:(I)=>I.projectConfig.exists&&!I.projectConfig.valid?[{checkId:"config.project-invalid",severity:"error",title:"Project configuration is invalid",detail:"Doctor could not load a valid project rules configuration.",fixHint:"Run `cc-safety-net rule verify`, correct the reported error, then rerun doctor.",path:I.projectConfig.path}]:[]},{derive:(I)=>I.configState.state==="degraded"?[{checkId:"config.runtime-degraded",severity:"warning",title:"Runtime is enforcing a fallback configuration",detail:`The rejected candidate configuration is not active: ${I.configState.reason}`,fixHint:"Fix the file named in the reason, or run `cc-safety-net rule update` to vendor a remote source, then rerun doctor."}]:[]},{derive:(I)=>I.v2Leftovers&&I.v2Leftovers.length>0?[{checkId:"config.v2-leftovers",severity:"info",title:"Rulebook lock and cache leftovers detected",detail:`Files an earlier version left behind are no longer read: ${I.v2Leftovers.join(", ")}.`,fixHint:"Run `cc-safety-net rule sync` (add `--global` for user scope) to migrate them, then rerun doctor."}]:[]},{derive:(I)=>{let q=I.environment.find((Q)=>Q.name==="CC_SAFETY_NET_AUDIT_SCOPE");return We(q?.value)==="invalid"?[{checkId:"environment.audit-scope-invalid",severity:"warning",title:"Audit scope value is invalid",detail:"CC_SAFETY_NET_AUDIT_SCOPE is not `all` or `blocked`, so allowed command decisions are not recorded.",fixHint:"Set CC_SAFETY_NET_AUDIT_SCOPE to `all` or `blocked`, then restart the integration."}]:[]}},...Gu.map((I)=>({derive:(q)=>q.posture.directories.filter((Q)=>Q.kind===I&&Q.status==="unsafe").map((Q)=>({checkId:`posture.${I}-directory-unsafe`,severity:"error",title:`${I[0]?.toUpperCase()}${I.slice(1)} directory is unsafe`,detail:`The ${I} directory ${Bu(Q.issues)}.`,fixHint:"Ensure this is a real directory owned by the current user with no group or other write access, then rerun doctor.",...Q.path?{path:Q.path}:{}}))})),{derive:(I)=>{let q=[...I.effectiveSafety.weakenedRuleOverrides].sort();return q.length>0?[{checkId:"posture.rule-overrides-weaken-preset",severity:"warning",title:"Rule overrides weaken the selected preset",detail:`Explicit overrides disable rules the resolved preset would enable: ${q.join(", ")}.`,fixHint:`Remove these \`off\` overrides or set them to \`on\`: ${q.join(", ")}.`}]:[]}}];function ys(I){return qu.flatMap((q,Q)=>q.derive(I).map((te,ne)=>({finding:te,catalogOrder:Q,occurrence:ne}))).sort((q,Q)=>gs[q.finding.severity]-gs[Q.finding.severity]||q.catalogOrder-Q.catalogOrder||q.occurrence-Q.occurrence).map((q)=>q.finding)}function Nt(){return Boolean(process.stdout.isTTY&&!process.env.NO_COLOR)}var Vu=(I)=>Nt()?`\x1B[32m${I}\x1B[0m`:I,zu=(I)=>Nt()?`\x1B[33m${I}\x1B[0m`:I,Ju=(I)=>Nt()?`\x1B[34m${I}\x1B[0m`:I,Wu=(I)=>Nt()?`\x1B[35m${I}\x1B[0m`:I,Ku=(I)=>Nt()?`\x1B[36m${I}\x1B[0m`:I,Yu=(I)=>Nt()?`\x1B[31m${I}\x1B[0m`:I,Zu=(I)=>Nt()?`\x1B[2m${I}\x1B[0m`:I,Xu=(I)=>Nt()?`\x1B[1m${I}\x1B[0m`:I,ut={green:Vu,yellow:zu,blue:Ju,magenta:Wu,cyan:Ku,red:Yu,dim:Zu,bold:Xu},Qu="\x1B[0m",ep=[39,82,198,226,208,51,196,46,201,214,93,154,220,27,49,190,200,33,129,227,45,160,63,118,123,202];function tp(I){let q=I;return()=>(q=(q*1664525+1013904223)%4294967296,q/4294967296)}function np(I){let q=[...ep],Q=tp(I);for(let te=q.length-1;te>0;te--){let ne=Math.floor(Q()*(te+1)),ae=q[te];q[te]=q[ne],q[ne]=ae}return q}function rp(I,q=0){if(!Nt())return"";let Q=np(q);return`\x1B[38;5;${Q[I%Q.length]}m`}function hs(I,q,Q=0){if(!Nt())return`"${I}"`;return`${rp(q,Q)}"${I}"${Qu}`}function sr(I){return I==="default"?"built-in default":`${I} policy`}var op=new RegExp("\x1B\\[[0-9;]*m","g"),uo=(I)=>I.replace(op,"").length;function en(I){let q=(I.headers??I.rows[0]??[]).map((le,ye)=>{let ve=Math.max(...I.rows.map((be)=>uo(be[ye]??"")));return Math.max(uo(le),ve)}),Q=(le,ye)=>le+" ".repeat(Math.max(0,ye-uo(le))),te=(le,ye)=>ye[0]+q.map((ve)=>le.repeat(ve+2)).join(ye[1])+ye[2],ne=(le)=>`│ ${le.map((ye,ve)=>Q(ye,q[ve]??0)).join(" │ ")} │`,ae=I.headers?[`   ${ne(I.headers)}`,`   ${te("─",["├","┼","┤"])}`]:[];return[`   ${te("─",["┌","┬","┐"])}`,...ae,...I.rows.map((le)=>`   ${ne(le)}`),`   ${te("─",["└","┴","┘"])}`].join(`
`)}function vs(I){let q=[];q.push("Hook Integration"),q.push(ip(I));let Q=[],te=[];for(let ne of I){let ae=ht(ne.platform);if(ne.errors&&ne.errors.length>0)for(let le of ne.errors)if(ne.configured)Q.push({platform:ae,message:le});else te.push({platform:ae,message:le})}for(let ne of Q)q.push(`   Warning (${ne.platform}): ${ne.message}`);for(let ne of te)q.push(ut.red(`   Error (${ne.platform}): ${ne.message}`));return q.join(`
`)}function ip(I){let q=["Platform","Discovery","Configuration","Inspection"],Q=I.map((te)=>{let ne=ht(te.platform);if(te.inspectionStatus==="not-inspected"){let ve=ut.dim("Not inspected");return[ne,ve,ve,ve]}let ae=te.detected?ut.green("Detected"):te.inspectionStatus==="failed"?ut.red("Unknown"):ut.dim("Not detected"),le=te.configured?ut.green("Configured"):te.detected?ut.yellow("Not configured"):te.inspectionStatus==="failed"?ut.red("Unknown"):ut.dim("Not applicable"),ye=te.inspectionStatus==="verified"?ut.green("Verified"):te.inspectionStatus==="failed"?ut.red("Failed"):ut.dim("Not applicable");return[ne,ae,le,ye]});return en({headers:q,rows:Q})}function bs(I){let Q=["Guard Engine Verification",`   Synthetic self-test: ${I.failed>0?ut.red(`${I.passed}/${I.total} FAIL`):ut.green(`${I.passed}/${I.total} passed`)}`],te=I.results.filter((ne)=>!ne.passed);if(te.length>0){Q.push(""),Q.push(ut.red("   Failures:"));for(let ne of te)Q.push(ut.red(`   • ${ne.description}`)),Q.push(ut.red(`     expected ${ne.expected}, got ${ne.actual}`))}return Q.join(`
`)}function sp(I){if(I.length===0)return"   (no custom rules)";let q=["Source","Name","Command","Block Args"],Q=I.map((te)=>[te.source,te.name,te.subcommand?`${te.command} ${te.subcommand}`:te.command,te.blockArgs.join(", ")]);return en({headers:q,rows:Q})}function Ls(I){let q=[];if(q.push("Configuration"),q.push(ap(I.userConfig,I.projectConfig)),q.push(""),I.effectiveRules.length>0)q.push(`   Effective rules (${I.effectiveRules.length} total):`),q.push(sp(I.effectiveRules));else q.push("   Effective rules: (none - using built-in rules only)");for(let Q of I.shadowedRules)q.push(""),q.push(`   Note: Project rule "${Q.name}" shadows user rule with same name`);return q.join(`
`)}function ap(I,q){let Q=["Scope","Status"],te=(ae)=>{if(!ae.exists)return ut.dim("N/A");if(!ae.valid)return ut.red(`Invalid (${ae.errors?.[0]??"unknown error"})`);return ut.green("Configured")},ne=[["User",te(I)],["Project",te(q)]];return en({headers:Q,rows:ne})}function ws(I){let q=[];return q.push("Environment"),q.push(lp(I)),q.join(`
`)}function ks(I){let q=I.effectiveSafety.policyScopes,Q=["Effective Safety",`   Selected preset: ${I.effectiveSafety.selectedPreset}${q?` (${sr(q.levelScope)})`:""}`,`   Effective: ${I.effectiveSafety.level}`],te=[["fail_closed","fail_closed"],["paranoid_rm","paranoid_rm"],["paranoid_interpreters","paranoid_interpreters"]];for(let[ne,ae]of te){let le=I.effectiveSafety.capabilities[ne],ye=le.enabled?ut.green("ON"):ut.dim("OFF"),ve=le.sources.length>0?` (${le.sources.join(", ")})`:"";Q.push(`   ${ae}: ${ye} via ${le.source}${ve}`)}if(q&&q.weakenings.length>0){Q.push("   Project policy deltas:");for(let ne of q.weakenings)Q.push(`      ${ne}`)}Q.push(`   Stored rule customizations: ${I.effectiveSafety.ruleCounts.stored}`),Q.push(`   Effective rule customizations: ${I.effectiveSafety.ruleCounts.effective}`);for(let[ne,ae]of Object.entries(I.effectiveSafety.ruleOverrides))Q.push(`   ${ne}: ${ae}`);return Q.join(`
`)}function xs(I){let q=["Findings"];if(I.length===0)return q.push("   No findings from inspected doctor facts."),q.join(`
`);for(let Q of I){let te=`[${Q.severity.toUpperCase()}] ${Q.checkId}: ${Ct(Q.title)}`,ne=Q.severity==="error"?ut.red:Q.severity==="warning"?ut.yellow:ut.blue;if(q.push(`   ${ne(te)}`),q.push(`      ${Ct(Q.detail)}`),Q.path)q.push(`      Path: ${Ct(Q.path)}`);if(Q.fixHint)q.push(`      Fix: ${Ct(Q.fixHint)}`)}return q.join(`
`)}function lp(I){let q=["Variable","Status","Legacy"],Q=I.map((te)=>{let ne=te.isSet?ut.green("✓"):ut.dim("✗"),ae=te.legacyName&&te.legacyIsSet?`${te.legacyName} ${ut.green("✓")}`:te.legacyName??"";return[te.name,ne,ae]});return en({headers:q,rows:Q})}function Cs(I){let q=[];if(I.totalBlocked===0)q.push("Recent Activity"),q.push("   No blocked commands in the last 7 days"),q.push("   Tip: This is normal for new installations");else q.push(`Recent Activity · last 7 days (${I.totalBlocked} blocked / ${I.sessionCount} sessions)`),q.push(cp(I.recentEntries));if(I.unreadable>0)q.push(`   Warning: ${I.unreadable} audit log ${I.unreadable===1?"source":"sources"} could not be read; this summary is incomplete`);return q.join(`
`)}function cp(I){let q=["Time","Command"],Q=I.map((te)=>{let ne=Ct(te.command.replace(/\r\n|\r|\n/g," ↵ ").replace(/\t/g," ")),ae=ne.length>40?`${ne.slice(0,37)}...`:ne;return[te.relativeTime,ae]});return en({headers:q,rows:Q})}function Ss(I){let q=[];if(q.push("Update Check"),I.latestVersion===null&&!I.error)return q.push(ar([["Status",ut.dim("Skipped")],["Installed",I.currentVersion]])),q.join(`
`);if(I.error)return q.push(ar([["Status",`${ut.yellow("⚠")} Error`],["Installed",I.currentVersion],["Error",ut.dim(I.error)]])),q.join(`
`);if(I.updateAvailable)return q.push(ar([["Status",`${ut.yellow("⚠")} Update Available`],["Current",I.currentVersion],["Latest",ut.green(I.latestVersion??"")]])),q.push(""),q.push("   Run: bunx cc-safety-net@latest doctor"),q.push("   Or:  npx cc-safety-net@latest doctor"),q.join(`
`);return q.push(ar([["Status",`${ut.green("✓")} Up to date`],["Version",I.currentVersion]])),q.join(`
`)}function ar(I){return en({rows:I})}function Rs(I){let q=[];return q.push("System Info"),q.push(dp(I)),q.join(`
`)}function dp(I){let q=["Component","Version"],Q=(ae)=>{if(ae===null)return ut.dim("not found");return ae},ne=[{label:"cc-safety-net",value:I.version},...er.map((ae)=>({label:ht(ae),value:I.versions[ae]??null})),{label:"Node.js",value:I.nodeVersion},{label:"npm",value:I.npmVersion},{label:"Bun",value:I.bunVersion},{label:"Platform",value:I.platform}].map((ae)=>[ae.label,Q(ae.value)]);return en({headers:q,rows:ne})}function Ps(I){if(I.findings.length===0)return ut.green(`
No findings from inspected doctor facts.`);let q={error:I.findings.filter((ae)=>ae.severity==="error").length,warning:I.findings.filter((ae)=>ae.severity==="warning").length,info:I.findings.filter((ae)=>ae.severity==="info").length},Q=["error","warning","info"].filter((ae)=>q[ae]>0).map((ae)=>`${q[ae]} ${ae}`),te=I.findings.length===1?"finding":"findings",ne=`
${I.findings.length} ${te}: ${Q.join(", ")}.`;if(q.error>0)return ut.red(ne);if(q.warning>0)return ut.yellow(ne);return ut.blue(ne)}import{lstatSync as up}from"node:fs";import{dirname as po}from"node:path";function fo(I,q){try{let Q=up(q);if(Q.isSymbolicLink())return{kind:I,path:q,status:"unsafe",issues:["symlink"]};if(!Q.isDirectory())return{kind:I,path:q,status:"unsafe",issues:["not-directory"]};if(process.platform==="win32"||typeof process.getuid!=="function")return{kind:I,path:q,status:"unknown",issues:[]};let te=[...Q.uid!==process.getuid()?["ownership"]:[],...(Q.mode&18)!==0?["permissions"]:[]];return{kind:I,path:q,status:te.length>0?"unsafe":"safe",issues:te}}catch(Q){if(typeof Q==="object"&&Q!==null&&"code"in Q&&Q.code==="ENOENT")return{kind:I,path:q,status:"not-applicable",issues:[]};return{kind:I,path:q,status:"unknown",issues:[]}}}function Es(I,q){let Q=M(I);return{directories:[fo("policy",po(po(q))),fo("config",po(q)),...Q?[fo("audit",Q)]:[{kind:"audit",status:"unknown",issues:[]}]]}}import{spawn as pp}from"node:child_process";import{existsSync as Ds}from"node:fs";import{delimiter as fp,extname as mp,join as gp}from"node:path";import{stripVTControlCharacters as As}from"node:util";var Ts="2.4.1",yp=5000,hp="_CC_SAFETY_NET_TEST_SPAWN_PLATFORM";function wt(){return Ts}function mo(I,q){let Q=I[q];if(Q)return Q;let te=Object.keys(I).find((ne)=>ne.toLowerCase()===q.toLowerCase()&&!!I[ne]);return te?I[te]:Q}function vp(I){return(mo(I,"PATHEXT")||".COM;.EXE;.BAT;.CMD").split(";").filter((q)=>q.length>0)}function bp(I,q){let Q=mp(I)?[I]:[...vp(q).map((te)=>`${I}${te}`),I];if(I.includes("/")||I.includes("\\"))return Q.find((te)=>Ds(te))??I;return(mo(q,"PATH")??"").split(fp).flatMap((te)=>Q.map((ne)=>gp(te,ne))).find((te)=>Ds(te))??I}function _s(I){if(!/[\s"&|<>^]/.test(I))return I;return`"${I.replace(/"/g,'""')}"`}function tn(I,q){let[Q,...te]=I,ne=q[hp]==="win32"?"win32":process.platform;if(!Q||ne!=="win32")return{cmd:Q??"",args:te};let ae=bp(Q,q);if(!/\.(?:bat|cmd)$/i.test(ae))return{cmd:ae,args:te};return{cmd:mo(q,"COMSPEC")??"cmd.exe",args:["/d","/c",["call",_s(ae),...te.map(_s)].join(" ")]}}var gn=async(I,q=yp)=>{let Q=await Lp(I,{timeoutMs:q});if(Q.code!==0)return null;return As(Q.stdout).trim()||As(Q.stderr).trim()||null};function Lp(I,q){let[Q,...te]=I;if(!Q)return Promise.resolve({code:null,stdout:"",stderr:""});return new Promise((ne)=>{try{let ae=tn([Q,...te],process.env),le=pp(ae.cmd,ae.args,{stdio:["ignore","pipe","pipe"]}),ye=!1,ve="",be="";le.stdout.on("data",(Ie)=>{ve+=Ie.toString()}),le.stderr.on("data",(Ie)=>{be+=Ie.toString()});let Ce=(Ie)=>{if(ye)return;ye=!0,clearTimeout(Ee),ne(Ie)},Ee=setTimeout(()=>{le.kill(),Ce({code:null,stdout:ve,stderr:be})},q.timeoutMs);le.on("close",(Ie)=>{Ce({code:Ie,stdout:ve,stderr:be})}),le.on("error",()=>{Ce({code:null,stdout:ve,stderr:be})})}catch{ne({code:null,stdout:"",stderr:""})}})}function lr(I){if(!I)return null;let q=/Claude Code\s+(\d+\.\d+\.\d+)/i.exec(I);if(q)return q[1]??null;let Q=/v?(\d+\.\d+\.\d+(?:-[a-zA-Z0-9.]+)?)/i.exec(I);if(Q)return Q[1]??null;return I.split(`
`)[0]?.trim()||null}async function An(I=gn){let[q,Q,te,ne,ae,le]=await Promise.all([Promise.all(It.map(async(ye)=>[ye.id,lr(await I([...ye.probeCommand]))])),I(["codex","plugin","list"],30000),I(["amp","plugins","list"],30000),I(["node","--version"]),I(["npm","--version"]),I(["bun","--version"])]);return{version:Ts,versions:Object.fromEntries(q),codexPluginListOutput:Q,ampPluginListOutput:te,nodeVersion:lr(ne),npmVersion:lr(ae),bunVersion:lr(le),platform:`${process.platform} ${process.arch}`}}function go(I,q){if(q==="dev")return!1;let Q=I.split(".").map(Number),te=q.split(".").map(Number),[ne=0,ae=0,le=0]=Q,[ye=0,ve=0,be=0]=te;if(ne!==ye)return ne>ye;if(ae!==ve)return ae>ve;return le>be}async function Zt(){let I=wt(),q=new AbortController,Q=setTimeout(()=>q.abort(),3000);try{let te=await fetch("https://registry.npmjs.org/cc-safety-net/latest",{signal:q.signal});if(!te.ok)return{currentVersion:I,latestVersion:null,updateAvailable:!1,error:`npm registry returned ${te.status}`};let ne=await te.json(),ae=go(ne.version,I);return{currentVersion:I,latestVersion:ne.version,updateAvailable:ae}}catch(te){return{currentVersion:I,latestVersion:null,updateAvailable:!1,error:te instanceof Error?te.message:"Network error"}}finally{clearTimeout(Q)}}import*as Hs from"node:readline";var Fs=(I)=>`\x1B[${I}B`,wp=(I)=>`\x1B[${I}A`;var $s=["░","▒","▓","╱","╲","┃","━","┏","┓","┗","┛","╋"];function kp(I){return new Promise((q)=>setTimeout(q,I))}function xp(I,q,Q){if(!Q)return q(I);if(Q.aborted)return Promise.resolve();return new Promise((te,ne)=>{let ae=()=>Q.removeEventListener("abort",le),le=()=>{ae(),te()};Q.addEventListener("abort",le,{once:!0}),q(I).then(()=>{ae(),te()},(ye)=>{ae(),ne(ye)})})}function cr(I){return Math.max(0,Math.min(1,I))}function yn(I){return Math.max(0,Math.min(255,Math.round(I)))}function yo(I){return I<=0.0031308?12.92*I:1.055*I**0.4166666666666667-0.055}function Cp(I,q,Q){let te=Q*Math.PI/180,ne=q*Math.cos(te),ae=q*Math.sin(te),le=(I+0.3963377774*ne+0.2158037573*ae)**3,ye=(I-0.1055613458*ne-0.0638541728*ae)**3,ve=(I-0.0894841775*ne-1.291485548*ae)**3;return{blue:yn(yo(cr(-0.0041960863*le-0.7034186147*ye+1.707614701*ve))*255),green:yn(yo(cr(-1.2684380046*le+2.6097574011*ye-0.3413193965*ve))*255),red:yn(yo(cr(4.0767416621*le-3.3077115913*ye+0.2309699292*ve))*255)}}function ho(I,q){let Q=(q*I*180/Math.PI%360+360)%360;return Cp(0.72,0.15,Q)}function js(I,q=0.1){let Q=ho(q,I);return`\x1B[38;2;${Q.red};${Q.green};${Q.blue}m`}function Sp(I,q){return{blue:yn(I.blue+(255-I.blue)*q),green:yn(I.green+(255-I.green)*q),red:yn(I.red+(255-I.red)*q)}}function Ns(I,q,Q){let te=Math.imul(I+2654435769,2246822507)^Math.imul(q+3266489909,668265263)^Math.imul(Q+374761393,2654435761),ne=te^te>>>15,ae=Math.imul(ne,739982445),le=ae^ae>>>12,ye=Math.imul(le,695872825);return((ye^ye>>>15)>>>0)/4294967296}function Rp(I,q,Q){let te=Math.floor(Ns(I,q,Q)*$s.length);return $s[te]??"░"}function Is(I){let q=cr(I);return q*q*q*(q*(q*6-15)+10)}function Pp(I){if(I.length===0)return"";let q=[],Q=!1,te="";for(let ne of I){let ae=`${ne.red};${ne.green};${ne.blue}`;if(ne.bold!==Q)q.push(ne.bold?"\x1B[1m":"\x1B[22m"),Q=ne.bold;if(ae!==te)q.push(`\x1B[38;2;${ae}m`),te=ae;q.push(ne.character)}return`${q.join("")}\x1B[22m\x1B[39m`}function Ep(I,q,Q,te,ne){return I.map((ae,le)=>({...ho(Q,te+q+le/ne),bold:!1,character:ae}))}function Dp(I,q,Q,te,ne,ae,le,ye){let ve=Math.max(1,te*0.75),be=Math.min(1,Q/ve),Ce=ne*Is(be),Ee=Math.max(0,(Q-ve)/Math.max(1,te-ve)),Ie=(1-Is(Q/te))*ye*2,et=0.35*Math.max(0,1-Ee*2),Xe=be>=1,at=Math.min(I.length,Math.ceil(Ce+2+1));return I.slice(0,at).map((ct,lt)=>{let ft=ho(ae,le+q+lt/ye+Ie),dt=lt+Ns(q,lt,7919)*2-1;if(dt>Ce+2)return{...ft,bold:!1,character:" "};let gt=Ce-dt,pt=0.8*Math.exp(-(gt*gt)/12.5),bt=Math.min(0.9,pt+et),Dt=!Xe&&dt>Ce-4;return{...Sp(ft,bt),bold:bt>0.3,character:Dt?Rp(q,lt,Q):ct}})}function Os(I){return`\x1B[?2026h${I.map((q,Q)=>`\x1B8${Q>0?Fs(Q):""}${Pp(q)}`).join("")}\x1B[?2026l`}async function vo(I,q={}){if(!I)return;let Q=q.output??process.stdout,te=q.sleep??kp,ne=q.seed??0,ae=I.split(`
`).map((Ce)=>Array.from(Ce)),le=Math.max(...ae.map((Ce)=>Ce.length)),ye=12000*ae.filter((Ce)=>Ce.length>0).length/40,ve=le>0?Math.max(1,Math.ceil(ye/16.666666666666668)):0,be=ve>0?ye/ve:0;Q.write(`\x1B[?25l${ae.length>1?`${`
`.repeat(ae.length-1)}${wp(ae.length-1)}`:""}\x1B7`);try{for(let Ce=1;Ce<=ve;Ce+=1){if(q.signal?.aborted)break;Q.write(Os(ae.map((Ee,Ie)=>Dp(Ee,Ie,Ce,ve,le,0.1,ne,3)))),await xp(be,te,q.signal)}}finally{if(Q.write(Os(ae.map((Ce,Ee)=>Ep(Ce,Ee,0.1,ne,3)))),Q.write("\x1B8"),ae.length>1)Q.write(Fs(ae.length-1));Q.write(`
\x1B[0m\x1B[?25h`)}}var Ms=["┏━┛┏━┛  ┏━┛┏━┃┏━┛┏━┛━┏┛┃ ┃  ┏━ ┏━┛━┏┛","┃  ┃    ━━┃┏━┃┏━┛┏━┛ ┃ ━┏┛  ┃ ┃┏━┛ ┃ ","━━┛━━┛  ━━┛┛ ┛┛  ━━┛ ┛  ┛   ┛ ┛━━┛ ┛ "].join(`
`);function Ap(I){return Boolean(I.isTTY)}async function _n(I={}){let q=I.output??process.stdout;if(!Ap(q))return;let Q=I.input??process.stdin,te={output:q,seed:I.seed??Math.random()*8192,sleep:I.sleep};if(!Q.isTTY||typeof Q.setRawMode!=="function"){await vo(Ms,te);return}let ne=new AbortController,ae=Q.readableFlowing===!0,le=Q.isRaw===!0,ye=!1,ve=(be,Ce)=>{if(Ce.ctrl&&Ce.name==="c")ye=!0;if(ye||Ce.name==="return"||Ce.name==="enter")ne.abort()};Hs.emitKeypressEvents(Q),Q.on("keypress",ve),Q.setRawMode(!0),Q.resume();try{await vo(Ms,{...te,signal:ne.signal})}finally{if(Q.off("keypress",ve),Q.setRawMode(le),!ae)Q.pause()}if(!ye)return;if(I.onInterrupt){I.onInterrupt();return}process.kill(process.pid,"SIGINT")}import{createHash as Op}from"node:crypto";import{existsSync as Bs}from"node:fs";import{dirname as dr,join as qs}from"node:path";import{dirname as Us,join as _p,resolve as Tp}from"node:path";var $p="rule.lock";function Ip(I){return _p(Us(I),$p)}function Gs(I={}){return Tp(I.cwd??process.cwd(),".safety-net.json")}function Pt(I,q){let Q=q.global?q.userConfigPath??A(I,q):q.projectConfigPath??_(q.cwd??process.cwd()),te=q.global?Be(I,q):ze(Q,q.cwd??process.cwd()),ne=Ip(Q);return{configDir:Us(Q),configPath:Q,lockPath:ne,filesystemScope:te,configTarget:s(te,Q),lockTarget:s(te,ne)}}var Fp="`cc-safety-net rule sync` is deprecated: rulebooks are live files that need no synchronization. This run only migrates the lock and cache an earlier version left behind.",jp="cache",Np="rulebooks";function Vs(I,q={}){let Q=Pt(I,q),te=s(Q.filesystemScope,Js(Q.configDir)),ne=r(Q.lockTarget);if(console.log(Fp),ne===null&&!Bs(te.path))return console.log(`No v2 lock or cache leftovers found in ${dr(Q.configDir)}; nothing to migrate.`),0;let ae=Bp(ne),le=m(Q.configTarget);if(!le.config&&(r(Q.configTarget)!==null||ae.size>0))return console.error(`Cannot migrate: the rules config in ${dr(Q.configDir)} is missing or unreadable while v2 leftovers remain. Restore rule.json, then re-run rule sync.`),1;let ye=le.config?.rules??[];for(let ve of ye.flatMap((be)=>Mp(be,ae,Q,te,q.global===!0)))console.log(ve);return j(Q.lockTarget),tt(te),console.log(`Removed the v2 lock and cache under ${dr(Q.configDir)}.`),0}function zs(I,q){return[...new Set([{cwd:q},{cwd:q,global:!0}].flatMap((Q)=>{let te=Pt(I,Q);return[te.lockPath,Js(te.configDir)]}))].filter((Q)=>Bs(Q))}function Mp(I,q,Q,te,ne){if(!S(I))return[];let ae=O(I).name,le=s(Q.filesystemScope,N(Q.configDir,ae)),ye=r(le);if(ye!==null&&Hp(ye,ae))return[];let ve=q.get(I),be=ve?Up(ve,ae,te.path,Q.filesystemScope):null;if(be===null)return[`Could not migrate ${I} from the v2 cache. Run \`cc-safety-net rule update ${I}${ne?" --global":""}\` to vendor it.`];if(h(le,be),ye!==null)return[`Restored ${I} from the v2 cache over an invalid file.`];return[`Vendored ${I} from the v2 cache.`]}function Hp(I,q){let Q=ge(I);return!("problem"in Q)&&Q.rulebook.name===q}function Up(I,q,Q,te){let ne=qs(Q,Np,`${Gp(I)}--${I.digest.replace("sha256:","").slice(0,12)}`,de),ae=r(s(te,ne));if(ae===null||zp(ae)!==I.digest)return null;let le=ge(ae);if("problem"in le||le.rulebook.name!==q)return null;return ae}function Js(I){return qs(dr(I),jp)}function Gp(I){return([I.owner,I.repo,I.display_ref,I.name].every((te)=>typeof te==="string"&&te!=="")?`${I.owner}/${I.repo}#${I.display_ref}/${I.name}`:I.spec).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"rulebook"}function Bp(I){let q=I===null?null:Vp(I),Q=Ws(q)&&Array.isArray(q.rulebooks)?q.rulebooks:[];return new Map(Q.filter(qp).map((te)=>[te.spec,te]))}function qp(I){return Ws(I)&&typeof I.spec==="string"&&typeof I.digest==="string"}function Ws(I){return!!I&&typeof I==="object"}function Vp(I){try{return JSON.parse(I)}catch{return null}}function zp(I){return`sha256:${Op("sha256").update(I).digest("hex")}`}var Ks="\r\x1B[2K",Jp="\x1B[?25l",Wp="\x1B[39m",Kp="\x1B[?25h",Yp=100,Zp=0.55,Xp=80,Ys=["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];function Qp(I){return new Promise((q)=>setTimeout(q,I))}async function ur(I,q={}){let Q=q.output??process.stdout;if(!Q.isTTY)return I;let te=q.sleep??Qp,ne=!1,ae=I.then((ye)=>(ne=!0,ye),(ye)=>{throw ne=!0,ye});if(await Promise.race([ae.then(()=>!0),te(Yp).then(()=>!1)]))return ae;Q.write(Jp);try{for(let ye=0;!ne;ye+=1)Q.write(`${Ks}${js(ye*Zp)}${Ys[ye%Ys.length]}${Wp} ${q.loadingMessage??"Loading…"}`),await Promise.race([ae,te(Xp)]);return await ae}finally{Q.write(`${Ks}${Kp}`)}}async function Tn(I,q,Q,te={}){let ne=q();if(I)await Q();if(I&&ne.ready)await ur(ne.ready,te);return ne.finish()}import{stripVTControlCharacters as e2}from"node:util";var pr="amp plugins list",t2=/^\s*[✓✗]\s+cc-safety-net(?:\.ts)?\s+\(User Plugins\)\s+(\S+)\s*$/;function Zs(I){if(!I.ampPluginListOutput)return{platform:"amp",status:"n/a"};let q=e2(I.ampPluginListOutput).split(`
`).map((Q)=>t2.exec(Q)?.[1]).find((Q)=>Q!==void 0);if(!q)return{platform:"amp",status:"n/a"};if(q!=="active")return{platform:"amp",status:"disabled",method:pr,configPath:pr,errors:[`Amp personal plugin cc-safety-net is ${q}; run "plugins: reload" in Amp or reinstall with install --amp`]};return{platform:"amp",status:"configured",method:pr,configPath:pr}}import{existsSync as o2,readFileSync as i2}from"node:fs";import{isAbsolute as av,join as r2,relative as lv}from"node:path";function $n(I){return r2(I,".gemini","config","hooks.json")}var s2=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*(?:--agy-cli|-ac)(\s|["']|$)/;function a2(I){if(!I||typeof I!=="object"||Array.isArray(I))return[];return Object.values(I).flatMap((q)=>{if(!q||typeof q!=="object"||Array.isArray(q))return[];let Q=q,te=Q.PreToolUse;if(!Array.isArray(te))return[];return te.flatMap((ne)=>{if(!ne||typeof ne!=="object"||Array.isArray(ne))return[];let ae=ne.hooks;if(!Array.isArray(ae))return[];return ae.flatMap((le)=>{if(!le||typeof le!=="object"||Array.isArray(le))return[];let ye=le.command;if(typeof ye!=="string"||!s2.test(ye))return[];return[{command:ye,enabled:Q.enabled!==!1}]})})})}function Xs(I){let q=$n(I.environment.home);if(!o2(q))return{platform:"antigravity-cli",status:"n/a",configPath:q};let Q;try{Q=a2(JSON.parse(i2(q,"utf-8")))}catch(te){return{platform:"antigravity-cli",status:"n/a",configPath:q,errors:[`Failed to parse Antigravity hooks config ${q}: ${te instanceof Error?te.message:String(te)}`]}}if(Q.some((te)=>te.enabled))return{platform:"antigravity-cli",status:"configured",method:"hook config",configPath:q};if(Q.length>0)return{platform:"antigravity-cli",status:"disabled",method:"hook config",configPath:q};return{platform:"antigravity-cli",status:"n/a",configPath:q}}import{join as Qs}from"node:path";import{existsSync as l2,lstatSync as c2,readFileSync as d2}from"node:fs";function Mt(I,q=(Q)=>Q){if(!l2(I))return{kind:"missing"};try{return{kind:"ok",value:JSON.parse(q(d2(I,"utf-8")))}}catch{return{kind:"unreadable"}}}function Lt(I){try{return c2(I)}catch{return}}function fr(I,q){let Q=Lt(q);if(!Q)return{platform:I,status:"n/a",configPath:q};if(!Q.isSymbolicLink()&&Q.isDirectory())return;return{platform:I,status:"n/a",configPath:q,errors:[`${q} is a symlink or not a directory; move or remove it before installing`]}}function mt(I,q){return typeof I==="object"&&I!==null?I[q]:void 0}var bo="cc-safety-net@cc-marketplace";function ea(I){return Qs(I.home,".claude","plugins","installed_plugins.json")}function ta(I,q){let Q=mt(mt(I,"plugins"),q);return Array.isArray(Q)&&Q.length>0}function mr(I,q){let Q=Mt(ea(I));return Q.kind==="ok"&&ta(Q.value,q)}function Lo(I){let q=ea(I),Q=Mt(q);if(Q.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(Q.kind==="missing")return{platform:"claude-code",status:"n/a"};if(!ta(Q.value,bo))return{platform:"claude-code",status:"n/a"};let te=Qs(I.home,".claude","settings.json"),ne=Mt(te);if(ne.kind==="unreadable")return{platform:"claude-code",status:"not-inspected"};if(!(ne.kind==="ok"&&mt(mt(ne.value,"enabledPlugins"),bo)===!0))return{platform:"claude-code",status:"disabled",method:"plugin config",configPath:te,errors:[`${bo} is installed but not enabled in Claude Code`]};return{platform:"claude-code",status:"configured",method:"plugin config",configPath:q}}function na(I){return Lo(I.environment)}function ra(I){if(!I.codexPluginListOutput)return{platform:"codex",status:"n/a"};let q=I.codexPluginListOutput.split(`
`).find((Q)=>Q.includes("https://github.com/kenryu42/cc-safety-net.git"));if(!q)return{platform:"codex",status:"n/a"};if(!q.includes("installed,"))return{platform:"codex",status:"n/a"};if(!q.includes("installed, enabled"))return{platform:"codex",status:"disabled",method:"codex plugin list",configPath:"codex plugin list",errors:["Codex plugin line for https://github.com/kenryu42/cc-safety-net.git must contain installed, enabled."]};return{platform:"codex",status:"configured",method:"codex plugin list",configPath:"codex plugin list"}}import{existsSync as Lr,readdirSync as u2,readFileSync as p2}from"node:fs";import{join as St}from"node:path";function _t(I){let q="",Q=0,te=!1,ne=!1,ae=-1;while(Q<I.length){let le=I[Q],ye=I[Q+1];if(ne){q+=le,ne=!1,Q++;continue}if(le==='"'&&!te){te=!0,ae=-1,q+=le,Q++;continue}if(le==='"'&&te){te=!1,q+=le,Q++;continue}if(le==="\\"&&te){ne=!0,q+=le,Q++;continue}if(te){q+=le,Q++;continue}if(le==="/"&&ye==="/"){while(Q<I.length&&I[Q]!==`
`)Q++;continue}if(le==="/"&&ye==="*"){Q+=2;while(Q<I.length-1){if(I[Q]==="*"&&I[Q+1]==="/"){Q+=2;break}Q++}continue}if(le===","){ae=q.length,q+=le,Q++;continue}if(le==="}"||le==="]"){if(ae!==-1){let ve=q.slice(ae+1);if(/^\s*$/.test(ve))q=q.slice(0,ae)+ve}ae=-1,q+=le,Q++;continue}if(!/\s/.test(le))ae=-1;q+=le,Q++}return q}function wo(I,q,Q){let te=q+1,ne=!1;while(te<I.length){if(ne){ne=!1,te++;continue}if(I[te]==="\\"){ne=!0,te++;continue}if(I[te]==='"')return te+1;te++}throw Error(Q)}function ko(I,q,Q){let te=I[q],ne=te==="["?"]":"}",ae=0,le=q;while(le<I.length){let ye=Q.skipComment?.(I,le)??le;if(ye!==le){le=ye;continue}if(I[le]==='"'){le=wo(I,le,Q.stringError);continue}if(I[le]===te)ae++;if(I[le]===ne){if(ae--,ae===0)return le}le++}throw Error(Q.bracketError)}function ia(I,q){let Q=I.lastIndexOf(`
`,q)+1;return/^[ \t]*/.exec(I.slice(Q))?.[0]??""}function yr(I,q){let Q=q.end+(/^\s*/.exec(I.slice(q.end))?.[0].length??0);if(I[Q]===","){let le=I[Q+1]===`
`?Q+2:Q+1;return`${I.slice(0,q.start)}${I.slice(le)}`}let te=I.slice(0,q.start).search(/\s*$/)-1;if(I[te]!==",")return`${I.slice(0,q.start)}${I.slice(q.end)}`;let ne=I.lastIndexOf(`
`,te-1),ae=ne!==-1&&/^\s*$/.test(I.slice(ne+1,te))?ne:te;return`${I.slice(0,ae)}${I.slice(q.end)}`}function gr(I,q){if(I.startsWith("//",q)){let Q=I.indexOf(`
`,q+2);return Q===-1?I.length:Q+1}if(I.startsWith("/*",q)){let Q=I.indexOf("*/",q+2);return Q===-1?I.length:Q+2}return q}function oa(I,q){let Q=q;while(Q<I.length){if(/\s/.test(I[Q]??"")){Q++;continue}let te=gr(I,Q);if(te===Q)return Q;Q=te}return Q}function sa(I,q,Q){let te=0,ne=0;while(ne<I.length){let ae=gr(I,ne);if(ae!==ne){ne=ae;continue}if(I[ne]==='"'){let le=wo(I,ne,Q.stringError);if(te===1&&JSON.parse(I.slice(ne,le))===q){let ye=oa(I,le),ve=oa(I,ye+1);if(I[ye]===":"&&I[ve]==="[")return{start:ve,end:ko(I,ve,{skipComment:gr,...Q})}}ne=le;continue}if(I[ne]==="{"||I[ne]==="[")te++;if(I[ne]==="}"||I[ne]==="]")te--;ne++}return}function aa(I,q,Q){let te=[],ne=q.start+1;while(ne<q.end){let ae=gr(I,ne);if(ae!==ne){ne=ae;continue}if(I[ne]==='"'){let le=wo(I,ne,Q),ye=JSON.parse(I.slice(ne,le));if(typeof ye==="string")te.push({range:{start:ne,end:le},value:ye});ne=le;continue}ne++}return te}var Ht="cc-safety-net@cc-marketplace",hr=["cc-marketplace","cc-safety-net"],la=["_direct","copilot-safety-net"],ca=["cc-marketplace","safety-net"],da="safety-net@cc-marketplace";function vr(I,q){let Q=q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return new RegExp(`(^|[^a-z0-9-])${Q}([^a-z0-9-]|$)`,"m").test(I??"")}function ua(I){return vr(I,"cc-safety-net@cc-marketplace")}function pa(I){return vr(I,"cc-marketplace")}function fa(I){return vr(I,"copilot-safety-net")}function ma(I){return vr(I,"safety-net@cc-marketplace")}function xo(I){if(!I?.includes("cc-safety-net"))return!1;return/(^|\s)hook\s+(?:[^\s]+\s+)*(--copilot-cli|-cp)(\s|$)/.test(I)}function ya(I,q){if(!I)return null;let Q=I.match(/(\d+)\.(\d+)\.(\d+)/);if(!Q)return null;let te=[Number(Q[1]),Number(Q[2]),Number(Q[3])];for(let ne=0;ne<q.length;ne++){let ae=te[ne]??0,le=q[ne]??0;if(ae!==le)return ae>le}return!0}function f2(I){return ya(I,[0,0,422])}function m2(I){return ya(I,[1,0,8])}function In(I){return I.env.get("COPILOT_HOME")||St(I.home,".copilot")}function Co(I){return(I.hooks?.preToolUse??[]).some((Q)=>{if(Q.type!=="command")return!1;return xo(Q.command)||xo(Q.bash)||xo(Q.powershell)})}function br(I){return I===void 0||typeof I==="string"}function g2(I){if(!I||typeof I!=="object"||Array.isArray(I))return!1;let q=I;if(q.disableAllHooks!==void 0&&typeof q.disableAllHooks!=="boolean")return!1;if(q.hooks===void 0)return!0;if(!q.hooks||typeof q.hooks!=="object"||Array.isArray(q.hooks))return!1;let Q=q.hooks.preToolUse;if(Q===void 0)return!0;return Array.isArray(Q)&&Q.every((te)=>te!==null&&typeof te==="object"&&!Array.isArray(te)&&br(te.type)&&br(te.command)&&br(te.bash)&&br(te.powershell))}function So(I,q){try{let Q=JSON.parse(_t(p2(I,"utf-8")));if(!g2(Q)){q?.push(`Invalid hook config ${I}: hooks.preToolUse must be an array of hook objects`);return}return Q}catch(Q){q?.push(`Failed to parse ${I}: ${Q instanceof Error?Q.message:String(Q)}`);return}}function ha(I,q){try{return u2(I).filter((Q)=>Q.endsWith(".json")).sort((Q,te)=>Q.localeCompare(te))}catch(Q){return q?.push(`Failed to read ${I}: ${Q instanceof Error?Q.message:String(Q)}`),[]}}function y2(I,q){if(!Lr(I))return[];let Q=[];for(let te of ha(I,q)){let ne=St(I,te),ae=So(ne,q);if(ae&&Co(ae))Q.push(ne)}return Q}function hn(I,q){if(!Lr(I))return;let Q=So(I,q);if(!Q)return;return{path:I,config:Q}}function ga(I,q,Q,te){if(q){I.push(`GitHub Copilot CLI ${q} does not support ${Q}; requires ${te}+`);return}I.push(`GitHub Copilot CLI version unavailable; skipping ${Q} because it requires ${te}+`)}function h2(I){for(let q of I){if(q?.config.disableAllHooks===!0)return q.path;if(q?.config.disableAllHooks===!1)return}return}function v2(I,q,Q,te){let ne=In(I),ae=St(q,".github","hooks"),le=St(ne,"hooks"),ye=St(q,".github","copilot"),ve=St(q,".claude"),be=m2(Q),Ce=be===!0?te:void 0,Ee=[hn(St(ye,"settings.local.json"),Ce),hn(St(ye,"settings.json"),Ce),hn(St(ve,"settings.local.json"),Ce),hn(St(ve,"settings.json"),Ce)],Ie=[hn(St(ne,"settings.json"),Ce),hn(St(ne,"config.json"),Ce)];if(be!==!1){let gt=h2([...Ee,...Ie]);if(gt){if(be===null)te.push(`GitHub Copilot CLI version unavailable; treating disableAllHooks in ${gt} as active`);return{activeConfigPaths:[],disabledBy:gt}}}let et=y2(ae,te),Xe=f2(Q),at=Xe===!0?te:void 0,ct=Lr(le)?ha(le,at):[],lt=[];for(let gt of ct){let pt=St(le,gt),bt=So(pt,at);if(bt&&Co(bt))lt.push(pt)}if(Xe!==!0&&lt.length>0)ga(te,Q,`user hook files in ${le}`,"0.0.422"),lt.length=0;let ft=[];for(let gt of[...Ee,...Ie]){if(!gt)continue;if(!Co(gt.config))continue;if(be===!0){ft.push(gt);continue}ga(te,Q,"inline hook definitions in Copilot config files","1.0.8");break}let dt=(gt)=>gt.filter((pt)=>!!pt&&ft.includes(pt)).map((pt)=>pt.path);return{activeConfigPaths:[...dt(Ee),...et,...dt(Ie),...lt]}}function va(I){let q=[],Q=v2(I.environment,I.cwd,I.copilotCliVersion,q);if(Q.disabledBy)return{platform:"copilot-cli",status:"disabled",method:"hook config",configPath:Q.disabledBy,configPaths:[Q.disabledBy],errors:q.length>0?q:void 0};let te=In(I.environment),ne=St(te,"installed-plugins",...hr),ae=Lr(ne),le=St(te,"settings.json"),ye=Mt(le,_t);if(ae&&ye.kind==="unreadable")return{platform:"copilot-cli",status:"not-inspected"};if(ae&&ye.kind==="ok"&&mt(mt(ye.value,"enabledPlugins"),Ht)===!1)return{platform:"copilot-cli",status:"disabled",method:"plugin config",configPath:le,errors:[`${Ht} is installed but not enabled in Copilot CLI`]};if(ae||Q.activeConfigPaths.length>0){let ve=ae,be=Q.activeConfigPaths[0];return{platform:"copilot-cli",status:"configured",method:ve?"plugin config":"hook config",configPath:be??(ve?ne:void 0),configPaths:Q.activeConfigPaths.length>0?Q.activeConfigPaths:void 0,errors:q.length>0?q:void 0}}return{platform:"copilot-cli",status:"n/a",errors:q.length>0?q:void 0}}import{existsSync as E2,readFileSync as D2}from"node:fs";import{existsSync as ba,mkdirSync as w2,readFileSync as k2}from"node:fs";import{dirname as x2,join as C2}from"node:path";import{renameSync as b2,writeFileSync as L2}from"node:fs";function kt(I,q){let Q=`${I}.${process.pid}.tmp`;L2(Q,q),b2(Q,I)}var Tt=Object.fromEntries(Dn.map((I)=>[I.id,`npx -y cc-safety-net hook ${I.flags[1]}`]));var On=Tt.cursor,La=30;function kr(I){return C2(I.home,".cursor","hooks.json")}function nn(I){return typeof I==="object"&&I!==null&&!Array.isArray(I)}function Ro(){return{command:On,timeout:La,failClosed:!0}}function wr(I){return nn(I)&&I.command===On}function S2(I){return Object.keys(I).length===3&&I.command===On&&I.timeout===La&&I.failClosed===!0}function R2(I){try{return JSON.parse(k2(I,"utf-8"))}catch(q){if(q instanceof SyntaxError)throw Error(`Failed to parse Cursor hooks config ${I}: ${q.message}`);throw q}}function wa(I){let q=R2(I);if(!nn(q))throw Error(`Cursor hooks config ${I} must be a JSON object`);if(q.version!==1)throw Error(`Cursor hooks config ${I} must set "version": 1`);if(q.hooks!==void 0&&!nn(q.hooks))throw Error(`Cursor hooks config ${I} "hooks" must be an object`);let Q=nn(q.hooks)?q.hooks.preToolUse:void 0;if(Q!==void 0&&!Array.isArray(Q))throw Error(`Cursor hooks config ${I} "hooks.preToolUse" must be an array`);return q}function ka(I){let q=nn(I.hooks)?I.hooks.preToolUse:void 0;return Array.isArray(q)?q:[]}function P2(I){if(!I.some(wr))return[...I,Ro()];return I.reduce((q,Q)=>{if(!wr(Q))return q.result.push(Q),q;if(!q.inserted)q.result.push(Ro()),q.inserted=!0;return q},{result:[],inserted:!1}).result}function xa(I,q,Q){let te=nn(q.hooks)?q.hooks:{},ne={...q,hooks:{...te,preToolUse:Q}};kt(I,`${JSON.stringify(ne,null,2)}
`)}function Ca(I){let q=kr(I);if(!ba(q))return w2(x2(q),{recursive:!0}),kt(q,`${JSON.stringify({version:1,hooks:{preToolUse:[Ro()]}},null,2)}
`),{path:q,alreadyInstalled:!1};let Q=wa(q),te=ka(Q),ne=te.filter(wr);if(nn(Q.hooks)&&Array.isArray(Q.hooks.preToolUse)&&ne.length===1&&ne[0]!==void 0&&S2(ne[0]))return{path:q,alreadyInstalled:!0};return xa(q,Q,P2(te)),{path:q,alreadyInstalled:!1}}function Sa(I){let q=kr(I);if(!ba(q))return{path:q,alreadyInstalled:!1};let Q=wa(q),te=ka(Q),ne=te.filter((ae)=>!wr(ae));if(ne.length===te.length)return{path:q,alreadyInstalled:!1};return xa(q,Q,ne),{path:q,alreadyInstalled:!0}}function A2(I){if(!I||typeof I!=="object"||Array.isArray(I))return[];let q=I.hooks;if(!q||typeof q!=="object"||Array.isArray(q))return[];let Q=q.preToolUse;if(!Array.isArray(Q))return[];return Q.filter((te)=>!!te&&typeof te==="object"&&!Array.isArray(te)&&te.command===On)}function _2(I){let q=[];if(I.length>1)q.push("Multiple managed cc-safety-net hooks found; reinstall to collapse duplicates");let Q=I[0];if(Q&&Q.failClosed!==!0)q.push('Managed hook is missing "failClosed": true; reinstall to repair');if(Q&&Q.timeout!==30)q.push('Managed hook "timeout" is not 30; reinstall to repair');return q}function Ra(I){let q=kr(I.environment);if(!E2(q))return{platform:"cursor",status:"n/a",configPath:q};let Q;try{Q=JSON.parse(D2(q,"utf-8"))}catch(ae){return{platform:"cursor",status:"n/a",configPath:q,errors:[`Failed to parse Cursor hooks config ${q}: ${ae instanceof Error?ae.message:String(ae)}`]}}let te=A2(Q);if(te.length===0)return{platform:"cursor",status:"n/a",configPath:q};let ne=_2(te);return{platform:"cursor",status:"configured",method:"hook config",configPath:q,errors:ne.length>0?ne:void 0}}import{existsSync as T2}from"node:fs";import{join as Po}from"node:path";var Eo="gemini-safety-net";function Do(I){let q=Po(I.home,".gemini","extensions"),Q=Po(q,Eo);if(!T2(Q))return{platform:"gemini-cli",status:"n/a"};let te=Po(q,"extension-enablement.json"),ne=Mt(te);if(ne.kind==="unreadable")return{platform:"gemini-cli",status:"not-inspected"};let ae=ne.kind==="ok"?mt(mt(ne.value,Eo),"overrides"):void 0;if(Array.isArray(ae)&&ae.some((ye)=>typeof ye==="string"&&ye.startsWith("!")))return{platform:"gemini-cli",status:"disabled",method:"extension config",configPath:te,errors:[`${Eo} is disabled in Gemini CLI`]};return{platform:"gemini-cli",status:"configured",method:"extension config",configPath:Q}}function Pa(I){return Do(I.environment)}import{existsSync as H2,readFileSync as U2}from"node:fs";import{dirname as $o,join as N2}from"node:path";import{existsSync as _o,mkdirSync as $2,readdirSync as I2,readFileSync as Ea,rmdirSync as O2,rmSync as F2}from"node:fs";import{dirname as j2}from"node:path";function At(I){return typeof I==="object"&&I!==null&&!Array.isArray(I)}function Da(I){try{let q=JSON.parse(I);return At(q)?q:null}catch{return null}}function To(I){let q=At(I.hooks)?I.hooks.PreToolUse:void 0;return Array.isArray(q)?q:[]}function xr(I,q,Q){let te=At(q.hooks)?q.hooks:{};kt(I,`${JSON.stringify({...q,hooks:{...te,PreToolUse:Q}},null,2)}
`)}function Ao(I,q){return{hooks:[{type:"command",command:I,timeout:q}]}}function Fn(I,q){return To(I).filter((Q)=>At(Q)&&Array.isArray(Q.hooks)&&Q.hooks.some((te)=>At(te)&&te.command===q))}function Aa(I,q){return I.flatMap((Q)=>{if(!At(Q)||!Array.isArray(Q.hooks))return[Q];let te=Q.hooks.filter((ne)=>!(At(ne)&&ne.command===q));if(te.length===Q.hooks.length)return[Q];return te.length===0?[]:[{...Q,hooks:te}]})}function Cr(I,q,Q){let ne=(Array.isArray(I.hooks)?I.hooks.filter(At):[]).find((ae)=>ae.command===q);return[...I.matcher===void 0||I.matcher===""||I.matcher==="*"?[]:['Managed hook has a "matcher" that narrows coverage; reinstall to repair'],...ne?.type==="command"?[]:['Managed hook "type" is not "command"; reinstall to repair'],...ne?.timeout===Q?[]:[`Managed hook "timeout" is not ${Q}; reinstall to repair`]]}function Sr(I,q,Q){if(!_o(I))return $2(j2(I),{recursive:!0}),xr(I,{},[Ao(q,Q)]),{path:I,alreadyInstalled:!1};let te=Da(Ea(I,"utf-8"));if(!te)return xr(I,{},[Ao(q,Q)]),{path:I,alreadyInstalled:!1};let ne=To(te),ae=Fn(te,q),le=Ao(q,Q);if(ae.length===1&&JSON.stringify(ae[0])===JSON.stringify(le))return{path:I,alreadyInstalled:!0};return xr(I,te,[...Aa(ne,q),le]),{path:I,alreadyInstalled:!1}}function Rr(I,q,Q=[]){if(!_o(I))return{path:I,alreadyInstalled:!1};let te=Da(Ea(I,"utf-8"));if(!te)return{path:I,alreadyInstalled:!1};let ne=To(te),ae=Aa(ne,q);if(JSON.stringify(ae)===JSON.stringify(ne))return{path:I,alreadyInstalled:!1};let le=At(te.hooks)?te.hooks:{};if(ae.length===0&&Object.keys(te).length===1&&Object.keys(le).length===1){F2(I);for(let ve of Q)if(_o(ve)&&I2(ve).length===0)O2(ve);return{path:I,alreadyInstalled:!0}}return xr(I,te,ae),{path:I,alreadyInstalled:!0}}var jn=Tt.goose,Io=30,M2="cc-safety-net";function Pr(I){return N2(I.env.get("GOOSE_PATH_ROOT")??I.home,".agents","plugins",M2,"hooks","hooks.json")}function _a(I){return Sr(Pr(I),jn,Io)}function Ta(I){let q=Pr(I);return Rr(q,jn,[$o(q),$o($o(q))])}function $a(I){let q=Pr(I.environment);if(!H2(q))return{platform:"goose",status:"n/a",configPath:q};let Q;try{Q=JSON.parse(U2(q,"utf-8"))}catch(ae){return{platform:"goose",status:"n/a",configPath:q,errors:[`Failed to parse Goose hooks config ${q}: ${ae instanceof Error?ae.message:String(ae)}`]}}let te=At(Q)?Fn(Q,jn)[0]:void 0;if(!te)return{platform:"goose",status:"n/a",configPath:q};let ne=Cr(te,jn,Io);return{platform:"goose",status:"configured",method:"hook config",configPath:q,errors:ne.length>0?ne:void 0}}import{existsSync as G2,readFileSync as B2}from"node:fs";import{join as Ia}from"node:path";var Nn=Tt["grok-build"],Oo=30;function Er(I){return Ia(I.env.get("GROK_HOME")??Ia(I.home,".grok"),"hooks","cc-safety-net.json")}function Oa(I){return Sr(Er(I),Nn,Oo)}function Fa(I){return Rr(Er(I),Nn)}function ja(I){let q=Er(I.environment);if(!G2(q))return{platform:"grok-build",status:"n/a",configPath:q};let Q;try{Q=JSON.parse(B2(q,"utf-8"))}catch(ae){return{platform:"grok-build",status:"n/a",configPath:q,errors:[`Failed to parse Grok Build hooks config ${q}: ${ae instanceof Error?ae.message:String(ae)}`]}}let te=At(Q)?Fn(Q,Nn)[0]:void 0;if(!te)return{platform:"grok-build",status:"n/a",configPath:q};let ne=Cr(te,Nn,Oo);return{platform:"grok-build",status:"configured",method:"hook config",configPath:q,errors:ne.length>0?ne:void 0}}import{readFileSync as Va}from"node:fs";import{join as za}from"node:path";var $t="cc-safety-net",Fo="# cc-safety-net managed Hermes Agent plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --hermes-agent",q2=30;function Na(I){return`${Fo}
# version: ${I}
`}function V2(I){return`${Na(I)}name: ${$t}
version: "${I}"
description: "Block destructive commands and secret-file access before Hermes runs a tool."
author: "cc-safety-net"
provides_hooks:
  - pre_tool_call
`}function z2(I){return`${Na(I)}"""CC Safety Net guard for Hermes Agent.

Registers pre_tool_call and forwards the tool call to the packaged CC Safety Net
adapter (cc-safety-net hook --hermes-agent) over JSON stdin. The adapter prints nothing
when the call is allowed and an {"action": "block", ...} directive when it is denied.
Hermes ignores a callback that raises, so every transport and analysis failure is turned
into an explicit block here instead.
"""

import json
import os
import shutil
import signal
import subprocess

HOOK_EVENT = "pre_tool_call"
SUPPORTED_TOOLS = ("patch", "read_file", "terminal", "write_file")
ANALYZER = [${Tt["hermes-agent"].split(" ").map((q)=>`"${q}"`).join(", ")}]
TIMEOUT_SECONDS = ${q2}


def _block(detail):
    return {"action": "block", "message": "CC Safety Net failed closed: " + detail}


def _terminal_cwd(task_id, process_cwd):
    """Return the directory Hermes will run this terminal command in.

    A \`terminal\` call without \`workdir\` runs in the session's own cwd RECORD, not in the
    Hermes process directory: \`_resolve_command_cwd\` in tools/terminal_tool.py returns
    \`workdir or get_session_cwd(session_key) or default_cwd\`, and that record is rewritten
    after every completed command, so it IS the session's \`cd\` state. The session key is
    derived exactly as terminal_tool derives it: the contextvar when set, the raw task_id
    otherwise. No record yet (first command of a session) means \`default_cwd\`, which the local
    terminal backend reads from \`TERMINAL_CWD\` (\`hermes_cli/config.py\` bridges the configured
    \`terminal.cwd\` into it) and only then falls back to the process directory.
    """
    from tools.approval import get_current_session_key
    from tools.terminal_tool import get_session_cwd

    return (
        get_session_cwd(get_current_session_key(default="") or (task_id or ""))
        or os.environ.get("TERMINAL_CWD")
        or process_cwd
    )


def _pre_tool_call(tool_name="", args=None, session_id="", task_id="", **_):
    if tool_name not in SUPPORTED_TOOLS:
        return None

    executable = shutil.which(ANALYZER[0])
    if executable is None:
        return _block(ANALYZER[0] + " was not found on PATH.")

    try:
        cwd = os.getcwd()
    except OSError as error:
        return _block("the working directory could not be resolved (%s)." % error)

    if tool_name == "terminal":
        try:
            cwd = _terminal_cwd(task_id, cwd)
        except ImportError as error:
            # Without the session record we cannot tell which directory the command runs in,
            # and analysing the wrong one clears every path-scoped protection.
            return _block(
                "the Hermes session directory could not be read (%s). Update cc-safety-net and "
                "reinstall the plugin with: npx -y cc-safety-net install --hermes-agent." % error
            )

    payload = json.dumps(
        {
            "hook_event_name": HOOK_EVENT,
            "tool_name": tool_name,
            "tool_input": args if isinstance(args, dict) else None,
            "session_id": session_id if isinstance(session_id, str) else "",
            "cwd": cwd,
        }
    )

    try:
        if os.name == "nt":
            launch_options = {}
        else:
            launch_options = {"start_new_session": True}
        process = subprocess.Popen(
            [executable] + ANALYZER[1:],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            # Decode explicitly: the analyzer writes UTF-8, and a locale decoder would raise
            # UnicodeDecodeError on output it cannot read — an exception Hermes swallows by
            # allowing the tool call. "replace" turns that into unreadable output, which blocks.
            encoding="utf-8",
            errors="replace",
            # Resolve the analyzer from a neutral directory: npx prefers a repository-local
            # node_modules/.bin/cc-safety-net, so inheriting Hermes' working directory would
            # let workspace contents stand in for the analyzer. The payload's "cwd" above is
            # still the real Hermes working directory, which the analysis needs.
            cwd=os.path.expanduser("~"),
            # Own process group so the timeout below can kill the whole tree: npx's descendants
            # outlive a kill aimed at npx alone and keep holding the pipes captured here. Windows
            # uses taskkill's process-tree traversal instead because sessions are POSIX-only.
            **launch_options,
        )
    except OSError as error:
        return _block("analysis could not start (%s)." % error)

    try:
        stdout, _ = process.communicate(payload, timeout=TIMEOUT_SECONDS)
    except subprocess.TimeoutExpired:
        try:
            if os.name == "nt":
                system_root = os.environ.get("SystemRoot")
                if not system_root:
                    raise OSError("SystemRoot is unavailable")
                subprocess.run(
                    [
                        os.path.join(system_root, "System32", "taskkill.exe"),
                        "/PID",
                        str(process.pid),
                        "/T",
                        "/F",
                    ],
                    stdin=subprocess.DEVNULL,
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    timeout=1,
                    check=False,
                )
            else:
                os.killpg(process.pid, signal.SIGKILL)
        except (OSError, subprocess.SubprocessError):
            pass
        try:
            process.communicate(timeout=1)
        except (OSError, subprocess.SubprocessError):
            pass
        return _block("analysis timed out after %ss." % TIMEOUT_SECONDS)

    if process.returncode != 0:
        return _block("analysis exited with status %s." % process.returncode)

    directive = (stdout or "").strip()
    if not directive:
        return None

    try:
        parsed = json.loads(directive)
    except ValueError:
        return _block("analysis returned unreadable output.")

    if isinstance(parsed, dict) and parsed.get("action") == "block":
        message = parsed.get("message")
        if isinstance(message, str) and message:
            return parsed
    return _block("analysis returned an unexpected directive.")


def register(ctx):
    ctx.register_hook("pre_tool_call", _pre_tool_call)
`}function Mn(I){return[{name:"__init__.py",content:z2(I)},{name:"plugin.yaml",content:V2(I)}]}import{mkdirSync as J2,readdirSync as W2,readFileSync as K2,rmSync as jo}from"node:fs";import{join as rn}from"node:path";var Y2="__pycache__";function No(I){let q=I.env.get("HERMES_HOME")?.trim();return q?q:rn(I.home,".hermes")}function Mo(I){return rn(No(I),"plugins",$t)}function Ho(I){return I.startsWith(Fo)}function Uo(I,q){let Q=Mo(I),te=Lt(Q);if(te&&(te.isSymbolicLink()||!te.isDirectory()))throw Error(`Refusing to ${q} ${Q}: not a regular directory. Move or remove it and rerun ${q==="install"?"install":"uninstall"} --hermes-agent.`);return Q}function Ma(I,q){let Q=Lt(I);if(!Q)return;if(Q.isSymbolicLink()||!Q.isFile())throw Error(`Refusing to ${q} ${I}: not a regular file. Move or remove it.`);let te=K2(I,"utf-8");if(!Ho(te))throw Error(`Refusing to ${q} unmanaged file at ${I}. Move or remove it.`);return te}function Ha(I){let q=Uo(I,"install"),Q=Mn(wt());if(Q.map((ne)=>Ma(rn(q,ne.name),"overwrite")).every((ne,ae)=>ne===Q[ae]?.content))return{path:q,alreadyInstalled:!0};return J2(q,{recursive:!0}),Q.forEach((ne)=>{kt(rn(q,ne.name),ne.content)}),{path:q,alreadyInstalled:!1}}function Go(I){let q=Uo(I,"remove");if(!Lt(q))return[];return Mn(wt()).filter((Q)=>Ma(rn(q,Q.name),"remove")!==void 0)}function Ua(I){let q=Uo(I,"remove");if(!Lt(q))return{path:q,alreadyInstalled:!1};let Q=Go(I);if(Q.forEach((te)=>{jo(rn(q,te.name))}),jo(rn(q,Y2),{recursive:!0,force:!0}),W2(q).length===0)jo(q,{recursive:!0});return{path:q,alreadyInstalled:Q.length>0}}var Dr="hermes-agent",Ga=/^([^\s#][^:]*):/,Z2=/^\s+([A-Za-z_][\w-]*):/,Ba=/^\s+-\s*(.*)$/;function X2(I){return I.trim().replace(/^(["'])(.*)\1$/,"$2")}function Q2(I){let q=I.split(/\r?\n/),Q=q.findIndex((ae)=>Ga.exec(ae)?.[1]?.trim()==="plugins");if(Q===-1)return[];let te=q.slice(Q+1),ne=te.findIndex((ae)=>Ga.test(ae));return ne===-1?te:te.slice(0,ne)}function qa(I,q){let Q=Q2(I),te=Q.findIndex((le)=>Z2.exec(le)?.[1]===q);if(te===-1)return[];let ne=Q.slice(te+1),ae=ne.findIndex((le)=>!Ba.test(le));return(ae===-1?ne:ne.slice(0,ae)).map((le)=>X2(Ba.exec(le)?.[1]??""))}function ef(I){try{return Va(za(No(I),"config.yaml"),"utf-8")}catch{return}}function Bo(I){let q=ef(I)??"";return qa(q,"enabled").includes($t)&&!qa(q,"disabled").includes($t)}function Ja(I){return/^# version:\s*(.+)$/m.exec(I)?.[1]?.trim()}function tf(I,q){let Q=Lt(I);if(!Q)return{error:`${q.name} is missing from ${I}; run install --hermes-agent`};if(Q.isSymbolicLink()||!Q.isFile())return{error:`${I} is a symlink or not a regular file; move or remove it`};try{let te=Va(I,"utf-8");if(!Ho(te))return{error:`Unmanaged ${q.name} occupies ${I}; move or remove it`};if(Ja(te)===wt()&&te!==q.content)return{error:`Modified ${q.name} occupies ${I}; run install --hermes-agent to restore it`};return{content:te}}catch(te){return{error:`Failed to read ${I}: ${te instanceof Error?te.message:String(te)}`}}}function Wa(I){let q=Mo(I.environment),Q=fr(Dr,q);if(Q)return Q;let te=Mn(wt()).map((ye)=>tf(za(q,ye.name),ye)),ne=te.flatMap((ye)=>("error"in ye)?[ye.error]:[]);if(ne.length>0)return{platform:Dr,status:"n/a",configPath:q,errors:ne};let ae=te.some((ye)=>("content"in ye)&&Ja(ye.content)!==wt()),le=ae?["Installed Hermes Agent plugin is outdated; run install --hermes-agent to update"]:[];if(!Bo(I.environment))return{platform:Dr,status:"disabled",method:"plugin directory",configPath:q,errors:[`${$t} is not enabled in Hermes; run \`hermes plugins enable ${$t}\``,...le]};return{platform:Dr,status:"configured",method:"plugin directory",configPath:q,errors:ae?le:void 0}}import{existsSync as nf,readFileSync as rf}from"node:fs";import{join as Ka}from"node:path";var of=/cc-safety-net\s+hook\s+(?:[^\s]+\s+)*--kimi-code(\s|["']|$)/;function sf(I){return Ka(I.env.get("KIMI_CODE_HOME")||Ka(I.home,".kimi-code"),"config.toml")}function Hn(I){let q=sf(I.environment);if(!nf(q))return{platform:"kimi-code",status:"n/a",configPath:q};try{if(!of.test(rf(q,"utf-8")))return{platform:"kimi-code",status:"n/a",configPath:q}}catch(Q){return{platform:"kimi-code",status:"n/a",configPath:q,errors:[`Failed to read ${q}: ${Q instanceof Error?Q.message:String(Q)}`]}}return{platform:"kimi-code",status:"configured",method:"hook config",configPath:q}}import{readFileSync as ol}from"node:fs";import{join as Gn}from"node:path";var vt="cc-safety-net",Ot="index.js",vn="openclaw.plugin.json",bn="package.json";var Ar="// cc-safety-net managed OpenClaw plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --openclaw";import{existsSync as cf,lstatSync as df,readdirSync as uf,readFileSync as pf}from"node:fs";import{dirname as Za,join as Vt}from"node:path";import{fileURLToPath as ff}from"node:url";import{spawn as af}from"node:child_process";function lf(I){return I.join(" ")}function qo(I,q,Q){return[`Failed to run ${lf(I)}${q===null?"":` (exit ${q})`}.`,Q.trim()].filter(Boolean).join(`
`)}function Vo(I){let q={stdout:"",stderr:""};return I.stdout.setEncoding("utf-8"),I.stderr.setEncoding("utf-8"),I.stdout.on("data",(Q)=>{q.stdout+=Q}),I.stderr.on("data",(Q)=>{q.stderr+=Q}),q}function Ut(I,q){return new Promise((Q,te)=>{let ne=tn([...I],process.env),ae=af(ne.cmd,ne.args,{stdio:["ignore","pipe","pipe"]}),le=Vo(ae),ye=()=>[le.stdout,le.stderr].filter(Boolean).join(`
`),ve=q?.timeoutMs??120000,be=setTimeout(()=>{ae.kill(),te(Error(qo(I,null,`Timed out after ${ve}ms.
${ye()}`.trim())))},ve);ae.on("error",(Ce)=>{clearTimeout(be),te(Error(qo(I,null,`${Ce.message}
${ye()}`.trim())))}),ae.on("close",(Ce)=>{if(clearTimeout(be),Ce!==0){te(Error(qo(I,Ce,ye())));return}Q(q?.stdoutOnly?le.stdout:ye())})})}async function zo(I){for(let q of I)await Ut(q)}async function Ya(I){for(let q of I)try{await Ut(q)}catch(Q){console.warn(Q instanceof Error?Q.message:String(Q))}}var Jo=Vt("openclaw",vt),mf=[Ot,vn,bn];function Wo(I,q){if(I==="~")return q;if(I.startsWith("~/")||I.startsWith("~\\"))return Vt(q,I.slice(2));return I}function Xa(I){let q=I.env.get("OPENCLAW_STATE_DIR")?.trim();if(q)return Wo(q,I.home);let Q=I.env.get("OPENCLAW_CONFIG_PATH")?.trim();return Q?Za(Wo(Q,I.home)):Vt(I.home,".openclaw")}function Qa(I){let q=I.env.get("OPENCLAW_CONFIG_PATH")?.trim();return q?Wo(q,I.home):Vt(Xa(I),"openclaw.json")}function Ko(I){return Vt(Xa(I),"extensions",vt)}function gf(I){let q=uf(I);if(q.length===0)return!0;if(q.some((ne)=>!mf.includes(ne)))return!1;let Q=Vt(I,Ot),te=Lt(Q);return te!==void 0&&!te.isSymbolicLink()&&te.isFile()&&pf(Q,"utf-8").startsWith(Ar)}function Yo(I){let q=Ko(I),Q=Lt(q);if(!Q)return;if(!Q.isSymbolicLink()&&Q.isDirectory()&&gf(q))return;throw Error(`Refusing to modify ${q}: it does not hold a cc-safety-net managed OpenClaw plugin. Move or remove it, then run the command again.`)}function el(){let I=Za(ff(import.meta.url));return[Vt(I,Jo),Vt(I,"..",Jo),Vt(I,"..","..","..","dist",Jo)]}function Zo(I=el()){return I.find((q)=>cf(q)&&df(q).isDirectory())}function yf(I=el()){let q=Zo(I);if(!q)throw Error("Packaged OpenClaw plugin directory not found. Reinstall cc-safety-net and try again.");return q}function tl(I=yf()){return[["openclaw","plugins","install",I,"--force"],["openclaw","plugins","enable",vt]]}function hf(I){let q=(()=>{try{return JSON.parse(I)}catch{return}})(),Q=mt(mt(q,"plugin"),"status");return typeof Q==="string"?Q:void 0}async function nl(){let I=hf(await Ut(["openclaw","plugins","inspect",vt,"--runtime","--json"],{stdoutOnly:!0}));if(I==="loaded")return;throw Error(`${I===void 0?`The ${vt} plugin's load state could not be verified: OpenClaw's runtime inspect report was unreadable.`:`OpenClaw reports the ${vt} plugin with status "${I}".`} Run \`openclaw plugins inspect ${vt} --runtime\` for details.`)}var _r="openclaw",Un=`run \`openclaw plugins enable ${vt}\``;function Ln(I,q){let Q=Gn(I,q),te=Lt(Q);if(!te)return{error:`${q} is missing from ${Q}; run install --openclaw`};if(te.isSymbolicLink()||!te.isFile())return{error:`${Q} is a symlink or not a regular file; move or remove it`};try{return{content:ol(Q,"utf-8")}}catch(ne){return{error:`Failed to read ${Q}: ${ne instanceof Error?ne.message:String(ne)}`}}}function il(I){try{return JSON.parse(_t(I))}catch{return}}function vf(I){let q=Ln(I,vn);if("error"in q)return q.error;if(mt(il(q.content),"id")===vt)return;return`${Gn(I,vn)} is not a valid ${vt} manifest; run install --openclaw`}function bf(I){let q=Ln(I,bn);if("error"in q)return q.error;let Q=mt(mt(il(q.content),"openclaw"),"extensions");if(Array.isArray(Q)&&Q.includes(`./${Ot}`))return;return`${Gn(I,bn)} does not point OpenClaw at ${Ot}; run install --openclaw`}function rl(I){return Array.isArray(I)?I.filter((q)=>typeof q==="string"):[]}function Lf(I){let q=Qa(I);if(!Lt(q))return`${vt} is not enabled; ${Un}`;let Q=(()=>{try{return JSON.parse(_t(ol(q,"utf-8")))}catch{return}})();if(Q===void 0)return`Failed to read ${q}; fix it, then ${Un}`;let te=mt(Q,"plugins");if(mt(te,"enabled")===!1)return`plugins.enabled is false in ${q}; no OpenClaw plugin loads`;let ne=mt(mt(mt(te,"entries"),vt),"enabled");if(rl(mt(te,"deny")).includes(vt)||ne===!1)return`${vt} is disabled in ${q}; ${Un}`;let ae=rl(mt(te,"allow"));if(ae.length>0&&!ae.includes(vt))return`plugins.allow in ${q} does not list ${vt}; add it, then ${Un}`;if(ae.includes(vt)||ne===!0)return;return`${vt} is not enabled; ${Un}`}function sl(I){return/^\/\/ version:\s*(.+)$/m.exec(I)?.[1]?.trim()}function wf(I,q,Q){if(Q===void 0)return[];let te=Ln(Q,Ot);if("error"in te||sl(te.content)!==q)return[];return[Ot,vn,bn].flatMap((ne)=>{let ae=Ln(I,ne),le=Ln(Q,ne);if("error"in ae||"error"in le||ae.content===le.content)return[];return[`Modified ${ne} occupies ${Gn(I,ne)}; run install --openclaw to restore it`]})}function al(I){let q=Ko(I.environment),Q=fr(_r,q);if(Q)return Q;let te=Ln(q,Ot),ae=["error"in te?te.error:te.content.startsWith(Ar)?void 0:`Unmanaged ${Ot} occupies ${Gn(q,Ot)}; move or remove it`,vf(q),bf(q)].filter((Ce)=>Ce!==void 0),le="content"in te?sl(te.content):void 0,ye=ae.length>0?ae:wf(q,le,Zo());if(ye.length>0)return{platform:_r,status:"n/a",configPath:q,errors:ye};let ve=le===wt()?[]:["Installed OpenClaw plugin is outdated; run install --openclaw to update"],be=Lf(I.environment);if(be)return{platform:_r,status:"disabled",method:"plugin directory",configPath:q,errors:[be,...ve]};return{platform:_r,status:"configured",method:"plugin directory",configPath:q,errors:ve.length>0?ve:void 0}}import{existsSync as Ef,readFileSync as Df}from"node:fs";import{join as Af}from"node:path";import{existsSync as Xo,readFileSync as dl,rmSync as kf}from"node:fs";import{join as zt}from"node:path";import{pathToFileURL as xf}from"node:url";var Tr="cc-safety-net",ul=`${Tr}@latest`,pl=["opencode.json","opencode.jsonc"],ll="CCSafetyNetPlugin",cl={stringError:"Unterminated string in OpenCode config",bracketError:"Unmatched plugin array in OpenCode config"};function $r(I){return zt(I.env.get("XDG_CONFIG_HOME")||zt(I.home,".config"),"opencode")}function Cf(I){return zt($r(I),pl[0])}function Sf(I){return pl.map((q)=>zt($r(I),q))}function fl(I){return zt(I.env.get("XDG_CACHE_HOME")||zt(I.home,".cache"),"opencode","packages",ul)}function Qo(I){kf(fl(I),{recursive:!0,force:!0})}async function ml(I){let q=zt(fl(I),"node_modules",Tr),Q=zt(q,"package.json");if(!Xo(Q))throw Error(`The OpenCode plugin cache at ${q} is missing its package, so OpenCode would load nothing and fail open. Run \`opencode plugin -g -f ${ul}\` for details.`);let te=mt(JSON.parse(dl(Q,"utf-8")),"main");if(typeof te!=="string")throw Error(`The cached OpenCode plugin at ${q} declares no "main" entry.`);let ne=zt(q,te);if(typeof(await import(xf(ne).href))[ll]==="function")return;throw Error(`The cached OpenCode plugin at ${ne} does not export a callable ${ll}, so OpenCode would load nothing and fail open.`)}function gl(I,q){try{return JSON.parse(_t(I))}catch(Q){if(Q instanceof SyntaxError)throw Error(`Failed to parse OpenCode config ${q}: ${Q.message}`);throw Q}}function Rf(I){if(!I||typeof I!=="object"||Array.isArray(I))return!1;let q=I.plugin;if(!Array.isArray(q))return!1;return q.some((Q)=>typeof Q==="string"&&Q.includes(Tr))}function Pf(I,q){let Q=sa(I,"plugin",cl);if(!Q)throw Error(`Failed to locate OpenCode plugin array in ${q}`);let te=aa(I,Q,cl.stringError).filter((ne)=>ne.value.includes(Tr)).map((ne)=>ne.range).reverse().reduce(yr,I);return gl(te,q),te}function yl(I){Qo(I);let q=Sf(I),Q=q.find((ne)=>Xo(ne)),te=[];for(let ne of q){if(!Xo(ne))continue;try{let ae=dl(ne,"utf-8");if(!Rf(gl(ae,ne)))continue;return kt(ne,Pf(ae,ne)),{path:ne,alreadyInstalled:!0}}catch(ae){te.push(ae instanceof Error?ae.message:String(ae))}}if(te.length>0)throw Error(te.join(`
`));return{path:Q??Cf(I),alreadyInstalled:!1}}function hl(I){let q=[],Q=$r(I.environment),te=["opencode.json","opencode.jsonc"];for(let ne of te){let ae=Af(Q,ne);if(Ef(ae))try{let le=Df(ae,"utf-8"),ye=_t(le);if((JSON.parse(ye).plugin??[]).some((Ee)=>Ee.includes("cc-safety-net")))return{platform:"opencode",status:"configured",method:"plugin array",configPath:ae,errors:q.length>0?q:void 0}}catch(le){q.push(`Failed to parse ${ne}: ${le instanceof Error?le.message:String(le)}`)}}return{platform:"opencode",status:"n/a",errors:q.length>0?q:void 0}}import{join as _f}from"node:path";function ei(I){return _f(I.home,".pi","agent","settings.json")}function ti(I){if(typeof I!=="string")return!1;return I==="npm:cc-safety-net"||I.startsWith("npm:cc-safety-net@")}function vl(I){let q=ei(I.environment),Q=Mt(q);if(Q.kind==="unreadable")return{platform:"pi",status:"not-inspected"};if(Q.kind==="missing")return{platform:"pi",status:"n/a"};let te=mt(Q.value,"packages");if(!Array.isArray(te))return{platform:"pi",status:"n/a"};let ne=te.find((ye)=>ti(typeof ye==="string"?ye:mt(ye,"source")));if(ne===void 0)return{platform:"pi",status:"n/a"};let ae=mt(ne,"extensions");if(Array.isArray(ae)&&ae.some((ye)=>typeof ye==="string"&&ye.startsWith("-")))return{platform:"pi",status:"disabled",method:"package config",configPath:q,errors:["npm:cc-safety-net is installed but its extension is disabled in Pi settings"]};return{platform:"pi",status:"configured",method:"package config",configPath:q}}var Tf={amp:Zs,"antigravity-cli":Xs,"claude-code":na,codex:ra,"copilot-cli":va,cursor:Ra,"gemini-cli":Pa,goose:$a,"grok-build":ja,"hermes-agent":Wa,"kimi-code":Hn,openclaw:al,opencode:hl,pi:vl};function wn(I,q,Q){let te={...Q,cwd:q,environment:I};return er.map((ne)=>$f(Tf[ne](te)))}function $f(I){if(I.status==="not-inspected")return{platform:I.platform,detected:!1,configured:!1,inspectionStatus:"not-inspected"};return{platform:I.platform,detected:I.status!=="n/a",configured:I.status==="configured",inspectionStatus:I.status!=="n/a"?"verified":I.errors&&I.errors.length>0?"failed":"not-applicable",method:I.method,configPath:I.configPath,configPaths:I.configPaths,errors:I.errors}}import{join as If}from"node:path";var Of=Object.freeze([{command:"git reset --hard",description:"git reset --hard",expectBlocked:!0},{command:"rm -rf /",description:"rm -rf /",expectBlocked:!0},{command:"rm -rf ./node_modules",description:"rm in cwd (safe)",expectBlocked:!1}]),Ff=Object.freeze({state:"ready",diagnostics:Object.freeze([]),ruleMetadata:Object.freeze({}),policy:Object.freeze({rules:Object.freeze([]),transparentWrappers:Object.freeze([]),safety:Object.freeze({}),worktreeMode:!1,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:Object.freeze({}),destructiveCommandAllowPaths:Object.freeze([]),secretProtection:Object.freeze({enabled:!0,disabledRules:Object.freeze([]),denyPaths:Object.freeze([]),allowPaths:Object.freeze([])})})}),jf={strict:!1,paranoidRm:!1,paranoidInterpreters:!1,worktreeMode:!1,effectiveLevel:"standard",capabilities:{fail_closed:{enabled:!1,source:"preset",sources:[]},paranoid_rm:{enabled:!1,source:"preset",sources:[]},paranoid_interpreters:{enabled:!1,source:"preset",sources:[]}}};function bl(I){let q=If(I.tmpdir,"cc-safety-net-self-test"),Q=Of.map((te)=>{let ne=F(I,u("self-test",{command:te.command},{kind:"command",shell:"auto"},{configCwd:q,executionCwd:q},te.command),{guard:{dependencies:{loadPolicySnapshot:()=>Ff,getModes:()=>jf,findPolicyMutation:()=>null}},audit:{agent:"self-test",getSessionId:()=>{return}}}),ae=te.expectBlocked?"blocked":"allowed",le=ne.decision.kind==="deny"?"blocked":"allowed";return{command:te.command,description:te.description,expected:ae,actual:le,passed:ae===le,reason:ne.decision.kind==="deny"?ne.decision.reason:void 0,ruleId:ne.decision.kind==="deny"?ne.decision.ruleId:void 0}});return{passed:Q.filter((te)=>te.passed).length,failed:Q.filter((te)=>!te.passed).length,total:Q.length,results:Q}}function ni(I){let q=xt({label:"doctor",booleans:{json:["--json"],skipUpdateCheck:["--skip-update-check"]}},I);if(qt(q.errors))return null;return{json:q.flags.json,skipUpdateCheck:q.flags.skipUpdateCheck}}async function Ll(I,q={}){let Q=await Tn(!q.json,()=>{let te=Nf(I,q);return{ready:te,finish:()=>te}},()=>_n(),{loadingMessage:"Checking system status…"});if(q.json)console.log(JSON.stringify(Q,null,2));else Mf(Q);return Q.engineSelfTest.failed>0||Q.findings.some((te)=>te.severity==="error")?1:0}async function Nf(I,q){let Q=q.cwd??process.cwd(),te=await An(),ne=wn(I,Q,{ampPluginListOutput:te.ampPluginListOutput,codexPluginListOutput:te.codexPluginListOutput,copilotCliVersion:te.versions["copilot-cli"]}),ae=fs(I,Q),le=ms(I),ye=L(I,{cwd:Q}),ve=ye.policy,be=R(ve,I.env),Ce=U(ve,be.capabilities),Ee=or(I,7),Ie=zs(I,Q),et=q.skipUpdateCheck?{currentVersion:wt(),latestVersion:null,updateAvailable:!1}:await Zt(),Xe={hooks:ne,engineSelfTest:bl(I),userConfig:ae.userConfig,projectConfig:ae.projectConfig,configState:Ne(ye),effectiveRules:ae.effectiveRules,shadowedRules:ae.shadowedRules,environment:le,effectiveSafety:{selectedPreset:ve.safety.level??"standard",level:be.effectiveLevel,capabilities:be.capabilities,ruleOverrides:ve.destructiveCommandRuleOverrides,weakenedRuleOverrides:Object.entries(Ce).filter(([,at])=>at.source==="rule_override"&&at.override==="off"&&at.inheritedEnabled&&at.changesInherited).map(([at])=>at),ruleCounts:{stored:Object.keys(ve.destructiveCommandRuleOverrides).length,effective:Object.values(Ce).filter((at)=>at.changesInherited).length},...ye.policyScopes?{policyScopes:ye.policyScopes}:{}},...Ie.length>0?{v2Leftovers:Ie}:{},posture:Es(I,ae.userConfig.path),activity:Ee,update:et,system:te};return{...Xe,findings:ys(Xe)}}function Mf(I){console.log(),console.log(vs(I.hooks)),console.log(),console.log(bs(I.engineSelfTest)),console.log(),console.log(Ls(I)),console.log(),console.log(ws(I.environment)),console.log(),console.log(ks(I)),console.log(),console.log(xs(I.findings)),console.log(),console.log(Cs(I.activity)),console.log(),console.log(Rs(I.system)),console.log(),console.log(Ss(I.update)),console.log(Ps(I))}import{existsSync as Hf}from"node:fs";var Uf=/^[A-Za-z0-9_@%+=:,./-]+$/,wl="Usage: cc-safety-net explain [--json] [--cwd <path>] <command>";function ri(I){let q=xt({label:"explain",booleans:{json:["--json"]},values:{cwd:["--cwd"]},positionals:"tail"},I);if(qt(q.errors))return console.error(wl),console.error("Pass -- before a command that starts with dashes."),null;if(q.values.cwd!==void 0&&!Hf(q.values.cwd))return console.error(`Error: --cwd path does not exist: ${q.values.cwd}`),null;let Q=q.positionals.length===1?q.positionals[0]:q.positionals.map((te)=>Uf.test(te)?te:`'${te.replaceAll("'","'\\''")}'`).join(" ");if(!Q)return console.error("Error: No command provided"),console.error(wl),null;return{json:q.flags.json,cwd:q.values.cwd,command:Q}}function kl(I){if(I)return{dh:"=",dv:"|",dtl:"+",dtr:"+",dbl:"+",dbr:"+",h:"-",v:"|",tl:"+",tr:"+",bl:"+",br:"+",sh:"="};return{dh:"═",dv:"║",dtl:"╔",dtr:"╗",dbl:"╚",dbr:"╝",h:"─",v:"│",tl:"┌",tr:"┐",bl:"└",br:"┘",sh:"━"}}function xl(I,q){let te=q-18;return[`${I.dtl}${I.dh.repeat(q)}${I.dtr}`,`${I.dv}  Command Analysis${" ".repeat(te)}${I.dv}`,`${I.dbl}${I.dh.repeat(q)}${I.dbr}`]}function oi(I){return JSON.stringify(I)}function Cl(I,q=0){return`[${I.map((te,ne)=>hs(te,ne,q)).join(",")}]`}function Bn(I,q,Q=70){let te=I.split(" "),ne=[],ae="";for(let le of te)if(ae&&ae.length+le.length+1>Q)ne.push(ae),ae=le;else ae=ae?`${ae} ${le}`:le;if(ae)ne.push(ae);return ne.map((le,ye)=>ye===0?le:`${q}${le}`)}function Sl(I,q,Q){let te=[];switch(I.type){case"parse":return null;case"env-strip":return te.push(""),te.push(`STEP ${q} ${Q.h} Strip environment variables`),te.push(`  Removed: ${I.envVars.map((ne)=>`${ne}=<redacted>`).join(", ")}`),te.push(`  Tokens:  ${oi(I.output)}`),{lines:te,incrementStep:!0};case"leading-tokens-stripped":return te.push(""),te.push(`STEP ${q} ${Q.h} Strip wrappers`),te.push(`  Removed: ${I.removed.join(", ")}`),te.push(`  Tokens:  ${oi(I.output)}`),{lines:te,incrementStep:!0};case"shell-wrapper":return te.push(""),te.push(`STEP ${q} ${Q.h} Detect shell wrapper`),te.push(`  Wrapper: ${I.wrapper} -c`),te.push(`  Inner:   ${I.innerCommand}`),{lines:te,incrementStep:!0};case"interpreter":{if(te.push(""),te.push(`STEP ${q} ${Q.h} Detect interpreter`),te.push(`  Interpreter: ${I.interpreter}`),te.push(`  Code:        ${I.codeArg}`),I.paranoidBlocked)te.push("  Result:      ✗ BLOCKED (paranoid mode)");return{lines:te,incrementStep:!0}}case"busybox":return te.push(""),te.push(`STEP ${q} ${Q.h} Busybox wrapper`),te.push(`  Subcommand: ${I.subcommand}`),{lines:te,incrementStep:!0};case"transparent-wrapper":return te.push(""),te.push(`STEP ${q} ${Q.h} Transparent wrapper`),te.push(`  Wrapper: ${I.wrapper}`),te.push(`  Tokens:  ${oi(I.output)}`),{lines:te,incrementStep:!0};case"recurse":return{lines:[],incrementStep:!1};case"rule-check":{if(te.push(""),te.push(`STEP ${q} ${Q.h} Match rules`),te.push(`  Rule:   ${I.rule}()`),I.matched)te.push("  Result: MATCHED");else te.push("  Result: No match");return{lines:te,incrementStep:!0}}case"worktree-relaxation":return te.push(""),te.push(`STEP ${q} ${Q.h} Worktree relaxation`),te.push(`  Mode:   ${i.worktree.name}`),te.push(`  Git cwd: ${I.gitCwd}`),te.push("  Result: Allowed local discard in linked worktree"),{lines:te,incrementStep:!0};case"tmpdir-check":return null;case"fallback-scan":{if(I.embeddedCommandFound)return te.push(""),te.push(`STEP ${q} ${Q.h} Fallback scan`),te.push(`  Found: ${I.embeddedCommandFound}`),{lines:te,incrementStep:!0};return null}case"custom-rules-check":{if(I.rulesChecked){if(te.push(""),te.push(`STEP ${q} ${Q.h} Custom rules`),I.matched)te.push("  Result: MATCHED");else te.push("  Result: No match");return{lines:te,incrementStep:!0}}return null}case"cwd-change":return null;case"dangerous-text":{if(I.matched)return te.push(""),te.push(`STEP ${q} ${Q.h} Dangerous text check`),te.push(`  Token:  ${I.token}`),te.push("  Result: MATCHED"),{lines:te,incrementStep:!0};return null}case"strict-unparseable":return te.push(""),te.push(`STEP ${q} ${Q.h} Strict mode check`),te.push(`  Command: ${I.rawCommand}`),te.push("  Result:  ✗ UNPARSEABLE"),{lines:te,incrementStep:!0};case"segment-skipped":return null;case"error":return te.push(""),te.push(`ERROR: ${I.message}`),{lines:te,incrementStep:!1};default:return I}}function ii(I,q){let Q=kl(q?.asciiOnly??!1),te=58,ne=[],ae=1;ne.push(...xl(Q,58)),ne.push("");let le=I.trace.steps.find((Xe)=>Xe.type==="error");if(le&&le.type==="error"){ne.push("ERROR"),ne.push(`  ${le.message}`),ne.push(""),ne.push("RESULT"),ne.push(`  Status: ${I.result==="blocked"?ut.red("BLOCKED"):ut.green("ALLOWED")}`),ne.push(""),ne.push("CONFIG");let Xe=I.configSource??"none";return ne.push(`  Path: ${Xe}`),ne.join(`
`)}let ye=I.trace.steps.find((Xe)=>Xe.type==="parse");if(ye&&ye.type==="parse"){ne.push("INPUT"),ne.push(`  ${ye.input}`),ne.push(""),ne.push(`STEP ${ae} ${Q.h} Split shell commands`),ae++;for(let Xe=0;Xe<ye.segments.length;Xe++){let at=ye.segments[Xe];if(at){let ct=Math.random();ne.push(`  Segment ${Xe+1}: ${Cl(at,ct)}`)}}}let ve=I.trace.segments,be=ve.length>1;for(let Xe of ve){if(be){ne.push("");let ft="";if(ye&&ye.type==="parse"){let ro=ye.segments[Xe.index];if(ro)ft=ro.join(" ")}let dt=54,gt=ft,pt=` Segment ${Xe.index+1}: `,bt=" ";if(ft){if(pt.length+ft.length+bt.length>dt){let Yd=dt-pt.length-bt.length;gt=`${ft.substring(0,Yd-1)}…`}}let Dt=ft?`${pt}${gt}${bt}`:` Segment ${Xe.index+1} `,Wd=ft?`${pt}${ut.cyan(gt)}${bt}`:Dt,Gi=58-Dt.length,Bi=Math.floor(Gi/2),Kd=Gi-Bi;ne.push(`${Q.sh.repeat(Bi)}${Wd}${Q.sh.repeat(Kd)}`)}if(Xe.steps.find((ft)=>ft.type==="segment-skipped")){ne.push(""),ne.push("  (skipped — prior segment blocked)");continue}let ct=!1,lt=!1;for(let ft of Xe.steps){let dt=Sl(ft,ae,Q);if(dt){if(lt=!0,ft.type==="recurse"){ne.push("");let gt=" RECURSING ",pt=58-gt.length-4;ne.push(`  ${Q.tl}${Q.h}${gt}${Q.h.repeat(pt)}`),ne.push(`  ${Q.v}`),ct=!0;continue}for(let gt of dt.lines)if(ct)ne.push(`  ${Q.v} ${gt}`);else ne.push(gt);if(dt.incrementStep)ae++}}if(ct)ne.push(`  ${Q.v}`),ne.push(`  ${Q.bl}${Q.h.repeat(56)}`),ct=!1;if(!lt)ne.push(""),ne.push(`  ${ut.green("✓")} Allowed (no matching rules)`)}if(ne.push(""),ne.push("RESULT"),I.result==="blocked"){if(ne.push(`  Status: ${ut.red("BLOCKED")}`),I.customRule){if(ne.push(`  Rule: ${I.customRule.id}`),I.customRule.rulebook)ne.push(`  Rulebook: ${I.customRule.rulebook.name} ${I.customRule.rulebook.version}`);if(I.customRule.source)ne.push(`  Source: ${I.customRule.source}`);if(I.customRule.override)ne.push(`  Override: reason ${I.customRule.override.reason}`)}if(I.reason){let Xe=Bn(I.reason,"          ");ne.push(`  Reason: ${Xe[0]}`);for(let at=1;at<Xe.length;at++)ne.push(Xe[at]??"")}}else ne.push(`  Status: ${ut.green("ALLOWED")}`);ne.push(""),ne.push("CONFIG");let Ce=I.configSource??"none",Ee=I.configValid?"":" (invalid)";ne.push(`  Path: ${Ce}${Ee}`);let Ie=I.safetyPresetScope;ne.push(`  Safety preset: ${I.selectedPreset??"standard"}${Ie?` (${sr(Ie)})`:""}`),ne.push(`  Effective capabilities: ${I.effectiveLevel}`);let et=Object.entries(I.destructiveCommandRuleOverrides??{});if(ne.push(`  Rule customizations: ${et.length}`),I.ruleActivation)ne.push(`  Rule activation: ${I.ruleActivation.id} — ${I.ruleActivation.enabled?"on":"off"} via ${I.ruleActivation.source}`);return ne.join(`
`)}function si(I){return JSON.stringify(I,null,2)}import{resolve as zf}from"node:path";var Gf=["AKIA","ASIA","ghp_","gho_","ghu_","ghs_","ghr_","github_pat_","glpat-","xox","npm_","pypi-","rk_","sk-","sk_","gsk_","xai-","pplx-","bastn_","tgp_v1_","flp_","wfr_","fw_","fwp_","tp-","psk-"];function Rl(I){let q=0,Q={allocateSegment(){return q++},getNextSegmentIndex(){return q},recordGlobal(te){I.record({kind:"step",scope:"global",step:te})},recordSegment(te,ne=Q.currentSegmentIndex){if(ne===void 0)return;I.record({kind:"step",scope:"segment",segmentIndex:ne,step:te})}};return Q}function Pl(I={}){let q=[],Q=I.maxEvents??512,te={maxTextLength:I.maxTextLength??2048,maxListLength:I.maxListLength??128,maxObjectProperties:I.maxObjectProperties??I.maxListLength??128,maxDepth:I.maxDepth??16},ne,ae=new Set;return{record(le){if(ne)return;if(!le||q.length>=Q)return;try{q.push(ci(Bf(le,te,ae)))}catch{}},finish(){if(ne)return ne;return ne=ci({events:Object.freeze(q)}),ne}}}function Bf(I,q,Q){if(I.kind!=="step")throw TypeError("invalid trace event");let{scope:te,step:ne}=I;Ir(ne,Q,q);let ae=ai(ne,q,Q);if(te==="global")return{kind:"step",scope:"global",step:ae};if(te!=="segment")throw TypeError("invalid trace event scope");return{kind:"step",scope:"segment",segmentIndex:I.segmentIndex,step:ae}}function Ir(I,q,Q,te=0,ne=new WeakSet){if(typeof I==="string"){let ye=I.slice(0,Q.maxTextLength);if(!He(ye))return;for(let ve of Ze(ye))for(let be of ve.match(/[^\s"'()$]+/g)??[])q.add(El(be));return}if(!I||typeof I!=="object"||te>=Q.maxDepth||ne.has(I))return;if(ne.add(I),Array.isArray(I)){let ye=Math.min(I.length,Q.maxListLength);for(let ve=0;ve<ye;ve++)Ir(I[ve],q,Q,te+1,ne);return}let ae=0,le=new Set;for(let ye in I){if(!Object.hasOwn(I,ye))continue;if(ae>=Q.maxObjectProperties)break;ae++,Ir(ye,q,Q);let ve=li(ye,Q,q);if(le.has(ve))continue;le.add(ve),Ir(I[ye],q,Q,te+1,ne)}}function ai(I,q,Q,te=0,ne=new WeakSet){if(typeof I==="string")return li(I,q,Q);if(!I||typeof I!=="object")return I;if(te>=q.maxDepth)return;if(ne.has(I))return;if(ne.add(I),Array.isArray(I)){let ye=[],ve=Math.min(I.length,q.maxListLength);for(let be=0;be<ve;be++)ye.push(ai(I[be],q,Q,te+1,ne));return ye}let ae={},le=0;for(let ye in I){if(!Object.hasOwn(I,ye))continue;if(le>=q.maxObjectProperties)break;le++;let ve=li(ye,q,Q);if(Object.hasOwn(ae,ve))continue;Object.defineProperty(ae,ve,{value:ai(I[ye],q,Q,te+1,ne),enumerable:!0,configurable:!0,writable:!0})}return ae}function li(I,q,Q){let te=I.slice(0,q.maxTextLength),ne=He(te)?Ge(te):te,ae=Q.size>0?Vf(ne,Q):ne;return(qf(ae)?ke(ae):ae).slice(0,q.maxTextLength)}function qf(I){return I.includes("PRIVATE KEY")||I.includes("://")||I.includes("eyJ")||I.includes(":")&&/(?:authorization|cookie|x-api-key|api-key|(?:^|\s)(?:-u|--user)(?:\s|=))/i.test(I)||I.length>=14&&Gf.some((q)=>I.includes(q))||I.length>=49&&/\b[a-f0-9]{32}\.[A-Za-z0-9]{16}\b/.test(I)}function Vf(I,q){return I.replace(/[^\s"'()$]+/g,(Q)=>q.has(El(Q))?"<redacted>":Q)}function El(I){let q=2166136261,Q=2166136261;for(let te=0;te<I.length;te++)q=Math.imul(q^I.charCodeAt(te),16777619),Q=Math.imul(Q^I.charCodeAt(I.length-te-1),16777619);return`${q>>>0}:${Q>>>0}:${I.length}`}function ci(I){if(I&&typeof I==="object"&&!Object.isFrozen(I)){for(let q of Object.values(I))ci(q);Object.freeze(I)}return I}function qn(I,q={},Q){let te=zf(q.cwd??process.cwd()),ne=q.policySnapshot??L(Q,{cwd:te,userConfigDir:q.userConfigDir}),ae=R(ne.policy,Q.env),le=Me({policySnapshot:ne,effectiveCapabilities:ae.capabilities,strict:ae.strict,paranoidRm:ae.paranoidRm,paranoidInterpreters:ae.paranoidInterpreters,worktreeMode:ae.worktreeMode}),ye={effectiveLevel:le.effectiveLevel,selectedPreset:ne.policy.safety.level??"standard",...ne.policyScopes?{safetyPresetScope:ne.policyScopes.levelScope}:{},effectiveCapabilities:le.effectiveCapabilities,destructiveCommandRuleOverrides:ne.policy.destructiveCommandRuleOverrides},{configSource:ve,configValid:be}=Wf(Q,{cwd:te,userConfigDir:q.userConfigDir});if(!I||!I.trim())return{trace:{steps:[{type:"error",message:"No command provided"}],segments:[]},result:"allowed",configSource:ve,configValid:be,...ye};let Ce=y(I,"auto");if(Ce.status==="limited")throw new v;let Ee=Ce.dialect==="powershell"?y(I,"posix"):Ce,Ie=st(Ee),et=Pl(),Xe=Rl(et);Xe.recordGlobal({type:"parse",input:I,segments:Ie.map((Dt)=>[...Dt])});let at=u("Bash",{command:I},{kind:"command",shell:"auto"},{configCwd:te,executionCwd:te},I),ct=z(at,{environment:Q,trace:Xe,dependencies:{loadPolicySnapshot:()=>ne}}),lt=ct.decision.kind==="deny"?ct.decision:null;if(lt&&(ct.stage==="policy-protection"||ct.stage==="secret-protection")){let Dt=Jf(lt);return{trace:{steps:[],segments:[{index:0,steps:[{type:"rule-check",rule:Dt.rule,matched:!0,reason:lt.reason}]}]},result:"blocked",reason:E(lt.reason),segment:E(Dl(lt,I)),...Dt.ruleId?{ruleId:E(Dt.ruleId)}:{},configSource:ve,configValid:be,...ye}}let ft=Xe.getNextSegmentIndex();if(lt&&ft>0&&ft<Ie.length)Xe.recordSegment({type:"segment-skipped",index:ft,reason:"prior-segment-blocked"},ft);let dt=et.finish(),gt=lt?.ruleId??Kf(at,ne,ae,Q),pt=W.find((Dt)=>Dt.id===gt&&Dt.activationCapability),bt=pt?le.policy.effectiveDestructiveCommandRules[pt.id]:void 0;return{trace:Zf(dt),result:lt?"blocked":"allowed",reason:lt?E(lt.reason):void 0,segment:lt?E(Dl(lt,I)):void 0,ruleId:lt?.ruleId?E(lt.ruleId):void 0,customRule:Yf(Xf(lt?.ruleId,ne)),configSource:ve,configValid:be,...ye,...pt&&bt?{ruleActivation:{id:pt.id,...bt}}:{}}}function Dl(I,q){return I.evidence?.segment??q}function Jf(I){if(I.reason===Fe)return{ruleId:"policy-protection",rule:"policy-protection:findPolicyConfigMutationTargetInSemanticFacts"};if(I.reason===$e)return{ruleId:"policy-apply-protection",rule:"policy-apply-protection:findPolicyApplyInvocationInSemanticFacts"};if(I.reason===C)return{ruleId:"git-metadata-protection",rule:"git-metadata-protection:findGitMetadataMutationTargetInSemanticFacts"};return{ruleId:I.ruleId,rule:"secret-protection:findSensitiveTargetInSemanticFacts"}}function Wf(I,q){let Q=_(q.cwd),te=q.userConfigPath??A(I,q),ne=G(I,{cwd:q.cwd,userConfigDir:q.userConfigDir,userConfigPath:q.userConfigPath});try{if(r(ne.projectConfigTarget)!==null){if(Yt(ne.projectConfigTarget).errors.length===0)return{configSource:Q,configValid:!0};return{configSource:Q,configValid:!1}}}catch(ae){if(ae instanceof o)return{configSource:Q,configValid:!1};throw ae}try{if(r(ne.userConfigTarget)!==null){let ae=Yt(ne.userConfigTarget);return{configSource:te,configValid:ae.errors.length===0}}return{configSource:null,configValid:!0}}catch(ae){if(ae instanceof o)return{configSource:te,configValid:!1};throw ae}}function Kf(I,q,Q,te){let ne=q.policy,ae=Le({...ne,destructiveCommandProtectionEnabled:!0,destructiveCommandRuleOverrides:{...ne.destructiveCommandRuleOverrides,...Object.fromEntries(W.flatMap((ye)=>ye.activationCapability?[[ye.id,"on"]]:[]))}},q.state==="degraded"?{diagnostics:q.diagnostics,reason:q.reason}:void 0),le=z(I,{environment:te,dependencies:{loadPolicySnapshot:()=>ae,getModes:()=>({...Q,strict:!0,paranoidRm:!0,paranoidInterpreters:!0}),findSensitiveTarget:()=>null}});return le.decision.kind==="deny"?le.decision.ruleId:void 0}function Yf(I){if(!I)return;return{id:E(I.id),...I.rulebook?{rulebook:{name:E(I.rulebook.name),version:E(I.rulebook.version)}}:{},...I.source?{source:E(I.source)}:{},...I.override?{override:{type:"reason",reason:E(I.override.reason)}}:{}}}function Zf(I){let q=I.events.flatMap((te)=>te.kind==="step"&&te.scope==="global"?[te.step]:[]),Q=new Map;for(let te of I.events){if(te.kind!=="step"||te.scope!=="segment")continue;let ne=Q.get(te.segmentIndex)??{index:te.segmentIndex,steps:[]};ne.steps.push(te.step),Q.set(te.segmentIndex,ne)}return{steps:q,segments:[...Q.values()]}}function Xf(I,q){let Q=I?.replace(/^custom\./,"");if(!Q||!q.policy.rules.some((te)=>te.name===Q))return;return q.ruleMetadata[Q]??Object.freeze({id:Q})}function Al(I){return new Promise((q)=>{process.stdout.write(`${I}
`,()=>q())})}async function _l(I,q){let Q=ri(q);if(!Q)return 1;try{let te=qn(Q.command,{cwd:Q.cwd},I),ne=!!process.env.NO_COLOR||!process.stdout.isTTY;return await Al(Q.json?si(te):ii(te,{asciiOnly:ne})),0}catch(te){let ne=Qf(te instanceof p?te.cause:te);if(ne===void 0)throw te;if(Q.json)return await Al(JSON.stringify({error:ne})),1;return console.error(ne),1}}function Qf(I){if(I instanceof v)return I.message;if(I instanceof f)return I.message;if(I instanceof a&&n[I.kind].errorCode==="path-canonicalization-limit")return"Path canonicalization work limit exceeded.";return}var Tl="2.4.1",Ft="  ",on="cc-safety-net";function $l(I){return I.argument?`${I.flags} ${I.argument}`:I.flags}function em(I){return Math.max(...I.map((q)=>$l(q).length))}function tm(I){return Math.max(...I.map((q)=>q.usage.length))}function nm(I){return Math.max(...I.map((q)=>`${on} ${q.usage}`.length))}function rm(I,q){let Q=`${on} ${I.usage}`;return`${Ft}${Q.padEnd(q+2)}${I.description}`}function Jt(I,q){return`${Ft}${I.padEnd(Math.max(40,I.length+2))}${q}`}function kn(I,q=console.log){let Q=[];if(Q.push(`${on} ${I.name}`),Q.push(""),Q.push(`${Ft}${I.description}`),Q.push(""),Q.push("USAGE:"),Q.push(`${Ft}${on} ${I.usage}`),Q.push(""),I.subcommands&&I.subcommands.length>0){Q.push("SUBCOMMANDS:");let te=tm(I.subcommands);for(let ne of I.subcommands)Q.push(`${Ft}${ne.usage.padEnd(te+2)}${ne.description}`);Q.push("")}if(I.options.length>0){Q.push("OPTIONS:");let te=em(I.options);for(let ne of I.options){let ae=$l(ne),le=ne.default?`${ne.description} (default: ${ne.default})`:ne.description;Q.push(`${Ft}${ae.padEnd(te+2)}${le}`)}Q.push("")}if(I.examples&&I.examples.length>0){Q.push("EXAMPLES:");for(let te of I.examples)Q.push(`${Ft}${te}`)}q(Q.join(`
`))}function di(){let I=nm(nr),q=[];q.push(`${on} v${Tl}`),q.push(""),q.push("Blocks destructive commands and secret access."),q.push(""),q.push("COMMANDS:");for(let Q of nr)q.push(rm(Q,I));q.push(""),q.push("GLOBAL OPTIONS:"),q.push(`${Ft}-h, --help       Show help (use with command for command-specific help)`),q.push(`${Ft}-V, --version    Show version`),q.push(""),q.push("HELP:"),q.push(`${Ft}${on} help <command>     Show help for a specific command`),q.push(`${Ft}${on} <command> --help   Show help for a specific command`),q.push(""),q.push("ENVIRONMENT VARIABLES:"),q.push(Jt(`${i.level.name}=standard|strict|paranoid`,"Set session safety level")),q.push(Jt(`${i.worktree.name}=1`,"Allow local git discards in linked worktrees")),q.push(Jt(`${i.debug.name}=1`,"Print diagnostic messages to stderr")),q.push(Jt(`${i.auditScope.name}=all|blocked`,"Record all command decisions, or denials only")),q.push(Jt("CC_SAFETY_NET_HOME","Override rule config home directory")),q.push(""),q.push("LEGACY ENVIRONMENT VARIABLES (STILL SUPPORTED):"),q.push(Jt(`${i.strict.name}=1`,"Force safety.overrides.fail_closed on")),q.push(Jt(`${i.paranoid.name}=1`,"Force paranoid_rm and paranoid_interpreters on")),q.push(Jt(`${i.paranoidRm.name}=1`,"Force safety.overrides.paranoid_rm on")),q.push(Jt(`${i.paranoidInterpreters.name}=1`,"Force safety.overrides.paranoid_interpreters on")),q.push(""),q.push("Documentation:        https://ccsafetynet.com/docs"),console.log(q.join(`
`))}function Il(){console.log(Tl)}function Vn(I,q=console.log){let Q=rr(I);if(!Q)return!1;if(Q.name.toLowerCase()!==I.toLowerCase())return!1;return kn(Q,q),!0}import{existsSync as xi,readFileSync as Ac}from"node:fs";import{join as wi}from"node:path";import*as Xt from"node:readline";function om(I){return I==="install"?"Install":"Uninstall"}function im(I){return I==="install"?"Installing":"Uninstalling"}function sm(I){return I==="install"?"into":"from"}function jl(I){return I?.available===!0}function am(I,q){let Q=new Set(q);return I.filter((te)=>Q.has(te.target)).map((te)=>te.target)}function Ol(I,q,Q){if(I.length===0||I.every((te)=>!te.available))return q;return Array.from({length:I.length},(te,ne)=>ne+1).map((te)=>(q+te*Q+I.length)%I.length).find((te)=>jl(I[te]))}function lm(I,q,Q){if(Q.ctrl&&Q.name==="c")return"interrupt";if(Q.name==="escape"||q==="q")return"abort";if(I==="install"&&(q==="u"||q==="U"))return"update";if(Q.name==="up"||q==="k")return"up";if(Q.name==="down"||q==="j")return"down";if(Q.name==="space"||q===" ")return"toggle";if(Q.name==="return"||Q.name==="enter")return"confirm";return null}function cm(I){return{cursor:I.findIndex((q)=>q.available),selected:[]}}function dm(I,q,Q){if(Q==="confirm"||Q==="update"||Q==="abort"||Q==="interrupt")return{state:I,done:Q};if(Q==="up")return{state:{...I,cursor:Ol(q,I.cursor,-1)}};if(Q==="down")return{state:{...I,cursor:Ol(q,I.cursor,1)}};let te=q[I.cursor];if(!jl(te))return{state:I};let ne=I.selected.includes(te.target)?I.selected.filter((ae)=>ae!==te.target):am(q,[...I.selected,te.target]);return{state:{...I,selected:ne}}}var Nl="◉",Ml="◯",Hl=">",Ul=" ";function um(I,q,Q,te={}){let ne=te.color!==!1,ae=ne?ut.dim:(ve)=>ve,le=ne?ut.green:(ve)=>ve,ye=ne?ut.bold:(ve)=>ve;return["",`${om(I)} CC Safety Net ${sm(I)}:`,"",...q.map((ve,be)=>{let Ce=Q.selected.includes(ve.target),Ee=be===Q.cursor,Ie=Ce?Nl:Ml,et=Ee?Hl:Ul,Xe=ve.available?"":` (${ve.unavailableReason??"not installed"})`,at=`${Ie} ${ve.label}${Xe}`,ct=!ve.available?ae(at):Ce?le(at):Ee?ye(at):at;return`${et} ${ct}`}),"",I==="install"?"Space: select  Enter: confirm  u: update installed  Up/Down: move  q/Esc: cancel":q.some((ve)=>ve.available)?"Space: select  Enter: confirm  Up/Down: move  q/Esc: cancel":`No selectable integrations found for ${I}. q/Esc: close`].join(`
`)}var Fl=["global-hook","plugin"];function pm(I,q,Q={}){let te=Q.color!==!1?ut.bold:(ae)=>ae;return["","Install the Kimi Code integration as:","",...[`Global hook — ${q?"already installed; selecting it reports the current state":"write the hook into ~/.kimi-code/config.toml now"}`,"Native Kimi plugin — print the steps to run inside Kimi Code"].map((ae,le)=>{let ye=le===I,ve=`${ye?Nl:Ml} ${ae}`;return`${ye?Hl:Ul} ${ye?te(ve):ve}`}),"","Enter: confirm  Up/Down: move  q/Esc: cancel"].join(`
`)}function Gl(I){let{input:q,output:Q}=I;Xt.emitKeypressEvents(q);let te=q.isRaw===!0;q.setRawMode(!0),q.resume();let ne=0,ae=()=>{if(ne===0)return;Xt.moveCursor(Q,0,-ne),Xt.cursorTo(Q,0),Xt.clearScreenDown(Q)},le=()=>{ae();let ye=I.render();Q.write(`${ye}
`),ne=ye.split(`
`).length};return new Promise((ye)=>{let ve=(Ce)=>{q.off("keypress",be),q.setRawMode(te),q.pause(),ae(),ye(Ce)};function be(Ce,Ee){I.onKey(Ce,Ee,{finish:ve,draw:le})}q.on("keypress",be),le()})}function Bl(I={}){let q=0;return Gl({input:I.input??process.stdin,output:I.output??process.stdout,render:()=>pm(q,I.globalHookInstalled===!0),onKey:(Q,te,ne)=>{if(te.ctrl&&te.name==="c"){ne.finish(null),(I.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(te.name==="escape"||Q==="q")return ne.finish(null);if(te.name==="return"||te.name==="enter")return ne.finish(Fl[q]);if(te.name==="up"||te.name==="down"||Q==="k"||Q==="j")q=(q+1)%Fl.length,ne.draw()}})}function ui(I=process.stdin,q=process.stdout){return Boolean(I.isTTY&&q.isTTY&&typeof I.setRawMode==="function")}function ql(I,q,Q={}){let te=Q.output??process.stdout,ne=cm(q);return Gl({input:Q.input??process.stdin,output:te,render:()=>um(I,q,ne),onKey:(ae,le,ye)=>{let ve=lm(I,ae,le);if(!ve)return;let be=dm(ne,q,ve);if(ne=be.state,be.done==="interrupt"){ye.finish(null),(Q.onInterrupt??(()=>process.kill(process.pid,"SIGINT")))();return}if(be.done==="abort")return ye.finish(null);if(be.done==="update")return ye.finish("update");if(be.done==="confirm"){if(ne.selected.length===0){te.write("\x07"),ye.draw();return}ye.finish([...ne.selected]),te.write(`${im(I)} selected integrations...
`);return}ye.draw()}})}import{existsSync as Vl,lstatSync as mm,mkdirSync as gm,mkdtempSync as ym,readdirSync as hm,readFileSync as Cn,rmSync as Fr}from"node:fs";import{basename as vm,dirname as bm,join as Et}from"node:path";import{fileURLToPath as Lm}from"node:url";var pi="// cc-safety-net managed Amp plugin. Do not edit. Reinstall with: npx -y cc-safety-net install --amp",sn="cc-safety-net",an="cc-safety-net/index.ts";import{spawn as fm}from"node:child_process";var fi=(I,q)=>{let Q=tn([...I],process.env);return new Promise((te)=>{let ne=fm(Q.cmd,Q.args,{cwd:q,stdio:["ignore","pipe","pipe"]}),ae=Vo(ne),le=!1,ye=setTimeout(()=>{le=!0,ne.kill()},120000);ne.on("error",(ve)=>{clearTimeout(ye),te({status:null,errorCode:ve.code,stdout:ae.stdout,stderr:[ve.message,ae.stderr].filter(Boolean).join(`
`)})}),ne.on("close",(ve)=>{clearTimeout(ye),te({status:le?null:ve,errorCode:le?"ETIMEDOUT":void 0,stdout:ae.stdout,stderr:ae.stderr})})})};var xn="cc-safety-net.ts",mi=Et("amp",an);function wm(I){return Et(I.home,".config","amp","plugins","cc-safety-net.ts")}function km(){let I=bm(Lm(import.meta.url));return[Et(I,mi),Et(I,"..",mi),Et(I,"..","..","..","dist",mi)]}function xm(I=km()){let q=I.find((Q)=>Vl(Q)&&mm(Q).isFile());if(!q)throw Error("Packaged Amp plugin artifact not found. Reinstall cc-safety-net and try again.");return q}function zl(I){try{return JSON.parse(I)}catch{return}}function jr(I){return I.subarray(0,Buffer.byteLength(pi)).toString("utf-8")===pi}async function zn(I,q,Q){let te=await I(q,Q);if(te.status===0)return te;throw Error([`Failed to run ${q.join(" ")}${te.status===null?"":` (exit ${te.status})`}.`,[te.stdout,te.stderr].filter(Boolean).join(`
`).trim()].filter(Boolean).join(`
`))}async function Jl(I){let q=await I(["amp","plugins","repositories","--json"]);if(q.status===null)throw Error(`${q.errorCode==="ENOENT"?'Amp CLI not found. Install the amp CLI, sign in with "amp login", and rerun install --amp.':`amp plugins repositories --json did not finish (${q.errorCode??"terminated"}). Check that the amp CLI responds and rerun install --amp.`}
${q.stderr}`.trim());if(q.status!==0)throw Error(`Failed to run amp plugins repositories --json (exit ${q.status}). Sign in with "amp login" and rerun install --amp.
${[q.stdout,q.stderr].filter(Boolean).join(`
`)}`.trim());let Q=zl(q.stdout),te=(Array.isArray(Q)?Q:[]).filter((ne)=>mt(ne,"scope")==="user"&&mt(ne,"exists")===!0&&mt(ne,"viewerCanWrite")===!0).map((ne)=>mt(ne,"cloneRef")).find((ne)=>typeof ne==="string"&&ne.length>0);if(!te)throw Error('Your Amp account has no writable Personal Plugins repository. Sign in with "amp login", open Amp once to create it, and rerun install --amp.');return te}async function Wl(I,q,Q){let te=ym(Et(q.tmpdir,"cc-safety-net-amp-"));try{return await zn(I,["amp","clone","user-plugins",te]),await Q(te)}finally{Fr(te,{recursive:!0,force:!0})}}function gi(I){return`rerun ${I==="overwrite"?"install":"uninstall"} --amp`}function Kl(I,q,Q){let te=Et(I,q),ne=Lt(te);if(!ne)return;if(ne.isSymbolicLink()||!ne.isFile())throw Error(`Refusing to ${Q} ${q} in your Amp personal plugins repository: not a regular file. Remove it there and ${gi(Q)}.`);let ae=Cn(te);if(jr(ae))return ae;throw Error(`Refusing to ${Q} unmanaged file ${q} in your Amp personal plugins repository. Remove it there and ${gi(Q)}.`)}function Yl(I,q){let Q=Et(I,sn),te=Lt(Q);if(!te)return;if(te.isSymbolicLink()||!te.isDirectory())throw Error(`Refusing to ${q} ${sn} in your Amp personal plugins repository: not a regular directory. Remove it there and ${gi(q)}.`);return Kl(I,an,q)}function Cm(I){let q=Et(I,xn),Q=Lt(q);if(!Q||Q.isSymbolicLink()||!Q.isFile())return;let te=Cn(q);return jr(te)?te:void 0}async function Zl(I,q,Q,te){if(await zn(I,Q,q),(await zn(I,["git","status","--porcelain"],q)).stdout.trim()==="")return!1;return await zn(I,["git","-c","commit.gpgsign=false","-c","user.name=cc-safety-net","-c","user.email=cc-safety-net@localhost","commit","-m",te],q),await zn(I,["git","push","origin","HEAD"],q),!0}function Or(I,q){Sm(I,q),Rm(I,q)}function Xl(I,q){if(q==="keep")return;throw Error(`Local Amp plugin ${I} is not a managed copy and masks the personal plugin. Remove it and rerun install --amp.`)}function Sm(I,q){let Q=wm(I),te=Lt(Q);if(!te)return;if(!te.isSymbolicLink()&&te.isFile()&&jr(Cn(Q))){Fr(Q);return}Xl(Q,q)}function Rm(I,q){let Q=Et(I.home,".config","amp","plugins",sn),te=Lt(Q);if(!te)return;if(!te.isSymbolicLink()&&te.isDirectory()&&Pm(Q)){Fr(Q,{recursive:!0});return}Xl(Q,q)}function Pm(I){let q=vm(an);if(hm(I).join("\x00")!==q)return!1;let Q=Et(I,q),te=Lt(Q);return!!te&&!te.isSymbolicLink()&&te.isFile()&&jr(Cn(Q))}function Em(I){let q=d(I);if(!Vl(q))return"";let Q=zl(Cn(q,"utf-8"));if(!Q||typeof Q!=="object"||Array.isArray(Q))return"";return`;globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__ = ${JSON.stringify(g(Q,I.home))};
`}async function Ql(I,q=xm(),Q=fi){let te=Buffer.concat([Cn(q),Buffer.from(Em(I),"utf-8")]),ne=await Jl(Q);return Wl(Q,I,async(ae)=>{let le=`${ne}/${sn}`,ye=Yl(ae,"overwrite"),ve=Kl(ae,xn,"overwrite");if(ye?.equals(te)&&!ve)return Or(I,"fail"),{path:le,alreadyInstalled:!0};if(gm(Et(ae,sn),{recursive:!0}),kt(Et(ae,an),te),ve)Fr(Et(ae,xn));let be=await Zl(Q,ae,["git","add","--",an,...ve?[xn]:[]],`chore: update cc-safety-net plugin to v${wt()}`);return Or(I,"fail"),{path:le,alreadyInstalled:!be}})}async function ec(I,q=fi){let Q=await Jl(q);return Wl(q,I,async(te)=>{let ne=Yl(te,"remove"),ae=Cm(te),le=`${Q}/${ae&&!ne?xn:sn}`;if(!ne&&!ae)return Or(I,"keep"),{path:le,alreadyInstalled:!1};return await Zl(q,te,["git","rm","--",...ne?[an]:[],...ae?[xn]:[]],`chore: remove cc-safety-net plugin v${wt()}`),Or(I,"keep"),{path:le,alreadyInstalled:!0}})}import{existsSync as tc,mkdirSync as Dm,readFileSync as Am}from"node:fs";import{dirname as _m}from"node:path";var yi=Tt["antigravity-cli"],ln="cc-safety-net";function cn(I){return Boolean(I)&&typeof I==="object"&&!Array.isArray(I)}function Mr(){return{PreToolUse:[{hooks:[{type:"command",command:yi,timeout:30}]}]}}function nc(I){try{let q=JSON.parse(Am(I,"utf-8"));if(!q||typeof q!=="object"||Array.isArray(q))throw Error("Antigravity hooks config must be a JSON object");return q}catch(q){if(q instanceof SyntaxError)throw Error(`Failed to parse Antigravity hooks config ${I}: ${q.message}`);throw q}}function rc(I){let q=I[ln];if(q===void 0){let te=Mr();return I[ln]=te,{definition:te,preToolUse:te.PreToolUse??[]}}if(!cn(q))throw Error(`Antigravity hooks config entry "${ln}" must be an object`);let Q=Array.isArray(q.PreToolUse)?q.PreToolUse:[];return q.PreToolUse=Q,{definition:q,preToolUse:Q}}function oc(I){if(!Array.isArray(I.PreToolUse))return!1;return I.PreToolUse.some((q)=>cn(q)&&Array.isArray(q.hooks)&&q.hooks.some((Q)=>cn(Q)&&Q.command===yi))}function Tm(I){return Object.values(I).some((q)=>cn(q)&&q.enabled!==!1&&oc(q))}function $m(I){if(I[ln]===void 0)return!1;let q=rc(I);if(q.definition.enabled!==!1||!oc(q.definition))return!1;return q.definition.enabled=!0,!0}function Im(I){if(I[ln]===void 0){I[ln]=Mr();return}let q=rc(I);q.definition.enabled=!0,q.preToolUse.push(Mr().PreToolUse?.[0]??{hooks:[]})}function Om(I){let q=!1;for(let Q of Object.values(I)){if(!cn(Q)||!Array.isArray(Q.PreToolUse))continue;Q.PreToolUse=Q.PreToolUse.flatMap((te)=>{if(!cn(te)||!Array.isArray(te.hooks))return[te];let ne=te.hooks.filter((ae)=>!cn(ae)||ae.command!==yi);if(ne.length!==te.hooks.length)q=!0;return ne.length===0?[]:[{...te,hooks:ne}]})}return q}function Nr(I,q){kt(I,`${JSON.stringify(q,null,2)}
`)}function ic(I){let q=$n(I.home);if(Dm(_m(q),{recursive:!0}),!tc(q))return Nr(q,{[ln]:Mr()}),{path:q,alreadyInstalled:!1};let Q=nc(q);if(Tm(Q))return{path:q,alreadyInstalled:!0};if($m(Q))return Nr(q,Q),{path:q,alreadyInstalled:!1};return Im(Q),Nr(q,Q),{path:q,alreadyInstalled:!1}}function sc(I){let q=$n(I.home);if(!tc(q))return{path:q,alreadyInstalled:!1};let Q=nc(q);if(!Om(Q))return{path:q,alreadyInstalled:!1};return Nr(q,Q),{path:q,alreadyInstalled:!0}}import{existsSync as Fm,readdirSync as jm,rmSync as Nm}from"node:fs";import{join as Mm}from"node:path";function ac(I,q=process.platform,Q){if(!Fm(I))return;let te=q==="win32"?/^bunx-\d+-cc-safety-net@/:new RegExp(`^bunx-${process.getuid?.()??0}-cc-safety-net@`);jm(I).filter((ne)=>ne!==Q&&te.test(ne)).forEach((ne)=>{Nm(Mm(I,ne),{recursive:!0,force:!0})})}import{spawn as Hm}from"node:child_process";var Gt=It.map((I)=>({target:I.id,flag:I.flag,label:ht(I.id),probeCommand:I.probeCommand}));function hi(I){let q=new Set(I);return Gt.map((Q)=>Q.target).filter((Q)=>q.has(Q))}async function lc(I,q){for(let Q of I)await q(Q)}var Um=5000;function vi(I,q=Um){return new Promise((Q)=>{let te=tn([...I],process.env),ne=Hm(te.cmd,te.args,{env:process.env,stdio:"ignore"}),ae=!1,le=(ve)=>{if(ae)return;ae=!0,clearTimeout(ye),Q(ve)},ye=setTimeout(()=>{ne.kill(),le(!1)},q);ne.on("error",()=>le(!1)),ne.on("close",(ve)=>le(ve===0))})}function cc(I=vi,q={}){let Q=new Set(q.configuredTargets??[]);return Promise.all(Gt.map(async(te)=>({target:te.target,flag:te.flag,label:te.label,...uc(q.action,await I(te.probeCommand),Q.has(te.target))})))}function dc(I,q){let Q=new Set(q.configuredTargets??[]);return I.map((te)=>({...te,...uc(q.action,te.available,Q.has(te.target))}))}function uc(I,q,Q){if(I==="uninstall")return Q?{available:!0}:{available:!1,unavailableReason:"not installed"};if(I==="install"&&Q)return{available:!1,unavailableReason:"already installed"};if(!q)return{available:!1,unavailableReason:"CLI not installed"};return{available:!0}}import{existsSync as pc,readdirSync as Gm,rmSync as Bm}from"node:fs";import{join as Sn}from"node:path";function Hr(I,q=process.platform){let Q=Sn(I.env.get("npm_config_cache")||(q==="win32"?Sn(I.env.get("LOCALAPPDATA")||Sn(I.home,"AppData","Local"),"npm-cache"):Sn(I.home,".npm")),"_npx");if(!pc(Q))return;Gm(Q).filter((te)=>pc(Sn(Q,te,"node_modules","cc-safety-net"))).forEach((te)=>{Bm(Sn(Q,te),{recursive:!0,force:!0})})}import{existsSync as vc,mkdirSync as Vm,readFileSync as bc}from"node:fs";import{dirname as zm,join as hc}from"node:path";function qm(I,q){if(I[q]!=="#")return q;let Q=I.indexOf(`
`,q+1);return Q===-1?I.length:Q+1}function bi(I,q,Q){let te=new RegExp(`^(\\s*)${q}\\s*=\\s*\\[`),ne=0;for(let ae of I.split(`
`)){if(/^\s*\[/.test(ae))return;let le=te.exec(ae);if(le){let ye=ne+le[0].lastIndexOf("[");return{start:ye,end:ko(I,ye,{skipComment:qm,...Q})}}ne+=ae.length+1}return}function fc(I,q,Q){let te=I.slice(0,q.end).trimEnd(),ne=ia(I,q.end),ae=ne===""?"     ":`${ne}  `,le=!te.endsWith("[")&&!te.endsWith(",");return`${te}${le?",":""}
${ae}${Q}${I.slice(q.end)}`}function mc(I,q,Q){let te=I.indexOf(Q,q.start);if(te===-1||te>q.end)return I;return yr(I,{start:te,end:te+Q.length})}function gc(I,q){let Q=new RegExp(`^\\s*${q}\\s*=\\s*\\[\\s*]\\s*(?:#.*)?$`),te=I.split(`
`),ne=te.findIndex((ye)=>/^\s*\[/.test(ye)),ae=ne===-1?te:te.slice(0,ne),le=ne===-1?[]:te.slice(ne);return[...ae.filter((ye)=>!Q.test(ye)),...le].join(`
`)}function yc(I,q,Q){let te=new RegExp(`^\\s*\\[\\[${q}]]\\s*$`,"m");return I.split(/(?=^\s*\[)/m).filter((ne)=>!te.test(ne)||!ne.includes(Q)).join("").trimEnd()}var Jn=Tt["kimi-code"],Li=`[[hooks]]
event = "PreToolUse"
command = "${Jn}"`,Lc=`{ event = "PreToolUse", command = "${Jn}" }`,wc={stringError:"Unterminated string in Kimi Code config",bracketError:"Unmatched hooks array in Kimi Code config"};function kc(I){return hc(I.env.get("KIMI_CODE_HOME")??hc(I.home,".kimi-code"),"config.toml")}function Jm(I){let q=bi(I,"hooks",wc);if(q&&I.slice(q.start+1,q.end).trim())return fc(I,q,Lc);let Q=gc(I,"hooks").trimEnd();if(Q==="")return`${Li}
`;return`${Q}

${Li}
`}function xc(I){let q=kc(I);if(Vm(zm(q),{recursive:!0}),!vc(q))return kt(q,`${Li}
`),{path:q,alreadyInstalled:!1};let Q=bc(q,"utf-8");if(Q.includes(Jn))return{path:q,alreadyInstalled:!0};return kt(q,Jm(Q)),{path:q,alreadyInstalled:!1}}function Cc(I){let q=kc(I);if(!vc(q))return{path:q,alreadyInstalled:!1};let Q=bc(q,"utf-8");if(!Q.includes(Jn))return{path:q,alreadyInstalled:!1};let te=bi(Q,"hooks",wc),ne=te?mc(Q,te,Lc):`${yc(Q,"hooks",Jn)}
`;return kt(q,ne),{path:q,alreadyInstalled:!0}}var ki="safety-net@cc-marketplace",Sc=new Set(["claude-code","codex","copilot-cli","gemini-cli","hermes-agent","openclaw","opencode","pi"]),Rc=new Set(["antigravity-cli","cursor","goose","grok-build","hermes-agent","kimi-code"]);function Ci(I){return/^\s*safety-net@cc-marketplace[^a-z0-9-][^\n]*installed,/m.test(I??"")}function _c(I){return/^\s*cc-safety-net[^a-z0-9-][^\n]*installed,/m.test(I??"")}function Wm(I){return/^Marketplace `cc-marketplace`\s*$/m.test(I??"")}var Tc={"claude-code":{installCommands:(I)=>{let q=mr(I,"cc-safety-net@cc-marketplace");return{commands:[...q?[["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","update","cc-safety-net@cc-marketplace"]]:[["claude","plugin","marketplace","add","kenryu42/cc-marketplace"],["claude","plugin","marketplace","update","cc-marketplace"],["claude","plugin","install","cc-safety-net@cc-marketplace"]],...Lo(I).status==="disabled"?[["claude","plugin","enable","cc-safety-net@cc-marketplace"]]:[]],cleanupCommands:mr(I,ki)?[["claude","plugin","uninstall",ki]]:[],update:q}},uninstallCommands:[["claude","plugin","uninstall","cc-safety-net@cc-marketplace"],["claude","plugin","marketplace","remove","cc-marketplace"]]},codex:{installCommands:async(I,q)=>{let Q=q??await Ut(["codex","plugin","list"]),te=_c(Q);return{commands:[te||Wm(Q)?["codex","plugin","marketplace","upgrade","cc-marketplace"]:["codex","plugin","marketplace","add","kenryu42/cc-marketplace"],["codex","plugin","add","cc-safety-net@cc-marketplace"]],cleanupCommands:Ci(Q)?[["codex","plugin","remove","safety-net@cc-marketplace"]]:[],update:te}},uninstallCommands:[["codex","plugin","remove","cc-safety-net@cc-marketplace"],["codex","plugin","marketplace","remove","cc-marketplace"]],postInstallMessage:"Start Codex, open `/hooks`, select the cc-safety-net PreToolUse hook, and press `t` to trust it."},"copilot-cli":{installCommands:async()=>{let I=await Ut(["copilot","plugin","list"]),q=[...fa(I)?[["copilot","plugin","uninstall","copilot-safety-net"]]:[],...ma(I)?[["copilot","plugin","uninstall",da]]:[]];if(ua(I))return{commands:[["copilot","plugin","marketplace","update","cc-marketplace"],["copilot","plugin","update",Ht]],cleanupCommands:q,update:!0};return{commands:[pa(await Ut(["copilot","plugin","marketplace","list"]))?["copilot","plugin","marketplace","update","cc-marketplace"]:["copilot","plugin","marketplace","add","kenryu42/cc-marketplace"],["copilot","plugin","install",Ht]],cleanupCommands:q}},uninstallCommands:[["copilot","plugin","uninstall","cc-safety-net@cc-marketplace"],["copilot","plugin","marketplace","remove","cc-marketplace"]]},"gemini-cli":{installCommands:(I)=>{let q=Do(I);if(q.status==="configured")return{commands:[["gemini","extensions","update","gemini-safety-net"]],update:!0};if(q.status==="disabled")return{commands:[["gemini","extensions","update","gemini-safety-net"],["gemini","extensions","enable","gemini-safety-net"]],update:!0};return{commands:[["gemini","extensions","install","https://github.com/kenryu42/gemini-safety-net","--consent"]]}},uninstallCommands:[["gemini","extensions","uninstall","gemini-safety-net"]]},openclaw:{beforeInstall:Yo,installCommands:()=>({commands:tl()}),uninstallCommands:[["openclaw","plugins","uninstall",vt,"--force"]],postInstallMessage:["Restart the OpenClaw Gateway to apply the change.","If plugins.allow is set in openclaw.json, it must also list cc-safety-net."].join(`
`)},opencode:{beforeInstall:Qo,installCommands:[["opencode","plugin","-g","-f","cc-safety-net@latest"]]},pi:{installCommands:[["pi","install","npm:cc-safety-net"]],uninstallCommands:[["pi","uninstall","npm:cc-safety-net"]]}};function $c(I,q=(Q)=>Q){try{let Q=JSON.parse(q(Ac(I,"utf-8")));if(!Q||typeof Q!=="object"||Array.isArray(Q))throw Error(`Settings file ${I} must be a JSON object`);return Q}catch(Q){if(Q instanceof SyntaxError)throw Error(`Failed to parse ${I}: ${Q.message}`);throw Q}}function Km(I){let q=wi(In(I),"settings.json");if(!xi(q))return;let Q=$c(q,_t),te=Q.enabledPlugins;if(!te||typeof te!=="object"||Array.isArray(te))return;if(te[Ht]!==!1)return;let ne=Ac(q,"utf-8"),ae=ne.replace(new RegExp(`("${Ht}"\\s*:\\s*)false`),"$1true");return te[Ht]=!0,kt(q,ae!==ne?ae:`${JSON.stringify(Q,null,2)}
`),`Enabled ${Ht} plugin in ${q}`}function Ym(I){let q=ei(I);if(!xi(q))return;let Q=$c(q);if(!Array.isArray(Q.packages))return;let te=Q.packages.find((ne)=>!!ne&&typeof ne==="object"&&!Array.isArray(ne)&&ti(ne.source)&&("extensions"in ne));if(!te)return;return delete te.extensions,kt(q,`${JSON.stringify(Q,null,2)}
`),`Enabled npm:cc-safety-net extensions in ${q}`}function Pc(I,q){let Q=xt({label:q,booleans:Object.fromEntries(Gt.map((ae)=>[ae.target,[ae.flag]]))},I),te=Q.errors[0];if(te)throw Error(te);let ne=Gt.filter((ae)=>Q.flags[ae.target]).map((ae)=>ae.target);if(ne.length!==1)throw Error(`Choose exactly one ${q} target: ${Gt.map((ae)=>ae.flag).join(", ")}`);return ne[0]}async function Ic(I,q=gn){let[Q,te,ne]=await Promise.all([q(["amp","plugins","list"],30000),q(["codex","plugin","list"],30000),q(["copilot","--binary-version"])]);return{codexPluginListOutput:te,hooks:wn(I,process.cwd(),{ampPluginListOutput:Q,codexPluginListOutput:te,copilotCliVersion:ne})}}async function Zm(I,q,Q=gn){let te=await Ic(I,Q);return te.hooks.filter((ne)=>q==="install"?ne.configured:ne.detected||ne.inspectionStatus==="not-inspected").filter((ne)=>ne.platform!=="codex"||!Ci(te.codexPluginListOutput)||_c(te.codexPluginListOutput)).map((ne)=>ne.platform)}function Xm(I,q,Q,te){if(Q.length>0)return{finish:async()=>[Pc(Q,q)]};if(!te.selectTargets&&!ui(te.input,te.output))return{finish:async()=>[Pc(Q,q)]};let ne=te.detectConfiguredTargets??(()=>Zm(I,q,te.fetchVersion)),ae=Promise.all([cc(te.probeTargets),ne()]);return{ready:ae,finish:async()=>{let[le,ye]=await ae,ve=dc(le,{action:q,configuredTargets:ye}),be=te.selectTargets?await te.selectTargets(q,Dc(q,ve)):await ql(q,Dc(q,ve),{input:te.input,output:te.output});if(be==="update")return be;if(!be||be.length===0)return null;return hi(be)}}}async function dn(I,q,Q=!1,te){let ne=Tc[I];ne.beforeInstall?.(q);let ae=typeof ne.installCommands==="function"?await ne.installCommands(q,te):{commands:ne.installCommands};return await zo(ae.commands),await Ya(ae.cleanupCommands??[]),[`${ae.update||Q?"Updated":"Installed"} ${ht(I)} integration`,ne.postInstallMessage].filter(Boolean).join(`
`)}async function Rn(I){let q=Tc[I];if(!q.uninstallCommands)throw Error(`${ht(I)} uninstall is not supported`);return await zo(q.uninstallCommands),`Uninstalled ${ht(I)} integration`}function Qm(I){let q=yl(I);return q.alreadyInstalled?`Uninstalled OpenCode plugin from ${q.path}`:`OpenCode plugin not installed in ${q.path}`}var eg={"antigravity-cli":{install:ic,uninstall:sc},cursor:{install:Ca,uninstall:Sa},"grok-build":{install:Oa,uninstall:Fa},"kimi-code":{install:xc,uninstall:Cc},goose:{install:_a,uninstall:Ta}};function Bt(I,q,Q,te=!1){if(I==="install"&&!te)Hr(Q);let ne=eg[q][I](Q),ae=ht(q),le=I!=="install"?"Uninstalled":te?"Updated":"Installed";return I==="install"&&ne.alreadyInstalled?te?`${ae} hook up to date in ${ne.path}`:`${ae} hook already installed in ${ne.path}`:I==="uninstall"&&!ne.alreadyInstalled?`${ae} hook not installed in ${ne.path}`:`${le} ${ae} hook ${I==="install"?"in":"from"} ${ne.path}`}var tg={amp:{install:Ql,uninstall:ec,restartNote:'Amp personal plugins apply to every Amp session, including Orb threads. Restart Amp or run "plugins: reload" to apply the change.'},"hermes-agent":{install:Ha,uninstall:Ua,afterInstall:async(I)=>{let q=Bo(I);return await Ut(["hermes","plugins","enable",$t,"--no-allow-tool-override"]),!q},beforeUninstall:async(I)=>{Go(I);try{await Ut(["hermes","plugins","disable",$t])}catch(q){console.warn(`${q instanceof Error?q.message:String(q)}
Removing the plugin files anyway; ${$t} may still be listed in the Hermes config.`)}},restartNote:"Restart Hermes to apply the change."}};async function Ur(I,q,Q,te=!1){let ne=tg[q];if(I==="uninstall")await ne.beforeUninstall?.(Q);let ae=I==="install"?await ne.install(Q):await ne.uninstall(Q),le=I==="install"&&await ne.afterInstall?.(Q),ye=ht(q),ve=!le&&(I==="install"&&ae.alreadyInstalled||I==="uninstall"&&!ae.alreadyInstalled);return[ve?I==="install"?`${ye} plugin ${te?"up to date":"already installed"} at ${ae.path}`:`${ye} plugin not installed at ${ae.path}`:`${I!=="install"?"Uninstalled":te?"Updated":"Installed"} ${ye} plugin ${I==="install"?"at":"from"} ${ae.path}`,ve?void 0:ne.restartNote].filter(Boolean).join(`
`)}var ng={amp:{install:(I,q)=>Ur("install","amp",I,q),uninstall:(I)=>Ur("uninstall","amp",I)},"antigravity-cli":{install:(I,q)=>Bt("install","antigravity-cli",I,q),uninstall:(I)=>Bt("uninstall","antigravity-cli",I)},"claude-code":{install:(I,q)=>dn("claude-code",I,q),uninstall:()=>Rn("claude-code")},codex:{install:(I,q,Q)=>dn("codex",I,q,Q),uninstall:()=>Rn("codex")},"copilot-cli":{install:async(I,q)=>[await dn("copilot-cli",I,q),Km(I)].filter(Boolean).join(`
`),uninstall:()=>Rn("copilot-cli")},cursor:{install:(I,q)=>Bt("install","cursor",I,q),uninstall:(I)=>Bt("uninstall","cursor",I)},"gemini-cli":{install:(I,q)=>dn("gemini-cli",I,q),uninstall:()=>Rn("gemini-cli")},"grok-build":{install:(I,q)=>Bt("install","grok-build",I,q),uninstall:(I)=>Bt("uninstall","grok-build",I)},goose:{install:(I,q)=>Bt("install","goose",I,q),uninstall:(I)=>Bt("uninstall","goose",I)},"hermes-agent":{install:(I,q)=>{if(!q)Hr(I);return Ur("install","hermes-agent",I,q)},uninstall:(I)=>Ur("uninstall","hermes-agent",I)},"kimi-code":{install:(I,q)=>Bt("install","kimi-code",I,q),uninstall:(I)=>Bt("uninstall","kimi-code",I)},openclaw:{install:async(I,q)=>{let Q=await dn("openclaw",I,q);return await nl(),Q},uninstall:(I)=>(Yo(I),Rn("openclaw"))},opencode:{install:async(I,q)=>{let Q=await dn("opencode",I,q);return await ml(I),Q},uninstall:(I)=>Qm(I)},pi:{install:async(I,q)=>[await dn("pi",I,q),Ym(I)].filter(Boolean).join(`
`),uninstall:()=>Rn("pi")}},Ec=["Install CC Safety Net as a native Kimi Code plugin:","","  1. Start Kimi Code and run: /plugins install https://github.com/kenryu42/cc-safety-net","     Confirm the trust prompt; it defaults to cancel.","  2. Run /reload, or start a new session.","","Note: Kimi Code hooks are fail-open. When the hook process cannot start, crashes, or times","out, Kimi Code allows the tool call."].join(`
`);function rg(I){if(Hn({environment:I,cwd:process.cwd()}).status!=="configured")return Ec;return[Ec,"",ut.red(["CAUTION: the global Kimi Code hook is installed and will run alongside the plugin.","After the plugin is active, remove it with: cc-safety-net uninstall --kimi-code"].join(`
`))].join(`
`)}function Dc(I,q){return q.map((Q)=>I==="install"&&Q.target==="kimi-code"&&Q.unavailableReason==="already installed"?{...Q,available:!0,unavailableReason:void 0,label:`${Q.label} (global hook installed)`}:Q)}function og(I,q){if(I.selectKimiInstallMethod)return I.selectKimiInstallMethod();if(!ui(I.input,I.output))return Promise.resolve("global-hook");return Bl({input:I.input,output:I.output,globalHookInstalled:Hn({environment:q,cwd:process.cwd()}).status==="configured"})}async function Oc(I,q,Q,te=!1,ne){return ng[q][I](Q,te,ne)}function ig(I){let q=xt({label:"update"},I).errors[0];if(q)throw Error(q)}async function sg(I,q=gn){let Q=await Ic(I,q),te=wi(In(I),"installed-plugins");return{targets:hi([...Q.hooks.filter((ae)=>ae.platform!=="copilot-cli"&&ae.detected).map((ae)=>ae.platform),...[hr,ca,la].flatMap((ae)=>xi(wi(te,...ae))?["copilot-cli"]:[]),...mr(I,ki)?["claude-code"]:[],...Ci(Q.codexPluginListOutput)?["codex"]:[]]),codexPluginListOutput:Q.codexPluginListOutput}}async function ag(I){let q=l(),Q=I.output??process.stdout,te=(I.scriptPath??process.argv[1]??"").split(/[\\/]/),ne=te.find((et)=>/^bunx-\d+-/.test(et)),ae=ne!==void 0||te.includes("_npx")?null:(I.checkLatestVersion??Zt)(),le=async()=>{let et=ae&&await ae;if(et?.updateAvailable)Q.write(`
Update available: cc-safety-net ${et.currentVersion} → ${et.latestVersion}. Update this CLI with your package manager, e.g. \`npm i -g cc-safety-net@latest\` for a global install.
`)},ye=sg(q,I.fetchVersion??gn).then(async(et)=>{let Xe=new Set(et.targets);return{targets:et.targets,codexPluginListOutput:et.codexPluginListOutput,available:new Map(await Promise.all(Gt.filter((at)=>Xe.has(at.target)&&Sc.has(at.target)).map(async(at)=>[at.target,await vi(at.probeCommand)])))}}),ve=await Tn(I.showBanner??!0,()=>({ready:ye,finish:()=>ye}),()=>_n({input:I.input??process.stdin,output:Q}),{loadingMessage:"Checking installed integrations…",output:Q}),be=await Promise.resolve().then(()=>(ac(q.tmpdir,process.platform,ne),null)).catch((et)=>Wn(et));if(ve.targets.length===0){if(Q.write("No installed integrations found. Run `cc-safety-net install` to set one up.\n"),be!==null)console.error(be);return await le(),be===null?0:1}let Ce=ve.targets.some((et)=>Rc.has(et))?await Promise.resolve().then(()=>(Hr(q),null)).catch((et)=>Wn(et)):null,Ee=await ur(Promise.all(ve.targets.map((et)=>{if(Sc.has(et)&&!ve.available.get(et))return Promise.resolve({message:`${ht(et)} not found; skipped`,failed:!1});if(Ce!==null&&Rc.has(et))return Promise.resolve({message:Ce,failed:!0});return Oc("install",et,q,!0,ve.codexPluginListOutput).then((Xe)=>({message:Xe,failed:!1}),(Xe)=>({message:Wn(Xe),failed:!0}))})),{loadingMessage:`Updating ${ve.targets.length} integration${ve.targets.length===1?"":"s"}…`,output:Q}),Ie=be===null?Ee:[...Ee,{message:be,failed:!0}];return Ie.forEach((et)=>{et.failed?console.error(et.message):Q.write(`${et.message}
`)}),await le(),Ie.some((et)=>et.failed)?1:0}function Si(I,q={}){return Promise.resolve().then(()=>ig(I)).then(()=>ag(q)).catch((Q)=>(console.error(Wn(Q)),1))}async function Kn(I,q,Q={}){try{let te=l(),ne=await Tn(!0,()=>Xm(te,I,q,Q),()=>_n({input:Q.input??process.stdin,output:Q.output??process.stdout}),{loadingMessage:I==="install"?"Checking available integrations…":"Checking installed integrations…",output:Q.output??process.stdout});if(!ne)return(Q.output??process.stdout).write(`Cancelled: nothing was ${I}ed.
`),0;if(ne==="update")return(Q.runUpdate??(()=>Si([],{fetchVersion:Q.fetchVersion,input:Q.input,output:Q.output,showBanner:!1})))();let ae=Q.output??process.stdout;return await lc(ne,async(le)=>{if(le==="kimi-code"&&I==="install"){let ve=await og(Q,te);if(ve===null){ae.write(`Cancelled: Kimi Code integration was not installed.
`);return}if(ve==="plugin"){ae.write(`${rg(te)}
`);return}}let ye=await ur(Oc(I,le,te),{loadingMessage:`${I==="install"?"Installing":"Uninstalling"} ${ht(le)} integration…`,output:ae});ae.write(`${ye}
`)}),0}catch(te){return console.error(Wn(te)),1}}function Wn(I){let q=I instanceof Error?I.message:String(I),Q=typeof I==="object"&&I!==null&&"code"in I?I.code:null;if(Q==="EACCES"||Q==="EPERM")return`${q}
Check file permissions for the target config file and parent directory.`;if(Q==="ENOENT")return`${q}
Check that the target config path and parent directory exist.`;if(Q==="ENOTDIR")return`${q}
Check that every parent path component is a directory.`;return q}import{mkdirSync as fg}from"node:fs";import{dirname as mg}from"node:path";import{createInterface as gg}from"node:readline";import{existsSync as jc,readFileSync as lg}from"node:fs";function jt(I,q){return oe(qe(Je(I,q).issues,Ye,(Q)=>Q.kind==="custom")," "," ")}function Fc(I,q){return{"safety.level":I.safety.level,...Ri("safety.overrides",I.safety.overrides),"workflow.worktree_mode":String(I.workflow.worktree_mode),"destructive_command_protection.enabled":String(I.destructive_command_protection.enabled),...Ri("destructive_command_protection.overrides",I.destructive_command_protection.overrides),"destructive_command_protection.allow_paths":Pi(I.destructive_command_protection.allow_paths),"secret_protection.enabled":String(I.secret_protection.enabled),...Ri("secret_protection.overrides",I.secret_protection.overrides),"secret_protection.deny_paths":Pi(I.secret_protection.deny_paths),"secret_protection.allow_paths":Pi(I.secret_protection.allow_paths),...q?{"audit.retention_days":String(I.audit.retention_days)}:{}}}function Gr(I,q,Q){let te=Fc(I,Q),ne=Fc(q,Q);return[...new Set([...Object.keys(te),...Object.keys(ne)])].flatMap((ae)=>te[ae]===ne[ae]?[]:[{field:ae,before:te[ae],after:ne[ae]}])}function Yn(I,q){let Q=d(I,q);if(!jc(Q))return{baseline:g(globalThis.__CC_SAFETY_NET_EMBEDDED_POLICY__,I.home),diagnostics:[]};let te=un(Q);return{baseline:g(te.value,I.home),diagnostics:te.errors.length>0?te.errors:jt(te.value,I.home)}}function un(I){if(!jc(I))return{errors:[`${I}: file not found`]};try{return{value:JSON.parse(lg(I,"utf-8")),errors:[]}}catch(q){let Q=q instanceof Error?q.message:String(q);return{errors:[`${I}: ${q instanceof SyntaxError?`Invalid JSON: ${Q}`:Q}`]}}}function Br(I,q){let Q=cg(I)?I:{};return{version:q.version,...Object.fromEntries(["safety","workflow","destructive_command_protection","secret_protection"].filter((te)=>Q[te]!==void 0).map((te)=>[te,Q[te]]))}}function Ri(I,q){return Object.fromEntries(Object.entries(q).flatMap(([Q,te])=>te===void 0?[]:[[`${I}.${Q}`,String(te)]]))}function Pi(I){return I.length===0?"(none)":I.join(", ")}function cg(I){return!!I&&typeof I==="object"&&!Array.isArray(I)}import{chmodSync as dg,existsSync as Nc,mkdirSync as ug,readFileSync as Mc}from"node:fs";import{dirname as pg}from"node:path";function Hc(I,q={}){let Q=d(I,q);if(!Nc(Q))return{path:Q,exists:!1,raw:"",policy:B(),errors:[]};let te=Mc(Q,"utf-8");if(!te.trim())return{path:Q,exists:!0,raw:te,policy:B(),errors:["Config file is empty"]};try{let ne=JSON.parse(te),ae=jt(ne,I.home);return{path:Q,exists:!0,raw:te,policy:g(ne,I.home),errors:ae}}catch(ne){return{path:Q,exists:!0,raw:te,policy:B(),errors:[`Invalid JSON: ${ne instanceof Error?ne.message:String(ne)}`]}}}function Wt(I,q,Q={}){let te=d(I,Q),ne=jt(q,I.home),ae=ne.length>0?B():g(q,I.home);if(ne.length>0)return{path:te,policy:ae,errors:ne};return ug(pg(te),{recursive:!0,mode:448}),h(D(te),`${JSON.stringify(ae,null,2)}
`,384),dg(te,384),{path:te,policy:ae,errors:[]}}function Uc(I,q){let Q=jt(q,I.home);if(Q.length>0)return{errors:Q};return{preview:Te(g(q,I.home),I.env),errors:[]}}function Gc(I,q={}){let Q=d(I,q);if(!Nc(Q))return Wt(I,Z,q);let te=Mc(Q,"utf-8");if(!te.trim())return Wt(I,Z,q);try{return Wt(I,g(JSON.parse(te),I.home),q)}catch{return Wt(I,Z,q)}}var Bc=new Set(["check","apply"]),qc="(unset)";async function zc(I,q,Q={}){let te=xt({label:"policy",booleans:{global:["-g","--global"]},positionals:"list"},q),ne=te.positionals[0],ae=[...te.errors,...ne&&!Bc.has(ne)?[`Unknown policy subcommand: ${ne}`]:[],...ne&&Bc.has(ne)&&!te.positionals[1]?[`policy ${ne} requires a file`]:[],...te.positionals.slice(2).map((Xe)=>`Unexpected policy argument: ${Xe}`)];if(ae.length>0){for(let Xe of ae)console.error(Xe);return 1}let le=te.positionals[1];if(!ne||!le)return kn(tr,console.error),1;let ye=te.flags.global?d(I):b(Q.cwd??process.cwd()),ve=un(le),be=[...ve.errors,...jt(ve.value,I.home).map((Xe)=>`${le}: ${Xe}`),...!te.flags.global&&vg(ve.value)&&ve.value.audit!==void 0?[`${le}: audit settings are user scope only; remove the audit section from a project proposal`]:[]];if(be.length>0){for(let Xe of be)console.error(Xe);return 1}let Ce=g(ve.value,I.home);if(console.log(`Scope: ${te.flags.global?"user":"project"} (${ye})`),console.log(`Proposal: ${le}`),te.flags.global)Vc(g(un(ye).value,I.home),Ce,!0);if(!te.flags.global){let Xe=Yn(I).baseline;console.log("Effective policy (user + project merged):"),Vc(J(Xe,se(un(ye).value,I.home).policy).policy,J(Xe,se(ve.value,I.home).policy).policy,!1)}if(ne==="check")return 0;let Ee=Q.input??process.stdin,Ie=Q.output??process.stdout;if(!Ee.isTTY||!Ie.isTTY)return console.error("policy apply confirms interactively; run this yourself in a terminal:"),console.error(`  cc-safety-net policy apply ${le}${te.flags.global?" --global":""}`),1;if(!await yg(`Apply this policy to ${ye}? [y/N] `,Ee,Ie))return console.log("Cancelled; nothing was written."),0;return hg(I,ye,ve.value,Ce,te.flags.global),console.log(`Policy applied: ${ye}`),0}function yg(I,q,Q){let te=gg({input:q,output:Q,terminal:!1});return new Promise((ne)=>{te.once("close",()=>ne(!1)),te.question(I,(ae)=>{ne(/^y(es)?$/i.test(ae.trim())),te.close()})})}function hg(I,q,Q,te,ne){if(ne){Wt(I,te);return}fg(mg(q),{recursive:!0}),Rt(q,Br(Q,te))}function Vc(I,q,Q){let te=Gr(I,q,Q);if(te.length===0){console.log("No changes.");return}console.log(`Changes (${te.length}):`);for(let ne of te)console.log(`  ${ne.field}: ${ne.before??qc} -> ${ne.after??qc}`)}function vg(I){return!!I&&typeof I==="object"&&!Array.isArray(I)}import{join as _y}from"node:path";var Jc="# Custom Rules Reference\n\nAgent reference for generating CC Safety Net rulebook configuration.\n\n## Config Locations\n\n| Scope | Config path | Rulebook path | Priority |\n|-------|-------------|---------------|----------|\n| User | `~/.cc-safety-net/rules/rule.json` | `~/.cc-safety-net/rules/<rulebook-name>/rulebook.json` | First |\n| Project | `.cc-safety-net/rules/rule.json` | `.cc-safety-net/rules/<rulebook-name>/rulebook.json` | Second |\n| GitHub source | Listed in a local `rule.json` | Vendored into the consumer's `<rulebook-name>/rulebook.json` by `rule add` | Source order |\n\nEvery rulebook is a live file: the runtime reads it on each tool call, so an edit applies to the next command with no publishing step.\n\nUser scope is evaluated before project scope; within a scope, sources apply in `rules` array order. A duplicate active rulebook name keeps the first claim and ignores the later rulebook with a warning, so a user-scoped name shadows a project-scoped one.\n\nUse `cc-safety-net rule init` to create an inert local config. Use `--global` for user scope. Use `cc-safety-net rule init --example` to also create an inactive example rulebook. `CC_SAFETY_NET_HOME` overrides the `~/.cc-safety-net` user root.\n\nLegacy inline `.safety-net.json` and `~/.cc-safety-net/config.json` files are not loaded at runtime. Convert them with `cc-safety-net rule migrate`.\n\n## rule.json Schema\n\n```json\n{\n  \"version\": 1,\n  \"rules\": [\"project-rules\", \"owner/repo#main/team-rules\"],\n  \"overrides\": {\n    \"project-rules/block-docker-system-prune\": {\n      \"reason\": \"Use targeted Docker cleanup commands.\"\n    },\n    \"team-rules/block-npm-global\": \"off\"\n  },\n  \"transparent_wrappers\": [\"rtk\"]\n}\n```\n\n- `version`: Required. Must be `1`.\n- `$schema`: Optional. `cc-safety-net rule verify` inserts it into a valid `rule.json` that lacks it.\n- `rules`: Optional array of rulebook source strings. Missing `rules` is treated as `[]`.\n- `overrides`: Optional object keyed by `<rulebook-name>/<rule-name>`.\n- `overrides` values are either `\"off\"` to disable a rule or an object with a required `reason` (replacement block reason) and an optional `intent` (one of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain`).\n- A project override cannot target a user-scoped rule: only that override is ignored, the user rule keeps its configured state, and `rule verify` reports the diagnostic as a failure.\n- `transparent_wrappers`: Optional array of command names that transparently execute a visible child command.\n- Transparent wrappers have no built-in defaults. Configure only wrappers you intentionally trust, such as `\"rtk\"`.\n- Use `cc-safety-net rule wrapper add rtk` to configure RTK without manually editing `rule.json`.\n\n## Rulebook Sources\n\n- Local sources are bare rulebook names such as `project-rules`; the rulebook file is `.cc-safety-net/rules/project-rules/rulebook.json`.\n- Run `cc-safety-net rule add owner/repo` to add every rulebook currently present on the repository's default branch.\n- Use `--only` to select one or more rulebooks while preserving their order: `cc-safety-net rule add owner/repo --only aws gcloud`.\n- Use `--ref` to select a branch, tag, or commit instead of the default branch: `cc-safety-net rule add owner/repo --ref v2 --only aws`.\n- GitHub sources are stored in canonical form as `owner/repo#ref/<rulebook-name>`. That form remains valid in `rule.json` and as direct CLI input.\n- GitHub refs may contain `/`-separated path segments, such as `feature/rulebook-v2`.\n- The GitHub source name, the repository directory name, and the rulebook `name` must match exactly.\n- Rulebook source strings must be unique in a config.\n\n## rulebook.json Schema\n\n```json\n{\n  \"rulebook_version\": 1,\n  \"name\": \"project-rules\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Project-specific CC Safety Net rules.\",\n  \"author\": \"project\",\n  \"allowed_commands\": [\"docker\"],\n  \"rules\": [\n    {\n      \"name\": \"block-docker-system-prune\",\n      \"command\": \"docker\",\n      \"subcommand\": \"system\",\n      \"block_args\": [\"prune\"],\n      \"reason\": \"Use targeted cleanup instead.\"\n    }\n  ],\n  \"tests\": [\n    {\n      \"command\": \"docker system prune\",\n      \"expect\": \"blocked\",\n      \"rule\": \"block-docker-system-prune\"\n    },\n    {\n      \"command\": \"docker ps\",\n      \"expect\": \"allowed\"\n    }\n  ]\n}\n```\n\n### Rulebook Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `rulebook_version` | Yes | Must be `1` or `2` |\n| `name` | Yes | `^[a-zA-Z][a-zA-Z0-9_-]{0,63}$` |\n| `version` | Yes | Non-empty string |\n| `description` | No | Free text; not type-checked at runtime |\n| `author` | No | Free text; not type-checked at runtime |\n| `allowed_commands` | Yes | Unique command names matching `^[a-zA-Z][a-zA-Z0-9_-]*$` |\n| `rules` | Yes | Array of rule objects |\n| `tests` | No | Array of fixtures |\n\n### Rule Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Unique within the rulebook (case-insensitive); same pattern as rulebook `name` |\n| `command` | Yes | Must be listed in `allowed_commands`; basename only, not path |\n| `subcommand` | No | Same pattern as `command`; omit to match any subcommand |\n| `intent` | No | One of `hard_stop`, `use_alternative`, `scope_down`, `manual_only`, `stop_and_explain` |\n| `block_args` | Yes | Non-empty array of non-empty strings |\n| `reason` | Yes | Non-empty string, max 256 chars |\n\n### Rule Fields (`rulebook_version` 2)\n\nVersion 2 replaces `subcommand` and `block_args` with an exact-token `match` object. Version 1 rulebooks keep their fields and their behavior; a client that does not support version 2 rejects the rulebook instead of applying broader version 1 semantics.\n\n```json\n{\n  \"name\": \"block-terraform-apply-destroy\",\n  \"command\": \"terraform\",\n  \"match\": {\n    \"command_path\": [\"apply\"],\n    \"any_args\": [\"-destroy\", \"--destroy\"]\n  },\n  \"reason\": \"Review a destroy plan first with 'terraform plan -destroy'.\",\n  \"intent\": \"use_alternative\"\n}\n```\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `name` | Yes | Same as version 1 |\n| `command` | Yes | Same as version 1 |\n| `match.command_path` | Yes | Non-empty array of non-empty command words |\n| `match.any_args` | No | Non-empty array of unique non-empty argument tokens |\n| `match.exclude_args` | No | Non-empty array of unique non-empty argument tokens |\n| `intent` | No | Same as version 1 |\n| `reason` | Yes | Same as version 1 |\n\n### Matching Behavior (`rulebook_version` 2)\n\n- **Command**: Normalized to lowercase basename, as in version 1.\n- **Command path**: After recognized global options and their values are skipped, the next command words must equal `command_path` exactly. AWS, gcloud, and Azure CLI value-taking global options are built in; Terraform's `-chdir=dir` is `=`-joined and is skipped with its own token.\n- **Unrecognized options**: A token starting with `-` that is not a recognized global option is skipped without consuming a value, so an unlisted value-taking option with a separate value (`--newflag value`) makes the rule miss. This fails open deliberately; document such gaps in the rulebook.\n- **`any_args`**: At least one listed token must appear literally among the arguments.\n- **`exclude_args`**: Any listed token appearing literally among the arguments prevents the match, which is how a safe preview such as `aws s3 rm --dryrun` stays allowed.\n- **No short-option expansion**: Arguments compare as exact tokens, so list every accepted spelling (`\"-destroy\"` and `\"--destroy\"`).\n- **Literal and case-sensitive**: No regex, glob, or substring matching. The first matching rule wins.\n- Release channels are separate rules: `gcloud beta compute instances delete` needs its own `command_path`.\n\n### Test Fixture Fields\n\n| Field | Required | Constraints |\n|-------|----------|-------------|\n| `command` | Yes | Non-empty shell command string |\n| `expect` | Yes | `\"blocked\"` or `\"allowed\"` |\n| `rule` | Required for blocked fixtures | Rule name expected to block the command |\n\nFixtures are optional documentation of intended behavior. Version 1 fixtures are shape-validated only. Version 2 fixtures are evaluated against the rulebook's own rules when a source is fetched by `rule add` or `rule update`, and by `rule verify`; a failing fixture rejects that source before it is written. Loading a rulebook does not re-evaluate fixtures. CC Safety Net never executes fixture commands; they are analyzer inputs only.\n\n## Matching Behavior\n\nThe subcommand, argument, and option rules below describe `rulebook_version` 1 rules; version 2 rules match as described in Matching Behavior (`rulebook_version` 2). Execution order and transparent wrappers apply to both.\n\n- **Command**: Normalized to lowercase basename with any trailing `.exe` removed (`/usr/bin/git` → `git`).\n- **Subcommand**: The first command token after recognized Git and Docker global options and their values; `--` ends option parsing. An unrecognized option without `=` may consume the following token as its value.\n- **Arguments**: Each `block_args` value is compared literally against every command token, including expanded short options. The command is blocked if **any** item matches.\n- **Short options**: Expanded (`-Ap` matches `-A`).\n- **Long options**: Exact match (`--all-files` does not match `--all`).\n- **Execution order**: Built-in rules first, then custom rulebooks. Custom rules only add restrictions.\n- **Transparent wrappers**: A configured wrapper such as `rtk` lets `rtk git commit` be analyzed as `git commit` only when `git` is protected by built-in analyzers or active custom rules. `rtk -- git commit` is also supported.\n\n## Workflow\n\n1. Run `cc-safety-net rule init` or create `rule.json` manually.\n2. Optionally run `cc-safety-net rule init --example` to create an inactive example rulebook.\n3. Use `cc-safety-net rule wrapper add rtk` for trusted transparent wrappers.\n4. Run `cc-safety-net rule add <source>` after creating or choosing a rulebook source; add `--only <rulebook...>` or `--ref <ref>` for repository selection. The command adds the selected sources and syncs them.\n5. Edit a local rulebook whenever you like: the edit is enforced on the next command, so there is nothing to run afterwards.\n6. Run `cc-safety-net rule update [source]` to re-fetch remote sources and rewrite the vendored copies; the command prints what changed. A source with an ordinary update failure keeps its vendored copy while the other selected sources still update. Resource-limit failures remain fatal for the whole update.\n7. Run `cc-safety-net rule verify` to validate config, local rulebooks, and shareable GitHub-source rulebook directories in the current repository (it does not fetch remote content).\n8. Run `cc-safety-net rule list` to inspect active rulebooks and transparent wrappers.\n\nA missing or invalid rulebook file makes that source inactive, and an unreadable or invalid `rule.json` makes every source in its scope inactive. Inactive sources stop applying their rules while other custom rules and all built-in protections stay active. Fix the file named in the diagnostic, or run `cc-safety-net rule update` when a remote source has not been vendored yet. Run `cc-safety-net status` to see degraded sources.\n";function qr(I,q){if(!I.ok){Xc(I);return}Yc(I,q)}function Kc(I,q,Q){if(I.ok)console.log(Q);if(!I.add){qr(I,`Added rulebook source: ${q}`);return}if(!I.ok){Xc(I);return}if(I.add.added.length>0)console.log(`Added ${I.add.added.length} ${I.add.added.length===1?"rulebook":"rulebooks"} from ${I.add.source} at ${I.add.ref}:`),I.add.added.forEach((te)=>{console.log(`  - ${te}`)});if(I.add.alreadyConfigured.length>0)console.log(`Rulebooks already configured from ${I.add.source} at ${I.add.ref}: ${I.add.alreadyConfigured.join(", ")}`);if(I.add.commits.length>0)console.log(`Vendored at ${I.add.commits.map((te)=>te.slice(0,7)).join(", ")}.`);Yc(I,"Rule config updated.")}function Yc(I,q){for(let Q of I.changes??[])console.log(Q);console.log(q),console.log(""),bg(I.entries)}function bg(I){if(I.length===0){console.log("Active rulebooks: (none)");return}console.log(`Active rulebooks (${I.length}):`);for(let q of I)console.log(`  - ${q.name} ${q.version} (${Lg(q.ruleCount)})`),console.log(`    Source: ${q.spec}`)}function Lg(I){return`${I} ${I===1?"rule":"rules"}`}function Zc(I){pn("Active sources",I.rulebooks,(q)=>[`[${q.source}] ${q.name} ${q.version}`,`  Source: ${q.spec}`]),pn("Active rules",I.rules,(q)=>[`[${kg(I,q.name)}] ${q.name}`,...wg(q),`  Reason: ${q.reason}`]),pn("Disabled rules",Wc(I,"off"),(q)=>[q.key]),pn("Reason overrides",Wc(I,"reason"),(q)=>[q.key,`  Reason: ${q.value.reason}`]),pn("Transparent wrappers",I.transparent_wrappers,(q)=>[q]),pn("Issues",I.errors,(q)=>[q]),pn("Warnings",I.warnings,(q)=>[q])}function pn(I,q,Q){if(q.length===0){console.log(`${I}: (none)`);return}console.log(`${I} (${q.length}):`);for(let te of q){let[ne,...ae]=Q(te);console.log(`  - ${ne}`);for(let le of ae)console.log(`    ${le}`)}}function wg(I){if(!I.match)return[`  Command: ${I.subcommand?`${I.command} ${I.subcommand}`:I.command}`,`  Block args: ${I.block_args.join(", ")}`];return[`  Command: ${[I.command,...I.match.command_path].join(" ")}`,...I.match.any_args?[`  Any args: ${I.match.any_args.join(", ")}`]:[],...I.match.exclude_args?[`  Exclude args: ${I.match.exclude_args.join(", ")}`]:[]]}function kg(I,q){return I.rulebooks.find((Q)=>Q.rules.includes(q))?.source??"project"}function Wc(I,q){return Object.entries({...I.userConfig?.overrides??{},...I.projectConfig?.overrides??{}}).filter((Q)=>{if(q==="off")return Q[1]==="off";return!!Q[1]&&typeof Q[1]==="object"}).map(([Q,te])=>({key:Q,value:te}))}function Xc(I){for(let q of I.errors)console.error(q)}import{dirname as wd,join as Xr}from"node:path";import{join as Ti,resolve as Ig}from"node:path";function Ei(I){let q=m(I);if(q.errors.length>0)return{ok:!1,result:{ok:!1,errors:q.errors,entries:[]}};return{ok:!0,config:q.config??it}}function Qc(I,q=[]){Rt(I,{version:1,rules:q,overrides:{},transparent_wrappers:[]})}function ed(I,q="project-rules"){Rt(I,{rulebook_version:1,name:q,version:"1.0.0",description:q==="project-rules"?"Project-specific CC Safety Net rules.":"User-specific CC Safety Net rules.",author:q==="project-rules"?"project":"user",allowed_commands:["docker"],rules:[{name:"block-docker-system-prune",command:"docker",subcommand:"system",block_args:["prune"],reason:"Use targeted cleanup instead."}],tests:[{command:"docker system prune",expect:"blocked",rule:"block-docker-system-prune"}]})}import{dirname as Wr}from"node:path";var xg="custom.";function Vr(I){if(I.rulebook_version!==2)return[];let q=I.rules.map((Q)=>({name:Q.name,command:Q.command,block_args:[],match:Q.match,reason:Q.reason,intent:Q.intent}));return(I.tests??[]).flatMap((Q,te)=>{let ne=Di(y(Q.command));if(ne.length===0)return[`tests[${te}]: could not parse fixture command: ${Q.command}`];let ae=ne.reduce((le,ye)=>le??k(ye,q)?.id.slice(xg.length),void 0);if(Q.expect==="blocked"){if(ae===Q.rule)return[];let le=ae?`"${ae}" matched first`:"no rule matched";return[`tests[${te}]: expected "${Q.rule}" to block "${Q.command}" but ${le}`]}return ae?[`tests[${te}]: expected "${Q.command}" to be allowed but "${ae}" matched`]:[]})}function Di(I){return I.nodes.flatMap((q)=>{if(q.kind==="group"||q.kind==="function")return Di(q.body);if(q.kind!=="command")return[];let Q=he(X(q.dialect,q.words)).words.map(t);return[...Q.length>0?[Q]:[],...q.nested.flatMap((te)=>Di(te))]})}var zr=Object.freeze({concurrency:4,maxRequests:131,maxResponseBytes:67108864});function Jr(I={}){return{requests:0,responseBytes:0,maxRequests:I.maxRequests??zr.maxRequests,maxResponseBytes:I.maxResponseBytes??zr.maxResponseBytes}}function Kt(I){return{controller:new AbortController,budget:Jr(),resolveUrl:I}}function td(I){return I instanceof Error&&I.message==="Rule synchronization exceeds CC Safety Net's safe resource limits."}function nd(I){if(I.requests>=I.maxRequests)throw Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");I.requests++}function rd(I,q){if(q>I.maxResponseBytes-I.responseBytes)throw I.responseBytes+=q,Error("Rule synchronization exceeds CC Safety Net's safe resource limits.");I.responseBytes+=q}var sd=Object.freeze({timeoutMs:15000,metadataBytes:524288,commitBytes:262144,treeBytes:16777216,rawBytes:4194304});async function od(I,q,Q=w(Wr(Wr(q)),"rules policy"),te=Kt()){if(S(I))return Pg(I,te);return Rg(I,q,Q)}async function ad(I,q,Q,te,ne,ae){if(!S(I))return od(I,q,Q,te);let le=ne?null:Cg(I,q,Q);if(le)return le;if(!ne&&!ae)throw Error(`${I} is not vendored; run rule update ${I} to vendor it`);return od(I,q,Q,te)}function Cg(I,q,Q=w(Wr(Wr(q)),"rules policy")){let te=O(I),ne=N(q,te.name),ae=r(s(Q,ne));if(ae===null)return null;let le=ie(Ai(ae,`Invalid rulebook ${ne}.`));if(le.name!==te.name)throw Error(`rulebook name "${le.name}" in ${ne} must match "${te.name}"`);return{spec:I,rulebook:le,content:ae}}async function ld(I,q={}){if(!K(I))throw Error(`Invalid GitHub repository source: ${I}`);let[Q,te]=I.split("/");if(!Q||!te)throw Error(`Invalid GitHub repository source: ${I}`);if(q.ref!==void 0&&!re(q.ref))throw Error(`GitHub rulebook refs must use valid path segments: ${q.ref}`);let ne=q.operation??Kt(),ae=q.ref??await Sg(Q,te,I,ne),le=await dd(Q,te,ae,I,ne),ye=await Kr(`https://api.github.com/repos/${Q}/${te}/git/trees/${le}?recursive=1`,"tree",ne),ve=ye.response;if(!ve.ok)throw Error(`Failed to inspect ${I}: GitHub tree returned ${ve.status}`);let be=JSON.parse(ye.content);if(!Array.isArray(be?.tree))throw Error(`Failed to inspect ${I}: unexpected GitHub tree response`);let Ce=be.tree,Ee=[...new Set(Ce.flatMap((Ie)=>{if(!Ie||typeof Ie!=="object")return[];let et=Ie;if(et.type!=="blob"||typeof et.path!=="string")return[];let Xe=et.path.match(rt);return Xe?.[1]?[Xe[1]]:[]}))].sort();if(Ee.length===0)throw Error(`No rulebooks found in ${I} under ${ue}/`);return{source:I,owner:Q,repo:te,ref:ae,commit:le,names:Ee}}async function Sg(I,q,Q,te){let ne=await Kr(`https://api.github.com/repos/${I}/${q}`,"metadata",te),ae=ne.response;if(!ae.ok)throw Error(`Failed to inspect ${Q}: GitHub returned ${ae.status}`);let ye=JSON.parse(ne.content)?.default_branch;if(typeof ye!=="string"||ye==="")throw Error(`Failed to inspect ${Q}: missing default branch`);if(!re(ye))throw Error(`GitHub returned an invalid default branch: ${ye}`);return ye}function Rg(I,q,Q){ot(I);let te=N(q,I),ne=r(s(Q,te));if(ne===null)throw Error(`Rulebook source not found: ${I}`);let ae=cd(Ai(ne,"Invalid local rulebook source."));if(ae.name!==I)throw Error(`rulebook name "${ae.name}" must match local source "${I}"`);return{spec:I,rulebook:ae,content:ne}}async function Pg(I,q){let Q=O(I),te=await dd(Q.owner,Q.repo,Q.ref,I,q),ne=await Kr(`https://raw.githubusercontent.com/${Q.owner}/${Q.repo}/${te}/${Q.path}`,"raw",q),ae=ne.response;if(!ae.ok)throw Error(`Failed to fetch ${I}: GitHub raw returned ${ae.status}`);let le=ne.content,ye=cd(Ai(le,"Invalid GitHub rulebook response."));if(ye.name!==Q.name)throw Error(`rulebook name "${ye.name}" must match GitHub source "${Q.name}"`);return{spec:I,rulebook:ye,content:le}}function cd(I){let q=ie(I),Q=Vr(q);if(Q.length>0)throw Error(Q.join("; "));return q}function Ai(I,q){try{return JSON.parse(I)}catch{throw Error(q)}}async function dd(I,q,Q,te,ne){let ae=await Kr(`https://api.github.com/repos/${I}/${q}/commits/${encodeURIComponent(Q)}`,"commit",ne),le=ae.response;if(!le.ok)throw Error(`Failed to resolve ${te}: GitHub returned ${le.status}`);let ye=JSON.parse(ae.content);if(typeof ye?.sha!=="string"||ye.sha==="")throw Error(`Failed to resolve commit for ${te}`);return ye.sha}async function Eg(I,q,Q={}){if(Q.signal?.aborted)throw Q.signal.reason;let te=Q.budget??Jr(),ne=new AbortController,ae=()=>ne.abort(Q.signal?.reason);Q.signal?.addEventListener("abort",ae,{once:!0});let le=!1,ye=setTimeout(()=>{if(ne.signal.aborted)return;le=!0,ne.abort()},Q.timeoutMs??sd.timeoutMs);try{if(Q.signal?.aborted)throw Q.signal.reason;nd(te);let ve=await(Q.fetch??fetch)(I,{signal:ne.signal,redirect:"error"});if(!ve.ok)return ud(ve),{response:ve,content:""};return{response:ve,content:await Dg(ve,q,te,()=>ne.abort())}}catch(ve){if(le)throw Error("GitHub request timed out",{cause:ve});if(Q.signal?.aborted)throw Q.signal.reason;throw ve}finally{clearTimeout(ye),Q.signal?.removeEventListener("abort",ae)}}function Kr(I,q,Q){return Eg(Q.resolveUrl?.(I)??I,q,{budget:Q.budget,signal:Q.controller.signal})}async function Dg(I,q,Q=Jr(),te){let ne=sd[`${q}Bytes`],ae=Number(I.headers.get("content-length"));if(Number.isFinite(ae)&&ae>ne)throw ud(I),Error(`GitHub ${q} response exceeds ${ne} bytes`);if(!I.body)return"";let le=I.body.getReader(),ye=[],ve=0;while(!0){let be=await le.read();if(be.done)break;try{rd(Q,be.value.byteLength)}catch(Ce){throw te?.(),id(le),Ce}if(ve+=be.value.byteLength,ve>ne)throw te?.(),id(le),Error(`GitHub ${q} response exceeds ${ne} bytes`);ye.push(Buffer.from(be.value))}return Buffer.concat(ye,ve).toString("utf-8")}function ud(I){if(!I.body)return;pd(()=>I.body?.cancel())}function id(I){pd(()=>I.cancel())}function pd(I){try{Promise.resolve(I()).catch(()=>{})}catch{}}var Ag=/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)#(.+)$/;function fd(I,q){let Q=yd(I.rules,q);if(Q.length>0)return{ok:!0,specs:Q};return gd(I.rules,q)}function md(I,q){let Q=yd(I,q);if(Q.length>0)return{ok:!0,specs:Q};let te=Tg(I,q);if(te.length>0)return{ok:!0,specs:te};let ne=$g(I,q);if(!ne.ok)return ne;if(ne.specs.length>0)return{ok:!0,specs:ne.specs};return gd(I,q)}function gd(I,q){let Q=I.filter((te)=>_i(te)?.name===q);if(Q.length===1)return{ok:!0,specs:Q};return _g(q,Q)}function _g(I,q){return{ok:!1,result:{ok:!1,errors:q.length===0?[`No configured rulebook matches ${I}`]:[`Ambiguous rulebook match ${I}: ${q.join(", ")}`],entries:[]}}}function yd(I,q){return I.filter((Q)=>Q===q)}function Tg(I,q){let Q=q.match(Ag),te=Q?.[1],ne=Q?.[2],ae=Q?.[3];if(!te||!ne||!ae||!re(ae))return[];return hd(I,(le)=>le.owner===te&&le.repo===ne&&le.ref===ae)}function $g(I,q){if(!K(q))return{ok:!0,specs:[]};let[Q,te]=q.split("/"),ne=hd(I,(le)=>le.owner===Q&&le.repo===te);if(new Set(ne.map((le)=>_i(le)?.ref).filter((le)=>!!le)).size<2)return{ok:!0,specs:ne};return{ok:!1,result:{ok:!1,errors:[`Multiple refs are configured for ${q}. Use an explicit ref:`,`  cc-safety-net rule remove ${q}#<ref>`],entries:[]}}}function _i(I){try{return O(I)}catch{return null}}function hd(I,q){return I.filter((Q)=>{let te=_i(Q);return te?q(te):!1})}async function Zr(I,q={}){let Q=$i(q);return Og(I,Q,await Yr(I,Q,Kt()))}function Og(I,q,Q){if(!Q.ok)return Q;let te=Pt(I,q),ne=[...new Set(H(te.configPath,te.filesystemScope))];if(ne.length===0)return Q;return{ok:!1,errors:ne,entries:Q.entries}}async function Yr(I,q,Q,te={},ne=new Set,ae=new Set){try{let le=Pt(I,q),ye=Ei(le.configTarget);if(!ye.ok)return ye.result;let ve=ye.config,be=q.only?fd(ve,q.only):{ok:!0,specs:ve.rules};if(!be.ok)return be.result;let Ce=new Set([...q.refresh?be.specs:[],...ne]),Ee=(pt)=>ad(pt,le.configDir,le.filesystemScope,Q,Ce.has(pt),!q.refresh||Ce.has(pt)),Ie=await zg(ve.rules,q.refresh?(pt)=>Ee(pt).then((bt)=>({ok:!0,item:bt})).catch((bt)=>{if(td(bt))throw bt;return{ok:!1,spec:pt,message:bt instanceof Error?bt.message:String(bt)}}):async(pt)=>({ok:!0,item:await Ee(pt)}),Q),et=Ie.filter((pt)=>!pt.ok),Xe=Ie.filter((pt)=>pt.ok).map((pt)=>pt.item),at=Xe.flatMap((pt)=>Fg(pt,ve.rules)),ct=Xe.flatMap((pt)=>jg(pt,ae,le)),lt=new Set([...at,...ct].map((pt)=>pt.spec)),ft=[...et,...at,...ct],dt=[],gt=Mg(dt,()=>Xe.flatMap((pt)=>lt.has(pt.spec)||ft.length>0&&ae.has(pt.spec)?[]:Ng(pt,le,te,dt)));return{ok:ft.length===0,errors:ft.map((pt)=>`Failed to update ${pt.spec}: ${pt.message}`),entries:Xe.map(Ug),changes:gt}}catch(le){return Xn(le)}}function Fg(I,q){if(!S(I.spec))return[];let Q=Ae(I.spec),te=q.filter((ne)=>ne!==I.spec&&Ae(ne).toLowerCase()===Q.toLowerCase());if(te.length===0)return[];return[{ok:!1,spec:I.spec,message:`rulebook name "${Q}" is also claimed by ${te.join(", ")}; rename one of them`}]}function jg(I,q,Q){if(!q.has(I.spec)||!S(I.spec))return[];let te=N(Q.configDir,I.rulebook.name),ne=r(s(Q.filesystemScope,te));if(ne===null||ne===I.content)return[];return[{ok:!1,spec:I.spec,message:`${te} already exists and no configured source claims it; remove or rename the file, then re-run rule add`}]}function Ng(I,q,Q,te){if(!S(I.spec))return[];let ne=N(q.configDir,I.rulebook.name),ae=s(q.filesystemScope,ne),le=r(ae);if(le===I.content)return[];return te?.push({target:ae,previous:le}),h(ae,I.content,void 0,Q._testAfterPolicyRename),Hg(I,le)}function Mg(I,q){try{return q()}catch(Q){for(let te of[...I].reverse()){if(te.previous===null){j(te.target);continue}h(te.target,te.previous)}throw Q}}function Hg(I,q){if(q===null)return[`Vendored ${I.spec} (${I.rulebook.version})`];let Q=ge(q),te="problem"in Q?null:Q.rulebook,ne=new Map(te?.rules.map((le)=>[le.name,JSON.stringify(le)])??[]),ae=new Set(I.rulebook.rules.map((le)=>le.name));return[`Updated ${I.spec} (${te?.version??"unreadable"} -> ${I.rulebook.version})`,...[...ae].filter((le)=>!ne.has(le)).map((le)=>`  + ${le}`),...[...ne.keys()].filter((le)=>!ae.has(le)).map((le)=>`  - ${le}`),...I.rulebook.rules.filter((le)=>{let ye=ne.get(le.name);return ye!==void 0&&ye!==JSON.stringify(le)}).map((le)=>`  ~ ${le.name}`)]}function Ug(I){return{spec:I.spec,name:I.rulebook.name,version:I.rulebook.version,ruleCount:I.rulebook.rules.length}}async function vd(I,q,Q={}){return Gg(I,q,Wg(Q),Kt())}async function Gg(I,q,Q,te,ne={}){let ae=null,le=!1;try{let ye=Pt(I,Q),ve=r(ye.configTarget);ae={target:ye.configTarget,content:ve};let be=Ei(ye.configTarget);if(!be.ok)return be.result;let Ce=be.config,Ee=K(q);Bg(q,Q,Ee);let Ie=Ee?await ld(q,{ref:Q.ref,operation:te}):null,et=Ie?qg(Ie,Q.rulebooks):[],Xe=Ie?et.map((dt)=>Vg(Ce.rules,Ie,dt)??`${q}#${Ie.ref}/${dt}`):[q],at=Xe.filter((dt)=>!Ce.rules.includes(dt)),ct=[...Ce.rules,...at];if(ct.length>fe)return Jg();if(ct.length!==Ce.rules.length)le=!0,Rt(ye.configTarget,{version:1,rules:ct,overrides:Ce.overrides??{},transparent_wrappers:Ce.transparent_wrappers??[]},void 0,ne._testAfterPolicyRename);let lt=await Yr(I,Q,te,ne,new Set(at),new Set(at));if(!lt.ok)Zn(ye.configTarget,ve);if(!lt.ok||!Ie)return lt;let ft=et.filter((dt,gt)=>at.includes(Xe[gt]??""));return{...lt,add:{source:q,ref:Ie.ref,selected:et,added:ft,alreadyConfigured:et.filter((dt)=>!ft.includes(dt)),commits:at.length>0?[Ie.commit]:[]}}}catch(ye){if(le&&ae)try{Zn(ae.target,ae.content)}catch(ve){return Xn(ve)}return Xn(ye)}}function Bg(I,q,Q){if(!Q&&q.rulebooks!==void 0)throw Error("--only can only select rulebooks from an owner/repo source");if(!Q&&q.ref)throw Error(`--ref can only select a ref for an owner/repo source: ${I}`);if(q.rulebooks?.length===0)throw Error("--only requires at least one rulebook name");let te=q.rulebooks?.filter((ne)=>!c.test(ne))??[];if(te.length>0)throw Error(`Invalid rulebook names: ${te.join(", ")}`)}function qg(I,q){let Q=q?[...new Set(q)]:I.names,te=Q.filter((ne)=>!I.names.includes(ne));if(te.length>0)throw Error(`Rulebooks not found in ${I.source} at ${I.ref}: ${te.join(", ")}
Available rulebooks: ${I.names.join(", ")}`);return Q}function Vg(I,q,Q){let te=`${q.source}#${q.ref}/${Q}`;if(I.includes(te))return te;let ne=`${q.source}#${q.commit}/${Q}`;return I.find((ae)=>ae===ne)}async function zg(I,q,Q=Kt()){if(I.length>fe)throw Error(me);let te=Array(I.length),ne=0,ae,le=Array.from({length:Math.min(I.length,zr.concurrency)},async()=>{while(!ae){let ye=ne;if(ye>=I.length)return;ne++;try{te[ye]=await q(I[ye],ye,Q.controller.signal)}catch(ve){if(!ae)ae={value:ve},ne=I.length,Q.controller.abort(ve);return}}});if(await Promise.all(le),ae)throw ae.value;return te}function Jg(){return{ok:!1,errors:[me],entries:[]}}function $i(I){return{cwd:I.cwd,userConfigDir:I.userConfigDir,userConfigPath:I.userConfigPath,projectConfigPath:I.projectConfigPath,global:I.global,only:I.only,refresh:I.refresh}}function Wg(I){return{...$i(I),ref:I.ref,rulebooks:I.rulebooks}}function Kg(I){return{...$i(I),deleteSource:I.deleteSource}}async function bd(I,q,Q={}){try{return await Yg(I,q,Kg(Q),{})}catch(te){return Xn(te)}}async function Yg(I,q,Q,te){let ne=Pt(I,Q),ae=m(ne.configTarget);if(ae.errors.length>0)return{ok:!1,errors:ae.errors,entries:[]};if(!ae.config)return{ok:!1,errors:[`No config found at ${ne.configPath}`],entries:[]};let le=md(ae.config.rules,q);if(!le.ok)return le.result;let ye=Q.deleteSource?Zg(ne.configDir,le.specs,ne.filesystemScope):{ok:!0,dirs:[]};if(!ye.ok)return ye.result;let ve=r(ne.configTarget);if(ve===null)return Xn(Error("Rules config is unavailable."));try{Rt(ne.configTarget,{version:1,rules:ae.config.rules.filter((Ee)=>!le.specs.includes(Ee)),overrides:ae.config.overrides??{},transparent_wrappers:ae.config.transparent_wrappers??[]},void 0,te._testAfterPolicyRename)}catch(Ee){throw Zn(ne.configTarget,ve),Ee}let be=await Yr(I,Q,Kt(),te);if(!be.ok)return Zn(ne.configTarget,ve),be;let Ce=Xg(ye.dirs,te,ne.filesystemScope);if(!Ce.ok){Zn(ne.configTarget,ve);let Ee=await Yr(I,Q,Kt(),te);if(!Ee.ok)return{ok:!1,errors:[...Ce.result.errors,...Ee.errors],entries:Ee.entries};return Ce.result}return be}function Zg(I,q,Q){let te=q.flatMap((ye)=>c.test(ye)?[]:["--delete-source can only delete local rulebook sources"]),ne=q.map((ye)=>Ti(I,ye)),ae=te.length>0?[]:ne.flatMap((ye)=>Ld(ye,Q)),le=[...te,...ae];return le.length>0?{ok:!1,result:{ok:!1,errors:le,entries:[]}}:{ok:!0,dirs:ne}}function Ld(I,q){let Q=Ig(I),te=s(q,Q),ne=ce(te);if(!ne)return[`Local rulebook source directory not found: ${I}`];let ae=ne.find((le)=>le.name==="rulebook.json");if(!ae)return[`Local rulebook source directory is missing rulebook.json: ${I}`];if(ae.kind!=="file")throw new o(q.label);if(r(s(q,Ti(Q,"rulebook.json"))),ne.length>1)return[`Local rulebook source directory contains extra files: ${I}. delete manually if you really want to remove the directory.`];return[]}function Xg(I,q,Q){let te=I.flatMap((ne)=>{try{if(!ce(s(Q,ne)))return[];let ae=Ld(ne,Q);if(ae.length>0)return ae;return Qg(ne,q,Q),[]}catch(ae){return[`Failed to delete local rulebook source ${ne}: ${ae instanceof Error?ae.message:String(ae)}`]}});return te.length>0?{ok:!1,result:{ok:!1,errors:te,entries:[]}}:{ok:!0}}function Qg(I,q,Q){if(q._testDeleteLocalSourceDir){q._testDeleteLocalSourceDir(I);return}j(s(Q,Ti(I,de))),nt(s(Q,I))}function Zn(I,q){if(q===null){j(I);return}h(I,q)}function Xn(I){return{ok:!1,errors:[I instanceof Error?I.message:String(I)],entries:[]}}var ey=".safety-net.json",ty="~/.cc-safety-net/config.json";async function Cd(I,q){return[await kd(I,{legacyPath:Gs({cwd:q.cwd}),configPath:_(q.cwd),defaultRulebookName:"project-rules",migratedFrom:ey,cleanup:q.cleanup,syncOptions:{cwd:q.cwd}}),await kd(I,{legacyPath:ir(I),configPath:A(I),defaultRulebookName:"user-rules",migratedFrom:ty,cleanup:q.cleanup,syncOptions:{cwd:q.cwd,global:!0}})].every((te)=>te)?0:1}async function kd(I,q){let Q=Pt(I,q.syncOptions),te=s(Q.filesystemScope,q.legacyPath),ne=r(te);if(ne===null)return console.log(`No legacy config found at ${q.legacyPath}`),!0;let ae=ry(ne);if(!ae.ok){for(let et of ae.errors)console.error(et);return!1}let le=m(Q.configTarget);if(le.errors.length>0){for(let et of le.errors)console.error(et);return!1}let ye=le.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},ve=oy(wd(q.configPath),ye.rules,q.defaultRulebookName,q.migratedFrom,Q.filesystemScope),be=Xr(wd(q.configPath),ve,"rulebook.json"),Ce=s(Q.filesystemScope,be),Ee=[xd(Q.configTarget),xd(Ce)],Ie=await ny(I,q,Q.configTarget,Ce,ve,ae.config.rules,ye.rules.includes(ve)?ye.rules:[...ye.rules,ve],ye.overrides??{},ye.transparent_wrappers??[]);if(!Ie.ok){ay(Ee);for(let et of Ie.errors)console.error(et);return!1}if(!q.cleanup)return console.log(`Migrated legacy config at ${q.legacyPath}. Legacy file is no longer used.`),!0;if(!sy(Q.configTarget,Ce,ve,q.migratedFrom,ae.config.rules))return console.error(`Migration cleanup verification failed for ${q.legacyPath}`),!1;return j(te),console.log(`Deleted legacy config at ${q.legacyPath}`),!0}async function ny(I,q,Q,te,ne,ae,le,ye,ve){try{return Rt(Q,{version:1,rules:le,overrides:ye,transparent_wrappers:ve}),Rt(te,iy(ne,q.migratedFrom,ae)),await Zr(I,q.syncOptions)}catch(be){return{ok:!1,errors:[be instanceof Error?be.message:String(be)]}}}function ry(I){try{let q=JSON.parse(I),Q=lo(q);if(Q.errors.length>0)return{ok:!1,errors:Q.errors};return{ok:!0,config:{version:1,rules:q.rules??[]}}}catch{return{ok:!1,errors:["Invalid JSON"]}}}function oy(I,q,Q,te,ne){let ae=q.find((le)=>ly(s(ne,Xr(I,le,"rulebook.json")))===te);if(ae)return ae;if(r(s(ne,Xr(I,Q,"rulebook.json")))===null)return Q;for(let le=2;;le++){let ye=`${Q}-${le}`;if(r(s(ne,Xr(I,ye,"rulebook.json")))===null)return ye}}function iy(I,q,Q){return{rulebook_version:1,name:I,version:"1.0.0",description:"Migrated CC Safety Net rules.",author:"project",migrated_from:q,allowed_commands:[...new Set(Q.map((te)=>te.command))],rules:Q,tests:Q.map((te)=>({command:[te.command,te.subcommand,te.block_args[0]].filter(Boolean).join(" "),expect:"blocked",rule:te.name}))}}function sy(I,q,Q,te,ne){if(!m(I).config?.rules.includes(Q))return!1;try{let le=r(q);if(le===null)return!1;let ye=JSON.parse(le);return ye.migrated_from===te&&JSON.stringify(ye.rules)===JSON.stringify(ne)}catch{return!1}}function xd(I){return{target:I,content:r(I)}}function ay(I){for(let q of I){if(q.content===null){j(q.target);continue}h(q.target,q.content)}}function ly(I){let q=r(I);if(q===null)return null;try{let Q=JSON.parse(q);return typeof Q.migrated_from==="string"?Q.migrated_from:null}catch{return null}}import{mkdir as cy,readFile as dy,writeFile as uy}from"node:fs/promises";import{dirname as py,join as fy}from"node:path";var my=86400000,gy=604800000;async function Rd(I,q=Date.now()){if(I.env.get("CC_SAFETY_NET_NO_UPDATE_CHECK"))return null;let Q=je(I);if(!Q)return null;let te=fy(Q,".cc-safety-net","update-check.json"),ne=await yy(te,q);if(!ne.lastCheck||q-ne.lastCheck>my){let ye=await Zt();if(ne.lastCheck=q,ye.latestVersion)ne.latestVersion=ye.latestVersion;if(!await Sd(te,ne))return null;if(ye.error)return null}let ae=ne.latestVersion,le=wt();if(!ae||!go(ae,le))return null;if(ne.notifiedVersion===ae&&ne.notifiedAt!==void 0&&q-ne.notifiedAt<gy)return null;if(ne.notifiedVersion=ae,ne.notifiedAt=q,!await Sd(te,ne))return null;return`UPDATE_AVAILABLE: cc-safety-net v${ae} is available (running v${le}). Ask the user once whether to run \`npx -y cc-safety-net@latest update\`; continue the current task either way and do not raise this again.`}async function yy(I,q){let Q=await dy(I,"utf8").then((ae)=>JSON.parse(ae)).catch(()=>{return});if(!Q||typeof Q!=="object"||Array.isArray(Q))return{};let te=Q,ne=(ae)=>typeof ae==="number"&&Number.isFinite(ae)&&ae<=q?ae:void 0;return{lastCheck:ne(te.lastCheck),latestVersion:typeof te.latestVersion==="string"?te.latestVersion:void 0,notifiedVersion:typeof te.notifiedVersion==="string"?te.notifiedVersion:void 0,notifiedAt:ne(te.notifiedAt)}}async function Sd(I,q){return cy(py(I),{recursive:!0,mode:448}).then(()=>uy(I,JSON.stringify(q),{mode:384})).then(()=>!0).catch(()=>!1)}import{join as hy,resolve as Ii}from"node:path";var Pd="CC Safety Net Config",vy="═".repeat(Pd.length),by="https://raw.githubusercontent.com/kenryu42/cc-safety-net/main/assets/cc-safety-net.schema.json",Ly=new Set(["rule.json","rule.lock","cache"]);function Ed(I,q={}){try{return wy(I,q)}catch(Q){if(Q instanceof o)return console.error(Q.message),1;throw Q}}function wy(I,q){let Q=q.cwd??process.cwd(),te=q.userConfigPath??A(I),ne=q.projectConfigPath??_(Q),ae=q.legacyUserConfigPath??ir(I),le=q.legacyProjectConfigPath??us(Q),ye=Ii(Q,ue),ve=G(I,{cwd:Q,userConfigPath:te,projectConfigPath:ne}),be=G(I,{cwd:Q}),Ce=s(ve.userScope,te),Ee=s(ve.projectScope,ne),Ie=q.legacyUserConfigPath?D(q.legacyUserConfigPath,"user policy"):s(be.userScope,ae),et=q.legacyProjectConfigPath?D(q.legacyProjectConfigPath,"project policy"):s(be.projectScope,le),Xe=!1,at=!1,ct=[],lt=[],ft=ky(s(be.projectScope,ye));if(Cy(),r(Ce)!==null){let dt=Yt(Ce);if(dt.errors.push(...H(te,ve.userScope)),ct.push({scope:"User",path:te,result:dt,schema:"rules",target:Ce}),dt.errors.length>0)Xe=!0}if(r(Ie)!==null)if(at=!0,r(Ce)!==null)lt.push(Qr("user","cleanup"));else{let dt=co(Ie);if(ct.push({scope:"User",path:ae,result:dt,schema:"legacy",inactive:!0,target:Ie}),lt.push(Qr("user",dt.errors.length>0?"fix-or-delete":"migrate")),dt.errors.length>0)Xe=!0}if(r(Ee)!==null){let dt=Yt(Ee);if(dt.errors.push(...H(ne,ve.projectScope)),ct.push({scope:"Project",path:Ii(ne),result:dt,schema:"rules",target:Ee}),dt.errors.length>0)Xe=!0;if(r(et)!==null)at=!0,lt.push(Qr("project","cleanup"))}else if(r(et)!==null){at=!0,Xe=!0;let dt=co(et);ct.push({scope:"Project",path:Ii(le),result:dt,schema:"legacy",inactive:!0,target:et}),lt.push(Qr("project",dt.errors.length>0?"fix-or-delete":"migrate"))}if(ft?.result.errors.length)Xe=!0;if(ct.length===0&&!ft)return console.log(`
No config files found. Using built-in rules only.`),0;for(let dt of ct)if(dt.inactive)Ry(dt.scope,dt.path,dt.result);else if(dt.result.errors.length>0)Py(dt.scope,dt.path,dt.result.errors);else{if(dt.schema==="rules"&&Ay(dt.target))console.log(`
Added $schema to ${dt.scope.toLowerCase()} config.`);Sy(dt.scope,dt.path,dt.result,dt.schema)}for(let dt of lt)console.error(`
${ut.red(dt)}`);if(ft)if(ft.result.errors.length>0)Dy(ft.path,ft.result.errors);else Ey(ft.path,ft.result);if(Xe)return console.error(`
Config validation failed.`),1;return console.log(at?`
Configs valid with warnings.`:`
All configs valid.`),0}function Qr(I,q){let Q=`legacy ${I} config`;if(q==="cleanup")return`Warning: Legacy ${I} config is no longer needed. Run \`npx -y cc-safety-net rule migrate --cleanup\` to clean it up safely.`;if(q==="migrate")return`Warning: Legacy ${I} config is ignored by CC Safety Net. Run \`npx -y cc-safety-net rule migrate\`.`;return`Warning: Legacy ${I} config is no longer supported. Fix or delete the ${Q}, then run \`npx -y cc-safety-net rule migrate\`.`}function ky(I){if(ce(I)===null)return null;let q=xy(I);if(q.ruleNames.size===0&&q.errors.length===0)return null;return{path:I.path,result:q}}function xy(I){let q=[],Q=new Set,te=(ce(I)??[]).filter((ne)=>!Ly.has(ne.name)).sort((ne,ae)=>ne.name.localeCompare(ae.name));if(te.length===0)return{errors:q,ruleNames:Q};for(let ne of te){if(!c.test(ne.name)){q.push(`rulebook directory names must match ${c}: ${ne.name}`);continue}if(ne.kind!=="directory"){q.push(`${ne.name} must be a rulebook directory`);continue}let ae=s(I.scope,hy(I.path,ne.name,"rulebook.json")),le=r(ae);if(le===null){q.push(`${ne.name}/rulebook.json is required`);continue}try{let ye;try{ye=JSON.parse(le)}catch{q.push(`${ne.name}/rulebook.json: invalid JSON`);continue}let ve=ie(ye);if(ve.name!==ne.name){q.push(`rulebook name "${ve.name}" must match folder "${ne.name}"`);continue}let be=Vr(ve);if(be.length>0){q.push(...be.map((Ce)=>`${ne.name}/rulebook.json: ${Ce}`));continue}Q.add(ne.name)}catch(ye){q.push(ye instanceof Error?`${ne.name}/rulebook.json: ${ye.message}`:`${ne.name}/rulebook.json: ${String(ye)}`)}}return{errors:q,ruleNames:Q}}function Cy(){console.log(Pd),console.log(vy)}function Sy(I,q,Q,te){if(console.log(`
✓ ${I} config: ${q}`),console.log(`  Schema: ${te==="rules"?"rulebook sources":"legacy inline rules"}`),Q.ruleNames.size>0){console.log(`  ${te==="rules"?"Sources":"Rules"}:`);let ne=1;for(let ae of Q.ruleNames)console.log(`    ${ne}. ${ae}`),ne++}else console.log(`  ${te==="rules"?"Sources":"Rules"}: (none)`)}function Ry(I,q,Q){if(console.error(`
✗ Legacy ${I.toLowerCase()} config: ${q}`),console.error("  Schema: legacy inline rules"),console.error("  Status: ignored by CC Safety Net"),Q.errors.length>0){console.error("  Errors:");let te=1;for(let ne of Q.errors)for(let ae of ne.split("; "))console.error(`    ${te}. ${ae}`),te++;return}if(Q.ruleNames.size>0){console.error("  Rules:");let te=1;for(let ne of Q.ruleNames)console.error(`    ${te}. ${ne}`),te++;return}console.error("  Rules: (none)")}function Py(I,q,Q){Dd(`${I} config`,q,Q)}function Ey(I,q){console.log(`
✓ GitHub source rules: ${I}`),console.log("  Rulebooks:");let Q=1;for(let te of q.ruleNames)console.log(`    ${Q}. ${te}`),Q++}function Dy(I,q){Dd("GitHub source rules",I,q)}function Dd(I,q,Q){console.error(`
✗ ${I}: ${q}`),console.error("  Errors:");let te=1;for(let ne of Q)for(let ae of ne.split("; "))console.error(`    ${te}. ${ae}`),te++}function Ay(I){try{let q=r(I);if(q===null)return!1;let Q=JSON.parse(q);if(Q.$schema)return!1;return h(I,JSON.stringify({$schema:by,...Q},null,2)),!0}catch(q){if(q instanceof o)throw q;return!1}}var Ad=new Set(["init","add","remove","update","sync","list","wrapper","migrate","doc","verify"]),Ty=new Set(["add","remove","list"]),$y="cc-safety-net/rulebooks";async function _d(I,q){try{return await Iy(I,q)}catch(Q){if(Q instanceof o)return console.error(Q.message),1;throw Q}}async function Iy(I,q){let Q=Fy(q),te=Q.help?Oy(Q.positionals):null;if(te)return kn(te),0;if(Q.errors.length>0){for(let ye of Q.errors)console.error(ye);return 1}let ne=Q.positionals[0];if(!ne)return kn(mn,console.error),1;let ae=Q.positionals[1],le={global:Q.global};if(ne==="init"){let ye=Pt(I,le);Hy(ye.configTarget);let ve=_y(ye.configDir,"example-rules","rulebook.json"),be=s(ye.filesystemScope,ve);if(Q.example&&r(be)===null)ed(be,"example-rules");let Ce=H(ye.configPath,ye.filesystemScope);for(let Ee of Ce)console.error(Ee);if(Ce.length>0)return 1;return console.log("Rule config initialized."),0}if(ne==="add"){let ye=Td(Q);if(!ye)return console.error("rule add requires a source (pass --only <rulebook...> to select from cc-safety-net/rulebooks)"),1;let ve=Pt(I,le),be=await vd(I,ye,{...le,ref:Q.ref,rulebooks:Q.only.length>0?Q.only:void 0});return Kc(be,ye,`Scope: ${Q.global?"user":"project"} (${ve.configDir})`),be.ok?0:1}if(ne==="remove"){if(!ae)return console.error("rule remove requires a source"),1;let ye=await bd(I,ae,{...le,deleteSource:Q.deleteSource});return qr(ye,`Removed rulebook source: ${ae}`),ye.ok?0:1}if(ne==="update"){let ye=await Zr(I,{...le,only:ae,refresh:!0});return qr(ye,"Rule config updated."),ye.ok?0:1}if(ne==="sync")return Vs(I,{global:Q.global});if(ne==="list"){let ye=Y(I,{cwd:process.cwd()});return Zc(ye),ye.errors.length>0?1:0}if(ne==="wrapper")return Uy(I,Q);if(ne==="migrate")return Cd(I,{cleanup:Q.cleanup,cwd:process.cwd()});if(ne==="doc"){console.log(Jc);let ye=await Rd(I);if(ye)console.error(ye);return 0}if(ne==="verify")return Ed(I);return 1}function Oy(I){if(I.length===0)return mn;let q=mn.subcommands.filter((te)=>te.usage.split(" ")[0]===I[0]);if(q.length===0)return null;if(I.length===1&&q.length>1)return{name:`rule ${I[0]}`,description:`Subcommands of rule ${I[0]}`,usage:`rule ${I[0]} <subcommand>`,subcommands:q,options:[]};let Q=I.length===1?q[0]:q.find((te)=>te.usage.split(" ")[1]===I[1]);if(!Q)return null;return{name:`rule ${I[0]}`,description:Q.description,usage:`rule ${Q.usage}`,options:I[0]==="add"?io:[],examples:I[0]==="add"?so:void 0}}function Fy(I){let q=xt({label:"rule",booleans:{global:["-g","--global"],check:["--check"],cleanup:["--cleanup"],deleteSource:["--delete-source"],example:["--example"]},values:{ref:["--ref"]},lists:{only:["--only"]},positionals:"list"},I),Q={...q.flags,ref:q.values.ref,only:q.lists.only??[],help:q.help,positionals:q.positionals,errors:q.errors};return jy(Q),Q}function jy(I){let[q]=I.positionals;if(q&&!Ad.has(q))I.errors.push(`Unknown rule subcommand: ${q}`);if(I.deleteSource&&q!=="remove")if(q&&Ad.has(q))I.errors.push(`Unknown option for rule ${q}: --delete-source`);else I.errors.push("--delete-source is only valid with 'rule remove'");if(I.check&&q)I.errors.push(Pn(q,"--check"));if(I.cleanup&&q!=="migrate")I.errors.push(Pn(q,"--cleanup"));if(I.example&&q!=="init")I.errors.push(Pn(q,"--example"));if(I.ref&&q!=="add")I.errors.push(Pn(q,"--ref"));if(I.only.length>0&&q!=="add")I.errors.push(Pn(q,"--only"));if(q==="add")Ny(I);if(q==="migrate"){if(I.global)I.errors.push(Pn(q,"--global"));if(I.positionals.length>1)I.errors.push(`Unexpected rule migrate argument: ${I.positionals[1]}`)}else if(q==="wrapper")My(I);else if(I.positionals.length>2)I.errors.push(`Unexpected rule argument: ${I.positionals[2]}`);if(q==="list"&&I.global)I.errors.push("Unknown option for rule list: --global")}function Td(I){if(I.positionals[1])return I.positionals[1];if(I.ref||I.only.length>0)return $y;return}function Ny(I){let q=Td(I);if(!q)return;if((I.ref||I.only.length>0)&&!K(q)){if(I.ref)I.errors.push(`--ref can only select a ref for an owner/repo source: ${q}`);if(I.only.length>0)I.errors.push("--only can only select rulebooks from an owner/repo source");return}if(I.ref&&!re(I.ref))I.errors.push(`--ref must use valid path segments: ${I.ref}`);let Q=I.only.filter((te)=>!c.test(te));if(Q.length>0)I.errors.push(`Invalid rulebook names: ${Q.join(", ")}`)}function Pn(I,q){return I?`Unknown option for rule ${I}: ${q}`:`Unknown option for rule: ${q}`}function My(I){let q=I.positionals[1],Q=I.positionals[2];if(!q){I.errors.push("rule wrapper requires add, remove, or list");return}if(!Ty.has(q)){I.errors.push(`Unknown rule wrapper action: ${q}`);return}if(q==="list"){if(Q)I.errors.push(`Unexpected rule wrapper argument: ${Q}`);return}if(!Q){I.errors.push(`rule wrapper ${q} requires a command`);return}if(I.positionals.length>3)I.errors.push(`Unexpected rule wrapper argument: ${I.positionals[3]}`)}function Hy(I){if(r(I)===null){Qc(I);return}let q=m(I);if(!q.config)return;Rt(I,{version:1,rules:q.config.rules,overrides:q.config.overrides??{},transparent_wrappers:q.config.transparent_wrappers??[]})}async function Uy(I,q){let Q=q.positionals[1],te=q.positionals[2],ne=Pt(I,{global:q.global}).configTarget;if(Q==="list"){let ve=m(ne);if(ve.errors.length>0){for(let be of ve.errors)console.error(be);return 1}return Gy(ve.config?.transparent_wrappers??[]),0}if(!te||!x.test(te))return console.error("transparent wrapper must match command pattern"),1;if(Re(te))return console.error(`reserved command "${te}" cannot be a wrapper`),1;let ae=m(ne);if(ae.errors.length>0){for(let ve of ae.errors)console.error(ve);return 1}let le=ae.config??{version:1,rules:[],overrides:{},transparent_wrappers:[]},ye=Q==="add"?[...new Set([...le.transparent_wrappers??[],te])]:(le.transparent_wrappers??[]).filter((ve)=>ve!==te);return Rt(ne,{version:1,rules:le.rules,overrides:le.overrides??{},transparent_wrappers:ye}),console.log(Q==="add"?`Added transparent wrapper: ${te}`:`Removed transparent wrapper: ${te}`),0}function Gy(I){if(I.length===0){console.log("Transparent wrappers: (none)");return}console.log(`Transparent wrappers (${I.length}):`);for(let q of I)console.log(`  - ${q}`)}import{sep as Wy}from"node:path";import{existsSync as By,readFileSync as qy}from"node:fs";import{join as Vy}from"node:path";async function zy(I){if(I.isTTY)return null;return(await Ue(I).catch(()=>null))?.trim()||null}function Jy(I){let q=I.env.get("CLAUDE_SETTINGS_PATH");if(q)return q;return Vy(I.home,".claude","settings.json")}function Oi(I){let q=Jy(I);if(!By(q))return!1;try{let Q=qy(q,"utf-8"),te=JSON.parse(Q);if(!te.enabledPlugins)return!1;let ne="cc-safety-net@cc-marketplace";if(!(ne in te.enabledPlugins))return!1;return te.enabledPlugins[ne]===!0}catch(Q){if(P(i.debug,I.env))console.error(`CC Safety Net debug: failed to read Claude settings: ${q}: ${Q instanceof Error?Q.message:String(Q)}`);return!1}}async function Fi(I,q=process.stdin){let Q=Oi(I),te;if(!Q)te="\uD83D\uDEE1️ CC Safety Net ❌";else{let ae=L(I,{cwd:process.cwd()}),le=ae.policy,ye=R(le,I.env),ve=Object.values(U(le,ye.capabilities)).some((Ee)=>Ee.changesInherited),be={standard:"✅",strict:"\uD83D\uDD12",paranoid:"\uD83D\uDC41️",custom:"\uD83D\uDD27"}[ve?"custom":ye.effectiveLevel],Ce=(ae.policyScopes?.weakenings.length??0)>0?"\uD83D\uDD3B":"";te=`\uD83D\uDEE1️ CC Safety Net ${be}${ye.worktreeMode?"\uD83C\uDF33":""}${Ce}${ae.state==="degraded"?"⚠️":""}`}let ne=await zy(q);if(ne&&!ne.startsWith("{"))console.log(`${ne} | ${te}`);else console.log(te)}function $d(I){let q=L(I,{cwd:process.cwd()}),Q=q.policy,te=R(Q,I.env),ne=!!process.env.NO_COLOR||!process.stdout.isTTY,ae=Math.min(process.stdout.columns||80,100),le=ne?"ok":"✔",ye=ne?"OFF":"✘",ve=(at,ct)=>{let lt=`  ${at.padEnd(13)}${ct}`;return(lt.length>ae?`${lt.slice(0,ae-1)}…`:lt).replaceAll(ye,ut.red(ye))},be=Object.values(U(Q,te.capabilities)).some((at)=>at.changesInherited),Ce=(at)=>at===I.home||at.startsWith(`${I.home}${Wy}`)?`~${at.slice(I.home.length)}`:at,Ee={ready:ut.green,degraded:ut.yellow}[q.state],Ie=q.policyScopes?.weakenings??[],et=[...Oi(I)?[]:["plugin cc-safety-net@cc-marketplace is disabled in Claude Code; nothing is enforced in Claude Code until it is re-enabled. Other integrations are not affected."],...q.diagnostics],Xe=ne?"-":"·";console.log([`${ne?"":"\uD83D\uDEE1️  "}CC Safety Net — ${Ee(q.state)}`,"",ve("Protection",`destructive ${Q.destructiveCommandProtectionEnabled?le:ye}   secrets ${Q.secretProtection.enabled?le:ye}`),ve("Level",be?`${te.effectiveLevel} (customised)`:te.effectiveLevel),ve("Rules",Q.rules.length===0?"none active":`${Q.rules.length} active`),ve("Policy",Ce(d(I))),...q.policyScopes?[ve("Project",Ce(b(process.cwd())))]:[],...te.worktreeMode?[ve("Worktree","relaxations active")]:[],"",...Ie.length===0?[]:["  Project policy",...Ie.flatMap((at)=>Bn(at,"      ",ae-6).map((ct,lt)=>lt===0?`    ${ct}`:ct)),""],...et.length===0?["  Everything configured is active."]:["  Not active",...et.flatMap((at)=>Bn(at,"      ",ae-6).map((ct,lt)=>lt===0?`    ${Xe} ${ct}`:ct)),"","  Full report: cc-safety-net doctor"]].join(`
`))}import{spawn as qd}from"node:child_process";import{randomBytes as oh}from"node:crypto";import{existsSync as ih}from"node:fs";import{createServer as sh}from"node:http";import{Writable as ah}from"node:stream";var eo=500;function Ky(I){let q=I.filter((ne)=>ne.decision!=="allow"),Q=I.filter((ne)=>ne.decision==="allow"),te=Math.min(q.length,Math.max(eo-Q.length,Math.ceil(eo/2)));return[...q.slice(0,te),...Q.slice(0,eo-te)]}function Id(I,q,Q=M(I)){if(Q)V(I,Q);let te=(ct)=>new Date(ct.getFullYear(),ct.getMonth(),ct.getDate()).getTime(),ne=te(new Date),ae=new Date(ne);ae.setDate(ae.getDate()-(q-1));let le=ae.getTime(),ye=[],ve={count:0};for(let ct of Q?Qt(Q,ve):[])for(let lt of fn(ct,ve)){let ft=new Date(lt.ts).getTime();if(!Number.isFinite(ft))continue;if(ft>=le)ye.push(lt)}ye.sort((ct,lt)=>new Date(lt.ts).getTime()-new Date(ct.ts).getTime());let be=Array.from({length:q},()=>0),Ce=Array.from({length:q},()=>0),Ee={},Ie={},et={},Xe=0,at=0;for(let ct of ye){let lt=ct.agent||"unknown";Ee[lt]=(Ee[lt]??0)+1;let ft=Math.round((ne-te(new Date(ct.ts)))/86400000),dt=q-1-ft,gt=ft>=0&&ft<q;if(gt)Ce[dt]=(Ce[dt]??0)+1;if(ct.decision!=="allow"){if(Xe++,ct.ruleId)Ie[ct.ruleId]=(Ie[ct.ruleId]??0)+1;let pt=oo(ct.segment||ct.command);if(pt)et[pt]=(et[pt]??0)+1;if(ct.failureStage)at++;if(gt)be[dt]=(be[dt]??0)+1}}return{days:q,logsDir:Q,homeDir:I.home,totalInWindow:ye.length,truncated:ye.length>eo,unreadable:ve.count,counts:{blocked:Xe,allowed:ye.length-Xe,agents:Ee,blockedByDay:be,analyzedByDay:Ce,rules:Ie,commands:et,errors:at},entries:Ky(ye).sort((ct,lt)=>new Date(lt.ts).getTime()-new Date(ct.ts).getTime())}}import{spawn as Yy}from"node:child_process";import{existsSync as Zy,statSync as Od}from"node:fs";import{delimiter as Xy,join as Qy}from"node:path";var eh=120000,to="Choose the project folder",th=`try
  return POSIX path of (choose folder with prompt "${to}")
on error number -128
  return ""
end try`,nh=`Add-Type -AssemblyName System.Windows.Forms
$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
$dialog.Description = '${to}'
if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Out.Write($dialog.SelectedPath) }`,Fd=[{binary:"zenity",args:["--file-selection","--directory",`--title=${to}`]},{binary:"kdialog",args:["--getexistingdirectory",".","--title",to]}],jd=(I,q)=>(q.PATH??"").split(Xy).some((Q)=>{if(Q.length===0)return!1;try{let te=Od(Qy(Q,I));return te.isFile()&&(te.mode&73)!==0}catch{return!1}});function ji(I,q){if(I==="darwin"||I==="win32")return!0;if(I!=="linux")return!1;if(!q.DISPLAY&&!q.WAYLAND_DISPLAY)return!1;return Fd.some((Q)=>jd(Q.binary,q))}function rh(I,q){if(I==="darwin")return{cmd:"osascript",args:["-e",th]};if(I==="win32")return{cmd:"powershell.exe",args:["-NoProfile","-STA","-Command",nh]};let Q=Fd.find((te)=>jd(te.binary,q));return Q?{cmd:Q.binary,args:Q.args}:null}function Ni(I=process.platform,q=process.env){let Q=rh(I,q);if(!Q)return Promise.resolve({error:"No folder dialog is available on this system"});return new Promise((te)=>{let ne=Yy(Q.cmd,Q.args,{env:q,stdio:["ignore","pipe","pipe"]}),ae="",le=!1,ye=(be)=>{if(le)return;le=!0,clearTimeout(ve),te(be)},ve=setTimeout(()=>{ne.kill(),ye({error:"The folder dialog timed out"})},eh);ne.stdout.on("data",(be)=>{ae+=be.toString()}),ne.on("error",()=>ye({error:`Could not open the folder dialog (${Q.cmd})`})),ne.on("close",()=>{let be=ae.trim().replace(/\/+$/,"");if(!be)return ye({cancelled:!0});if(!Zy(be)||!Od(be).isDirectory())return ye({error:"That selection is not a folder on disk"});ye({path:be})})})}var Nd=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CC Safety Net</title>
  <link rel="icon" href="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221254%22%20height%3D%221254%22%20viewBox%3D%2254%2023%201140%201140%22%20role%3D%22img%22%20aria-label%3D%22Safety%20net%20logo%20mesh%20variant%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-0%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220.68%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220.29%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23f8fafc%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-1%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220.58%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220.24%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%237dd3fc%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-2%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220.7%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220.29%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22spot-3%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.9%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2256%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220.38%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20stop-opacity%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22edge%22%20x1%3D%2214%25%22%20y1%3D%228%25%22%20x2%3D%2288%25%22%20y2%3D%2294%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ffffff%22%20stop-opacity%3D%220.7%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%23bae6fd%22%20stop-opacity%3D%220.24%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%231e293b%22%20stop-opacity%3D%220.86%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3Cmask%20id%3D%22net-mask%22%20maskUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22black%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fmask%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Cg%3E%0A%20%20%20%20%3Cg%20mask%3D%22url(%23net-mask)%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22%2307090d%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22360%22%20cy%3D%22240%22%20r%3D%22430%22%20fill%3D%22url(%23spot-0)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22820%22%20cy%3D%22300%22%20r%3D%22430%22%20fill%3D%22url(%23spot-1)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22760%22%20cy%3D%22830%22%20r%3D%22500%22%20fill%3D%22url(%23spot-2)%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22300%22%20cy%3D%22780%22%20r%3D%22390%22%20fill%3D%22url(%23spot-3)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%221254%22%20height%3D%221254%22%20fill%3D%22url(%23edge)%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22url(%23edge)%22%20stroke-width%3D%2214%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%220.2%22%20stroke-width%3D%225%22%20stroke-linejoin%3D%22round%22%20transform%3D%22translate(-10%20-14)%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-46.32%22%20y%3D%22-47.38%22%20width%3D%2292.63%22%20height%3D%2294.75%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.75%20127.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-66.82%22%20y%3D%22-41.01%22%20width%3D%22133.64%22%20height%3D%2282.02%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(713.75%20230.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-134.00%22%20width%3D%2279.90%22%20height%3D%22267.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(588.00%20275.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-65.05%22%20width%3D%2279.20%22%20height%3D%22130.11%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(444.50%20320.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.29%22%20y%3D%22-40.31%22%20width%3D%22266.58%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(759.75%20369.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.07%22%20y%3D%22-39.24%22%20width%3D%22154.15%22%20height%3D%2278.49%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(533.25%20407.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.10%22%20y%3D%22-39.74%22%20width%3D%22134.21%22%20height%3D%2279.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(895.22%20413.86)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.84%22%20y%3D%22-134.04%22%20width%3D%2279.68%22%20height%3D%22268.08%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(401.36%20461.24)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-74.60%22%20width%3D%2279.20%22%20height%3D%22149.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(812.25%20500.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.60%22%20y%3D%22-77.43%22%20width%3D%2279.20%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(625.75%20500.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-67.18%22%20width%3D%2278.49%22%20height%3D%22134.35%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(263.25%20505.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.28%22%20y%3D%22-40.02%22%20width%3D%22266.56%22%20height%3D%2280.04%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(941.36%20551.76)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-54.80%22%20y%3D%22-53.74%22%20width%3D%22109.60%22%20height%3D%22107.48%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(1096.75%20593.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-77.43%22%20y%3D%22-40.31%22%20width%3D%22154.86%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(719.75%20594.25)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-51.97%22%20y%3D%22-54.45%22%20width%3D%22103.94%22%20height%3D%22108.89%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(155.25%20594.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-76.37%22%20y%3D%22-40.31%22%20width%3D%22152.74%22%20height%3D%2280.61%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(534.50%20595.50)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-135.12%22%20y%3D%22-40.16%22%20width%3D%22270.23%22%20height%3D%2280.32%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(307.96%20634.94)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-70.64%22%20width%3D%2280.05%22%20height%3D%22141.27%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(989.66%20680.72)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-38.90%22%20y%3D%22-77.27%22%20width%3D%2277.80%22%20height%3D%22154.54%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(442.49%20687.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.95%22%20y%3D%22-77.43%22%20width%3D%2279.90%22%20height%3D%22154.86%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(628.50%20689.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.40%22%20y%3D%22-134.46%22%20width%3D%2278.80%22%20height%3D%22268.92%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(853.69%20727.31)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-69.65%22%20y%3D%22-38.18%22%20width%3D%22139.30%22%20height%3D%2276.37%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(353.25%20771.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-78.44%22%20y%3D%22-39.44%22%20width%3D%22156.88%22%20height%3D%2278.88%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(720.61%20782.02)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-133.77%22%20y%3D%22-39.86%22%20width%3D%22267.53%22%20height%3D%2279.71%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(493.85%20820.81)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-39.24%22%20y%3D%22-66.82%22%20width%3D%2278.49%22%20height%3D%22133.64%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(806.50%20868.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-40.02%22%20y%3D%22-133.39%22%20width%3D%2280.05%22%20height%3D%22266.79%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(666.35%20914.10)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-67.18%22%20y%3D%22-39.60%22%20width%3D%22134.35%22%20height%3D%2279.20%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(540.00%20960.00)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%22-49.85%22%20y%3D%22-49.50%22%20width%3D%2299.70%22%20height%3D%2298.99%22%20rx%3D%2212.00%22%20ry%3D%2212.00%22%20transform%3D%22translate(627.25%201064.75)%20rotate(-45.00)%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A">
  <script>
    (() => {
      const stored = localStorage.getItem('cc-safety-net-theme');
      if (stored === 'light' || stored === 'dark') document.documentElement.style.colorScheme = stored;
    })();
  </script>
  <style>
:root {
  color-scheme: light dark;

  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --bg: light-dark(#f3f4f6, #0c0e11);
  --surface: light-dark(#ffffff, #16191d);
  --surface-2: light-dark(#f6f7f9, #1c2025);
  --btn-hover-fill: light-dark(#e9ebef, #282c33);
  --field-bg: light-dark(#ffffff, #101317);

  --ink: light-dark(#171a1f, #e7eaed);
  --muted: light-dark(#5b626c, #99a1ac);
  --meta: light-dark(#6b7280, #838b95);

  --border: light-dark(#e3e6ea, #292d33);
  --border-strong: light-dark(#cfd4da, #363b42);

  --switch-track: light-dark(#8b929c, #626973);
  --switch-track-hover: #767d87;
  --switch-knob: #ffffff;

  --focus-ring: var(--ink);

  --accent: light-dark(#166534, #3fb950);
  --safe: #14532d;
  --safe-hover: #0f3d20;
  --danger: #7f1d1d;
  --danger-hover: #641414;

  --star: light-dark(#b7791f, #f2c94c);

  --ok-fg: light-dark(#15803d, #4ade80);
  --ok-bg: light-dark(#edfaf1, #10251a);
  --ok-border: light-dark(#b7e4c7, #1f5133);

  --err-fg: light-dark(#b42318, #ff8078);
  --err-bg: light-dark(#fef2f1, #2b1512);
  --err-border: light-dark(#f2c9c4, #5c2620);

  --warn-fg: light-dark(#b45309, #fbbf24);
  --warn-bg: light-dark(#fefaf0, #2a2008);
  --warn-border: light-dark(#f2ddb0, #5c4a1d);

  --master: light-dark(#1d4ed8, #4c8dff);
  --master-fg: light-dark(#1e40af, #9ec3ff);
  --master-bg: light-dark(#eef4fe, #101a2b);
  --master-border: light-dark(#c5d6f6, #23446e);

  --strict-fg: light-dark(#1e40af, #9ec3ff);
  --strict-bg: light-dark(#eef4fe, #101a2b);
  --strict-border: light-dark(#c5d6f6, #23446e);
  --paranoid-fg: light-dark(#6b21a8, #d8b4fe);
  --paranoid-bg: light-dark(#faf5ff, #21152c);
  --paranoid-border: light-dark(#e4ccf4, #513064);

  --radius-sm: 6px;
  --radius: 8px;
  --radius-lg: 12px;

  --topbar-h: 58px;

  font-family: var(--font-sans);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-size: 13px;
  line-height: 1.4;
  -webkit-font-smoothing: antialiased;
}

.app-shell {
  display: grid;
  grid-template-columns: 224px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 14px;
  background: var(--surface);
  border-right: 1px solid var(--border);
}

.brand {
  padding: 0 10px;
}

h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand-logo {
  display: flex;
  color: var(--ink);
}

.brand-home {
  display: flex;
  color: inherit;
}

.brand-logo svg {
  width: auto;
  height: 30px;
}

.sidenav {
  display: grid;
  gap: 2px;
}

.sidenav a {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.sidenav a:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.sidenav a[aria-current="page"] {
  background: var(--btn-hover-fill);
  color: var(--ink);
}

.sidenav svg {
  width: 15px;
  height: 15px;
  flex: none;
}

.sidebar-foot {
  margin-top: auto;
  display: grid;
  gap: 10px;
  padding: 0 10px;
}

.sidebar-links {
  display: grid;
  gap: 5px;
  font-size: 12px;
}

.sidebar-links a {
  color: var(--meta);
  text-decoration: none;
}

.sidebar-links a:hover {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.sidebar-links a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}

.content {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.app-foot {
  display: none;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  min-height: var(--topbar-h);
  padding: 12px 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.topbar-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 1;
  max-width: 1040px;
  margin: 0 auto;
}

.topbar-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.app-status {
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
  line-height: 1.25;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
}

.app-status:empty {
  display: none;
}

.app-status.ok {
  color: var(--ok-fg);
  border-color: var(--ok-border);
  background: var(--ok-bg);
}

.app-status.error {
  color: var(--err-fg);
  border-color: var(--err-border);
  background: var(--err-bg);
}

.dirty-chip {
  padding: 6px 12px;
  border: 1px solid var(--warn-border);
  border-radius: 999px;
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
}

.view-search {
  display: flex;
  align-items: center;
  flex: 1 1 240px;
  min-width: 180px;
  max-width: 380px;
}

.topbar-search {
  flex: 1 1 auto;
  min-width: 0;
  max-width: 440px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

button:not(:disabled),
select,
label.row:not(.row-disabled),
label.rule-control,
input[type="checkbox"]:not(:disabled),
input[type="radio"]:not(:disabled) {
  cursor: pointer;
}

button {
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 8px 14px;
  background: var(--surface);
  color: var(--ink);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

button:hover:not(:disabled) {
  background: var(--surface-2);
  border-color: var(--muted);
}

#theme-toggle,
#raw-copy,
#activity-refresh,
#integrations-refresh,
#rules-refresh,
#tester-run,
#reset-rule-customizations,
#reset-secret-customizations,
.rule-example-button {
  border-color: transparent;
}

#theme-toggle:hover:not(:disabled),
#raw-copy:hover:not(:disabled),
#activity-refresh:hover:not(:disabled),
#integrations-refresh:hover:not(:disabled),
#rules-refresh:hover:not(:disabled),
#tester-run:hover:not(:disabled),
#reset-rule-customizations:hover:not(:disabled),
#reset-secret-customizations:hover:not(:disabled),
.rule-example-button:hover:not(:disabled) {
  background: var(--btn-hover-fill);
  border-color: transparent;
}

button:disabled {
  opacity: 0.6;
  cursor: progress;
}

button.primary {
  background: var(--safe);
  border-color: var(--safe);
  color: #fff;
}

button.primary:hover:not(:disabled) {
  background: var(--safe-hover);
  border-color: var(--safe-hover);
}

button.danger {
  background: var(--danger);
  border-color: var(--danger);
  color: #fff;
}

button.danger:hover:not(:disabled) {
  background: var(--danger-hover);
  border-color: var(--danger-hover);
}

#theme-toggle {
  display: inline-flex;
  align-items: center;
  align-self: flex-end;
  gap: 7px;
  color: var(--muted);
}

#theme-toggle:hover {
  color: var(--ink);
}

#theme-toggle svg {
  width: 15px;
  height: 15px;
}

button.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--muted);
}

button.icon-button:hover:not(:disabled) {
  color: var(--ink);
}

button.icon-button.copied {
  color: var(--ok-fg);
}

button.icon-button.copied:hover:not(:disabled) {
  color: var(--ok-fg);
}

button.icon-button svg {
  width: 16px;
  height: 16px;
}

:where(button, input, textarea):focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

main {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 24px 28px 48px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.view {
  display: grid;
  gap: 18px;
}

.view[hidden] {
  display: none;
}

.view-head .panel-sub {
  margin-top: 0;
}

.policy-savebar {
  position: sticky;
  top: var(--topbar-h);
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.savebar-actions {
  display: flex;
  gap: 8px;
}

.retention-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 12.5px;
  font-weight: 600;
}

.retention-row input {
  width: 84px;
  text-align: right;
}

.retention-note {
  margin: 8px 0 0;
  font-size: 12px;
}

.tiles-window {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 11.5px;
  font-weight: 600;
}

.tiles-window:empty {
  display: none;
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

.tiles:empty {
  display: none;
}

.tile {
  display: grid;
  grid-template-columns: 1fr minmax(0, 168px);
  grid-template-areas:
    "value spark"
    "label spark";
  align-items: center;
  gap: 3px 16px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.tile strong {
  grid-area: value;
  align-self: end;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.tile span {
  grid-area: label;
  align-self: start;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
}

.view-all-link {
  align-self: center;
  padding: 8px 14px;
  border-radius: var(--radius);
  color: var(--muted);
  font-size: 12.5px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.view-all-link:hover {
  background: var(--btn-hover-fill);
  color: var(--ink);
}

.protection-warning {
  border-color: var(--err-border);
  background: color-mix(in srgb, var(--err-bg) 60%, var(--surface));
}

.dual-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

@media (max-width: 720px) {
  .dual-panels {
    grid-template-columns: 1fr;
  }
}

#top-rules,
#top-commands {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2px;
}

.top-rule,
.top-command {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 7px 10px;
  border-color: transparent;
  background: transparent;
  border-radius: var(--radius-sm);
  text-align: left;
}

.top-rule:hover:not(:disabled),
.top-command:hover:not(:disabled) {
  background: var(--btn-hover-fill);
  border-color: transparent;
}

.top-rule .rule-id,
.top-command .rule-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.guard-errors {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--warn-border);
  border-radius: var(--radius);
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12.5px;
  font-weight: 600;
  text-align: left;
}

.activity-controls {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
}

.activity-controls-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.activity-days {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 650;
  color: var(--muted);
}

.activity-refresh {
  margin-left: auto;
}

@keyframes activity-refresh-spin {
  to {
    transform: rotate(360deg);
  }
}

.activity-refresh.spinning svg {
  animation: activity-refresh-spin 0.6s linear infinite;
}

.integrations-refresh,
.rules-refresh {
  margin-left: auto;
}

.integrations-refresh.spinning svg,
.rules-refresh.spinning svg {
  animation: activity-refresh-spin 0.6s linear infinite;
}

#integrations-list {
  display: grid;
  gap: 8px;
}

.integration-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.integration-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
}

.integration-row .status {
  grid-column: 1 / -1;
}

.integration-row button.primary,
.integration-row button.danger {
  min-width: 88px;
  background: transparent;
  border-color: transparent;
  color: var(--ink);
}

.integration-row button.primary:hover:not(:disabled),
.integration-row button.danger:hover:not(:disabled) {
  color: #fff;
}

#rules-composer-panel .field + .field,
.rules-composer-actions {
  margin-top: 14px;
}

.rules-path-row {
  display: flex;
  gap: 8px;
}

.rules-path-row input {
  flex: 1 1 auto;
  min-width: 0;
}

.rules-path-row button {
  flex: none;
}

#rules-project-path[readonly] {
  border-color: var(--border);
  color: var(--muted);
}

.rules-composer-actions {
  display: flex;
  justify-content: flex-end;
}

#rules-list,
#rules-diagnostics {
  display: grid;
  gap: 8px;
}

.rulebook-card {
  display: grid;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.rulebook-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  font-size: 12px;
  color: var(--muted);
}

.rulebook-rule {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.rulebook-head code,
.rulebook-rule code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.rulebook-rule .rule-id {
  color: var(--muted);
}

.rulebook-rule p {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

.rulebook-rule.rules-focus {
  margin: 0 -8px;
  padding: 10px 8px;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
}

select {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 8px 10px;
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
}

.chip-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.chip-row:empty {
  display: none;
}

button.chip {
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
}

button.chip[aria-pressed="true"] {
  background: var(--master-bg);
  border-color: var(--master-border);
  color: var(--master-fg);
}

.chip-count {
  font-variant-numeric: tabular-nums;
}

button.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: var(--master-bg);
  border-color: var(--master-border);
  color: var(--master-fg);
}

button.filter-pill code {
  font-family: var(--font-mono);
}

.filter-pill-x {
  opacity: 0.7;
}

.feed-list {
  display: grid;
  gap: 8px;
}

.feed-item {
  display: grid;
  gap: 7px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}

.feed-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--meta);
}

.feed-meta time {
  margin-left: auto;
  white-space: nowrap;
}

.feed-copy,
.feed-report {
  width: 26px;
  height: 26px;
  margin: -4px 0;
  border: 0;
  background: transparent;
}

.feed-copy:hover:not(:disabled),
.feed-report:hover:not(:disabled) {
  background: transparent;
}

.feed-copy svg,
.feed-report svg {
  width: 14px;
  height: 14px;
}

.feed-copy.copied svg {
  width: 12px;
  height: 12px;
}

.feed-meta .rule-id {
  font-family: var(--font-mono);
  color: var(--muted);
  overflow-wrap: anywhere;
}

#tester-result .rule-id {
  font-family: var(--font-mono);
}

button.rule-id {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
}

button.rule-id:hover {
  color: var(--ink);
  text-decoration: underline;
}

.decision-badge {
  padding: 1px 8px;
  border: 1px solid;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.decision-badge.deny {
  color: var(--err-fg);
  background: var(--err-bg);
  border-color: var(--err-border);
}

.decision-badge.allow {
  color: var(--ok-fg);
  background: var(--ok-bg);
  border-color: var(--ok-border);
}

.decision-badge.error {
  color: var(--warn-fg);
  background: var(--warn-bg);
  border-color: var(--warn-border);
}

.agent-badge {
  padding: 1px 8px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  color: var(--muted);
  font-weight: 600;
}

.feed-command,
.rule-example-popover code {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  font-family: var(--font-mono);
  font-size: 12px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.feed-command {
  padding: 8px 10px;
  max-width: 85ch;
  max-height: 7.2em;
  overflow: hidden;
}

.feed-command.clamped {
  mask-image: linear-gradient(180deg, #000 calc(100% - 1.6em), transparent);
}

.feed-command.expanded {
  max-height: none;
  mask-image: none;
}

.feed-toggle {
  align-self: flex-start;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.feed-block {
  align-self: center;
  font-size: 11px;
}

.feed-day-sep {
  padding-top: 6px;
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.tile-spark {
  grid-area: spark;
  display: flex;
  align-items: stretch;
  gap: 2px;
  width: 100%;
  height: 40px;
}

.spark-col {
  position: relative;
  display: flex;
  align-items: flex-end;
  flex: 1 1 0;
  min-width: 1px;
}

.spark-bar {
  width: 100%;
  background: var(--accent);
  border-radius: 1px;
}

.spark-bar.spark-zero {
  background: var(--border-strong);
}

.spark-col::after {
  content: attr(data-count);
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s ease;
}

.spark-col:hover::after,
.spark-col:focus-visible::after {
  opacity: 1;
}

.spark-col:focus-visible {
  border-radius: var(--radius-sm);
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.feed-reason {
  margin: 0;
  max-width: 85ch;
  font-size: 12px;
}

.activity-count {
  margin: 12px 0 0;
  font-size: 12px;
}

.activity-count:empty {
  display: none;
}

.info-rows {
  display: grid;
  gap: 10px;
}

.info-row {
  display: grid;
  gap: 3px;
}

.info-row > span {
  font-size: 12px;
  font-weight: 650;
  color: var(--muted);
}

.info-row code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.danger-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.danger-row strong {
  font-size: 13px;
}

.danger-row p {
  margin: 4px 0 0;
  font-size: 12px;
}

.status {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-size: 13px;
  line-height: 1.45;
  white-space: pre-wrap;
}

.status:empty {
  display: none;
}

.protection-banner {
  padding: 10px 14px;
  border: 1px solid var(--err-fg);
  border-radius: var(--radius);
  background: var(--err-bg);
  color: var(--err-fg);
  font-weight: 600;
}

.status.ok {
  color: var(--ok-fg);
  background: var(--ok-bg);
  border-color: var(--ok-border);
}

.status.error {
  color: var(--err-fg);
  background: var(--err-bg);
  border-color: var(--err-border);
}

.health-strip strong {
  color: var(--ink);
  font-weight: 650;
}

.recovery {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px;
  border: 1px solid var(--err-border);
  border-radius: var(--radius);
  background: var(--surface);
}

.recovery[hidden] {
  display: none;
}

.recovery strong {
  display: block;
  font-size: 13px;
}

.recovery p {
  margin: 4px 0 0;
}

.muted {
  color: var(--muted);
  line-height: 1.45;
}

.confirm-dialog {
  width: min(420px, calc(100vw - 32px));
  padding: 0;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--ink);
}

.rule-example-popover {
  position: fixed;
  inset: auto;
  width: min(360px, calc(100vw - 24px));
  margin: 0;
  padding: 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 4px 8px rgb(0 0 0 / 18%);
}

.rule-example-popover::backdrop {
  background: transparent;
}

.rule-example-popover > * {
  display: block;
}

.rule-example-label {
  margin-bottom: 3px;
  color: var(--muted);
  font-size: 11px;
}

.rule-example-popover strong {
  margin-bottom: 10px;
  font-size: 13px;
}

.rule-example-popover code {
  padding: 9px 10px;
}

.confirm-dialog::backdrop {
  background: rgb(0 0 0 / 48%);
}

.confirm-dialog form {
  display: grid;
  gap: 12px;
  padding: 18px;
}

.confirm-dialog h2 {
  margin: 0;
}

.confirm-dialog p {
  margin: 0;
}

.dialog-detail {
  padding: 9px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
  overflow-wrap: anywhere;
}

.dialog-detail code {
  font-family: var(--font-mono);
  font-size: 12px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
}

.report-dialog {
  width: min(680px, calc(100vw - 32px));
}

.confirm-dialog:has(.dialog-rows:not([hidden])) {
  width: min(620px, calc(100vw - 32px));
}

.dialog-rows {
  max-height: 46vh;
  overflow: auto;
}

.diff-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  text-align: left;
}

.diff-table th {
  padding: 4px 8px;
  border-bottom: 1px solid var(--border);
  color: var(--muted);
  font-weight: 600;
}

.diff-table td {
  padding: 5px 8px;
  border-bottom: 1px solid var(--border);
  overflow-wrap: anywhere;
  vertical-align: top;
}

.diff-table code {
  font-family: var(--font-mono);
  font-size: 11.5px;
}

.diff-before {
  color: var(--muted);
  text-decoration: line-through;
}

.diff-after {
  color: var(--ink);
  font-weight: 650;
}

.diff-warning {
  margin: 8px 0 0;
  padding: 7px 10px;
  border-left: 3px solid var(--warn-border);
  border-radius: var(--radius-sm);
  background: var(--warn-bg);
  color: var(--warn-fg);
  font-size: 12px;
}

.view-head-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.project-draft-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px;
  border: 1px solid var(--master-border);
  border-radius: var(--radius);
  background: var(--master-bg);
}

.project-draft-bar[hidden] {
  display: none;
}

.project-draft-target strong {
  display: block;
  font-size: 13px;
}

.project-draft-target code {
  font-family: var(--font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.project-draft-target p {
  margin: 4px 0 0;
  font-size: 12px;
}

.project-chip {
  flex: none;
  align-self: center;
  margin-left: auto;
  padding: 2px 9px;
  border: 1px solid var(--master-border);
  border-radius: 999px;
  background: var(--master-bg);
  color: var(--master-fg);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.project-chip.inherited {
  border-color: var(--border);
  background: var(--surface-2);
  color: var(--muted);
  font-weight: 600;
}

.rule-row > .project-chip {
  grid-column: 1 / -1;
  justify-self: end;
  margin-left: 0;
}

.project-field-line {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
}

.project-chip-slot:empty {
  display: none;
}

.row:has(.project-chip.inherited) strong {
  color: var(--muted);
}

.report-field {
  display: grid;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.panel-title {
  min-width: 0;
}

.raw-json-head {
  flex-wrap: nowrap;
}

.raw-json-head .panel-title {
  flex: 1 1 auto;
}

.raw-json-head #raw-copy {
  flex: none;
}

.panel-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin: -4px 0;
  padding: 4px 6px 4px 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.panel-toggle:hover {
  background: transparent;
  color: var(--ink);
}

.panel-chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-1px);
  transition: transform 0.15s ease;
}

.panel-toggle[aria-expanded="false"] .panel-chevron,
:is(.rule-tier-head, .tier-collapse)[aria-expanded="false"] .panel-chevron {
  transform: rotate(-45deg);
}

h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.panel-sub {
  margin: 4px 0 0;
  font-size: 12.5px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 8px;
}

label.row {
  display: flex;
  gap: 12px;
}

label.row,
.rule-row {
  align-items: flex-start;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

label.row:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

label.row.row-disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

label.row.row-disabled:hover {
  border-color: var(--border);
  background: var(--surface);
}

:is(label.row, .rule-control) input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  margin: 1px 0 0;
  width: 34px;
  height: 20px;
  flex: none;
  border: 1px solid var(--switch-track);
  border-radius: 999px;
  background: var(--switch-track);
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease;
}

:is(label.row, .rule-control) input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--switch-knob);
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
  transition: transform 0.18s ease;
}

:is(label.row, .rule-control) input[type="checkbox"]:checked {
  background: var(--accent);
  border-color: var(--accent);
}

:is(label.row, .rule-control) input[type="checkbox"]:checked::before {
  transform: translateX(14px);
}

:is(label.row, .rule-control):hover input[type="checkbox"]:not(:checked) {
  border-color: var(--switch-track-hover);
  background: var(--switch-track-hover);
}

label.row.safety-override-row {
  display: grid;
  gap: 8px;
}

label.row.safety-override-row select {
  width: 100%;
}

:is(label.row, .rule-control) span {
  display: block;
  min-width: 0;
}

:is(label.row, .rule-control) strong {
  font-weight: 650;
  font-size: 13px;
}

:is(label.row, .rule-control) .rule-id {
  display: block;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
  word-break: break-all;
}

:is(label.row, .rule-control) small {
  display: block;
  margin-top: 4px;
  font-size: 11.5px;
  color: var(--muted);
  line-height: 1.45;
}

#destructive-command > label.row {
  margin-bottom: 16px;
}

.preset-status {
  margin-bottom: 10px;
  font-weight: 700;
}

#safety-preset-status:empty {
  display: none;
}

.preset-status.customized {
  color: var(--master-fg);
}

.preset-standard {
  --preset-fg: var(--ok-fg);
  --preset-bg: var(--ok-bg);
  --preset-border: var(--ok-border);
}

.preset-strict {
  --preset-fg: var(--strict-fg);
  --preset-bg: var(--strict-bg);
  --preset-border: var(--strict-border);
}

.preset-paranoid {
  --preset-fg: var(--paranoid-fg);
  --preset-bg: var(--paranoid-bg);
  --preset-border: var(--paranoid-border);
}

#safety-level label.row:has(input:checked),
#safety-level label.row:has(input:checked):hover {
  border-color: var(--preset-border);
  background: var(--preset-bg);
  accent-color: var(--preset-fg);
}

#safety-level label.row:has(input:checked) strong {
  color: var(--preset-fg);
}

.panel-head-action {
  flex: none;
}

.rule-tier {
  overflow: clip;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
}

.rule-tier + .rule-tier,
#destructive-command-rules + .rule-tier {
  margin-top: 10px;
}

.rule-tier-enforced {
  border-color: var(--ok-border);
}

.rule-tier-strict {
  border-color: var(--strict-border);
}

.rule-tier-paranoid {
  border-color: var(--paranoid-border);
}

.rule-tier-head {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  padding: 9px 10px;
  border: 0;
  border-radius: 0;
  background: var(--surface-2);
  color: var(--ink);
  text-align: left;
}

.rule-tier-head:hover:not(:disabled) {
  background: var(--surface-2);
}

.tier-collapse {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  align-self: stretch;
  gap: 12px;
  margin: -9px -10px;
  padding: 9px 10px;
  border: 0;
  border-radius: 0;
  background: none;
  color: inherit;
  text-align: left;
}

.tier-switch {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 30px;
  height: 16px;
  flex: none;
  padding: 0;
  border: 0;
  background: none;
}

.tier-switch::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 6px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: var(--switch-track);
  transition: background-color 0.18s ease;
}

.tier-switch::before {
  content: "";
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--switch-knob);
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%);
  transition: transform 0.18s ease;
}

.tier-switch:checked::after {
  background: color-mix(in srgb, var(--accent) 45%, transparent);
}

.tier-switch:checked::before {
  transform: translateX(14px);
  background: var(--accent);
}

.rule-tier-enforced .rule-tier-head,
.rule-tier-enforced .rule-tier-head:hover:not(:disabled) {
  background: var(--ok-bg);
  color: var(--ok-fg);
}

.rule-tier-strict .rule-tier-head,
.rule-tier-strict .rule-tier-head:hover:not(:disabled) {
  background: var(--strict-bg);
  color: var(--strict-fg);
}

.rule-tier-paranoid .rule-tier-head,
.rule-tier-paranoid .rule-tier-head:hover:not(:disabled) {
  background: var(--paranoid-bg);
  color: var(--paranoid-fg);
}

.tier-label {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 1px;
}

.tier-label small,
.tier-counts {
  color: inherit;
  font-size: 11px;
}

.tier-counts {
  flex: none;
  font-weight: 500;
  text-align: right;
}

.tier-counts .count-off {
  color: var(--warn-fg);
}

.tier-content {
  padding: 12px;
  border-top: 1px solid var(--border);
}

.rule-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.rule-row:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
}

.rule-row.row-disabled {
  background: var(--surface);
}

.rule-control {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: flex-start;
  gap: 12px;
}

.rule-row.row-disabled .rule-control {
  cursor: not-allowed;
  opacity: 0.62;
}

.rule-example-button {
  position: relative;
  display: inline-flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  font-size: 12px;
  line-height: 1;
}

.rule-example-button::before {
  content: "";
  position: absolute;
  inset: -9px;
}

.rule-example-button:hover:not(:disabled) {
  color: var(--ink);
}

.inherit-button {
  grid-column: 1 / -1;
  justify-self: end;
  padding: 5px 8px;
  font-size: 11px;
}

label.row.master {
  align-items: center;
  padding: 12px 14px;
  border-color: var(--err-border);
  background: color-mix(in srgb, var(--err-bg) 60%, var(--surface));
}

label.row.master:hover {
  border-color: color-mix(in srgb, var(--err-fg) 34%, var(--err-border));
  background: var(--err-bg);
}

label.row.master:not(:has(input:checked)) {
  border-left: 3px solid var(--err-fg);
}

label.row.master:has(input:checked) {
  border-color: var(--master-border);
  background: color-mix(in srgb, var(--master-bg) 72%, var(--surface));
}

label.row.master:has(input:checked):hover {
  border-color: color-mix(in srgb, var(--master) 42%, var(--master-border));
  background: var(--master-bg);
}

label.row.master strong {
  font-size: 15px;
}

label.row.master input[type="checkbox"] {
  margin: 0;
  width: 44px;
  height: 24px;
}

label.row.master input[type="checkbox"]:checked {
  background: var(--master);
  border-color: var(--master);
}

label.row.master input[type="checkbox"]::before {
  width: 18px;
  height: 18px;
}

label.row.master input[type="checkbox"]:checked::before {
  transform: translateX(20px);
}

.master-badge {
  flex: none;
  margin-left: auto;
  padding: 2px 9px;
  border: 1px solid var(--err-border);
  border-radius: 999px;
  background: var(--err-bg);
  color: var(--err-fg);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

label.row.master:has(input:checked) .master-badge {
  border-color: var(--master-border);
  background: var(--master-bg);
  color: var(--master-fg);
}

.state-active {
  color: var(--ok-fg);
  font-weight: 700;
}

.state-disabled {
  color: var(--err-fg);
  font-weight: 700;
}

.destructive-command-group + .destructive-command-group {
  margin-top: 24px;
}

.destructive-command-group h3 {
  margin: 0 0 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}

.empty {
  margin: 0;
  padding: 16px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
  color: var(--muted);
  text-align: center;
}

#secret {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 4px;
}

.field-toggle .panel-toggle {
  justify-self: start;
  margin: -2px 0;
  padding: 2px 6px 2px 0;
  font-weight: 650;
}

#safety-level + .field,
.foldable-field-content + .field {
  margin-top: 14px;
}

#safety-overrides,
#workflow {
  margin-top: 4px;
}

.foldable-field-content {
  display: grid;
  gap: 4px;
}

.foldable-field-content > p {
  margin: 0;
  font-size: 12px;
}

.paths-content:not([hidden]) {
  display: grid;
  gap: 10px;
}

.paths-content > p.muted {
  margin: 0;
  font-size: 12px;
}

.field > span {
  font-size: 13px;
  font-weight: 650;
}

.field small {
  font-size: 11.5px;
  color: var(--muted);
  font-weight: 400;
  line-height: 1.45;
}

input[type="search"],
input[type="text"],
textarea {
  width: 100%;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 9px 11px;
  background: var(--field-bg);
  color: var(--ink);
  font: inherit;
  transition: border-color 0.15s ease;
}

input[type="search"]:hover,
input[type="text"]:hover,
textarea:hover {
  border-color: var(--muted);
}

input[type="search"]:focus,
input[type="text"]:focus,
textarea:focus {
  border-color: var(--muted);
  outline: none;
}

input[type="text"]:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.tester-row {
  display: flex;
  gap: 8px;
}

.tester-row input[type="text"] {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.tester-row button {
  flex: none;
  align-self: center;
}

#tester-result {
  margin-top: 12px;
}

.tester-segment {
  margin-top: 6px;
}

.paths-add {
  display: flex;
  gap: 8px;
}

.paths-add input[type="text"] {
  flex: 1 1 auto;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
}

.paths-add button {
  flex: none;
  align-self: center;
}

.paths-hint {
  margin: -6px 0 0;
  color: var(--err-fg);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.paths-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.path-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.path-item code {
  flex: 1 1 auto;
  min-width: 0;
  padding: 9px 11px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  font-family: var(--font-mono);
  font-size: 12.5px;
  overflow-wrap: anywhere;
}

.path-item button:hover:not(:disabled) {
  color: var(--err-fg);
  border-color: var(--err-border);
  background: var(--err-bg);
}

.path-item.row-disabled {
  opacity: 0.62;
}

.path-item.row-disabled button {
  cursor: not-allowed;
}

.path-item button {
  flex: none;
}

textarea {
  min-height: 96px;
  resize: vertical;
  font-family: var(--font-mono);
  font-size: 12.5px;
  line-height: 1.55;
}

#raw {
  min-height: 280px;
}

.star-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-2);
}

.star-pitch {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  color: var(--ink);
  font-size: 12.5px;
  line-height: 1.45;
}

.star-pitch strong {
  font-variant-numeric: tabular-nums;
}

.star-mechanism {
  display: block;
  margin-top: 2px;
  color: var(--meta);
  font-size: 11.5px;
}

#star-slot {
  display: inline-flex;
  flex: none;
}

.star-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: none;
  white-space: nowrap;
  padding: 8px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface);
  border-color: var(--border-strong);
  color: var(--muted);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.star-cta:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--star) 45%, var(--border-strong));
  background: var(--surface-2);
  color: var(--ink);
}

.star-cta:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.star-icon {
  display: inline-flex;
  width: 15px;
  height: 15px;
  color: var(--star);
}

.star-icon svg {
  width: 15px;
  height: 15px;
}

.star-count {
  display: inline-flex;
  align-items: center;
  align-self: stretch;
  border-left: 1px solid var(--border-strong);
  padding-left: 8px;
  color: var(--muted);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.star-cta.starred:disabled {
  opacity: 1;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    /* biome-ignore lint/complexity/noImportantStyles: reduced-motion must win over every class-level transition */
    transition: none !important;
  }

  .activity-refresh.spinning svg,
  .integrations-refresh.spinning svg,
  .rules-refresh.spinning svg {
    animation: none;
  }
}

@media (max-width: 900px) {
  .tiles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .app-shell {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    z-index: 100;
    height: var(--topbar-h);
    flex-direction: row;
    align-items: center;
    gap: 14px;
    padding: 0 16px;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .brand-logo svg {
    height: 20px;
  }

  .topbar {
    position: static;
    z-index: auto;
  }

  .topbar.has-search {
    position: sticky;
    top: var(--topbar-h);
    z-index: 95;
  }

  .policy-savebar {
    top: calc(var(--topbar-h) * 2);
  }

  .brand {
    flex: none;
    padding: 0;
  }

  main {
    flex: 1;
  }

  .app-foot {
    display: flex;
    justify-content: center;
    gap: 28px;
    padding: 16px;
    border-top: 1px solid var(--border);
    font-size: 12px;
  }

  .app-foot a {
    color: var(--meta);
    text-decoration: none;
  }

  .app-foot a:hover {
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .sidenav {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 2px;
  }

  .sidenav a {
    padding: 15px 7px;
  }

  .sr-only-collapse {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .sidebar-foot {
    display: none;
  }
}

@media (max-width: 640px) {
  .topbar {
    padding: 10px 16px;
  }

  .topbar-row {
    flex-wrap: wrap;
  }

  .topbar.has-search .topbar-row {
    flex-wrap: nowrap;
  }

  main {
    padding: 18px 16px 40px;
  }

  .topbar-search {
    max-width: none;
  }

  .panel {
    padding: 16px;
  }

  .star-row {
    flex-wrap: wrap;
  }

  .star-row .star-cta,
  .star-row #star-slot {
    flex: 1 1 100%;
    justify-content: center;
  }

  .panel-head {
    flex-direction: column;
  }

  .raw-json-head,
  .panel-head:has(.view-all-link) {
    flex-direction: row;
    align-items: center;
  }

  .grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .rule-tier-head,
  .tier-collapse {
    flex-wrap: wrap;
  }

  .rule-row {
    align-items: start;
  }

  .tier-counts {
    flex: 1 1 100%;
    padding-left: 20px;
    text-align: left;
  }

  .inherit-button {
    align-self: flex-start;
  }
}

@media (min-width: 1440px) {
  body[data-view="overview"] main,
  body[data-view="overview"] .topbar-row {
    max-width: 1200px;
  }
}

[hidden] {
  display: none;
}

  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <h1 class="brand-logo"><a class="brand-home" href="#overview" title="Overview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 512" role="img" aria-label="CC Safety Net">
  <path d="M 1439 165 L 1411 165 L 1409 166 L 1408 168 L 1403 173 L 1403 174 L 1398 179 L 1398 180 L 1395 183 L 1394 183 L 1394 184 L 1385 194 L 1385 195 L 1381 199 L 1381 200 L 1378 202 L 1378 203 L 1374 207 L 1374 208 L 1367 215 L 1367 216 L 1358 226 L 1358 227 L 1352 233 L 1352 234 L 1347 239 L 1347 240 L 1341 246 L 1341 247 L 1336 252 L 1336 253 L 1332 257 L 1332 258 L 1325 265 L 1325 266 L 1319 272 L 1319 273 L 1314 278 L 1314 279 L 1309 284 L 1309 285 L 1303 291 L 1303 292 L 1299 296 L 1299 297 L 1294 302 L 1291 299 L 1290 300 L 1290 301 L 1293 301 L 1294 302 L 1288 309 L 1287 308 L 1288 309 L 1286 312 L 1285 311 L 1285 306 L 1286 305 L 1286 303 L 1288 299 L 1288 296 L 1289 295 L 1289 292 L 1290 291 L 1290 287 L 1291 286 L 1291 284 L 1293 280 L 1293 277 L 1294 276 L 1294 272 L 1295 271 L 1295 269 L 1297 265 L 1297 262 L 1298 261 L 1298 258 L 1299 257 L 1299 253 L 1300 252 L 1300 250 L 1301 249 L 1301 247 L 1303 243 L 1303 238 L 1304 237 L 1304 235 L 1305 234 L 1305 232 L 1307 228 L 1307 224 L 1308 223 L 1308 221 L 1309 220 L 1309 217 L 1310 216 L 1310 214 L 1312 210 L 1312 205 L 1314 202 L 1314 199 L 1316 195 L 1317 188 L 1318 187 L 1318 185 L 1319 184 L 1319 182 L 1321 178 L 1321 173 L 1323 169 L 1323 166 L 1296 166 L 1296 168 L 1294 171 L 1294 174 L 1293 175 L 1293 178 L 1292 179 L 1291 186 L 1290 187 L 1290 189 L 1289 190 L 1289 192 L 1287 196 L 1287 200 L 1285 204 L 1285 207 L 1283 211 L 1283 215 L 1282 216 L 1282 218 L 1281 219 L 1281 222 L 1279 226 L 1279 229 L 1278 230 L 1278 234 L 1277 235 L 1277 237 L 1276 238 L 1276 240 L 1274 244 L 1274 249 L 1273 250 L 1273 252 L 1271 256 L 1271 259 L 1270 260 L 1270 263 L 1269 264 L 1269 268 L 1268 269 L 1268 271 L 1266 275 L 1266 278 L 1265 279 L 1265 284 L 1264 285 L 1264 287 L 1262 291 L 1262 294 L 1261 295 L 1261 298 L 1260 299 L 1259 306 L 1258 307 L 1258 309 L 1257 310 L 1257 313 L 1256 314 L 1256 318 L 1254 322 L 1254 325 L 1273 325 L 1274 327 L 1273 328 L 1272 327 L 1273 328 L 1269 332 L 1269 333 L 1265 337 L 1265 338 L 1261 341 L 1261 342 L 1252 352 L 1252 353 L 1247 358 L 1247 359 L 1242 364 L 1242 365 L 1239 367 L 1239 368 L 1224 385 L 1224 386 L 1220 390 L 1220 391 L 1216 395 L 1216 396 L 1214 397 L 1214 399 L 1247 399 L 1249 397 L 1249 396 L 1259 385 L 1259 384 L 1263 380 L 1263 379 L 1265 377 L 1266 377 L 1266 376 L 1271 371 L 1271 370 L 1278 363 L 1278 362 L 1283 357 L 1283 356 L 1294 344 L 1294 343 L 1298 339 L 1298 338 L 1305 331 L 1305 330 L 1309 326 L 1309 325 L 1312 323 L 1313 320 L 1315 319 L 1316 317 L 1321 312 L 1322 312 L 1321 311 L 1330 301 L 1330 300 L 1335 295 L 1335 294 L 1337 292 L 1338 292 L 1339 289 L 1342 287 L 1342 286 L 1346 282 L 1346 281 L 1352 275 L 1352 274 L 1361 264 L 1361 263 L 1370 253 L 1370 252 L 1375 247 L 1375 246 L 1380 241 L 1380 240 L 1387 233 L 1387 232 L 1402 215 L 1402 214 L 1406 210 L 1406 209 L 1408 207 L 1409 207 L 1409 206 L 1413 202 L 1413 201 L 1418 196 L 1418 195 L 1422 191 L 1422 190 L 1427 185 L 1427 184 L 1431 180 L 1431 179 L 1440 169 L 1441 167 Z
M 1129 179 L 1126 178 L 1125 176 L 1124 176 L 1116 170 L 1114 170 L 1107 166 L 1105 166 L 1104 165 L 1101 165 L 1100 164 L 1096 164 L 1095 163 L 1091 163 L 1090 162 L 1081 162 L 1080 161 L 1076 161 L 1075 162 L 1066 162 L 1065 163 L 1061 163 L 1060 164 L 1057 164 L 1056 165 L 1051 165 L 1050 166 L 1045 167 L 1040 170 L 1038 170 L 1028 175 L 1023 179 L 1021 179 L 1017 183 L 1016 183 L 1012 187 L 1011 187 L 999 199 L 999 200 L 996 203 L 996 204 L 994 205 L 993 208 L 990 211 L 981 229 L 981 231 L 980 232 L 980 234 L 979 235 L 979 237 L 977 241 L 977 244 L 976 245 L 976 254 L 975 255 L 975 265 L 976 266 L 976 273 L 977 274 L 977 277 L 980 283 L 981 288 L 984 292 L 985 295 L 988 298 L 989 301 L 998 310 L 1001 311 L 1004 314 L 1007 315 L 1009 317 L 1013 319 L 1015 319 L 1018 321 L 1020 321 L 1024 323 L 1027 323 L 1028 324 L 1035 324 L 1036 325 L 1054 325 L 1055 324 L 1062 324 L 1063 323 L 1067 323 L 1068 322 L 1071 322 L 1077 319 L 1080 319 L 1087 315 L 1089 315 L 1093 313 L 1095 311 L 1098 310 L 1103 306 L 1106 305 L 1116 296 L 1117 296 L 1115 292 L 1113 290 L 1112 290 L 1111 288 L 1109 286 L 1108 286 L 1107 284 L 1100 278 L 1098 279 L 1090 286 L 1089 286 L 1086 289 L 1074 295 L 1072 295 L 1068 297 L 1065 297 L 1064 298 L 1061 298 L 1060 299 L 1041 299 L 1040 298 L 1037 298 L 1036 297 L 1031 296 L 1028 294 L 1026 294 L 1024 292 L 1020 290 L 1010 280 L 1008 275 L 1006 273 L 1005 271 L 1005 268 L 1004 267 L 1004 264 L 1003 263 L 1003 248 L 1004 247 L 1005 238 L 1008 233 L 1008 231 L 1010 227 L 1012 225 L 1013 222 L 1018 216 L 1018 215 L 1030 203 L 1031 203 L 1044 194 L 1046 194 L 1053 190 L 1056 190 L 1057 189 L 1060 189 L 1061 188 L 1064 188 L 1065 187 L 1071 187 L 1072 186 L 1076 186 L 1077 187 L 1083 187 L 1084 188 L 1087 188 L 1088 189 L 1090 189 L 1091 190 L 1096 191 L 1100 194 L 1103 195 L 1106 198 L 1107 198 L 1109 200 L 1109 201 L 1114 206 L 1114 207 L 1116 209 L 1118 213 L 1118 216 L 1120 220 L 1120 225 L 1116 227 L 1111 227 L 1110 228 L 1103 228 L 1102 229 L 1097 229 L 1096 230 L 1091 230 L 1090 231 L 1086 231 L 1085 232 L 1077 232 L 1076 233 L 1072 233 L 1071 234 L 1066 234 L 1065 235 L 1061 235 L 1060 236 L 1053 236 L 1052 237 L 1047 237 L 1047 240 L 1046 241 L 1046 243 L 1045 244 L 1045 247 L 1044 248 L 1044 250 L 1043 251 L 1043 254 L 1042 255 L 1042 260 L 1041 261 L 1041 263 L 1044 263 L 1045 262 L 1050 262 L 1051 261 L 1058 261 L 1059 260 L 1063 260 L 1064 259 L 1068 259 L 1069 258 L 1073 258 L 1074 257 L 1080 257 L 1081 256 L 1086 256 L 1087 255 L 1092 255 L 1093 254 L 1097 254 L 1098 253 L 1103 253 L 1104 252 L 1111 252 L 1112 251 L 1116 251 L 1117 250 L 1121 250 L 1122 249 L 1126 249 L 1127 248 L 1133 248 L 1134 247 L 1139 247 L 1140 246 L 1144 246 L 1146 243 L 1146 240 L 1147 239 L 1147 231 L 1148 230 L 1148 220 L 1147 219 L 1147 211 L 1146 210 L 1146 207 L 1144 204 L 1144 202 L 1143 201 L 1143 199 L 1141 195 L 1139 193 L 1138 190 L 1134 186 L 1133 183 L 1132 183 L 1129 180 Z
M 1779 171 L 1767 165 L 1765 165 L 1764 164 L 1762 164 L 1758 162 L 1755 162 L 1754 161 L 1747 161 L 1746 160 L 1729 160 L 1728 161 L 1722 161 L 1721 162 L 1718 162 L 1717 163 L 1715 163 L 1711 165 L 1707 165 L 1687 175 L 1685 177 L 1681 179 L 1672 187 L 1671 187 L 1661 197 L 1661 198 L 1657 202 L 1657 203 L 1652 209 L 1651 212 L 1649 214 L 1644 224 L 1643 229 L 1640 235 L 1640 238 L 1639 239 L 1639 244 L 1638 245 L 1638 250 L 1637 251 L 1637 267 L 1638 268 L 1638 273 L 1639 274 L 1639 278 L 1640 279 L 1640 282 L 1648 298 L 1652 302 L 1652 303 L 1655 306 L 1657 307 L 1657 308 L 1659 310 L 1660 310 L 1663 313 L 1669 316 L 1671 318 L 1673 319 L 1675 319 L 1676 320 L 1678 320 L 1684 323 L 1688 323 L 1689 324 L 1696 324 L 1697 325 L 1715 325 L 1716 324 L 1723 324 L 1724 323 L 1728 323 L 1729 322 L 1732 322 L 1738 319 L 1741 319 L 1748 315 L 1750 315 L 1754 313 L 1758 310 L 1759 311 L 1760 309 L 1761 309 L 1764 306 L 1765 306 L 1771 301 L 1772 301 L 1778 295 L 1761 278 L 1760 278 L 1756 282 L 1755 282 L 1751 286 L 1750 286 L 1745 290 L 1737 294 L 1732 295 L 1729 297 L 1726 297 L 1725 298 L 1721 298 L 1720 299 L 1703 299 L 1702 298 L 1698 298 L 1697 297 L 1692 296 L 1684 292 L 1682 290 L 1681 290 L 1673 282 L 1671 278 L 1668 275 L 1668 273 L 1667 272 L 1667 270 L 1666 269 L 1666 267 L 1664 263 L 1664 246 L 1665 245 L 1665 242 L 1666 241 L 1666 239 L 1668 235 L 1668 232 L 1670 228 L 1672 226 L 1673 224 L 1673 222 L 1680 214 L 1680 213 L 1690 203 L 1691 203 L 1694 200 L 1695 200 L 1700 196 L 1712 190 L 1715 190 L 1716 189 L 1718 189 L 1722 187 L 1725 187 L 1726 186 L 1744 186 L 1745 187 L 1747 187 L 1748 188 L 1750 188 L 1751 189 L 1756 190 L 1758 191 L 1761 194 L 1764 195 L 1773 204 L 1773 205 L 1777 210 L 1777 212 L 1778 213 L 1778 215 L 1780 219 L 1780 223 L 1781 225 L 1780 226 L 1775 226 L 1774 227 L 1768 227 L 1767 228 L 1759 228 L 1758 229 L 1753 229 L 1752 230 L 1747 230 L 1746 231 L 1742 231 L 1741 232 L 1733 232 L 1732 233 L 1727 233 L 1726 234 L 1722 234 L 1721 235 L 1717 235 L 1716 236 L 1709 236 L 1707 238 L 1707 241 L 1706 242 L 1706 246 L 1705 247 L 1705 250 L 1703 254 L 1703 258 L 1702 259 L 1702 262 L 1706 262 L 1707 261 L 1714 261 L 1715 260 L 1724 259 L 1725 258 L 1728 258 L 1729 257 L 1735 257 L 1736 256 L 1742 256 L 1743 255 L 1747 255 L 1748 254 L 1752 254 L 1753 253 L 1757 253 L 1758 252 L 1765 252 L 1766 251 L 1771 251 L 1772 250 L 1776 250 L 1777 249 L 1781 249 L 1782 248 L 1789 248 L 1790 247 L 1794 247 L 1795 246 L 1804 245 L 1805 243 L 1805 240 L 1806 239 L 1807 240 L 1807 243 L 1809 244 L 1809 241 L 1808 241 L 1806 238 L 1806 232 L 1807 231 L 1807 217 L 1806 216 L 1806 210 L 1805 209 L 1805 206 L 1802 200 L 1802 198 L 1800 194 L 1798 192 L 1797 189 L 1790 181 L 1790 180 L 1788 179 Z
M 714 187 L 712 189 L 712 190 L 708 193 L 708 194 L 704 198 L 704 199 L 700 203 L 700 204 L 695 210 L 695 212 L 693 214 L 690 220 L 690 222 L 686 229 L 686 233 L 684 237 L 684 240 L 683 241 L 683 245 L 682 246 L 682 268 L 683 269 L 683 273 L 684 274 L 684 276 L 686 280 L 686 283 L 692 295 L 699 303 L 699 304 L 701 306 L 702 306 L 704 308 L 704 309 L 707 310 L 711 314 L 716 316 L 718 318 L 720 319 L 722 319 L 725 321 L 730 322 L 731 323 L 734 323 L 735 324 L 740 324 L 741 325 L 749 325 L 750 326 L 759 326 L 760 325 L 767 325 L 768 324 L 775 324 L 776 323 L 780 323 L 788 319 L 791 319 L 792 318 L 794 318 L 798 315 L 800 315 L 810 309 L 812 310 L 812 313 L 811 314 L 811 319 L 810 320 L 809 325 L 836 325 L 839 319 L 839 316 L 840 315 L 840 310 L 841 309 L 841 307 L 842 306 L 842 303 L 844 299 L 844 295 L 845 294 L 846 287 L 847 286 L 847 284 L 849 280 L 849 275 L 850 274 L 850 271 L 851 270 L 851 268 L 853 264 L 854 255 L 855 254 L 855 252 L 856 251 L 856 248 L 857 247 L 857 244 L 858 243 L 858 217 L 857 216 L 857 212 L 854 206 L 853 201 L 851 197 L 849 195 L 849 193 L 846 190 L 844 186 L 835 177 L 834 177 L 831 174 L 830 174 L 825 170 L 823 170 L 814 165 L 811 165 L 808 163 L 805 163 L 804 162 L 800 162 L 799 161 L 793 161 L 792 160 L 773 160 L 772 161 L 765 161 L 764 162 L 757 163 L 753 165 L 750 165 L 743 169 L 741 169 L 735 172 L 733 174 L 730 175 L 728 177 L 724 179 L 715 187 Z
M 806 192 L 808 194 L 811 195 L 815 199 L 816 199 L 822 206 L 822 207 L 824 209 L 827 215 L 827 217 L 829 221 L 829 226 L 830 227 L 830 240 L 829 241 L 829 246 L 828 247 L 828 250 L 827 251 L 827 253 L 825 256 L 825 258 L 823 262 L 821 264 L 820 267 L 817 270 L 817 271 L 808 281 L 807 281 L 803 285 L 799 287 L 796 290 L 794 290 L 788 294 L 786 294 L 785 295 L 783 295 L 782 296 L 780 296 L 776 298 L 773 298 L 772 299 L 748 299 L 747 298 L 744 298 L 743 297 L 738 296 L 735 294 L 733 294 L 731 292 L 727 290 L 717 280 L 717 279 L 715 277 L 712 271 L 712 269 L 710 265 L 710 262 L 709 261 L 709 245 L 710 244 L 710 240 L 711 239 L 711 237 L 712 236 L 713 231 L 717 223 L 719 221 L 720 218 L 724 214 L 724 213 L 734 203 L 735 203 L 739 199 L 742 198 L 744 196 L 756 190 L 758 190 L 762 188 L 765 188 L 766 187 L 769 187 L 770 186 L 788 186 L 789 187 L 792 187 L 796 189 L 799 189 L 800 190 L 802 190 Z
M 1192 121 L 1190 122 L 1190 124 L 1189 125 L 1189 129 L 1188 130 L 1188 132 L 1186 136 L 1186 139 L 1185 140 L 1184 147 L 1183 148 L 1183 150 L 1181 154 L 1181 157 L 1180 158 L 1180 162 L 1179 163 L 1179 165 L 1178 166 L 1178 168 L 1176 172 L 1176 176 L 1175 177 L 1175 179 L 1173 183 L 1173 186 L 1172 187 L 1171 194 L 1170 195 L 1170 197 L 1168 201 L 1168 204 L 1167 205 L 1167 209 L 1166 210 L 1166 212 L 1164 216 L 1164 219 L 1163 220 L 1162 227 L 1160 231 L 1160 234 L 1159 235 L 1158 242 L 1157 243 L 1157 245 L 1155 249 L 1155 252 L 1154 253 L 1154 259 L 1153 260 L 1153 276 L 1154 277 L 1154 282 L 1155 283 L 1155 286 L 1158 292 L 1158 294 L 1161 298 L 1162 301 L 1173 313 L 1174 313 L 1182 319 L 1184 319 L 1189 322 L 1191 322 L 1195 324 L 1199 324 L 1200 325 L 1236 325 L 1236 323 L 1237 322 L 1237 319 L 1238 318 L 1238 315 L 1239 314 L 1239 311 L 1240 310 L 1240 307 L 1241 306 L 1241 303 L 1242 302 L 1242 300 L 1241 299 L 1209 299 L 1208 298 L 1205 298 L 1195 293 L 1187 285 L 1186 282 L 1183 278 L 1183 275 L 1182 274 L 1182 271 L 1181 270 L 1181 257 L 1182 256 L 1182 253 L 1183 252 L 1183 248 L 1184 247 L 1184 245 L 1186 241 L 1186 238 L 1187 237 L 1187 233 L 1188 232 L 1188 230 L 1189 229 L 1189 227 L 1191 223 L 1191 220 L 1192 219 L 1192 215 L 1193 214 L 1193 211 L 1195 207 L 1195 204 L 1196 203 L 1196 199 L 1197 198 L 1197 195 L 1198 194 L 1198 192 L 1200 190 L 1278 190 L 1279 189 L 1279 187 L 1281 183 L 1281 180 L 1282 179 L 1282 177 L 1283 176 L 1283 174 L 1285 170 L 1285 166 L 1286 165 L 1285 164 L 1269 164 L 1268 165 L 1239 165 L 1238 164 L 1221 164 L 1220 165 L 1210 165 L 1209 164 L 1207 164 L 1206 163 L 1207 162 L 1207 159 L 1209 155 L 1209 152 L 1210 151 L 1210 147 L 1211 146 L 1211 144 L 1213 140 L 1214 133 L 1216 129 L 1217 122 L 1216 121 Z
M 997 121 L 978 121 L 977 122 L 960 122 L 959 123 L 952 124 L 948 126 L 945 126 L 938 130 L 936 130 L 931 134 L 928 135 L 925 138 L 922 139 L 917 144 L 916 144 L 907 153 L 907 154 L 903 158 L 903 159 L 897 166 L 888 184 L 888 186 L 886 190 L 886 193 L 884 197 L 884 200 L 882 204 L 882 209 L 881 210 L 881 213 L 880 214 L 880 216 L 878 220 L 878 224 L 877 225 L 876 232 L 875 233 L 875 235 L 873 239 L 873 244 L 871 248 L 871 251 L 869 255 L 869 259 L 868 260 L 868 263 L 867 264 L 867 266 L 866 267 L 866 270 L 864 274 L 864 279 L 863 280 L 863 282 L 862 283 L 862 285 L 860 289 L 860 294 L 859 295 L 859 298 L 857 301 L 857 304 L 856 305 L 856 308 L 855 309 L 855 313 L 854 314 L 854 316 L 853 317 L 853 320 L 851 324 L 852 325 L 878 325 L 879 324 L 879 322 L 880 321 L 880 317 L 881 316 L 881 314 L 883 310 L 883 307 L 884 306 L 885 299 L 887 295 L 887 292 L 888 291 L 889 284 L 891 280 L 891 277 L 892 276 L 892 273 L 893 272 L 894 265 L 896 261 L 896 258 L 897 257 L 897 254 L 898 253 L 898 249 L 899 248 L 899 246 L 901 242 L 901 239 L 902 238 L 903 231 L 905 227 L 905 224 L 906 223 L 906 219 L 907 218 L 908 211 L 910 207 L 910 204 L 911 203 L 911 199 L 912 198 L 912 196 L 914 194 L 980 194 L 982 192 L 982 188 L 983 187 L 984 180 L 986 176 L 986 173 L 988 172 L 987 170 L 987 168 L 930 168 L 929 167 L 937 159 L 938 159 L 941 156 L 942 156 L 944 154 L 946 154 L 948 152 L 952 150 L 955 150 L 956 149 L 959 149 L 960 148 L 964 148 L 965 147 L 992 147 L 993 146 L 993 144 L 995 140 L 995 136 L 996 135 L 996 130 L 998 126 L 998 122 Z
M 1844 120 L 1842 124 L 1842 127 L 1841 128 L 1841 131 L 1840 132 L 1840 136 L 1839 137 L 1839 140 L 1838 141 L 1838 144 L 1837 145 L 1837 149 L 1835 153 L 1835 157 L 1834 158 L 1834 161 L 1832 165 L 1832 168 L 1831 169 L 1831 173 L 1830 174 L 1830 177 L 1828 181 L 1828 184 L 1827 185 L 1827 188 L 1826 189 L 1826 193 L 1824 197 L 1824 200 L 1823 201 L 1823 204 L 1822 205 L 1822 209 L 1821 210 L 1821 213 L 1820 214 L 1820 216 L 1819 217 L 1819 220 L 1818 221 L 1818 224 L 1817 225 L 1817 230 L 1815 234 L 1815 237 L 1813 241 L 1813 245 L 1812 246 L 1812 249 L 1811 250 L 1811 253 L 1810 254 L 1810 259 L 1809 260 L 1809 275 L 1810 276 L 1810 280 L 1811 281 L 1811 284 L 1812 285 L 1812 287 L 1813 288 L 1814 293 L 1817 297 L 1818 300 L 1821 303 L 1821 304 L 1831 314 L 1834 315 L 1839 319 L 1841 319 L 1849 323 L 1852 323 L 1853 324 L 1858 324 L 1859 325 L 1890 325 L 1891 324 L 1891 321 L 1892 320 L 1892 317 L 1893 316 L 1893 313 L 1894 312 L 1894 309 L 1895 308 L 1896 299 L 1865 299 L 1864 298 L 1861 298 L 1854 294 L 1852 294 L 1848 290 L 1847 290 L 1846 288 L 1842 284 L 1841 281 L 1839 279 L 1837 275 L 1837 270 L 1836 269 L 1836 258 L 1837 257 L 1837 250 L 1838 249 L 1838 246 L 1840 242 L 1840 239 L 1841 238 L 1841 235 L 1842 234 L 1842 230 L 1844 226 L 1844 223 L 1845 222 L 1845 219 L 1846 218 L 1846 214 L 1847 213 L 1847 210 L 1848 209 L 1848 207 L 1849 206 L 1849 203 L 1850 202 L 1850 199 L 1851 198 L 1851 193 L 1853 189 L 1924 189 L 1925 188 L 1925 185 L 1926 184 L 1926 180 L 1927 179 L 1927 176 L 1928 175 L 1928 172 L 1929 171 L 1930 164 L 1929 163 L 1860 163 L 1859 162 L 1860 161 L 1861 154 L 1862 153 L 1862 151 L 1863 150 L 1863 147 L 1864 146 L 1864 141 L 1865 140 L 1865 138 L 1866 137 L 1866 134 L 1868 130 L 1868 126 L 1869 125 L 1869 120 Z
M 675 120 L 575 120 L 574 121 L 567 121 L 566 122 L 563 122 L 562 123 L 559 123 L 558 124 L 556 124 L 555 125 L 550 126 L 538 132 L 536 134 L 532 136 L 528 140 L 527 140 L 526 142 L 522 145 L 522 146 L 518 150 L 516 154 L 513 157 L 513 159 L 508 168 L 508 173 L 507 174 L 507 177 L 506 178 L 506 194 L 507 195 L 508 202 L 510 205 L 510 207 L 512 209 L 514 214 L 517 217 L 517 218 L 520 221 L 521 221 L 522 223 L 523 223 L 529 228 L 533 230 L 535 230 L 538 232 L 543 233 L 544 234 L 551 234 L 552 235 L 615 235 L 616 234 L 618 234 L 619 235 L 624 235 L 625 236 L 627 236 L 635 240 L 641 247 L 643 251 L 643 253 L 644 254 L 644 267 L 643 268 L 643 271 L 642 272 L 642 274 L 641 276 L 639 278 L 637 282 L 630 289 L 629 289 L 627 291 L 626 291 L 622 294 L 620 294 L 616 296 L 613 296 L 612 297 L 487 297 L 485 299 L 485 302 L 483 306 L 483 310 L 482 311 L 482 314 L 481 315 L 481 319 L 480 320 L 480 325 L 607 325 L 608 324 L 614 324 L 615 323 L 619 323 L 627 319 L 630 319 L 634 317 L 636 315 L 638 315 L 640 313 L 641 313 L 649 306 L 650 306 L 653 303 L 654 301 L 655 301 L 655 300 L 662 292 L 662 290 L 664 288 L 667 282 L 667 280 L 668 279 L 668 277 L 670 273 L 670 270 L 671 269 L 671 248 L 670 247 L 670 244 L 669 243 L 668 238 L 665 232 L 662 229 L 661 226 L 655 220 L 654 220 L 648 215 L 640 211 L 638 211 L 637 210 L 633 210 L 632 209 L 627 209 L 626 208 L 553 208 L 552 207 L 550 207 L 544 204 L 537 197 L 535 193 L 534 188 L 533 187 L 533 180 L 534 179 L 534 176 L 537 170 L 537 168 L 539 166 L 539 165 L 549 155 L 554 153 L 558 150 L 561 150 L 562 149 L 565 149 L 566 148 L 570 148 L 571 147 L 670 147 L 671 146 L 671 141 L 672 140 L 672 137 L 674 133 L 674 129 L 675 128 L 675 124 L 676 123 L 676 121 Z
M 333 132 L 331 134 L 328 135 L 326 137 L 321 139 L 311 148 L 310 148 L 296 163 L 296 164 L 290 172 L 288 177 L 286 179 L 286 181 L 282 188 L 281 193 L 279 196 L 279 198 L 277 202 L 277 206 L 276 207 L 276 212 L 275 213 L 275 220 L 274 221 L 274 237 L 275 238 L 275 244 L 276 245 L 277 254 L 278 255 L 279 260 L 281 263 L 282 268 L 286 276 L 288 278 L 289 281 L 294 287 L 294 288 L 305 300 L 306 300 L 311 305 L 315 307 L 318 310 L 320 310 L 323 313 L 327 315 L 329 315 L 336 319 L 339 319 L 340 320 L 342 320 L 343 321 L 345 321 L 349 323 L 353 323 L 354 324 L 363 324 L 364 325 L 434 325 L 435 324 L 435 319 L 436 318 L 436 309 L 437 308 L 437 301 L 438 300 L 438 298 L 437 297 L 364 297 L 363 296 L 354 295 L 348 292 L 346 292 L 340 289 L 338 287 L 335 286 L 332 283 L 331 283 L 322 275 L 322 274 L 315 266 L 312 260 L 310 258 L 310 256 L 306 249 L 306 245 L 305 244 L 305 241 L 304 240 L 304 237 L 303 236 L 303 216 L 304 215 L 304 211 L 305 210 L 306 203 L 315 185 L 317 183 L 319 179 L 324 174 L 324 173 L 326 172 L 329 168 L 330 168 L 334 164 L 337 163 L 340 160 L 345 158 L 347 156 L 351 154 L 356 153 L 359 151 L 361 151 L 362 150 L 367 150 L 368 149 L 373 149 L 374 148 L 445 148 L 447 144 L 447 136 L 448 135 L 448 124 L 449 122 L 447 120 L 378 120 L 377 121 L 367 121 L 366 122 L 362 122 L 361 123 L 358 123 L 357 124 L 350 125 L 342 129 L 340 129 L 337 131 L 335 131 Z
M 181 132 L 179 134 L 174 136 L 172 138 L 168 140 L 165 143 L 164 143 L 159 148 L 158 148 L 156 150 L 156 151 L 154 152 L 152 154 L 152 155 L 147 160 L 147 161 L 143 165 L 143 166 L 139 171 L 138 174 L 136 176 L 130 188 L 130 190 L 129 191 L 129 193 L 128 194 L 128 196 L 126 200 L 126 203 L 125 204 L 125 208 L 124 209 L 124 213 L 123 214 L 123 222 L 122 223 L 122 232 L 123 233 L 123 241 L 124 242 L 124 246 L 125 247 L 125 252 L 126 253 L 126 256 L 129 262 L 130 267 L 135 277 L 137 279 L 138 282 L 144 289 L 144 290 L 156 302 L 157 302 L 160 305 L 164 307 L 167 310 L 167 311 L 169 310 L 174 314 L 176 315 L 178 315 L 185 319 L 188 319 L 189 320 L 191 320 L 195 322 L 198 322 L 199 323 L 204 323 L 205 324 L 214 324 L 215 325 L 286 325 L 287 324 L 287 319 L 288 318 L 288 302 L 289 301 L 289 298 L 288 297 L 214 297 L 213 296 L 208 296 L 207 295 L 200 294 L 195 291 L 193 291 L 189 289 L 187 287 L 184 286 L 178 281 L 177 281 L 168 272 L 168 271 L 164 267 L 163 264 L 159 259 L 159 257 L 155 250 L 155 248 L 154 247 L 154 243 L 152 239 L 152 233 L 151 232 L 151 221 L 152 220 L 152 214 L 153 213 L 153 210 L 154 209 L 154 205 L 157 199 L 157 197 L 159 194 L 159 192 L 163 187 L 163 185 L 167 181 L 168 178 L 170 177 L 171 175 L 184 163 L 185 163 L 190 159 L 200 154 L 202 154 L 205 152 L 207 152 L 210 150 L 215 150 L 216 149 L 222 149 L 223 148 L 295 148 L 296 147 L 296 140 L 297 139 L 297 128 L 298 127 L 298 121 L 297 120 L 227 120 L 226 121 L 215 121 L 214 122 L 209 122 L 208 123 L 205 123 L 201 125 L 198 125 L 197 126 L 192 127 L 185 131 L 183 131 Z
M 1506 121 L 1499 127 L 1497 131 L 1497 138 L 1496 139 L 1496 143 L 1495 144 L 1495 147 L 1494 148 L 1494 151 L 1493 152 L 1493 155 L 1492 156 L 1491 163 L 1489 167 L 1489 170 L 1488 171 L 1488 175 L 1487 176 L 1487 179 L 1485 183 L 1485 186 L 1484 187 L 1484 190 L 1483 191 L 1483 195 L 1482 196 L 1482 199 L 1481 200 L 1481 202 L 1480 203 L 1480 206 L 1479 207 L 1479 212 L 1478 213 L 1478 216 L 1476 220 L 1476 223 L 1475 224 L 1475 227 L 1474 228 L 1474 232 L 1473 233 L 1472 240 L 1470 244 L 1470 249 L 1469 250 L 1468 257 L 1466 261 L 1466 265 L 1465 266 L 1465 270 L 1464 271 L 1464 274 L 1463 275 L 1463 277 L 1462 278 L 1462 281 L 1461 282 L 1461 287 L 1460 288 L 1460 290 L 1459 291 L 1459 294 L 1457 298 L 1456 307 L 1455 308 L 1455 311 L 1454 312 L 1454 314 L 1453 315 L 1453 318 L 1452 319 L 1452 325 L 1478 325 L 1479 324 L 1479 321 L 1481 317 L 1481 312 L 1482 311 L 1482 308 L 1483 307 L 1483 304 L 1484 303 L 1484 300 L 1485 299 L 1485 296 L 1486 295 L 1486 290 L 1488 286 L 1488 283 L 1489 282 L 1489 279 L 1490 278 L 1490 274 L 1491 273 L 1491 270 L 1492 269 L 1492 267 L 1493 266 L 1493 263 L 1494 262 L 1495 253 L 1496 252 L 1496 249 L 1497 248 L 1497 245 L 1498 244 L 1498 241 L 1499 240 L 1499 235 L 1500 234 L 1500 232 L 1502 228 L 1502 225 L 1503 224 L 1503 220 L 1504 219 L 1504 216 L 1506 212 L 1506 209 L 1507 208 L 1507 205 L 1508 204 L 1508 199 L 1509 198 L 1509 195 L 1511 191 L 1511 188 L 1512 187 L 1512 183 L 1513 182 L 1513 179 L 1515 175 L 1516 168 L 1517 167 L 1519 169 L 1519 171 L 1520 172 L 1521 170 L 1521 167 L 1519 165 L 1518 167 L 1517 166 L 1518 159 L 1520 156 L 1522 159 L 1522 162 L 1523 163 L 1524 170 L 1525 171 L 1525 173 L 1527 177 L 1527 180 L 1528 181 L 1528 183 L 1530 187 L 1530 190 L 1532 194 L 1532 197 L 1533 198 L 1533 200 L 1534 201 L 1534 203 L 1536 207 L 1536 211 L 1537 212 L 1537 215 L 1538 216 L 1538 218 L 1539 219 L 1539 221 L 1541 225 L 1541 229 L 1542 230 L 1542 232 L 1543 233 L 1543 235 L 1545 239 L 1546 246 L 1547 247 L 1547 249 L 1548 250 L 1548 252 L 1550 256 L 1550 261 L 1551 262 L 1551 264 L 1552 265 L 1552 267 L 1554 271 L 1555 278 L 1556 279 L 1556 281 L 1558 285 L 1558 288 L 1559 289 L 1560 296 L 1561 297 L 1561 299 L 1563 303 L 1563 307 L 1564 308 L 1564 310 L 1566 314 L 1568 316 L 1568 317 L 1570 319 L 1571 319 L 1573 321 L 1577 323 L 1579 323 L 1580 324 L 1595 324 L 1596 323 L 1598 323 L 1606 318 L 1610 310 L 1610 306 L 1612 302 L 1612 299 L 1613 298 L 1613 296 L 1614 295 L 1614 292 L 1615 291 L 1615 287 L 1616 286 L 1616 284 L 1617 283 L 1617 280 L 1619 276 L 1619 272 L 1620 271 L 1620 269 L 1621 268 L 1621 265 L 1623 261 L 1623 258 L 1624 257 L 1624 253 L 1625 252 L 1625 250 L 1627 246 L 1627 243 L 1628 242 L 1628 238 L 1629 237 L 1629 235 L 1631 231 L 1631 228 L 1632 227 L 1632 223 L 1633 222 L 1633 220 L 1634 219 L 1634 216 L 1635 215 L 1635 213 L 1637 209 L 1637 205 L 1638 204 L 1638 202 L 1639 201 L 1639 198 L 1641 194 L 1641 190 L 1642 189 L 1642 186 L 1643 185 L 1643 183 L 1645 179 L 1646 172 L 1647 171 L 1647 169 L 1648 168 L 1648 165 L 1650 161 L 1650 157 L 1651 156 L 1651 154 L 1652 153 L 1652 151 L 1654 147 L 1654 144 L 1655 143 L 1655 139 L 1656 138 L 1656 136 L 1657 135 L 1657 133 L 1659 129 L 1659 125 L 1661 122 L 1661 120 L 1660 119 L 1635 119 L 1632 123 L 1632 125 L 1631 126 L 1631 129 L 1630 130 L 1630 134 L 1629 135 L 1629 137 L 1627 141 L 1627 144 L 1626 145 L 1626 149 L 1625 150 L 1625 152 L 1624 153 L 1624 155 L 1622 159 L 1622 162 L 1621 163 L 1621 167 L 1620 168 L 1620 170 L 1618 174 L 1618 177 L 1617 178 L 1617 182 L 1616 183 L 1616 185 L 1614 189 L 1614 192 L 1612 196 L 1612 200 L 1611 201 L 1611 203 L 1610 204 L 1610 207 L 1608 211 L 1608 215 L 1606 219 L 1606 222 L 1604 226 L 1604 229 L 1603 230 L 1602 237 L 1600 241 L 1600 244 L 1599 245 L 1599 249 L 1598 250 L 1598 253 L 1597 254 L 1597 256 L 1595 260 L 1595 264 L 1594 265 L 1594 268 L 1592 272 L 1592 275 L 1590 278 L 1588 274 L 1587 274 L 1587 277 L 1590 281 L 1590 284 L 1588 288 L 1586 287 L 1586 285 L 1585 284 L 1585 281 L 1583 277 L 1583 273 L 1582 272 L 1582 270 L 1581 269 L 1581 267 L 1579 263 L 1579 260 L 1578 259 L 1578 256 L 1577 255 L 1577 253 L 1575 249 L 1575 246 L 1574 245 L 1573 238 L 1572 237 L 1572 235 L 1570 231 L 1569 224 L 1568 223 L 1568 221 L 1566 217 L 1565 210 L 1564 209 L 1564 207 L 1562 203 L 1562 200 L 1561 199 L 1560 192 L 1559 191 L 1559 189 L 1557 185 L 1557 182 L 1556 181 L 1556 179 L 1555 178 L 1555 176 L 1553 172 L 1552 165 L 1550 161 L 1550 158 L 1548 154 L 1548 151 L 1547 150 L 1547 147 L 1545 143 L 1545 140 L 1544 139 L 1543 134 L 1541 130 L 1534 123 L 1530 121 L 1528 121 L 1524 119 L 1513 119 L 1512 120 L 1509 120 L 1508 121 Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"/>
</svg>
</a></h1>
      </div>
      <nav class="sidenav" aria-label="Sections">
        <a href="#overview" data-nav="overview" title="Overview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5"></rect><rect x="14" y="3" width="7" height="5" rx="1.5"></rect><rect x="14" y="12" width="7" height="9" rx="1.5"></rect><rect x="3" y="16" width="7" height="5" rx="1.5"></rect></svg><span class="sr-only-collapse">Overview</span></a>
        <a href="#activity" data-nav="activity" title="Activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l3-8 4 16 3-8h4"></path></svg><span class="sr-only-collapse">Activity</span></a>
        <a href="#policy" data-nav="policy" title="Policy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z"></path></svg><span class="sr-only-collapse">Policy</span></a>
        <a href="#rules" data-nav="rules" title="Rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"></path><path d="M15 3v4h4"></path><path d="M9 12h6M9 16h4"></path></svg><span class="sr-only-collapse">Rules</span></a>
        <a href="#integrations" data-nav="integrations" title="Integrations"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5"></path></svg><span class="sr-only-collapse">Integrations</span></a>
        <a href="#settings" data-nav="settings" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h10M18 8h2M4 16h2M10 16h10"></path><circle cx="16" cy="8" r="2.2"></circle><circle cx="8" cy="16" r="2.2"></circle></svg><span class="sr-only-collapse">Settings</span></a>
      </nav>
      <div class="sidebar-foot">
        <div class="sidebar-links">
          <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
          <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">Documentation</a>
        </div>
      </div>
    </aside>
    <div class="content">
      <header class="topbar" id="topbar">
        <div class="topbar-row">
          <h2 class="topbar-title" id="topbar-title">Overview</h2>
          <label class="view-search topbar-search" data-search-view="activity" hidden>
            <span class="sr-only">Filter activity</span>
            <input type="search" id="activity-search" autocomplete="off" placeholder="Filter by rule or command">
          </label>
          <label class="view-search topbar-search" data-search-view="policy" hidden>
            <span class="sr-only">Search all protections</span>
            <input type="search" id="policy-search" autocomplete="off" placeholder="Filter by name, category, or rule ID">
          </label>
          <div class="topbar-actions">
            <div class="app-status" id="app-status" role="status" aria-live="polite">Loading...</div>
            <button type="button" class="dirty-chip" id="dirty-chip" hidden>Unsaved policy changes · Review</button>
          </div>
        </div>
      </header>
      <main>
        <div class="protection-banner" id="protection-banner" role="alert" hidden></div>
        <div class="status" id="status" role="status" aria-live="polite"></div>

        <section class="view" data-view="overview">
          <div class="view-head">
            <p class="panel-sub muted">What CC Safety Net has been doing on this machine.</p>
          </div>
          <div class="status health-strip" id="health-strip" hidden></div>
          <p class="tiles-window" id="overview-window"></p>
          <div class="tiles" id="overview-tiles"></div>
          <div class="star-row" id="star-row" hidden>
            <p class="star-pitch"><span id="star-pitch-text"></span> <span class="star-mechanism" id="star-mechanism" hidden>One click via your GitHub CLI. No redirect.</span></p>
            <span id="star-slot"></span>
          </div>
          <section class="panel" id="protection-card" hidden></section>
          <div class="dual-panels">
            <section class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <h2>Top blocked commands</h2>
                </div>
              </div>
              <div id="top-commands"></div>
            </section>
            <section class="panel">
              <div class="panel-head">
                <div class="panel-title">
                  <h2>Top blocked rules</h2>
                </div>
              </div>
              <div id="top-rules"></div>
            </section>
          </div>
          <button type="button" class="guard-errors" id="guard-errors" hidden></button>
        </section>

        <section class="view" data-view="activity" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Audited commands from the local log, newest first. Commands are secret-redacted at write time.</p>
          </div>
          <section class="panel">
            <div class="activity-controls">
              <div class="activity-controls-row">
                <label class="activity-days"><span>Window</span>
                  <select id="activity-days"></select>
                </label>
                <button type="button" class="icon-button activity-refresh" id="activity-refresh" aria-label="Refresh activity" title="Refresh activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
              </div>
              <div class="chip-row" id="activity-decision" role="group" aria-label="Filter by decision"></div>
              <div class="chip-row" id="activity-agents" role="group" aria-label="Filter by agent"></div>
              <div class="chip-row" id="activity-command-filter"></div>
            </div>
            <div id="activity-feed"></div>
            <p class="muted activity-count" id="activity-count"></p>
          </section>
        </section>

        <section class="view" data-view="policy" hidden>
          <div class="view-head view-head-actions">
            <p class="panel-sub muted">Choose what CC Safety Net blocks. Changes apply after you save.</p>
            <button type="button" id="project-draft-enter">Draft project policy</button>
          </div>
          <div class="project-draft-bar" id="project-draft-bar" hidden>
            <div class="project-draft-target">
              <strong>Project policy draft</strong>
              <code id="project-draft-path"></code>
              <p class="muted">Only the fields you mark are written here; everything else keeps inheriting from each member's own policy.</p>
            </div>
            <div class="savebar-actions">
              <button type="button" id="project-draft-change" hidden>Change…</button>
              <button type="button" id="project-draft-exit">Exit draft</button>
            </div>
          </div>
          <p class="status error" id="project-draft-diagnostics" hidden></p>
          <div class="policy-savebar" id="policy-savebar" hidden><span>Unsaved changes</span><div class="savebar-actions"><button type="button" id="discard-changes">Discard</button><button class="primary" id="save">Save</button></div></div>
          <div class="recovery" id="recovery" hidden>
            <div>
              <strong>Policy repair available</strong>
              <p class="muted">Repair writes canonical JSON by preserving valid settings. If the JSON cannot be parsed, defaults are restored.</p>
            </div>
            <button class="primary" id="repair" type="button">Repair</button>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2 id="tester-label">Test a command</h2>
                <p class="panel-sub muted">Paste a shell command to see whether it is blocked under your current unsaved edits. Custom rulebook rules are enforced here too.</p>
              </div>
            </div>
            <div class="tester-row">
              <input type="text" id="tester-input" autocomplete="off" spellcheck="false" placeholder="Paste a shell command and press Enter" aria-labelledby="tester-label">
              <button type="button" id="tester-run">Test</button>
            </div>
            <div id="tester-result" class="status" hidden></div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Safety preset</h2>
                <p class="panel-sub muted">Choose inherited protection defaults, then customize only what this workspace needs.</p>
              </div>
            </div>
            <div id="safety-preset-status" class="preset-status"></div>
            <div id="environment-overrides" class="status" hidden></div>
            <div class="grid" id="safety-level"></div>
            <div class="field field-toggle">
              <button class="panel-toggle" type="button" aria-expanded="false" aria-controls="safety-overrides-content"><span class="panel-chevron" aria-hidden="true"></span><span>Advanced overrides</span></button>
            </div>
            <div class="foldable-field-content" id="safety-overrides-content" hidden>
              <p class="muted">Inherit from the selected level unless a capability needs an explicit exception.</p>
              <div class="grid" id="safety-overrides"></div>
            </div>
            <div class="field">
              <span>Workflow</span>
              <small>Workflow exceptions are separate from safety level.</small>
            </div>
            <div class="grid" id="workflow"></div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Destructive Command Protection</h2>
                <p class="panel-sub muted" id="destructive-command-summary"></p>
              </div>
              <button type="button" id="reset-rule-customizations" class="panel-head-action">Restore defaults</button>
            </div>
            <div id="destructive-command"></div>
          </section>
          <section class="panel">
            <header class="panel-head">
              <div class="panel-title">
                <h2>Secret Protection</h2>
                <p class="panel-sub muted" id="secret-summary">Default sensitive paths and coding CLI credential locations can be disabled individually. Deny paths are blocked while Secret protection is on.</p>
              </div>
              <button type="button" id="reset-secret-customizations" class="panel-head-action">Restore defaults</button>
            </header>
            <div id="secret"></div>
          </section>
          <section class="panel">
            <div class="panel-head raw-json-head">
              <div class="panel-title">
                <h2>Policy JSON</h2>
                <p class="panel-sub muted" id="raw-source">Read-only mirror of the policy controls.</p>
              </div>
              <button class="icon-button" id="raw-copy" type="button" aria-label="Copy raw JSON to clipboard"></button>
            </div>
            <textarea id="raw" aria-label="Raw policy JSON" aria-describedby="raw-source" readonly></textarea>
          </section>
        </section>

        <section class="view" data-view="rules" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Custom rulebook rules enforced on this machine, and a prompt to hand rule authoring to your coding agent.</p>
          </div>
          <section class="panel" id="rules-composer-panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Create a rule</h2>
                <p class="panel-sub muted">CC Safety Net never writes rulebooks from here. Copy the prompt and paste it into your coding agent.</p>
              </div>
            </div>
            <div class="field">
              <span>Scope</span>
              <div class="chip-row" role="group" aria-label="Rule scope">
                <button type="button" class="chip" data-rules-scope="project" aria-pressed="true">Project</button>
                <button type="button" class="chip" data-rules-scope="user" aria-pressed="false">All projects</button>
              </div>
            </div>
            <div class="field" id="rules-project-path-field">
              <span id="rules-project-path-label">Project path</span>
              <div class="rules-path-row">
                <input type="text" id="rules-project-path" spellcheck="false" autocomplete="off" aria-labelledby="rules-project-path-label" aria-describedby="rules-project-path-hint">
                <button type="button" id="rules-choose-directory" hidden>Choose…</button>
              </div>
              <small id="rules-project-path-hint">Where the rulebook is written. Defaults to the directory this GUI was launched from.</small>
            </div>
            <div class="field">
              <span id="rules-composer-label">Request</span>
              <textarea id="rules-composer-input" spellcheck="false" placeholder="Describe the custom rules you want..." aria-labelledby="rules-composer-label" aria-describedby="rules-composer-hint"></textarea>
              <small id="rules-composer-hint">Rules match a command, its subcommand path, and exact arguments - not file paths or patterns.</small>
            </div>
            <div class="field">
              <span>Examples</span>
              <div class="chip-row">
                <button type="button" class="chip" data-rules-example="read my package.json and suggest blocking rules">Suggest rules</button>
                <button type="button" class="chip" data-rules-example="set up rules to block all terraform destroy commands">Block a command</button>
                <button type="button" class="chip" data-rules-example="verify my rules and fix any errors">Verify rules</button>
              </div>
            </div>
            <div class="rules-composer-actions">
              <button type="button" class="primary" id="rules-copy-prompt">Copy prompt</button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Rulebooks</h2>
                <p class="panel-sub muted">Read-only. Rules are shown as enforced, after overrides.</p>
              </div>
              <button type="button" class="icon-button rules-refresh" id="rules-refresh" aria-label="Refresh rules" title="Refresh rules"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
            </div>
            <div id="rules-list"><p class="empty">Loading rules…</p></div>
          </section>
          <section class="panel" id="rules-diagnostics-panel" hidden>
            <div class="panel-head">
              <div class="panel-title">
                <h2>Diagnostics</h2>
                <p class="panel-sub muted">Errors mean a rulebook was dropped and its rules are not enforced.</p>
              </div>
            </div>
            <div id="rules-diagnostics"></div>
          </section>
        </section>

        <section class="view" data-view="settings" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Appearance, file locations, and maintenance.</p>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Appearance</h2>
                <p class="panel-sub muted">Theme preference is stored in this browser.</p>
              </div>
              <button type="button" id="theme-toggle"></button>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Files</h2>
                <p class="panel-sub muted">Where CC Safety Net reads and writes on this machine.</p>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><span>Policy file</span><code id="policy-path"></code></div>
              <div class="info-row" id="project-policy-row" hidden><span>Project policy</span><code id="project-policy-path"></code></div>
              <div class="info-row"><span>Audit logs</span><code id="logs-path"></code></div>
            </div>
            <p class="status" id="project-policy-notice" hidden></p>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Audit log retention</h2>
                <p class="panel-sub muted">How long decisions are kept before the sweep deletes them. Every analyzed command is recorded, so a long window grows the log.</p>
              </div>
            </div>
            <label class="retention-row">
              <span>Keep for</span>
              <input type="number" id="retention-days" min="1" max="365" step="1" inputmode="numeric" aria-describedby="retention-note">
              <span id="retention-unit">days</span>
            </label>
            <p class="muted retention-note" id="retention-note"></p>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Version</h2>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><code id="app-version"></code></div>
            </div>
          </section>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Danger zone</h2>
                <p class="panel-sub muted">Actions that discard saved configuration.</p>
              </div>
            </div>
            <div class="danger-row">
              <div>
                <strong>Reset policy</strong>
                <p class="muted">Restore the default policy JSON at the configured path.</p>
              </div>
              <button class="danger" id="reset">Reset</button>
            </div>
          </section>
        </section>

        <section class="view" data-view="integrations" hidden>
          <div class="view-head">
            <p class="panel-sub muted">Install or remove the cc-safety-net hook for each coding agent on this machine.</p>
          </div>
          <section class="panel">
            <div class="panel-head">
              <div class="panel-title">
                <h2>Agents</h2>
                <p class="panel-sub muted">Detected CLIs and hook status.</p>
              </div>
              <button type="button" class="icon-button integrations-refresh" id="integrations-refresh" aria-label="Refresh integrations" title="Refresh integrations"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path></svg></button>
            </div>
            <div id="integrations-list"><p class="empty">Checking integrations…</p></div>
          </section>
          <section class="panel" id="integrations-system" hidden>
            <div class="panel-head">
              <div class="panel-title">
                <h2>System</h2>
                <p class="panel-sub muted">Runtime detected on this machine.</p>
              </div>
            </div>
            <div class="info-rows">
              <div class="info-row"><span>cc-safety-net</span><code id="integrations-pkg-version"></code></div>
              <div class="info-row"><span>Node.js</span><code id="integrations-node-version"></code></div>
              <div class="info-row"><span>Platform</span><code id="integrations-platform"></code></div>
            </div>
          </section>
        </section>
      </main>
      <footer class="app-foot">
        <a href="https://github.com/kenryu42/cc-safety-net" target="_blank" rel="noopener">GitHub</a>
        <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">Documentation</a>
      </footer>
    </div>
  </div>
  <div class="rule-example-popover" id="rule-example-popover" popover="auto" role="dialog" aria-labelledby="rule-example-title" aria-describedby="rule-example-command">
    <span class="rule-example-label" id="rule-example-label">Blocked command example</span>
    <strong id="rule-example-title"></strong>
    <code id="rule-example-command"></code>
  </div>
  <dialog class="confirm-dialog" id="confirm-dialog" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-body confirm-dialog-detail">
    <form method="dialog">
      <h2 id="confirm-dialog-title"></h2>
      <p class="muted" id="confirm-dialog-body"></p>
      <div class="dialog-rows" id="confirm-dialog-rows" hidden></div>
      <p class="dialog-detail"><code id="confirm-dialog-detail"></code></p>
      <div class="dialog-actions">
        <button type="submit" id="confirm-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="danger" id="confirm-dialog-confirm" value="confirm"></button>
      </div>
    </form>
  </dialog>
  <dialog class="confirm-dialog report-dialog" id="report-dialog" aria-labelledby="report-dialog-title" aria-describedby="report-dialog-body">
    <form method="dialog">
      <h2 id="report-dialog-title">Report false positive</h2>
      <p class="muted" id="report-dialog-body">This opens a prefilled GitHub issue form — it is public, and nothing is submitted until you submit it there. Paths were replaced with <code>&lt;project&gt;</code> and <code>~</code>; edit anything else you would rather not publish.</p>
      <label class="report-field"><span>Blocked command</span><textarea id="report-command" spellcheck="false"></textarea></label>
      <label class="report-field"><span>Audit log entry</span><textarea id="report-entry" spellcheck="false"></textarea></label>
      <div class="dialog-actions">
        <button type="submit" id="report-dialog-cancel" value="cancel">Cancel</button>
        <button type="submit" class="primary" id="report-dialog-open" value="report">Open GitHub form</button>
      </div>
    </form>
  </dialog>
  <script id="ccsn-data" type="application/json"></script>
  <script>
// src/audit/display.ts
var formatRelativeTime = (value) => {
  const diff = Date.now() - new Date(value).getTime();
  if (!Number.isFinite(diff))
    return "";
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0)
    return \`\${days}d ago\`;
  if (hours > 0)
    return \`\${hours}h ago\`;
  if (minutes > 0)
    return \`\${minutes}m ago\`;
  return "just now";
};
var commandSignature = (source) => {
  const tokens = (source ?? "").trim().split(/\\s+/).filter((token) => token && !/^[A-Za-z_][A-Za-z0-9_]*=/.test(token));
  const binary = tokens[0]?.split("/").pop();
  if (!binary)
    return null;
  const next = tokens[1];
  return next && /^[a-z][a-z0-9-]*$/.test(next) ? \`\${binary} \${next}\` : binary;
};
function findSuspectEntries(entries) {
  const signatureKey = (entry) => \`\${entry.sessionId}
\${commandSignature(entry.segment || entry.command)}\`;
  const denials = entries.filter((entry) => entry.decision !== "allow");
  const repeats = denials.filter((entry) => entry.sessionId).reduce((counts, entry) => counts.set(signatureKey(entry), (counts.get(signatureKey(entry)) ?? 0) + 1), new Map);
  return new Set(denials.filter((entry) => entry.failureStage || (repeats.get(signatureKey(entry)) ?? 0) >= 2));
}

// src/core/policy/audit-retention-days.ts
var DEFAULT_AUDIT_RETENTION_DAYS = 30;
var MIN_AUDIT_RETENTION_DAYS = 1;
var MAX_AUDIT_RETENTION_DAYS = 365;

// src/core/policy/safety-level.ts
var SAFETY_LEVEL_CAPABILITIES = {
  standard: { fail_closed: false, paranoid_rm: false, paranoid_interpreters: false },
  strict: { fail_closed: true, paranoid_rm: false, paranoid_interpreters: false },
  paranoid: { fail_closed: true, paranoid_rm: true, paranoid_interpreters: true }
};

// src/hosts/catalog.ts
var catalog = [
  {
    id: "antigravity-cli",
    displayName: "Antigravity CLI",
    doctorOrder: 3,
    runtime: {
      order: 1,
      flags: ["-ac", "--agy-cli"],
      description: "Run as Antigravity CLI PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 2,
      flag: "--agy-cli",
      artifactKind: "hook config",
      probeCommand: ["agy", "--version"]
    }
  },
  {
    id: "claude-code",
    displayName: "Claude Code",
    doctorOrder: 1,
    runtime: {
      order: 2,
      displayName: "Coding CLI",
      flags: ["-cc", "--coding-cli"],
      legacyFlags: ["--claude-code"],
      description: "Run as Coding CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cc", "--claude-code"]
    },
    install: {
      order: 3,
      flag: "--claude-code",
      artifactKind: "plugin",
      probeCommand: ["claude", "--version"]
    }
  },
  {
    id: "codex",
    displayName: "Codex",
    doctorOrder: 4,
    runtime: {
      order: 3,
      flags: ["-cx", "--codex"],
      description: "Run as a Codex PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 4,
      flag: "--codex",
      artifactKind: "plugin",
      probeCommand: ["codex", "--version"]
    }
  },
  {
    id: "copilot-cli",
    displayName: "GitHub Copilot CLI",
    doctorOrder: 7,
    runtime: {
      order: 6,
      flags: ["-cp", "--copilot-cli"],
      description: "Run as GitHub Copilot CLI PreToolUse hook",
      legacyTopLevelFlags: ["-cp", "--copilot-cli"]
    },
    install: {
      order: 7,
      flag: "--copilot-cli",
      artifactKind: "plugin",
      probeCommand: ["copilot", "--binary-version"]
    }
  },
  {
    id: "gemini-cli",
    displayName: "Gemini CLI",
    doctorOrder: 6,
    runtime: {
      order: 5,
      flags: ["-gc", "--gemini-cli"],
      description: "Run as Gemini CLI BeforeTool hook",
      legacyTopLevelFlags: ["-gc", "--gemini-cli"]
    },
    install: {
      order: 6,
      flag: "--gemini-cli",
      artifactKind: "extension",
      probeCommand: ["gemini", "--version"]
    }
  },
  {
    id: "grok-build",
    displayName: "Grok Build",
    doctorOrder: 8,
    runtime: {
      order: 7,
      flags: ["-gb", "--grok-build"],
      description: "Run as Grok Build PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 8,
      flag: "--grok-build",
      artifactKind: "hook config",
      probeCommand: ["grok", "--version"]
    }
  },
  {
    id: "hermes-agent",
    displayName: "Hermes Agent",
    doctorOrder: 9,
    runtime: {
      order: 8,
      flags: ["-ha", "--hermes-agent"],
      description: "Run as Hermes Agent pre_tool_call hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 9,
      flag: "--hermes-agent",
      artifactKind: "plugin",
      probeCommand: ["hermes", "--version"]
    }
  },
  {
    id: "kimi-code",
    displayName: "Kimi Code",
    doctorOrder: 10,
    runtime: {
      order: 9,
      flags: ["-kc", "--kimi-code"],
      description: "Run as Kimi Code PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 10,
      flag: "--kimi-code",
      artifactKind: "hook config",
      probeCommand: ["kimi", "--version"]
    }
  },
  {
    id: "openclaw",
    displayName: "OpenClaw",
    doctorOrder: 11,
    install: {
      order: 11,
      flag: "--openclaw",
      artifactKind: "plugin",
      probeCommand: ["openclaw", "--version"]
    }
  },
  {
    id: "opencode",
    displayName: "OpenCode",
    doctorOrder: 12,
    install: {
      order: 12,
      flag: "--opencode",
      artifactKind: "plugin",
      probeCommand: ["opencode", "--version"]
    }
  },
  {
    id: "pi",
    displayName: "Pi",
    doctorOrder: 13,
    install: {
      order: 13,
      flag: "--pi",
      artifactKind: "package",
      probeCommand: ["pi", "--version"]
    }
  },
  {
    id: "cursor",
    displayName: "Cursor",
    doctorOrder: 5,
    runtime: {
      order: 4,
      flags: ["-cu", "--cursor"],
      description: "Run as Cursor preToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 5,
      flag: "--cursor",
      artifactKind: "hook config",
      probeCommand: ["cursor", "--version"]
    }
  },
  {
    id: "amp",
    displayName: "Amp Code",
    doctorOrder: 2,
    install: {
      order: 1,
      flag: "--amp",
      artifactKind: "plugin",
      probeCommand: ["amp", "--version"]
    }
  },
  {
    id: "goose",
    displayName: "Goose",
    doctorOrder: 14,
    runtime: {
      order: 10,
      flags: ["-go", "--goose"],
      description: "Run as Goose PreToolUse hook",
      legacyTopLevelFlags: []
    },
    install: {
      order: 14,
      flag: "--goose",
      artifactKind: "hook config",
      probeCommand: ["goose", "--version"]
    }
  }
];
var doctorIntegrationOrder = catalog.slice().sort((a, b) => a.doctorOrder - b.doctorOrder).map((integration) => integration.id);
var runtimeHookIntegrationMetadata = catalog.filter((integration) => ("runtime" in integration)).slice().sort((a, b) => a.runtime.order - b.runtime.order).map((integration) => ({
  id: integration.id,
  displayName: "displayName" in integration.runtime ? integration.runtime.displayName : integration.displayName,
  flags: integration.runtime.flags,
  legacyFlags: "legacyFlags" in integration.runtime ? integration.runtime.legacyFlags : [],
  description: integration.runtime.description,
  legacyTopLevelFlags: integration.runtime.legacyTopLevelFlags
}));
var installIntegrationMetadata = catalog.slice().sort((a, b) => a.install.order - b.install.order).map((integration) => ({ id: integration.id, ...integration.install })).map(({ order: _, ...integration }) => integration);
var integrationDisplayNames = Object.fromEntries(catalog.map((integration) => [integration.id, integration.displayName]));

// src/gui/frontend/main.ts
var token = JSON.parse(document.getElementById("ccsn-data").textContent).token;
var fallbackRepoUrl = "https://github.com/kenryu42/cc-safety-net";
var safetyLevels = {
  standard: [
    "Standard",
    "Blocks recognizable destructive commands and sensitive content access while allowing metadata-only sensitive-path checks. Recommended for normal coding."
  ],
  strict: [
    "Strict",
    "Standard, plus blocks dynamic or unparseable commands and metadata-only sensitive-path discovery. Occasional false positives on advanced shell."
  ],
  paranoid: [
    "Paranoid",
    "Strict, plus blocks rm -rf inside your project and interpreter one-liners. Expect friction; for untrusted agents or high-stakes repos."
  ]
};
var safetyOverrides = {
  fail_closed: ["Fail closed", "Block commands the parser cannot fully understand."],
  paranoid_rm: ["Paranoid rm -rf checks", "Block non-temp rm -rf inside the project."],
  paranoid_interpreters: ["Paranoid interpreters", "Block interpreter one-liners."]
};
var rawCopyIcons = {
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"></path></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>'
};
var starIcons = {
  outline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>',
  filled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"></path></svg>'
};
var reportIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><path d="M4 22v-7"></path></svg>';
var pathListIcons = {
  add: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>',
  remove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M10 11v6M14 11v6"></path></svg>'
};
var state;
var draftPolicy;
var projectDraft = null;
var markedFields = new Set;
var preview;
var previewRequestId = 0;
var dirty = false;
var searchActive = false;
var OVERVIEW_DAYS = 7;
var overview = null;
var activity = null;
var knownRuleIds = new Set;
var activityFilters = { days: 7, decision: "all", agent: "all", query: "", command: "" };
var tierExpanded = new Map([
  ["enforced", false],
  ["normal", false],
  ["strict", false],
  ["paranoid", false]
]);
var searchCollapsedTiers = new Set;
var secretGroupExpanded = new Map;
var searchCollapsedSecretGroups = new Set;
var rawCopyResetTimer = null;
var feedCopyResetTimer = null;
var activityQueryTimer;
var renderedFeedEntries = [];
var suspects = new Set;
var activeStarContext = { starred: null, starCount: null, blockedTotal: 0 };
var integrations = null;
var integrationsRequested = false;
var integrationBusy = new Set;
var rulesData = null;
var rulesRequested = false;
var rulesScope = "project";
var pendingRuleFocus = null;
var directoryPickerFailed = false;
var api = (path, init = {}) => fetch(\`\${path}\${path.includes("?") ? "&" : "?"}token=\${encodeURIComponent(token)}\`, {
  ...init,
  headers: {
    "content-type": "application/json",
    "x-cc-safety-net-token": token,
    ...init.headers || {}
  }
});
var requestJson = async (path, init) => {
  try {
    const response = await api(path, init);
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      data: text ? JSON.parse(text) : {},
      error: undefined
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: undefined,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var errorText = (result) => result.error ?? (Array.isArray(result.data?.errors) && result.data.errors.length ? result.data.errors.join(\`
\`) : null) ?? result.data?.error ?? \`Request failed (status \${result.status}).\`;
var isWriteSuccess = (result) => result.ok && !(Array.isArray(result.data?.errors) && result.data.errors.length > 0);
var qs = (id) => document.getElementById(id);
var setDetailStatus = (text, kind = "") => {
  qs("status").textContent = text;
  qs("status").className = \`status \${kind}\`;
};
var appStatusTimer;
var setAppStatus = (text, kind = "") => {
  qs("app-status").textContent = text;
  qs("app-status").className = \`app-status \${kind}\`;
  clearTimeout(appStatusTimer);
  if (kind === "ok")
    appStatusTimer = setTimeout(() => setAppStatus(""), 4000);
};
var busy = false;
var updateActions = () => {
  const hasErrors = (state?.errors.length ?? 0) > 0;
  qs("save").disabled = busy || !state || hasErrors;
  qs("reset").disabled = busy || !state;
  qs("repair").disabled = busy || !hasErrors;
};
var runExclusive = async (pendingText, fn) => {
  if (busy)
    return;
  busy = true;
  updateActions();
  setAppStatus(pendingText);
  setDetailStatus("");
  try {
    await fn();
  } finally {
    busy = false;
    updateActions();
  }
};
var checkbox = (checked) => checked ? "checked" : "";
var dayCount = (days) => \`\${days} day\${days === 1 ? "" : "s"}\`;
var syncMasterBadges = () => {
  document.querySelectorAll("label.row.master input").forEach((input) => {
    const badge = input.closest("label")?.querySelector(".master-badge");
    if (badge)
      badge.textContent = input.checked ? "On" : "Off";
  });
};
var escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[char] ?? char);
var clonePolicy = (policy) => JSON.parse(JSON.stringify(policy));
var pathLines = (value) => value.split(\`
\`).map((line) => line.trim()).filter(Boolean);
var formatPolicy = (policy) => \`\${JSON.stringify(policy, null, 2)}
\`;
var markedOverrides = (marked, section, overrides) => Object.fromEntries(Object.entries(overrides).filter(([key, value]) => value !== undefined && marked.has(\`\${section}.overrides.\${key}\`)));
var withOverrides = (overrides) => Object.keys(overrides).length > 0 ? { overrides } : {};
var collectProjectProposal = (marked, policy) => {
  const sections = {
    safety: {
      ...marked.has("safety.level") ? { level: policy.safety.level } : {},
      ...withOverrides(markedOverrides(marked, "safety", policy.safety.overrides))
    },
    workflow: marked.has("workflow.worktree_mode") ? { worktree_mode: policy.workflow.worktree_mode } : {},
    destructive_command_protection: {
      ...marked.has("destructive_command_protection.enabled") ? { enabled: policy.destructive_command_protection.enabled } : {},
      ...withOverrides(markedOverrides(marked, "destructive_command_protection", policy.destructive_command_protection.overrides)),
      ...marked.has("destructive_command_protection.allow_paths") ? { allow_paths: policy.destructive_command_protection.allow_paths } : {}
    },
    secret_protection: {
      ...marked.has("secret_protection.enabled") ? { enabled: policy.secret_protection.enabled } : {},
      ...withOverrides(markedOverrides(marked, "secret_protection", policy.secret_protection.overrides)),
      ...marked.has("secret_protection.deny_paths") ? { deny_paths: policy.secret_protection.deny_paths } : {},
      ...marked.has("secret_protection.allow_paths") ? { allow_paths: policy.secret_protection.allow_paths } : {}
    }
  };
  return {
    version: 1,
    ...Object.fromEntries(Object.entries(sections).filter(([, fields]) => Object.keys(fields).length > 0))
  };
};
var projectMarkedFields = (projection) => {
  const destructive = projection.destructive_command_protection ?? {};
  const secret = projection.secret_protection ?? {};
  return [
    ...projection.safety?.level === undefined ? [] : ["safety.level"],
    ...Object.keys(projection.safety?.overrides ?? {}).map((key) => \`safety.overrides.\${key}\`),
    ...projection.workflow?.worktree_mode === undefined ? [] : ["workflow.worktree_mode"],
    ...destructive.enabled === undefined ? [] : ["destructive_command_protection.enabled"],
    ...Object.keys(destructive.overrides ?? {}).map((id) => \`destructive_command_protection.overrides.\${id}\`),
    ...destructive.allow_paths === undefined ? [] : ["destructive_command_protection.allow_paths"],
    ...secret.enabled === undefined ? [] : ["secret_protection.enabled"],
    ...Object.keys(secret.overrides ?? {}).map((id) => \`secret_protection.overrides.\${id}\`),
    ...secret.deny_paths === undefined ? [] : ["secret_protection.deny_paths"],
    ...secret.allow_paths === undefined ? [] : ["secret_protection.allow_paths"]
  ];
};
var overlayProjectProposal = (baseline, proposal) => {
  const displayed = clonePolicy(baseline);
  const destructive = proposal.destructive_command_protection ?? {};
  const secret = proposal.secret_protection ?? {};
  if (proposal.safety?.level)
    displayed.safety.level = proposal.safety.level;
  Object.assign(displayed.safety.overrides, proposal.safety?.overrides ?? {});
  if (proposal.workflow?.worktree_mode !== undefined)
    displayed.workflow.worktree_mode = proposal.workflow.worktree_mode;
  if (destructive.enabled !== undefined)
    displayed.destructive_command_protection.enabled = destructive.enabled;
  Object.assign(displayed.destructive_command_protection.overrides, destructive.overrides ?? {});
  if (destructive.allow_paths)
    displayed.destructive_command_protection.allow_paths = destructive.allow_paths;
  if (secret.enabled !== undefined)
    displayed.secret_protection.enabled = secret.enabled;
  Object.assign(displayed.secret_protection.overrides, secret.overrides ?? {});
  if (secret.deny_paths)
    displayed.secret_protection.deny_paths = secret.deny_paths;
  if (secret.allow_paths)
    displayed.secret_protection.allow_paths = secret.allow_paths;
  return displayed;
};
var seedProjectDraft = (data) => {
  if (!data.baseline)
    return null;
  if (!Array.isArray(data.userPolicyDiagnostics) || data.userPolicyDiagnostics.length > 0)
    return null;
  const marked = new Set(projectMarkedFields(data.projection ?? {}));
  const policy = overlayProjectProposal(data.baseline, data.projection ?? {});
  return {
    baseline: data.baseline,
    marked,
    policy,
    snapshot: JSON.stringify(collectProjectProposal(marked, policy))
  };
};
var collectFormPolicy = () => ({
  version: 1,
  safety: {
    level: draftPolicy.safety.level,
    overrides: Object.fromEntries(Object.entries(draftPolicy.safety.overrides).filter(([, value]) => typeof value === "boolean"))
  },
  workflow: draftPolicy.workflow,
  destructive_command_protection: draftPolicy.destructive_command_protection,
  secret_protection: {
    enabled: draftPolicy.secret_protection.enabled,
    overrides: draftPolicy.secret_protection.overrides,
    deny_paths: draftPolicy.secret_protection.deny_paths,
    allow_paths: draftPolicy.secret_protection.allow_paths
  },
  audit: draftPolicy.audit
});
var effectivePreviewPolicy = (policy, baseline) => {
  if (!baseline)
    return policy;
  const union = (user, project) => [...new Set([...user, ...project])];
  return {
    ...policy,
    destructive_command_protection: {
      ...policy.destructive_command_protection,
      allow_paths: union(baseline.destructive_command_protection.allow_paths, policy.destructive_command_protection.allow_paths)
    },
    secret_protection: {
      ...policy.secret_protection,
      deny_paths: union(baseline.secret_protection.deny_paths, policy.secret_protection.deny_paths),
      allow_paths: union(baseline.secret_protection.allow_paths, policy.secret_protection.allow_paths)
    }
  };
};
var requestPolicyPreview = (policy = collectFormPolicy()) => requestJson("/api/policy/preview", {
  method: "POST",
  body: JSON.stringify(policy)
});
var policyScopeMode = () => projectDraft ? "project" : "user";
var projectFieldChip = (field, compact = false) => {
  if (policyScopeMode() !== "project")
    return "";
  if (!markedFields.has(field))
    return '<span class="project-chip inherited">Inherited</span>';
  return \`<button type="button" class="project-chip" data-unmark-field="\${escapeHtml(field)}" title="Set by project - click to inherit again" aria-label="Set by project: \${escapeHtml(field)}. Activate to inherit again.">\${compact ? "Project" : "Set by project"}</button>\`;
};
var projectFieldLine = (field) => {
  const chip = projectFieldChip(field);
  return chip ? \`<div class="project-field-line">\${chip}</div>\` : "";
};
var projectChipSlots = [
  ["destructive-enabled-chip", "destructive_command_protection.enabled"],
  ["secret-enabled-chip", "secret_protection.enabled"],
  ["allow-paths-chip", "destructive_command_protection.allow_paths"],
  ["deny-paths-chip", "secret_protection.deny_paths"],
  ["secret-allow-paths-chip", "secret_protection.allow_paths"]
];
var syncProjectChips = () => {
  projectChipSlots.forEach(([id, field]) => {
    qs(id).innerHTML = projectFieldChip(field);
  });
};
var markProjectField = (field) => {
  if (!projectDraft || markedFields.has(field))
    return;
  markedFields.add(field);
  renderSafety();
  syncProjectChips();
};
var rebuildProjectDisplay = () => {
  if (!projectDraft)
    return;
  draftPolicy = overlayProjectProposal(projectDraft.baseline, collectProjectProposal(markedFields, draftPolicy));
  renderPolicySections();
  refreshPolicyPreview();
};
var unmarkProjectField = (field) => {
  if (!projectDraft || !markedFields.has(field))
    return;
  markedFields.delete(field);
  rebuildProjectDisplay();
};
var viewNames = ["overview", "activity", "policy", "rules", "integrations", "settings"];
var viewTitles = {
  overview: "Overview",
  activity: "Activity",
  policy: "Policy",
  rules: "Rules",
  integrations: "Integrations",
  settings: "Settings"
};
var currentView = () => {
  const hash = location.hash.replace("#", "");
  return viewNames.includes(hash) ? hash : "overview";
};
var applyView = () => {
  const view = currentView();
  document.body.dataset.view = view;
  const hasSearch = view === "activity" || view === "policy";
  qs("topbar-title").textContent = viewTitles[view];
  qs("topbar-title").classList.toggle("sr-only", hasSearch);
  document.querySelectorAll(".topbar-search").forEach((el) => {
    el.hidden = el.dataset.searchView !== view;
  });
  qs("topbar").classList.toggle("has-search", hasSearch);
  document.title = \`\${viewTitles[view]} · CC Safety Net\`;
  document.querySelectorAll("[data-view]").forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === view)
      link.setAttribute("aria-current", "page");
    else
      link.removeAttribute("aria-current");
  });
  qs("dirty-chip").hidden = !dirty || view === "policy";
  if (view === "activity")
    applyFeedClamps(qs("activity-feed"));
  if (view === "integrations" && !integrationsRequested) {
    integrationsRequested = true;
    loadIntegrations();
  }
  if (view === "rules" && !rulesRequested) {
    rulesRequested = true;
    loadRules();
  }
  if (view === "rules" && rulesData && pendingRuleFocus)
    renderRules();
};
var agentLabels = integrationDisplayNames;
var tierCountHtml = (segments) => {
  const parts = segments.filter(([count]) => count > 0).map(([count, label, tone]) => tone ? \`<span class="count-\${tone}">\${count} \${label}</span>\` : \`\${count} \${label}\`);
  return parts.length > 0 ? parts.join(" · ") : "0 on";
};
var feedItemHtml = (entry, index) => {
  const deny = entry.decision !== "allow";
  const badgeClass = entry.failureStage ? "error" : deny ? "deny" : "allow";
  const badgeLabel = entry.failureStage ? "Error" : deny ? "Blocked" : "Allowed";
  return \`<article class="feed-item">
    <div class="feed-meta">
      <span class="decision-badge \${badgeClass}">\${badgeLabel}</span>
      \${entry.agent && entry.agent !== "unknown" ? \`<span class="agent-badge">\${escapeHtml(agentLabels[entry.agent] ?? entry.agent)}</span>\` : ""}
      \${entry.ruleId ? knownRuleIds.has(entry.ruleId) ? \`<button type="button" class="rule-id" data-jump-rule="\${escapeHtml(entry.ruleId)}" title="Show this rule in Policy">\${escapeHtml(entry.ruleId)}</button>\` : \`<code class="rule-id">\${escapeHtml(entry.ruleId)}</code>\` : ""}
      <time datetime="\${escapeHtml(entry.ts)}" title="\${escapeHtml(entry.ts)}">\${formatRelativeTime(entry.ts)}</time>
      <button type="button" class="icon-button feed-copy" data-log-copy="\${index}" aria-label="Copy log entry as JSON">\${rawCopyIcons.copy}</button>
      \${deny ? \`<button type="button" class="icon-button feed-report" data-report-fp="\${index}" aria-label="Report false positive" title="Report false positive">\${reportIcon}</button>\` : \`<button type="button" class="feed-toggle feed-block" data-block-future="\${index}">Block this in future</button>\`}
    </div>
    <code class="feed-command">\${escapeHtml(entry.segment || entry.command || "(no command recorded)")}</code>
    \${entry.reason && entry.reason !== "allowed" ? \`<p class="feed-reason muted">\${escapeHtml(entry.reason)}</p>\` : ""}
  </article>\`;
};
var applyFeedClamps = (root) => {
  const overflowing = [...root.querySelectorAll(".feed-command")].filter((command) => !command.classList.contains("clamped") && command.scrollHeight > command.clientHeight + 1);
  overflowing.forEach((command) => {
    command.classList.add("clamped");
    command.insertAdjacentHTML("afterend", '<button type="button" class="feed-toggle" data-feed-toggle aria-expanded="false">Show more</button>');
  });
};
var dayLabel = (ts) => {
  const date = new Date(ts);
  if (date.toDateString() === new Date().toDateString())
    return "Today";
  if (date.toDateString() === new Date(Date.now() - 86400000).toDateString())
    return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
var renderOverviewActivity = () => {
  if (!overview)
    return;
  const tile = (value, label, extra) => \`<div class="tile"><strong>\${escapeHtml(value.toLocaleString("en-US"))}</strong><span>\${escapeHtml(label)}</span>\${extra}</div>\`;
  const dayAgoLabel = (daysAgo) => daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : \`\${daysAgo} days ago\`;
  const sparkline = (byDay, noun) => {
    const max = Math.max(...byDay, 1);
    return \`<div class="tile-spark" role="group" aria-label="Commands \${noun} per day, most recent \${dayCount(byDay.length)}">\${byDay.map((count, index) => {
      const label = \`\${dayAgoLabel(byDay.length - 1 - index)}: \${count.toLocaleString("en-US")} \${noun}\`;
      return \`<div class="spark-col" role="img" tabindex="0" data-count="\${count.toLocaleString("en-US")}" aria-label="\${escapeHtml(label)}"><div class="spark-bar\${count === 0 ? " spark-zero" : ""}" aria-hidden="true" style="height:\${count === 0 ? 2 : Math.max(2, Math.round(count / max * 40))}px"></div></div>\`;
    }).join("")}</div>\`;
  };
  qs("overview-window").textContent = \`Last \${dayCount(overview.days)}\`;
  qs("overview-tiles").innerHTML = [
    tile(overview.counts.blocked, "Blocked", sparkline(overview.counts.blockedByDay, "blocked")),
    tile(overview.totalInWindow, "Analyzed", sparkline(overview.counts.analyzedByDay, "analyzed"))
  ].join("");
};
var retentionDays = () => state?.policy?.audit?.retention_days ?? DEFAULT_AUDIT_RETENTION_DAYS;
var overviewDays = () => Math.min(OVERVIEW_DAYS, retentionDays());
var renderRetention = (loaded) => {
  qs("retention-days").value = String(loaded.policy.audit.retention_days);
  qs("retention-unit").textContent = loaded.policy.audit.retention_days === 1 ? "day" : "days";
  qs("retention-note").textContent = "Saved on change. Lowering this deletes anything already older than the new window; the Activity tab can only look back as far as it.";
};
var activityWindowOptions = () => {
  const retained = retentionDays();
  const windows = [7, 30, 90, 180, 365].filter((days) => days < retained);
  return [...windows, retained];
};
var configStateNotice = () => {
  const configState = state?.configState;
  if (!configState || configState.state === "ready")
    return null;
  return \`A fallback configuration is being enforced: \${configState.reason}\`;
};
var setProtectionBanner = (notices) => {
  const text = notices.filter(Boolean).join(" ");
  qs("protection-banner").textContent = text;
  qs("protection-banner").hidden = text === "";
};
var renderProtectionCard = () => {
  const configNotice = configStateNotice();
  if (!state?.preview) {
    qs("protection-card").hidden = true;
    setProtectionBanner([configNotice]);
    return;
  }
  const policy = state.policy;
  const customized = state.preview.counts.effectiveCustomizations > 0 || Object.entries(policy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[policy.safety.level][key]);
  const commandsOn = policy.destructive_command_protection.enabled;
  const secretsOn = policy.secret_protection.enabled;
  const off = [
    commandsOn ? null : "Destructive command protection is off — configurable destructive command rules are not being enforced (catastrophic and custom rules remain active)",
    secretsOn ? null : "Secret protection is off — sensitive paths and deny paths are not being blocked"
  ].filter(Boolean);
  setProtectionBanner([
    off.length > 0 ? \`\${off.join(". ")}. Re-enable \${off.length > 1 ? "them" : "it"} in Policy.\` : null,
    configNotice
  ]);
  qs("protection-card").hidden = false;
  qs("protection-card").classList.toggle("protection-warning", !commandsOn || !secretsOn);
  qs("protection-card").innerHTML = \`<div class="panel-head"><div class="panel-title"><h2>Protection status</h2></div><a class="panel-head-action view-all-link" href="#policy">Configure</a></div>\` + \`<p>\${escapeHtml(safetyLevels[policy.safety.level][0])}\${customized ? " · Customized" : ""}</p>\` + \`<p\${commandsOn ? "" : ' class="state-disabled"'}>\${commandsOn ? \`\${state.preview.counts.enabled} rules active\` : "Destructive command protection is OFF"}</p>\` + \`<p\${secretsOn ? "" : ' class="state-disabled"'}>\${secretsOn ? "Secret protection on" : "Secret protection is OFF"}</p>\`;
};
var renderTopList = (containerId, counts, className, dataAttr) => {
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  qs(containerId).innerHTML = top.length === 0 ? '<p class="empty">No blocked commands in this window.</p>' : top.map(([key, count]) => \`<button type="button" class="\${className}" \${dataAttr}="\${escapeHtml(key)}"><code class="rule-id">\${escapeHtml(key)}</code><span class="chip-count">\${count.toLocaleString("en-US")}</span></button>\`).join("");
};
var renderTopLists = () => {
  if (!overview)
    return;
  renderTopList("top-commands", overview.counts.commands, "top-command", "data-command");
  renderTopList("top-rules", overview.counts.rules, "top-rule", "data-rule-id");
};
var clearCommandFilter = () => {
  if (!activityFilters.command)
    return false;
  activityFilters.command = "";
  return true;
};
var jumpToActivityRule = (ruleId) => {
  activityFilters.command = "";
  activityFilters.query = ruleId.toLowerCase();
  qs("activity-search").value = ruleId;
  if (activity) {
    renderActivityControls();
    renderActivityFeed();
  }
  location.hash = "activity";
};
var renderGuardErrors = () => {
  if (!overview)
    return;
  qs("guard-errors").hidden = overview.counts.errors === 0;
  if (overview.counts.errors === 0)
    return;
  qs("guard-errors").textContent = \`\${overview.counts.errors.toLocaleString("en-US")} guard error\${overview.counts.errors === 1 ? "" : "s"} in the last \${dayCount(overview.days)} — commands blocked because evaluation failed, not by policy. Click to view.\`;
};
var renderActivityControls = () => {
  if (!activity)
    return;
  const agentCounts = activity.counts.agents;
  const chipHtml = (kind, value, label, count) => \`<button type="button" class="chip" data-activity-chip="\${kind}" data-chip-value="\${escapeHtml(value)}" aria-pressed="\${activityFilters[kind] === value}">\${escapeHtml(label)}\${count === undefined ? "" : \` <span class="chip-count">\${count.toLocaleString("en-US")}</span>\`}</button>\`;
  qs("activity-decision").innerHTML = [
    chipHtml("decision", "all", "All", activity.totalInWindow),
    chipHtml("decision", "deny", "Blocked", activity.counts.blocked),
    chipHtml("decision", "allow", "Allowed", activity.counts.allowed),
    ...activity.counts.errors > 0 ? [chipHtml("decision", "error", "Errors", activity.counts.errors)] : [],
    ...suspects.size > 0 ? [chipHtml("decision", "suspect", "Likely false positive", suspects.size)] : []
  ].join("");
  const agentNames = Object.keys(agentCounts).filter((name) => name !== "unknown").sort();
  qs("activity-agents").innerHTML = agentNames.length < 2 ? "" : [
    chipHtml("agent", "all", "All agents"),
    ...agentNames.map((name) => chipHtml("agent", name, agentLabels[name] ?? name, agentCounts[name]))
  ].join("");
  qs("activity-command-filter").innerHTML = activityFilters.command ? \`<button type="button" class="filter-pill" data-clear-command aria-label="Clear command filter">Command: <code>\${escapeHtml(activityFilters.command)}</code><span class="filter-pill-x" aria-hidden="true">✕</span></button>\` : "";
  qs("activity-days").innerHTML = activityWindowOptions().map((days) => \`<option value="\${days}">Last \${dayCount(days)}</option>\`).join("");
  qs("activity-days").value = String(activity.days);
};
var renderActivityFeed = () => {
  if (!activity)
    return;
  const matchesFilters = (entry) => {
    if (activityFilters.decision === "deny" && entry.decision === "allow")
      return false;
    if (activityFilters.decision === "allow" && entry.decision !== "allow")
      return false;
    if (activityFilters.decision === "error" && !entry.failureStage)
      return false;
    if (activityFilters.decision === "suspect" && !suspects.has(entry))
      return false;
    if (activityFilters.agent !== "all" && (entry.agent || "unknown") !== activityFilters.agent)
      return false;
    if (activityFilters.command) {
      if (entry.decision === "allow")
        return false;
      return commandSignature(entry.segment || entry.command) === activityFilters.command;
    }
    if (!activityFilters.query)
      return true;
    return [entry.ruleId, entry.segment || entry.command].filter(Boolean).join(" ").toLowerCase().includes(activityFilters.query);
  };
  const entries = activity.entries.filter(matchesFilters);
  renderedFeedEntries = entries;
  qs("activity-feed").innerHTML = entries.length === 0 ? '<p class="empty">No audit log entries match.</p>' : \`<div class="feed-list">\${entries.map((entry, index) => {
    const label = dayLabel(entry.ts);
    const previous = entries[index - 1];
    const separator = previous && label === dayLabel(previous.ts) ? "" : \`<div class="feed-day-sep">\${escapeHtml(label)}</div>\`;
    return separator + feedItemHtml(entry, index);
  }).join("")}</div>\`;
  applyFeedClamps(qs("activity-feed"));
  qs("activity-count").textContent = \`Showing \${entries.length.toLocaleString("en-US")} of \${activity.totalInWindow.toLocaleString("en-US")} entries from the last \${dayCount(activity.days)}\${activity.truncated ? " (capped at 500, newest of each decision)" : ""}.\${activity.unreadable > 0 ? \` \${activity.unreadable.toLocaleString("en-US")} audit log source\${activity.unreadable === 1 ? "" : "s"} could not be read, so this list is incomplete.\` : ""}\`;
};
var loadOverview = async () => {
  const result = await requestJson(\`/api/activity?days=\${overviewDays()}\`);
  if (!result.ok || !result.data) {
    const message = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("overview-window").textContent = "";
    qs("overview-tiles").innerHTML = "";
    qs("top-rules").innerHTML = message;
    qs("guard-errors").hidden = true;
    return;
  }
  const feed = result.data;
  overview = feed;
  qs("logs-path").textContent = overview.logsDir ?? "Not available";
  renderOverviewActivity();
  renderTopLists();
  renderGuardErrors();
};
var loadActivity = async () => {
  const result = await requestJson(\`/api/activity?days=\${activityFilters.days}\`);
  if (!result.ok || !result.data) {
    const message = \`<p class="empty">Could not load activity: \${escapeHtml(errorText(result))}</p>\`;
    qs("activity-feed").innerHTML = message;
    qs("activity-count").textContent = "";
    return;
  }
  const feed = result.data;
  activity = feed;
  suspects = findSuspectEntries(activity.entries);
  if (activityFilters.agent !== "all" && !(activityFilters.agent in activity.counts.agents)) {
    activityFilters.agent = "all";
  }
  if (activityFilters.decision === "error" && activity.counts.errors === 0) {
    activityFilters.decision = "all";
  }
  if (activityFilters.decision === "suspect" && suspects.size === 0) {
    activityFilters.decision = "all";
  }
  renderActivityControls();
  renderActivityFeed();
};
var runRefresh = async (buttonId, reload) => {
  const button = qs(buttonId);
  if (button.disabled)
    return;
  button.disabled = true;
  button.classList.add("spinning");
  try {
    await Promise.all([reload(), new Promise((resolve) => setTimeout(resolve, 600))]);
  } finally {
    button.classList.remove("spinning");
    button.disabled = false;
  }
};
var refreshActivity = () => runRefresh("activity-refresh", () => Promise.all([loadOverview(), loadActivity()]));
var renderIntegrations = () => {
  const loaded = integrations;
  if (!loaded)
    return;
  qs("integrations-list").innerHTML = loaded.targets.map((row) => {
    const busy = integrationBusy.has(row.target);
    const version = row.version === null ? '<span class="muted">not detected</span>' : \`<span class="agent-badge">v\${escapeHtml(row.version)}</span>\`;
    const status = row.status === "active" ? '<span class="state-active">Installed</span>' : row.status === "disabled" ? '<span class="state-disabled">Disabled</span>' : row.status === "not-inspected" ? \`<span class="muted" title="This runtime's state file could not be read, so its status is unknown.">Not inspected</span>\` : '<span class="muted">Not installed</span>';
    const uninstall = row.status === "active";
    const busyLabel = uninstall ? "Uninstalling…" : "Installing…";
    const action = row.version === null ? "" : \`<button type="button" class="\${uninstall ? "danger" : "primary"}" data-integration-action="\${uninstall ? "uninstall" : "install"}" data-integration-target="\${escapeHtml(row.target)}"\${busy ? " disabled" : ""}>\${busy ? busyLabel : uninstall ? "Uninstall" : row.status === "disabled" ? "Enable" : "Install"}</button>\`;
    const note = row.note ? \`<div class="status \${row.note.kind}">\${escapeHtml(row.note.text)}</div>\` : "";
    return \`<div class="integration-row">
        <span class="integration-info"><strong>\${escapeHtml(row.label)}</strong> \${version} \${status}</span>
        \${action}
        \${note}
      </div>\`;
  }).join("");
};
var loadHealth = async () => {
  const result = await requestJson("/api/health");
  if (!result.ok || !Array.isArray(result.data?.hooks))
    return;
  const active = result.data.hooks.filter((hook) => hook.configured);
  const inactive = result.data.hooks.filter((hook) => !hook.configured);
  const attention = inactive.length > 0 || active.length === 0;
  const parts = [];
  const labelHtml = (hook) => \`<strong>\${escapeHtml(hook.label)}</strong>\`;
  if (active.length)
    parts.push(\`Hook active in \${active.map(labelHtml).join(", ")}\`);
  if (inactive.length)
    parts.push(\`\${inactive.map(labelHtml).join(", ")} detected without an active hook\`);
  if (!parts.length)
    parts.push("No agent hooks detected");
  if (result.data.update?.updateAvailable)
    parts.push(\`v\${escapeHtml(result.data.update.latestVersion)} available\`);
  const link = attention ? ' <a class="view-all-link" href="#integrations">Fix in Integrations</a>' : "";
  const el = qs("health-strip");
  el.className = attention ? "status health-strip error" : "status health-strip ok";
  el.innerHTML = parts.join(" · ") + link;
  el.hidden = false;
};
var loadIntegrations = async () => {
  const result = await requestJson("/api/integrations");
  if (!result.ok || !Array.isArray(result.data?.targets)) {
    qs("integrations-list").innerHTML = \`<p class="empty">Could not load integrations: \${escapeHtml(errorText(result))}</p>\`;
    integrationsRequested = false;
    return;
  }
  integrations = result.data;
  renderIntegrations();
  qs("integrations-pkg-version").textContent = result.data.system.version;
  qs("integrations-node-version").textContent = result.data.system.nodeVersion ?? "unknown";
  qs("integrations-platform").textContent = result.data.system.platform;
  qs("integrations-system").hidden = false;
};
var refreshIntegrations = () => runRefresh("integrations-refresh", () => {
  integrationsRequested = true;
  return loadIntegrations();
});
var renderRules = () => {
  const loaded = rulesData;
  if (!loaded)
    return;
  if (!qs("rules-project-path").value)
    qs("rules-project-path").value = loaded.projectPath;
  const canPick = loaded.canPickDirectory && !directoryPickerFailed;
  qs("rules-project-path").readOnly = canPick;
  qs("rules-choose-directory").hidden = !canPick;
  qs("rules-list").innerHTML = loaded.rulebooks.length === 0 ? loaded.errors.length > 0 ? '<p class="empty">Every configured rulebook was dropped, so no custom rule is enforced. See Diagnostics below.</p>' : '<p class="empty">No custom rulebooks. Run <code>npx -y cc-safety-net rule init</code> to create one, or see the <a href="https://ccsafetynet.com/docs" target="_blank" rel="noopener">documentation</a>.</p>' : loaded.rulebooks.map((rulebook) => \`<div class="rulebook-card">
    <div class="rulebook-head">
      <strong>\${escapeHtml(rulebook.name)}</strong>
      <span class="agent-badge">v\${escapeHtml(rulebook.version)}</span>
      \${rulebook.spec === rulebook.name ? "" : \`<code>\${escapeHtml(rulebook.spec)}</code>\`}
      <span>\${rulebook.source === "user" ? "All projects" : "This project"}</span>
      <span>\${rulebook.rules.length} rule\${rulebook.rules.length === 1 ? "" : "s"}</span>
    </div>
    \${rulebook.rules.map((rule) => \`<div class="rulebook-rule\${pendingRuleFocus === rule.name ? " rules-focus" : ""}">
      <code class="rule-id">custom.\${escapeHtml(rule.name)}</code>
      <code>\${escapeHtml([rule.command, rule.subcommand].filter(Boolean).join(" "))}</code>
      <p>Blocked arguments (any one matches): \${rule.block_args.map((arg) => \`<code>\${escapeHtml(arg)}</code>\`).join(" ")}</p>
      <p>\${escapeHtml(rule.reason)}</p>
    </div>\`).join("")}
  </div>\`).join("");
  const diagnostics = [
    ...loaded.errors.map((text) => \`<div class="status error">\${escapeHtml(text)}</div>\`),
    ...loaded.warnings.map((text) => \`<div class="status">\${escapeHtml(text)}</div>\`)
  ];
  qs("rules-diagnostics").innerHTML = diagnostics.join("");
  qs("rules-diagnostics-panel").hidden = diagnostics.length === 0;
  if (!pendingRuleFocus)
    return;
  const focused = qs("rules-list").querySelector(".rules-focus");
  if (focused)
    focused.scrollIntoView({ block: "center" });
  if (!focused)
    setAppStatus(\`custom.\${pendingRuleFocus} is not in any rulebook\`, "error");
  pendingRuleFocus = null;
};
var loadRules = async () => {
  const result = await requestJson("/api/rules");
  if (!result.ok || !Array.isArray(result.data?.rulebooks)) {
    qs("rules-list").innerHTML = \`<p class="empty">Could not load rules: \${escapeHtml(errorText(result))}</p>\`;
    rulesData = null;
    qs("rules-diagnostics-panel").hidden = true;
    rulesRequested = false;
    return;
  }
  rulesData = result.data;
  renderRules();
};
var refreshRules = () => runRefresh("rules-refresh", () => {
  rulesRequested = true;
  return loadRules();
});
var jumpToRulesRule = (ruleId) => {
  pendingRuleFocus = ruleId.replace(/^custom\\./, "");
  location.hash = "rules";
};
var openRuleComposer = (command) => {
  qs("rules-composer-input").value = command;
  location.hash = "rules";
};
var setRulesScope = (scope) => {
  rulesScope = scope;
  document.querySelectorAll("[data-rules-scope]").forEach((chip) => {
    chip.setAttribute("aria-pressed", String(chip.dataset.rulesScope === scope));
  });
  qs("rules-project-path-field").hidden = scope !== "project";
};
var rulePromptText = () => {
  const names = rulesData?.rulebooks.map((rulebook) => rulebook.name) ?? [];
  return [
    "Use the cc-safety-net skill for this request.",
    "If that skill is not available, run \`npx -y cc-safety-net rule doc\` first and treat its output as the source of truth for schema, paths, and validation.",
    "",
    rulesScope === "project" ? \`Scope: this project - \${qs("rules-project-path").value.trim()}\` : "Scope: all projects (user scope)",
    \`Existing rulebooks (names must stay unique across both scopes): \${names.length > 0 ? names.join(", ") : "none"}\`,
    "",
    qs("rules-composer-input").value.trim()
  ].join(\`
\`);
};
var chooseProjectDirectory = async () => {
  const button = qs("rules-choose-directory");
  if (button.disabled)
    return;
  button.disabled = true;
  const result = await requestJson("/api/rules/choose-directory", { method: "POST" });
  button.disabled = false;
  if (result.ok && result.data.path) {
    qs("rules-project-path").value = result.data.path;
    return;
  }
  if (result.ok && result.data.cancelled)
    return;
  directoryPickerFailed = true;
  qs("rules-project-path").readOnly = false;
  button.hidden = true;
  setAppStatus(\`\${result.ok ? result.data.error : errorText(result)} - type the project path instead\`, "error");
};
var copyRulePrompt = async () => {
  if (!rulesData) {
    setAppStatus("Rules have not loaded yet - refresh the Rulebooks panel", "error");
    return;
  }
  if (!qs("rules-composer-input").value.trim()) {
    setAppStatus("Describe what you want first", "error");
    return;
  }
  if (rulesScope === "project" && !qs("rules-project-path").value.trim()) {
    setAppStatus("Enter the project path the rule belongs to", "error");
    return;
  }
  qs("rules-copy-prompt").disabled = true;
  try {
    await navigator.clipboard.writeText(rulePromptText());
    qs("rules-composer-input").value = "";
    setAppStatus("Prompt copied - paste it into your coding CLI", "ok");
  } catch {
    setAppStatus("Copy failed", "error");
  } finally {
    qs("rules-copy-prompt").disabled = false;
  }
};
var runIntegrationAction = async (button) => {
  const target = button.dataset.integrationTarget;
  if (!target || integrationBusy.has(target))
    return;
  integrationBusy.add(target);
  const action = button.dataset.integrationAction;
  renderIntegrations();
  const result = await requestJson(\`/api/\${action}\`, {
    method: "POST",
    body: JSON.stringify({ target })
  });
  integrationBusy.delete(target);
  const row = integrations?.targets.find((entry) => entry.target === target);
  if (!row)
    return;
  const ok = result.ok && result.data.ok === true;
  if (ok)
    row.status = action === "install" ? "active" : "not-installed";
  row.note = {
    kind: ok ? "ok" : "error",
    text: ok ? result.data.output : result.data?.output || errorText(result)
  };
  if (!ok)
    setAppStatus(action === "install" ? "Install failed" : "Uninstall failed", "error");
  renderIntegrations();
};
var confirmDialog = (() => {
  const dialog = qs("confirm-dialog");
  const confirm = qs("confirm-dialog-confirm");
  const cancel = qs("confirm-dialog-cancel");
  let resolvePending = null;
  dialog.addEventListener("close", () => {
    if (!resolvePending)
      return;
    resolvePending(dialog.returnValue === "confirm");
    resolvePending = null;
  });
  dialog.addEventListener("cancel", () => {
    dialog.returnValue = "cancel";
  });
  return (options) => new Promise((resolve) => {
    if (resolvePending) {
      resolve(false);
      return;
    }
    qs("confirm-dialog-title").textContent = options.title;
    qs("confirm-dialog-body").textContent = options.body;
    qs("confirm-dialog-detail").textContent = options.detail ?? "";
    const detailRow = qs("confirm-dialog-detail").parentElement;
    if (detailRow)
      detailRow.hidden = !options.detail;
    qs("confirm-dialog-rows").innerHTML = options.rowsHtml ?? "";
    qs("confirm-dialog-rows").hidden = !options.rowsHtml;
    confirm.textContent = options.confirmLabel;
    confirm.className = options.confirmClass ?? "danger";
    dialog.returnValue = "cancel";
    resolvePending = resolve;
    dialog.showModal();
    cancel.focus();
  });
})();
var confirmProtectionDisable = (options) => confirmDialog({
  title: options.title,
  body: options.body,
  detail: options.detail,
  confirmLabel: "Disable protection"
});
var togglePanel = (button) => {
  const controls = button.getAttribute("aria-controls");
  if (!controls)
    return;
  const expanded = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(expanded));
  qs(controls).hidden = !expanded;
};
var syncSearchState = () => {
  const active = qs("policy-search").value.trim().length > 0;
  if (active === searchActive)
    return;
  searchActive = active;
  if (active)
    return;
  searchCollapsedTiers.clear();
  searchCollapsedSecretGroups.clear();
};
var updateRawSource = () => {
  if (projectDraft) {
    qs("raw-source").textContent = \`Only the fields marked for this project. Writes to \${projectDraft.path}.\`;
    return;
  }
  qs("raw-source").textContent = state?.errors.length ? "Read-only original policy JSON. Repair preserves valid settings and writes canonical JSON." : "Read-only mirror of the controls.";
};
var setRawCopyCopied = (copied) => {
  qs("raw-copy").innerHTML = copied ? rawCopyIcons.check : rawCopyIcons.copy;
  qs("raw-copy").classList.toggle("copied", copied);
  qs("raw-copy").setAttribute("aria-label", copied ? "Copied raw JSON" : "Copy raw JSON to clipboard");
};
var resetFeedCopy = () => {
  document.querySelectorAll(".feed-copy.copied").forEach((button) => {
    button.classList.remove("copied");
    button.innerHTML = rawCopyIcons.copy;
    button.setAttribute("aria-label", "Copy log entry as JSON");
  });
};
var reportIssueUrl = "https://github.com/kenryu42/cc-safety-net/issues/new?template=false_positive.yml";
var reportUrlLimit = 8000;
var endsAtPathBoundary = (following) => following === "" || /^[/\\\\\\s'"]/.test(following);
var scrubReportPaths = (text, cwd, home) => [
  [cwd, "<project>"],
  [home, "~"]
].reduce((scrubbed, [from, to]) => from ? scrubbed.split(from).reduce((joined, part) => joined + (endsAtPathBoundary(part) ? to : from) + part) : scrubbed, text);
var buildReportUrl = (fields) => {
  const url = new URL(reportIssueUrl);
  Object.entries(fields).filter(([, value]) => value).forEach(([field, value]) => {
    url.searchParams.set(field, value);
  });
  return url.toString();
};
var buildReportRequest = (fields, dropped = []) => {
  const url = buildReportUrl(fields);
  if (url.length <= reportUrlLimit)
    return { url, dropped };
  const largest = Object.entries(fields).filter(([, value]) => value).sort((left, right) => right[1].length - left[1].length)[0];
  if (!largest)
    return { url, dropped };
  return buildReportRequest({ ...fields, [largest[0]]: "" }, [...dropped, largest[0]]);
};
var openReportDialog = (button) => {
  const entry = renderedFeedEntries[Number(button.dataset.reportFp)];
  if (!entry)
    return;
  const scrub = (text) => scrubReportPaths(text, entry.cwd, activity?.homeDir);
  qs("report-command").value = scrub(entry.command || entry.segment || "");
  qs("report-entry").value = JSON.stringify(entry, (_key, value) => typeof value === "string" ? scrub(value) : value, 2);
  qs("report-dialog").returnValue = "cancel";
  qs("report-dialog").showModal();
};
var openFalsePositiveForm = async () => {
  const fields = {
    command: qs("report-command").value,
    entry: qs("report-entry").value
  };
  const request = buildReportRequest(fields);
  const copying = request.dropped.length ? navigator.clipboard.writeText(request.dropped.map((field) => \`### \${field}
\${fields[field]}\`).join(\`

\`)) : null;
  window.open(request.url, "_blank", "noopener");
  if (!copying)
    return;
  const names = request.dropped.join(" and ");
  setAppStatus(await copying.then(() => true).catch(() => false) ? \`Report too long to prefill — \${names} copied to your clipboard. Paste into the form on GitHub.\` : \`Report too long to prefill — \${names} left out. Copy the entry from the feed and paste it into the form on GitHub.\`, "error");
};
qs("report-dialog").addEventListener("close", () => {
  if (qs("report-dialog").returnValue === "report")
    openFalsePositiveForm();
});
var copyFeedEntry = async (button) => {
  const entry = renderedFeedEntries[Number(button.dataset.logCopy)];
  if (!entry)
    return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(entry, null, 2));
    if (feedCopyResetTimer)
      clearTimeout(feedCopyResetTimer);
    resetFeedCopy();
    button.classList.add("copied");
    button.innerHTML = rawCopyIcons.check;
    button.setAttribute("aria-label", "Copied log entry");
    feedCopyResetTimer = setTimeout(resetFeedCopy, 2000);
  } catch {
    setAppStatus("Copy failed", "error");
  }
};
var copyRawToClipboard = async () => {
  qs("raw-copy").disabled = true;
  try {
    await navigator.clipboard.writeText(qs("raw").value);
    setRawCopyCopied(true);
    if (rawCopyResetTimer)
      clearTimeout(rawCopyResetTimer);
    rawCopyResetTimer = setTimeout(() => setRawCopyCopied(false), 2000);
  } catch (error) {
    setAppStatus("Copy failed", "error");
    setDetailStatus(\`Error: Could not copy Raw JSON: \${error instanceof Error ? error.message : String(error)}\`, "error");
  } finally {
    qs("raw-copy").disabled = false;
  }
};
var formatStarCount = (count) => {
  if (typeof count !== "number")
    return "";
  if (count >= 1000)
    return \`\${(count / 1000).toFixed(1).replace(/\\.0$/, "")}k\`;
  return String(count);
};
var starCountHtml = (count) => {
  const formatted = formatStarCount(count);
  return formatted ? \`<span class="star-count">\${escapeHtml(formatted)}</span>\` : "";
};
var hideStarCta = () => {
  qs("star-row").hidden = true;
  qs("star-slot").innerHTML = "";
};
var renderStarPitch = (context, starred = false) => {
  const evidence = context.blockedTotal > 0 ? \`CC Safety Net has blocked <strong>\${escapeHtml(context.blockedTotal.toLocaleString("en-US"))}</strong> risky command\${context.blockedTotal === 1 ? "" : "s"} on this machine in its retained \${escapeHtml(dayCount(retentionDays()))} history.\` : "";
  if (starred) {
    qs("star-pitch-text").innerHTML = evidence;
    return;
  }
  qs("star-pitch-text").innerHTML = evidence ? \`\${evidence} If it saved your work, star it on GitHub.\` : "If CC Safety Net is useful to you, star it on GitHub.";
};
var renderStarLink = (context, href = fallbackRepoUrl) => {
  qs("star-slot").innerHTML = \`<a class="star-cta" href="\${escapeHtml(href)}" target="_blank" rel="noopener" aria-label="Star CC Safety Net on GitHub (opens github.com)">
      <span class="star-icon" aria-hidden="true">\${starIcons.outline}</span>
      <span class="star-label">Star on GitHub</span>
      \${starCountHtml(context.starCount)}
    </a>\`;
  qs("star-row").hidden = false;
};
var renderStarCta = (context) => {
  activeStarContext = context;
  if (context.starred === true) {
    hideStarCta();
    return;
  }
  renderStarPitch(context);
  qs("star-mechanism").hidden = context.starred !== false;
  if (context.starred === null) {
    renderStarLink(context);
    return;
  }
  qs("star-slot").innerHTML = \`<button type="button" class="star-cta" aria-label="Star CC Safety Net on GitHub. One click via your GitHub CLI.">
      <span class="star-icon" aria-hidden="true">\${starIcons.outline}</span>
      <span class="star-label">Star on GitHub</span>
      \${starCountHtml(context.starCount)}
    </button>\`;
  qs("star-row").hidden = false;
};
var starRepo = async (button) => {
  button.disabled = true;
  const result = await requestJson("/api/star", { method: "POST" });
  if (result.ok && result.data?.ok === true) {
    const icon = button.querySelector(".star-icon");
    const label = button.querySelector(".star-label");
    if (icon)
      icon.innerHTML = starIcons.filled;
    if (label)
      label.textContent = "Starred. Thank you.";
    button.setAttribute("aria-label", "CC Safety Net starred on GitHub");
    button.classList.add("starred");
    qs("star-mechanism").hidden = true;
    renderStarPitch(activeStarContext, true);
    setAppStatus("Starred on GitHub", "ok");
    setDetailStatus("");
    return;
  }
  qs("star-mechanism").hidden = true;
  renderStarLink(activeStarContext, result.data?.fallbackUrl ?? fallbackRepoUrl);
};
var loadStarContext = async () => {
  const result = await requestJson("/api/star/context");
  renderStarCta(result.ok && result.data ? result.data : { starred: null, starCount: null, blockedTotal: 0 });
};
var syncRawFromForm = () => {
  if (state?.errors.length)
    return;
  qs("raw").value = formatPolicy(projectDraft ? collectProjectProposal(markedFields, draftPolicy) : collectFormPolicy());
  updateRawSource();
};
var updateDirtyStatus = () => {
  if (!state || state.errors.length)
    return;
  if (projectDraft) {
    dirty = JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== projectDraft.snapshot;
    qs("policy-savebar").hidden = !dirty;
    qs("dirty-chip").hidden = !dirty || currentView() === "policy";
    setDetailStatus("");
    updateActions();
    return;
  }
  const draftJson = JSON.stringify(collectFormPolicy());
  dirty = draftJson !== JSON.stringify(state.policy);
  qs("policy-savebar").hidden = !dirty;
  qs("dirty-chip").hidden = !dirty || currentView() === "policy";
  if (dirty)
    sessionStorage.setItem("cc-safety-net-draft", draftJson);
  if (!dirty)
    sessionStorage.removeItem("cc-safety-net-draft");
  setDetailStatus("");
  updateActions();
};
var createPathList = (prefix, config) => {
  const setHint = (text) => {
    qs(\`\${prefix}-hint\`).textContent = text;
    qs(\`\${prefix}-hint\`).hidden = !text;
  };
  const render = () => {
    const paths = config.getPaths();
    const disabled = config.isDisabled();
    qs(\`\${prefix}-count\`).textContent = \`\${paths.length} path\${paths.length === 1 ? "" : "s"}\`;
    qs(\`\${prefix}-input\`).disabled = disabled;
    qs(\`\${prefix}-add-button\`).disabled = disabled;
    qs(\`\${prefix}-list\`).innerHTML = paths.length === 0 ? \`<li class="empty">No \${config.itemLabel}s configured.</li>\` : paths.map((path, index) => \`<li class="path-item \${disabled ? "row-disabled" : ""}">
          <code>\${escapeHtml(path)}</code>
          <button type="button" class="icon-button" data-path-list="\${prefix}" data-path-remove="\${index}" \${disabled ? "disabled" : ""} aria-label="Remove \${config.itemLabel} \${escapeHtml(path)}">\${pathListIcons.remove}</button>
        </li>\`).join("");
  };
  const claimForProject = () => {
    if (!projectDraft || markedFields.has(config.field))
      return;
    markedFields.add(config.field);
    config.setPaths([]);
    syncProjectChips();
  };
  let adding = false;
  const add = async (value) => {
    if (adding)
      return;
    const entries = [...new Set(pathLines(value))];
    if (entries.length === 0)
      return;
    const scope = projectDraft;
    const claimed = projectDraft !== null && !markedFields.has(config.field);
    const previousPaths = config.getPaths();
    claimForProject();
    const submitted = qs(\`\${prefix}-input\`).value;
    const additions = entries.filter((entry) => !config.getPaths().includes(entry));
    if (additions.length) {
      adding = true;
      try {
        const error = await config.validateAdditions([...config.getPaths(), ...additions]);
        if (projectDraft !== scope)
          return;
        if (error) {
          setHint(\`Not added: \${additions.join(", ")} — \${error}\`);
          if (claimed) {
            markedFields.delete(config.field);
            config.setPaths(previousPaths);
            syncProjectChips();
          }
          return;
        }
      } finally {
        adding = false;
      }
    }
    const current = config.getPaths();
    const duplicates = entries.filter((entry) => current.includes(entry));
    config.setPaths([...current, ...additions.filter((entry) => !current.includes(entry))]);
    if (qs(\`\${prefix}-input\`).value === submitted)
      qs(\`\${prefix}-input\`).value = "";
    setHint(duplicates.length ? \`Already listed: \${duplicates.join(", ")}\` : "");
    render();
    syncRawFromForm();
    updateDirtyStatus();
    qs(\`\${prefix}-input\`).focus();
  };
  const remove = (index) => {
    claimForProject();
    config.setPaths(config.getPaths().filter((_, position) => position !== index));
    setHint("");
    render();
    syncRawFromForm();
    updateDirtyStatus();
  };
  return { render, add, remove };
};
var validatePathAdditions = async (patch) => {
  const candidate = collectFormPolicy();
  patch(candidate);
  const result = await requestPolicyPreview(candidate);
  if (result.ok && result.data?.preview)
    return null;
  return errorText(result);
};
var pathLists = {
  "deny-paths": createPathList("deny-paths", {
    field: "secret_protection.deny_paths",
    getPaths: () => draftPolicy.secret_protection.deny_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.deny_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    itemLabel: "deny path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.secret_protection = { ...candidate.secret_protection, deny_paths: paths };
    })
  }),
  "secret-allow-paths": createPathList("secret-allow-paths", {
    field: "secret_protection.allow_paths",
    getPaths: () => draftPolicy.secret_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.secret_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.secret_protection.enabled,
    itemLabel: "allow path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.secret_protection = { ...candidate.secret_protection, allow_paths: paths };
    })
  }),
  "allow-paths": createPathList("allow-paths", {
    field: "destructive_command_protection.allow_paths",
    getPaths: () => draftPolicy.destructive_command_protection.allow_paths,
    setPaths: (paths) => {
      draftPolicy.destructive_command_protection.allow_paths = paths;
    },
    isDisabled: () => !draftPolicy.destructive_command_protection.enabled,
    itemLabel: "allow path",
    validateAdditions: (paths) => validatePathAdditions((candidate) => {
      candidate.destructive_command_protection = {
        ...candidate.destructive_command_protection,
        allow_paths: paths
      };
    })
  })
};
var pathListFor = (name) => name === "deny-paths" || name === "allow-paths" || name === "secret-allow-paths" ? pathLists[name] : null;
var secretRuleIsActive = (rule, overrides) => overrides[rule.id] ? overrides[rule.id] === "on" : !rule.defaultOff;
var markProjectOverride = (section, ruleId) => {
  if (!projectDraft)
    return;
  markedFields.add(\`\${section}.overrides.\${ruleId}\`);
};
var clearProjectOverrideMarks = (section) => {
  markedFields = new Set([...markedFields].filter((field) => !field.startsWith(\`\${section}.overrides.\`)));
};
var setSecretOverride = (rule, active) => {
  if (!projectDraft && active === !rule.defaultOff) {
    delete draftPolicy.secret_protection.overrides[rule.id];
    return;
  }
  draftPolicy.secret_protection.overrides[rule.id] = active ? "on" : "off";
  markProjectOverride("secret_protection", rule.id);
};
var setDestructiveOverride = (ruleId, active, inheritedEnabled) => {
  if (!projectDraft && active === inheritedEnabled) {
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    return;
  }
  draftPolicy.destructive_command_protection.overrides[ruleId] = active ? "on" : "off";
  markProjectOverride("destructive_command_protection", ruleId);
};
var groupRules = (rules) => rules.reduce((groups, rule) => {
  const group = groups.find((item) => item.category === rule.category);
  if (group) {
    group.rules.push(rule);
    return groups;
  }
  groups.push({ category: rule.category, rules: [rule] });
  return groups;
}, []);
var renderSecretPatterns = () => {
  if (!state)
    return;
  const loaded = state;
  const query = qs("policy-search").value.trim().toLowerCase();
  const rules = state.secretPatterns.filter((rule) => [rule.category, rule.label, rule.id, rule.description, ...rule.paths ?? []].join(" ").toLowerCase().includes(query));
  const overrides = draftPolicy.secret_protection.overrides;
  const disabled = !draftPolicy.secret_protection.enabled;
  const disabledCount = state.secretPatterns.filter((rule) => !secretRuleIsActive(rule, overrides)).length;
  qs("secret-summary").textContent = disabled ? "Protection disabled. Saved rule settings and deny paths are preserved." : \`\${state.secretPatterns.length - disabledCount} active, \${disabledCount} disabled\`;
  qs("secret-patterns").innerHTML = rules.length === 0 ? '<p class="empty">No secret protections match the search.</p>' : groupRules(rules).map((group) => {
    const expanded = secretGroupExpanded.get(group.category) || searchActive && !searchCollapsedSecretGroups.has(group.category);
    const contentId = \`secret-group-\${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}\`;
    const allGroupRules = loaded.secretPatterns.filter((rule) => rule.category === group.category);
    const onCount = disabled ? 0 : allGroupRules.filter((rule) => secretRuleIsActive(rule, overrides)).length;
    return \`
      <section class="rule-tier">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-secret-group-toggle="\${escapeHtml(group.category)}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>\${escapeHtml(group.category)}</strong></span>
            <span class="tier-counts">\${tierCountHtml([
      [onCount, "on"],
      [allGroupRules.length - onCount, "off", "off"]
    ])}</span>
          </button>
          <input type="checkbox" class="tier-switch" data-secret-group-active="\${escapeHtml(group.category)}" \${checkbox(allGroupRules.some((rule) => secretRuleIsActive(rule, overrides)))} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`All \${group.category} protections\`)}">
        </div>
        <div id="\${contentId}" class="tier-content" \${expanded ? "" : "hidden"}>
        <div class="grid">\${group.rules.map((rule) => {
      const active = secretRuleIsActive(rule, overrides);
      const ruleState = active && !disabled ? { label: "Active", className: "state-active" } : { label: "Disabled", className: "state-disabled" };
      const control = \`<input type="checkbox" data-secret-active="\${escapeHtml(rule.id)}" \${checkbox(active)} \${disabled ? "disabled" : ""}>
            <span>
              <strong>\${escapeHtml(rule.label)}</strong>
              <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
              <small><span class="\${ruleState.className}">\${ruleState.label}</span> \${escapeHtml(rule.description ?? "")}</small>
            </span>\`;
      const chip = projectFieldChip(\`secret_protection.overrides.\${rule.id}\`, true);
      if (!rule.paths) {
        return \`<label class="row \${disabled ? "row-disabled" : ""}">\${control}\${chip}</label>\`;
      }
      return \`<div class="row rule-row \${disabled ? "row-disabled" : ""}">
            <label class="rule-control">\${control}</label>
            <button type="button" class="rule-example-button" data-secret-paths="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show protected paths for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
            \${chip}
          </div>\`;
    }).join("")}</div>
        </div>
      </section>
    \`;
  }).join("");
};
var presetName = () => safetyLevels[draftPolicy.safety.level][0];
var renderPresetStatus = () => {
  if (!preview)
    return;
  const customized = preview.counts.effectiveCustomizations > 0 || Object.entries(draftPolicy.safety.overrides).some(([key, value]) => value !== SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level][key]);
  qs("safety-preset-status").textContent = customized ? \`\${presetName()} · Customized\` : "";
  qs("safety-preset-status").classList.toggle("customized", customized);
};
var renderSafety = () => {
  const environmentSources = preview ? [
    ...new Set(Object.values(preview.capabilities).filter((capability) => capability.source === "environment").flatMap((capability) => capability.sources.filter((source) => source.startsWith("env "))))
  ] : [];
  qs("environment-overrides").hidden = environmentSources.length === 0;
  qs("environment-overrides").textContent = environmentSources.length ? \`Environment-raised protection: \${environmentSources.join(", ")}\` : "";
  qs("safety-level").innerHTML = projectFieldLine("safety.level") + Object.entries(safetyLevels).map(([level, meta]) => \`<label class="row preset-\${level}"><input type="radio" name="safety-level" value="\${level}" \${checkbox(draftPolicy.safety.level === level)}><span><strong>\${meta[0]}</strong><small>\${meta[1]}</small></span></label>\`).join("");
  const inherited = SAFETY_LEVEL_CAPABILITIES[draftPolicy.safety.level];
  qs("safety-overrides").innerHTML = Object.entries(safetyOverrides).map(([key, meta]) => {
    const value = draftPolicy.safety.overrides[key];
    const inheritedText = inherited[key] ? "on" : "off";
    return \`<label class="row safety-override-row"><span><strong>\${meta[0]}</strong><small>\${meta[1]}</small></span><select data-safety-override="\${key}">
      <option value="inherit" \${value === undefined ? "selected" : ""}>Inherit from preset (\${inheritedText})</option>
      <option value="true" \${value === true ? "selected" : ""}>Force on</option>
      <option value="false" \${value === false ? "selected" : ""}>Force off</option>
    </select>\${projectFieldChip(\`safety.overrides.\${key}\`, true)}</label>\`;
  }).join("");
  qs("workflow").innerHTML = \`<label class="row"><input type="checkbox" data-workflow-worktree \${checkbox(draftPolicy.workflow.worktree_mode)}><span><strong>Allow discarding local changes in linked git worktrees</strong><small>Only relaxes linked worktree discard checks.</small></span>\${projectFieldChip("workflow.worktree_mode")}</label>\`;
  renderPresetStatus();
};
var tierForRule = (rule) => {
  if (!rule.activationCapability)
    return "normal";
  return rule.activationCapability === "fail_closed" ? "strict" : "paranoid";
};
var tierMeta = {
  normal: ["Available in every preset", "No additional capability required"],
  strict: ["Strict tier", "Inherits from Fail closed"],
  paranoid: ["Paranoid tier", "Inherits from Paranoid rm or Paranoid interpreters"]
};
var ruleStateText = (rule, effective, capabilities) => {
  const capability = rule.activationCapability;
  if (effective.source === "master_disabled")
    return "Off — destructive-command protection disabled";
  if (effective.source === "rule_override")
    return \`\${effective.enabled ? "On" : "Off"} — user rule override\`;
  if (effective.source === "built_in_default")
    return "On — available in every preset";
  if (effective.source === "environment") {
    const sources = capability ? capabilities[capability]?.sources ?? [] : [];
    const source = [...sources].reverse().find((item) => item.startsWith("env "));
    return \`\${effective.enabled ? "On" : "Off"} — environment\${source ? \`; \${source.slice(4)}\` : ""}\`;
  }
  if (effective.source === "capability_override" && capability) {
    return \`\${effective.enabled ? "On" : "Off"} — capability override; \${safetyOverrides[capability][0]} forced \${effective.enabled ? "on" : "off"}\`;
  }
  if (effective.enabled)
    return \`On — \${presetName()} preset\`;
  return \`Off — \${presetName()} preset; requires \${tierForRule(rule) === "strict" ? "Strict" : "Paranoid"}\`;
};
var showRulePopover = (button, label, title, body) => {
  const popover = qs("rule-example-popover");
  qs("rule-example-label").textContent = label;
  qs("rule-example-title").textContent = title;
  qs("rule-example-command").textContent = body;
  if (!popover.matches(":popover-open"))
    popover.showPopover();
  const buttonRect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const gap = 8;
  const edge = 12;
  const below = buttonRect.bottom + gap;
  const top = below + popoverRect.height <= window.innerHeight - edge ? below : Math.max(edge, buttonRect.top - gap - popoverRect.height);
  const left = Math.min(window.innerWidth - popoverRect.width - edge, Math.max(edge, buttonRect.right - popoverRect.width));
  popover.style.top = \`\${top}px\`;
  popover.style.left = \`\${left}px\`;
};
var openRuleExample = (button) => {
  const rule = state?.destructiveCommandRules.find((item) => item.id === button.dataset.ruleExample);
  if (!rule)
    return;
  showRulePopover(button, "Blocked command example", rule.label, rule.example);
};
var openSecretPaths = (button) => {
  const rule = state?.secretPatterns.find((item) => item.id === button.dataset.secretPaths);
  if (!rule?.paths)
    return;
  showRulePopover(button, "Protected paths", rule.label, rule.paths.join(\`
\`));
};
var renderDestructiveCommands = () => {
  if (!state || !preview)
    return;
  const loaded = state;
  const effectiveState = preview;
  const query = qs("policy-search").value.trim().toLowerCase();
  const matchingRules = state.destructiveCommandRules.filter((rule) => [rule.category, rule.label, rule.id, rule.description, tierMeta[tierForRule(rule)][0]].join(" ").toLowerCase().includes(query));
  qs("destructive-command-summary").textContent = draftPolicy.destructive_command_protection.enabled ? \`\${preview.counts.enabled} active, \${preview.counts.disabled} disabled\` : "Configurable protection disabled. Catastrophic protections remain active; saved rule settings and allow paths are preserved.";
  const enforcedRules = matchingRules.filter((rule) => rule.catastrophic);
  const configurableRules = matchingRules.filter((rule) => !rule.catastrophic);
  const enforcedExpanded = tierExpanded.get("enforced") || searchActive && !searchCollapsedTiers.has("enforced");
  const enforcedSection = enforcedRules.length === 0 ? "" : \`<section class="rule-tier rule-tier-enforced">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-tier-toggle="enforced" aria-expanded="\${enforcedExpanded}" aria-controls="destructive-tier-enforced">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>Always enforced</strong><small>Cannot be disabled by any preset, rule override, or allow path</small></span>
            <span class="tier-counts">\${enforcedRules.length} protection\${enforcedRules.length === 1 ? "" : "s"}</span>
          </button>
        </div>
        <div id="destructive-tier-enforced" class="tier-content" \${enforcedExpanded ? "" : "hidden"}>
          \${groupRules(enforcedRules).map((group) => \`<section class="destructive-command-group">
            <h3>\${escapeHtml(group.category)}</h3>
            <div class="grid">\${group.rules.map((rule) => \`<div class="row rule-row">
                <span class="rule-control">
                  <span>
                    <strong>\${escapeHtml(rule.label)}</strong>
                    <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
                    <small><span class="state-active">Always enforced</span> \${escapeHtml(rule.description)}</small>
                  </span>
                </span>
                <button type="button" class="rule-example-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show blocked example for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
              </div>\`).join("")}</div>
          </section>\`).join("")}
        </div>
      </section>\`;
  qs("destructive-command-rules").innerHTML = matchingRules.length === 0 ? '<p class="empty">No built-in protections match the search.</p>' : enforcedSection + Object.keys(tierMeta).map((tier) => {
    const rules = configurableRules.filter((rule) => tierForRule(rule) === tier);
    if (rules.length === 0)
      return "";
    const allTierRules = loaded.destructiveCommandRules.filter((rule) => !rule.catastrophic && tierForRule(rule) === tier);
    const tierStates = allTierRules.flatMap((rule) => effectiveState.rules[rule.id] ?? []);
    const expanded = tierExpanded.get(tier) || searchActive && !searchCollapsedTiers.has(tier);
    const contentId = \`destructive-tier-\${tier}\`;
    return \`<section class="rule-tier rule-tier-\${tier}">
        <div class="rule-tier-head">
          <button type="button" class="tier-collapse" data-tier-toggle="\${tier}" aria-expanded="\${expanded}" aria-controls="\${contentId}">
            <span class="panel-chevron" aria-hidden="true"></span>
            <span class="tier-label"><strong>\${tierMeta[tier][0]}</strong><small>\${tierMeta[tier][1]}</small></span>
            <span class="tier-counts">\${tierCountHtml([
      [tierStates.filter((item) => item.enabled).length, "on"],
      [tierStates.filter((item) => !item.enabled).length, "off", "off"]
    ])}</span>
          </button>
          <input type="checkbox" class="tier-switch" data-destructive-tier-active="\${tier}" \${checkbox(tierStates.some((item) => item.enabled))} \${!draftPolicy.destructive_command_protection.enabled ? "disabled" : ""} aria-label="\${escapeHtml(\`All \${tierMeta[tier][0]} protections\`)}">
        </div>
        <div id="\${contentId}" class="tier-content" \${expanded ? "" : "hidden"}>
          \${groupRules(rules).map((group) => \`<section class="destructive-command-group">
            <h3>\${escapeHtml(group.category)}</h3>
            <div class="grid">\${group.rules.map((rule) => {
      const effective = effectiveState.rules[rule.id];
      if (!effective)
        return "";
      const override = draftPolicy.destructive_command_protection.overrides[rule.id];
      const status = ruleStateText(rule, effective, effectiveState.capabilities);
      const disabled = !draftPolicy.destructive_command_protection.enabled;
      return \`<div class="row rule-row \${disabled ? "row-disabled" : ""}">
                <label class="rule-control">
                  <input type="checkbox" data-destructive-command-active="\${escapeHtml(rule.id)}" \${checkbox(effective.enabled)} \${disabled ? "disabled" : ""} aria-label="\${escapeHtml(\`\${rule.label}: \${status}\`)}">
                  <span>
                    <strong>\${escapeHtml(rule.label)}</strong>
                    <button type="button" class="rule-id" data-rule-activity="\${escapeHtml(rule.id)}" title="Show recent blocks in Activity">\${escapeHtml(rule.id)}</button>
                    <small><span class="\${effective.enabled ? "state-active" : "state-disabled"}">\${escapeHtml(status)}</span> \${escapeHtml(rule.description)}</small>
                  </span>
                </label>
                <button type="button" class="rule-example-button" data-rule-example="\${escapeHtml(rule.id)}" aria-label="\${escapeHtml(\`Show blocked example for \${rule.label}\`)}" aria-haspopup="dialog" aria-controls="rule-example-popover">?</button>
                \${override && !effective.changesInherited ? \`<button type="button" class="inherit-button" data-use-inherited="\${escapeHtml(rule.id)}">Use inherited setting</button>\` : ""}
                \${projectFieldChip(\`destructive_command_protection.overrides.\${rule.id}\`, true)}
              </div>\`;
    }).join("")}</div>
          </section>\`).join("")}
        </div>
      </section>\`;
  }).join("");
};
var refreshPolicyPreview = async () => {
  const requestId = ++previewRequestId;
  const result = await requestPolicyPreview(effectivePreviewPolicy(collectFormPolicy(), projectDraft?.baseline ?? null));
  if (requestId !== previewRequestId)
    return false;
  if (!result.ok || !result.data?.preview) {
    setAppStatus("Preview failed", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return false;
  }
  preview = result.data.preview;
  renderProtectionCard();
  renderSafety();
  renderDestructiveCommands();
  runCommandTest();
  return true;
};
var testerRequestId = 0;
var runCommandTest = async () => {
  const command = qs("tester-input").value.trim();
  if (!command) {
    qs("tester-result").hidden = true;
    return;
  }
  const requestId = ++testerRequestId;
  const result = await requestJson("/api/policy/explain", {
    method: "POST",
    body: JSON.stringify({
      command,
      policy: effectivePreviewPolicy(collectFormPolicy(), projectDraft?.baseline ?? null)
    })
  });
  if (requestId !== testerRequestId)
    return;
  const el = qs("tester-result");
  el.hidden = false;
  if (!result.ok) {
    el.className = "status error";
    el.textContent = \`Could not evaluate: \${errorText(result)}\`;
    return;
  }
  if (result.data.result === "allowed") {
    el.className = "status ok";
    el.innerHTML = \`Allowed — no rule blocks this command under the current draft policy. <button type="button" class="feed-toggle" data-create-rule="\${escapeHtml(command)}">Create a rule for this</button>\`;
    return;
  }
  const ruleId = result.data.customRule?.id ?? result.data.ruleId;
  const ruleIdHtml = result.data.customRule ? \`<button type="button" class="rule-id" data-jump-custom-rule="\${escapeHtml(ruleId)}" title="Show this rule in Rules">\${escapeHtml(ruleId)}</button>\` : \`<code class="rule-id">\${escapeHtml(ruleId)}</code>\`;
  const segment = result.data.segment && result.data.segment !== command ? \`<div class="tester-segment">Segment: <code>\${escapeHtml(result.data.segment)}</code></div>\` : "";
  el.className = "status error";
  el.innerHTML = \`Blocked\${ruleId ? \` by \${ruleIdHtml}\` : ""} — \${escapeHtml(result.data.reason || "")}\${segment}\`;
};
function render() {
  if (!state)
    return;
  draftPolicy = clonePolicy(state.policy);
  preview = state.preview;
  knownRuleIds = new Set([...state.destructiveCommandRules, ...state.secretPatterns].map((rule) => rule.id));
  dirty = false;
  qs("policy-savebar").hidden = true;
  qs("dirty-chip").hidden = true;
  qs("policy-path").textContent = state.path + (state.exists ? "" : " (not created yet)");
  const projectPolicy = state.projectPolicy;
  qs("project-policy-row").hidden = !projectPolicy;
  qs("project-policy-path").textContent = projectPolicy?.path ?? "";
  qs("project-policy-notice").hidden = !projectPolicy || projectPolicy.weakenings.length === 0;
  qs("project-policy-notice").textContent = projectPolicy ? ["Merged on top of this file:", ...projectPolicy.weakenings].join(\`
\`) : "";
  qs("app-version").textContent = state.version;
  renderSafety();
  qs("destructive-command").innerHTML = '<label class="row master"><input type="checkbox" data-destructive-command-enabled ' + checkbox(state.policy.destructive_command_protection.enabled) + '><span><strong>Destructive command protection</strong><small>Block configurable destructive git, filesystem, and execution patterns. Catastrophic and custom rules remain active when disabled.</small></span><span class="master-badge">' + (state.policy.destructive_command_protection.enabled ? "On" : "Off") + '</span><span class="project-chip-slot" id="destructive-enabled-chip"></span></label>' + '<div id="destructive-command-rules"></div>' + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="allow-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="allow-paths-label">Allow paths</strong><small>Recursive deletes targeting these paths are not blocked, like /tmp. The home directory, or any path containing it, is rejected.</small></span><span class="tier-counts" id="allow-paths-count"></span></button>' + '<div class="tier-content paths-content" id="allow-paths-content" hidden>' + '<p class="muted">Use an absolute path or a ~/ path. Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="allow-paths-input" data-path-input="allow-paths" autocomplete="off" spellcheck="false" placeholder="/absolute/path or ~/path" aria-labelledby="allow-paths-label"><button type="button" class="icon-button" id="allow-paths-add-button" data-path-add="allow-paths" aria-label="Add allow path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="allow-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="allow-paths-chip"></span>' + '<ul class="paths-list" id="allow-paths-list"></ul>' + "</div></section>";
  qs("secret").innerHTML = '<label class="row master"><input type="checkbox" id="secret-enabled" ' + checkbox(state.policy.secret_protection.enabled) + '><span><strong>Secret protection</strong><small>Block default sensitive paths, coding CLI credential locations, and configured deny paths.</small></span><span class="master-badge">' + (state.policy.secret_protection.enabled ? "On" : "Off") + '</span><span class="project-chip-slot" id="secret-enabled-chip"></span></label>' + '<div id="secret-patterns"></div>' + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="deny-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="deny-paths-label">Deny paths</strong><small>Configured paths and everything inside them are blocked while Secret protection is on.</small></span><span class="tier-counts" id="deny-paths-count"></span></button>' + '<div class="tier-content paths-content" id="deny-paths-content" hidden>' + '<p class="muted">Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="deny-paths-input" data-path-input="deny-paths" autocomplete="off" spellcheck="false" placeholder="path/to/protect" aria-labelledby="deny-paths-label"><button type="button" class="icon-button" id="deny-paths-add-button" data-path-add="deny-paths" aria-label="Add deny path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="deny-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="deny-paths-chip"></span>' + '<ul class="paths-list" id="deny-paths-list"></ul>' + "</div></section>" + '<section class="rule-tier">' + '<button type="button" class="rule-tier-head" aria-expanded="false" aria-controls="secret-allow-paths-content"><span class="panel-chevron" aria-hidden="true"></span><span class="tier-label"><strong id="secret-allow-paths-label">Allow paths</strong><small>Configured files and subtrees are exempt from the pattern rules. Deny paths and coding CLI protections still apply. Entries covering the home directory are rejected, and glob patterns are not supported.</small></span><span class="tier-counts" id="secret-allow-paths-count"></span></button>' + '<div class="tier-content paths-content" id="secret-allow-paths-content" hidden>' + '<p class="muted">Paste multiple lines to add several paths at once.</p>' + '<div class="paths-add"><input type="text" id="secret-allow-paths-input" data-path-input="secret-allow-paths" autocomplete="off" spellcheck="false" placeholder="~/project/.env.test or ~/project/fixtures" aria-labelledby="secret-allow-paths-label"><button type="button" class="icon-button" id="secret-allow-paths-add-button" data-path-add="secret-allow-paths" aria-label="Add allow path">' + pathListIcons.add + "</button></div>" + '<p class="paths-hint" id="secret-allow-paths-hint" hidden></p>' + '<span class="project-chip-slot" id="secret-allow-paths-chip"></span>' + '<ul class="paths-list" id="secret-allow-paths-list"></ul>' + "</div></section>";
  qs("raw").value = state.errors.length ? state.raw : formatPolicy(draftPolicy);
  qs("policy-search").value = "";
  syncSearchState();
  renderDestructiveCommands();
  renderSecretPatterns();
  pathLists["deny-paths"].render();
  pathLists["secret-allow-paths"].render();
  pathLists["allow-paths"].render();
  syncProjectChips();
  updateRawSource();
  renderRetention(state);
  qs("recovery").hidden = state.errors.length === 0;
  updateActions();
  renderProtectionCard();
  if (state.errors.length) {
    if (currentView() !== "policy")
      location.hash = "policy";
    setAppStatus("Repair required", "error");
    setDetailStatus(\`Error: \${state.errors.join(\`
\`)}\`, "error");
    return;
  }
  setAppStatus("");
  setDetailStatus("");
}
var restoreDraft = () => {
  if (!state || state.errors.length)
    return;
  const stored = sessionStorage.getItem("cc-safety-net-draft");
  if (!stored)
    return;
  const parsed = (() => {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  })();
  const isRecordField = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
  const isOptionalPathList = (value) => value === undefined || Array.isArray(value) && value.every((item) => typeof item === "string");
  const isPolicyShape = isRecordField(parsed) && isRecordField(parsed.safety) && typeof parsed.safety.level === "string" && Object.hasOwn(safetyLevels, parsed.safety.level) && isRecordField(parsed.safety.overrides) && isRecordField(parsed.workflow) && isRecordField(parsed.destructive_command_protection) && isRecordField(parsed.destructive_command_protection.overrides) && isOptionalPathList(parsed.destructive_command_protection.allow_paths) && isRecordField(parsed.secret_protection) && isRecordField(parsed.secret_protection.overrides) && isOptionalPathList(parsed.secret_protection.deny_paths) && isOptionalPathList(parsed.secret_protection.allow_paths) && isRecordField(parsed.audit);
  if (!isPolicyShape || stored === JSON.stringify(state.policy)) {
    sessionStorage.removeItem("cc-safety-net-draft");
    return;
  }
  const draft = parsed;
  draft.destructive_command_protection.allow_paths ??= [];
  draft.secret_protection.deny_paths ??= [];
  draft.secret_protection.allow_paths ??= [];
  draftPolicy = draft;
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus("Restored unsaved draft", "ok");
};
function renderPolicySections() {
  const masterToggle = document.querySelector("[data-destructive-command-enabled]");
  if (masterToggle)
    masterToggle.checked = draftPolicy.destructive_command_protection.enabled;
  qs("secret-enabled").checked = draftPolicy.secret_protection.enabled;
  syncMasterBadges();
  renderSafety();
  renderDestructiveCommands();
  renderSecretPatterns();
  pathLists["deny-paths"].render();
  pathLists["secret-allow-paths"].render();
  pathLists["allow-paths"].render();
  syncProjectChips();
  syncRawFromForm();
  updateDirtyStatus();
}
async function load() {
  const result = await requestJson("/api/policy");
  if (!result.ok || !result.data) {
    setAppStatus("Load failed", "error");
    setDetailStatus(\`Error: Could not load policy: \${errorText(result)}\`, "error");
    return false;
  }
  state = result.data;
  render();
  restoreDraft();
  return true;
}
var targetInput = (event) => event.target instanceof HTMLInputElement ? event.target : null;
var targetElement = (event) => event.target instanceof Element ? event.target : null;
document.addEventListener("input", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  if (input.id === "policy-search") {
    syncSearchState();
    renderDestructiveCommands();
    renderSecretPatterns();
    return;
  }
  if (input.id === "activity-search" && activity) {
    if (clearCommandFilter())
      renderActivityControls();
    activityFilters.query = input.value.trim().toLowerCase();
    clearTimeout(activityQueryTimer);
    activityQueryTimer = setTimeout(renderActivityFeed, 120);
  }
});
document.addEventListener("keydown", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  if (input.id === "tester-input" && event.key === "Enter") {
    event.preventDefault();
    runCommandTest();
    return;
  }
  const list = pathListFor(input.dataset.pathInput);
  if (!list || event.key !== "Enter")
    return;
  event.preventDefault();
  list.add(input.value);
});
document.addEventListener("paste", (event) => {
  const input = targetInput(event);
  if (!input)
    return;
  const list = pathListFor(input.dataset.pathInput);
  if (!list)
    return;
  const text = event.clipboardData?.getData("text") ?? "";
  if (!text.includes(\`
\`))
    return;
  event.preventDefault();
  list.add(\`\${input.value}
\${text}\`);
});
var writePolicy = async (path, body, failureStatus) => {
  const result = await requestJson(path, { method: "POST", body });
  if (isWriteSuccess(result))
    return result;
  setAppStatus(failureStatus, "error");
  setDetailStatus(\`Error: \${errorText(result)}\`, "error");
  return null;
};
var reloadAfterWrite = async () => {
  sessionStorage.removeItem("cc-safety-net-draft");
  if (!await load())
    return false;
  dirty = false;
  setDetailStatus("");
  return true;
};
var setProjectDraftDiagnostics = (messages) => {
  qs("project-draft-diagnostics").textContent = messages.join(\`
\`);
  qs("project-draft-diagnostics").hidden = messages.length === 0;
};
var renderProjectDraftBar = () => {
  qs("project-draft-enter").hidden = projectDraft !== null;
  qs("project-draft-bar").hidden = projectDraft === null;
  qs("save").textContent = projectDraft ? "Review & apply" : "Save";
  if (!projectDraft)
    return;
  qs("project-draft-path").textContent = projectDraft.path;
  qs("project-draft-change").hidden = !projectDraft.canPickDirectory;
};
var exitProjectDraft = () => {
  projectDraft = null;
  markedFields = new Set;
  setProjectDraftDiagnostics([]);
  if (state)
    draftPolicy = clonePolicy(state.policy);
  renderProjectDraftBar();
  renderPolicySections();
};
var ingestProjectState = async (okStatus) => {
  const result = await requestJson("/api/policy/project");
  if (!result.ok || !result.data) {
    setAppStatus("Project draft unavailable", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return false;
  }
  const seeded = seedProjectDraft(result.data);
  if (!seeded) {
    exitProjectDraft();
    await load();
    setAppStatus("Repair required", "error");
    setDetailStatus([
      "Error: repair your user policy before drafting a project policy.",
      ...Array.isArray(result.data.userPolicyDiagnostics) ? result.data.userPolicyDiagnostics : []
    ].join(\`
\`), "error");
    return false;
  }
  projectDraft = {
    path: result.data.path,
    revision: result.data.revision,
    canPickDirectory: result.data.canPickDirectory === true,
    baseline: seeded.baseline,
    snapshot: seeded.snapshot
  };
  markedFields = seeded.marked;
  draftPolicy = seeded.policy;
  setProjectDraftDiagnostics(Array.isArray(result.data.projectionDiagnostics) ? result.data.projectionDiagnostics : []);
  renderProjectDraftBar();
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus(okStatus, "ok");
  return true;
};
var enterProjectDraft = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length) {
    setAppStatus("Repair required", "error");
    setDetailStatus("Error: repair your user policy before drafting a project policy.", "error");
    return;
  }
  if (dirty) {
    if (!await confirmDialog({
      title: "Discard unsaved policy changes?",
      body: "A project draft starts from your saved user policy. Save your changes first, or discard them here.",
      confirmLabel: "Discard changes",
      confirmClass: ""
    }))
      return;
    sessionStorage.removeItem("cc-safety-net-draft");
    if (!await load())
      return;
  }
  await ingestProjectState("Drafting a project policy.");
};
var confirmDiscardProjectDraft = async (body) => !dirty || await confirmDialog({
  title: "Discard this project draft?",
  body,
  confirmLabel: "Discard draft",
  confirmClass: ""
});
var changeProjectDirectory = async () => {
  if (!await confirmDiscardProjectDraft("Switching projects discards this draft."))
    return;
  const result = await requestJson("/api/policy/project/choose-directory", { method: "POST" });
  if (!result.ok) {
    setAppStatus("Could not open the folder picker", "error");
    setDetailStatus(\`Error: \${errorText(result)}\`, "error");
    return;
  }
  if (result.data.error) {
    setAppStatus(result.data.error, "error");
    return;
  }
  if (result.data.cancelled)
    return;
  await ingestProjectState("Drafting a project policy.");
};
var leaveProjectDraft = async () => {
  if (!await confirmDiscardProjectDraft("The fields you marked are not written anywhere yet."))
    return;
  exitProjectDraft();
  if (await load())
    setAppStatus("Left the project draft.", "ok");
};
var discardProjectDraft = async () => {
  const draft = projectDraft;
  if (!draft)
    return;
  if (!await confirmDialog({
    title: "Discard changes to this draft?",
    body: "The draft returns to the fields this project already sets.",
    confirmLabel: "Discard changes",
    confirmClass: ""
  }))
    return;
  const snapshot = JSON.parse(draft.snapshot);
  markedFields = new Set(projectMarkedFields(snapshot));
  draftPolicy = overlayProjectProposal(draft.baseline, snapshot);
  renderPolicySections();
  refreshPolicyPreview();
  setAppStatus("Changes discarded.", "ok");
};
var handleStaleProjectDraft = async () => {
  if (!await ingestProjectState("Project draft reloaded."))
    return;
  setAppStatus("Project target changed", "error");
  setDetailStatus("Error: the project directory changed, so this draft was reloaded for the new target. Review it again before applying.", "error");
};
var projectDiffHtml = (data) => {
  const rows = Array.isArray(data.rows) ? data.rows : [];
  const warnings = [
    ...data.existingFileDiagnostics?.length ? ["The existing project policy file is invalid and will be replaced."] : [],
    ...data.weakenings ?? []
  ];
  const table = rows.length === 0 ? '<p class="empty">No change to the effective policy.</p>' : \`<table class="diff-table"><thead><tr><th>Setting</th><th>Now</th><th>After</th></tr></thead><tbody>\${rows.map((row) => \`<tr><td><code>\${escapeHtml(row.field)}</code></td><td class="diff-before">\${escapeHtml(row.before ?? "(unset)")}</td><td class="diff-after">\${escapeHtml(row.after ?? "(unset)")}</td></tr>\`).join("")}</tbody></table>\`;
  return table + warnings.map((text) => \`<p class="diff-warning">\${escapeHtml(text)}</p>\`).join("");
};
var reviewProjectDraft = async () => {
  const draft = projectDraft;
  if (!draft)
    return;
  const proposal = collectProjectProposal(markedFields, draftPolicy);
  const serialized = JSON.stringify(proposal);
  const body = JSON.stringify({ revision: draft.revision, proposal });
  const diff = await requestJson("/api/policy/project/diff", { method: "POST", body });
  if (projectDraft !== draft)
    return;
  if (diff.status === 409) {
    await handleStaleProjectDraft();
    return;
  }
  if (!diff.ok) {
    setAppStatus("Review failed", "error");
    setDetailStatus(\`Error: \${errorText(diff)}\`, "error");
    return;
  }
  if (JSON.stringify(collectProjectProposal(markedFields, draftPolicy)) !== serialized) {
    setAppStatus("Review again", "error");
    setDetailStatus("Error: the draft changed while the review was loading. Review it again.", "error");
    return;
  }
  if (!await confirmDialog({
    title: "Apply this project policy?",
    body: "Everyone who works in this project gets these changes on top of their own user policy.",
    detail: draft.path,
    rowsHtml: projectDiffHtml(diff.data),
    confirmLabel: "Apply project policy",
    confirmClass: "primary"
  }))
    return;
  await runExclusive("Applying...", async () => {
    const applied = await requestJson("/api/policy/project/apply", { method: "POST", body });
    if (applied.status === 409) {
      await handleStaleProjectDraft();
      return;
    }
    if (!isWriteSuccess(applied)) {
      setAppStatus("Apply failed", "error");
      setDetailStatus(\`Error: \${errorText(applied)}\`, "error");
      return;
    }
    const path = applied.data.path;
    exitProjectDraft();
    if (await load())
      setAppStatus(\`Applied \${path}.\`, "ok");
  });
};
var saveRetentionDays = async (days) => {
  const saved = state;
  if (!saved)
    return;
  const current = saved.policy.audit.retention_days;
  if (!Number.isInteger(days) || days < MIN_AUDIT_RETENTION_DAYS || days > MAX_AUDIT_RETENTION_DAYS) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus(\`Error: retention must be a whole number of days from \${MIN_AUDIT_RETENTION_DAYS} to \${MAX_AUDIT_RETENTION_DAYS}.\`, "error");
    return;
  }
  if (days === current)
    return;
  if (projectDraft) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus("Error: exit or apply your project draft first.", "error");
    return;
  }
  if (dirty) {
    qs("retention-days").value = String(current);
    setAppStatus("Retention unchanged", "error");
    setDetailStatus("Error: save or discard your unsaved Policy changes first.", "error");
    return;
  }
  if (days < current && !await confirmDialog({
    title: \`Shorten retention to \${dayCount(days)}?\`,
    body: \`Audit entries older than \${dayCount(days)} are deleted on the next sweep and cannot be recovered. The Activity tab will only look back \${dayCount(days)}.\`,
    detail: overview?.logsDir ?? "",
    confirmLabel: "Shorten",
    confirmClass: "danger"
  })) {
    qs("retention-days").value = String(current);
    return;
  }
  await runExclusive("Saving...", async () => {
    const policy = clonePolicy(saved.policy);
    policy.audit.retention_days = days;
    if (!await writePolicy("/api/policy", JSON.stringify(policy), "Save failed")) {
      qs("retention-days").value = String(current);
      return;
    }
    if (!await load())
      return;
    activityFilters.days = Math.min(activityFilters.days, days);
    await Promise.all([loadOverview(), loadActivity()]);
    setAppStatus(\`Retention set to \${dayCount(days)}.\`, "ok");
    setDetailStatus("");
  });
};
document.addEventListener("change", (event) => {
  const control = event.target;
  if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement))
    return;
  if (control.id === "activity-days") {
    activityFilters.days = Number(control.value);
    loadActivity();
    return;
  }
  if (control.id === "retention-days") {
    saveRetentionDays(Number(control.value));
    return;
  }
  if (control.name === "safety-level") {
    draftPolicy.safety.level = control.value;
    markProjectField("safety.level");
    renderSafety();
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (control.dataset?.safetyOverride) {
    if (control.value === "inherit" && !projectDraft)
      delete draftPolicy.safety.overrides[control.dataset.safetyOverride];
    if (control.value === "true")
      draftPolicy.safety.overrides[control.dataset.safetyOverride] = true;
    if (control.value === "false")
      draftPolicy.safety.overrides[control.dataset.safetyOverride] = false;
    if (control.value === "inherit")
      unmarkProjectField(\`safety.overrides.\${control.dataset.safetyOverride}\`);
    if (control.value !== "inherit")
      markProjectField(\`safety.overrides.\${control.dataset.safetyOverride}\`);
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  const input = control instanceof HTMLInputElement ? control : null;
  if (!input)
    return;
  if ("workflowWorktree" in input.dataset) {
    draftPolicy.workflow.worktree_mode = input.checked;
    markProjectField("workflow.worktree_mode");
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if ("destructiveCommandEnabled" in input.dataset) {
    (async () => {
      if (!input.checked && !await confirmProtectionDisable({
        title: "Disable destructive command protection?",
        body: "Built-in destructive git, filesystem, and execution protections will stop blocking commands until you turn this back on.",
        detail: "Custom rules remain active."
      })) {
        input.checked = true;
        return;
      }
      draftPolicy.destructive_command_protection.enabled = input.checked;
      markProjectField("destructive_command_protection.enabled");
      syncMasterBadges();
      pathLists["allow-paths"].render();
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (input.dataset?.destructiveTierActive) {
    const effectiveState = preview;
    if (!effectiveState)
      return;
    state?.destructiveCommandRules.filter((rule) => !rule.catastrophic && tierForRule(rule) === input.dataset.destructiveTierActive).forEach((rule) => {
      setDestructiveOverride(rule.id, input.checked, effectiveState.rules[rule.id]?.inheritedEnabled);
    });
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (input.dataset?.destructiveCommandActive) {
    const ruleId = input.dataset.destructiveCommandActive;
    setDestructiveOverride(ruleId, input.checked, preview?.rules[ruleId]?.inheritedEnabled);
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (input.dataset?.secretGroupActive) {
    state?.secretPatterns.filter((rule) => rule.category === input.dataset.secretGroupActive).forEach((rule) => {
      setSecretOverride(rule, input.checked);
    });
    renderSecretPatterns();
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if (input.dataset?.secretActive) {
    const rule = state?.secretPatterns.find((item) => item.id === input.dataset.secretActive);
    if (!rule)
      return;
    setSecretOverride(rule, input.checked);
    renderSecretPatterns();
    syncRawFromForm();
    updateDirtyStatus();
    return;
  }
  if (input.id === "secret-enabled") {
    (async () => {
      if (!input.checked && !await confirmProtectionDisable({
        title: "Disable secret protection?",
        body: "Default sensitive paths, coding CLI credential locations, and deny paths will stop blocking access until you turn this back on."
      })) {
        input.checked = true;
        return;
      }
      draftPolicy.secret_protection.enabled = input.checked;
      markProjectField("secret_protection.enabled");
      syncMasterBadges();
      renderSecretPatterns();
      pathLists["deny-paths"].render();
      pathLists["secret-allow-paths"].render();
      syncRawFromForm();
      updateDirtyStatus();
    })();
  }
});
document.addEventListener("click", (event) => {
  const target = targetElement(event);
  if (!target)
    return;
  if (target.closest("#tester-run")) {
    runCommandTest();
    return;
  }
  if (target.closest("#project-draft-enter")) {
    enterProjectDraft();
    return;
  }
  if (target.closest("#project-draft-change")) {
    changeProjectDirectory();
    return;
  }
  if (target.closest("#project-draft-exit")) {
    leaveProjectDraft();
    return;
  }
  const unmarkButton = target.closest("[data-unmark-field]");
  if (unmarkButton) {
    unmarkProjectField(unmarkButton.dataset.unmarkField ?? "");
    return;
  }
  const createRule = target.closest("[data-create-rule]");
  if (createRule) {
    openRuleComposer(createRule.dataset.createRule ?? "");
    return;
  }
  const feedToggle = target.closest("[data-feed-toggle]");
  if (feedToggle) {
    const command = feedToggle.previousElementSibling;
    if (!command)
      return;
    const expanded = command.classList.toggle("expanded");
    feedToggle.setAttribute("aria-expanded", String(expanded));
    feedToggle.textContent = expanded ? "Show less" : "Show more";
    return;
  }
  const feedCopy = target.closest("[data-log-copy]");
  if (feedCopy) {
    copyFeedEntry(feedCopy);
    return;
  }
  const feedReport = target.closest("[data-report-fp]");
  if (feedReport) {
    openReportDialog(feedReport);
    return;
  }
  const blockFuture = target.closest("[data-block-future]");
  if (blockFuture) {
    const entry = renderedFeedEntries[Number(blockFuture.dataset.blockFuture)];
    if (entry?.segment || entry?.command)
      openRuleComposer(entry.segment || entry.command || "");
    return;
  }
  const topRule = target.closest(".top-rule");
  if (topRule) {
    const ruleId = topRule.dataset.ruleId ?? "";
    (ruleId.startsWith("custom.") ? jumpToRulesRule : jumpToActivityRule)(ruleId);
    return;
  }
  const ruleActivity = target.closest("[data-rule-activity]");
  if (ruleActivity) {
    jumpToActivityRule(ruleActivity.dataset.ruleActivity ?? "");
    return;
  }
  const jumpRule = target.closest("[data-jump-rule]");
  if (jumpRule) {
    qs("policy-search").value = jumpRule.dataset.jumpRule ?? "";
    syncSearchState();
    renderDestructiveCommands();
    renderSecretPatterns();
    location.hash = "policy";
    return;
  }
  const jumpCustom = target.closest("[data-jump-custom-rule]");
  if (jumpCustom) {
    jumpToRulesRule(jumpCustom.dataset.jumpCustomRule ?? "");
    return;
  }
  const topCommand = target.closest(".top-command");
  if (topCommand) {
    activityFilters.command = topCommand.dataset.command ?? "";
    activityFilters.decision = "deny";
    activityFilters.query = "";
    qs("activity-search").value = "";
    if (activity) {
      renderActivityControls();
      renderActivityFeed();
    }
    location.hash = "activity";
    return;
  }
  if (target.closest("[data-clear-command]")) {
    clearCommandFilter();
    renderActivityControls();
    renderActivityFeed();
    return;
  }
  if (target.closest("#guard-errors")) {
    clearCommandFilter();
    activityFilters.decision = "error";
    if (activity) {
      renderActivityControls();
      renderActivityFeed();
    }
    location.hash = "activity";
    return;
  }
  const chip = target.closest("[data-activity-chip]");
  if (chip && activity) {
    clearCommandFilter();
    activityFilters[chip.dataset.activityChip] = chip.dataset.chipValue ?? "";
    renderActivityControls();
    renderActivityFeed();
    return;
  }
  if (target.closest("#activity-refresh")) {
    refreshActivity();
    return;
  }
  if (target.closest("#integrations-refresh")) {
    refreshIntegrations();
    return;
  }
  if (target.closest("#rules-refresh")) {
    refreshRules();
    return;
  }
  const scopeChip = target.closest("[data-rules-scope]");
  if (scopeChip) {
    setRulesScope(scopeChip.dataset.rulesScope ?? "");
    return;
  }
  const exampleChip = target.closest("[data-rules-example]");
  if (exampleChip) {
    qs("rules-composer-input").value = exampleChip.dataset.rulesExample ?? "";
    return;
  }
  if (target.closest("#rules-choose-directory")) {
    chooseProjectDirectory();
    return;
  }
  if (target.closest("#rules-copy-prompt")) {
    copyRulePrompt();
    return;
  }
  const integrationButton = target.closest("[data-integration-action]");
  if (integrationButton) {
    runIntegrationAction(integrationButton);
    return;
  }
  const ruleExampleButton = target.closest("[data-rule-example]");
  if (ruleExampleButton) {
    openRuleExample(ruleExampleButton);
    return;
  }
  const secretPathsButton = target.closest("[data-secret-paths]");
  if (secretPathsButton) {
    openSecretPaths(secretPathsButton);
    return;
  }
  const tierButton = target.closest("[data-tier-toggle]");
  if (tierButton) {
    const tier = tierButton.dataset.tierToggle ?? "";
    const expanded = tierButton.getAttribute("aria-expanded") === "true";
    tierExpanded.set(tier, !expanded);
    if (searchActive && expanded)
      searchCollapsedTiers.add(tier);
    if (!expanded)
      searchCollapsedTiers.delete(tier);
    renderDestructiveCommands();
    return;
  }
  const secretGroupButton = target.closest("[data-secret-group-toggle]");
  if (secretGroupButton) {
    const category = secretGroupButton.dataset.secretGroupToggle ?? "";
    const expanded = secretGroupButton.getAttribute("aria-expanded") === "true";
    secretGroupExpanded.set(category, !expanded);
    if (searchActive && expanded)
      searchCollapsedSecretGroups.add(category);
    if (!expanded)
      searchCollapsedSecretGroups.delete(category);
    renderSecretPatterns();
    return;
  }
  if (target.closest("[data-secret-group-active], [data-destructive-tier-active]"))
    return;
  const button = target.closest(".panel-toggle, .rule-tier-head");
  if (button) {
    togglePanel(button);
    return;
  }
  const inheritedButton = target.closest("[data-use-inherited]");
  if (inheritedButton) {
    const ruleId = inheritedButton.dataset.useInherited ?? "";
    if (projectDraft) {
      unmarkProjectField(\`destructive_command_protection.overrides.\${ruleId}\`);
      return;
    }
    delete draftPolicy.destructive_command_protection.overrides[ruleId];
    syncRawFromForm();
    updateDirtyStatus();
    refreshPolicyPreview();
    return;
  }
  if (target.closest("#reset-rule-customizations")) {
    if (Object.keys(draftPolicy.destructive_command_protection.overrides).length === 0) {
      setAppStatus("No customizations to reset", "ok");
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Restore defaults?",
        body: "All built-in destructive-command rules will return to their inherited preset settings.",
        confirmLabel: "Restore defaults"
      }))
        return;
      clearProjectOverrideMarks("destructive_command_protection");
      if (projectDraft) {
        rebuildProjectDisplay();
        return;
      }
      draftPolicy.destructive_command_protection.overrides = {};
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (target.closest("#reset-secret-customizations")) {
    if (Object.keys(draftPolicy.secret_protection.overrides).length === 0) {
      setAppStatus("No customizations to reset", "ok");
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Restore defaults?",
        body: "All built-in secret rules will return to their inherited preset settings.",
        confirmLabel: "Restore defaults"
      }))
        return;
      clearProjectOverrideMarks("secret_protection");
      if (projectDraft) {
        rebuildProjectDisplay();
        return;
      }
      draftPolicy.secret_protection.overrides = {};
      renderSecretPatterns();
      syncRawFromForm();
      updateDirtyStatus();
      refreshPolicyPreview();
    })();
    return;
  }
  if (target.closest("#discard-changes")) {
    if (projectDraft) {
      discardProjectDraft();
      return;
    }
    (async () => {
      if (!await confirmDialog({
        title: "Discard unsaved changes?",
        body: "All changes since your last save will be reverted.",
        confirmLabel: "Discard changes",
        confirmClass: ""
      }))
        return;
      runExclusive("Discarding...", async () => {
        sessionStorage.removeItem("cc-safety-net-draft");
        if (await load())
          setAppStatus("Changes discarded.", "ok");
      });
    })();
    return;
  }
  const addButton = target.closest("[data-path-add]");
  if (addButton) {
    const list = pathListFor(addButton.dataset.pathAdd);
    if (list)
      list.add(qs(\`\${addButton.dataset.pathAdd}-input\`).value);
    return;
  }
  const removeButton = target.closest("[data-path-remove]");
  if (removeButton)
    pathListFor(removeButton.dataset.pathList)?.remove(Number(removeButton.dataset.pathRemove));
  const starButton = target.closest(".star-cta");
  if (starButton instanceof HTMLButtonElement) {
    starRepo(starButton);
    return;
  }
});
qs("dirty-chip").onclick = () => {
  location.hash = "policy";
};
qs("save").onclick = () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length) {
    setAppStatus("Repair required", "error");
    setDetailStatus("Error: Repair policy before saving changes.", "error");
    return;
  }
  if (projectDraft) {
    reviewProjectDraft();
    return;
  }
  if (!dirty) {
    setAppStatus("No changes to save", "ok");
    setDetailStatus("");
    return;
  }
  const policy = collectFormPolicy();
  runExclusive("Saving...", async () => {
    const result = await writePolicy("/api/policy", JSON.stringify(policy), "Save failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Saved \${result.data.path}.\`, "ok");
  });
};
qs("repair").onclick = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (state.errors.length === 0) {
    setAppStatus("");
    setDetailStatus("");
    return;
  }
  if (!await confirmDialog({
    title: "Repair policy?",
    body: "This will write canonical policy JSON. Valid settings are preserved; invalid fields are discarded. If the JSON cannot be parsed, defaults are restored.",
    detail: state.path,
    confirmLabel: "Repair",
    confirmClass: "primary"
  })) {
    return;
  }
  runExclusive("Repairing...", async () => {
    const result = await writePolicy("/api/repair", "{}", "Repair failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Repaired \${result.data.path}.\`, "ok");
  });
};
qs("reset").onclick = async () => {
  if (!state) {
    setAppStatus("Load failed", "error");
    setDetailStatus("Error: Policy is not loaded yet. Reload the page.", "error");
    return;
  }
  if (projectDraft) {
    setAppStatus("Reset unavailable", "error");
    setDetailStatus("Error: exit or apply your project draft first.", "error");
    return;
  }
  if (!await confirmDialog({
    title: "Reset policy?",
    body: "This will restore the default policy JSON at this path.",
    detail: state.path,
    confirmLabel: "Reset policy"
  })) {
    return;
  }
  runExclusive("Resetting...", async () => {
    const result = await writePolicy("/api/reset", "{}", "Reset failed");
    if (!result)
      return;
    if (await reloadAfterWrite())
      setAppStatus(\`Reset \${result.data.path} to defaults.\`, "ok");
  });
};
setRawCopyCopied(false);
qs("raw-copy").onclick = () => {
  copyRawToClipboard();
};
var themeOrder = ["auto", "light", "dark"];
var themeIcons = {
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"></rect><path d="M8 20h8M12 16v4"></path></svg>',
  light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"></path></svg>',
  dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>'
};
var themeLabels = { auto: "Auto", light: "Light", dark: "Dark" };
var applyTheme = (pref) => {
  document.documentElement.style.colorScheme = pref === "auto" ? "light dark" : pref;
  qs("theme-toggle").innerHTML = \`\${themeIcons[pref]}<span>\${themeLabels[pref]}</span>\`;
  qs("theme-toggle").setAttribute("aria-label", \`Color theme: \${themeLabels[pref]}. Click to change.\`);
};
var themePref = themeOrder.includes(localStorage.getItem("cc-safety-net-theme")) ? localStorage.getItem("cc-safety-net-theme") : "auto";
applyTheme(themePref);
qs("theme-toggle").onclick = () => {
  themePref = themeOrder[(themeOrder.indexOf(themePref) + 1) % themeOrder.length] ?? "auto";
  if (themePref === "auto")
    localStorage.removeItem("cc-safety-net-theme");
  else
    localStorage.setItem("cc-safety-net-theme", themePref);
  applyTheme(themePref);
};
window.addEventListener("beforeunload", (event) => {
  if (!dirty)
    return;
  event.preventDefault();
  event.returnValue = "";
});
window.addEventListener("hashchange", applyView);
applyView();
loadHealth();
load().then((loaded) => {
  if (loaded)
    loadStarContext();
  activityFilters.days = Math.min(activityFilters.days, retentionDays());
  loadOverview();
  loadActivity();
}).catch((error) => {
  setAppStatus("Load failed", "error");
  setDetailStatus(String(error), "error");
});

  </script>
</body>
</html>
`;var Md='<script id="ccsn-data" type="application/json">';function Hd(I){return Nd.replace(Md,()=>Md+JSON.stringify({token:I}).replaceAll("<","\\u003c"))}var no="kenryu42/cc-safety-net",lh=`https://github.com/${no}`,Ui=1e4,ch=7,dh="The project draft directory changed; reload the draft before applying.",uh="audit settings are user scope only; remove the audit section from a project proposal";async function Vd(I,q={}){let Q=xt({label:"gui",booleans:{noOpen:["--no-open"]}},I),te=q.log??console.log,ne=q.error??console.error;if(Q.errors.length>0){for(let le of Q.errors)ne(le);return ne("Usage: cc-safety-net gui [--no-open]"),1}let ae=await ph(l,q);if(te(`CC Safety Net policy GUI: ${ae.url}`),!Q.flags.noOpen)try{await(q.openBrowser??xh)(ae.url)}catch(le){ne(`Failed to open browser: ${le instanceof Error?le.message:String(le)}`),ne(`Open this URL manually: ${ae.url}`)}if(q.keepAlive===!1)return await ae.close(),0;return await kh(ae),0}async function ph(I,q={}){let Q=oh(24).toString("base64url"),te={dir:null,revision:0},ne=sh((ye,ve)=>{fh(I,ye,ve,Q,q,te)});await new Promise((ye,ve)=>{ne.once("error",ve),ne.listen(0,"127.0.0.1",()=>{ne.off("error",ve),ye()})});let le=`http://127.0.0.1:${ne.address().port}`;return{origin:le,token:Q,url:`${le}/?token=${encodeURIComponent(Q)}`,close:()=>wh(ne)}}async function fh(I,q,Q,te,ne,ae){let le=I(),ye=new URL(q.url??"/","http://127.0.0.1");if(q.method==="GET"&&ye.pathname==="/favicon.ico"){Q.writeHead(204,{"cache-control":"no-store"}),Q.end();return}if(!vh(q,ye,te)){yt(Q,403,{error:"Forbidden"});return}if(q.method==="GET"&&ye.pathname==="/"){Lh(Q,Hd(te));return}if(q.method==="GET"&&ye.pathname==="/api/policy"){let ve=Hc(le,ne),be=L(le,Mi(ne));yt(Q,200,{...ve,configState:Ne(be),...be.policyScopes?{projectPolicy:{path:b(ne.cwd??process.cwd()),weakenings:be.policyScopes.weakenings}}:{},destructiveCommandRules:W,secretPatterns:Ke,version:wt(),preview:ve.errors.length>0?null:Te(ve.policy,le.env)});return}if(q.method==="POST"&&ye.pathname==="/api/policy/preview"){let ve=await Qn(q);if(!ve.ok){yt(Q,ve.status,{errors:[ve.error]});return}let be=Uc(le,ve.value);yt(Q,be.errors.length>0?400:200,be);return}if(q.method==="POST"&&ye.pathname==="/api/policy/explain"){let ve=await Qn(q);if(!ve.ok){yt(Q,ve.status,{errors:[ve.error]});return}let be=ve.value;if(be===null||typeof be.command!=="string"){yt(Q,400,{errors:["command must be a string"]});return}let Ce=jt(be.policy,le.home);if(Ce.length>0){yt(Q,400,{errors:Ce});return}yt(Q,200,yh(le,be.command,be.policy,ne));return}if(q.method==="POST"&&ye.pathname==="/api/policy"){let ve=await Qn(q);if(!ve.ok){yt(Q,ve.status,{errors:[ve.error]});return}let be=Wt(le,ve.value,ne);yt(Q,be.errors.length>0?400:200,be);return}if(q.method==="POST"&&ye.pathname==="/api/reset"){yt(Q,200,Wt(le,Z,ne));return}if(q.method==="POST"&&ye.pathname==="/api/repair"){yt(Q,200,Gc(le,ne));return}if(q.method==="POST"&&ye.pathname==="/api/policy/project/choose-directory"){let ve=await(ne.chooseDirectory??Ni)();if("path"in ve)ae.dir=ve.path,ae.revision+=1;yt(Q,200,{cancelled:"cancelled"in ve,..."error"in ve?{error:ve.error}:{}});return}if(q.method==="GET"&&ye.pathname==="/api/policy/project"){let ve=zd(ae,ne),be=Ud(ve,le.home),Ce=Yn(le,ne);yt(Q,200,{path:b(ve),revision:ae.revision,baseline:Ce.baseline,userPolicyDiagnostics:Ce.diagnostics,projection:be.projection,projectionDiagnostics:be.diagnostics,canPickDirectory:ji(process.platform,process.env)});return}if(q.method==="POST"&&ye.pathname==="/api/policy/project/diff"){let ve=await Gd(le,q,Q,ae,ne);if(!ve)return;let be=Ud(ve.dir,le.home),Ce=Yn(le,ne).baseline,Ee=J(Ce,se(ve.proposal,le.home).policy);yt(Q,200,{rows:Gr(J(Ce,be.projection).policy,Ee.policy,!1),weakenings:Ee.weakenings,existingFileDiagnostics:be.diagnostics});return}if(q.method==="POST"&&ye.pathname==="/api/policy/project/apply"){let ve=await Gd(le,q,Q,ae,ne);if(!ve)return;let be=gh(ve.dir,ve.proposal,le.home);yt(Q,be.errors.length>0?500:200,be);return}if(q.method==="GET"&&ye.pathname==="/api/activity"){let ve=ee(le,ne),be=hh(ye.searchParams.get("days"),ve);if(be===null){yt(Q,400,{error:`days must be an integer between 1 and ${ve}`});return}yt(Q,200,Id(le,be,ne.activityLogsDir));return}if(q.method==="POST"&&ye.pathname==="/api/rules/choose-directory"){yt(Q,200,await Ni());return}if(q.method==="GET"&&ye.pathname==="/api/rules"){let ve=Y(le,Mi(ne)),be=new Map(ve.rules.map((Ce)=>[Ce.name,Ce]));yt(Q,200,{projectPath:ne.cwd??process.cwd(),canPickDirectory:ji(process.platform,process.env),rulebooks:ve.rulebooks.map((Ce)=>({source:Ce.source,spec:Ce.spec,name:Ce.name,version:Ce.version,rules:Ce.rules.flatMap((Ee)=>{let Ie=be.get(Ee);if(!Ie)return[];return[{name:Ie.name,command:Ie.command,subcommand:Ie.subcommand,block_args:Ie.block_args,reason:Ie.reason}]})})),errors:ve.errors,warnings:ve.warnings});return}if(q.method==="GET"&&ye.pathname==="/api/star/context"){yt(Q,200,await(ne.fetchStarContext??(()=>Eh(le,{logsDir:ne.activityLogsDir})))());return}if(q.method==="POST"&&ye.pathname==="/api/star"){let ve=await(ne.starRepo??Ch)();yt(Q,200,ve.ok?{ok:!0}:{ok:!1,fallbackUrl:lh});return}if(q.method==="GET"&&ye.pathname==="/api/integrations"){yt(Q,200,await(ne.fetchIntegrations??(()=>Sh(le)))());return}if(q.method==="GET"&&ye.pathname==="/api/health"){yt(Q,200,await(ne.fetchHealth??(()=>Rh(le)))());return}if(q.method==="POST"&&(ye.pathname==="/api/install"||ye.pathname==="/api/uninstall")){let ve=await Qn(q);if(!ve.ok){yt(Q,ve.status,{errors:[ve.error]});return}let be=ve.value?.target;if(typeof be!=="string"||!Gt.some((Ee)=>Ee.target===be)){yt(Q,400,{error:"unknown target"});return}let Ce=ye.pathname==="/api/install"?"install":"uninstall";yt(Q,200,await(ne.runIntegration??Ph)(Ce,be));return}yt(Q,404,{error:"Not found"})}function Mi(I){return{...I,cwd:I.cwd??process.cwd()}}function zd(I,q){return I.dir??q.cwd??process.cwd()}function Ud(I,q){let Q=b(I),te=ih(Q)?un(Q):{value:void 0,errors:[]},ne=se(te.value,q);return{projection:ne.policy,diagnostics:[...te.errors,...ne.diagnostics]}}async function Gd(I,q,Q,te,ne){let ae=zd(te,ne),le=te.revision,ye=await Qn(q);if(!ye.ok)return yt(Q,ye.status,{errors:[ye.error]}),null;let ve=ye.value;if(typeof ve?.revision!=="number")return yt(Q,400,{errors:["revision must be a number"]}),null;if(ve.revision!==le)return yt(Q,409,{errors:[dh]}),null;let be=mh(ve.proposal,I.home);if(be.length>0)return yt(Q,400,{errors:be}),null;return{dir:ae,proposal:ve.proposal}}function mh(I,q){let Q=jt(I,q);if(Q.length>0)return Q;return I?.audit===void 0?[]:[uh]}function gh(I,q,Q){let te=b(I),ne=Br(q,g(q,Q));try{return h(s(w(I,"project policy"),te),`${JSON.stringify(ne,null,2)}
`),{path:te,errors:[]}}catch(ae){return{path:te,errors:[ae instanceof Error?ae.message:String(ae)]}}}function yh(I,q,Q,te){let ne=g(Q,I.home),ae=L(I,Mi(te)),le=Le({rules:ae.policy.rules,transparentWrappers:ae.policy.transparentWrappers,safety:Oe(ne.safety),worktreeMode:ne.workflow.worktree_mode,destructiveCommandProtectionEnabled:ne.destructive_command_protection.enabled,destructiveCommandRuleOverrides:ne.destructive_command_protection.overrides,destructiveCommandAllowPaths:ne.destructive_command_protection.allow_paths,secretProtection:{enabled:ne.secret_protection.enabled,disabledRules:De(ne.secret_protection.overrides),denyPaths:ne.secret_protection.deny_paths,allowPaths:ne.secret_protection.allow_paths}});return qn(q,{policySnapshot:le,cwd:te.cwd,userConfigDir:te.userConfigDir},I)}function hh(I,q){if(I===null)return Math.min(ch,q);let Q=Number(I);if(!Number.isInteger(Q)||Q<1||Q>q)return null;return Q}function vh(I,q,Q){if(q.searchParams.get("token")!==Q)return!1;if(I.method!=="POST")return!0;return I.headers["x-cc-safety-net-token"]===Q}var bh=1048576;async function Qn(I){let q=[],Q=0;for await(let te of I){let ne=te;if(Q+=ne.byteLength,Q>bh)return{ok:!1,status:413,error:"Request body is too large"};q.push(ne)}try{return{ok:!0,value:JSON.parse(Buffer.concat(q).toString("utf-8")||"{}")}}catch(te){return{ok:!1,status:400,error:`Invalid JSON: ${te instanceof Error?te.message:String(te)}`}}}function Lh(I,q){I.writeHead(200,{"content-type":"text/html; charset=utf-8","cache-control":"no-store"}),I.end(q)}function yt(I,q,Q){I.writeHead(q,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),I.end(JSON.stringify(Q))}function wh(I){return new Promise((q,Q)=>{I.close((te)=>te?Q(te):q())})}function kh(I){return new Promise((q)=>{let Q=()=>{process.off("SIGINT",te),process.off("SIGTERM",te)},te=()=>{Q(),I.close().then(q)};process.once("SIGINT",te),process.once("SIGTERM",te)})}function xh(I){let q=process.platform==="darwin"?"open":process.platform==="win32"?"cmd":"xdg-open",Q=process.platform==="win32"?["/c","start","",I]:[I];return new Promise((te,ne)=>{let ae=qd(q,Q,{detached:!0,stdio:"ignore"}),le=(ve)=>{ae.off("spawn",ye),ne(ve)},ye=()=>{ae.off("error",le),ae.unref(),te()};ae.once("error",le),ae.once("spawn",ye)})}async function Ch(I="gh",q=Ui){return{ok:await Hi(I,["api","-X","PUT",`/user/starred/${no}`],q)===0}}async function Sh(I,q={}){let Q=await An(q.fetcher),te=Jd(I,Q);return{targets:It.map((ne)=>{let ae=te.find((le)=>le.platform===ne.id);return{target:ne.id,label:ht(ne.id),version:Q.versions[ne.id]??null,status:ae?.configured?"active":ae?.detected?"disabled":ae?.inspectionStatus==="not-inspected"?"not-inspected":"not-installed"}}),system:{version:Q.version,nodeVersion:Q.nodeVersion,platform:Q.platform}}}function Jd(I,q){return wn(I,process.cwd(),{ampPluginListOutput:q.ampPluginListOutput,codexPluginListOutput:q.codexPluginListOutput,copilotCliVersion:q.versions["copilot-cli"]})}async function Rh(I,q={}){let[Q,te]=await Promise.all([An(q.fetcher),(q.checkUpdates??Zt)()]);return{hooks:Jd(I,Q).filter((ne)=>ne.detected).map((ne)=>({platform:ne.platform,label:ht(ne.platform),configured:ne.configured})),update:{currentVersion:te.currentVersion,latestVersion:te.latestVersion??null,updateAvailable:te.updateAvailable}}}var Bd=Promise.resolve();function Ph(I,q,Q={}){let te=async()=>{let ae=[],{log:le,error:ye}=console;console.log=(...ve)=>ae.push(ve.map(String).join(" ")),console.error=console.log;try{return{ok:await Kn(I,[],{selectTargets:async()=>[q],output:new ah({write(be,Ce,Ee){ae.push(String(be).replace(/\n$/,"")),Ee()}}),...Q})===0,output:ae.join(`
`)}}finally{console.log=le,console.error=ye}},ne=Bd.then(te);return Bd=ne.then(()=>{return},()=>{return}),ne}async function Eh(I,q={}){let[Q,te,ne]=await Promise.all([Dh(q.command),Ah(q.fetchRepo),Promise.resolve(or(I,ee(I),q.logsDir).totalBlocked)]);return{starred:Q,starCount:te,blockedTotal:ne}}async function Dh(I="gh",q=Ui){if(await Hi(I,["auth","status"],q)!==0)return null;let Q=await Hi(I,["api",`/user/starred/${no}`],q);if(Q===0)return!0;if(Q===null)return null;return!1}function Hi(I,q,Q){return new Promise((te)=>{let ne=qd(I,q,{stdio:"ignore",windowsHide:!0}),ae=!1,le,ye=(ve)=>{if(ae)return;if(ae=!0,le)clearTimeout(le);te(ve)};ne.once("error",()=>ye(null)),ne.once("close",ye),le=setTimeout(()=>{ne.kill(),ye(null)},Q)})}async function Ah(I=fetch){try{let q=await I(`https://api.github.com/repos/${no}`,{headers:{accept:"application/vnd.github+json"},signal:AbortSignal.timeout(Ui)});if(!q.ok)return null;let Q=await q.json();return typeof Q.stargazers_count==="number"?Q.stargazers_count:null}catch{return null}}function _h(I){if(I[0]!=="help")return!1;let q=I[1];if(!q)di(),process.exit(0);if(Vn(q))process.exit(0);console.error(`Unknown command: ${q}`),console.error("Run 'cc-safety-net --help' for available commands."),process.exit(1)}var Th={hook:async()=>{console.error("hook requires exactly one integration flag. Try: cc-safety-net hook --kimi-code"),Vn("hook",console.error),process.exit(1)},install:async(I)=>{process.exit(await Kn("install",I))},update:async(I)=>{process.exit(await Si(I))},uninstall:async(I)=>{process.exit(await Kn("uninstall",I))},rule:async(I)=>{process.exit(await _d(l(),I))},policy:async(I)=>{process.exit(await zc(l(),I))},status:async(I)=>{if(qt(xt({label:"status"},I).errors))process.exit(1);$d(l())},statusline:async(I)=>{let q=xt({label:"statusline",booleans:{claudeCode:["-cc","--claude-code"]}},I);if(q.errors.length===0&&q.flags.claudeCode){await Fi(l());return}if(qt(q.errors),!q.flags.claudeCode)console.error("statusline requires --claude-code (-cc)");Vn("statusline",console.error),process.exit(1)},doctor:async(I)=>{let q=ni(I);if(!q)process.exit(1);let Q=await Ll(l(),{json:q.json,skipUpdateCheck:q.skipUpdateCheck});process.exit(Q)},logs:async(I)=>{process.exit(await Ki(l(),I))},gui:async(I)=>{process.exit(await Vd(I))},explain:async(I)=>{process.exit(await _l(l(),I))}};async function $h(I){let q=xt({label:"cc-safety-net",booleans:{version:["-V","--version"]},positionals:"list"},I);if(_h(I))return;let Q=I[0],te=Q?rr(Q):void 0;if(q.help&&te&&te.name!=="rule")Vn(te.name),process.exit(0);if(!Q||q.help&&!te)di(),process.exit(0);if(q.flags.version)Il(),process.exit(0);if(te){await Th[te.name](I.slice(1));return}if(Q==="--statusline"){await Fi(l());return}console.error(Q.startsWith("-")?`Unknown option: ${Q}`:`Unknown command: ${Q}`),console.error("Run 'cc-safety-net --help' for usage."),process.exit(1)}export{$h as runCli};
