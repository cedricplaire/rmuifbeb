import React, { Component } from "react";
import PropTypes from "prop-types";
import WithStyles from "@material-ui/styles/withStyles";
import { Link } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Link as MaterialLink } from "@material-ui/core";
import {
	AppBar,
	Toolbar,
	Typography,
	Grid,
	Tab,
	Tabs,
	List,
	ListItem,
	ListItemText,
	ButtonGroup,
	Button,
	IconButton,
	Divider,
	Menu,
	MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import GlobalMenu from "./GlobalMenu";
import UserAvatar from "../UserAvatar";

const logo = require("../../illustrations/logo.svg");

const styles = (theme) => ({
	appBar: {
		position: "relative",
		boxShadow: "none",
		borderBottom: `1px solid ${theme.palette.grey["100"]}`,
		backgroundColor: theme.palette.primary,
	},
	inline: {
		display: "inline",
	},
	flex: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			justifyContent: "space-evenly",
			alignItems: "center",
		},
	},
	link: {
		textDecoration: "none",
		color: "inherit",
	},
	productLogo: {
		display: "inline-block",
		borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
		marginLeft: 32,
		paddingLeft: 24,
		[theme.breakpoints.up("md")]: {
			paddingTop: "1.5em",
		},
	},
	tagline: {
		display: "inline-block",
		marginLeft: 10,
		[theme.breakpoints.up("md")]: {
			paddingTop: "0.8em",
		},
	},
	iconContainer: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "block",
		},
	},
	iconButton: {
		float: "right",
		marginLeft: "auto",
	},
	tabContainer: {
		marginLeft: 32,
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
	tabItem: {
		paddingTop: 20,
		paddingBottom: 20,
		minWidth: "auto",
	},
});

class Bar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: {
				anchorEl: null,
			},
			value: 0,
			menuDrawer: false,
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	mobileMenuOpen = (event) => {
		this.setState({ menuDrawer: true });
	};

	mobileMenuClose = (event) => {
		this.setState({ menuDrawer: false });
	};

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	current = () => {
		if (this.props.currentPath === "/landing") {
			return 0;
		}
		if (this.props.currentPath === "/tutorials") {
			return 1;
		}
		if (this.props.currentPath === "/news") {
			return 2;
		}
	};

	openMenu = (event) => {
		const anchorEl = event.currentTarget;

		this.setState({
			menu: {
				anchorEl,
			},
		});
	};

	closeMenu = () => {
		this.setState({
			menu: {
				anchorEl: null,
			},
		});
	};

	render() {
		// Properties
		const { performingAction, user, userData, roles, classes } = this.props;

		// Events
		const {
			onAboutClick,
			onSettingsClick,
			onSignOutClick,
			onSignUpClick,
			onSignInClick,
		} = this.props;

		const { menu } = this.state;

		const menuItems = [
			{
				name: "About",
				onClick: onAboutClick,
			},
			{
				name: "Profile",
				to: user ? `/user/${user.uid}` : null,
			},
			{
				name: "Settings",
				onClick: onSettingsClick,
			},
			{
				name: "Sign out",
				divide: true,
				onClick: onSignOutClick,
			},
		];

		return (
			<AppBar
				position='absolute'
				color='default'
				className={classes.appBar}
			>
				<Toolbar>
					<Grid container spacing={10} alignItems='baseline'>
						<Grid item xs={12} className={classes.flex}>
							<div className={classes.inline}>
								<Typography variant='h6' color='inherit' noWrap>
									<Link to='/' className={classes.link}>
										<img width={20} src={logo} alt='' />
										<span className={classes.tagline}>
											{process.env.REACT_APP_TITLE}
										</span>
									</Link>
								</Typography>
							</div>
							{!this.props.noTabs && (
								<React.Fragment>
									<div className={classes.productLogo}>
										<Typography>
											Introduction to IT development
										</Typography>
									</div>
									<div className={classes.iconContainer}>
										<IconButton
											onClick={this.mobileMenuOpen}
											className={classes.iconButton}
											color='inherit'
											aria-label='Menu'
										>
											<MenuIcon />
										</IconButton>
									</div>
									<div className={classes.tabContainer}>
										<SwipeableDrawer
											anchor='right'
											open={this.state.menuDrawer}
											onClose={this.mobileMenuClose}
											onOpen={this.mobileMenuOpen}
										>
											<AppBar title='Menu' />
											<List>
												{roles.includes("admin") && (
													<ListItem
														component={Link}
														to='/admin'
														button
													>
														<ListItemText primary='Admin' />
													</ListItem>
												)}
												{GlobalMenu.map(
													(item, index) => (
														<ListItem
															component={
																item.external
																	? MaterialLink
																	: Link
															}
															href={
																item.external
																	? item.pathname
																	: null
															}
															to={
																item.external
																	? null
																	: {
																			pathname:
																				item.pathname,
																	  }
															}
															button
															key={item.label}
														>
															<ListItemText
																primary={
																	item.label
																}
															/>
														</ListItem>
													),
												)}
											</List>
										</SwipeableDrawer>
										<Tabs
											value={
												this.current() ||
												this.state.value
											}
											indicatorColor='primary'
											textColor='primary'
											onChange={this.handleChange}
										>
											{roles.includes("admin") && (
												<Tab
													component={Link}
													to='/admin'
													label='Admin'
													classes={{
														root: classes.tabItem,
													}}
												/>
											)}
											{GlobalMenu.map((item, index) => (
												<Tab
													key={index}
													component={
														item.external
															? MaterialLink
															: Link
													}
													href={
														item.external
															? item.pathname
															: null
													}
													to={
														item.external
															? null
															: {
																	pathname:
																		item.pathname,
															  }
													}
													classes={{
														root: classes.tabItem,
													}}
													label={item.label}
												/>
											))}
										</Tabs>
									</div>
								</React.Fragment>
							)}

							{user && (
								<>
									<IconButton
										color='inherit'
										disabled={performingAction}
										onClick={this.openMenu}
										className={classes.iconButton}
									>
										<UserAvatar
											user={Object.assign(user, userData)}
										/>
									</IconButton>

									<Menu
										anchorEl={menu.anchorEl}
										open={Boolean(menu.anchorEl)}
										onClose={this.closeMenu}
									>
										{menuItems.map((menuItem, index) => {
											if (
												menuItem.hasOwnProperty(
													"condition",
												) &&
												!menuItem.condition
											) {
												return null;
											}

											let component = null;

											if (menuItem.to) {
												component = (
													<MenuItem
														key={index}
														component={Link}
														to={menuItem.to}
														onClick={this.closeMenu}
													>
														{menuItem.name}
													</MenuItem>
												);
											} else {
												component = (
													<MenuItem
														key={index}
														onClick={() => {
															this.closeMenu();

															menuItem.onClick();
														}}
													>
														{menuItem.name}
													</MenuItem>
												);
											}

											if (menuItem.divide) {
												return (
													<span key={index}>
														<Divider />

														{component}
													</span>
												);
											}

											return component;
										})}
									</Menu>
								</>
							)}

							{!user && (
								<ButtonGroup
									color='inherit'
									disabled={performingAction}
									variant='outlined'
								>
									<Button onClick={onSignUpClick}>
										Sign up
									</Button>
									<Button onClick={onSignInClick}>
										Sign in
									</Button>
								</ButtonGroup>
							)}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		);
	}
}

Bar.defaultProps = {
	performingAction: false,
};

Bar.propTypes = {
	// Properties
	performingAction: PropTypes.bool.isRequired,
	user: PropTypes.object,
	userData: PropTypes.object,

	// Events
	onAboutClick: PropTypes.func.isRequired,
	onSettingsClick: PropTypes.func.isRequired,
	onSignOutClick: PropTypes.func.isRequired,
};

export default WithStyles(styles)(Bar);
