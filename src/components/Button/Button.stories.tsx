import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import {
  Send,
  Download,
  Settings,
  Delete,
  Add,
  Favorite,
  ShoppingCart,
  ArrowForward,
} from "@mui/icons-material";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
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
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
      description: "Define o estilo visual do botão.",
      table: { category: "Aparência", defaultValue: { summary: "primary" } },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Define o tamanho do botão.",
      table: { category: "Aparência", defaultValue: { summary: "medium" } },
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o botão.",
      table: { category: "Estado", defaultValue: { summary: "false" } },
    },
    loading: {
      control: "boolean",
      description: "Exibe estado de carregamento.",
      table: { category: "Estado", defaultValue: { summary: "false" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Define se o botão ocupa toda a largura disponível.",
      table: { category: "Layout", defaultValue: { summary: "false" } },
    },
    startIcon: {
      control: false,
      description: "Ícone exibido à esquerda do texto.",
      table: { category: "Conteúdo" },
    },
    endIcon: {
      control: false,
      description: "Ícone exibido à direita do texto.",
      table: { category: "Conteúdo" },
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Tipo HTML do botão.",
      table: { category: "HTML", defaultValue: { summary: "button" } },
    },
    onClick: {
      action: "onClick",
      description: "Função executada ao clicar no botão.",
      table: { category: "Eventos" },
    },
  },
  args: {
    variant: "primary",
    size: "medium",
    disabled: false,
    loading: false,
    fullWidth: false,
    children: "Clique aqui",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  name: "Padrão",
  args: {
    children: "Botão Padrão",
  },
};

export const Primary: Story = {
  name: "Primary",
  args: {
    variant: "primary",
    children: "Botão Primary",
  },
};

export const Secondary: Story = {
  name: "Secondary",
  args: {
    variant: "secondary",
    children: "Botão Secondary",
  },
};

export const Outline: Story = {
  name: "Outline",
  args: {
    variant: "outline",
    children: "Botão Outline",
  },
};

export const Ghost: Story = {
  name: "Ghost",
  args: {
    variant: "ghost",
    children: "Botão Ghost",
  },
};

export const Danger: Story = {
  name: "Danger",
  args: {
    variant: "danger",
    children: "Excluir Item",
  },
};

export const AllVariants: Story = {
  name: "Todas as Variantes",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Tamanhos",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "Todos os Tamanhos por Variante",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Button variant="primary" size="small">
          Small
        </Button>
        <Button variant="primary" size="medium">
          Medium
        </Button>
        <Button variant="primary" size="large">
          Large
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Button variant="secondary" size="small">
          Small
        </Button>
        <Button variant="secondary" size="medium">
          Medium
        </Button>
        <Button variant="secondary" size="large">
          Large
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Button variant="outline" size="small">
          Small
        </Button>
        <Button variant="outline" size="medium">
          Medium
        </Button>
        <Button variant="outline" size="large">
          Large
        </Button>
      </div>
    </div>
  ),
};

export const WithStartIcon: Story = {
  name: "Com Ícone à Esquerda",
  args: {
    startIcon: <Send />,
    children: "Enviar",
  },
};

export const WithEndIcon: Story = {
  name: "Com Ícone à Direita",
  args: {
    endIcon: <ArrowForward />,
    children: "Próximo",
  },
};

export const WithIcons: Story = {
  name: "Com Ícones",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button startIcon={<Send />}>Enviar</Button>
      <Button startIcon={<Download />} variant="secondary">
        Download
      </Button>
      <Button startIcon={<Settings />} variant="outline">
        Configurações
      </Button>
      <Button startIcon={<Delete />} variant="danger">
        Excluir
      </Button>
      <Button endIcon={<ArrowForward />} variant="ghost">
        Continuar
      </Button>
    </div>
  ),
};

export const IconButtons: Story = {
  name: "Botões de Ação com Ícones",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button startIcon={<Add />} variant="primary">
        Adicionar
      </Button>
      <Button startIcon={<Favorite />} variant="secondary">
        Favoritar
      </Button>
      <Button startIcon={<ShoppingCart />} variant="outline">
        Adicionar ao Carrinho
      </Button>
    </div>
  ),
};

export const LoadingState: Story = {
  name: "Estado de Carregamento",
  args: {
    loading: true,
    children: "Carregando...",
  },
};

export const LoadingVariants: Story = {
  name: "Loading em Diferentes Variantes",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button variant="primary" loading>
        Primary
      </Button>
      <Button variant="secondary" loading>
        Secondary
      </Button>
      <Button variant="outline" loading>
        Outline
      </Button>
      <Button variant="ghost" loading>
        Ghost
      </Button>
      <Button variant="danger" loading>
        Danger
      </Button>
    </div>
  ),
};

export const DisabledState: Story = {
  name: "Estado Desabilitado",
  args: {
    disabled: true,
    children: "Desabilitado",
  },
};

export const DisabledVariants: Story = {
  name: "Disabled em Diferentes Variantes",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  name: "Largura Total",
  render: () => (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Button fullWidth>Botão Full Width</Button>
      <Button fullWidth variant="secondary">
        Botão Secondary Full Width
      </Button>
      <Button fullWidth variant="outline">
        Botão Outline Full Width
      </Button>
    </div>
  ),
};

export const ButtonGroup: Story = {
  name: "Grupo de Botões",
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Button variant="outline">Cancelar</Button>
      <Button variant="primary">Confirmar</Button>
    </div>
  ),
};

export const FormButtons: Story = {
  name: "Botões de Formulário",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "24px",
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        justifyContent: "flex-end",
      }}
    >
      <Button variant="ghost">Cancelar</Button>
      <Button variant="outline" type="reset">
        Limpar
      </Button>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </div>
  ),
};

export const ActionBar: Story = {
  name: "Barra de Ações",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        alignItems: "center",
        justifyContent: "space-between",
        width: "600px",
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <Button variant="ghost" size="small" startIcon={<Settings />}>
          Configurações
        </Button>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button variant="danger" size="small" startIcon={<Delete />}>
          Excluir
        </Button>
        <Button variant="primary" size="small" startIcon={<Send />}>
          Publicar
        </Button>
      </div>
    </div>
  ),
};

export const RealWorldExample: Story = {
  name: "Exemplo Real - Card de Produto",
  render: () => (
    <div
      style={{
        width: "320px",
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "180px",
          backgroundColor: "#f0f0f0",
          borderRadius: "12px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
        }}
      >
        Imagem do Produto
      </div>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#333" }}>
        Produto Incrível
      </h3>
      <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#666" }}>
        Descrição breve do produto com detalhes importantes.
      </p>
      <p
        style={{
          margin: "0 0 16px 0",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#9472C8",
        }}
      >
        R$ 199,90
      </p>
      <div style={{ display: "flex", gap: "12px" }}>
        <Button variant="outline" startIcon={<Favorite />} fullWidth>
          Favoritar
        </Button>
        <Button variant="primary" startIcon={<ShoppingCart />} fullWidth>
          Comprar
        </Button>
      </div>
    </div>
  ),
};

export const LoginForm: Story = {
  name: "Exemplo Real - Formulário de Login",
  render: () => (
    <div
      style={{
        width: "360px",
        padding: "32px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ margin: "0 0 24px 0", textAlign: "center", color: "#333" }}>
        Entrar
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="email"
          placeholder="Email"
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />
        <Button variant="primary" fullWidth type="submit">
          Entrar
        </Button>
        <Button variant="ghost" fullWidth>
          Esqueci minha senha
        </Button>
      </div>
      <div
        style={{
          marginTop: "24px",
          paddingTop: "24px",
          borderTop: "1px solid #eee",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
          Não tem uma conta?
        </p>
        <Button variant="outline" fullWidth>
          Criar Conta
        </Button>
      </div>
    </div>
  ),
};
