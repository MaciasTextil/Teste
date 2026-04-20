// Malha de estados do Brasil (tile map): [linha, coluna, nome, região]
const UF_GRID = {
  RR: [1, 5, "Roraima", "Norte"],
  AP: [1, 7, "Amapá", "Norte"],
  AM: [2, 2, "Amazonas", "Norte"],
  PA: [2, 7, "Pará", "Norte"],
  MA: [2, 8, "Maranhão", "Nordeste"],
  CE: [2, 9, "Ceará", "Nordeste"],
  RN: [2, 10, "Rio Grande do Norte", "Nordeste"],
  AC: [3, 1, "Acre", "Norte"],
  TO: [3, 7, "Tocantins", "Norte"],
  PI: [3, 8, "Piauí", "Nordeste"],
  PB: [3, 9, "Paraíba", "Nordeste"],
  RO: [4, 1, "Rondônia", "Norte"],
  PE: [4, 9, "Pernambuco", "Nordeste"],
  AL: [4, 10, "Alagoas", "Nordeste"],
  MT: [5, 5, "Mato Grosso", "Centro-Oeste"],
  BA: [5, 7, "Bahia", "Nordeste"],
  SE: [5, 9, "Sergipe", "Nordeste"],
  MS: [6, 4, "Mato Grosso do Sul", "Centro-Oeste"],
  GO: [6, 5, "Goiás", "Centro-Oeste"],
  DF: [6, 6, "Distrito Federal", "Centro-Oeste"],
  MG: [6, 7, "Minas Gerais", "Sudeste"],
  ES: [6, 8, "Espírito Santo", "Sudeste"],
  SP: [7, 7, "São Paulo", "Sudeste"],
  RJ: [7, 8, "Rio de Janeiro", "Sudeste"],
  PR: [8, 7, "Paraná", "Sul"],
  SC: [9, 7, "Santa Catarina", "Sul"],
  RS: [10, 7, "Rio Grande do Sul", "Sul"]
};

// Representantes comerciais
const representatives = [
  {
    id: 1, name: "Carlos Mendes", region: "Sudeste",
    phone: "(11) 98765-4321", whatsapp: "5511987654321",
    email: "carlos.mendes@macfil.com.br",
    states: ["SP"]
  },
  {
    id: 2, name: "Ana Paula Silva", region: "Sudeste",
    phone: "(21) 99876-5432", whatsapp: "5521998765432",
    email: "ana.silva@macfil.com.br",
    states: ["RJ", "ES"]
  },
  {
    id: 3, name: "Roberto Almeida", region: "Sudeste",
    phone: "(31) 97654-3210", whatsapp: "5531976543210",
    email: "roberto.almeida@macfil.com.br",
    states: ["MG"]
  },
  {
    id: 4, name: "Juliana Costa", region: "Sul",
    phone: "(51) 98543-2109", whatsapp: "5551985432109",
    email: "juliana.costa@macfil.com.br",
    states: ["RS", "SC", "PR"]
  },
  {
    id: 5, name: "Fernando Oliveira", region: "Nordeste",
    phone: "(81) 97432-1098", whatsapp: "5581974321098",
    email: "fernando.oliveira@macfil.com.br",
    states: ["PE", "AL", "PB", "RN", "CE"]
  },
  {
    id: 6, name: "Patrícia Santos", region: "Nordeste",
    phone: "(71) 96321-0987", whatsapp: "5571963210987",
    email: "patricia.santos@macfil.com.br",
    states: ["BA", "SE"]
  },
  {
    id: 7, name: "Ricardo Ferreira", region: "Nordeste",
    phone: "(98) 95210-9876", whatsapp: "5598952109876",
    email: "ricardo.ferreira@macfil.com.br",
    states: ["MA", "PI"]
  },
  {
    id: 8, name: "Camila Rocha", region: "Centro-Oeste",
    phone: "(62) 94109-8765", whatsapp: "5562941098765",
    email: "camila.rocha@macfil.com.br",
    states: ["GO", "DF", "MT", "MS"]
  },
  {
    id: 9, name: "Bruno Lima", region: "Norte",
    phone: "(92) 93098-7654", whatsapp: "5592930987654",
    email: "bruno.lima@macfil.com.br",
    states: ["AM", "RR", "AC", "RO", "AP", "PA", "TO"]
  }
];

// Calendário de eventos — formato: AAAA-MM-DD
// type: 'feira' | 'lancamento' | 'promocao' | 'feriado' | 'interno'
const events = [
  { date: "2026-04-22", type: "feira", title: "Feira Têxtil São Paulo 2026", location: "Expo Center Norte - SP", description: "Maior feira têxtil da América Latina. Visite nosso estande E-142." },
  { date: "2026-04-28", type: "lancamento", title: "Lançamento Linha BIO-D Verão", location: "Online / Showroom", description: "Apresentação das novas cores da linha sustentável BIO-D." },
  { date: "2026-05-01", type: "feriado", title: "Dia do Trabalho", location: "-", description: "Fábrica e escritório fechados." },
  { date: "2026-05-08", type: "interno", title: "Treinamento — Ficha Técnica Digital", location: "Auditório Interno", description: "Treinamento da equipe comercial sobre o novo catálogo." },
  { date: "2026-05-14", type: "feira", title: "Premiere Vision Paris", location: "Paris Nord Villepinte", description: "Principal evento europeu de tecidos e tendências." },
  { date: "2026-05-20", type: "lancamento", title: "Lançamento Mac High Stretch Plus", location: "Showroom", description: "Nova composição 4 sentidos com Poliamida 6 e Elastano 14%." },
  { date: "2026-06-03", type: "promocao", title: "Promoção Linha Pesados", location: "Todos os canais", description: "Desconto especial em Macnyl 500, 1000 e 380 Diamond." },
  { date: "2026-06-12", type: "feriado", title: "Dia dos Namorados", location: "-", description: "Campanha comercial — coleção cápsula." },
  { date: "2026-06-18", type: "feira", title: "Colombiatex 2026", location: "Medellín, Colômbia", description: "Feira de negócios têxteis para o mercado latino-americano." },
  { date: "2026-07-05", type: "interno", title: "Inventário anual", location: "Fábrica", description: "Contagem de estoque — expedição pausada por 2 dias." },
  { date: "2026-07-15", type: "lancamento", title: "Coleção Inverno 2026 — Alfaiataria", location: "Online", description: "Novas opções de cores para as linhas Mac Twill PET e Mac Canelon Bio-D." },
  { date: "2026-08-10", type: "feira", title: "Fashion Business Rio", location: "Rio de Janeiro - RJ", description: "Evento de negócios e tendências de moda." },
  { date: "2026-04-19", type: "interno", title: "Reunião de alinhamento comercial", location: "Sala de reuniões 2", description: "Revisão trimestral de metas e novos produtos." }
];

// Instruções de lavagem padrão — extraídas das fichas técnicas
const washingInstructions = [
  "Lavar separadamente, nas primeiras lavagens a peça pode soltar tinta residual.",
  "Para peças com combinação de cores, recomendamos lavagem manual.",
  "Não misturar cores claras e coloridas ao lavar as peças.",
  "Evite friccionar com força ao lavar a peça com a mão.",
  "Não misturar peças leves com peças pesadas.",
  "Enxague as peças com água em abundância.",
  "Lavar a temperatura ambiente.",
  "Não deixar de molho.",
  "Não torcer o tecido."
];

const fabrics = [
  {
    name: "Destroyer Bio-D",
    code: "51132",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 108,
    width: 1.50,
    line: ["BIO-D"],
    ligamento: "Tela",
    application: ["Camisas para pesca", "Camisas cargo", "Bonés", "Chapéus", "Jaquetas", "Shorts", "Bermudas"],
    colors: ["0001 - Branco", "0192 - Areia", "1227 - Verde Militar Escuro", "2261 - Azul Marinho", "3390 - Cinza Chumbo", "4236 - Cinza Fossil", "9999 - Preto"]
  },
  {
    name: "Mac Nyco Elastic",
    code: "16106",
    composition: [
      { material: "Algodão", percentage: 49 },
      { material: "Poliamida 6.6", percentage: 47 },
      { material: "Elastano", percentage: 4 }
    ],
    gramWeight: 100,
    width: 1.45,
    line: ["Esportivos", "Elastizados"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Agasalhos", "Camisas"],
    colors: ["0372 - Off White", "9999 - Preto"]
  },
  {
    name: "Tomahawk",
    code: "51133",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 143,
    width: 1.50,
    line: ["UV 50+"],
    ligamento: "Tela",
    application: ["Camisas para pesca", "Camisas cargo", "Bonés", "Chapéus", "Jaquetas", "Shorts", "Bermudas"],
    colors: ["0001 - Branco", "1204 - Verde Militar", "2261 - Azul Marinho", "3390 - Cinza Chumbo", "4236 - Caqui Queimado", "4341 - Areia Avermelhada", "4676 - Caqui Médio", "4832 - Marrom Chocolate", "9999 - Preto"]
  },
  {
    name: "Destroyer",
    code: "51131",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 112,
    width: 1.50,
    line: ["UV 50+"],
    ligamento: "Tela",
    application: ["Camisas para pesca", "Camisas cargo", "Bonés", "Chapéus", "Jaquetas", "Shorts", "Bermudas"],
    colors: ["0001 - Branco","1204 - Verde Militar","1399 - Verde Aventura","2015 - Azul Claro Acinzentado","2261 - Azul Marinho","2715 - Azul Estratosfera","2954 - Azul Jeans","3301 - Cinza Cimento Esverdeado","3390 - Cinza Chumbo","3381 - Prata Esverdeado","3665 - Cinza Rato","3676 - Cinza Cimento","4243 - Palha Clarissimo","4247 - Caqui Fossil","4341 - Areia Avermelhada","5581 - Vinho","5787 - Rosa Clássico","9999 - Preto"]
  },
  {
    name: "Mactel Elastic",
    code: "10177",
    composition: [
      { material: "Poliamida 6.6", percentage: 92 },
      { material: "Elastano", percentage: 8 }
    ],
    gramWeight: 130,
    width: 1.35,
    line: ["Esportivos", "Elastizados", "Alfaiataria", "Lycra®"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Calças esportivas", "Jaquetas", "Coletes", "Bonés"],
    colors: ["1204 - Verde Militar", "2261 - Azul Marinho", "4244 - Caqui Escuro", "4341 - Areia Avermelhada", "9999 - Preto"]
  },
  {
    name: "Mactel Elastic 4Way",
    code: "10178",
    composition: [
      { material: "Poliamida 6.6", percentage: 91 },
      { material: "Elastano", percentage: 9 }
    ],
    gramWeight: 172,
    width: 1.30,
    line: ["Esportivos", "4 sentidos", "Elastizados", "Lycra®"],
    ligamento: "Tela",
    application: ["Shorts"],
    colors: ["1204 - Verde Militar", "2261 - Azul Marinho", "4244 - Caqui Escuro", "4341 - Areia Avermelhada", "9999 - Preto"]
  },
  {
    name: "Mac Elastic Power",
    code: "10173",
    composition: [
      { material: "Poliamida 6.6", percentage: 80 },
      { material: "Elastano", percentage: 20 }
    ],
    gramWeight: 134,
    width: 1.30,
    line: ["Esportivos", "Elastizados", "Alfaiataria", "4 sentidos", "Lycra®"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Calças esportivas", "Jaquetas", "Coletes", "Bonés"],
    colors: ["0372 - Off White", "1204 - Verde Militar", "2245 - Marinho Noite", "4244 - Caqui Escuro", "9999 - Preto"]
  },
  {
    name: "Mac Piquet Elastic",
    code: "10050",
    composition: [
      { material: "Poliamida 6.6", percentage: 94 },
      { material: "Elastano", percentage: 6 }
    ],
    gramWeight: 98,
    width: 1.35,
    line: ["Esportivos", "Elastizados", "Alfaiataria", "Lycra®"],
    ligamento: "Maquinetado",
    application: ["Shorts", "Bermudas", "Calças esportivas", "Jaquetas", "Coletes", "Bonés"],
    colors: ["0372 - Off White", "1204 - Verde Militar", "2261 - Azul Marinho", "9999 - Preto"]
  },
  {
    name: "Mac Ergonomic Flex",
    code: "20111",
    composition: [
      { material: "Poliéster", percentage: 92 },
      { material: "Elastano", percentage: 8 }
    ],
    gramWeight: 105,
    width: 1.35,
    line: ["Esportivos", "Elastizados", "Lycra®"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Camisas", "Agasalhos"],
    colors: ["0001 - Branco", "2694 - Azul Marinho", "9999 - Preto"]
  },
  {
    name: "Mac Stretch",
    code: "10166",
    composition: [
      { material: "Poliamida 6.6", percentage: 90 },
      { material: "Elastano", percentage: 10 }
    ],
    gramWeight: 125,
    width: 1.35,
    line: ["Esportivos", "Elastizados", "4 sentidos", "Lycra®"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Camisas", "Agasalhos"],
    colors: ["0001 - Branco", "0372 - Off White", "1204 - Verde Militar", "2261 - Azul Marinho", "4174 - Marrom", "4244 - Caqui Escuro", "5581 - Vinho", "9999 - Preto"]
  },
  {
    name: "Mac Sensil Flex",
    code: "50132",
    composition: [
      { material: "Poliamida 6.6", percentage: 70 },
      { material: "Não especificado", percentage: 30 }
    ],
    gramWeight: 143,
    width: 1.40,
    line: ["Esportivos", "Elastizados", "Lycra®"],
    ligamento: "Tela",
    application: ["Bermudas", "Shorts", "Jaquetas leves"],
    colors: ["9989 - Preto Mescla"]
  },
  {
    name: "Mac Puelon",
    code: "10163",
    composition: [
      { material: "Poliamida 6.6", percentage: 94 },
      { material: "Elastano", percentage: 6 }
    ],
    gramWeight: 106,
    width: 1.38,
    line: ["Esportivos", "Elastizados", "Lycra®"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas"],
    colors: ["0001 - Branco","0372 - Off White","1204 - Verde Militar","2261 - Azul Marinho","3375 - Chumbo Pirata","4244 - Caqui Escuro","5384 - Vermelho Batom","9999 - Preto"]
  },
  {
    name: "Mac Springy",
    code: "20101",
    composition: [
      { material: "Poliéster", percentage: 96 },
      { material: "Elastano", percentage: 4 }
    ],
    gramWeight: 96,
    width: 1.40,
    line: ["Esportivos", "Elastizados"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas"],
    colors: ["0001 - Branco", "9999 - Preto"]
  },
  {
    name: "Strike Elastic",
    code: "20420",
    composition: [
      { material: "Poliéster", percentage: 97 },
      { material: "Elastano", percentage: 3 }
    ],
    gramWeight: 135,
    width: 1.30,
    line: ["Esportivos", "Elastizados", "Lycra®"],
    ligamento: "Sarja",
    application: ["Shorts", "Bermudas"],
    colors: ["0001 - Branco","2222 - Azul Medieval","5010 - Vermelho Cereja","9999 - Preto"]
  },
  {
    name: "Mac Baggy Canele PET",
    code: "22133",
    composition: [{ material: "Poliéster PET", percentage: 100 }],
    gramWeight: 167,
    width: 1.50,
    line: ["PET", "Pesados"],
    ligamento: "Canele",
    application: ["Calças", "Ecobags", "Jalecos"],
    colors: ["0001 - Branco", "9999 - Preto"]
  },
  {
    name: "Mac Twill PET",
    code: "26250",
    composition: [
      { material: "Algodão", percentage: 54 },
      { material: "Poliéster", percentage: 46 }
    ],
    gramWeight: 174,
    width: 1.60,
    line: ["Alfaiataria", "PET"],
    ligamento: "Sarja",
    application: ["Casacos", "Saias", "Calças", "Coletes", "Shorts"],
    colors: ["0372 - Off White", "9999 - Preto"]
  },
  {
    name: "Mac Ecotel PET",
    code: "22137",
    composition: [{ material: "Poliéster PET", percentage: 100 }],
    gramWeight: 149,
    width: 1.50,
    line: ["Esportivos", "PET"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Camisas", "Agasalhos", "Bolsas", "Acessórios"],
    colors: ["0001 - Branco", "1356 - Verde Musgo Escuro","2694 - Azul Marinho","4174 - Marrom","9999 - Preto"]
  },
  {
    name: "Mac Canelon Bio-D",
    code: "16601",
    composition: [
      { material: "Algodão", percentage: 63 },
      { material: "Poliamida 6.6", percentage: 37 }
    ],
    gramWeight: 150,
    width: 1.60,
    line: ["BIO-D", "Esportivos", "UV 50+", "Alfaiataria"],
    ligamento: "Canele",
    application: ["Calças cargo", "Camisas cargo", "Jaquetas", "Bermudas", "Peças de alfaiataria casual"],
    colors: ["1204 - Verde Militar","4244 - Caqui Escuro","9999 - Preto"]
  },
  {
    name: "New Camberra PET",
    code: "22244",
    composition: [{ material: "Poliéster PET", percentage: 100 }],
    gramWeight: 130,
    width: 1.50,
    line: ["Esportivos", "PET"],
    ligamento: "Sarja",
    application: ["Shorts", "Bermudas", "Jaquetas"],
    colors: ["0001 - Branco", "2271 - Azul Marinho", "9999 - Preto"]
  },
  {
    name: "Carmel PET",
    code: "22047",
    composition: [{ material: "Poliéster PET", percentage: 100 }],
    gramWeight: 101,
    width: 1.50,
    line: ["Esportivos", "PET"],
    ligamento: "Maquinetado Rip Stop",
    application: ["Bermudas", "Shorts", "Jaquetas", "Forros de Jaquetas", "Forros de Bolsas"],
    colors: ["0001 - Branco", "2694 - Azul Marinho", "9999 - Preto"]
  },
  {
    name: "Carmel",
    code: "22037",
    composition: [{ material: "Poliéster PET", percentage: 100 }],
    gramWeight: 101,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Maquinetado Rip Stop",
    application: ["Bermudas", "Shorts", "Jaquetas", "Forros de Jaquetas", "Forros de Bolsas"],
    colors: ["0001 - Branco", "2694 - Azul Marinho", "4247 - Caqui Fossil", "9999 - Preto"]
  },
  {
    name: "Mac Sport Light PET",
    code: "22131",
    composition: [{ material: "Poliéster PET", percentage: 100 }],
    gramWeight: 83,
    width: 1.50,
    line: ["Esportivos", "PET"],
    ligamento: "Tela",
    application: ["Bermudas", "Shorts", "Jaquetas", "Agasalhos Esportivos"],
    colors: ["0001 - Branco","2092 - Azul Marinho Noite","3668 - Cinza Claro","9999 - Preto"]
  },
  {
    name: "Macnyl 500",
    code: "11133",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 213,
    width: 1.50,
    line: ["Pesados"],
    ligamento: "Tela",
    application: ["Botas", "Coletes Balísticos", "Coturnos", "Malas", "Mochilas"],
    colors: ["N/A"]
  },
  {
    name: "Macnyl 380 Diamond",
    code: "11052",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 197,
    width: 1.50,
    line: ["Pesados"],
    ligamento: "Maquinetado",
    application: ["Botas", "Coletes Balísticos", "Coturnos", "Malas", "Mochilas"],
    colors: ["N/A"]
  },
  {
    name: "Macnyl 1000",
    code: "11132",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 322,
    width: 1.50,
    line: ["Pesados"],
    ligamento: "Tela",
    application: ["Botas", "Coletes Balísticos", "Coturnos", "Malas", "Mochilas"],
    colors: ["N/A"]
  },
  {
    name: "Macnyl 500 Rip Stop",
    code: "11131",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 246,
    width: 1.50,
    line: ["Pesados"],
    ligamento: "Rip Stop",
    application: ["Botas", "Coletes Balísticos", "Coturnos", "Malas", "Mochilas"],
    colors: ["N/A"]
  },
  {
    name: "New MacPol 600",
    code: "22601",
    composition: [{ material: "Poliéster", percentage: 100 }],
    gramWeight: 220,
    width: 1.40,
    line: ["Pesados"],
    ligamento: "REPS",
    application: ["Bolsas","Malas","Pochetes","Mochilas","Coletes Balísticos","Jaquetas de Motoqueiro","Botas","Artigos Militares","Artigos de Aventura"],
    colors: ["0001 - Branco", "9999 - Preto"]
  },
  {
    name: "Macnyl 240",
    code: "11197",
    composition: [{ material: "Poliamida 6", percentage: 100 }],
    gramWeight: 122,
    width: 1.50,
    line: ["Pesados"],
    ligamento: "Tela",
    application: ["Jaquetas", "Malas", "Bolsas", "Malotes"],
    colors: ["0001 - Branco", "2261 - Azul Marinho", "9999 - Preto"]
  },
  {
    name: "New Camberra",
    code: "22234",
    composition: [{ material: "Poliéster", percentage: 100 }],
    gramWeight: 130,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Sarja",
    application: ["Shorts", "Bermudas", "Jaquetas"],
    colors: ["0001 - Branco","2271 - Azul Marinho","9999 - Preto"]
  },
  {
    name: "Macpower Rip Stop",
    code: "51189",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 143,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Maquinetado Rip Stop",
    application: ["Calças", "Coletes", "Bermudas", "Shorts", "Bonés"],
    colors: ["1204 - Verde Militar","2261 - Azul Marinho","9999 - Preto"]
  },
  {
    name: "Mac Bambu",
    code: "16120",
    composition: [
      { material: "Poliamida 6.6", percentage: 43 },
      { material: "Algodão", percentage: 34 },
      { material: "Bambu", percentage: 23 }
    ],
    gramWeight: 105,
    width: 1.50,
    line: ["Esportivos", "Origem Sustentável"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Camisas", "Agasalhos"],
    colors: ["0001 - Branco","2513 - Azul Marinho","9999 - Preto"]
  },
  {
    name: "Dubai Opaco",
    code: "11169",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 75,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Forros de Jaquetas", "Jaquetas", "Bolsas", "Shorts"],
    colors: ["0001 - Branco", "2238 - Azul Marinho", "9999 - Preto"]
  },
  {
    name: "Mac Milão",
    code: "12197",
    composition: [
      { material: "Poliamida 6.6", percentage: 89 },
      { material: "Poliéster", percentage: 11 }
    ],
    gramWeight: 101,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Bermudas", "Shorts", "Jaquetas"],
    colors: ["0001 - Branco","1204 - Verde Militar","4244 - Caqui Escuro","8208 - Preto","8209 - Lavanda"]
  },
  {
    name: "Strike",
    code: "22420",
    composition: [{ material: "Poliéster", percentage: 100 }],
    gramWeight: 112,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Sarja",
    application: ["Bermudas", "Shorts", "Jaquetas", "Agasalhos Esportivos"],
    colors: ["0001 - Branco","0130 - Amarelo Ouro","2044 - Azul Royal Médio","2092 - Azul Marinho Noite","5384 - Vermelho Batom","9999 - Preto"]
  },
  {
    name: "Dubai",
    code: "51139",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 74,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Forros de Jaquetas", "Jaquetas", "Bolsas", "Shorts"],
    colors: ["0001 - Branco","0541 - Amarelo Manteiga","1000 - Verde água Claro","1017 - Verde Lago","1764 - Verde Limão","2261 - Azul Marinho","2847 - Azul Acinzentado","2934 - Azul Navy","3381 - Prata Esverdeado","4123 - Mocha Mousse","4243 - Palha Clarissimo","5016 - Rosa","5025 - Rosa Fluor","5286 - Rosa Velho","5384 - Vermelho Batom","5665 - Vermelho Queimado","5787 - Rosa Clássico","5810 - Rosa Chiclete","6243 - Lilas Clarinho","9999 - Preto"]
  },
  {
    name: "Gol!!!",
    code: "22417",
    composition: [{ material: "Poliéster", percentage: 100 }],
    gramWeight: 84,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Bermudas", "Shorts", "Jaquetas", "Agasalhos Esportivos"],
    colors: ["0001 - Branco","2694 - Azul Marinho","5527 - Vermelho Danger","9999 - Preto"]
  },
  {
    name: "MacPol",
    code: "22139",
    composition: [{ material: "Poliéster", percentage: 100 }],
    gramWeight: 100,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Jaquetas"],
    colors: ["0001 - Branco","2694 - Azul Marinho","9999 - Preto"]
  },
  {
    name: "MacPower",
    code: "51188",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 136,
    width: 1.52,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Jaquetas"],
    colors: ["0001 - Branco","0372 - Off White","0130 - Amarelo Ouro","0192 - Areia","1013 - Amarelo Limão Fluor","1204 - Verde Militar","1913 - Evergreen","2014 - Azul Royal","2059 - Azul Piscina","2065 - Azul Nautico","2261 - Azul Marinho","4174 - Marrom","4244 - Caqui Escuro","4676 - Caqui Médio","5527 - Vermelho Danger","5581 - Vinho","5978 - Vermelho","7007 - Laranja Fluor","9999 - Preto"]
  },
  {
    name: "MacTel",
    code: "11150",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 108,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Jaquetas"],
    colors: ["0001 - Branco","0372 - Off White","0199 - Areia Escuro","1204 - Verde Militar","1913 - Evergreen","2011 - Azul Petróleo","2014 - Azul Royal","2065 - Azul Nautico","2073 - Azul Royal Escuro","2261 - Azul Marinho","2500 - Azul Marinho Escuro","2847 - Azul Acinzentado","3345 - Cinza Rato","3351 - Cinza Médio Esverdeado","3375 - Chumbo Pirata","3624 - Cinza Claro","4004 - Ocre Biscut","4007 - Caramelo","4174 - Marrom","4244 - Caqui Escuro","4676 - Caqui Médio","5384 - Vermelho Batom","5581 - Vinho","5810 - Rosa Chiclete","5978 - Vermelho","6267 - Roxo","7007 - Laranja Fluor","7131 - Laranja","9999 - Preto"]
  },
  {
    name: "Texas",
    code: "11163",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 73,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: [],
    colors: ["0001 - Branco", "2261 - Azul Marinho", "9999 - Preto"]
  },
  {
    name: "Xadrez 1x1",
    code: "12192",
    composition: [
      { material: "Poliamida 6.6", percentage: 53 },
      { material: "Poliéster", percentage: 47 }
    ],
    gramWeight: 95,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Bermudas", "Shorts", "Jaquetas"],
    colors: ["8000 - Laranja + Preto","8038 - Rosa Claro + Branco","9999 - Preto + Branco"]
  },
  {
    name: "Veneza Mescla Claro",
    code: "51149",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 108,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Tela",
    application: ["Bermudas", "Shorts", "Jaquetas", "Agasalhos Esportivos"],
    colors: ["N/A"]
  },
  {
    name: "Mac Piquet",
    code: "11020",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 105,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Maquinetado",
    application: ["Forros de jaquetas", "Jaquetas", "Bolsas", "Shorts"],
    colors: ["0001 - Branco","2261 - Azul Marinho","9999 - Preto"]
  },
  {
    name: "Aerofit",
    code: "11049",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 72,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Rip Stop",
    application: ["Jaquetas corta vento", "Bolsas"],
    colors: ["0001 - Branco","0011 - Amarelo Limão Fluor","1204 - Verde Militar","1764 - Verde Limão","2073 - Azul Royal Escuro","2261 - Azul Marinho","2715 - Azul Estratosfera","2910 - Azul Royal Claro","4676 - Caqui Médio","5025 - Rosa Fluor","5384 - Vermelho Batom","6419 - Roxo Maravilha","7007 - Laranja Fluor","7131 - Laranja","9999 - Preto"]
  },
  {
    name: "Nylpar Rip Stop",
    code: "11198",
    composition: [{ material: "Poliamida 6.6", percentage: 100 }],
    gramWeight: 123,
    width: 1.50,
    line: ["Esportivos"],
    ligamento: "Rip Stop",
    application: ["Jaquetas", "Bonés", "Calças", "Pochetes", "Acessórios"],
    colors: ["9999 - Preto"]
  },
  {
    name: "Mac High Stretch",
    code: "10184",
    composition: [
      { material: "Poliamida 6", percentage: 86 },
      { material: "Elastano", percentage: 14 }
    ],
    gramWeight: 158,
    width: 1.30,
    line: ["Esportivos", "Elastizados", "Alfaiataria", "4 sentidos"],
    ligamento: "Tela",
    application: ["Shorts", "Bermudas", "Calças esportivas", "Jaquetas", "Coletes", "Bonés"],
    colors: ["0372 - Off White", "1204 - Verde Militar", "2261 - Azul Marinho", "4244 - Caqui Escuro", "9999 - Preto"]
  }
];

const colorData = {
  "N/A":  { name: "N/A", pantone: "Apenas sob consulta", img: "NA.png", hex: "#C8C8C8" },
  "0001": { name: "0001 - Branco", pantone: "11-4001 TCX", img: "0001.png", hex: "#F0EDE8" },
  "0011": { name: "0011 - Amarelo Limão Fluor", pantone: "Não encontrado", img: "0011.png", hex: "#CCFF00" },
  "0130": { name: "0130 - Amarelo Ouro", pantone: "14-0754 TCX", img: "0130.png", hex: "#D4A017" },
  "0192": { name: "0192 - Areia", pantone: "14-6305 TCX", img: "0192.png", hex: "#C8B89A" },
  "0199": { name: "0199 - Areia Escuro", pantone: "14-6305 TCX", img: "0199.png", hex: "#A89070" },
  "0372": { name: "0372 - Off White", pantone: "11-0608 TCX", img: "0372.png", hex: "#EDE9E0" },
  "0541": { name: "0541 - Amarelo Manteiga", pantone: "11-0619 TCX", img: "0541.png", hex: "#F5E6A0" },
  "1000": { name: "1000 - Verde água Claro", pantone: "12-5507 TCX", img: "1000.png", hex: "#A0D8CF" },
  "1013": { name: "1013 - Amarelo Limão Fluor", pantone: "Não encontrado", img: "NA.png", hex: "#90EE00" },
  "1017": { name: "1017 - Verde Lago", pantone: "18-4735 TCX", img: "1017.png", hex: "#2E8B6E" },
  "1204": { name: "1204 - Verde Militar", pantone: "19-0419 TCX", img: "1204.png", hex: "#4A5240" },
  "1227": { name: "1227 - Verde Militar Escuro", pantone: "19-0417 TCX", img: "1227.png", hex: "#3A4230" },
  "1356": { name: "1356 - Verde Musgo Escuro", pantone: "19-0618 TCx", img: "1356.png", hex: "#3D4E2E" },
  "1399": { name: "1399 - Verde Aventura", pantone: "18-0117 TCX", img: "1399.png", hex: "#5A7040" },
  "1764": { name: "1764 - Verde Limão", pantone: "15-0343 TCX", img: "1764.png", hex: "#7AC143" },
  "1913": { name: "1913 - Evergreen", pantone: "19-6026 TCX", img: "1913.png", hex: "#1B4332" },
  "2011": { name: "2011 - Azul Petróleo", pantone: "19-4826 TCX", img: "2011.png", hex: "#1B4F72" },
  "2014": { name: "2014 - Azul Royal", pantone: "19-3955 TCX", img: "2014.png", hex: "#2650A0" },
  "2015": { name: "2015 - Azul Claro Acinzentado", pantone: "16-4019 TCX", img: "2015.png", hex: "#8FA8C8" },
  "2044": { name: "2044 - Azul Royal Médio", pantone: "19-3955 TCX", img: "2044.png", hex: "#2E5FAE" },
  "2059": { name: "2059 - Azul Piscina", pantone: "17-4435 TCX", img: "2059.png", hex: "#4A9FD4" },
  "2065": { name: "2065 - Azul Nautico", pantone: "19-4056 TCX", img: "2065.png", hex: "#1E4FA0" },
  "2073": { name: "2073 - Azul Royal Escuro", pantone: "19-3864 TCX", img: "2073.png", hex: "#1A3B8A" },
  "2080": { name: "2080 - Azul Marinho", pantone: "19-4027 TCX", img: "2080.png", hex: "#1C2E4A" },
  "2092": { name: "2092 - Azul Marinho Noite", pantone: "19-3924 TCX", img: "2092.png", hex: "#151B2E" },
  "2222": { name: "2222 - Azul Medieval", pantone: "19-3933 TCX", img: "2222.png", hex: "#1D3557" },
  "2238": { name: "2238 - Azul Marinho", pantone: "19-3920 TCX", img: "2238.png", hex: "#1C2E4A" },
  "2245": { name: "2245 - Marinho Noite", pantone: "19-3924 TCX", img: "2245.png", hex: "#12192C" },
  "2261": { name: "2261 - Azul Marinho", pantone: "19-4024 TCX", img: "2261.png", hex: "#1A2A4A" },
  "2271": { name: "2271 - Azul Marinho", pantone: "19-3933 TCX", img: "2271.png", hex: "#1D2D5A" },
  "2500": { name: "2500 - Azul Marinho Escuro", pantone: "19-3921 TCX", img: "2500.png", hex: "#111827" },
  "2513": { name: "2513 - Azul Marinho", pantone: "19-3923 TCX", img: "2513.png", hex: "#1C2B4A" },
  "2694": { name: "2694 - Azul Marinho", pantone: "19-3933 TCX", img: "2694.png", hex: "#1A2748" },
  "2715": { name: "2715 - Azul Estratosfera", pantone: "13-5309 TCX", img: "2715.png", hex: "#B0C4D8" },
  "2847": { name: "2847 - Azul Acinzentado", pantone: "16-4120 TCX", img: "2847.png", hex: "#8FA0B5" },
  "2910": { name: "2910 - Azul Royal Claro", pantone: "18-4043 TCX", img: "2910.png", hex: "#4A7EC8" },
  "2934": { name: "2934 - Azul Navy", pantone: "19-3832 TCX", img: "2934.png", hex: "#1B3A6B" },
  "2954": { name: "2954 - Azul Jeans", pantone: "19-3919 TCX", img: "2954.png", hex: "#345B8C" },
  "3301": { name: "3301 - Cinza Cimento Esverdeado", pantone: "17-6009 TCX", img: "3301.png", hex: "#7A8A78" },
  "3345": { name: "3345 - Cinza Rato", pantone: "18-0513 TCX", img: "3345.png", hex: "#6B7065" },
  "3351": { name: "3351 - Cinza Médio Esverdeado", pantone: "17-6009 TCX", img: "3351.png", hex: "#7A8A78" },
  "3375": { name: "3375 - Chumbo Pirata", pantone: "19-4305 TCX", img: "3375.png", hex: "#3A4248" },
  "3381": { name: "3381 - Prata Esverdeado", pantone: "15-4702 TCX", img: "3381.png", hex: "#9AA89A" },
  "3390": { name: "3390 - Cinza Chumbo", pantone: "19-0506 TCX", img: "3390.png", hex: "#4A5048" },
  "3624": { name: "3624 - Cinza Claro", pantone: "17-6009 TCX", img: "3624.png", hex: "#A8AEA8" },
  "3665": { name: "3665 - Cinza Rato", pantone: "18-0306 TCX", img: "3665.png", hex: "#7A8070" },
  "3668": { name: "3668 - Cinza Claro", pantone: "15-4305 TCX", img: "3668.png", hex: "#C0C8C0" },
  "3676": { name: "3676 - Cinza Cimento", pantone: "18-5806 TCX", img: "3676.png", hex: "#808A80" },
  "4004": { name: "4004 - Ocre Biscut", pantone: "16-1336 TCX", img: "4004.png", hex: "#C89A60" },
  "4007": { name: "4007 - Caramelo", pantone: "17-1047 TCX", img: "4007.png", hex: "#B07030" },
  "4123": { name: "4123 - Mocha Mousse", pantone: "17-1230 TCX", img: "4123.png", hex: "#A07850" },
  "4174": { name: "4174 - Marrom", pantone: "19-0915 TCX", img: "4174.png", hex: "#6B4020" },
  "4236": { name: "4236 - Caqui Queimado", pantone: "19-0820 TCX", img: "4236.png", hex: "#7A6040" },
  "4243": { name: "4243 - Palha Clarissimo", pantone: "13-0000 TCX", img: "4243.png", hex: "#EDE0C0" },
  "4244": { name: "4244 - Caqui Escuro", pantone: "19-0618 TCX", img: "4244.png", hex: "#5A5030" },
  "4247": { name: "4247 - Caqui Fossil", pantone: "17-0517 TCX", img: "4247.png", hex: "#8A8A60" },
  "4341": { name: "4341 - Areia Avermelhada", pantone: "13-6105 TCX", img: "4341.png", hex: "#C8A880" },
  "4676": { name: "4676 - Caqui Médio", pantone: "18-0521 TCX", img: "4676.png", hex: "#8A8050" },
  "4832": { name: "4832 - Marrom Chocolate", pantone: "19-1118 TCX", img: "4832.png", hex: "#4A2010" },
  "5010": { name: "5010 - Vermelho Cereja", pantone: "18-1653 TCX", img: "5010.png", hex: "#B82020" },
  "5016": { name: "5016 - Rosa", pantone: "16-1518 TCX", img: "5016.png", hex: "#E8B0A0" },
  "5025": { name: "5025 - Rosa Fluor", pantone: "Não encontrado", img: "NA.png", hex: "#FF80A0" },
  "5286": { name: "5286 - Rosa Velho", pantone: "15-1317 TCX", img: "5286.png", hex: "#D4A898" },
  "5384": { name: "5384 - Vermelho Batom", pantone: "19-1764 TCX", img: "5384.png", hex: "#C01840" },
  "5527": { name: "5527 - Vermelho Danger", pantone: "18-1763 TCX", img: "5527.png", hex: "#D02020" },
  "5581": { name: "5581 - Vinho", pantone: "19-1725 TCX", img: "5581.png", hex: "#6A1020" },
  "5665": { name: "5665 - Vermelho Queimado", pantone: "19-1656 TCX", img: "5665.png", hex: "#A83020" },
  "5787": { name: "5787 - Rosa Clássico", pantone: "12-1207 TCX", img: "5787.png", hex: "#F0D0C8" },
  "5810": { name: "5810 - Rosa Chiclete", pantone: "17-1928 TCX", img: "5810.png", hex: "#E87898" },
  "5978": { name: "5978 - Vermelho", pantone: "19-1664 TCX", img: "5978.png", hex: "#C83020" },
  "6243": { name: "6243 - Lilas Clarinho", pantone: "14-3812 TCX", img: "6243.png", hex: "#D8C8E8" },
  "6267": { name: "6267 - Roxo", pantone: "19-3737 TCX", img: "6267.png", hex: "#5A2888" },
  "6419": { name: "6419 - Roxo Maravilha", pantone: "19-2820 TCX", img: "6419.png", hex: "#7A2860" },
  "7007": { name: "7007 - Laranja Fluor", pantone: "Não encontrado", img: "NA.png", hex: "#FF6000" },
  "7131": { name: "7131 - Laranja", pantone: "17-1452 TCX", img: "7131.png", hex: "#E06020" },
  "8000": { name: "8000 - Laranja + Preto", pantone: "Xadrez", img: "NA.png", hex: "#2A1A0A" },
  "8038": { name: "8038 - Rosa Claro + Branco", pantone: "Xadrez", img: "NA.png", hex: "#FFB0B8" },
  "8208": { name: "8208 - Preto", pantone: "Xadrez", img: "NA.png", hex: "#1A1A1A" },
  "8209": { name: "8209 - Lavanda", pantone: "Xadrez", img: "NA.png", hex: "#D0B8E8" },
  "9989": { name: "9989 - Preto Mescla", pantone: "Mescla", img: "NA.png", hex: "#2A2A2A" },
  "9999": { name: "9999 - Preto", pantone: "19-4007 TCX", img: "9999.png", hex: "#1A1A1A" }
};
