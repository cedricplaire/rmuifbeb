import React from "react";
import { withRouter } from "react-router-dom";
import readingTime from "reading-time";
import firebase, { firestore, auth } from "../../firebase";
import withStyles from "@material-ui/styles/withStyles";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import {
  TextField,
  Button,
  FormHelperText,
  MenuItem,
  Select,
  Snackbar 
} from "@material-ui/core";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

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
  divForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  divForm1: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
});

class ArticleCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      createdAt: new Date(),
      author: "",
      content: "",
      snackbar: {
        autoHideDuration: 0,
        message: "",
        open: false,
      },
      vertical: "top",
      horizontal: "center",
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.ref = firestore.collection("articles");
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleCategoryChange = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      createdAt: date,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, author, category, createdAt, content } = this.state;
    if (!title || title === "" || title.length <= 5) {
      this.openSnackbar("Title must not be empty and need a least 6 charactères");
      return false;
    }
    if (!content || content === "" || content.length <= 25) {
      this.openSnackbar("Title must not be empty and need a least 25 charactères");
      return false;
    }
    if (this.props.categories)

    this.ref
      .add({
        title,
        author,
        category,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date(createdAt)),
        content,
      })
      .then((docRef) => {
        this.setState({
          title: "",
          author: "",
          category: "",
          createdAt: new Date(),
          content: "article body content",
        });
        this.openSnackbar("Article saved successfully !");
        //this.props.history.push("/blog");
      })
      .catch((error) => {
        console.error("Error adding article: ", error);
      });
  };

  componentDidMount() {
    const activeUser = auth.currentUser;
    activeUser
      ? this.setState({ author: activeUser.email })
      : alert("You must be connected to post");
  }

  componentWillUnmount() {
    this.ref = null;
  }

  openSnackbar = (message, autoHideDuration = 3, callback) => {
    this.setState(
      {
        snackbar: {
          autoHideDuration: readingTime(message).time * autoHideDuration,
          message,
          open: true,
        },
      },
      () => {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    );
  };

  closeSnackbar = (clearMessage = false) => {
    const { snackbar } = this.state;

    this.setState({
      snackbar: {
        message: clearMessage ? "" : snackbar.message,
        open: false,
      },
    });
  };

  render() {
    const { classes, categories } = this.props;
    const { author, title, category, createdAt, content } = this.state;
    const { snackbar, vertical, horizontal } = this.state;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className={classes.divForm}>
          <Snackbar
            anchorOrigin={{vertical, horizontal}}
            autoHideDuration={snackbar.autoHideDuration}
            message={snackbar.message}
            open={snackbar.open}
            onClose={this.closeSnackbar}
          />
          {author && author !== "" ? (
            <form onSubmit={this.onSubmit} noValidate autoComplete="off">
              <div className={classes.divForm1}>
                <TextField
                  id="input-author"
                  name="author"
                  label="article author"
                  color="secondary"
                  onChange={this.onInputChange}
                  value={author}
                />
                <KeyboardDateTimePicker
                  id="date-picker-dialog"
                  label="Select date"
                  name="createdAt"
                  color="secondary"
                  format="DD/MM/yyyy"
                  value={createdAt}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "Select date",
                  }}
                />
              </div>
              <div className={classes.divForm1}>
                <TextField
                  id="input-title"
                  name="title"
                  label="article title"
                  color="secondary"
                  onChange={this.onInputChange}
                  value={title}
                />
                {/* <TextField
                  id="input-category"
                  name="category"
                  label="article category"
                  color="secondary"
                  onChange={this.onInputChange}
                  value={category}
                /> */}
                <Autocomplete
      value={category}
      onChange={(event, newcategory) => {
        if (typeof newcategory === 'string') {
          this.setState({
            category: newcategory,
          });
        } else if (newcategory && newcategory.inputValue) {
          // Create a new value from the user input
          this.setState({
            category: newcategory.inputValue,
          });
        } else {
          this.setState({category: newcategory});
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={categories}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(option) => option.name}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Free solo with text demo" variant="outlined" />
      )}
    />
              </div>
              <div className={classes.divForm1}>
                <TextField
                  multiline
                  fullWidth
                  name="content"
                  rows={6}
                  variant="outlined"
                  color="secondary"
                  value={content}
                  onChange={this.onInputChange}
                />
              </div>
              <Button type="submit" variant="outlined" color="secondary">
                Save
              </Button>
            </form>
          ) : (
            <span>You must be connected</span>
          )}
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withRouter(withStyles(styles)(ArticleCreate));
