import type { Meta, StoryObj } from "@storybook/react";
// Mock function for actions
const fn = () => () => {};
import { Select } from "../src/components/Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown moderno com opções customizáveis, estados visuais e acessibilidade completa.",
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
      description: "Tamanho do select",
    },
    disabled: {
      control: "boolean",
      description: "Se o select está desabilitado",
    },
    error: {
      control: "boolean",
      description: "Se o select tem erro",
    },
    required: {
      control: "boolean",
      description: "Se o select é obrigatório",
    },
    fullWidth: {
      control: "boolean",
      description: "Se o select deve ocupar toda a largura",
    },
    multiple: {
      control: "boolean",
      description: "Se permite múltipla seleção",
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: "br", label: "Brasil" },
  { value: "us", label: "Estados Unidos" },
  { value: "ca", label: "Canadá" },
  { value: "mx", label: "México" },
  { value: "ar", label: "Argentina" },
];

const categoryOptions = [
  { value: "tech", label: "Tecnologia" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Vendas" },
  { value: "support", label: "Suporte" },
];

export const Default: Story = {
  args: {
    label: "País",
    options: countryOptions,
    placeholder: "Selecione um país",
  },
};

export const WithValue: Story = {
  args: {
    label: "País",
    options: countryOptions,
    value: "br",
  },
};

export const WithError: Story = {
  args: {
    label: "País",
    options: countryOptions,
    error: true,
    helperText: "Por favor, selecione um país",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Select
        label="Pequeno"
        options={countryOptions}
        size="small"
        placeholder="Select pequeno"
      />
      <Select
        label="Médio"
        options={countryOptions}
        size="medium"
        placeholder="Select médio"
      />
      <Select
        label="Grande"
        options={countryOptions}
        size="large"
        placeholder="Select grande"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Select
        label="Normal"
        options={countryOptions}
        placeholder="Estado normal"
      />
      <Select
        label="Desabilitado"
        options={countryOptions}
        placeholder="Estado desabilitado"
        disabled
      />
      <Select
        label="Erro"
        options={countryOptions}
        placeholder="Estado de erro"
        error
        helperText="Mensagem de erro"
      />
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    label: "Categorias",
    options: categoryOptions,
    multiple: true,
    placeholder: "Selecione uma ou mais categorias",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: "Opções",
    options: [
      { value: "option1", label: "Opção 1" },
      { value: "option2", label: "Opção 2 (Desabilitada)", disabled: true },
      { value: "option3", label: "Opção 3" },
      { value: "option4", label: "Opção 4 (Desabilitada)", disabled: true },
      { value: "option5", label: "Opção 5" },
    ],
    placeholder: "Selecione uma opção",
  },
};

export const Required: Story = {
  args: {
    label: "País de Nascimento",
    options: countryOptions,
    required: true,
    helperText: "Este campo é obrigatório",
  },
};

export const LongList: Story = {
  args: {
    label: "Estado",
    options: [
      { value: "ac", label: "Acre" },
      { value: "al", label: "Alagoas" },
      { value: "ap", label: "Amapá" },
      { value: "am", label: "Amazonas" },
      { value: "ba", label: "Bahia" },
      { value: "ce", label: "Ceará" },
      { value: "df", label: "Distrito Federal" },
      { value: "es", label: "Espírito Santo" },
      { value: "go", label: "Goiás" },
      { value: "ma", label: "Maranhão" },
      { value: "mt", label: "Mato Grosso" },
      { value: "ms", label: "Mato Grosso do Sul" },
      { value: "mg", label: "Minas Gerais" },
      { value: "pa", label: "Pará" },
      { value: "pb", label: "Paraíba" },
      { value: "pr", label: "Paraná" },
      { value: "pe", label: "Pernambuco" },
      { value: "pi", label: "Piauí" },
      { value: "rj", label: "Rio de Janeiro" },
      { value: "rn", label: "Rio Grande do Norte" },
      { value: "rs", label: "Rio Grande do Sul" },
      { value: "ro", label: "Rondônia" },
      { value: "rr", label: "Roraima" },
      { value: "sc", label: "Santa Catarina" },
      { value: "sp", label: "São Paulo" },
      { value: "se", label: "Sergipe" },
      { value: "to", label: "Tocantins" },
    ],
    placeholder: "Selecione um estado",
  },
};
