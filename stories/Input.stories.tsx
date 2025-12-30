import type { Meta, StoryObj } from "@storybook/react";
// Mock function for actions
const fn = () => () => {};
import { Input } from "../src/components/Input";
import { Email, Search, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
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
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "Tipo do input HTML",
    },
    disabled: {
      control: "boolean",
      description: "Se o input está desabilitado",
    },
    error: {
      control: "boolean",
      description: "Se o input tem erro",
    },
    required: {
      control: "boolean",
      description: "Se o input é obrigatório",
    },
    fullWidth: {
      control: "boolean",
      description: "Se o input deve ocupar toda a largura",
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Nome",
    placeholder: "Digite seu nome",
  },
};

export const WithValue: Story = {
  args: {
    label: "Email",
    value: "usuario@exemplo.com",
    type: "email",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    value: "email-invalido",
    type: "email",
    error: true,
    helperText: "Por favor, insira um email válido",
  },
};

export const WithIcons: Story = {
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
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input label="Pequeno" placeholder="Input pequeno" size="small" />
      <Input label="Médio" placeholder="Input médio" size="medium" />
      <Input label="Grande" placeholder="Input grande" size="large" />
    </div>
  ),
};

export const States: Story = {
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
  render: () => {
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
  args: {
    label: "Nome Completo",
    placeholder: "Digite seu nome completo",
    required: true,
    helperText: "Este campo é obrigatório",
  },
};

export const WithMaxLength: Story = {
  args: {
    label: "Bio",
    placeholder: "Conte um pouco sobre você",
    maxLength: 100,
    helperText: "Máximo de 100 caracteres",
  },
};
