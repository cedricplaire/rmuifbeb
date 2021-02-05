import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import HomePage from "../HomePage";
import LandingPage from "../LandingPage";
import AdminPage from "../AdminPage";
import UserPage from "../UserPage";
import BlogPage from "../BlogPage";
import NewsPage from "../NewsPage";
import TutorialsPage from "../TutorialsPage";
import NotFoundPage from "../NotFoundPage";

class Router extends Component {
	render() {
		// Properties
		const { user, userData, roles, bar } = this.props;

		// Functions
		const { openSnackbar } = this.props;

		return (
			<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
				{bar}

				<Switch>
					<Route path='/' exact>
						<HomePage user={user} openSnackbar={openSnackbar} />
					</Route>

					<Route path='/landing'>
						<LandingPage user={user} openSnackbar={openSnackbar} />
					</Route>

					<Route path='/blog'>
						<BlogPage user={user} openSnackbar={openSnackbar} />
					</Route>

					<Route path='/tutorials'>
						<TutorialsPage openSnackbar={openSnackbar} />
					</Route>

					<Route path='/news'>
						<NewsPage openSnackbar={openSnackbar} />
					</Route>

					<Route path='/admin'>
						{user && roles.includes("admin") ? (
							<AdminPage
								user={user}
								userData={userData}
								roles={roles}
							/>
						) : (
							<Redirect to='/' />
						)}
					</Route>

					<Route path='/user/:userId'>
						{user ? <UserPage /> : <Redirect to='/' />}
					</Route>

					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</BrowserRouter>
		);
	}
}

Router.propTypes = {
	// Properties
	user: PropTypes.object,
	roles: PropTypes.array.isRequired,
	bar: PropTypes.element,

	// Functions
	openSnackbar: PropTypes.func.isRequired,
};

export default Router;
