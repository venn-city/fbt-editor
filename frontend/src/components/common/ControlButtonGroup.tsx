import {
  CircularProgress,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import {
  Add,
  Create,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  SvgIconComponent,
} from "@material-ui/icons";
import { is } from "ramda";
import React from "react";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles(
  theme => ({
    editIcon: {},
    spinner: {
      color: "#1771F1",
    },
    iconButton: {
      padding: theme.spacing(0.5),
      margin: theme.spacing(0.5),
    },
    icon: {
      fontSize: 24,
    },
  }),
  { name: "ControlButtonGroup" },
);

const ButtonsIconMap: { [id: string]: SvgIconComponent } = {
  add: Add,
  edit: Create,
  delete: Delete,
  expand: KeyboardArrowUp,
  collapse: KeyboardArrowDown,
};

interface ControlButtonGroupProps {
  name: string;
  onClick?: () => void;
  isLoading: boolean;
  tooltip: string;
  disabled: boolean;
}

const ButtonWithToolTip = (button: any, tooltip: string) =>
  tooltip ? (
    <Tooltip key={uuid()} placement="top" title={tooltip}>
      {button}
    </Tooltip>
  ) : (
    button
  );

const ControlButtonGroup = ({ buttons, classes: classesProp }: any) => {
  const classes = useStyles({ classes: classesProp });
  const validButtons = buttons.filter(is(Object));
  return validButtons.map(
    ({
      name,
      onClick,
      isLoading,
      tooltip,
      disabled,
    }: ControlButtonGroupProps) => {
      const Icon = ButtonsIconMap[name];
      const iconButton = (
        <IconButton
          aria-label={name}
          className={classes.iconButton}
          disabled={disabled || isLoading}
          onClick={onClick}
        >
          {isLoading ? (
            <CircularProgress color="primary" size={24} />
          ) : (
            <Icon classes={{ root: classes.icon }} />
          )}
        </IconButton>
      );

      return ButtonWithToolTip(iconButton, tooltip);
    },
  );
};

export default ControlButtonGroup;
