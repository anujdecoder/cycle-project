import { createTheme, PaletteOptions } from "@mui/material/styles"
import { SimplePaletteColorOptions } from "@mui/material/styles/createPalette"

// @ts-ignore
import defaultTheme from "@mui/material/styles/defaultTheme"
import defaultShadows, { Shadows } from "@mui/material/styles/shadows"
import { alpha } from "@mui/system"

const shadows = [...defaultShadows] as Shadows
shadows[1] = "0 0 8px #0000000a"
shadows[2] = "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"

const lightPalette: PaletteOptions = {
  primary: {
    main: "#6d24ff",
  },
  secondary: {
    main: "#7859ff",
  },
  success: {
    main: "#4FCD6A",
  },
  background: {
    default: "#eee",
    paper: "#fff",
  },
  text: {
    primary: "#000",
    secondary: "#00000099",
    disabled: "#00000061",
  },
  divider: "#0000001f",
  mode: "light",
  tonalOffset: 0.1,
}

const darkPalette: PaletteOptions = {
  primary: {
    main: "#7267ef",
  },
  secondary: {
    main: "#7267ef",
  },
  success: {
    main: "#4FCD6A",
  },
  background: {
    default: "#111936",
    paper: "#212946",
  },
  text: {
    primary: "#fff",
    secondary: "#ffffffb3",
    disabled: "#ffffff80",
  },
  divider: "#ffffff1f",
  mode: "dark",
  tonalOffset: 0.05,
}

const themeBuilder = (palette: PaletteOptions) =>
  createTheme({
    palette,
    typography: {
      fontFamily: "Poppins, Helvetica, sans-serif",
    },
    shadows,
    shape: {
      borderRadius: defaultTheme.shape.borderRadius * 1.5,
    },
    mixins: {
      toolbar: {
        height: defaultTheme.spacing(8),
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
          startIcon: {
            marginRight: 4,
          },
          outlinedPrimary: {
            borderColor: alpha((palette.primary as SimplePaletteColorOptions).main, 0.2),
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            opacity: 0.72,
          },
          outlined: {
            position: "relative",
            transform: "translate(4px, 2px) scale(0.75)",
            transformOrigin: "left top",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            opacity: 0.72,
            transform: "scale(0.75)",
            transformOrigin: "left bottom",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: defaultTheme.shape.borderRadius * 2,
          },
          notchedOutline: {
            top: 0,
            legend: {
              display: "none",
            },
          },
        },
      },
      MuiFilledInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          root: {
            borderRadius: defaultTheme.shape.borderRadius,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          size: "small",
          margin: "dense",
          InputLabelProps: { shrink: true },
        },
      },
      MuiPopper: {
        defaultProps: {
          style: {
            zIndex: defaultTheme.zIndex.tooltip,
          },
        },
      },
    },
  })

export const darkTheme = themeBuilder(darkPalette)
export const lightTheme = themeBuilder(lightPalette)
