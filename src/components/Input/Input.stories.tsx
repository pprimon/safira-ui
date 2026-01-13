import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { Email, Search, Visibility, VisibilityOff } from "@mui/icons-material";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/Input",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de entrada moderno com estados visuais, validação e acessibilidade completa.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamanho do input",
      table: { category: "Aparência", defaultValue: { summary: "medium" } },
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "Tipo do input HTML",
      table: { category: "Comportamento", defaultValue: { summary: "text" } },
    },
    label: {
      control: "text",
      description: "Label do input",
      table: { category: "Conteúdo" },
    },
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
      table: { category: "Conteúdo" },
    },
    helperText: {
      control: "text",
      description: "Texto de ajuda ou erro",
      table: { category: "Conteúdo" },
    },
    disabled: {
      control: "boolean",
      description: "Se o input está desabilitado",
      table: { category: "Estado", defaultValue: { summary: "false" } },
    },
    error: {
      control: "boolean",
      description: "Se o input tem erro",
      table: { category: "Estado", defaultValue: { summary: "false" } },
    },
    required: {
      control: "boolean",
      description: "Se o input é obrigatório",
      table: { category: "Comportamento", defaultValue: { summary: "false" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Se o input deve ocupar toda a largura",
      table: { category: "Aparência", defaultValue: { summary: "false" } },
    },
  },
  args: {
    label: "Nome",
    placeholder: "Digite seu nome",
    size: "medium",
    type: "text",
    disabled: false,
    error: false,
    required: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  name: "Padrão",
  args: {
    label: "Nome",
    placeholder: "Digite seu nome",
  },
};

export const WithValue: Story = {
  name: "Com Valor",
  args: {
    label: "Email",
    value: "usuario@exemplo.com",
    type: "email",
  },
};

export const WithError: Story = {
  name: "Com Erro",
  args: {
    label: "Email",
    value: "email-invalido",
    type: "email",
    error: true,
    helperText: "Por favor, insira um email válido",
  },
};

export const WithIcons: Story = {
  name: "Com Ícones",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input
        label="Email"
        placeholder="seu@email.com"
        type="email"
        startIcon={<Email />}
      />
      <Input
        label="Buscar"
        placeholder="Digite para buscar..."
        type="search"
        endIcon={<Search />}
      />
    </div>
  ),
};

export const Sizes: Story = {
  name: "Tamanhos",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input label="Pequeno" placeholder="Input pequeno" size="small" />
      <Input label="Médio" placeholder="Input médio" size="medium" />
      <Input label="Grande" placeholder="Input grande" size="large" />
    </div>
  ),
};

export const States: Story = {
  name: "Estados",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input label="Normal" placeholder="Estado normal" />
      <Input label="Com foco" placeholder="Estado com foco" autoFocus />
      <Input label="Desabilitado" placeholder="Estado desabilitado" disabled />
      <Input
        label="Erro"
        placeholder="Estado de erro"
        error
        helperText="Mensagem de erro"
      />
    </div>
  ),
};

export const PasswordInput: Story = {
  name: "Senha",
  render: function PasswordStory() {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        label="Senha"
        type={showPassword ? "text" : "password"}
        placeholder="Digite sua senha"
        endIcon={
          showPassword ? (
            <VisibilityOff
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Visibility
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(true)}
            />
          )
        }
      />
    );
  },
};

export const Required: Story = {
  name: "Obrigatório",
  args: {
    label: "Nome Completo",
    placeholder: "Digite seu nome completo",
    required: true,
    helperText: "Este campo é obrigatório",
  },
};

export const WithMaxLength: Story = {
  name: "Com Limite de Caracteres",
  args: {
    label: "Bio",
    placeholder: "Conte um pouco sobre você",
    maxLength: 100,
    helperText: "Máximo de 100 caracteres",
  },
};

export const AllTypes: Story = {
  name: "Todos os Tipos",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input label="Texto" type="text" placeholder="Digite texto..." />
      <Input label="Email" type="email" placeholder="seu@email.com" />
      <Input label="Senha" type="password" placeholder="••••••••" />
      <Input label="Número" type="number" placeholder="123" />
      <Input label="Telefone" type="tel" placeholder="(11) 99999-9999" />
      <Input label="URL" type="url" placeholder="https://exemplo.com" />
      <Input label="Busca" type="search" placeholder="Pesquisar..." />
    </div>
  ),
};

