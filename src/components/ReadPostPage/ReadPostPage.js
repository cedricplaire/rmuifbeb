import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/styles";
import {
    Grid,
    Paper,
    Button,
} from "@material-ui/core";

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
    divForm: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
	},
	divForm1: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: "10px",
	},
});

class ReadPostPage extends Component {
    constructor(props) {
        super(props);
        this.state=({
            currentPost: "",
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Fragment>
                <Grid container justifyContent="center">
                    <Grid
							spacing={4}
							alignItems='center'
							justify='center'
							container
							className={classes.grid}
						>
							<Grid item xs={12} md={4}>

                            </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default withStyles(styles)(ReadPostPage);