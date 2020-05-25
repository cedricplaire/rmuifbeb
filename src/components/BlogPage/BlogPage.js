import React, { Component, Fragment } from "react";
import { firestore } from "../../firebase";
import WithStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
	Paper,
	Grid,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import { Link } from "@material-ui/core";
import BlogWrite from "./BlogWrite";

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
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		textTransform: "none",
	},
	box: {
		marginBottom: 10,
		height: 45,
	},
	alignRight: {
		display: "flex",
		justifyContent: "flex-end",
	},
	inlining: {
		display: "inline-block",
		marginRight: 10,
	},
});

class BlogPage extends Component {
	constructor(props) {
		super(props);
		this.tempCollection = null;
		this.ref = firestore.collection("articles");
		this.state = {
			articles: [],
		};
	}

	resetState = (callback) => {
		this.setState(
			{
				articles: [],
			},
			callback,
		);
	};

	onLoadArticles = (querySnapshot) => {
		const posts = [];
		querySnapshot.forEach((doc) => {
			const { title, author } = doc.data();
			posts.push({
				key: doc.id,
				title,
				author,
			});
		});
		this.setState({
			articles: posts,
		});
	};

	componentDidMount() {
		// this.loadArticles();
		this.tempCollection = this.ref.onSnapshot(this.onLoadArticles);
	}

	componentDidUpdate() {
		this.tempCollection = this.ref.onSnapshot(this.onLoadArticles);
	}

	render() {
		const { classes } = this.props;
		const { articles } = this.state;
		// console.log(articles);
		return (
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
							<Grid item xs={12} md={4}>
								<Paper className={classes.paper}>
									<div className={classes.box}>
										<Typography
											style={{
												textTransform: "uppercase",
											}}
											color='secondary'
											gutterBottom
										>
											IT Development
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
											to='/blog:linux'
											variant='contained'
										>
											Linux
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
							<Grid item xs={12} md={4}>
								<Paper className={classes.paper}>
									<div className={classes.box}>
										<Typography
											style={{
												textTransform: "uppercase",
											}}
											color='secondary'
											gutterBottom
										>
											{"Graphics & Design"}
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
											to='/blog:logo'
											variant='contained'
										>
											Logos
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
							<Grid item xs={12} md={4}>
								<Paper className={classes.paper}>
									<div className={classes.box}>
										<Typography
											style={{
												textTransform: "uppercase",
											}}
											color='secondary'
											gutterBottom
										>
											Linux for beginners
										</Typography>
									</div>
									<div className={classes.block}>
										<Button
											component={Link}
											to='/linux:begin'
											variant='contained'
										>
											Discover
										</Button>
										<Button
											component={Link}
											to='/blog:distributions'
											variant='contained'
										>
											Distributions
										</Button>
									</div>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<div>
										<List>
											{articles.map((items, index) => (
												<ListItem key={items.key}>
													<ListItemText
														primary={items.author}
														secondary={items.title}
													/>
													{/* <span>{items.infos}</span> */}
												</ListItem>
											))}
										</List>
									</div>
									<div>
										<BlogWrite />
									</div>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Fragment>
		);
	}
}

export default WithStyles(styles)(BlogPage);
