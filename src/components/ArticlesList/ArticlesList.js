import React, { Fragment } from "react";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Input,
} from "@material-ui/core";

const styles = (theme) => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)",
    },
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  block: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    textTransform: "none",
  },
  blockCol: {
    display: "flex",
    flexDirection: "column",
    textTransform: "none",
    justifyContent: "flex-end",
  },
  box: {
    marginBottom: 10,
    height: 65,
  },
  listGrow: {
    flexGrow: 1,
    width: "100%",
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  inlining: {
    display: "inline-block",
    marginRight: 10,
  },
  inlineList: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid primary",
    marginRight: 10,
  },
});

const ArticlesList = (props) => {
  const { classes, articles } = props;
  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            container
            className={classes.grid}
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div className={classes.listGrow}>
                  <List>
                    {articles &&
                      articles.map((items, index) => (
                        <ListItem key={items.key} className={classes.blockCol}>
                          <div className={classes.block}>
                            <ListItemText
                              primary={`Author: ${items.author}`}
                              secondary={`Title: ${items.title}`}
                            />
                            <div className={classes.alignRight}>
                              <ListItemText
                                primary={`Date Create: ${new Date(
                                  items.createdAt.seconds * 1000
                                ).toLocaleDateString("fr-FR")}`}
                                secondary={`Category: ${items.category.toString()}`}
                              />
                            </div>
                          </div>
                          <Input
                            multiline
                            rows={8}
                            fullWidth
                            value={items.content}
                          />
                        </ListItem>
                      ))}
                  </List>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(ArticlesList);
