import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import { TokenData } from "../../store/entities";

const useStyles = makeStyles(
  (theme) => ({
    formControl: {
      minWidth: 120,
      marginRight: theme.spacing(0.5),
    },
  }),
  { name: "TokenSelector" }
);

interface TokenSelectorProps {
  token: TokenData;
  handleTokenChange: (token: TokenData) => void;
}

const TokenSelector = ({ token, handleTokenChange }: TokenSelectorProps) => {
  const classes = useStyles();

  const getLabelId = (token: TokenData) => `${token.name}-label`;

  const handleValueChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>
  ) => {
    token.value = Number(event.target.value);
    handleTokenChange(token);
  };

  return (
    <FormControl className={classes.formControl} variant="standard">
      <InputLabel id={getLabelId(token)}>{token.displayName}</InputLabel>
      <Select
        id={`${token.name}-token`}
        labelId={getLabelId(token)}
        labelWidth={50}
        value={token.value || 0}
        onChange={handleValueChange}
      >
        {Object.keys(token.possibleValues).map((value: any) => (
          <MenuItem key={value} value={value}>
            {token.possibleValues[value]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TokenSelector;
