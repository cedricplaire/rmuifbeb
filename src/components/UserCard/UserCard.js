import React from "react";

import PropTypes from "prop-types";

import { Card, CardHeader, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../UserAvatar";
import {
	FiberManualRecord as FiberManualRecordIcon,
	//Brightness4 as Brightness4Icon,
} from "@material-ui/icons";
//import appearance from "../../services/appearance";

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
				<Typography variant='h5'>Your personnalized Theme</Typography>
				<Typography color="primary">
					Primary Color :
				</Typography>
				<FiberManualRecordIcon color="primary" />
				<Typography color="secondary">
					Secondary Color :
				</Typography>
				<FiberManualRecordIcon color="secondary" />
			</CardContent>
		</Card>
	);
}

UserCard.propTypes = {
	user: PropTypes.object.isRequired,
};

export default UserCard;
