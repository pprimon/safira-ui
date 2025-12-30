#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Lista de arquivos para corrigir
const filesToFix = [
  'src/components/Alert/Alert.tsx',
  'src/components/Badge/Badge.tsx',
  'src/components/Card/Card.tsx',
  'src/components/Input/Input.tsx',
  'src/components/Modal/Modal.tsx',
  'src/components/Select/Select.tsx',
  'src/components/Tooltip/Tooltip.tsx'
];

// Padrões de substituição
const replacements = [
  // Corrigir imports de tipos do nosso projeto
  {
    pattern: /import\s*{\s*([^}]*BaseComponentProps[^}]*)\s*}\s*from\s*["']\.\.\/\.\.\/types["'];/g,
    replacement: 'import type { $1 } from "../../types";'
  },
  // Corrigir imports de tipos do MUI
  {
    pattern: /import\s*{\s*([^}]*Props[^}]*)\s*}\s*from\s*["']@mui\/material["'];/g,
    replacement: (match, types) => {
      // Separar tipos de componentes
      const parts = types.split(',').map(p => p.trim());
      const typeImports = [];
      const componentImports = [];
      
      parts.forEach(part => {
        if (part.includes('Props') || part.includes('Type')) {
          typeImports.push(part);
        } else {
          componentImports.push(part);
        }
      });
      
      let result = '';
      if (componentImports.length > 0) {
        result += `import { ${componentImports.join(', ')} } from "@mui/material";\n`;
      }
      if (typeImports.length > 0) {
        result += `import type { ${typeImports.join(', ')} } from "@mui/material";`;
      }
      
      return result;
    }
  }
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Aplicar correções específicas por arquivo
    if (filePath.includes('Alert')) {
      content = content.replace(
        /import\s*{\s*BaseComponentProps,\s*Severity\s*}\s*from\s*["']\.\.\/\.\.\/types["'];/,
        'import type { BaseComponentProps, Severity } from "../../types";'
      );
    }
    
    if (filePath.includes('Badge')) {
      content = content.replace(
        /import\s*{\s*BaseComponentProps,\s*SizeProps,\s*ColorProps,\s*VariantProps\s*}\s*from\s*["']\.\.\/\.\.\/types["'];/,
        'import type { BaseComponentProps, SizeProps, ColorProps, VariantProps } from "../../types";'
      );
      content = content.replace(
        /import\s*{\s*Badge,\s*BadgeProps\s*as\s*MuiBadgeProps,\s*}\s*from\s*["']@mui\/material["'];/,
        'import { Badge } from "@mui/material";\nimport type { BadgeProps as MuiBadgeProps } from "@mui/material";'
      );
    }
    
    if (filePath.includes('Card')) {
      content = content.replace(
        /import\s*{\s*BaseComponentProps,\s*ClickableProps\s*}\s*from\s*["']\.\.\/\.\.\/types["'];/,
        'import type { BaseComponentProps, ClickableProps } from "../../types";'
      );
    }
    
    if (filePath.includes('Input')) {
      content = content.replace(
        /import\s*{\s*BaseComponentProps,\s*SizeProps,\s*DisabledProps\s*}\s*from\s*["']\.\.\/\.\.\/types["'];/,
        'import type { BaseComponentProps, SizeProps, DisabledProps } from "../../types";'
      );
      content = content.replace(
        /import\s*{\s*TextField,\s*TextFieldProps,\s*InputAdornment,\s*FormHelperText,\s*}\s*from\s*["']@mui\/material["'];/,
        'import { TextField, InputAdornment, FormHelperText } from "@mui/material";\nimport type { TextFieldProps } from "@mui/material";'
      );
    }
    
    if (filePath.includes('Modal')) {
      content = content.replace(
        /import\s*{\s*BaseComponentProps,\s*SizeProps\s*}\s*from\s*["']\.\.\/\.\.\/types["'];/,
        'import type { BaseComponentProps, SizeProps } from "../../types";'
      );
    }
    
    if (filePath.includes('Select')) {
      content = content.replace(
        /import\s*{\s*BaseComponentProps,\s*SizeProps,\s*DisabledProps\s*}\s*from\s*["']\.\.\/\.\.\/types["'];/,
        'import type { BaseComponentProps, SizeProps, DisabledProps } from "../../types";'
      );
      content = content.replace(
        /import\s*{\s*FormControl,\s*InputLabel,\s*Select,\s*MenuItem,\s*FormHelperText,\s*SelectProps,\s*}\s*from\s*["']@mui\/material["'];/,
        'import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";\nimport type { SelectProps } from "@mui/material";'
      );
    }
    
    if (filePath.includes('Tooltip')) {
      content = content.replace(
        /import\s*{\s*BaseComponentProps,\s*Position\s*}\s*from\s*["']\.\.\/\.\.\/types["'];/,
        'import type { BaseComponentProps, Position } from "../../types";'
      );
      content = content.replace(
        /import\s*{\s*Tooltip,\s*TooltipProps,\s*}\s*from\s*["']@mui\/material["'];/,
        'import { Tooltip } from "@mui/material";\nimport type { TooltipProps } from "@mui/material";'
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in ${filePath}`);
  }
});

console.log('All imports fixed!');

