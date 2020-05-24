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

class NewsPage extends Component {
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
											News of technologies
										</Typography>
									</div>
									<div className={classes.block}>
										<Button
											component={Link}
											to='/news:langages'
											variant='contained'
										>
											Languages
										</Button>
										<Button
											component={Link}
											to='/news:frameworks'
											variant='contained'
										>
											Frameworks
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
											Latest Hardwares
										</Typography>
									</div>
									<div className={classes.block}>
										<Button
											component={Link}
											to='/news:mobiles'
											variant='contained'
										>
											Mobiles
										</Button>
										<Button
											component={Link}
											to='/news:computers'
											variant='contained'
										>
											Computers
										</Button>
										<Button
											component={Link}
											to='/news:servers'
											variant='contained'
										>
											Servers
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
											Softwares and extensions
										</Typography>
									</div>
									<div className={classes.block}>
										<Button
											component={Link}
											to='/news:develsoft'
											variant='contained'
										>
											Development
										</Button>
										<Button
											component={Link}
											to='/news:graphicsplugs'
											variant='contained'
										>
											Plugins
										</Button>
										<Button
											component={Link}
											to='/newslinux'
											variant='contained'
										>
											Linux
										</Button>
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

export default WithStyles(styles)(NewsPage);
