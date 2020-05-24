import React from "react";

import PropTypes from "prop-types";

import { Card, CardHeader, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../UserAvatar";

function UserCard(props) {
	const user = props.user;
	const data = props;

	return (
		<Card>
			<CardHeader
				title={`${user.firstName} ${user.lastName}`}
				subheader={user.username}
			/>
			<CardContent>
				<UserAvatar user={Object.assign(user, data)} />
			</CardContent>
			<CardContent>
				<Typography variant='h3'>Your personnalized Theme</Typography>
				<Typography color={user.theme.primaryColor}>
					Primary Color :{user.theme.primaryColor}
				</Typography>
				<Typography color={user.theme.secondaryColor}>
					Secondary Color :{user.theme.secondaryColor}
				</Typography>
			</CardContent>
		</Card>
	);
}

UserCard.propTypes = {
	user: PropTypes.object.isRequired,
};

export default UserCard;
