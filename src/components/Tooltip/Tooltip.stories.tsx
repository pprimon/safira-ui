import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";
import { IconButton } from "@mui/material";
import { Info, Help, Warning, Error, CheckCircle } from "@mui/icons-material";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Components/Tooltip",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip moderno com múltiplas variantes, posicionamento flexível e animações suaves.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "50px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placement: {
      control: { type: "select" },
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
      ],
      description: "Posição do tooltip",
      table: { category: "Posicionamento", defaultValue: { summary: "top" } },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "light", "error", "warning", "success", "info"],
      description: "Variante visual do tooltip",
      table: { category: "Aparência", defaultValue: { summary: "default" } },
    },
    enterDelay: {
      control: { type: "number" },
      description: "Delay para mostrar o tooltip (ms)",
      table: { category: "Comportamento", defaultValue: { summary: "700" } },
    },
    leaveDelay: {
      control: { type: "number" },
      description: "Delay para esconder o tooltip (ms)",
      table: { category: "Comportamento", defaultValue: { summary: "0" } },
    },
    followCursor: {
      control: "boolean",
      description: "Se deve seguir o cursor",
      table: { category: "Comportamento", defaultValue: { summary: "false" } },
    },
    maxWidth: {
      control: { type: "number" },
      description: "Largura máxima do tooltip",
      table: { category: "Aparência", defaultValue: { summary: "300" } },
    },
    title: {
      control: "text",
      description: "Conteúdo do tooltip",
      table: { category: "Conteúdo" },
    },
  },
  args: {
    placement: "top",
    variant: "default",
    enterDelay: 700,
    leaveDelay: 0,
    followCursor: false,
    maxWidth: 300,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  name: "Padrão",
  args: {
    title: "Informação útil sobre este elemento",
    children: <Button>Hover aqui</Button>,
  },
};

export const Placements: Story = {
  name: "Posições",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Tooltip title="Tooltip no topo" placement="top">
        <Button>Top</Button>
      </Tooltip>

      <Tooltip title="Tooltip no topo início" placement="top-start">
        <Button>Top Start</Button>
      </Tooltip>

      <Tooltip title="Tooltip no topo fim" placement="top-end">
        <Button>Top End</Button>
      </Tooltip>

      <Tooltip title="Tooltip à esquerda" placement="left">
        <Button>Left</Button>
      </Tooltip>

      <div></div>

      <Tooltip title="Tooltip à direita" placement="right">
        <Button>Right</Button>
      </Tooltip>

      <Tooltip title="Tooltip embaixo" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>

      <Tooltip title="Tooltip embaixo início" placement="bottom-start">
        <Button>Bottom Start</Button>
      </Tooltip>

      <Tooltip title="Tooltip embaixo fim" placement="bottom-end">
        <Button>Bottom End</Button>
      </Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  name: "Variantes",
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Tooltip title="Tooltip padrão" variant="default">
        <IconButton>
          <Info />
        </IconButton>
      </Tooltip>

      <Tooltip title="Tooltip claro" variant="light">
        <IconButton>
          <Help />
        </IconButton>
      </Tooltip>

      <Tooltip title="Erro crítico detectado" variant="error">
        <IconButton>
          <Error />
        </IconButton>
      </Tooltip>

      <Tooltip title="Atenção necessária" variant="warning">
        <IconButton>
          <Warning />
        </IconButton>
      </Tooltip>

      <Tooltip title="Operação bem-sucedida" variant="success">
        <IconButton>
          <CheckCircle />
        </IconButton>
      </Tooltip>

      <Tooltip title="Informação adicional" variant="info">
        <IconButton>
          <Info />
        </IconButton>
      </Tooltip>
    </div>
  ),
};

export const LongText: Story = {
  name: "Texto Longo",
  args: {
    title:
      "Este é um tooltip com muito texto que demonstra como o componente lida com conteúdo longo. O texto será quebrado automaticamente quando atingir a largura máxima configurada.",
    maxWidth: 250,
    children: <Button>Tooltip com texto longo</Button>,
  },
};

export const CustomDelay: Story = {
  name: "Delays Customizados",
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Tooltip title="Aparece rapidamente (100ms)" enterDelay={100}>
        <Button>Rápido</Button>
      </Tooltip>

      <Tooltip title="Delay padrão (700ms)">
        <Button>Padrão</Button>
      </Tooltip>

      <Tooltip title="Aparece devagar (1500ms)" enterDelay={1500}>
        <Button>Devagar</Button>
      </Tooltip>
    </div>
  ),
};

export const FollowCursor: Story = {
  name: "Seguir Cursor",
  args: {
    title: "Este tooltip segue o cursor do mouse",
    followCursor: true,
    children: <Button>Mova o mouse sobre mim</Button>,
  },
};

export const AlwaysVisible: Story = {
  name: "Sempre Visível",
  args: {
    title: "Tooltip sempre visível",
    open: true,
    children: <Button>Tooltip sempre visível</Button>,
  },
};

export const WithIcons: Story = {
  name: "Com Ícones",
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Tooltip title="Informações do usuário">
        <IconButton>
          <Info />
        </IconButton>
      </Tooltip>

      <Tooltip title="Ajuda e suporte">
        <IconButton>
          <Help />
        </IconButton>
      </Tooltip>
    </div>
  ),
};

export const DifferentMaxWidths: Story = {
  name: "Larguras Diferentes",
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Tooltip
        title="Tooltip estreito com largura máxima de 150px"
        maxWidth={150}
      >
        <Button>Estreito (150px)</Button>
      </Tooltip>

      <Tooltip
        title="Tooltip médio com largura máxima padrão de 300px"
        maxWidth={300}
      >
        <Button>Médio (300px)</Button>
      </Tooltip>

      <Tooltip
        title="Tooltip largo com largura máxima de 500px que pode conter muito mais texto e informações detalhadas"
        maxWidth={500}
      >
        <Button>Largo (500px)</Button>
      </Tooltip>
    </div>
  ),
};
