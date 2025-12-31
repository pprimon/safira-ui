import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { Button } from "../Button";
import { IconButton, Avatar } from "@mui/material";
import {
  Notifications,
  Mail,
  ShoppingCart,
  Favorite,
  Message,
  Settings,
} from "@mui/icons-material";

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Components/Badge",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "success",
        "error",
        "warning",
        "info",
      ],
      description: "Define a cor do badge.",
      table: { category: "Aparência", defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Define o tamanho do badge.",
      table: { category: "Aparência", defaultValue: { summary: "medium" } },
    },
    variant: {
      control: "select",
      options: ["standard", "dot", "outlined"],
      description: "Define o estilo visual do badge.",
      table: { category: "Aparência", defaultValue: { summary: "standard" } },
    },
    content: {
      control: "text",
      description: "Conteúdo do badge (número, texto ou ícone).",
      table: { category: "Conteúdo" },
    },
    max: {
      control: "number",
      description: "Número máximo a ser exibido. Valores acima mostram 'max+'.",
      table: { category: "Conteúdo", defaultValue: { summary: "99" } },
    },
    showZero: {
      control: "boolean",
      description: "Define se o badge deve ser exibido quando o valor é zero.",
      table: { category: "Comportamento", defaultValue: { summary: "false" } },
    },
    invisible: {
      control: "boolean",
      description: "Define se o badge está invisível.",
      table: { category: "Comportamento", defaultValue: { summary: "false" } },
    },
    standalone: {
      control: "boolean",
      description: "Renderiza o badge sem um elemento filho (standalone).",
      table: { category: "Comportamento", defaultValue: { summary: "false" } },
    },
  },
  args: {
    color: "primary",
    size: "medium",
    variant: "standard",
    content: 5,
    max: 99,
    showZero: false,
    invisible: false,
    standalone: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  name: "Padrão",
  args: {
    content: 5,
    children: (
      <IconButton>
        <Notifications />
      </IconButton>
    ),
  },
};

export const WithNumbers: Story = {
  name: "Com Números",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge content={1}>
        <IconButton>
          <Mail />
        </IconButton>
      </Badge>

      <Badge content={23}>
        <IconButton>
          <Message />
        </IconButton>
      </Badge>

      <Badge content={99}>
        <IconButton>
          <Notifications />
        </IconButton>
      </Badge>

      <Badge content={100} max={99}>
        <IconButton>
          <ShoppingCart />
        </IconButton>
      </Badge>

      <Badge content={1000} max={999}>
        <IconButton>
          <Favorite />
        </IconButton>
      </Badge>
    </div>
  ),
};

export const Colors: Story = {
  name: "Cores",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge content={5} color="primary">
        <IconButton>
          <Notifications />
        </IconButton>
      </Badge>

      <Badge content={3} color="secondary">
        <IconButton>
          <Mail />
        </IconButton>
      </Badge>

      <Badge content={1} color="accent">
        <IconButton>
          <Message />
        </IconButton>
      </Badge>

      <Badge content={12} color="success">
        <IconButton>
          <Favorite />
        </IconButton>
      </Badge>

      <Badge content={7} color="error">
        <IconButton>
          <ShoppingCart />
        </IconButton>
      </Badge>

      <Badge content={2} color="warning">
        <IconButton>
          <Settings />
        </IconButton>
      </Badge>

      <Badge content={9} color="info">
        <IconButton>
          <Notifications />
        </IconButton>
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Tamanhos",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge content={5} size="small">
        <IconButton size="small">
          <Notifications />
        </IconButton>
      </Badge>

      <Badge content={5} size="medium">
        <IconButton>
          <Notifications />
        </IconButton>
      </Badge>

      <Badge content={5} size="large">
        <IconButton size="large">
          <Notifications />
        </IconButton>
      </Badge>
    </div>
  ),
};

export const Variants: Story = {
  name: "Variantes",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge content={5} variant="standard">
        <IconButton>
          <Notifications />
        </IconButton>
      </Badge>

      <Badge variant="dot" color="success">
        <IconButton>
          <Mail />
        </IconButton>
      </Badge>

      <Badge content={3} variant="outlined">
        <IconButton>
          <Message />
        </IconButton>
      </Badge>
    </div>
  ),
};

export const DotBadges: Story = {
  name: "Badges Dot (Status)",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge variant="dot" color="success">
        <Avatar>ON</Avatar>
      </Badge>

      <Badge variant="dot" color="error">
        <Avatar>OFF</Avatar>
      </Badge>

      <Badge variant="dot" color="warning">
        <Avatar>AFK</Avatar>
      </Badge>

      <Badge variant="dot" color="info">
        <Avatar>BRB</Avatar>
      </Badge>
    </div>
  ),
};

export const Positions: Story = {
  name: "Posições",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge
        content={5}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Button>Superior Direita</Button>
      </Badge>

      <Badge content={5} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
        <Button>Superior Esquerda</Button>
      </Badge>

      <Badge
        content={5}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Button>Inferior Direita</Button>
      </Badge>

      <Badge
        content={5}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Button>Inferior Esquerda</Button>
      </Badge>
    </div>
  ),
};

export const Standalone: Story = {
  name: "Standalone",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge content="Novo" color="accent" standalone />
      <Badge content="Beta" color="info" variant="outlined" standalone />
      <Badge content="Pro" color="success" standalone />
      <Badge content="Hot" color="error" standalone />
      <Badge content={99} color="primary" standalone />
      <Badge variant="dot" color="success" standalone />
    </div>
  ),
};

export const TextBadges: Story = {
  name: "Badges com Texto",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge content="Novo">
        <Button>Recurso Novo</Button>
      </Badge>

      <Badge content="Beta" color="warning" variant="outlined">
        <Button>Versão Beta</Button>
      </Badge>

      <Badge content="Pro" color="success">
        <Button>Plano Pro</Button>
      </Badge>

      <Badge content="Hot" color="error">
        <Button>Oferta Quente</Button>
      </Badge>
    </div>
  ),
};

export const WithZero: Story = {
  name: "Exibindo Zero",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge content={0} showZero>
        <IconButton>
          <Notifications />
        </IconButton>
      </Badge>

      <Badge content={0} showZero={false}>
        <IconButton>
          <Mail />
        </IconButton>
      </Badge>
    </div>
  ),
};

export const Invisible: Story = {
  name: "Visibilidade",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge content={5} invisible={false}>
        <IconButton>
          <Notifications />
        </IconButton>
      </Badge>

      <Badge content={5} invisible={true}>
        <IconButton>
          <Mail />
        </IconButton>
      </Badge>
    </div>
  ),
};

export const RealWorldExample: Story = {
  name: "Exemplo Real",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        alignItems: "center",
      }}
    >
      {/* Notificações */}
      <Badge content={12} color="error">
        <IconButton>
          <Notifications />
        </IconButton>
      </Badge>

      {/* Mensagens */}
      <Badge content={3} color="primary">
        <IconButton>
          <Mail />
        </IconButton>
      </Badge>

      {/* Carrinho */}
      <Badge content={7} color="accent">
        <IconButton>
          <ShoppingCart />
        </IconButton>
      </Badge>

      {/* Status online */}
      <Badge variant="dot" color="success">
        <Avatar>U</Avatar>
      </Badge>

      {/* Favoritos */}
      <Badge content={25} color="error" max={20}>
        <IconButton>
          <Favorite />
        </IconButton>
      </Badge>

      {/* Badge standalone */}
      <Badge content="Novo" color="info" standalone />
    </div>
  ),
};

export const AllColors: Story = {
  name: "Todas as Cores",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Badge content={1} color="primary" standalone />
        <Badge content={2} color="secondary" standalone />
        <Badge content={3} color="accent" standalone />
        <Badge content={4} color="success" standalone />
        <Badge content={5} color="error" standalone />
        <Badge content={6} color="warning" standalone />
        <Badge content={7} color="info" standalone />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Badge content={1} color="primary" variant="outlined" standalone />
        <Badge content={2} color="secondary" variant="outlined" standalone />
        <Badge content={3} color="accent" variant="outlined" standalone />
        <Badge content={4} color="success" variant="outlined" standalone />
        <Badge content={5} color="error" variant="outlined" standalone />
        <Badge content={6} color="warning" variant="outlined" standalone />
        <Badge content={7} color="info" variant="outlined" standalone />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Badge variant="dot" color="primary" standalone />
        <Badge variant="dot" color="secondary" standalone />
        <Badge variant="dot" color="accent" standalone />
        <Badge variant="dot" color="success" standalone />
        <Badge variant="dot" color="error" standalone />
        <Badge variant="dot" color="warning" standalone />
        <Badge variant="dot" color="info" standalone />
      </div>
    </div>
  ),
};
