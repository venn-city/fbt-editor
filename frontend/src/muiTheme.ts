import { createMuiTheme } from '@material-ui/core/styles'

const PRIMARY_TEXT_COLOR = 'rgba(0, 0, 0, 0.87)'
const SECONDARY_TEXT_COLOR = '#3C3838'
const DIVIDER_COLOR = 'rgba(0, 0, 0, 0.6)'
const ERROR_COLOR = '#D7574A'

const rawTheme: any = {
  typography: {
    htmlFontSize: 10,
    fontWeightBold: 500,
    fontFamily: 'Roboto',
    h1: {
      fontStyle: 'normal',
      color: PRIMARY_TEXT_COLOR,
      lineHeight: '52px',
      fontSize: 34,
      fontWeight: '400',
    },
    h3: {
      fontStyle: 'normal',
      color: PRIMARY_TEXT_COLOR,
      fontWeight: 'bold',
      lineHeight: '15px',
      fontSize: 16,
      fontStretch: '100%',
    },
    h6: {
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: 1.5,
      color: DIVIDER_COLOR,
      textTransform: 'uppercase',
    },
    body1: {
      lineHeight: 1.5,
      color: PRIMARY_TEXT_COLOR,
      fontSize: 16,
    },
    body2: {
      lineHeight: 1.5,
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 16,
    },
  },
  colors: { // this is custom field to store theme related color data
    leftPanelBackground: '#e3f2fb',
  },
  props: {
    MuiListItem: {
      disableRipple: true,
    },
    MuiIconButton: {
      disableRipple: true,
    },
    MuiButton: {
      disableRipple: true,
    },
    MuiMenuItem: {
      disableRipple: true,
    },
    MuiStepButton: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 72,
    },
    tableHeader: {
      height: 80,
    },
    tableLabels: {
      height: 37,
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
      },
    },
    MuiStepIcon: {
      root: {
        color: 'transparent',
      },
    },
    MuiButton: {
      root: {
        fontSize: 14,
        color: PRIMARY_TEXT_COLOR,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: DIVIDER_COLOR,
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiIconButton: {
      colorInherit: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'none',
        transition: 'box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: 'none',
        '&&&&:hover': {
          boxShadow: `0 14px 26px -12px rgba(105, 172, 199, 0.42),
            0 4px 23px 0px rgba(0, 0, 0, 0.12),
            0 8px 10px -5px rgba(105, 172, 199, 0.2)`,
          backgroundColor: '#69ACC7',
        },
        backgroundColor: '#5A98B1',
        '&&&&:active': {
          boxShadow: 'none',
          backgroundColor: '#437F98',
        },
      },
    },
    MuiInputLabel: {
      shrink: {
        width: '100% !important',
      },
      root: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: 'calc(100% - 32px)',
      },
      formControl: {
        transform: 'translate(0, 22px) scale(1)',
        '&$shrink': {
          color: '#7B7777',
          transform: 'translate(0, 4px) scale(0.71)',
        },
      },
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: '8px',
      },
    },
    MuiFormLabel: {
      root: {
        marginLeft: '3px',
        fontSize: '16px',
        color: SECONDARY_TEXT_COLOR,
        lineHeight: '20px',
        '&$focused': {
          color: '#7B7777',
        },
      },
    },
    MuiInput: {
      input: {
        color: SECONDARY_TEXT_COLOR,
        fontSize: 16,
        padding: '5px 2px 5px',
      },
      underline: {
        '&:before': {
          borderBottom: `1px solid ${SECONDARY_TEXT_COLOR}`,
        },
        '&:after': {
          borderWidth: '0 0 2px 0',
          borderStyle: 'solid',
          borderImageSlice: '2px',
          borderImage: 'linear-gradient(145.53deg, #4A0E04 0%, #BAA297 100%) 47% 0%',
        },
        '&&&&:hover:before': {
          borderWidth: '0 0 1px 0',
          borderStyle: 'solid',
          borderImageSlice: '1px',
          borderImage: 'linear-gradient(145.53deg, #845A51 0%, #845A51 100%) 47% 0%',
        },
        '&$disabled': {
          '&&&&:hover:before': {
            borderWidth: '0 0 1px 0',
            borderStyle: 'solid',
            borderImageSlice: '1px',
            borderImage: 'linear-gradient(145.53deg, #4A4A4A 0%, #BABABA 100%) 47% 0%',
          },
          '&:before': {
            borderWidth: '0 0 1px 0',
            borderStyle: 'solid',
            borderImageSlice: '1px',
            borderImage: 'linear-gradient(145.53deg, #4A4A4A 0%, #BABABA 100%) 47% 0%',
          },
        },
        '&$error': {
          '&:after': {
            borderColor: ERROR_COLOR,
            borderImage: 'none',
          },
        },
      },
      root: {
        fontSize: 14,
      },
    },
  },
}

const theme = createMuiTheme(rawTheme)

export default theme
export { rawTheme }
