import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Badge } from "@material-ui/core";
import { PlaylistAddCheck } from '@material-ui/icons';
import { IBetList } from "./Dashboard";

interface NavbarProps {
	classes?: Partial<string>;
	bets: IBetList[]
	setIsDrawerOpen: (bool: boolean) => void
}

const useStyles = makeStyles((theme: any) => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: ".5rem 1rem",
		height: "6vh",
		background: "#fff"
	},
	companyInfoWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	logo: {
		width: "1.8rem",
		marginRight: ".5rem"
	}
}));

const Navbar: React.FC<NavbarProps> = ({ classes: propsClasses, setIsDrawerOpen, bets }) => {
	const classes = useStyles({ classes: propsClasses });
	return (
		<div className={classes.container}>
			<div className={classes.companyInfoWrapper}>
				<img
					className={classes.logo}
					src="https://nofluffjobs.com/upload/CrustLab_20190612_164243.png"
					alt="crutLab"
				/>
				<p>CrustLab</p>
			</div>
			<IconButton onClick={() => setIsDrawerOpen(true)} color="inherit">
              <Badge badgeContent={bets.length} color="secondary">
                <PlaylistAddCheck />
              </Badge>
            </IconButton>
		</div>
	);
};

export default Navbar;
