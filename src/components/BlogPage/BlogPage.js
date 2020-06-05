import React, { Component, Fragment } from "react";
import { firestore } from "../../firebase";
import WithStyles from "@material-ui/styles/withStyles";
import { withRouter, Link, Route, Switch } from "react-router-dom";
import ArticlesList from "../ArticlesList";
import ArticleCreate from "../ArticleCreate";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
	Paper,
	Grid,
	Button,
	Typography,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	FormHelperText,
} from "@material-ui/core";

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
	formControl: {
		margin: theme.spacing(1),
		minWidth: 180,
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

class BlogPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "",
			categories: [],
			articles: [],
		};
		this.docRef = firestore.collection("articles");
		this.paramRef = firestore.collection("categories");
		this.handleCategChange = this.handleCategChange.bind(this);
	}

	resetState = (callback) => {
		this.setState(
			{
				categories: [],
				category: "",
				articles: [],
			},
			callback,
		);
	};

	handleCategChange = (event) => {
		this.setState({
			category: event.target.value
		});
	}

	onLoadCategories = (querySnapshot) => {
		this.categsRef = firestore.collection("categories");
		this.categsRef
            .get()
            .then((querySnapshot) => {
                const categ = [];
                querySnapshot.forEach((doc) => {
                    const { name } = doc.data();
                    
                    categ.push({
						key: doc.id,
						name,
                    });
                });
                this.setState({
					categories: categ,
                });
            })
            .catch(function(error) {
                console.log("Error getting categories: ", error);
			});
	};

	onLoadArticles = () => {
        this.docRef
            .get()
            .then((querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    const { title, author, authorId, createdAt , content, category } = doc.data();
                    
                    posts.push({
                        key: doc.id,
                        title,
                        author,
                        authorId,
                        createdAt,
						content,
						category
                    });
                });
                this.setState({
                    articles: posts,
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
	}

	componentDidMount() {
		this.onLoadCategories();
		this.onLoadArticles();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.category !== this.state.category) {
			this.docRef = firestore.collection("articles").where("category", "==", this.state.category);
			this.onLoadArticles();
		}
	}

	componentWillUnmount() {
		this.categRef = null;
		this.docRef = null;
	}

	render() {
		let { path, url } = this.props.match;
		const { classes } = this.props;
		const { category, categories, articles } = this.state;
		//console.log(category);
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
											Filter by category
										</Typography>
										<FormControl className={classes.formControl}>
											<InputLabel id="categ-select-label">Category</InputLabel>
											<Select
											autoWidth
											native={false}
											labelId="categ-select-label"
											id="categorySelectId"
											onChange={this.handleCategChange}
											value={category}
											>
											{categories && categories.map((categ, index) => (
												<MenuItem key={categ.key} value={categ.name}>
													{categ.name}
												</MenuItem>
											))};
											</Select>
											<FormHelperText>Go to category</FormHelperText>
										</FormControl>
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
											Create new article
										</Typography>
									</div>
									<div className={classes.block}>
										<Button
											component={Link}
											to={`${url}/create`}
											variant='contained'
										>
											Go to
										</Button>
									</div>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<div className={classes.listGrow}>
										<Switch>
											<Route path={`${path}/create`}>
												<ArticleCreate />
											</Route>
											<Route path={`${path}`}>
												<ArticlesList articles={articles} />
											</Route>
										</Switch>
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

export default withRouter(WithStyles(styles)(BlogPage));