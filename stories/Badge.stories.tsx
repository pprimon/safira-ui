import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src/components/Badge";
import { Button } from "../src/components/Button";
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
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Indicador visual moderno para notificações, contadores e status. Pode ser usado como overlay em outros elementos ou standalone.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "accent",
        "success",
        "error",
        "warning",
        "info",
      ],
      description: "Cor do badge",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamanho do badge",
    },
    variant: {
      control: { type: "select" },
      options: ["standard", "dot", "outlined"],
      description: "Variante visual do badge",
    },
    max: {
      control: { type: "number" },
      description: "Número máximo a ser exibido (ex: 99+)",
    },
    showZero: {
      control: "boolean",
      description: "Se deve mostrar zero",
    },
    invisible: {
      control: "boolean",
      description: "Se o badge está invisível",
    },
    standalone: {
      control: "boolean",
      description: "Badge standalone (sem children)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Badge
        content={5}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Button>Top Right</Button>
      </Badge>

      <Badge content={5} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
        <Button>Top Left</Button>
      </Badge>

      <Badge
        content={5}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Button>Bottom Right</Button>
      </Badge>

      <Badge
        content={5}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Button>Bottom Left</Button>
      </Badge>
    </div>
  ),
};

export const Standalone: Story = {
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
        <Avatar src="/api/placeholder/32/32">U</Avatar>
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
