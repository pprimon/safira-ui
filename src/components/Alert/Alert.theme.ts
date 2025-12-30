import type { Theme, Components } from "@mui/material/styles";
import { 
  colors, 
  borderRadius,
  borderWidth,
  typography 
} from "../../theme/tokens";

type Severity = 'success' | 'error' | 'warning' | 'info';
type Mode = 'light' | 'dark';

const getSeverityColors = (severity: Severity, mode: Mode) => {
  const severityColors = colors[severity];
  
  const textColor = mode === 'light' 
    ? severityColors.dark 
    : ('text' in severityColors ? severityColors.text.dark : severityColors.light);
  
  const iconColor = mode === 'light'
    ? ('icon' in severityColors ? severityColors.icon.light : severityColors.main)
    : severityColors.light;
  
  const titleColor = mode === 'light'
    ? severityColors.dark
    : severityColors.title.dark;

  return {
    backgroundColor: severityColors.background[mode],
    color: textColor,
    borderColor: severityColors.border[mode],
    borderLeftColor: severityColors.main,
    iconColor,
    messageColor: textColor,
    titleColor,
  };
};

const createStandardSeverityStyles = (severity: Severity, mode: Mode) => {
  const severityColors = getSeverityColors(severity, mode);
  const className = `&.MuiAlert-standard${severity.charAt(0).toUpperCase() + severity.slice(1)}`;
  
  return {
    [className]: {
      backgroundColor: severityColors.backgroundColor,
      color: severityColors.color,
      borderColor: severityColors.borderColor,
      borderLeftColor: severityColors.borderLeftColor,
      "& .MuiAlert-icon": {
        color: severityColors.iconColor,
      },
      "& .MuiAlert-message": {
        color: severityColors.messageColor,
      },
      "& .MuiAlertTitle-root": {
        color: severityColors.titleColor,
      },
    },
  };
};

const createFilledSeverityStyles = (severity: Severity) => {
  const severityColors = colors[severity];
  const className = `&.MuiAlert-filled${severity.charAt(0).toUpperCase() + severity.slice(1)}`;
  
  if (severity === 'error') {
    const errorColors = colors.error;
    return {
      [className]: {
        backgroundColor: errorColors.filled.background,
        color: colors.white,
        borderColor: errorColors.filled.border,
        borderLeftColor: errorColors.main,
        "& .MuiAlert-icon": {
          color: colors.white,
        },
      },
    };
  }
  
  return {
    [className]: {
      backgroundColor: severityColors.main,
      color: severityColors.contrastText,
      borderColor: severityColors.main,
      borderLeftColor: severityColors.dark,
    },
  };
};

const createOutlinedSeverityStyles = (severity: Severity) => {
  const severityColors = colors[severity];
  const className = `&.MuiAlert-outlined${severity.charAt(0).toUpperCase() + severity.slice(1)}`;
  
  return {
    [className]: {
      borderColor: severityColors.main,
      borderLeftColor: severityColors.main,
      "& .MuiAlert-icon": {
        color: severityColors.main,
      },
    },
  };
};

export const getAlertThemeOverrides = (
  theme: Theme,
  mode: Mode
): Pick<Components<Theme>, "MuiAlert" | "MuiAlertTitle"> => ({
  MuiAlert: {
    styleOverrides: {
      root: {
        alignItems: "center",
        borderRadius: borderRadius.xl,
        padding: theme.spacing(2, 3),
        boxShadow: theme.shadows[2],
        fontWeight: typography.fontWeight.medium,
        borderLeftWidth: borderWidth.lg,
        borderLeftStyle: "solid",
        "&:hover": {
          boxShadow: theme.shadows[4],
          transform: "translateY(-2px)",
        },
        transition: theme.transitions.create(["box-shadow", "transform"], {
          duration: theme.transitions.duration.shorter,
        }),
      },
      standard: {
        ...createStandardSeverityStyles('success', mode),
        ...createStandardSeverityStyles('error', mode),
        ...createStandardSeverityStyles('warning', mode),
        ...createStandardSeverityStyles('info', mode),
      },
      filled: {
        "& .MuiAlert-message": {
          color: "inherit",
        },
        "& .MuiAlertTitle-root": {
          color: "inherit",
        },
        ...createFilledSeverityStyles('success'),
        ...createFilledSeverityStyles('error'),
        ...createFilledSeverityStyles('warning'),
        ...createFilledSeverityStyles('info'),
      },
      outlined: {
        backgroundColor: mode === "light" 
          ? colors.white 
          : theme.palette.background.paper,
        "& .MuiAlert-message": {
          color: theme.palette.text.primary,
        },
        "& .MuiAlertTitle-root": {
          color: theme.palette.text.primary,
        },
        ...createOutlinedSeverityStyles('success'),
        ...createOutlinedSeverityStyles('error'),
        ...createOutlinedSeverityStyles('warning'),
        ...createOutlinedSeverityStyles('info'),
      },
      icon: {
        fontSize: typography.fontSize.xl,
        marginRight: theme.spacing(2),
        alignSelf: "flex-start",
        marginTop: theme.spacing(0.25),
      },
      message: {
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
      },
      action: {
        padding: 0,
        marginRight: 0,
        alignItems: "flex-start",
      },
    },
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: {
        fontWeight: typography.fontWeight.bold,
        fontSize: typography.fontSize.lg,
        margin: 0,
        marginBottom: theme.spacing(0.5),
        letterSpacing: typography.letterSpacing.tight,
      },
    },
  },
});
