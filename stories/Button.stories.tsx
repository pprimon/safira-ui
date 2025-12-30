import type { Meta, StoryObj } from "@storybook/react";
// Mock function for actions
const fn = () => () => {};
import { Button } from "../src/components/Button";
import { Download, Send, Heart } from "@mui/icons-material";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente Button do Safira UI com múltiplas variações, estados de loading e acessibilidade completa.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost"],
      description: "Variante visual do botão",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamanho do botão",
    },
    disabled: {
      control: "boolean",
      description: "Se o botão está desabilitado",
    },
    loading: {
      control: "boolean",
      description: "Se o botão está em estado de loading",
    },
    fullWidth: {
      control: "boolean",
      description: "Se o botão deve ocupar toda a largura",
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Botão Primário",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Botão Secundário",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Botão Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Botão Ghost",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button variant="primary" size="small">
        Pequeno
      </Button>
      <Button variant="primary" size="medium">
        Médio
      </Button>
      <Button variant="primary" size="large">
        Grande
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="primary" startIcon={<Download />}>
        Download
      </Button>
      <Button variant="secondary" endIcon={<Send />}>
        Enviar
      </Button>
      <Button variant="outline" startIcon={<Heart />} endIcon={<Send />}>
        Curtir e Compartilhar
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="primary">Normal</Button>
      <Button variant="primary" loading>
        Carregando
      </Button>
      <Button variant="primary" disabled>
        Desabilitado
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    children: "Botão Largura Completa",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(2, 1fr)",
        maxWidth: "400px",
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
