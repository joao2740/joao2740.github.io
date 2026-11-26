# Portfólio — João Vitor Lino Teixeira

Portfólio pessoal de **João Vitor Lino Teixeira**, estudante de Ciências da Computação (UDF) e desenvolvedor em formação. Site estático, responsivo e pronto para o GitHub Pages.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid, Flexbox, animações)
- JavaScript puro (sem frameworks)
- Fontes: Space Grotesk e JetBrains Mono (Google Fonts)

## Estrutura de arquivos

```text
portfolio/
├── index.html
├── assets/
│   ├── images/
│   │   ├── profile/        # foto de perfil
│   │   ├── projects/       # prévias dos projetos
│   │   └── certificates/   # imagens dos certificados
│   ├── certificates-pdf/   # PDFs originais dos certificados
│   └── icons/              # favicon
├── css/
│   ├── style.css           # estilos base e componentes
│   ├── responsive.css      # media queries
│   └── animations.css      # animações
├── js/
│   ├── main.js             # certificados, modal, menu, rodapé
│   ├── animations.js       # reveal, progresso, menu ativo
│   └── projects.js         # dados e cards dos projetos
└── README.md
```

## Como personalizar

- **Projetos:** edite o array `PROJECTS` em `js/projects.js`. Os três cards atuais são placeholders. Troque pelos dados reais dos seus repositórios (e mude `placeholder` para `false`). Coloque as imagens em `assets/images/projects/`.
- **LinkedIn e e-mail:** em `index.html`, na seção Contato, troque o `href` dos cards marcados com `data-placeholder` (por exemplo `https://www.linkedin.com/in/seu-perfil` e `mailto:seu@email.com`) e remova o atributo `data-placeholder`. Atualize também o texto do card.
- **Certificados:** edite o array `CERTIFICATES` em `js/main.js`. Só preencha `hours` se a carga horária constar no certificado.

## Executar localmente

Basta abrir `index.html` no navegador. Se preferir um servidor local:

```bash
cd portfolio
python3 -m http.server 8000
# acesse http://localhost:8000
```

## Publicar no GitHub Pages

1. **Criar o repositório:** no GitHub, clique em **New repository**. Para o endereço `https://joao2740.github.io`, nomeie-o `joao2740.github.io`. Com outro nome (ex.: `portfolio`), o endereço será `https://joao2740.github.io/portfolio/`. Deixe-o público.
2. **Enviar os arquivos:** dentro da pasta do projeto, execute:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do portfólio"
   git branch -M main
   git remote add origin https://github.com/joao2740/NOME-DO-REPOSITORIO.git
   git push -u origin main
   ```
   (Ou use **Add file → Upload files** no site do GitHub, enviando o conteúdo da pasta, com o `index.html` na raiz.)
3. **Acessar Settings:** na página do repositório, clique em **Settings**.
4. **Acessar Pages:** no menu lateral, clique em **Pages**.
5. **Selecionar a branch principal:** em *Build and deployment → Source*, escolha **Deploy from a branch**; em *Branch*, selecione `main` e a pasta `/ (root)`.
6. **Publicar o site:** clique em **Save** e aguarde de 1 a 3 minutos.
7. **Acessar o link final:** volte a **Settings → Pages**. O endereço do portfólio aparece no topo da página.

Todos os caminhos são relativos, então o site funciona tanto na raiz quanto em subpasta.
