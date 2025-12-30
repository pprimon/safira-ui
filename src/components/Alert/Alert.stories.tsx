import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import { Button } from "../Button";
import { Star, Favorite } from "@mui/icons-material";

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Components/Alert",
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    severity: {
      control: "select",
      options: ["success", "error", "warning", "info"],
      description:
        "Define a cor e o ícone do alerta baseado no tipo de mensagem.",
      table: { category: "Aparência", defaultValue: { summary: "info" } },
    },
    variant: {
      control: "select",
      options: ["filled", "outlined", "standard"],
      description: "Define o estilo visual do alerta.",
      table: { category: "Aparência", defaultValue: { summary: "standard" } },
    },
    title: {
      control: "text",
      description: "Título principal do alerta. Deve ser curto e descritivo.",
      table: { category: "Conteúdo" },
    },
    children: {
      control: "text",
      description: "Conteúdo/mensagem do alerta.",
      table: { category: "Conteúdo" },
    },
    icon: {
      control: false,
      description:
        "Ícone customizado (substitui o ícone padrão da severidade).",
      table: { category: "Conteúdo" },
    },
    showIcon: {
      control: "boolean",
      description: "Exibe ou oculta o ícone do alerta.",
      table: { category: "Aparência", defaultValue: { summary: "true" } },
    },
    closable: {
      control: "boolean",
      description: "Exibe ou oculta o botão de fechar.",
      table: { category: "Comportamento", defaultValue: { summary: "false" } },
    },
    visible: {
      control: "boolean",
      description: "Controla a visibilidade do alerta (para animação).",
      table: { category: "Comportamento", defaultValue: { summary: "true" } },
    },
    onClose: {
      action: "onClose",
      description: "Função executada ao clicar no botão de fechar.",
      table: { category: "Comportamento" },
    },
  },
  args: {
    severity: "info",
    variant: "standard",
    children: "Esta é uma mensagem de alerta.",
    visible: true,
    showIcon: true,
    closable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  name: "Padrão",
  args: {
    severity: "info",
    children: "Esta é uma mensagem de alerta padrão.",
  },
};

export const Success: Story = {
  name: "Sucesso",
  args: {
    severity: "success",
    children: "Operação realizada com sucesso!",
  },
};

export const Error: Story = {
  name: "Erro",
  args: {
    severity: "error",
    children: "Erro ao processar a solicitação. Tente novamente.",
  },
};

export const Warning: Story = {
  name: "Aviso",
  args: {
    severity: "warning",
    children: "Atenção: Esta ação não pode ser desfeita.",
  },
};

export const Info: Story = {
  name: "Informação",
  args: {
    severity: "info",
    children: "Informação importante sobre o sistema.",
  },
};

export const WithTitle: Story = {
  name: "Com Título",
  args: {
    severity: "success",
    title: "Sucesso!",
    children: "Seu perfil foi atualizado com sucesso.",
  },
};

export const AllSeverities: Story = {
  name: "Todas as Severidades",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert severity="success" title="Sucesso">
        Operação concluída com êxito.
      </Alert>

      <Alert severity="info" title="Informação">
        Dados atualizados automaticamente.
      </Alert>

      <Alert severity="warning" title="Atenção">
        Verifique as configurações antes de continuar.
      </Alert>

      <Alert severity="error" title="Erro">
        Falha na conexão com o servidor.
      </Alert>
    </div>
  ),
};

export const Variants: Story = {
  name: "Variantes",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert severity="success" variant="standard">
        Alert padrão com fundo colorido sutil
      </Alert>

      <Alert severity="success" variant="filled">
        Alert preenchido com cor sólida
      </Alert>

      <Alert severity="success" variant="outlined">
        Alert com borda colorida
      </Alert>
    </div>
  ),
};

export const Closable: Story = {
  name: "Fechável",
  render: function ClosableStory() {
    const [visible, setVisible] = useState(true);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Alert
          severity="info"
          title="Alert Fechável"
          closable
          visible={visible}
          onClose={() => setVisible(false)}
        >
          Este alert pode ser fechado clicando no X.
        </Alert>

        {!visible && (
          <Button onClick={() => setVisible(true)}>
            Mostrar Alert Novamente
          </Button>
        )}
      </div>
    );
  },
};

export const CustomIcon: Story = {
  name: "Ícone Customizado",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert
        severity="info"
        title="Alert com Ícone Customizado"
        icon={<Star />}
      >
        Este alert usa um ícone de estrela personalizado.
      </Alert>

      <Alert severity="success" title="Favorito Adicionado" icon={<Favorite />}>
        Item adicionado aos seus favoritos!
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  name: "Sem Ícone",
  args: {
    severity: "info",
    title: "Alert sem Ícone",
    showIcon: false,
    children: "Este alert não exibe nenhum ícone.",
  },
};

export const LongContent: Story = {
  name: "Conteúdo Longo",
  args: {
    severity: "warning",
    title: "Aviso Detalhado",
    closable: true,
    children:
      "Este é um alert com conteúdo mais longo para demonstrar como o componente se comporta com textos extensos. O alert mantém sua formatação e legibilidade mesmo com múltiplas linhas de texto. Você pode incluir informações detalhadas sobre o problema ou situação que requer atenção do usuário.",
  },
};

export const Interactive: Story = {
  name: "Interativo",
  render: function InteractiveStory() {
    const [alerts, setAlerts] = useState<
      Array<{
        id: number;
        severity: "success" | "error" | "warning" | "info";
        message: string;
      }>
    >([]);
    let nextId = 1;

    const addAlert = (
      severity: "success" | "error" | "warning" | "info",
      message: string
    ) => {
      const newAlert = { id: nextId++, severity, message };
      setAlerts((prev) => [...prev, newAlert]);

      setTimeout(() => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== newAlert.id));
      }, 5000);
    };

    const removeAlert = (id: number) => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button
            variant="primary"
            size="small"
            onClick={() =>
              addAlert("success", "Operação realizada com sucesso!")
            }
          >
            Sucesso
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() =>
              addAlert("info", "Informação importante para o usuário.")
            }
          >
            Info
          </Button>
          <Button
            variant="outline"
            size="small"
            onClick={() =>
              addAlert("warning", "Atenção: Verifique os dados inseridos.")
            }
          >
            Aviso
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={() =>
              addAlert("error", "Erro ao processar a solicitação.")
            }
          >
            Erro
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              severity={alert.severity}
              closable
              onClose={() => removeAlert(alert.id)}
            >
              {alert.message}
            </Alert>
          ))}
        </div>
      </div>
    );
  },
};
