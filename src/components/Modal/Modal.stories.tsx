import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: "Components/Modal",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal moderno com animações suaves, backdrop blur e controle completo de estado.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Se o modal está aberto",
      table: { category: "Estado" },
    },
    title: {
      control: "text",
      description: "Título do modal",
      table: { category: "Conteúdo" },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamanho do modal",
      table: { category: "Aparência", defaultValue: { summary: "medium" } },
    },
    maxWidth: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Largura máxima do modal",
      table: { category: "Aparência", defaultValue: { summary: "sm" } },
    },
    showCloseButton: {
      control: "boolean",
      description: "Se deve mostrar o botão de fechar",
      table: { category: "Comportamento", defaultValue: { summary: "true" } },
    },
    closeOnBackdropClick: {
      control: "boolean",
      description: "Se deve fechar ao clicar no backdrop",
      table: { category: "Comportamento", defaultValue: { summary: "true" } },
    },
    closeOnEscape: {
      control: "boolean",
      description: "Se deve fechar ao pressionar ESC",
      table: { category: "Comportamento", defaultValue: { summary: "true" } },
    },
    fullHeight: {
      control: "boolean",
      description: "Se o modal deve ocupar toda a altura",
      table: { category: "Aparência", defaultValue: { summary: "false" } },
    },
    onClose: {
      action: "onClose",
      description: "Função executada ao fechar o modal",
      table: { category: "Comportamento" },
    },
  },
  args: {
    open: false,
    title: "Título do Modal",
    size: "medium",
    maxWidth: "sm",
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    fullHeight: false,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  name: "Padrão",
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Modal Padrão">
          <p>Este é o conteúdo do modal padrão.</p>
          <p>Você pode adicionar qualquer conteúdo aqui.</p>
        </Modal>
      </>
    );
  },
};

export const WithActions: Story = {
  name: "Com Ações",
  render: function WithActionsStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal com Ações</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar Ação"
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Confirmar
              </Button>
            </>
          }
        >
          <p>Tem certeza que deseja continuar com esta ação?</p>
        </Modal>
      </>
    );
  },
};

export const WithoutTitle: Story = {
  name: "Sem Título",
  render: function WithoutTitleStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal sem Título</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <h2 style={{ margin: "0 0 16px 0", color: "#572F93" }}>
            Título Customizado
          </h2>
          <p>Modal sem título padrão, mas com conteúdo customizado.</p>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  name: "Tamanhos",
  render: function SizesStory() {
    const [openSmall, setOpenSmall] = useState(false);
    const [openMedium, setOpenMedium] = useState(false);
    const [openLarge, setOpenLarge] = useState(false);

    return (
      <div style={{ display: "flex", gap: "16px" }}>
        <Button onClick={() => setOpenSmall(true)}>Modal Pequeno</Button>
        <Button onClick={() => setOpenMedium(true)}>Modal Médio</Button>
        <Button onClick={() => setOpenLarge(true)}>Modal Grande</Button>

        <Modal
          open={openSmall}
          onClose={() => setOpenSmall(false)}
          title="Modal Pequeno"
          size="small"
        >
          <p>Este é um modal pequeno.</p>
        </Modal>

        <Modal
          open={openMedium}
          onClose={() => setOpenMedium(false)}
          title="Modal Médio"
          size="medium"
        >
          <p>Este é um modal médio com mais conteúdo.</p>
          <p>Pode ter múltiplos parágrafos e elementos.</p>
        </Modal>

        <Modal
          open={openLarge}
          onClose={() => setOpenLarge(false)}
          title="Modal Grande"
          size="large"
        >
          <p>Este é um modal grande com muito conteúdo.</p>
          <p>Ideal para formulários complexos ou conteúdo extenso.</p>
          <p>Pode acomodar muito mais informações.</p>
        </Modal>
      </div>
    );
  },
};

export const WithForm: Story = {
  name: "Com Formulário",
  render: function WithFormStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal com Formulário</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Cadastro de Usuário"
          maxWidth="md"
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary">Cadastrar</Button>
            </>
          }
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Input label="Nome" placeholder="Digite seu nome" fullWidth />
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              fullWidth
            />
            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              fullWidth
            />
          </div>
        </Modal>
      </>
    );
  },
};

export const Confirmation: Story = {
  name: "Confirmação",
  render: function ConfirmationStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Excluir Item
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar Exclusão"
          size="small"
          maxWidth="sm"
          actions={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                Excluir
              </Button>
            </>
          }
        >
          <p>Tem certeza que deseja excluir este item?</p>
          <p style={{ color: "#F44336", fontSize: "0.875rem" }}>
            Esta ação não pode ser desfeita.
          </p>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  name: "Sem Botão Fechar",
  render: function NoCloseButtonStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal sem Botão Fechar</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal sem Botão Fechar"
          showCloseButton={false}
          closeOnBackdropClick={false}
          closeOnEscape={false}
          actions={
            <Button variant="primary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          }
        >
          <p>Este modal só pode ser fechado através dos botões de ação.</p>
        </Modal>
      </>
    );
  },
};

export const FullWidth: Story = {
  name: "Largura Total",
  render: function FullWidthStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal Largo</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal de Largura Total"
          maxWidth="lg"
          fullWidth
          actions={
            <Button variant="primary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          }
        >
          <p>
            Este modal usa a largura máxima "lg" e ocupa toda a largura
            disponível.
          </p>
          <p>Útil para exibir tabelas, gráficos ou conteúdo extenso.</p>
        </Modal>
      </>
    );
  },
};
