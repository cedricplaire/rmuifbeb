import React, { Component } from "react";
import firebase, {firestore} from "../../firebase";
import WithStyles from "@material-ui/styles/withStyles";
import {
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

class BlogWrite extends Component {
    constructor(props) {
        super(props);
		this.state = {
            author: "author",
            title: "title",
            createdAt: new Date(),
            content: "article content",
        };
        this.ref = firestore.collection("articles");
    }

    handleDateChange = (date) => {
        this.setState({
            createdAt: date,
        })
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { title, author, createdAt, content } = this.state;
        // const date = firebase.firestore.Timestamp.fromDate(createdAt);

        this.ref.add({
            title,
            author,
            createdAt: firebase.firestore.Timestamp.fromDate(createdAt),
            content,
        }).then((docRef) => {
            this.setState({
                title: '',
                author: '',
                createdAt: new Date(),
                content: "article body content",
            });
            this.props.history.push("/");
            //console.log("doc added "+ docRef);
        })
        .catch((error) => {
            console.error("Error adding article: ", error);
        });
    }

    componentWillUnmount() {
        this.ref = null;
    }

    render() {
        const { classes } = this.props;
        const { author, title, createdAt, content } = this.state;
        return (
            <div className={classes.divForm}>
                <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                    <div className={classes.divForm1}>
                        <TextField
                            id="input-author"
                            name="author"
                            label="article author"
                            color="secondary"
                            onChange={this.onChange}
                            value={author}
                        />
                        <TextField
                            id="input-title"
                            name="title"
                            label="article title"
                            color="secondary"
                            onChange={this.onChange}
                            value={title}
                        />
                        <KeyboardDatePicker
                            id="date-picker-dialog"
                            label="Select date"
                            name="createdAt"
                            color="secondary"
                            format="dd/MM/yyyy"
                            value={createdAt}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'Select date',
                            }}
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
                            onChange={this.onChange}
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
            </div>
        )
    }
}

export default WithStyles(styles)(BlogWrite);