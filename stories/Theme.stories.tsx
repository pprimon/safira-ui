import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle, useSafiraTheme, SafiraThemeProvider } from "../src/theme";
import { Button } from "../src/components/Button";
import { Input } from "../src/components/Input";
import { Card } from "../src/components/Card";
import { Alert } from "../src/components/Alert";
import { Badge } from "../src/components/Badge";
import { colors } from "../src/theme/tokens";

const meta: Meta = {
  title: "Design System/Theme",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Sistema de temas do Safira UI com modo claro e escuro, baseado na paleta de cores personalizada.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorPalette: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h2>Paleta de Cores Safira UI</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {/* Primary Colors */}
        <div>
          <h3>Primary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                backgroundColor: colors.primary.main,
                color: colors.primary.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Main: {colors.primary.main}
            </div>
            <div
              style={{
                backgroundColor: colors.primary.light,
                color: colors.primary.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Light: {colors.primary.light}
            </div>
            <div
              style={{
                backgroundColor: colors.primary.dark,
                color: colors.primary.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Dark: {colors.primary.dark}
            </div>
          </div>
        </div>

        {/* Secondary Colors */}
        <div>
          <h3>Secondary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                backgroundColor: colors.secondary.main,
                color: colors.secondary.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Main: {colors.secondary.main}
            </div>
            <div
              style={{
                backgroundColor: colors.secondary.light,
                color: colors.secondary.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Light: {colors.secondary.light}
            </div>
            <div
              style={{
                backgroundColor: colors.secondary.dark,
                color: colors.secondary.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Dark: {colors.secondary.dark}
            </div>
          </div>
        </div>

        {/* Accent Colors */}
        <div>
          <h3>Accent</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                backgroundColor: colors.accent.main,
                color: colors.accent.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Main: {colors.accent.main}
            </div>
            <div
              style={{
                backgroundColor: colors.accent.light,
                color: colors.accent.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Light: {colors.accent.light}
            </div>
            <div
              style={{
                backgroundColor: colors.accent.dark,
                color: colors.accent.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Dark: {colors.accent.dark}
            </div>
          </div>
        </div>

        {/* Surface Colors */}
        <div>
          <h3>Surface</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                backgroundColor: colors.surface.main,
                color: colors.surface.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                border: "1px solid #ccc",
              }}
            >
              Main: {colors.surface.main}
            </div>
            <div
              style={{
                backgroundColor: colors.surface.light,
                color: colors.surface.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                border: "1px solid #ccc",
              }}
            >
              Light: {colors.surface.light}
            </div>
            <div
              style={{
                backgroundColor: colors.surface.dark,
                color: colors.surface.contrastText,
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              Dark: {colors.surface.dark}
            </div>
          </div>
        </div>
      </div>

      {/* Status Colors */}
      <div>
        <h3>Status Colors</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "12px",
          }}
        >
          <div
            style={{
              backgroundColor: colors.success.main,
              color: colors.success.contrastText,
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Success
          </div>
          <div
            style={{
              backgroundColor: colors.error.main,
              color: colors.error.contrastText,
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Error
          </div>
          <div
            style={{
              backgroundColor: colors.warning.main,
              color: colors.warning.contrastText,
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Warning
          </div>
          <div
            style={{
              backgroundColor: colors.info.main,
              color: colors.info.contrastText,
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            Info
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ThemeToggleDemo: Story = {
  render: () => (
    <SafiraThemeProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <h2>Alternância de Tema</h2>
          <ThemeToggle />
        </div>

        <p>
          Use o botão acima para alternar entre o modo claro e escuro e ver como
          os componentes se adaptam.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <Card title="Exemplo de Card" subtitle="Com tema adaptável">
            <p>Este card se adapta automaticamente ao tema selecionado.</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <Button variant="primary" size="small">
                Primary
              </Button>
              <Button variant="secondary" size="small">
                Secondary
              </Button>
            </div>
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Input label="Campo de Entrada" placeholder="Digite algo aqui..." />

            <Alert severity="info">
              Este alert também se adapta ao tema atual.
            </Alert>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span>Badges:</span>
              <Badge content="Novo" color="accent" standalone />
              <Badge content={5} color="primary" standalone />
              <Badge variant="dot" color="success" standalone />
            </div>
          </div>
        </div>
      </div>
    </SafiraThemeProvider>
  ),
};

export const ComponentShowcase: Story = {
  render: () => (
    <SafiraThemeProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Showcase de Componentes</h2>
          <ThemeToggle />
        </div>

        {/* Buttons */}
        <div>
          <h3>Buttons</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h3>Alerts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Alert severity="success">Operação realizada com sucesso!</Alert>
            <Alert severity="info">Informação importante para o usuário.</Alert>
            <Alert severity="warning">
              Atenção: Verifique os dados inseridos.
            </Alert>
            <Alert severity="error">Erro ao processar a solicitação.</Alert>
          </div>
        </div>

        {/* Cards */}
        <div>
          <h3>Cards</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            <Card title="Card Elevado" variant="elevated">
              <p>Card com sombra padrão.</p>
            </Card>

            <Card title="Card Outlined" variant="outlined">
              <p>Card com borda colorida.</p>
            </Card>

            <Card title="Card Filled" variant="filled">
              <p>Card com fundo colorido.</p>
            </Card>
          </div>
        </div>

        {/* Form Elements */}
        <div>
          <h3>Form Elements</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            <Input label="Nome" placeholder="Digite seu nome" />

            <Input label="Email" type="email" placeholder="seu@email.com" />

            <Input label="Senha" type="password" placeholder="Digite sua senha" />
          </div>
        </div>
      </div>
    </SafiraThemeProvider>
  ),
};
