import React, { Component } from "react";
import {firestore} from "../../firebase";
import WithStyles from "@material-ui/styles/withStyles";
import {
    TextField,
    Button
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
	},
});

class BlogWrite extends Component {
    constructor(props) {
        super(props);
		this.state = {
            author: "your name",
            title: "post title",
            createdAt: new Date().toLocaleString(),
            content: "article body content",
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
        // e.preventDefault();

        const { title, author } = this.state;

        this.ref.add({
            title,
            author
        }).then((docRef) => {
            this.setState({
                title: '',
                author: ''
            });
            this.props.history.push("/blog");
            console.log("doc added "+ docRef);
        })
        .catch((error) => {
            console.error("Error adding article: ", error);
        });
        e.preventDefault();
    }

    render() {
        const { classes } = this.props;
        const { author, title, createdAt, content } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                    <div className={classes.divForm}>
                        <div className={classes.divForm1}>
                            <TextField
                                id="input-author"
                                name="author"
                                label="your name"
                                onChange={this.onChange}
                                value={author}
                            />
                            <TextField
                                id="input-title"
                                name="title"
                                label="article title"
                                onChange={this.onChange}
                                value={title}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="dd/MM/yyyy"
                                value={createdAt}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                        <div className={classes.divForm1}>
                            <TextField
                                multiline
                                fullWidth
                                name="content"
                                rows={4}
                                variant="outlined"
                                value={content}
                                onChange={this.onChange}
                            ></TextField>
                        </div>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </MuiPickersUtilsProvider>
        )
    }
}

export default WithStyles(styles)(BlogWrite);