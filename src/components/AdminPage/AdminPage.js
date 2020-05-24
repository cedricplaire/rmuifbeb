import React, { Component, Fragment } from "react";
import WithStyles from "@material-ui/styles/withStyles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import { Paper, Grid, Box, Button, Typography } from "@material-ui/core";
import UserAvatar from "../UserAvatar";

import {
	FiberManualRecord as FiberManualRecordIcon,
	Brightness4 as Brightness4Icon,
} from "@material-ui/icons";
import appearance from "../../services/appearance";

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
	pageTitle: {
		width: "100%",
		textAlign: "center",
		textTransform: "uppercase",
	},
	blockCenter: {
		padding: theme.spacing(2),
		textAlign: "center",
	},
	block: {
		padding: theme.spacing(2),
	},
	box: {
		marginBottom: 20,
		height: 75,
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

class AdminPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			defaultTheme: appearance.defaultTheme,
		};
	}
	render() {
		const { user, userData, classes } = this.props;
		const appTheme = this.state.defaultTheme;
		return (
			<Fragment>
				<CssBaseLine />
				<div className={classes.root}>
					<Grid container justify='center'>
						<Grid
							spacing={4}
							alignItems='center'
							justify='center'
							container
							className={classes.grid}
						>
							<div className={classes.blockCenter}>
								<Typography
									variant='h5'
									color='secondary'
									gutterBottom
									className={classes.pageTitle}
								>
									Administrations options and actions for{" "}
									{user.username}
								</Typography>
							</div>
							<Grid item xs={12} md={6}>
								<Paper className={classes.paper}>
									<div className={classes.box}>
										<Typography
											color='secondary'
											gutterBottom
										>
											Selected theme values
										</Typography>
										<Box>
											<div className={classes.inlining}>
												<Typography>
													Primary color:
												</Typography>
												<FiberManualRecordIcon color='primary' />
											</div>
											<div className={classes.inlining}>
												<Typography>
													Secondary color:
												</Typography>
												<FiberManualRecordIcon color='secondary' />
											</div>
											<div className={classes.inlining}>
												<Typography>
													Brigthness:
												</Typography>
												<Brightness4Icon />
												{user.theme
													? user.theme.dark
														? "Dark"
														: "Light"
													: appTheme.type}
											</div>
										</Box>
										<div
											style={{
												display: "flex",
												justifyContent: "flex-end",
											}}
										>
											<Button variant='contained'>
												Edit
											</Button>
										</div>
									</div>
								</Paper>
							</Grid>
							<Grid item xs={12} md={6}>
								<Paper className={classes.paper}>
									<div className={classes.box}>
										<Typography
											color='secondary'
											gutterBottom
										>
											Your avatar
										</Typography>
										<UserAvatar
											user={Object.assign(user, userData)}
											context='standalone'
											style={{ width: 128, height: 128 }}
										/>
										<div
											style={{
												display: "flex",
												justifyContent: "flex-end",
											}}
										>
											<Button variant='contained'>
												Edit
											</Button>
										</div>
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

export default WithStyles(styles)(AdminPage);
