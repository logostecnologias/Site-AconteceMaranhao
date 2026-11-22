/* Acontece Maranhão — protótipo do site. Monta topo, rodapé e as páginas a partir de data.js (matérias reais do site). */
const P=[...window.POSTS].sort((a,b)=>b.date.localeCompare(a.date));
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const byId=id=>P.find(p=>p.id==id);
const url=p=>`materia.html?id=${p.id}`;
const realUrl=p=>`https://acontecemaranhao.com.br/${p.slug}/`;
const chap=p=>p.cidade||'Maranhão';
const pad=n=>String(n).padStart(2,'0');
const dt=iso=>new Date(iso);
const hora=iso=>{const d=dt(iso);return `${d.getHours()}h${pad(d.getMinutes())}`};
const dia=iso=>{const d=dt(iso);return `${pad(d.getDate())}/${pad(d.getMonth()+1)}`};
const dataLonga=iso=>{const d=dt(iso);return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} às ${hora(iso)}`};
const fina=p=>{const t=p.excerpt.replace(/\s+/g,' ').trim();const m=t.match(/^.{60,190}?[.!?](\s|$)/);return m?m[0].trim():t.slice(0,170).replace(/\s\S*$/,'')+'…'};
const ph=(p,ratio)=>`<div class="ph"${ratio?` style="aspect-ratio:${ratio}"`:''}>${p.img?`<img src="${p.img}" alt="" loading="lazy">`:''}</div>`;
const slug=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

const IC={
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 whatsapp:'<path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z"/><path d="M8.9 8.3c.3-.6.6-.6.9-.6h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.6-.3.3c-.1.1-.2.3-.1.5.3.6.8 1.3 1.4 1.8.7.6 1.3.9 1.9 1.1.2.1.4 0 .5-.1l.7-.8c.2-.2.3-.2.6-.1l1.7.8c.3.1.4.2.4.4 0 .4-.1 1-.4 1.3-.4.5-1.2.9-1.9.9-.8 0-2.3-.4-4-1.9-1.6-1.4-2.6-3.2-2.8-3.8-.3-.8-.2-1.9.2-2.5z" fill="currentColor" stroke="none"/>',
 instagram:'<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
 facebook:'<path d="M13.5 21v-7.5h2.6l.4-3.1h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.8v3.1h2.6V21z" fill="currentColor" stroke="none"/>',
 x:'<path d="M4 4h4.2l11.8 16h-4.2z" fill="currentColor" stroke="none"/><path d="M19.5 4 13 11.3M4.5 20l6.6-7.4"/>',
 telegram:'<path d="M20.5 4.2 3.6 10.8c-.9.4-.9 1.1 0 1.4l4.3 1.4 1.6 5c.2.6.6.7 1 .3l2.4-2.2 4.6 3.4c.6.4 1.1.2 1.3-.6l2.9-13.7c.2-1.1-.4-1.6-1.2-1.3z"/><path d="m8 13.5 9-6"/>',
 linkedin:'<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-3.2c0-1.4.9-2.3 2-2.3s2 .8 2 2.3V16M11.5 10.5V16"/>',
 link:'<path d="M10 14a4.2 4.2 0 0 0 6 0l3-3a4.2 4.2 0 0 0-6-6l-1 1"/><path d="M14 10a4.2 4.2 0 0 0-6 0l-3 3a4.2 4.2 0 0 0 6 6l1-1"/>',
 youtube:'<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>',
 play:'<path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 close:'<path d="M6 6l12 12M18 6 6 18"/>',
 mail:'<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>',
 yt:'<rect x="1.5" y="5" width="21" height="14" rx="4.5" fill="#FF0000" stroke="none"/><path d="m10 9 5.2 3-5.2 3z" fill="#fff" stroke="none"/>'
};
const icon=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
const GOOGLE_G='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

/* Links externos */
/* Redes do Acontece Maranhão: YouTube, WhatsApp, Telegram, Instagram e X (links tirados do site atual; Telegram ainda sem endereço) */
const WA_CANAL='https://whatsapp.com/channel/0029VaEszsV5vKAHEeERpi0s';
const SOCIAL=[['youtube','YouTube','https://www.youtube.com/@podaconteceroficial'],['whatsapp','WhatsApp',WA_CANAL],['telegram','Telegram','https://t.me/acontecemaranhao2'],['instagram','Instagram','https://www.instagram.com/acontece_maranhao/'],['x','X','https://x.com/acontece_ma']];
const socLinks=()=>SOCIAL.filter(x=>x[2]).map(([k,n,h])=>`<a href="${h}"${h[0]==='#'?' data-tg':' target="_blank" rel="noopener"'} aria-label="${n} do Acontece Maranhão">${icon(k)}</a>`).join('');
const YT_POD='https://www.youtube.com/@podaconteceroficial';
const GOOGLE_FOLLOW='https://www.google.com/preferences/source?q=acontecemaranhao.com.br';
/* Endpoint do backend que recebe o cadastro do modal e diz se o visitante já respondeu (por IP/telefone). No protótipo fica vazio: vale só a checagem pelo navegador. */
const LEAD_API='';
const ls={get:k=>{try{return localStorage.getItem(k)}catch(_){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}}};
const ss={get:k=>{try{return sessionStorage.getItem(k)}catch(_){return null}},set:(k,v)=>{try{sessionStorage.setItem(k,v)}catch(_){}}};

/* Dicas por categoria */
const DICAS_CAT=[{s:'lazer',n:'Lazer'},{s:'alimentacao',n:'Alimentação'},{s:'compras',n:'Compras'},{s:'servicos',n:'Serviços'},{s:'beleza',n:'Beleza e bem-estar'},{s:'dinheiro',n:'Dinheiro'}];
const DICAS=[
 ['lazer','O que fazer no fim de semana na Grande Ilha','Shows, feiras e programação gratuita.'],
 ['lazer','As praias mais tranquilas de São Luís para ir com crianças','Onde a maré ajuda e tem estrutura.'],
 ['lazer','Lençóis Maranhenses: a melhor época para ver as lagoas cheias','Quando ir, como chegar e quanto custa.'],
 ['alimentacao','Onde comer arroz de cuxá de verdade em São Luís','Restaurantes e quiosques indicados por leitores.'],
 ['alimentacao','Feiras livres da capital: dias, horários e o que comprar','Da Praia Grande ao João Paulo.'],
 ['alimentacao','Juçara: como escolher e conservar a fruta da época','Dicas para não errar na compra.'],
 ['compras','Lojas com entrega no mesmo dia na Grande Ilha','Roupas, eletrônicos e presentes sem sair de casa.'],
 ['compras','Black Friday: onde encontrar desconto de verdade em São Luís','Lojas participantes e como comparar preços.'],
 ['compras','Onde comprar roupa de festa junina em São Luís','Do tecido de chita ao chapéu de vaqueiro.'],
 ['servicos','Como emitir a segunda via de documentos em São Luís','O passo a passo no Viva e no gov.br.'],
 ['servicos','Como pedir tapa-buraco ou troca de lâmpada na sua rua','Os canais da prefeitura que funcionam.'],
 ['servicos','Título de eleitor: como regularizar antes do prazo','O que dá para fazer pelo e-Título.'],
 ['beleza','Salões de São Luís que atendem aos domingos','Corte, unha e escova no fim de semana.'],
 ['beleza','Academias com aula experimental grátis na capital','Musculação, funcional e dança.'],
 ['beleza','Clínicas de estética com avaliação gratuita','O que perguntar antes de fechar um pacote.'],
 ['dinheiro','Como consultar o IPVA 2027 e as datas de pagamento','Valores, descontos e calendário por placa.'],
 ['dinheiro','Calendário do Bolsa Família no Maranhão','As datas de pagamento pelo final do NIS.'],
 ['dinheiro','Golpe do Pix: como se proteger e o que fazer se cair','O passo a passo junto ao banco.']
];
const catDica=s=>DICAS_CAT.find(c=>c.s===s);
const dicaCard=x=>{const [k,t,d]=x;return `<a class="dica" href="index.html?dica=${k}&n=${DICAS.indexOf(x)}"><span class="k">${catDica(k).n}</span><h3 class="hl">${t}</h3><p>${d}</p></a>`};
const dicasGrid=k=>(k?DICAS.filter(x=>x[0]===k):DICAS_CAT.map(c=>DICAS.find(x=>x[0]===c.s))).map(dicaCard).join('');

/* Os 217 municípios do Maranhão (IBGE). Cada um tem sua página de notícias. */
const CIDADES=["Açailândia", "Afonso Cunha", "Água Doce do Maranhão", "Alcântara", "Aldeias Altas", "Altamira do Maranhão", "Alto Alegre do Maranhão", "Alto Alegre do Pindaré", "Alto Parnaíba", "Amapá do Maranhão", "Amarante do Maranhão", "Anajatuba", "Anapurus", "Apicum-Açu", "Araguanã", "Araioses", "Arame", "Arari", "Axixá", "Bacabal", "Bacabeira", "Bacuri", "Bacurituba", "Balsas", "Barão de Grajaú", "Barra do Corda", "Barreirinhas", "Bela Vista do Maranhão", "Belágua", "Benedito Leite", "Bequimão", "Bernardo do Mearim", "Boa Vista do Gurupi", "Bom Jardim", "Bom Jesus das Selvas", "Bom Lugar", "Brejo", "Brejo de Areia", "Buriti", "Buriti Bravo", "Buriticupu", "Buritirana", "Cachoeira Grande", "Cajapió", "Cajari", "Campestre do Maranhão", "Cândido Mendes", "Cantanhede", "Capinzal do Norte", "Carolina", "Carutapera", "Caxias", "Cedral", "Central do Maranhão", "Centro do Guilherme", "Centro Novo do Maranhão", "Chapadinha", "Cidelândia", "Codó", "Coelho Neto", "Colinas", "Conceição do Lago-Açu", "Coroatá", "Cururupu", "Davinópolis", "Dom Pedro", "Duque Bacelar", "Esperantinópolis", "Estreito", "Feira Nova do Maranhão", "Fernando Falcão", "Formosa da Serra Negra", "Fortaleza dos Nogueiras", "Fortuna", "Godofredo Viana", "Gonçalves Dias", "Governador Archer", "Governador Edison Lobão", "Governador Eugênio Barros", "Governador Luiz Rocha", "Governador Newton Bello", "Governador Nunes Freire", "Graça Aranha", "Grajaú", "Guimarães", "Humberto de Campos", "Icatu", "Igarapé do Meio", "Igarapé Grande", "Imperatriz", "Itaipava do Grajaú", "Itapecuru Mirim", "Itinga do Maranhão", "Jatobá", "Jenipapo dos Vieiras", "João Lisboa", "Joselândia", "Junco do Maranhão", "Lago da Pedra", "Lago do Junco", "Lago dos Rodrigues", "Lago Verde", "Lagoa do Mato", "Lagoa Grande do Maranhão", "Lajeado Novo", "Lima Campos", "Loreto", "Luís Domingues", "Magalhães de Almeida", "Maracaçumé", "Marajá do Sena", "Maranhãozinho", "Mata Roma", "Matinha", "Matões", "Matões do Norte", "Milagres do Maranhão", "Mirador", "Miranda do Norte", "Mirinzal", "Monção", "Montes Altos", "Morros", "Nina Rodrigues", "Nova Colinas", "Nova Iorque", "Nova Olinda do Maranhão", "Olho d'Água das Cunhãs", "Olinda Nova do Maranhão", "Paço do Lumiar", "Palmeirândia", "Paraibano", "Parnarama", "Passagem Franca", "Pastos Bons", "Paulino Neves", "Paulo Ramos", "Pedreiras", "Pedro do Rosário", "Penalva", "Peri Mirim", "Peritoró", "Pindaré-Mirim", "Pinheiro", "Pio XII", "Pirapemas", "Poção de Pedras", "Porto Franco", "Porto Rico do Maranhão", "Presidente Dutra", "Presidente Juscelino", "Presidente Médici", "Presidente Sarney", "Presidente Vargas", "Primeira Cruz", "Raposa", "Riachão", "Ribamar Fiquene", "Rosário", "Sambaíba", "Santa Filomena do Maranhão", "Santa Helena", "Santa Inês", "Santa Luzia", "Santa Luzia do Paruá", "Santa Quitéria do Maranhão", "Santa Rita", "Santana do Maranhão", "Santo Amaro do Maranhão", "Santo Antônio dos Lopes", "São Benedito do Rio Preto", "São Bento", "São Bernardo", "São Domingos do Azeitão", "São Domingos do Maranhão", "São Félix de Balsas", "São Francisco do Brejão", "São Francisco do Maranhão", "São João Batista", "São João do Carú", "São João do Paraíso", "São João do Soter", "São João dos Patos", "São José de Ribamar", "São José dos Basílios", "São Luís", "São Luís Gonzaga do Maranhão", "São Mateus do Maranhão", "São Pedro da Água Branca", "São Pedro dos Crentes", "São Raimundo das Mangabeiras", "São Raimundo do Doca Bezerra", "São Roberto", "São Vicente Ferrer", "Satubinha", "Senador Alexandre Costa", "Senador La Rocque", "Serrano do Maranhão", "Sítio Novo", "Sucupira do Norte", "Sucupira do Riachão", "Tasso Fragoso", "Timbiras", "Timon", "Trizidela do Vale", "Tufilândia", "Tuntum", "Turiaçu", "Turilândia", "Tutóia", "Urbano Santos", "Vargem Grande", "Viana", "Vila Nova dos Martírios", "Vitória do Mearim", "Vitorino Freire", "Zé Doca"];
/* Nomes curtos que o site antigo usava → nome oficial. */
const APELIDO={'Água Doce':'Água Doce do Maranhão','Centro Novo':'Centro Novo do Maranhão','Itapecuru':'Itapecuru Mirim','Itapecuru-Mirim':'Itapecuru Mirim','Nova Olinda':'Nova Olinda do Maranhão','Olinda Nova':'Olinda Nova do Maranhão','Santo Amaro':'Santo Amaro do Maranhão','balsas':'Balsas','Tutoia':'Tutóia'};
P.forEach(p=>{if(APELIDO[p.cidade])p.cidade=APELIDO[p.cidade]});
/* Matérias da categoria Política (no site, a redação marca). */
const POL_IDS=[72826,72472,72615,73301,73721,68580,68596,68602,69036];

const COLUNISTAS=[
 {s:'bastidores',n:'Ana Beatriz Lima',c:'Bastidores',cor:'#8E0509',d:'O que se negocia nos gabinetes de São Luís antes de virar notícia.',t:'Quem já conta votos para a Mesa da Assembleia em 2027'},
 {s:'economia-ma',n:'Carlos Henrique Sousa',c:'Economia MA',cor:'#1F2A44',d:'Dinheiro, emprego e investimento no Maranhão, explicados sem economês.',t:'O que o Porto do Itaqui pode render ao estado no ano que vem'},
 {s:'cidade-em-foco',n:'Juliana Costa',c:'Cidade em foco',cor:'#0F6B4F',d:'Os problemas e as soluções de São Luís, bairro por bairro.',t:'O que ainda falta para o Centro Histórico de São Luís'},
 {s:'arquibancada',n:'Roberto Almeida',c:'Arquibancada',cor:'#5B3FA8',d:'O futebol maranhense da base ao profissional.',t:'O planejamento do Sampaio para a próxima temporada'},
 {s:'saude-em-pauta',n:'Fernanda Ribeiro',c:'Saúde em pauta',cor:'#0B6E8A',d:'Hospitais, filas e políticas de saúde no estado.',t:'Por que as filas de cirurgia ainda crescem no interior'},
 {s:'direito-e-justica',n:'Marcos Vinícius Teles',c:'Direito e Justiça',cor:'#3A3A3A',d:'Decisões dos tribunais que mudam a vida de quem mora no Maranhão.',t:'O que a nova decisão do TJMA muda para servidores'},
 {s:'interior-em-pauta',n:'Rafael Moura',c:'Interior em pauta',cor:'#9A5B00',d:'Prefeituras, câmaras e a política longe da capital.',t:'As cidades que mais receberam emendas este ano'},
 {s:'cultura-ma',n:'Luana Ferreira',c:'Cultura MA',cor:'#B0124F',d:'Bumba meu boi, reggae, teatro e quem faz a cultura do estado.',t:'O que muda no calendário do São João de 2027'},
 {s:'agro-maranhao',n:'Diego Martins',c:'Agro Maranhão',cor:'#3F6B12',d:'Soja, gado e o campo no sul do estado.',t:'Balsas e a safra recorde: quem ganha e quem fica de fora'},
 {s:'educacao',n:'Patrícia Nunes',c:'Educação',cor:'#2D4BA0',d:'Escola pública, universidades e o futuro dos estudantes.',t:'O que os números do Ideb dizem sobre as escolas da capital'},
 {s:'gente-e-sociedade',n:'Sílvia Campos',c:'Gente & Sociedade',cor:'#7A2E8C',d:'Eventos, personagens e a vida social de São Luís.',t:'Os encontros que movimentaram a Ilha neste fim de semana'},
 {s:'tecnologia',n:'Thiago Barbosa',c:'Tecnologia',cor:'#0E7C66',d:'Tecnologia, internet e serviços digitais no dia a dia do maranhense.',t:'Golpes pelo WhatsApp: os mais comuns no estado este mês'}
];
/* Redes de cada colunista. Endereços de exemplo: trocar pelos perfis reais. */
const handle=c=>c.n.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z]/g,'');
const REDES=[['youtube','YouTube','#FF0000',h=>`https://www.youtube.com/@${h}`],['whatsapp','WhatsApp','#1FA855',h=>`https://whatsapp.com/channel/${h}`],['telegram','Telegram','#229ED9',h=>`https://t.me/${h}`],['instagram','Instagram','#D6246E',h=>`https://www.instagram.com/${h}/`],['x','X','#000000',h=>`https://x.com/${h}`]];
const colSoc=c=>`<div class="col-soc" aria-label="Redes sociais de ${esc(c.n)}"><b>Siga ${esc(c.n.split(' ')[0])}</b>${REDES.map(([k,n,cor,u])=>`<a href="${u(handle(c))}" target="_blank" rel="noopener" style="--c:${cor}" aria-label="${n} de ${esc(c.n)}">${icon(k)}<span>${n}</span></a>`).join('')}</div>`;
/* No celular cada lista mostra só 3 itens; este botão abre o resto */
const verTodas=(t='Ver tudo')=>`<button class="ver-todas" type="button" data-vertodas>${t}</button>`;
/* Item da lista de últimas notícias, com foto */
const ultItem=(x,a,b,ch)=>`<a href="${url(x)}"><span class="when"><b>${a}</b>${b}</span>${ph(x)}<div><span class="chap">${esc(ch)}</span><h3 class="hl">${esc(x.title)}</h3></div></a>`;
const ini=n=>n.split(' ').filter(w=>w.length>2||/^[A-ZÁÉ]/.test(w)).map(x=>x[0]).slice(0,2).join('');

/* ---------- topo e rodapé ---------- */
function header(active){
 const hoje=new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 const NAV=[['index.html','Início','inicio'],['index.html?ultimas=1','Últimas notícias','ultimas'],[null,'Colunistas','colunistas'],[null,'Cidades','cidades'],['index.html?cat=politica','Política','politica'],['index.html#podcast','Podcast','podcast'],[null,'Dicas','dicas'],['index.html?pagina=contato','Contato','contato']];
 return `<div class="util"><div class="wrap"><span>${hoje[0].toUpperCase()+hoje.slice(1)}</span><span class="sp"></span><a class="hide-sm" href="index.html?pagina=anuncie">Anuncie</a><a class="hide-sm" href="#newsletter" data-nl>Newsletter</a>
  <span class="soc">${socLinks()}</span></div></div>
 <header class="band"><div class="wrap"><button class="ibtn menu-btn" type="button" data-menu aria-expanded="false" aria-controls="drawer">${icon('menu')}<span class="hide-sm">Menu</span></button><a class="logo" href="index.html" aria-label="Acontece Maranhão, página inicial"><img src="logo-acontece-maranhao.svg" alt="Acontece Maranhão"></a><span class="sp"></span>
  <button class="ibtn icon" data-busca aria-label="Buscar">${icon('search')}</button><a class="ibtn hide-sm" href="${WA_CANAL}" target="_blank" rel="noopener" data-canal>${icon('whatsapp')}Canal no WhatsApp</a><a class="ibtn yt hide-sm" href="${YT_POD}" target="_blank" rel="noopener" data-yt>${icon('yt')}Inscreva-se no YouTube</a></div></header>
 ${drawer()}
 <nav class="nav" aria-label="Seções"><div class="wrap">${NAV.map(([h,l,k])=>h?`<a href="${h}"${k===active?' aria-current="page"':''}>${l}</a>`:`<button type="button" data-mega="${k}" aria-expanded="false"${k===active?' aria-current="page"':''}>${l}<span class="chev" aria-hidden="true">▾</span></button>`).join('')}</div><button class="nav-hint nav-hint-r" type="button" tabindex="-1" aria-hidden="true" data-navscroll="1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg></button><button class="nav-hint nav-hint-l" type="button" tabindex="-1" aria-hidden="true" data-navscroll="-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg></button></nav>
 <div class="mega mega-col" id="mega-colunistas" hidden><div class="wrap"><ul>${COLUNISTAS.map(c=>`<li><a href="index.html?coluna=${c.s}"><b>${c.n}</b><span>${c.c}</span></a></li>`).join('')}</ul><a class="mega-all" href="index.html#colunistas">Ver todas as colunas</a></div></div>
 <div class="mega" id="mega-cidades" hidden><div class="wrap"><h3>Notícias por cidade · os ${CIDADES.length} municípios do Maranhão</h3><ul>${CIDADES.map(c=>`<li><a href="index.html?cidade=${encodeURIComponent(c)}">${c}</a></li>`).join('')}</ul></div></div>
 <div class="mega" id="mega-dicas" hidden><div class="wrap"><h3>Dicas por categoria</h3><ul>${DICAS_CAT.map(c=>`<li><a href="index.html?dica=${c.s}">${c.n}</a></li>`).join('')}</ul></div></div>
 <div class="agora"><div class="wrap"><span class="lab"><i class="pulse" aria-hidden="true"></i>Agora</span><a id="agora" href="${url(P[0])}">${esc(P[0].title)}</a><span class="t" id="agoraT">${hora(P[0].date)}</span></div></div>`;
}
function drawer(){
 const L=[['index.html','Início'],['index.html?ultimas=1','Últimas notícias']];
 const L2=[['index.html?pagina=contato','Contato'],['index.html?pagina=anuncie','Anuncie']];
 const lk=([h,l])=>`<a href="${h}" data-close>${l}</a>`;
 return `<div class="drawer" id="drawer" aria-hidden="true"><div class="scrim" data-close></div>
 <aside class="panel" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="panel-top"><a href="index.html"><img src="logo-acontece-maranhao-vermelha.svg" alt="Acontece Maranhão"></a><button class="x" type="button" data-close aria-label="Fechar menu">${icon('close')}</button></div>
  <div class="panel-soc">${socLinks()}</div>
  <a class="gnews" href="#" data-gnews><b>Siga no</b><i class="gdot" aria-hidden="true"></i>Google Notícias</a>
  <nav class="panel-nav" aria-label="Todas as seções">
   ${L.map(lk).join('')}
   <details><summary>Colunistas</summary><div class="sub-list">${COLUNISTAS.map(x=>`<a href="index.html?coluna=${x.s}">${x.n}<small>${x.c}</small></a>`).join('')}</div></details>
   <details><summary>Cidades</summary><div class="sub-list">${['São Luís','Imperatriz','Caxias','Timon','Bacabal','Codó','Balsas','Pinheiro','Carutapera','Santa Inês'].map(c=>`<a href="index.html?cidade=${encodeURIComponent(c)}">${c}</a>`).join('')}<button type="button" class="all" data-mega="cidades" data-close>Todos os ${CIDADES.length} municípios</button></div></details>
   ${lk(['index.html?cat=politica','Política'])}${lk(['index.html#podcast','Podcast'])}
   <details><summary>Dicas</summary><div class="sub-list">${DICAS_CAT.map(c=>`<a href="index.html?dica=${c.s}">${c.n}</a>`).join('')}</div></details>
   ${L2.map(lk).join('')}
  </nav>
  <div class="panel-mais"><b>Mais lidas</b>${MAIS_LIDAS.map(byId).filter(Boolean).map(x=>`<a href="${url(x)}">${ph(x)}<span>${esc(x.title)}</span></a>`).join('')}</div>
  <div class="panel-cta"><a class="btn-wa" href="${WA_CANAL}" target="_blank" rel="noopener" data-canal>${icon('whatsapp')}Entrar no canal do WhatsApp</a><a class="btn-yt" href="${YT_POD}" target="_blank" rel="noopener" data-yt>${icon('yt')}Inscreva-se no YouTube</a></div>
 </aside></div>`;
}
function abrirMenu(open){const d=$('#drawer');d.classList.toggle('open',open);d.setAttribute('aria-hidden',!open);document.body.style.overflow=open?'hidden':'';document.querySelectorAll('[data-menu]').forEach(b=>b.setAttribute('aria-expanded',open));if(open)setTimeout(()=>d.querySelector('.x').focus(),50);else{const b=document.querySelector('[data-menu]');b&&b.focus()}}
function footer(){
 return `<footer class="foot" id="contato"><div class="wrap"><div class="foot-grid">
  <div><img src="logo-acontece-maranhao.svg" alt="Acontece Maranhão"><p>O portal de notícias do Maranhão. Política, cidades e o que acontece no estado, todos os dias.</p>
   <div class="soc">${socLinks()}</div></div>
  <div><h4>Seções</h4><ul><li><a href="index.html?ultimas=1">Últimas notícias</a></li><li><a href="index.html?cat=politica">Política</a></li><li><a href="index.html#colunistas">Colunistas</a></li><li><a href="index.html#podcast">Podcast</a></li><li><a href="index.html?dicas=1">Dicas</a></li></ul></div>
  <div><h4>Cidades</h4><ul>${['São Luís','Imperatriz','Caxias','Timon','Bacabal','Carutapera'].map(c=>`<li><a href="index.html?cidade=${encodeURIComponent(c)}">${c}</a></li>`).join('')}</ul></div>
  <div><h4>Acontece</h4><ul><li><a href="index.html?pagina=anuncie">Anuncie</a></li><li><a href="index.html?pagina=expediente">Expediente</a></li><li><a href="index.html?pagina=contato">Fale com a redação</a></li><li><a href="index.html?pagina=privacidade">Política de privacidade</a></li></ul></div>
 </div><div class="foot-base"><span>© ${new Date().getFullYear()} Acontece Maranhão. Uma empresa do Acontece Group.</span></div></div></footer>
 ${ytBar()}
 <div class="toast" id="toast" role="status" hidden></div>`;
}

/* ---------- blocos reutilizáveis ---------- */
/* Newsletter (modelo Metrópoles: cartão vermelho, avatar, e-mail + Assinar, "Ver todas as newsletters") */
function convite(){
 return `<aside class="nlbox" aria-label="Newsletter do Acontece Maranhão">
  <div class="nlbox-top"><span class="nlbox-av"><img src="logo-acontece-maranhao-quadrada.svg" alt=""></span>
   <div><b>Receba no seu e-mail as principais notícias do Acontece Maranhão</b><span>Frequência de envio: <strong>Diário</strong></span></div></div>
  <form class="nlbox-f" data-nlform><input type="email" placeholder="Preencha seu e-mail" required aria-label="Seu e-mail"><button type="submit">Assinar</button></form>
  <a class="nlbox-all" href="index.html#newsletter">Ver todas as newsletters ${icon('mail')}</a>
 </aside>`;
}
/* Botão grande do canal (no lugar do antigo bloco no meio da matéria) */
const waCanal=()=>`<a class="wa-bar" href="${WA_CANAL}" target="_blank" rel="noopener" data-canal>${icon('whatsapp')}<span>Entre no canal de WhatsApp do Acontece Maranhão</span></a>`;
/* Único botão de compartilhar */
const waSend=p=>`<a class="wa-send" href="https://wa.me/?text=${encodeURIComponent(p.title+' '+realUrl(p))}" target="_blank" rel="noopener">${icon('whatsapp')}<span><span class="ws-l">Enviar no </span>WhatsApp</span></a>`;
/* Compartilhar: botão do WhatsApp + ícones das outras redes do Acontece (Telegram, X, Instagram) e copiar link */
function shareRow(p){
 const u=realUrl(p),e=encodeURIComponent;
 const L=[['telegram','Telegram','#229ED9',`https://t.me/share/url?url=${e(u)}&text=${e(p.title)}`],['x','X','#000000',`https://x.com/intent/post?url=${e(u)}&text=${e(p.title)}`],['instagram','Instagram','#D6246E',null],['link','Copiar link','#121212',null]];
 return `<div class="share-row">${waSend(p)}${L.map(([k,n,c,h])=>h?`<a class="shi" style="--c:${c}" href="${h}" target="_blank" rel="noopener" aria-label="Compartilhar no ${n}" data-tip="${n}">${icon(k)}</a>`:`<button class="shi" type="button" style="--c:${c}" data-copy="${k}" data-url="${u}" aria-label="${k==='link'?'Copiar link':'Compartilhar no Instagram'}" data-tip="${n}">${icon(k)}</button>`).join('')}</div>`;
}
/* Seguir no Google (modelo CNN) */
const gFollow=stack=>`<aside class="gfollow${stack?' stack':''}" aria-label="Seguir no Google"><img src="logo-acontece-maranhao-quadrada.svg" alt="Acontece Maranhão"><p>Siga o Acontece Maranhão no Google e receba as principais notícias do Maranhão</p><a class="gbtn" href="${GOOGLE_FOLLOW}" target="_blank" rel="noopener">${GOOGLE_G}Seguir no Google</a></aside>`;
/* Banner fixo do YouTube: foto do canal + títulos dos episódios passando (vídeos reais do canal @podaconteceroficial) */
const EPS=[
 ['uHXkSYhRvyk','Episódio','Leonardo Arruda: Lahesio Bonfim, idade do suplente e polêmica sobre posse no Senado','19/11'],
 ['H6tADX82gDs','Episódio','Felipe Camarão: bastidores da campanha, relação com Brandão, Braide, Lula e futuro político','09/11'],
 ['v04MoxOPwkQ','Programa','Governo de transição, Famem e eleições da Assembleia Legislativa','07/11'],
 ['UH-aAiiEiS4','Corte','De olho em Brasília! Os próximos passos de Eliziane Gama, Fufuca e Camarão','30/10'],
 ['Bp2VWUlaK2M','Programa','Eleições 2026: o que muda no Maranhão?','29/10'],
 ['mvL7bRq0Qw0','Corte','Aldir Júnior prefeito de São Luís em 2028? PL mira futuro político do MA','23/10'],
 ['p4gvVQ57ftg','Corte','Brandão pode ficar sem aliados? O futuro do grupo político após 2026','19/10']
];
const ytVid=id=>id?`https://www.youtube.com/watch?v=${id}`:YT_POD;
const ytTag=t=>`<span class="yt-tag">${t}</span>`;
function ytBar(){
 const [id,t,tit]=EPS[0];
 return `<div class="ytbar" id="ytbar" role="region" aria-label="Pod Acontecer no YouTube" hidden><div class="ytbar-in">
  <a class="ytbar-av" href="${YT_POD}" target="_blank" rel="noopener" aria-label="Canal Pod Acontecer no YouTube"><img src="img/pod-acontecer.jpg" alt=""><span class="yt-badge">${icon('yt')}</span></a>
  <div class="ytbar-txt">
   <a class="yt-ch" href="${YT_POD}" target="_blank" rel="noopener"><b>Pod Acontecer</b><span>@podaconteceroficial · ${EPS.length} vídeos recentes</span></a>
   <div class="yt-roll" id="yt-roll">${ytTag(t)}<a class="yt-ep" id="yt-ep" href="${ytVid(id)}" target="_blank" rel="noopener">${esc(tit)}</a></div>
   <div class="yt-dots" aria-hidden="true">${EPS.map((_,i)=>`<i${i?'':' class="on"'}></i>`).join('')}</div>
  </div>
  <a class="ytbar-go" id="yt-go" href="${ytVid(id)}" target="_blank" rel="noopener" aria-label="Assistir no YouTube">${icon('yt')}<span>Assistir no YouTube</span></a>
  <button class="ytbar-x" type="button" aria-label="Fechar aviso do YouTube">${icon('close')}</button></div></div>`;
}
/* troca o episódio a cada 4,5 s; pausa com o mouse ou o foco em cima */
function rodarEps(){
 const bar=$('#ytbar'),roll=$('#yt-roll');if(!roll||rodarEps.on)return;rodarEps.on=true;
 let i=0,pausa=false;
 ['mouseenter','focusin'].forEach(ev=>bar.addEventListener(ev,()=>pausa=true));
 ['mouseleave','focusout'].forEach(ev=>bar.addEventListener(ev,()=>pausa=false));
 setInterval(()=>{
  if(pausa||bar.hidden||document.hidden)return;
  i=(i+1)%EPS.length;const [id,t,tit]=EPS[i];
  roll.classList.remove('in');roll.classList.add('out');
  setTimeout(()=>{
   roll.innerHTML=`${ytTag(t)}<a class="yt-ep" id="yt-ep" href="${ytVid(id)}" target="_blank" rel="noopener">${esc(tit)}</a>`;
   $('#yt-go').href=ytVid(id);
   bar.querySelectorAll('.yt-dots i').forEach((d,k)=>d.classList.toggle('on',k===i));
   roll.classList.remove('out');roll.classList.add('in');
  },350);
 },4500);
}
function related(p,n){
 const stop=new Set('para com sobre pela pelo pelos pelas entre após desde contra como mais muito dos das que uma por não diz tem são foi ser está'.split(' '));
 const words=t=>new Set(t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').split(/[^a-z0-9]+/).filter(w=>w.length>3&&!stop.has(w)));
 const w=words(p.title);
 return P.filter(x=>x.id!==p.id).map(x=>{let s=0;if(p.cidade&&x.cidade===p.cidade)s+=5;words(x.title).forEach(k=>{if(w.has(k))s+=2});return {x,s}}).sort((a,b)=>b.s-a.s||b.x.date.localeCompare(a.x.date)).slice(0,n).map(o=>o.x);
}
function leia(list){return `<aside class="leia" aria-label="Leia também"><b>Leia também</b>${list.map(x=>`<a href="${url(x)}">${ph(x)}<div><span class="chap">${esc(chap(x))}</span><h3 class="hl">${esc(x.title)}</h3></div></a>`).join('')}</aside>`}
function rank(ids){return `<div><h2 class="side-h">Mais lidas</h2><div class="rank lim">${ids.map(byId).filter(Boolean).map(x=>`<a href="${url(x)}">${ph(x)}<h3 class="hl">${esc(x.title)}</h3></a>`).join('')}</div>${verTodas()}</div>`}
/* Espaços de banner desligados por enquanto. Para voltar, troque BANNERS para true. */
const BANNERS=true;
const VT={'ad-rect':'vt-q','ad-rect2':'vt-q','ad-tall':'vt-v','ad-bill':'vt-h'};
const ad=(cls,dim)=>BANNERS?`<a class="vt vt-livre ${VT[cls]}" href="https://wa.me/5598987884948?text=${encodeURIComponent('Olá! Quero anunciar no Acontece Maranhão (espaço '+dim+').')}" target="_blank" rel="noopener"><div><b>Anuncie aqui</b><span>${dim}</span><em>Fale no WhatsApp</em></div></a>`:'';
const MAIS_LIDAS=[61488,63478,7174,73382,72118];

/* ---------- home ---------- */
function home(){
 const qs=new URLSearchParams(location.search),q=qs.get('cidade'),cl=qs.get('coluna'),dk=qs.get('dica');
 if(qs.has('pagina'))return paginaPage(qs.get('pagina'));
 if(qs.has('s'))return buscaPage(qs.get('s').trim());
 if(qs.has('ultimas'))return listaPage('Últimas notícias','Tudo o que o Acontece Maranhão publicou, da mais recente para a mais antiga.',P);
 if(qs.get('cat')==='politica')return listaPage('Política','',P.filter(p=>POL_IDS.includes(p.id)));
 if(qs.has('dicas'))return dicaPage(null);
 if(dk&&qs.has('n'))return dicaItem(+qs.get('n'));
 if(dk)return dicaPage(dk);
 if(cl)return coluna(cl);
 if(q)return cidade(q);
 const man=byId(73382),subs=[72950,73015,73262].map(byId);
 const ult=P.slice(0,4);
 const pol=[72826,72472,72615,73301,73721].map(byId);
 const cid=P.filter(p=>p.cidade).slice(0,8);
 return `
 <section class="top-grid" aria-label="Destaques">
  <a class="manchete" href="${url(man)}">${ph(man)}<div class="txt"><span class="chap">${esc(chap(man))}</span><h1 class="hl">${esc(man.title)}</h1><p>${esc(fina(man))}</p></div></a>
  <div class="top-side"><div class="subs">${subs.map(s=>`<a class="sub" href="${url(s)}">${ph(s)}<div><span class="chap">${esc(chap(s))}</span><h3 class="hl">${esc(s.title)}</h3></div></a>`).join('')}</div><div class="top-ad so-desk">${ad('ad-rect','300 × 250')}</div></div>
 </section>
 <div class="row2">
  <section id="ultimas"><div class="sec-h"><h2>Últimas notícias</h2><a class="more" href="index.html?ultimas=1">Ver todas</a></div>
   <div class="ult lim">${ult.map(x=>ultItem(x,hora(x.date),dia(x.date),chap(x))).join('')}</div>${verTodas()}</section>
  <div class="side-col so-desk">${ad('ad-tall','300 × 600')}</div>
 </div>
 ${ad('ad-bill','970 × 250')}
 <section class="sec" id="colunistas"><div class="tarja"><h2>Colunistas</h2><button class="more" type="button" data-mega="colunistas">Ver todas</button></div>
  <div class="cols lim">${COLUNISTAS.slice(0,4).map(c=>`<a class="colun" href="index.html?coluna=${c.s}"><div class="who"><span class="av" style="background:${c.cor}">${ini(c.n)}</span><div><b>${c.n}</b><span>${c.c}</span></div></div><h3 class="hl">${c.t}</h3></a>`).join('')}</div>${verTodas()}</section>
 <section class="sec" id="politica"><div class="tarja"><h2>Política</h2><a class="more" href="index.html?cat=politica">Ver todas</a></div>
  <div class="pol2"><a class="big2" href="${url(pol[0])}">${ph(pol[0])}<div><span class="chap">${esc(chap(pol[0]))}</span><h3 class="hl">${esc(pol[0].title)}</h3><p>${esc(fina(pol[0]))}</p></div></a>
   <div><div class="smalls lim2">${pol.slice(1,5).map(x=>`<a href="${url(x)}">${ph(x)}<div><span class="chap">${esc(chap(x))}</span><h3 class="hl">${esc(x.title)}</h3></div></a>`).join('')}</div>${verTodas()}</div></div></section>
 <section class="sec" id="cidades"><div class="tarja"><h2>Cidades</h2><button class="more" type="button" data-mega="cidades">Ver todas</button></div>
  <div class="chips">${['São Luís','Imperatriz','Caxias','Timon','Bacabal','Carutapera','Buriticupu','Codó','Balsas','Pinheiro'].map(c=>`<a href="index.html?cidade=${encodeURIComponent(c)}">${c}</a>`).join('')}</div>
  <div class="grid4 lim">${cid.slice(0,4).map(x=>`<a class="card" href="${url(x)}">${ph(x)}<span class="chap">${esc(chap(x))}</span><h3 class="hl">${esc(x.title)}</h3></a>`).join('')}</div>${verTodas()}</section>
 <section class="dark" id="podcast"><div>
  <div class="tarja"><h2>Podcast</h2><a class="more" href="${YT_POD}" target="_blank" rel="noopener">Ver todos</a></div>
  <div class="pod"><a class="pod-cover" href="${YT_POD}" target="_blank" rel="noopener" aria-label="Pod Acontecer no YouTube"><img src="img/pod-acontecer-logo.jpg" alt="Pod Acontecer" loading="lazy"></a>
   <div><div class="eps lim">${EPS.slice(0,4).map(([id,tp,t,d])=>`<a href="${ytVid(id)}" target="_blank" rel="noopener"><span class="ep-capa"><img src="${id?`https://i.ytimg.com/vi/${id}/mqdefault.jpg`:'img/pod-acontecer-logo.jpg'}" alt="" loading="lazy"><span class="play">${icon('play')}</span></span><div><span class="gray">${tp}</span><h3>${esc(t)}</h3></div><span class="gray">${d}</span></a>`).join('')}</div>${verTodas()}</div></div>
 </div></section>
 <section class="sec" id="dicas"><div class="tarja"><h2>Dicas</h2><button class="more" type="button" data-mega="dicas">Categorias</button></div>
  <div class="dtabs" role="tablist" aria-label="Categorias de dicas"><button type="button" role="tab" aria-selected="true" data-dcat="">Todas</button>${DICAS_CAT.map(c=>`<button type="button" role="tab" aria-selected="false" data-dcat="${c.s}">${c.n}</button>`).join('')}</div>
  <div class="dicas lim" id="dicas-grid" role="tabpanel">${dicasGrid('')}</div>${verTodas()}
  <a class="dicas-all" id="dicas-all" href="index.html?dicas=1" hidden>Ver todas as dicas</a></section>
 <section class="convite-band" id="newsletter">${convite()}</section>`;
}
function coluna(sl){
 const k=Math.max(0,COLUNISTAS.findIndex(c=>c.s===sl)),c=COLUNISTAS[k];
 document.title=`${c.c}, por ${c.n} - Acontece Maranhão`;
 const L=P.slice(k%6,k%6+5),top=L[0];
 return `<div class="col-band"><span>Colunas</span></div>
 <header class="col-head"><span class="av col-av" style="background:${c.cor}">${ini(c.n)}</span>
  <div class="col-name"><h1>${esc(c.c)}</h1><p>Por ${esc(c.n)}</p></div><p class="col-desc">${esc(c.d)}</p>${colSoc(c)}</header>
 <div class="col-grid">
  <div>
   <a class="col-top" href="${url(top)}">${ph(top)}<div><span class="chap">${esc(c.c)}</span><h2 class="hl">${esc(c.t)}</h2><p>${esc(fina(top))}</p></div></a>
   <form class="col-nl" data-nlform><span class="av" style="background:${c.cor}">${ini(c.n)}</span><div class="col-nl-txt"><b>Receba a coluna ${esc(c.c)} no seu e-mail</b><span>Toda semana, de graça.</span></div><div class="col-nl-f"><input type="email" placeholder="Seu e-mail" required aria-label="Seu e-mail"><button class="btn-ink" type="submit">Assinar</button></div></form>
   <div class="ult" style="margin-top:28px">${L.slice(1).map(x=>ultItem(x,dia(x.date),hora(x.date),c.c)).join('')}</div>
  </div>
  <aside class="side-col">${ad('ad-rect','300 × 250')}<div><h2 class="side-h">Outras colunas</h2><div class="others">${COLUNISTAS.filter(x=>x!==c).slice(0,6).map(x=>`<a href="index.html?coluna=${x.s}"><span class="av" style="background:${x.cor}">${ini(x.n)}</span><div><b>${x.c}</b><span>${x.n}</span></div></a>`).join('')}</div></div></aside>
 </div>`;
}
function dicaPage(s){
 const c=s?catDica(s)||DICAS_CAT[0]:null;
 document.title=c?`Dicas de ${c.n} - Acontece Maranhão`:'Dicas - Acontece Maranhão';
 return `<nav class="crumbs" aria-label="Caminho"><a href="index.html">Início</a><span>›</span>${c?`<a href="index.html?dicas=1">Dicas</a><span>›</span><span>${esc(c.n)}</span>`:'<span>Dicas</span>'}</nav>
 <div class="tarja" style="margin-top:18px"><h1 class="tarja-h1">${c?'Dicas: '+esc(c.n):'Dicas'}</h1></div>
 <div class="dtabs"><a href="index.html?dicas=1"${c?'':' aria-current="page"'}>Todas</a>${DICAS_CAT.map(x=>`<a href="index.html?dica=${x.s}"${x===c?' aria-current="page"':''}>${x.n}</a>`).join('')}</div>
 <div class="dicas">${(c?DICAS.filter(x=>x[0]===c.s):DICAS).map(dicaCard).join('')}</div>
 <section class="convite-band">${convite()}</section>`;
}
/* Uma dica (igual à página da dica no tema) */
function dicaItem(n){
 const x=DICAS[n]||DICAS[0],[k,t,d]=x,c=catDica(k),p={title:t,slug:slug(t),id:0};
 document.title=`${t} - Acontece Maranhão`;
 const mais=DICAS.filter(y=>y[0]===k&&y!==x);
 return `<nav class="crumbs" aria-label="Caminho"><a href="index.html">Início</a><span>›</span><a href="index.html?dicas=1">Dicas</a><span>›</span><a href="index.html?dica=${k}">${esc(c.n)}</a></nav>
 <div class="art-grid">
  <article>
   <header class="art-head"><span class="chap">Dicas · ${esc(c.n)}</span><h1>${esc(t)}</h1><p class="fina">${esc(d)}</p>
    <div class="byline"><span class="av">R</span><div><b>Por Redação Acontece Maranhão</b><span>Publicado em ${dataLonga(P[0].date)}</span></div></div>
    <div class="share-top">${shareRow(p)}</div></header>
   <div class="body"><p>${esc(d)} Texto de exemplo da dica: no site, a redação escreve a dica completa no painel, em Dicas.</p>${convite()}
    <div class="end-share">${shareRow(p)}</div></div>
  </article>
  <aside class="aside">${ad('ad-rect','300 × 250')}${rank(MAIS_LIDAS.slice(0,5))}</aside>
 </div>
 ${mais.length?`<section class="mais"><div class="sec-h"><h2>Mais dicas de ${esc(c.n)}</h2></div><div class="dicas">${mais.map(dicaCard).join('')}</div></section>`:''}`;
}
/* Listas: Últimas notícias e Política (igual às páginas de lista do tema) */
function listaPage(titulo,desc,L,crumb){
 document.title=`${titulo} - Acontece Maranhão`;
 return `<nav class="crumbs" aria-label="Caminho"><a href="index.html">Início</a><span>›</span><span>${esc(crumb||titulo)}</span></nav>
 <div class="sec-h" style="margin-top:18px"><h1 class="pg-title">${esc(titulo)}</h1></div>
 ${desc?`<p class="gray" style="max-width:70ch;margin-top:-8px">${esc(desc)}</p>`:''}
 <div class="grid4" style="margin-top:28px">${L.map(x=>`<a class="card" href="${url(x)}">${ph(x)}<span class="chap">${esc(chap(x))}</span><h3 class="hl">${esc(x.title)}</h3></a>`).join('')}</div>
 <section class="convite-band">${convite()}</section>`;
}
/* Resultados da busca (igual à página de busca do tema) */
function buscaPage(q){
 const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
 const L=q?P.filter(p=>norm(p.title+' '+p.cidade+' '+p.excerpt).includes(norm(q))):[];
 document.title=`Busca: ${q} - Acontece Maranhão`;
 return `<nav class="crumbs" aria-label="Caminho"><a href="index.html">Início</a><span>›</span><span>Busca</span></nav>
 <div class="sec-h" style="margin-top:18px"><h1 class="pg-title">Busca: ${esc(q)}</h1></div>
 <form class="busca-pg" role="search" action="index.html"><input type="search" name="s" value="${esc(q)}" placeholder="Buscar no Acontece Maranhão" aria-label="Buscar"><button type="submit">Buscar</button></form>
 ${L.length?`<p class="gray">${L.length} resultado${L.length>1?'s':''}</p><div class="ult" style="max-width:820px;margin-top:12px">${L.map(x=>ultItem(x,dia(x.date),String(new Date(x.date).getFullYear()),chap(x))).join('')}</div>`
  :`<p style="margin-top:20px;font-size:18px">Nada encontrado para "${esc(q)}". Tente outra palavra, um nome ou uma cidade.</p>`}`;
}
/* Páginas institucionais (o tema cria estas páginas ao ser ativado) */
const fale=t=>`<div class="fale"><p class="fale-t">${t}</p><a class="fale-wa" href="https://wa.me/5598987884948" target="_blank" rel="noopener">${icon('whatsapp')}Chamar no WhatsApp</a><p class="fale-tel">ou ligue: <a href="tel:+5598987884948">(98) 98788-4948</a></p></div>`;
const PAGINAS={
 contato:['Contato','<p>Fale com a redação do Acontece Maranhão: envie sugestões de pauta, correções e informações.</p>'+fale('Fale com o Acontece Maranhão')],
 anuncie:['Anuncie','<p>Anuncie no Acontece Maranhão e fale com quem acompanha a política e as cidades do Maranhão todos os dias, no site, no canal do WhatsApp e no YouTube do Pod Acontecer.</p><p>Formatos: banners no site, publicidade nos vídeos do Pod Acontecer e conteúdo de marca.</p><p>Para receber a tabela de preços, fale com a gente:</p>'+fale('Anuncie no Acontece Maranhão')],
 expediente:['Expediente','<p><strong>Acontece Maranhão</strong><br>Uma empresa do Acontece Group.</p><p>Redação: São Luís (MA).</p>'+fale('Contato com a redação')],
 privacidade:['Política de privacidade','<p>Esta página explica quais dados o Acontece Maranhão coleta, para que usa e quais são os seus direitos, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p><h2>Dados que coletamos</h2><ul><li><strong>Cadastro para receber notícias:</strong> nome, e-mail e número de WhatsApp, quando você preenche o formulário do site.</li><li><strong>Newsletter:</strong> o e-mail informado para receber a newsletter do site ou de uma coluna.</li><li><strong>Navegação:</strong> dados de uso coletados por cookies de medição de audiência (Google Analytics).</li></ul><h2>Para que usamos</h2><ul><li>Enviar as notícias e newsletters que você pediu, por e-mail e WhatsApp.</li><li>Medir a audiência e melhorar o site.</li><li>Exibir a publicidade dos nossos anunciantes, que ajuda a manter o site gratuito.</li></ul><p>Não vendemos nem compartilhamos seus dados de cadastro com terceiros. Para evitar mostrar o formulário de novo a quem já se cadastrou, guardamos uma versão codificada do endereço de internet (IP), que não permite identificar você.</p><h2>Seus direitos</h2><p>Você pode, a qualquer momento, pedir acesso, correção ou exclusão dos seus dados e deixar de receber nossos envios. Cada e-mail da newsletter tem um link para sair da lista. Para os demais pedidos, fale com a gente pelo <a href="https://wa.me/5598987884948" target="_blank" rel="noopener">WhatsApp (98) 98788-4948</a>.</p><h2>Cookies</h2><p>Você pode bloquear ou apagar cookies nas configurações do seu navegador. Alguns recursos do site podem deixar de funcionar.</p>']
};
function paginaPage(k){
 const [t,h]=PAGINAS[k]||PAGINAS.contato;
 document.title=`${t} - Acontece Maranhão`;
 return `<nav class="crumbs" aria-label="Caminho"><a href="index.html">Início</a><span>›</span><span>${esc(t)}</span></nav>
 <article class="pagina"><header class="art-head"><h1>${esc(t)}</h1></header><div class="body">${h}</div></article>`;
}
function cidade(nome){
 const L=P.filter(p=>p.cidade===nome),outras=P.filter(p=>p.cidade&&p.cidade!==nome).slice(0,6);
 document.title=`Notícias de ${nome} – MA - Acontece Maranhão`;
 return `<nav class="crumbs" aria-label="Caminho"><a href="index.html">Início</a><span>›</span><span>Cidades</span><span>›</span><span>${esc(nome)}</span></nav>
 <div class="sec-h" style="margin-top:18px"><h1 class="pg-title">Notícias de ${esc(nome)}</h1></div>
 <p class="gray" style="max-width:70ch;margin-top:-8px">Tudo o que o Acontece Maranhão publica sobre ${esc(nome)}: política, prefeitura, Câmara e o dia a dia da cidade.</p>
 ${L.length?`<div class="grid4" style="margin-top:28px">${L.map(x=>`<a class="card" href="${url(x)}">${ph(x)}<span class="chap">${dia(x.date)}</span><h3 class="hl">${esc(x.title)}</h3></a>`).join('')}</div>`
  :`<p style="margin-top:28px;font-size:18px">Ainda não há matérias de ${esc(nome)}. Quando a redação publicar, elas aparecem aqui.</p>`}
 <section class="sec"><div class="sec-h"><h2>Outras cidades</h2></div><div class="grid4">${outras.slice(0,4).map(x=>`<a class="card" href="${url(x)}">${ph(x)}<span class="chap">${esc(chap(x))}</span><h3 class="hl">${esc(x.title)}</h3></a>`).join('')}</div></section>
 <section class="convite-band">${convite()}</section>`;
}

/* ---------- matéria ---------- */
function materia(){
 const id=new URLSearchParams(location.search).get('id');
 const p=byId(id)||P[0];
 document.title=`${p.title} - Acontece Maranhão`;
 const rel=related(p,7);
 let blocks=p.content.match(/<(p|h2|h3|h4|ul|ol|blockquote)[\s>][\s\S]*?<\/\1>/g)||[`<p>${esc(p.excerpt)}</p>`];
 const n=blocks.length;
 const iLeia1=n>=3?1:0, iWa=Math.max(iLeia1+1,Math.floor(n/2));
 /* meio do texto: botão do canal; fim do texto: newsletter logo antes do último "Leia também" */
 const body=blocks.map((b,i)=>b+(i===iWa?waCanal():'')).join('')+(iWa>=n?waCanal():'')+convite()+leia(rel.slice(0,1));
 return `<nav class="crumbs" aria-label="Caminho"><a href="index.html">Início</a><span>›</span>${p.cidade?`<a href="index.html?cidade=${encodeURIComponent(p.cidade)}">${esc(p.cidade)}</a>`:'<span>Maranhão</span>'}</nav>
 <div class="art-grid">
  <article>
   <header class="art-head"><span class="chap">${esc(chap(p))}</span><h1>${esc(p.title)}</h1><p class="fina">${esc(fina(p))}</p>
    <div class="byline"><span class="av">R</span><div><b>Por Redação Acontece Maranhão</b><span>Publicado em ${dataLonga(p.date)}</span></div></div>
    <div class="share-top">${shareRow(p)}</div></header>
   ${p.img?`<figure class="fig">${ph(p)}</figure>`:''}
   <div class="body">${body}
    <div class="tags"><b>Assuntos</b>${p.cidade?`<a href="index.html?cidade=${encodeURIComponent(p.cidade)}">${esc(p.cidade)}</a>`:''}${POL_IDS.includes(p.id)?'<a href="index.html?cat=politica">Política</a>':''}<a href="index.html?ultimas=1">Maranhão</a></div>
    <div class="end-share">${shareRow(p)}</div>
   </div>
  </article>
  <aside class="aside">${ad('ad-rect','300 × 250')}${rank(MAIS_LIDAS.filter(x=>x!==p.id).slice(0,5))}${ad('ad-tall','300 × 600')}</aside>
 </div>
 <section class="mais"><div class="sec-h"><h2>${p.cidade?`Mais notícias de ${esc(p.cidade)} e região`:'Mais notícias'}</h2></div>
  <div class="grid3">${rel.slice(1,4).map(x=>`<a class="card" href="${url(x)}">${ph(x)}<span class="chap">${esc(chap(x))}</span><h3 class="hl">${esc(x.title)}</h3></a>`).join('')}</div></section>`;
}

/* ---------- interações ---------- */
function closeMegas(){document.querySelectorAll('.mega').forEach(g=>g.hidden=true);document.querySelectorAll('.nav [data-mega]').forEach(b=>b.setAttribute('aria-expanded','false'))}
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,4200)}
async function copiar(txt){try{await navigator.clipboard.writeText(txt);return true}catch(_){const a=document.createElement('textarea');a.value=txt;document.body.appendChild(a);a.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}a.remove();return ok}}
function busca(){
 const o=document.createElement('div');o.className='busca';o.innerHTML=`<div class="busca-box" role="dialog" aria-label="Buscar"><form action="index.html" role="search"><input type="search" name="s" placeholder="Buscar no Acontece Maranhão" aria-label="Buscar" autocomplete="off"></form><div class="busca-res"><p>Digite uma palavra, um nome ou uma cidade.</p></div></div>`;
 document.body.appendChild(o);const i=o.querySelector('input'),r=o.querySelector('.busca-res');i.focus();
 const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
 i.addEventListener('input',()=>{const q=norm(i.value.trim());if(!q){r.innerHTML='<p>Digite uma palavra, um nome ou uma cidade.</p>';return}
  const L=P.filter(p=>norm(p.title+' '+p.cidade+' '+p.excerpt).includes(q)).slice(0,10);
  r.innerHTML=L.length?L.map(x=>`<a href="${url(x)}"><span class="chap">${esc(chap(x))}</span><h3>${esc(x.title)}</h3></a>`).join('')+`<a href="index.html?s=${encodeURIComponent(i.value.trim())}"><h3>Ver todos os resultados para "${esc(i.value.trim())}" ›</h3></a>`:`<p>Nada encontrado para "${esc(i.value)}".</p>`});
 const close=()=>o.remove();o.addEventListener('click',e=>{if(e.target===o)close()});o.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}
/* ---------- modal de cadastro (nome, e-mail, WhatsApp) ----------
   Não aparece de novo para quem já respondeu. No protótipo a checagem é pelo navegador (localStorage + cookie).
   No site real, LEAD_API recebe o cadastro e responde em /status se aquele IP ou telefone já se cadastrou. */
const jaCadastrou=()=>!!ls.get('am_lead')||/(^|;\s*)am_lead=1/.test(document.cookie);
function marcarCadastro(dados){ls.set('am_lead',JSON.stringify({...dados,em:new Date().toISOString()}));document.cookie='am_lead=1; max-age=63072000; path=/; SameSite=Lax'}
async function deveMostrarLead(){
 if(new URLSearchParams(location.search).has('lead'))return true; // ?lead=1 força o modal (para demonstrar)
 if(jaCadastrou())return false;
 if(Date.now()-(+ls.get('am_lead_fechado')||0)<3*864e5)return false; // fechou no X: some por 3 dias
 if(LEAD_API){try{const r=await fetch(LEAD_API+'/status',{credentials:'include'});const j=await r.json();if(j.respondeu){marcarCadastro({});return false}}catch(_){}}
 return true;
}
const maskTel=v=>{const d=v.replace(/\D/g,'').slice(0,11);if(d.length<3)return d.length?`(${d}`:'';if(d.length<7)return `(${d.slice(0,2)}) ${d.slice(2)}`;return d.length<11?`(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`:`(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`};
function leadModal(){
 const antes=document.activeElement;
 const o=document.createElement('div');o.className='lead';
 o.innerHTML=`<div class="lead-box" role="dialog" aria-modal="true" aria-labelledby="lead-t">
  <button class="lead-x" type="button" aria-label="Fechar">${icon('close')}</button>
  <div class="lead-top"><img src="logo-acontece-maranhao.svg" alt="Acontece Maranhão"></div>
  <div class="lead-in"><h2 id="lead-t">Receba as notícias do Maranhão em primeira mão</h2>
  <p>Deixe seu contato e enviamos as principais notícias do dia no seu WhatsApp e no seu e-mail. É de graça.</p>
  <form class="lead-f" novalidate>
   <label>Nome<input name="nome" autocomplete="name" required></label>
   <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
   <label>WhatsApp<input name="whats" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="(98) 99999-9999" required></label>
   <p class="lead-err" role="alert" hidden></p>
   <button class="lead-go" type="submit">Quero receber as notícias</button>
   <small>Você pode sair da lista quando quiser. Não compartilhamos seus dados. <a href="index.html?pagina=privacidade" target="_blank" rel="noopener">Política de privacidade</a>.</small>
  </form></div></div>`;
 document.body.appendChild(o);document.body.style.overflow='hidden';
 const f=o.querySelector('form'),err=o.querySelector('.lead-err'),tel=f.whats;
 setTimeout(()=>f.nome.focus(),60);
 const fechar=(salvar)=>{if(salvar)ls.set('am_lead_fechado',Date.now());o.remove();document.body.style.overflow='';antes&&antes.focus&&antes.focus();mostrarYtBar()};
 o.querySelector('.lead-x').onclick=()=>fechar(true);
 o.addEventListener('click',e=>{if(e.target===o)fechar(true)});
 o.addEventListener('keydown',e=>{if(e.key==='Escape')fechar(true);
  if(e.key==='Tab'){const F=[...o.querySelectorAll('button,input')],a=F[0],z=F[F.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
 tel.addEventListener('input',()=>{tel.value=maskTel(tel.value)});
 f.addEventListener('submit',async e=>{e.preventDefault();
  const nome=f.nome.value.trim(),email=f.email.value.trim(),whats=tel.value.replace(/\D/g,'');
  const erro=nome.length<2?['nome','Escreva seu nome.']:!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?['email','Confira o e-mail.']:!/^\d{10,11}$/.test(whats)?['whats','Confira o WhatsApp com DDD.']:null;
  if(erro){err.textContent=erro[1];err.hidden=false;f[erro[0]].focus();return}
  const dados={nome,email,whats};
  if(LEAD_API){try{await fetch(LEAD_API,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify(dados)})}catch(_){}}
  marcarCadastro(dados);
  o.querySelector('.lead-in').innerHTML=`<h2 id="lead-t">Pronto, ${esc(nome.split(' ')[0])}!</h2><p>A partir de amanhã as principais notícias chegam no seu WhatsApp e no seu e-mail.</p><button class="lead-go" type="button" data-ok>Voltar ao site</button>`;
  o.querySelector('[data-ok]').onclick=()=>fechar(false);o.querySelector('[data-ok]').focus();
  if(!LEAD_API)toast('Cadastro simulado. Nada foi enviado.')});
}

/* ---------- banner fixo do YouTube ---------- */
function mostrarYtBar(){
 const b=$('#ytbar');if(!b||ss.get('am_yt_fechado')||document.querySelector('.lead'))return;
 b.hidden=false;document.body.classList.add('has-ytbar');rodarEps();
 requestAnimationFrame(()=>b.classList.add('on'));
}

document.addEventListener('click',async e=>{
 const cp=e.target.closest('[data-copy]');
 if(cp){const ok=await copiar(cp.dataset.url);toast(cp.dataset.copy==='instagram'?(ok?'Link copiado. No Instagram, abra os Stories e use a figurinha "Link" para colar.':'Copie o link da barra de endereço e cole nos Stories com a figurinha "Link".'):(ok?'Link copiado.':'Não deu para copiar. Copie da barra de endereço.'));return}
 const vt=e.target.closest('[data-vertodas]');
 if(vt){const l=vt.previousElementSibling;l.classList.add('all');vt.remove();const n=l.classList.contains('lim2')?2:3;l.children[n]&&l.children[n].focus();return}
 if(e.target.closest('.ytbar-x')){ss.set('am_yt_fechado','1');$('#ytbar').hidden=true;document.body.classList.remove('has-ytbar');return}
 const tab=e.target.closest('[data-dcat]');
 if(tab){const k=tab.dataset.dcat;document.querySelectorAll('[data-dcat]').forEach(b=>b.setAttribute('aria-selected',b===tab));$('#dicas-grid').innerHTML=dicasGrid(k);const all=$('#dicas-all');all.hidden=!k;all.href=`index.html?dica=${k}`;all.textContent=k?`Ver todas as dicas de ${catDica(k).n}`:'';return}
 const ns=e.target.closest('[data-navscroll]');if(ns){const w=$('.nav .wrap');w.scrollBy({left:+ns.dataset.navscroll*w.clientWidth*.6,behavior:'smooth'});return}
 if(e.target.closest('[data-menu]'))return abrirMenu(true);
 const cl=e.target.closest('[data-close]');if(cl){abrirMenu(false);if(!cl.dataset.mega&&!cl.getAttribute('href'))return}
 if(e.target.closest('[data-gnews]')){e.preventDefault();return toast('Aqui o leitor passa a seguir o Acontece Maranhão no Google Notícias.')}
 if(e.target.closest('[data-busca]'))return busca();
 const m=e.target.closest('[data-mega]');
 if(m){const k=m.dataset.mega,g=$('#mega-'+k),open=g.hidden;closeMegas();if(open){g.hidden=false;document.querySelectorAll(`.nav [data-mega="${k}"]`).forEach(b=>b.setAttribute('aria-expanded','true'));if(!m.closest('.nav'))scrollTo({top:0,behavior:'smooth'})}return}
 if(!e.target.closest('.mega'))closeMegas();
 if(e.target.closest('[data-tg]')){e.preventDefault();toast('Telegram do Acontece: falta o endereço do canal.')}
 const nl=e.target.closest('[data-nl]');if(nl){e.preventDefault();const f=document.querySelector('.nlbox input');if(f){f.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>f.focus(),400)}}
});
document.addEventListener('submit',e=>{const f=e.target.closest('[data-nlform]');if(!f)return;e.preventDefault();
 if(!jaCadastrou())marcarCadastro({email:f.querySelector('input').value});
 f.outerHTML='<p class="ok">Pronto. Amanhã às 7h a newsletter chega no seu e-mail.</p>';toast('Inscrição simulada. Nada foi enviado.')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMegas();if($('#drawer').classList.contains('open'))abrirMenu(false)}});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea/i.test(document.activeElement.tagName)){e.preventDefault();busca()}});

/* ---------- montar ---------- */
(function(){
 const page=document.body.dataset.page;
 const qs=new URLSearchParams(location.search);
 $('#top').innerHTML=header(page==='home'?(qs.get('pagina')==='contato'?'contato':qs.has('pagina')||qs.has('s')?'':qs.has('ultimas')?'ultimas':qs.get('cat')==='politica'?'politica':(qs.get('dica')||qs.has('dicas'))?'dicas':qs.get('coluna')?'colunistas':qs.get('cidade')?'cidades':'inicio'):'');
 $('#main').innerHTML=page==='home'?home():materia();
 $('#foot').innerHTML=footer();
 /* barra de seções: setas e degradê indicam que dá para arrastar no celular; some a seta do lado que chegou ao fim */
 const nav=$('.nav'),nw=$('.nav .wrap');
 const navUpd=()=>{const max=nw.scrollWidth-nw.clientWidth;nav.classList.toggle('scrolls',max>4);nav.classList.toggle('at-start',nw.scrollLeft<4);nav.classList.toggle('at-end',nw.scrollLeft>max-4)};
 nw.addEventListener('scroll',navUpd,{passive:true});addEventListener('resize',navUpd);navUpd();
 /* uma "espiada" ao abrir: anda um pouco e volta, para mostrar que arrasta */
 if(nav.classList.contains('scrolls')&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!ss.get('am_nav_espiou')){ss.set('am_nav_espiou','1');setTimeout(()=>{nw.scrollBy({left:70,behavior:'smooth'});setTimeout(()=>nw.scrollTo({left:0,behavior:'smooth'}),650)},900)}
 deveMostrarLead().then(ok=>ok?setTimeout(leadModal,900):setTimeout(mostrarYtBar,1500));
 let i=0;const ag=$('#agora');
 setInterval(()=>{i=(i+1)%4;const x=P[i];ag.style.opacity=0;setTimeout(()=>{ag.textContent=x.title;ag.href=url(x);$('#agoraT').textContent=hora(x.date);ag.style.opacity=1},300)},6000);
})();

/* Quadrado ao lado da manchete: se não couber inteiro, some (nunca empurra a página). */
function ajustaTopAd(){document.querySelectorAll('.top-side').forEach(s=>{const a=s.querySelector('.top-ad');if(!a)return;a.style.display='';if(s.scrollHeight>s.clientHeight+1)a.style.display='none'})}
window.addEventListener('load',ajustaTopAd);window.addEventListener('resize',ajustaTopAd);setTimeout(ajustaTopAd,300);
