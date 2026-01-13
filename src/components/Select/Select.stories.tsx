import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { SelectChangeEvent } from "@mui/material";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Components/Select",
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
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamanho do select",
      table: { category: "Aparência", defaultValue: { summary: "medium" } },
    },
    disabled: {
      control: "boolean",
      description: "Se o select está desabilitado",
      table: { category: "Estado", defaultValue: { summary: "false" } },
    },
    error: {
      control: "boolean",
      description: "Se o select tem erro",
      table: { category: "Estado", defaultValue: { summary: "false" } },
    },
    required: {
      control: "boolean",
      description: "Se o select é obrigatório",
      table: { category: "Estado", defaultValue: { summary: "false" } },
    },
    fullWidth: {
      control: "boolean",
      description: "Se o select deve ocupar toda a largura",
      table: { category: "Aparência", defaultValue: { summary: "false" } },
    },
    multiple: {
      control: "boolean",
      description: "Se permite múltipla seleção",
      table: { category: "Comportamento", defaultValue: { summary: "false" } },
    },
    label: {
      control: "text",
      description: "Label do select",
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
    onChange: {
      action: "onChange",
      description: "Função executada ao mudar o valor",
      table: { category: "Comportamento" },
    },
  },
  args: {
    size: "medium",
    disabled: false,
    error: false,
    required: false,
    fullWidth: true,
    multiple: false,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

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
  name: "Padrão",
  render: function DefaultStory() {
    const [value, setValue] = useState("");

    return (
      <Select
        label="País"
        options={countryOptions}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
        placeholder="Selecione um país"
      />
    );
  },
};

export const WithValue: Story = {
  name: "Com Valor",
  render: function WithValueStory() {
    const [value, setValue] = useState("br");

    return (
      <Select
        label="País"
        options={countryOptions}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
      />
    );
  },
};

export const WithError: Story = {
  name: "Com Erro",
  args: {
    label: "País",
    options: countryOptions,
    error: true,
    helperText: "Por favor, selecione um país",
  },
};

export const Sizes: Story = {
  name: "Tamanhos",
  render: function SizesStory() {
    const [small, setSmall] = useState("");
    const [medium, setMedium] = useState("");
    const [large, setLarge] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Select
          label="Pequeno"
          options={countryOptions}
          size="small"
          placeholder="Select pequeno"
          value={small}
          onChange={(e) => setSmall(e.target.value as string)}
        />
        <Select
          label="Médio"
          options={countryOptions}
          size="medium"
          placeholder="Select médio"
          value={medium}
          onChange={(e) => setMedium(e.target.value as string)}
        />
        <Select
          label="Grande"
          options={countryOptions}
          size="large"
          placeholder="Select grande"
          value={large}
          onChange={(e) => setLarge(e.target.value as string)}
        />
      </div>
    );
  },
};

export const States: Story = {
  name: "Estados",
  render: function StatesStory() {
    const [normal, setNormal] = useState("");
    const [errorValue, setErrorValue] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Select
          label="Normal"
          options={countryOptions}
          placeholder="Estado normal"
          value={normal}
          onChange={(e) => setNormal(e.target.value as string)}
        />
        <Select
          label="Desabilitado"
          options={countryOptions}
          placeholder="Estado desabilitado"
          disabled
          value=""
          onChange={() => {}}
        />
        <Select
          label="Erro"
          options={countryOptions}
          placeholder="Estado de erro"
          error
          helperText="Mensagem de erro"
          value={errorValue}
          onChange={(e) => setErrorValue(e.target.value as string)}
        />
      </div>
    );
  },
};

export const Multiple: Story = {
  name: "Múltipla Seleção",
  render: function MultipleStory() {
    const [values, setValues] = useState<string[]>([]);

    return (
      <Select
        label="Categorias"
        options={categoryOptions}
        multiple
        placeholder="Selecione uma ou mais categorias"
        value={values}
        onChange={(e: SelectChangeEvent<string | string[]>) => 
          setValues(e.target.value as string[])
        }
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  name: "Com Opções Desabilitadas",
  render: function WithDisabledOptionsStory() {
    const [value, setValue] = useState("");

    return (
      <Select
        label="Opções"
        options={[
          { value: "option1", label: "Opção 1" },
          { value: "option2", label: "Opção 2 (Desabilitada)", disabled: true },
          { value: "option3", label: "Opção 3" },
          { value: "option4", label: "Opção 4 (Desabilitada)", disabled: true },
          { value: "option5", label: "Opção 5" },
        ]}
        placeholder="Selecione uma opção"
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
      />
    );
  },
};

export const Required: Story = {
  name: "Obrigatório",
  render: function RequiredStory() {
    const [value, setValue] = useState("");

    return (
      <Select
        label="País de Nascimento"
        options={countryOptions}
        required
        helperText="Este campo é obrigatório"
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
      />
    );
  },
};

export const LongList: Story = {
  name: "Lista Longa",
  render: function LongListStory() {
    const [value, setValue] = useState("");

    const stateOptions = [
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
    ];

    return (
      <Select
        label="Estado"
        options={stateOptions}
        placeholder="Selecione um estado"
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
      />
    );
  },
};
