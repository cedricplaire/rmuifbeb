import React, { Component, Fragment } from "react";
import WithStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Paper, Grid, Button, Typography } from "@material-ui/core";
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
		padding: theme.spacing(2),
	},
	box: {
		marginBottom: 40,
		height: 65,
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

class LandingPage extends Component {
	render() {
		const { classes } = this.props;
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
											Development articles
										</Typography>
										<Typography
											variant='body1'
											gutterBottom
										>
											short articles to explain a specific
											problem
										</Typography>
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-end",
										}}
									>
										<Button
											component={Link}
											to='/home'
											variant='contained'
										>
											Learn more
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
											Graphic articles
										</Typography>
										<Typography
											variant='body1'
											gutterBottom
										>
											Treatment of specific cases
											encountered in graphics
										</Typography>
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-end",
										}}
									>
										<Button variant='contained'>
											Learn more
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
										<Typography
											variant='body1'
											gutterBottom
										>
											Discover the full potential of an
											exceptional system
										</Typography>
									</div>
									<div className={classes.alignRight}>
										<Button
											component={Link}
											to='/'
											variant='outlined'
											style={{
												marginRight: 6,
											}}
										>
											Previews
										</Button>
										<Button
											component={Link}
											to='/'
											variant='contained'
										>
											Learn More
										</Button>
									</div>
								</Paper>
							</Grid>
							<Grid container item xs={12}>
								<Grid item xs={12}>
									<Paper className={classes.paper}>
										<div>
											<div className={classes.box}>
												<Typography
													style={{
														textTransform:
															"uppercase",
													}}
													color='secondary'
													gutterBottom
												>
													Discover the different Linux
													distributions
												</Typography>
												<Typography
													variant='body1'
													gutterBottom
												>
													There is surely one made for
													you!
												</Typography>
												<Typography
													variant='body1'
													gutterBottom
												>
													There is a desktop manager
													for each computer, from the
													oldest to the newest, from
													the simplest to the most
													complex
												</Typography>
											</div>
											<div className={classes.alignRight}>
												<Button variant='contained'>
													Learn more
												</Button>
											</div>
										</div>
									</Paper>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Fragment>
		);
	}
}

export default WithStyles(styles)(LandingPage);
