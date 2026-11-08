(async()=>{
const response=await fetch('/data/snapshot.json');
if(!response.ok)throw Error('자료를 불러오지 못했습니다. README의 가져오기 절차를 확인하세요.');
const SNAPSHOT=await response.json();

'use strict';

const UI_EN={"변경사항 저장":"Save changes","제목·분류·태그·메모·관심 표시의 변경사항을 저장합니다. 저장하지 않고 닫으면 수정 내용은 반영되지 않습니다.":"Save changes to titles, categories, tags, notes, and favorites. Closing without saving discards your edits.","원본 보드 ↗": "Original board ↗", "JSON 백업": "JSON backup", "로컬 보관본 만들기": "Export local copy", "전체": "All", "관심 이미지 ☆": "Favorites ☆", "분야": "Discipline", "유형": "Type", "톤": "Tone", "전체 분야": "All disciplines", "전체 유형": "All types", "전체 톤": "All tones", "컬러": "Color", "여러 색 선택 가능": "Select multiple colors", "선택한 색 중 하나라도 포함된 이미지": "Matches any selected color", "세부 태그": "Tags", "태그 찾기": "Find tags", "태그 결합 방식": "Tag matching", "모두 포함": "Match all", "하나 이상": "Match any", "컬러·톤은 픽셀 분석 결과입니다.": "Colors and tones are analyzed from pixels.", "유사도는 공통 태그·유형·컬러로 계산합니다.": "Similarity uses shared tags, types, and colors.", "신규 핀은 제목 키워드로 분류를 제안합니다.": "New pins receive suggestions based on title keywords.", "수집기에 연결 중…": "Connecting to collector…", "Chrome 로그인": "Log in with Chrome", "로그인 완료": "Finish login", "지금 동기화": "Sync now", "레퍼런스 검색": "Search references", "제목, 태그, 메모 검색": "Search titles, tags, and notes", "그룹 기준": "Group by", "그룹 없음": "No grouping", "분야별": "By discipline", "유형별": "By type", "컬러별": "By color", "톤별": "By tone", "태그별": "By tag", "정렬": "Sort", "최근 추가순": "Newest first", "수집순": "Collection order", "색상순": "Color order", "제목순": "Title", "초기화": "Reset", "해제 ×": "Clear ×", "여러 컬러·톤·태그에 속하는 이미지는 각 그룹에 반복 표시됩니다.": "Images with multiple colors, tones, or tags appear in each matching group.", "기존 메모·분류는 동기화 시 유지합니다. 보드에서 삭제된 핀도 이 라이브러리에는 보존합니다. 영상은 화면에 보이는 동안 무음 반복 재생됩니다.": "Sync preserves your notes and categories. Pins removed from the board remain in this library. Visible videos loop silently.", "수집기는 PC가 깨어 있고 실행 중일 때 30분마다 확인합니다.": "The collector checks every 30 minutes while running and your PC is awake.", "수집기 종료": "Stop collector", "Pinterest 원본 ↗": "View on Pinterest ↗", "유사 이미지 보기": "Find similar images", "이름": "Name", "태그 · 쉼표로 구분": "Tags · separate with commas", "메모": "Notes", "리서치 메모": "Research notes", "관심 이미지": "Favorite", "저장": "Save", "닫기": "Close", "영상": "Video", "영상 · 30초 미리보기": "Video · 30-second preview", "영상 · 원본에서 보기": "Video · view original", "영상 자동재생 켬": "Video autoplay on", "영상 자동재생 끔": "Video autoplay off", "없음": "None", "필터": "Filter", "기타 톤": "Other tones", "기타 태그": "Other tags", "조건에 맞는 이미지가 없습니다. 필터를 바꾸거나 초기화해 주세요.": "No matching images. Adjust or reset your filters.", "저장했습니다.": "Saved.", "요청 실패": "Request failed", "현재 자료를 포함한 보관본을 만들고 있습니다.": "Creating a local copy with your current collection…", "보관본을 저장했습니다. 앱의 exports/latest 폴더에도 있습니다.": "Local copy saved. It is also in the app’s exports/latest folder.", "수집기를 종료할까요? 다시 실행하려면 START.cmd를 여세요.": "Stop the collector? Run START.cmd to start it again.", "수집기를 종료했습니다.": "Collector stopped.", "수집기 연결이 끊겼습니다. START.cmd로 실행해 주세요.": "Collector disconnected. Run START.cmd to reconnect.", "연결되지 않은 동안에는 자동 업데이트되지 않습니다.": "Automatic updates are paused while disconnected.", "START.cmd를 실행하거나, 별도의 research-snapshot.html을 열어 주세요.": "Run START.cmd or open research-snapshot.html.", "오프라인 보기 · 자동 업데이트 없음 · 변경 내용은 이 브라우저에 저장됩니다.": "Offline copy · no automatic updates · edits are saved in this browser.", "미분류": "Uncategorized", "그래픽": "Graphic design", "제품": "Product design", "모션": "Motion", "브랜딩": "Branding", "공간": "Spatial design", "그라디언트 / 블러": "Gradient / blur", "유기적 형태": "Organic forms", "포스터 / 편집": "Poster / editorial", "실물 기기형 UI": "Device-inspired UI", "위젯 / 홈 화면": "Widgets / home screen", "컨트롤 패널": "Control panel", "하드웨어 / 디바이스": "Hardware / devices", "기하 / 패턴": "Geometry / patterns", "픽셀 / 파티클": "Pixels / particles", "콜라주": "Collage", "인터랙션 프로토타입": "Interaction prototype", "블랙": "Black", "차콜": "Charcoal", "그레이": "Gray", "화이트": "White", "아이보리": "Ivory", "베이지": "Beige", "브라운": "Brown", "버건디": "Burgundy", "레드": "Red", "코랄": "Coral", "오렌지": "Orange", "옐로": "Yellow", "라임": "Lime", "그린": "Green", "민트": "Mint", "틸": "Teal", "시안": "Cyan", "스카이블루": "Sky blue", "블루": "Blue", "네이비": "Navy", "라벤더": "Lavender", "퍼플": "Purple", "마젠타": "Magenta", "핑크": "Pink", "다크": "Dark", "라이트": "Light", "고채도": "Vivid", "파스텔": "Pastel", "저채도": "Muted", "모노톤": "Monochrome", "스타일": "Style", "형태": "Form", "표현": "Treatment", "맥락": "Context", "인터랙션": "Interaction", "구도": "Composition", "미니멀": "Minimal", "레트로": "Retro", "스큐어모픽": "Skeuomorphic", "실험적": "Experimental", "기하": "Geometric", "유기적": "Organic", "라운드": "Rounded", "링": "Ring", "방사형": "Radial", "선형": "Linear", "그리드": "Grid", "모듈": "Modular", "반복": "Repetition", "도트": "Dots", "픽셀": "Pixels", "파티클": "Particles", "윤곽선": "Outline", "곡면": "Curved surfaces", "블러": "Blur", "그라디언트": "Gradient", "글로우": "Glow", "열화상": "Thermal", "메탈": "Metal", "플라스틱": "Plastic", "리퀴드": "Liquid", "입체": "3D", "잔상": "Trails", "타이포": "Typography", "사진": "Photography", "일러스트": "Illustration", "음악": "Music", "시계": "Clock", "카메라": "Camera", "게임": "Gaming", "날씨": "Weather", "모바일": "Mobile", "웨어러블": "Wearable", "컨트롤": "Controls", "포스터": "Poster", "편집": "Editorial", "소형 기기": "Small devices", "프로토타입": "Prototype", "물리 버튼": "Physical buttons", "다이얼": "Dial", "클릭 휠": "Click wheel", "물리 인터랙션": "Physical interaction", "스트랩": "Strap", "위젯": "Widgets", "세로형": "Portrait", "가로형": "Landscape", "정방형": "Square", "중앙 배치": "Centered", "여백": "Negative space", "전체 화면": "Full bleed", "분류 검토": "Needs review", "이미지 시각 검토 · 태그 편집 가능": "Visually reviewed · tags are editable", "사용자 검토 / 편집": "User reviewed / edited", "신규 핀: 제목 키워드 제안 · 분류 검토 필요": "New pin: title-based suggestions · review needed", "저장 이미지 시각 검토 · 수정 가능": "Visually reviewed from saved image · editable", "Pinterest 보드를 확인하고 있습니다.": "Checking the Pinterest board.", "로컬 자료로 시작합니다. 웹 동기화 상태를 확인합니다.": "Loading local collection and checking sync status.", "열린 Chrome 창에서 Pinterest에 로그인하고 보드가 보이는지 확인하세요. 완료 후 이 화면의 로그인 완료 버튼을 누르세요.": "Log in to Pinterest in the Chrome window and open your board. Then select Finish login here.", "보드 대신 다른 화면으로 이동했습니다. Pinterest 로그인 후 다시 시도하세요. 공개 상태와 보드 주소도 확인해 주세요.": "Redirected away from the board. Log in and retry; also check the board URL and visibility.", "한국어 제목": "Korean title", "영어 제목": "English title", "제목 출처": "Title source", "이미지와 원문을 참고해 정리한 제목": "Title refined from the image and source text", "Pinterest 제목·설명에서 가져온 제목": "Title from Pinterest metadata", "정보가 없어 붙인 임시 제목": "Placeholder title: source information unavailable", "사용자가 편집한 제목": "User-edited title", "한국어·영어 표시 제목을 각각 편집할 수 있습니다.": "You can edit the Korean and English display titles separately.", "번역이 없는 언어는 원문 제목을 표시합니다.": "If a translation is missing, the source title is shown.", "비주얼 리서치": "Visual research", "모션 스터디": "Motion study", "이미지 스터디": "Image study", "화면 / UI 스터디": "Screen / UI study", "실시간": "Real-time", "오디오 반응형": "Audio-reactive", "제너러티브": "Generative", "이미지": "Image", "설명·매체 기반 자동 분류 · 수정 가능": "Automatically classified from description and media · editable", "매체 기준 기본 분류 · 수정 가능": "Basic classification by media · editable", "제목을 하나 이상 입력하세요.": "Enter at least one title.", "그래픽 디자인": "Graphic design", "제품디자인": "Product design", "UXUI": "UX/UI", "모션그래픽": "Motion graphics", "미디어아트": "Media art", "에디토리얼": "Editorial", "디자인 분야": "Design categories"};
const UI_KO=Object.fromEntries(Object.entries(UI_EN).map(([ko,en])=>[en.toLowerCase(),ko]));
let uiLanguage='ko';try{uiLanguage=localStorage.getItem('research-ui-language')==='en'?'en':'ko'}catch{}
function englishText(text){
 if(UI_EN[text])return UI_EN[text];
 if(/^\d+개$/.test(text))return text.replace('개',' items');
 if(text.startsWith('#')&&text.endsWith(' ×'))return '#'+englishText(text.slice(1,-2))+' ×';
 if(text.endsWith(' ×'))return englishText(text.slice(0,-2))+' ×';
 let m;
 if(m=text.match(/^(.*) 컬러 (\d+)개$/))return englishText(m[1])+' color · '+m[2]+' items';
 if(m=text.match(/^(.*) · (\d+)개$/))return englishText(m[1])+' · '+m[2]+' items';
 if(m=text.match(/^(.*) (상세|관심 이미지|영상 미리보기)$/))return m[1]+' · '+({상세:'Details','관심 이미지':'Favorite','영상 미리보기':'Video preview'}[m[2]]);
 if(m=text.match(/^유사도 (.+)$/))return 'Similarity '+m[1];
 if(m=text.match(/^“(.*)”와 유사한 순서 · 태그·유형·컬러 기준$/))return 'Similar to “'+m[1]+'” · based on tags, type, and colors';
 if(m=text.match(/^동기화 완료 · (\d+)개 추가 \/ (\d+)개 확인(.*)$/))return 'Sync complete · '+m[1]+' added / '+m[2]+' checked'+englishStatusTail(m[3]);
 if(m=text.match(/^고해상도 이미지 (\d+)개 갱신 중…$/))return 'Updating '+m[1]+' high-resolution images…';
 if(m=text.match(/^보드에서 (\d+)개 핀 확인 중…$/))return 'Checking '+m[1]+' pins…';
 if(m=text.match(/^영상 미리보기 저장 중 · (\d+)번째$/))return 'Saving video preview '+m[1]+'…';
 if(m=text.match(/^(\d+)개 새 이미지 저장 중…$/))return 'Saving '+m[1]+' new images…';
 if(text.startsWith('마지막 성공 '))return text.replace('마지막 성공 ','Last sync ').replace(' · 다음 확인 ',' · Next check ').replaceAll('없음','None');
 if(text.startsWith('로컬 스냅샷 · '))return text.replace('로컬 스냅샷 · ','Offline snapshot · ').replace('오전','AM').replace('오후','PM');
 if(text.startsWith('컬러: '))return 'Colors: '+text.slice(4).split(' / 톤: ').map(part=>part.split(', ').map(englishText).join(', ')).join(' / Tones: ');
 for(const prefix of ['이미지 시각 검토 · 태그 편집 가능','사용자 검토 / 편집','신규 핀: 제목 키워드 제안 · 분류 검토 필요','저장 이미지 시각 검토 · 수정 가능'])if(text.startsWith(prefix))return text.replace(prefix,UI_EN[prefix]).replace('최대 30초 미리보기 · 전체 영상은 원본 링크','Up to 30 seconds · open original for full video');
 if(text.includes(' · ')){const parts=text.split(' · ');if(parts.every(p=>UI_EN[p]||!/[가-힣]/.test(p)))return parts.map(p=>UI_EN[p]||p).join(' · ')}
 return text;
}
function englishStatusTail(t){return t.replace(/이미지 (\d+)개 화질 개선/g,'$1 images upgraded').replace(/영상 (\d+)개/g,'$1 videos').replace(/전체 (\d+)개 중 일부만 로딩됨/g,'Only part of $1 pins loaded').replace(/이미지 (\d+)개 실패, 다음 동기화에서 재시도/g,'$1 images failed; retrying on next sync').replace(/ · (\d+) videos 저장 실패, 다음 동기화에서 재시도/g,' · $1 videos failed; retrying on next sync')}
function displayTerm(t){return uiLanguage==='en'?englishText(t):t}
function canonicalTerm(t){return UI_KO[t.toLowerCase()]||t}
const uiTextCache=new WeakMap(),uiAttrCache=new WeakMap();
let uiObserver,uiTranslationPending=false;
function translateUI(){
 if(uiObserver)uiObserver.disconnect();
 document.documentElement.lang=uiLanguage;
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
 let node;
 while(node=walker.nextNode()){
  const el=node.parentElement;if(!el||el.closest('script,style,textarea,.card h3,#originalTitle,.language-toggle,#toast[hidden]'))continue;
  const prior=uiTextCache.get(node),raw=prior&&node.nodeValue===prior.shown?prior.raw:node.nodeValue;
  const trimmed=raw.trim(),shown=uiLanguage==='en'&&trimmed?raw.replace(trimmed,englishText(trimmed)):raw;
  if(node.nodeValue!==shown)node.nodeValue=shown;uiTextCache.set(node,{raw,shown});
 }
 for(const el of document.querySelectorAll('[placeholder],[title],[aria-label]')){
  if(el.closest('.language-toggle'))continue;
  const map=uiAttrCache.get(el)||{};
  for(const attr of ['placeholder','title','aria-label'])if(el.hasAttribute(attr)){const value=el.getAttribute(attr),prior=map[attr],raw=prior&&value===prior.shown?prior.raw:value,shown=uiLanguage==='en'?englishText(raw):raw;if(value!==shown)el.setAttribute(attr,shown);map[attr]={raw,shown}}
  uiAttrCache.set(el,map);
 }
 for(const b of document.querySelectorAll('[data-language]')){b.classList.toggle('active',b.dataset.language===uiLanguage);b.setAttribute('aria-pressed',String(b.dataset.language===uiLanguage))}
 scheduleTagFit();
 if(uiObserver)uiObserver.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});
}
function queueUITranslation(){if(uiTranslationPending)return;uiTranslationPending=true;queueMicrotask(()=>{uiTranslationPending=false;translateUI()})}
queueMicrotask(()=>{
 uiObserver=new MutationObserver(queueUITranslation);translateUI();
 for(const b of document.querySelectorAll('[data-language]'))b.onclick=()=>{uiLanguage=b.dataset.language;try{localStorage.setItem('research-ui-language',uiLanguage)}catch{}if(typeof state!=='undefined'&&state.message)updateState(state);if(typeof initialized!=='undefined'&&initialized){renderFacets();render()}translateUI()};
});


const $=id=>document.getElementById(id);
let items=[],state={},catalog={},favoriteOnly=false,selectedColors=new Set(),selectedTags=new Set(),similarId=null,selected=null,polling=false,toastTimer,initialized=false;
const autoVideos=true;
const videoObserver=new IntersectionObserver(entries=>{for(const e of entries){const v=e.target;if(e.isIntersecting&&autoVideos&&!document.hidden&&!$('modal').open){if(!v.src)v.src=v.dataset.src;v.play().catch(()=>{})}else v.pause()}},{threshold:.15});
function refreshVideos(){for(const v of document.querySelectorAll('.card video')){const r=v.getBoundingClientRect();if(autoVideos&&!document.hidden&&!$('modal').open&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth){if(!v.src)v.src=v.dataset.src;v.play().catch(()=>{})}else v.pause()}}
document.addEventListener('visibilitychange',()=>{refreshVideos();if(document.hidden)$('previewVideo').pause()});
$('modal').addEventListener('close',()=>{$('previewVideo').pause();$('previewVideo').removeAttribute('src');$('previewVideo').load();refreshVideos()});
function addVideo(wrap,x){if(!x.isVideo&&!x.videoSrc)return;let badge=document.createElement('span');badge.className='video-badge';badge.textContent=x.videoSrc?(x.videoPreviewOnly?'영상 · 30초 미리보기':'영상'):'영상 · 원본에서 보기';if(x.videoSrc){let v=document.createElement('video');v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.preload='none';v.poster=x.image;v.dataset.src=x.videoSrc;v.setAttribute('aria-label',displayTitle(x)+' 영상 미리보기');v.onerror=()=>{v.hidden=true;badge.textContent='영상 · 원본에서 보기'};wrap.append(v);videoObserver.observe(v)}wrap.append(badge)}
const time=s=>s?new Date(s).toLocaleString(uiLanguage==='en'?'en-US':'ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}):'없음';
const displayTitle=x=>x.titles?.[uiLanguage]||x.title;
const allTags=x=>[...new Set([...(x.tags||[]),...(x.format?[x.format]:[])])];
const itemColors=x=>x.colors||[x.color];
function toast(t){$('toast').textContent=t;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,5000)}


let localEdits={};try{localEdits=JSON.parse(localStorage.getItem('form-snapshot-edits')||'{}')}catch{}
for(const x of SNAPSHOT.items)if(localEdits[x.id])Object.assign(x,localEdits[x.id]);
async function api(url,body){
 if(url==='/api/library')return SNAPSHOT;
 if(url==='/api/status')return SNAPSHOT.state;
 if(url==='/api/edit'){let x=SNAPSHOT.items.find(x=>x.id===body.id);if(!x)throw Error('항목 없음');if(body.titles&&JSON.stringify(body.titles)!==JSON.stringify(x.titles)){body={...body,title:body.titles.ko||body.titles.en,titleOrigin:'user'}}Object.assign(x,body);localEdits[x.id]={...(localEdits[x.id]||{}),...body};try{localStorage.setItem('form-snapshot-edits',JSON.stringify(localEdits))}catch{toast('브라우저 저장 실패: 백업 내보내기로 보관하세요.')}return {ok:true}}
 throw Error('자동 수집은 START.cmd로 실행한 앱에서 사용할 수 있습니다.');
}
function options(el,values,all){el.replaceChildren();if(all)el.add(new Option(all,''));for(const value of values)el.add(new Option(value,value))}
function updateState(s){state=s;$('syncmessage').textContent=s.message;$('syncmeta').textContent='오프라인 보기 · 자동 업데이트 없음 · 변경 내용은 이 브라우저에 저장됩니다.';}
async function load(){const d=await api('/api/library');items=d.items;catalog=d.catalog;updateState(d.state);if(!initialized){options($('field'),d.fields,'전체 분야');options($('type'),d.types,'전체 유형');options($('tone'),catalog.tones,'전체 톤');options($('editfield'),d.fields);options($('edittype'),d.types);initialized=true}renderFacets();render()}
function chip(text,selected,onClick,count){let b=document.createElement('button');b.type='button';b.className='chip'+(selected?' active':'');b.append(document.createTextNode(text));if(count!==undefined){let s=document.createElement('small');s.textContent=count;b.append(s)}b.setAttribute('aria-pressed',String(selected));b.onclick=onClick;return b}
function toggleTag(tag){selectedTags.has(tag)?selectedTags.delete(tag):selectedTags.add(tag);renderFacets();render()}
function renderCategories(){
 const focused=document.activeElement?.dataset.category,bar=$('categorybar');bar.replaceChildren();
 for(const value of ['',...(catalog.fields||[])]){
  const b=document.createElement('button');b.type='button';b.dataset.category=value;b.className=$('field').value===value?'active':'';b.setAttribute('aria-pressed',String($('field').value===value));b.append(document.createTextNode(value||'전체'));
  const n=document.createElement('small');n.textContent=value?items.filter(x=>x.field===value).length:items.length;b.append(n);
  b.onclick=()=>{$('field').value=value;renderFacets();render()};
  bar.append(b);
 }
 if(focused!==undefined)[...bar.children].find(x=>x.dataset.category===focused)?.focus({preventScroll:true});
}
function renderFacets(){
 const scope=items.filter(x=>!$('field').value||x.field===$('field').value);
 const opened=new Set([...$('tagfacets').querySelectorAll('details[open]')].map(x=>x.dataset.name)),counts=new Map();for(const x of scope)for(const t of allTags(x))counts.set(t,(counts.get(t)||0)+1);
 $('colors').replaceChildren();for(const [name,hex]of Object.entries(catalog.colors||{})){const n=scope.filter(x=>itemColors(x).includes(name)).length;let b=document.createElement('button');b.className='color-btn'+(selectedColors.has(name)?' active':'');b.title=name+' · '+n+'개';b.setAttribute('aria-label',name+' 컬러 '+n+'개');b.setAttribute('aria-pressed',String(selectedColors.has(name)));let i=document.createElement('i');i.style.background=hex;let s=document.createElement('span');s.textContent=name;b.append(i,s);b.onclick=()=>{selectedColors.has(name)?selectedColors.delete(name):selectedColors.add(name);renderFacets();render()};$('colors').append(b)}
 const mapped=new Set(Object.values(catalog.tagGroups||{}).flat()),groups={...(catalog.tagGroups||{}),'기타 태그':[...counts.keys()].filter(t=>!mapped.has(t)).sort()},term=$('tagsearch').value.toLowerCase();$('tagfacets').replaceChildren();
 for(const [name,tags]of Object.entries(groups)){const visible=tags.filter(t=>counts.has(t)&&(t+' '+englishText(t)).toLowerCase().includes(term));if(!visible.length)continue;let details=document.createElement('details');details.className='tag-group';details.dataset.name=name;details.open=!!term||opened.has(name)||name==='스타일';let summary=document.createElement('summary');summary.textContent=name;let small=document.createElement('small');small.textContent=visible.length;summary.append(small);let list=document.createElement('div');list.className='tag-list';for(const t of visible)list.append(chip(t,selectedTags.has(t),()=>toggleTag(t),counts.get(t)));details.append(summary,list);$('tagfacets').append(details)}
}
function palette(el,x){el.replaceChildren();for(const hex of x.palette||[]){if(!/^#[\da-f]{6}$/i.test(hex))continue;let sw=document.createElement('i');sw.style.background=hex;sw.title=hex;el.append(sw)}}
function score(a,b){const aa=new Set(allTags(a)),bb=new Set(allTags(b)),intersection=[...aa].filter(x=>bb.has(x)).length,union=new Set([...aa,...bb]).size;let s=union?intersection/union*5:0;if(a.type===b.type&&a.type!=='미분류')s+=2;if(a.field===b.field&&a.field!=='미분류')s+=1;const ac=new Set(itemColors(a)),bc=new Set(itemColors(b));s+=[...ac].filter(x=>bc.has(x)).length/Math.max(1,new Set([...ac,...bc]).size);return s}
let tagFitFrame=0;
function fitCardTags(row){
 if(!row.isConnected||row.clientWidth===0)return;
 const more=row.querySelector('.tag-more'),buttons=[...row.children].filter(b=>b!==more),total=Number(row.dataset.total),gap=parseFloat(getComputedStyle(row).columnGap)||4;
 buttons.forEach(b=>b.hidden=false);more.hidden=false;
 const widths=buttons.map(b=>b.getBoundingClientRect().width),style=getComputedStyle(more),measure=document.createElement('canvas').getContext('2d');measure.font=style.font;const extra=['paddingLeft','paddingRight','borderLeftWidth','borderRightWidth'].reduce((sum,key)=>sum+(parseFloat(style[key])||0),0);let n=buttons.length;
 for(;n>=0;n--){const rest=total-n,label='+'+rest;const needed=widths.slice(0,n).reduce((a,b)=>a+b,0)+(rest>0?Math.ceil(measure.measureText(label).width+extra):0)+gap*Math.max(0,n+(rest>0?1:0)-1);if(needed<=row.clientWidth-1)break}
 n=Math.max(0,n);buttons.forEach((b,i)=>b.hidden=i>=n);more.hidden=total<=n;const label='+'+(total-n);if(more.textContent!==label)more.textContent=label;
}
function scheduleTagFit(){cancelAnimationFrame(tagFitFrame);tagFitFrame=requestAnimationFrame(()=>document.querySelectorAll('.card-tags').forEach(fitCardTags))}
const tagSizeObserver=new ResizeObserver(scheduleTagFit);
document.fonts.ready.then(scheduleTagFit);

function render(){
 tagSizeObserver.disconnect();scheduleTagFit();
 renderCategories();
 videoObserver.disconnect();for(const v of document.querySelectorAll('.card video'))v.pause();;
 const term=$('search').value.toLowerCase(),base=items.find(x=>x.id===similarId);
 let rows=items.filter(x=>(!favoriteOnly||x.favorite)&&(!selectedColors.size||itemColors(x).some(c=>selectedColors.has(c)))&&(!$('field').value||x.field===$('field').value)&&(!$('type').value||x.type===$('type').value)&&(!$('tone').value||(x.tones||[]).includes($('tone').value))&&(!selectedTags.size||($('tagmode').value==='all'?[...selectedTags].every(t=>allTags(x).includes(t)):[...selectedTags].some(t=>allTags(x).includes(t))))&&[x.title,x.titles?.ko||'',x.titles?.en||'',x.notes,...allTags(x),x.field,x.type,...itemColors(x),...(x.tones||[])].flatMap(v=>[v,englishText(v)]).join(' ').toLowerCase().includes(term)&&(!base||x.id!==base.id));
 if(base)rows.sort((a,b)=>score(base,b)-score(base,a));else if($('sort').value==='hue')rows.sort((a,b)=>a.hue-b.hue);else if($('sort').value==='title')rows.sort((a,b)=>displayTitle(a).localeCompare(displayTitle(b),uiLanguage));else if($('sort').value==='new')rows.sort((a,b)=>new Date(b.addedAt)-new Date(a.addedAt));
 $('resultcount').textContent=rows.length+' / '+items.length;$('all').classList.toggle('active',!favoriteOnly);$('favorites').classList.toggle('active',favoriteOnly);$('similarbar').hidden=!base;$('similartitle').textContent=base?'“'+displayTitle(base)+'”와 유사한 순서 · 태그·유형·컬러 기준':'';$('group').disabled=!!base;$('sort').disabled=!!base;
 $('activefilters').replaceChildren();for(const t of selectedTags)$('activefilters').append(chip('#'+t+' ×',true,()=>toggleTag(t)));for(const c of selectedColors)$('activefilters').append(chip(c+' ×',true,()=>{selectedColors.delete(c);renderFacets();render()}));
 const multi=['color','tone','tags'].includes($('group').value)&&!base;$('groupnote').hidden=!multi;
 $('content').replaceChildren();if(!rows.length){let e=document.createElement('div');e.className='empty';e.textContent='조건에 맞는 이미지가 없습니다. 필터를 바꾸거나 초기화해 주세요.';$('content').append(e);return}
 const groups=new Map();for(const x of rows){let keys=[''];if(!base){const g=$('group').value;if(g==='color')keys=itemColors(x);else if(g==='tone')keys=x.tones?.length?x.tones:['기타 톤'];else if(g==='tags')keys=selectedTags.size?allTags(x).filter(t=>selectedTags.has(t)):allTags(x);else if(g)keys=[x[g]]}for(const k of keys){if(!groups.has(k))groups.set(k,[]);groups.get(k).push(x)}}
 for(const [name,list]of groups){if(name){let h=document.createElement('h2');h.className='group-title';h.append(document.createTextNode(name));let count=document.createElement('small');count.textContent=list.length+'개';h.append(count);if($('group').value==='tags'){let b=document.createElement('button');b.textContent='필터';b.onclick=()=>toggleTag(name);h.append(b)}$('content').append(h)}let grid=document.createElement('div');grid.className='grid';for(const x of list)grid.append(card(x,base));$('content').append(grid)}
}
function card(x,base){let card=document.createElement('article');card.className='card';card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',displayTitle(x)+' 상세');card.dataset.id=x.id;let wrap=document.createElement('div');wrap.className='image-wrap';let img=document.createElement('img');img.src=x.image;img.alt=displayTitle(x);img.loading='lazy';img.width=x.width;img.height=x.height;let star=document.createElement('button');star.className='star';star.textContent=x.favorite?'★':'☆';star.setAttribute('aria-label',displayTitle(x)+' 관심 이미지');star.setAttribute('aria-pressed',String(!!x.favorite));star.onclick=async e=>{e.stopPropagation();try{await api('/api/edit',{id:x.id,favorite:!x.favorite});x.favorite=!x.favorite;render()}catch(e){toast(e.message)}};wrap.append(img);addVideo(wrap,x);wrap.append(star);let info=document.createElement('div');info.className='info';let h=document.createElement('h3');h.textContent=displayTitle(x);let meta=document.createElement('div');meta.className='meta';let label=document.createElement('span');label.textContent=base?'유사도 '+score(base,x).toFixed(1):x.field+' · '+x.type;let pal=document.createElement('span');pal.className='palette';palette(pal,x);meta.append(label,pal);let tags=document.createElement('div');tags.className='card-tags';const values=allTags(x);tags.dataset.total=values.length;for(const t of values.slice(0,4)){let b=chip(displayTerm(t),selectedTags.has(t),e=>{e.stopPropagation();toggleTag(t)});tags.append(b)}let more=chip('+0',false,e=>{e.stopPropagation();openItem(x.id)});more.classList.add('tag-more');more.hidden=true;tags.append(more);tagSizeObserver.observe(tags);info.append(h,meta,tags);card.append(wrap,info);card.onclick=()=>openItem(x.id);card.onkeydown=e=>{if(e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openItem(x.id)}};return card}
function openItem(id){$('preview').toggleAttribute('data-trim-source-border',id==='588845720085546945');selected=items.find(x=>x.id===id);if(!selected)return;$('preview').src=selected.image;$('preview').alt=displayTitle(selected);$('source').href=selected.source;for(const [a,b]of [['editfield','field'],['edittype','type'],['notes','notes']])$(a).value=selected[b];$('title').value=selected.titles?.ko||(/[가-힣]/.test(selected.title)?selected.title:'');$('titleEn').value=selected.titles?.en||(!/[가-힣]/.test(selected.title)?selected.title:'');$('titleOrigin').textContent=({'visual-description':'이미지와 원문을 참고해 정리한 제목',pinterest:'Pinterest 제목·설명에서 가져온 제목',placeholder:'정보가 없어 붙인 임시 제목',user:'사용자가 편집한 제목'})[selected.titleOrigin]||'Pinterest 제목·설명에서 가져온 제목';$('originalTitle').textContent=selected.originalTitle||'';$('originalTitle').hidden=!(selected.originalTitle||'').replace(/^포함된 이미지:\s*/,'').trim();$('titleTranslationNote').textContent=selected.titles?.ko&&selected.titles?.en?'한국어·영어 표시 제목을 각각 편집할 수 있습니다.':'번역이 없는 언어는 원문 제목을 표시합니다.';$('tags').value=(selected.tags||[]).map(displayTerm).join(', ');$('favorite').checked=selected.favorite;$('method').textContent=selected.classification+' · '+selected.width+'×'+selected.height+(selected.videoPreviewOnly?' · 최대 30초 미리보기 · 전체 영상은 원본 링크':'');$('detailcolors').textContent='컬러: '+itemColors(selected).join(', ')+' / 톤: '+(selected.tones||[]).join(', ');palette($('detailpalette'),selected);$('suggestions').replaceChildren();for(const t of Object.values(catalog.tagGroups||{}).flat().filter(t=>!(catalog.tagGroups.구도||[]).includes(t))){let b=chip(t,false,()=>{let values=$('tags').value.split(',').map(t=>canonicalTerm(t.trim())).filter(Boolean);if(!values.includes(t))values.push(t);$('tags').value=values.map(displayTerm).join(', ')});$('suggestions').append(b)}$('preview').hidden=!!selected.videoSrc;$('previewVideo').hidden=!selected.videoSrc;if(selected.videoSrc){const v=$('previewVideo');v.src=selected.videoSrc;v.poster=selected.image;v.muted=true;v.onerror=()=>{v.hidden=true;$('preview').hidden=false};if(autoVideos)v.play().catch(()=>{})}$('modal').showModal();refreshVideos()}
$('edit').onsubmit=async e=>{e.preventDefault();$('save').disabled=true;try{await api('/api/edit',{id:selected.id,titles:{ko:$('title').value,en:$('titleEn').value},field:$('editfield').value,type:$('edittype').value,notes:$('notes').value,tags:[...new Set($('tags').value.split(',').map(x=>canonicalTerm(x.trim())).filter(Boolean))],favorite:$('favorite').checked});$('modal').close();await load();toast('저장했습니다.')}catch(e){toast(e.message)}finally{$('save').disabled=false}};
let backdropDown=false;
const outsideModal=e=>{const r=$('modal').getBoundingClientRect();return e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom};
$('modal').addEventListener('pointerdown',e=>{backdropDown=e.target===$('modal')&&outsideModal(e)});
$('modal').addEventListener('click',e=>{if(backdropDown&&e.target===$('modal')&&outsideModal(e))$('modal').close();backdropDown=false});
$('close').onclick=()=>$('modal').close();$('similar').onclick=()=>{similarId=selected.id;resetFilters();$('modal').close();render()};$('clearSimilar').onclick=()=>{similarId=null;render()};
for(const id of ['field','type','tone','group','sort','search','tagmode'])$(id).addEventListener(id==='search'?'input':'change',render);$('tagsearch').oninput=renderFacets;$('all').onclick=()=>{favoriteOnly=false;render()};$('favorites').onclick=()=>{favoriteOnly=!favoriteOnly;render()};
function resetFilters(){for(const id of ['field','type','tone','search','tagsearch'])$(id).value='';selectedColors.clear();selectedTags.clear();favoriteOnly=false;renderFacets()}
$('reset').onclick=()=>{resetFilters();similarId=null;render()};
for(const [id,route]of [['sync','/api/sync'],['login','/api/login'],['loginDone','/api/login-complete']])$(id).onclick=async()=>{const b=$(id);b.disabled=true;try{await api(route,{});updateState(await api('/api/status'))}catch(e){toast(e.message)}finally{b.disabled=false;updateState(state)}};
$('package').onclick=async()=>{const b=$('package');b.disabled=true;try{toast('현재 자료를 포함한 보관본을 만들고 있습니다.');const d=await api('/api/export-package',{});const a=document.createElement('a');a.href=d.url;a.download='research-library.zip';a.click();toast('보관본을 저장했습니다. 앱의 exports/latest 폴더에도 있습니다.')}catch(e){toast(e.message)}finally{b.disabled=false}};
$('shutdown').onclick=async()=>{if(confirm(displayTerm('수집기를 종료할까요? 다시 실행하려면 START.cmd를 여세요.'))){try{await api('/api/shutdown',{});toast('수집기를 종료했습니다.')}catch(e){toast(e.message)}}};
async function poll(){if(polling)return;polling=true;try{const next=await api('/api/status');const changed=next.lastSuccess!==state.lastSuccess||next.added!==state.added;updateState(next);if(changed)await load()}catch{$('syncmessage').textContent='수집기 연결이 끊겼습니다. START.cmd로 실행해 주세요.';$('syncmeta').textContent='연결되지 않은 동안에는 자동 업데이트되지 않습니다.';$('dot').style.background='#b9664c'}finally{polling=false}}
$('export').onclick=e=>{e.preventDefault();const url=URL.createObjectURL(new Blob([JSON.stringify({items:SNAPSHOT.items},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='research-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000)};
load().catch(e=>toast(e.message));

})().catch(error=>{console.error(error);document.getElementById("syncmessage").textContent=error.message;});
