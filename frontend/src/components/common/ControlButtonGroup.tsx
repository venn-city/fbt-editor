import React from 'react'
import PropTypes from 'prop-types'
import { is } from 'ramda'
import { v4 as uuid } from 'uuid'
import {
  IconButton,
  makeStyles,
  Tooltip,
  CircularProgress,
} from '@material-ui/core'

import {
  Add,
  Create,
  Delete,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  editIcon: {},
  spinner: {
    color: '#1771F1',
  },
  iconButton: {
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
  },
  icon: {
    fontSize: 24,
  }
}), { name: 'ControlButtonGroup' })

const ButtonsIconMap: object = {
  add: Add,
  edit: Create,
  delete: Delete,
  expand: KeyboardArrowUp,
  collapse: KeyboardArrowDown,
}

interface Props {
  name: string;
  onClick?: () => void;
  isLoading: boolean;
  tooltip: string;
  disabled: boolean;
}

const ButtonWithToolTip = (button: any, tooltip: string) => tooltip
  ? (
    <Tooltip key={uuid()} placement="top" title={tooltip}>
      {button}
    </Tooltip>
  )
  : button

const ControlButtonGroup = ({
  buttons,
  classes: classesProp,
}: any) => {
  const classes = useStyles({ classes: classesProp })

  const validButtons = buttons.filter(is(Object))

  return validButtons
    .map(({ name, onClick, isLoading, tooltip, disabled }: Props) => {
      // @ts-ignore
      const Icon = ButtonsIconMap[name]

      const iconButton = (
        <>
          <IconButton
            aria-label={name}
            className={classes.iconButton}
            disabled={disabled || isLoading}
            onClick={onClick}
          >
            {isLoading
              ? <CircularProgress color="primary" size={24} />
              : <Icon classes={{ root: classes.icon }} />
            }
          </IconButton>
        </>
      )

      return ButtonWithToolTip(iconButton, tooltip)
    })
}

ControlButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      disabled: PropTypes.bool,
      isLoading: PropTypes.bool,
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      tooltip: PropTypes.string,
    }).isRequired,
  ])),
}

export default ControlButtonGroup
