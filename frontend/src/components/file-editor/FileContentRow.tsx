/* eslint-disable react-hooks/exhaustive-deps */

import { Grid, makeStyles, TextField } from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-debounce/lib";
import { updateFileContentField } from "../../store/duck/fileContent";
import {
  ProjectFileItem,
  ProjectFileItemTranslation,
  TokenData,
} from "../../store/entities";
import { getTranslationByVariation } from "../../store/utils/fileContentUtils";
import { getTokensData } from "../../store/utils/tokensUtils";
import TokenSelector from "./TokenSelector";

const useStyles = makeStyles(
  theme => ({
    contentContainer: {
      padding: theme.spacing(0.5),
    },
    rowContainer: {
      marginTop: theme.spacing(3),
    },
    toolbar: {},
    selectContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      maxWidth: "150px",
      padding: 2,
      borderBottomColor: "#3949ab",
    },
    formControl: {
      minWidth: 120,
      marginRight: theme.spacing(0.5),
    },
  }),
  { name: "FileContentRow" },
);

interface FileContentRowProps {
  projectFileItem: ProjectFileItem;
  targetLanguage: string;
  sourceLanguage: string;
}

const FileContentRow = ({
  projectFileItem,
  targetLanguage,
  sourceLanguage,
}: FileContentRowProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentVariations, setCurrentVariations] = useState<{
    [index: number]: number;
  }>({});
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [target, setTarget] = useState(
    projectFileItem?.translations[0]?.translation || "",
  );

  const IsValidToken = (
    tokenIndex: number | null,
    tokenValue: number | null,
  ) => {
    return tokenIndex !== null && tokenValue !== null && tokenValue !== 0;
  };

  useEffect(() => {
    setCurrentVariations(getCurrentVariations());
  }, [tokens]);

  useEffect(() => {
    setTarget(getCurrentTranslation().translation);
  }, [currentVariations]);

  useEffect(() => {
    let translationTokens: TokenData[] = getTokensData(
      projectFileItem.tokens,
      projectFileItem.translations[0],
    );
    setTokens(translationTokens);
    setCurrentVariations(getCurrentVariations());
  }, []);

  const getCurrentTranslation = (): ProjectFileItemTranslation => {
    const translationByVariation = getTranslationByVariation(
      projectFileItem.translations,
      currentVariations,
    );
    if (!translationByVariation) {
      const newTranslation = {
        translation: "",
        variations: currentVariations,
      } as ProjectFileItemTranslation;
      projectFileItem.translations.push(newTranslation);
      return newTranslation;
    }

    return translationByVariation;
  };

  const getCurrentVariations = () => {
    let variations: { [index: number]: number } = {};
    _.forEach(tokens, token => {
      if (IsValidToken(token.index, token.value)) {
        variations[token.index] = token.value;
      }
    });
    return variations;
  };

  const handleSubjectTokenGenderChange = (currentToken: TokenData) => {
    _.forEach(
      _.filter(tokens, token => token.index === currentToken.index),
      (token: TokenData) => (token.value = currentToken.value),
    );
    setTokens(prev => [...prev]);
  };

  const [debouncedTarget] = useDebounce(target, 1000);

  useEffect(() => {
    dispatch(
      updateFileContentField({
        id: projectFileItem.id,
        tokens: tokens,
        projectFileItemTranslation: {
          translation: debouncedTarget,
          variations: currentVariations,
        } as ProjectFileItemTranslation,
      }),
    );
  }, [debouncedTarget]);

  return (
    <Grid container className={classes.contentContainer}>
      <Grid
        container
        item
        className={classes.rowContainer}
        justify="center"
        key={projectFileItem.id}
        spacing={3}
      >
        <Grid container item md>
          <TextField
            fullWidth
            multiline
            InputProps={{
              readOnly: true,
            }}
            label={sourceLanguage}
            rows={3}
            value={projectFileItem.source}
            variant="outlined"
          />
        </Grid>
        <Grid container item md>
          <TextField
            fullWidth
            multiline
            label={targetLanguage}
            rows={3}
            value={target}
            variant="outlined"
            onChange={({ target: { value } }: any) => setTarget(value)}
          />
        </Grid>
        <Grid container item md={3}>
          <TextField
            fullWidth
            multiline
            label="Description"
            rows={3}
            value={projectFileItem.description}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        className={classes.toolbar}
        justify="flex-start"
        key={projectFileItem.id + "toolbar"}
      >
        {tokens.map(token => {
          return (
            <Grid
              container
              item
              md
              className={classes.selectContainer}
              key={token.name}
            >
              <TokenSelector
                handleTokenChange={handleSubjectTokenGenderChange}
                token={token}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default FileContentRow;
