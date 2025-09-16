# 🚀 Guia de Deploy - Vercel

## ✅ Checklist Pré-Deploy

### Arquivos Preparados
- [x] `index.html` - Página principal otimizada
- [x] `vercel.json` - Configurações de deploy
- [x] `package.json` - Metadados do projeto
- [x] `.gitignore` - Arquivos ignorados
- [x] `README.md` - Documentação completa
- [x] `favicon.ico` - Ícone do site

### Otimizações Implementadas
- [x] Meta tags SEO completas
- [x] Open Graph para redes sociais
- [x] Structured Data para Google
- [x] Responsividade mobile
- [x] Performance otimizada
- [x] Security headers
- [x] Cache policies

## 🔧 Deploy via Vercel Dashboard

### 1. Preparar Repositório
```bash
# Adicionar arquivos ao git
git add .
git commit -m "Prepare for Vercel deploy - Landing page ready"
git push origin main
```

### 2. Conectar com Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub/GitLab
3. Clique em **"New Project"**
4. Selecione este repositório
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)

### 3. Deploy Automático
- Deploy será iniciado automaticamente
- Tempo estimado: 30-60 segundos
- URL será gerada automaticamente

## 🖥️ Deploy via CLI

### Instalação
```bash
npm i -g vercel
```

### Deploy de Desenvolvimento
```bash
vercel
```

### Deploy de Produção
```bash
vercel --prod
```

## 🌐 URLs Esperadas

- **Preview**: `https://outsourcing-impressao-xxx.vercel.app`
- **Produção**: `https://outsourcing-impressao.vercel.app`

## 🔍 Verificações Pós-Deploy

### Performance
- [ ] PageSpeed Insights > 90
- [ ] Lighthouse Score > 90
- [ ] Core Web Vitals GREEN

### SEO
- [ ] Meta description presente
- [ ] Open Graph funcionando
- [ ] Structured data válido
- [ ] Favicon carregando

### Funcionalidade
- [ ] Formulário enviando
- [ ] CTAs funcionando
- [ ] Responsividade mobile
- [ ] Carregamento < 3s

## 🛠️ Troubleshooting

### Problema: Fontes não carregam
**Solução**: Verificar se Google Fonts está acessível

### Problema: Imagens quebradas
**Solução**: Verificar paths relativos no HTML

### Problema: CSS não aplicado
**Solução**: Verificar ordem de carregamento dos arquivos CSS

### Problema: JavaScript não funciona
**Solução**: Verificar console do browser para erros

## 📊 Monitoramento

### Analytics Recomendados
- Google Analytics 4
- Vercel Analytics
- Hotjar (heatmaps)
- Google Search Console

### Métricas Importantes
- Taxa de conversão do formulário
- Tempo na página
- Taxa de rejeição
- Origem do tráfego

## 🎯 Domínio Personalizado

### Configurar Domínio
1. Vá em Project Settings
2. Clique em "Domains"
3. Adicione seu domínio
4. Configure DNS conforme instruções

### DNS Records
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 🔐 Variáveis de Ambiente

Se necessário, adicione em Project Settings > Environment Variables:

```
CONTACT_EMAIL=contato@seudominio.com
PHONE_NUMBER=+5511999999999
COMPANY_NAME=Sua Empresa Ltda
```

---

**Status**: ✅ Pronto para Deploy
**Última Atualização**: 2024
**Responsável**: Desenvolvimento Web