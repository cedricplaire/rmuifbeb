import React, { Component, Fragment} from "react";
import { auth, firestore } from "../../firebase";
import { withRouter, Link, Route } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
	Paper,
	Grid,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
	Input,
	Icon,
} from "@material-ui/core";
import CalendarIcon from "@material-ui/icons/CalendarToday";

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

class ArticlesList extends Component {
    constructor(props) {
        super(props);
        this.state=({
            category: 0,
            articles: [],
        })
        this.docRef = firestore.collection("articles");
    }

    onLoadArticles = (querySnapshot) => {
		const posts = [];
		querySnapshot.forEach((doc) => {
			const { title, author, createdAt , content } = doc.data();
			
			posts.push({
				key: doc.id,
				title,
				author,
				createdAt,
				content
			});
		});
		this.setState({
			articles: posts,
		});
    };
    
    loadByAuthor = () => {
        const currentUser = auth.currentUser;
        const userRef = firestore.collection("users").doc(currentUser.uid);
        this.ref = firestore.collection("articles").where("authorId", "==", userRef);
        this.ref
            .get()
            .then((querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    const { title, author, authorId, createdAt , content } = doc.data();
                    
                    posts.push({
                        key: doc.id,
                        title,
                        author,
                        authorId,
                        createdAt,
                        content
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
        this.loadByAuthor()
		/* const id = this.props.match.params.id;
		//this.fetchData(id);
		id == null ? (
			this.tempCollection = this.ref.onSnapshot(this.onLoadArticles)
		): (
			this.loadByAuthor()
		); */
	}

	componentWillUnmount() {
		this.tempCollection = null;
		this.ref = null;
	}

    render() {
        const { classes } = this.props;
        const { articles } = this.state;
        const currentUser = auth.currentUser;
        console.log(currentUser.uid);
        return(
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
							<Grid item xs={12}>
								<Paper className={classes.paper}>
									<div className={classes.listGrow}>
										<List>
											{articles.map((items, index) => (
												<ListItem key={items.key} className={classes.blockCol}>
													<div className={classes.block}>
														<ListItemText
															primary={items.author}
															secondary={items.title}
														/>
														<div className={classes.alignRight}>
															<span style={{marginTop: "6px"}} >
															{items.createdAt ? (
																new Date(items.createdAt.seconds * 1000).toLocaleDateString("fr-FR")
															): (
																""
															)}
															</span>
															<Icon>
																<CalendarIcon />
															</Icon>
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
        )
    }
}

export default withRouter(withStyles(styles)(ArticlesList));