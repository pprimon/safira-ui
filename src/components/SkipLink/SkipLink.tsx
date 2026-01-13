import { Link } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

export interface SkipLinkProps {
  mainContentId?: string;
  children?: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  mainContentId = "main-content",
  children = "Pular para o conteúdo principal",
}) => {
  const theme = useTheme();

  return (
    <Link
      href={`#${mainContentId}`}
      component="a"
      sx={{
        position: "absolute",
        top: "-100px",
        left: "16px",
        padding: theme.spacing(1.5, 3),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        textDecoration: "none",
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.body1.fontSize,
        borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
        zIndex: theme.zIndex.tooltip + 1,
        transition: theme.transitions.create(["top", "box-shadow"], {
          duration: theme.transitions.duration.shorter,
        }),
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
        },
        "&:focus": {
          top: 0,
          outline: "none",
          boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
        },
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      {children}
    </Link>
  );
};

export default SkipLink;
