import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";

export interface VisuallyHiddenProps extends BoxProps {
  children: React.ReactNode;
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      component="span"
      sx={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default VisuallyHidden;
