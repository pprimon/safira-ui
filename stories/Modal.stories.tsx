import type { Meta, StoryObj } from "@storybook/react";
// Mock function for actions
const fn = () => () => {};
import { Modal } from "../src/components/Modal";
import { Button } from "../src/components/Button";
import { Input } from "../src/components/Input";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal moderno com animações suaves, backdrop blur e controle completo de estado.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamanho do modal",
    },
    maxWidth: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Largura máxima do modal",
    },
    showCloseButton: {
      control: "boolean",
      description: "Se deve mostrar o botão de fechar",
    },
    closeOnBackdropClick: {
      control: "boolean",
      description: "Se deve fechar ao clicar no backdrop",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Se deve fechar ao pressionar ESC",
    },
    fullHeight: {
      control: "boolean",
      description: "Se o modal deve ocupar toda a altura",
    },
  },
  args: {
    onClose: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
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

export const WithoutTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal sem Título</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <h2 style={{ margin: "0 0 16px 0", color: "#EBE54B" }}>
            Título Customizado
          </h2>
          <p>Modal sem título padrão, mas com conteúdo customizado.</p>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
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
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal com Formulário</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Cadastro de Usuário"
          maxWidth="md"
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
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary">Cadastrar</Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

export const Confirmation: Story = {
  render: () => {
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
        >
          <p>Tem certeza que deseja excluir este item?</p>
          <p style={{ color: "#F44336", fontSize: "0.875rem" }}>
            Esta ação não pode ser desfeita.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Excluir
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
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
        >
          <p>Este modal só pode ser fechado através dos botões de ação.</p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button variant="primary" onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};
