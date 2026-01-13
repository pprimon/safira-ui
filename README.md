<p align="center">
  <img src="src/assets/safira-ui-logo.png" alt="Safira UI Logo" width="280" />
</p>

<p align="center">
  <strong>Uma biblioteca de componentes React moderna, acessível e altamente customizável.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MUI-7.3-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI" />
  <img src="https://img.shields.io/badge/Storybook-8.4-FF4785?style=for-the-badge&logo=storybook&logoColor=white" alt="Storybook" />
  <img src="https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/a11y-WCAG%202.1%20AA-green?style=for-the-badge" alt="Accessibility" />
</p>

---

# 💎 Safira UI

Uma biblioteca de componentes React moderna, acessível e altamente customizável, construída com TypeScript e Material-UI.

## ✨ Características

- 🎨 **Design System Consistente** - Tokens de design padronizados para cores, tipografia e espaçamentos
- 🌙 **Tema Claro/Escuro** - Suporte nativo a múltiplos temas
- ♿ **Acessibilidade de Referência** - Componentes desenvolvidos seguindo as diretrizes WCAG 2.1 AA
- 📱 **Responsivo** - Componentes adaptáveis a diferentes tamanhos de tela
- 🧪 **Testado** - Cobertura de testes com Jest, Testing Library e jest-axe
- 📚 **Documentação** - Storybook com exemplos interativos
- 🔧 **TypeScript** - Tipagem completa para melhor DX
- 🎬 **Motion Safe** - Respeita `prefers-reduced-motion` do usuário
- 🌍 **i18n Ready** - Labels de acessibilidade customizáveis

## ♿ Acessibilidade

O Safira UI foi desenvolvido com acessibilidade como prioridade:

### Recursos de Acessibilidade

- ✅ **Navegação por Teclado** - Todos os componentes são navegáveis por teclado
- ✅ **Screen Readers** - Suporte completo com ARIA labels e live regions
- ✅ **Contraste de Cores** - Cores validadas para WCAG AA (mínimo 4.5:1)
- ✅ **Focus Visible** - Indicadores de foco claros e consistentes
- ✅ **Reduced Motion** - Animações desabilitadas para quem prefere
- ✅ **Skip Links** - Componente SkipLink para pular navegação
- ✅ **Semântica HTML** - Uso correto de headings, roles e landmarks

### Componentes de Acessibilidade

```tsx
import { VisuallyHidden, SkipLink } from 'safira-ui';

// Esconde visualmente mas mantém acessível para screen readers
<Button>
  <IconCart />
  <VisuallyHidden>Adicionar ao carrinho</VisuallyHidden>
</Button>

// Skip link para navegação por teclado
<SkipLink mainContentId="main">
  Pular para o conteúdo principal
</SkipLink>
```

### Labels Customizáveis (i18n)

```tsx
// Todos os componentes suportam labels customizáveis
<Modal
  closeButtonAriaLabel="Close modal"  // Padrão: "Fechar modal"
  ariaDescription="Form to add new user"
/>

<Alert
  closeButtonAriaLabel="Dismiss alert"  // Padrão: "Fechar alerta"
  ariaLive="assertive"  // Para erros críticos
/>

<Button
  loading
  loadingText="Submitting form..."  // Padrão: "Carregando"
/>
```

## 📦 Componentes

| Componente | Descrição | Acessibilidade |
|------------|-----------|----------------|
| `Alert` | Mensagens de feedback com diferentes severidades | ✅ aria-live, role="alert" |
| `Badge` | Indicadores visuais para status ou contagem | ✅ Labels descritivos |
| `Button` | Botões com variantes, tamanhos e estados | ✅ aria-busy, aria-disabled |
| `Card` | Containers para agrupar conteúdo relacionado | ✅ role="button" quando clicável |
| `Input` | Campos de entrada de texto com validação | ✅ aria-invalid, aria-describedby |
| `Modal` | Diálogos modais para interações focadas | ✅ aria-labelledby, focus trap |
| `Select` | Seleção de opções em dropdown | ✅ aria-required, listbox pattern |
| `Tooltip` | Dicas contextuais ao passar o mouse | ✅ aria-describedby |
| `SkipLink` | Link para pular navegação | ✅ Navegação por teclado |
| `VisuallyHidden` | Conteúdo visível apenas para screen readers | ✅ SR-only pattern |

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/pprimon/safira-ui.git
cd safira-ui

# Instalar dependências
npm install
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia o servidor de desenvolvimento

# Storybook
npm run storybook        # Inicia o Storybook na porta 6006
npm run build-storybook  # Compila o Storybook para produção

# Testes
npm run test             # Executa os testes
npm run test:watch       # Executa testes em modo watch
npm run test:coverage    # Gera relatório de cobertura
npm run test:a11y        # Executa apenas testes de acessibilidade

# Build
npm run build            # Compila para produção
npm run build:lib        # Compila como biblioteca npm
npm run preview          # Visualiza o build de produção

# Linting
npm run lint             # Verifica problemas de código
npm run lint:fix         # Corrige problemas automaticamente
```

## 🎨 Design Tokens

A biblioteca utiliza um sistema de tokens para garantir consistência visual:

### Cores

```typescript
// Cores principais
primary:    '#9472C8'  // Roxo principal
secondary:  '#572F93'  // Roxo escuro
accent:     '#EBE54B'  // Amarelo destaque
surface:    '#D2CF89'  // Bege claro
background: '#3F3E33'  // Marrom escuro
```

### Uso com ThemeProvider

```tsx
import { SafiraThemeProvider, Button, Alert, SkipLink } from 'safira-ui';

function App() {
  return (
    <SafiraThemeProvider>
      <SkipLink mainContentId="main" />
      
      <nav>...</nav>
      
      <main id="main">
        <Alert severity="success" title="Sucesso!">
          Operação realizada com sucesso.
        </Alert>
        <Button variant="primary">
          Clique aqui
        </Button>
      </main>
    </SafiraThemeProvider>
  );
}
```

## 📖 Documentação

Execute o Storybook para ver a documentação interativa completa:

```bash
npm run storybook
```

Acesse [http://localhost:6006](http://localhost:6006) para explorar todos os componentes com exemplos de uso, variantes e controles interativos.

## 🧪 Testes

Os testes são escritos com Jest, Testing Library e jest-axe para acessibilidade:

```bash
# Executar todos os testes
npm run test

# Executar com cobertura
npm run test:coverage

# Executar apenas testes de acessibilidade
npm run test:a11y

# Modo watch para desenvolvimento
npm run test:watch
```

### Cobertura Mínima

O projeto mantém cobertura mínima de 80% para:
- Branches
- Functions
- Lines
- Statements

## 📁 Estrutura do Projeto

```
safira-ui/
├── src/
│   ├── components/          # Componentes da biblioteca
│   │   ├── Alert/
│   │   │   ├── Alert.tsx
│   │   │   ├── Alert.theme.ts
│   │   │   ├── Alert.stories.tsx
│   │   │   ├── Alert.mdx
│   │   │   └── __tests__/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Select/
│   │   ├── SkipLink/        # Novo: Skip link para a11y
│   │   ├── Tooltip/
│   │   ├── VisuallyHidden/  # Novo: Componente SR-only
│   │   └── __tests__/
│   │       └── a11y.test.tsx  # Testes de acessibilidade
│   ├── theme/               # Configuração de tema
│   │   ├── tokens.ts        # Design tokens
│   │   ├── theme.ts         # Tema MUI customizado
│   │   └── ThemeProvider.tsx
│   └── types/               # Tipos TypeScript compartilhados
├── CONTRIBUTING.md          # Guia de contribuição
├── CHANGELOG.md             # Histórico de mudanças
├── jest.config.js           # Configuração do Jest
├── vite.config.ts           # Configuração do Vite
└── package.json
```

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Material-UI 7** - Base de componentes
- **Emotion** - CSS-in-JS
- **Vite** - Build tool
- **Storybook 8** - Documentação de componentes
- **Jest 30** - Framework de testes
- **Testing Library** - Utilitários de teste
- **jest-axe** - Testes de acessibilidade

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

<p align="center">
  Feito com 💜 por <a href="https://github.com/pprimon">Priscila Primon</a>
</p>
