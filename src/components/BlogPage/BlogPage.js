import React, { Component, Fragment } from "react";
import { firestore } from "../../firebase";
import WithStyles from "@material-ui/styles/withStyles";
import { withRouter, Link, Route } from "react-router-dom";
import ArticlesList from "../ArticlesList";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
	Paper,
	Grid,
	Button,
	Typography,
	List,
	ListItem,
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
		this.tempCollection = null;
		this.ref = firestore.collection("articles");
		this.state = {
			articles: [],
			categories: [],
		};
	}

	resetState = (callback) => {
		this.setState(
			{
				articles: [],
				categories: [],
			},
			callback,
		);
	};

	onLoadCategories = (querySnapshot) => {
		this.categRef = firestore.collection("categories");
		this.categRef
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

	componentDidMount() {
		this.onLoadCategories();
	}

	componentWillUnmount() {
		this.categRef = null;
		this.ref = null;
	}

	render() {
		const { classes } = this.props;
		const {categories} = this.state;
		const match = this.props.match;
		// const { articles } = this.state;
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
											Latest Categories
										</Typography>
										<List className={classes.block}>
											{categories && categories.map((categ, index) => (
												<ListItem key={categ.key}>
													<Link to={`${match.url}/${categ.key}`}>{categ.name}</Link>
												</ListItem>
											))};
										</List>
										<Button
											component={Link}
											to='/blog:web'
											variant='contained'
										>
											View All
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
											Your's articles
										</Typography>
									</div>
									<div className={classes.block}>
										<Button
											component={Link}
											to='/linux:begin'
											variant='contained'
										>
											View All
										</Button>
										<Button
											component={Link}
											to='/blog:distributions'
											variant='contained'
										>
											Create New
										</Button>
									</div>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<div className={classes.listGrow}>
										<Route path={`${match.url}/:author`} component={ArticlesList} />
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