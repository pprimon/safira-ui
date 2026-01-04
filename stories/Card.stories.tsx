import type { Meta, StoryObj } from "@storybook/react";
// Mock function for actions
const fn = () => () => {};
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button/Button";
import { Avatar, IconButton } from "@mui/material";
import { MoreVert, Favorite, Share, Settings } from "@mui/icons-material";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Container moderno e flexível com header, conteúdo e ações. Suporta múltiplas variantes visuais e estados interativos.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["elevated", "outlined", "filled"],
      description: "Variante visual do card",
    },
    clickable: {
      control: "boolean",
      description: "Se o card é clicável (adiciona hover effects)",
    },
    showHeader: {
      control: "boolean",
      description: "Se deve mostrar o header",
    },
    showActions: {
      control: "boolean",
      description: "Se deve mostrar o footer de ações",
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Título do Card",
    subtitle: "Subtítulo opcional",
    children: (
      <div>
        <p>Este é o conteúdo principal do card.</p>
        <p>
          Você pode adicionar qualquer conteúdo aqui, como texto, imagens,
          formulários, etc.
        </p>
      </div>
    ),
    actions: (
      <>
        <Button variant="ghost">Cancelar</Button>
        <Button variant="primary">Confirmar</Button>
      </>
    ),
  },
};

export const SimpleCard: Story = {
  args: {
    showHeader: false,
    showActions: false,
    children: (
      <div>
        <h3 style={{ margin: "0 0 16px 0", color: "#3F3E33" }}>Card Simples</h3>
        <p>Um card básico sem header ou ações, apenas com conteúdo.</p>
      </div>
    ),
  },
};

export const WithAvatar: Story = {
  args: {
    title: "João Silva",
    subtitle: "Desenvolvedor Frontend",
    avatar: <Avatar>JS</Avatar>,
    headerAction: (
      <IconButton>
        <MoreVert />
      </IconButton>
    ),
    children: (
      <div>
        <p>
          Desenvolvedor especializado em React e TypeScript com 5 anos de
          experiência.
        </p>
        <p>Apaixonado por criar interfaces modernas e acessíveis.</p>
      </div>
    ),
    actions: (
      <>
        <IconButton>
          <Favorite />
        </IconButton>
        <IconButton>
          <Share />
        </IconButton>
        <Button variant="primary">Ver Perfil</Button>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Card
        variant="elevated"
        title="Card Elevado"
        subtitle="Com sombra padrão"
      >
        <p>Este card tem uma sombra elevada que cria profundidade.</p>
      </Card>

      <Card
        variant="outlined"
        title="Card com Borda"
        subtitle="Sem sombra, apenas borda"
      >
        <p>Este card usa apenas uma borda colorida sem sombra.</p>
      </Card>

      <Card
        variant="filled"
        title="Card Preenchido"
        subtitle="Com fundo colorido"
      >
        <p>Este card tem um fundo colorido sutil.</p>
      </Card>
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    title: "Card Clicável",
    subtitle: "Clique para interagir",
    clickable: true,
    children: (
      <div>
        <p>Este card é clicável e tem efeitos de hover.</p>
        <p>Passe o mouse sobre ele para ver a animação.</p>
      </div>
    ),
  },
};

export const ProductCard: Story = {
  args: {
    title: "Smartphone XYZ",
    subtitle: "R$ 1.299,90",
    children: (
      <div>
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            color: "#666",
          }}
        >
          Imagem do Produto
        </div>
        <p>
          Smartphone com tela de 6.1", 128GB de armazenamento e câmera tripla de
          48MP.
        </p>
        <ul style={{ margin: "16px 0", paddingLeft: "20px" }}>
          <li>Tela OLED 6.1"</li>
          <li>128GB de armazenamento</li>
          <li>Câmera tripla 48MP</li>
          <li>Bateria 4000mAh</li>
        </ul>
      </div>
    ),
    actions: (
      <>
        <Button variant="ghost">Favoritar</Button>
        <Button variant="primary">Comprar</Button>
      </>
    ),
  },
};

export const SettingsCard: Story = {
  args: {
    title: "Configurações",
    subtitle: "Personalize sua experiência",
    avatar: <Settings />,
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Notificações</span>
          <Button variant="outline" size="small">
            Configurar
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Privacidade</span>
          <Button variant="outline" size="small">
            Gerenciar
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Tema</span>
          <Button variant="outline" size="small">
            Alterar
          </Button>
        </div>
      </div>
    ),
    actions: (
      <Button variant="primary" fullWidth>
        Salvar Alterações
      </Button>
    ),
  },
};

export const CustomPadding: Story = {
  args: {
    title: "Card com Padding Customizado",
    contentPadding: "48px",
    children: (
      <div>
        <p>Este card tem um padding maior no conteúdo (48px).</p>
        <p>Útil quando você precisa de mais espaço interno.</p>
      </div>
    ),
  },
};

export const NoHeaderNoActions: Story = {
  args: {
    showHeader: false,
    showActions: false,
    variant: "outlined",
    children: (
      <div style={{ textAlign: "center", padding: "24px" }}>
        <h2 style={{ margin: "0 0 16px 0", color: "#572F93" }}>🎉</h2>
        <h3 style={{ margin: "0 0 8px 0", color: "#3F3E33" }}>Parabéns!</h3>
        <p style={{ margin: 0, color: "#60586B" }}>
          Você completou todas as tarefas.
        </p>
      </div>
    ),
  },
};

export const GridLayout: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <Card title="Card 1" subtitle="Primeiro card" variant="elevated">
        <p>Conteúdo do primeiro card em um layout de grid.</p>
      </Card>

      <Card title="Card 2" subtitle="Segundo card" variant="outlined">
        <p>Conteúdo do segundo card em um layout de grid.</p>
      </Card>

      <Card title="Card 3" subtitle="Terceiro card" variant="filled">
        <p>Conteúdo do terceiro card em um layout de grid.</p>
      </Card>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
