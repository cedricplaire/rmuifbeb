import React, { Component, Fragment } from "react";
import { firestore } from "../../firebase";
import WithStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CssBaseline from "@material-ui/core/CssBaseline";
import {
	Paper,
	Grid,
	Button,
	Typography,
	TextField,
} from "@material-ui/core";
import { Link } from "@material-ui/core";

const backgroundShape = require("../../illustrations/shape.svg");

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.grey["100"],
		overflow: "hidden",
		background: `url(${backgroundShape}) no-repeat`,
		backgroundSize: "cover",
		backgroundPosition: "0 400px",
		paddingBottom: 200,
	},
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
		width: "100%",
		display: "flex",
		flexDirection: "column",
		textTransform: "none",
	},
	box: {
		marginBottom: 10,
		height: 45,
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

class BlogPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentCateg: 1,
			title: "",
			author: "",
			createdAt: new Date(),
			content: "",
		};
	}

	resetState = (callback) => {
		this.setState(
			{
				currentCateg: 1,
				title: "",
				author: "",
				createdAt: new Date(),
				content: "",
			},
			callback,
		);
	};

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
            createdAt: firestore.Timestamp.fromDate(createdAt),
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
			<MuiPickersUtilsProvider utils={MomentUtils}>
			<Fragment>
				<CssBaseline />
				<div className={classes.root}>
					<Grid container justify='center'>
						<Grid
							spacing={4}
							alignItems='center'
							justify='center'
							container
							className={classes.grid}
						>
							<Grid item xs={12} md={6}>
								<Paper className={classes.paper}>
									<div className={classes.box}>
										<Typography
											style={{
												textTransform: "uppercase",
											}}
											color='secondary'
											gutterBottom
										>
											Free Articles
										</Typography>
									</div>
									<div className={classes.block}>
										<Button
											component={Link}
											to='/blog:web'
											variant='contained'
										>
											Web
										</Button>
										<Button
											component={Link}
											to='/blog:windows'
											variant='contained'
										>
											Windows
										</Button>
									</div>
								</Paper>
							</Grid>
							<Grid item xs={12} md={6}>
								<Paper className={classes.paper}>
									<div className={classes.box}>
										<Typography
											style={{
												textTransform: "uppercase",
											}}
											color='secondary'
											gutterBottom
										>
											Articles Signed-In Users
										</Typography>
									</div>
									<div className={classes.block}>
										<Button
											component={Link}
											to='/blog:webdesign'
											variant='contained'
										>
											Web
										</Button>
										<Button
											component={Link}
											to='/blog:designsoft'
											variant='contained'
										>
											Softwares
										</Button>
									</div>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<div>
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
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Fragment>
			</MuiPickersUtilsProvider>
		);
	}
}

export default withRouter(WithStyles(styles)(BlogPage));