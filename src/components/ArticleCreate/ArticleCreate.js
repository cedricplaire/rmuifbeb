import React from "react";
import { withRouter } from "react-router-dom";
import firebase, {firestore, auth} from "../../firebase";
import withStyles from "@material-ui/styles/withStyles";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    TextField,
    Button
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
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.ref = firestore.collection("articles");
    };

    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleDateChange = (date) => {
        this.setState({
            createdAt: date,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { title, author, category, createdAt, content } = this.state;

        this.ref.add({
            title,
            author,
            category,
            createdAt: firebase.firestore.Timestamp.fromDate(createdAt),
            content,
        }).then((docRef) => {
            this.setState({
                title: '',
                author: '',
                category: '',
                createdAt: new Date(),
                content: "article body content",
            });
            this.props.history.push("/");
        })
        .catch((error) => {
            console.error("Error adding article: ", error);
        });
    }

    componentDidMount() {
        const activeUser = auth.currentUser;
        activeUser ? (
            this.setState({author: activeUser.email})
        ) : (
            alert("You must be connected to post")
        )
    }

    componentWillUnmount() {
        this.ref = null;
    }

    render() {
        const { classes } = this.props;
        const { author, title, category, createdAt, content } = this.state;
        console.log(author);
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className={classes.divForm}>
                { author && author !== "" ? (
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
                        <KeyboardDatePicker
                            id="date-picker-dialog"
                            label="Select date"
                            name="createdAt"
                            color="secondary"
                            format="DD/MM/yyyy"
                            value={createdAt}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'Select date',
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
                        <TextField
                            id="input-category"
                            name="category"
                            label="article category"
                            color="secondary"
                            onChange={this.onInputChange}
                            value={category}
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
                    <Button
                        type="submit"
                        variant="outlined"
                        color="secondary"
                    >
                        Save
                    </Button>
                </form>
                ) : (
                    <span>You must be connected</span>
                )}
            </div>
            </MuiPickersUtilsProvider>
        )
    }
}

export default withRouter(withStyles(styles)(ArticleCreate));