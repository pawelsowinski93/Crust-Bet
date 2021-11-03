import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel } from "@material-ui/core";

interface IStepperProps {
	classes?: Partial<string>;
	activeStep: number;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
        position: "sticky",
        top: ".5rem",
        backdropFilter: "blur(5px)"
	},
	backButton: {
		marginRight: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	stepper: {
		background: "none"
	},
    label: {
        fontSize: "1.2rem",
        fontWeight: "bold"
    }
}));

function getSteps(): string[] {
	return [
        "Select game...",
        "Type positions...",
        "Complete bet"
    ];
}

const StepperInfo: React.FC<IStepperProps> = ({
	classes: classesProps,
	activeStep
}) => {
	const classes = useStyles({ classes: classesProps });

	return (
		<div className={classes.root}>
			<Stepper
				classes={{ root: classes.stepper }}
				activeStep={activeStep}
				alternativeLabel
			>
				{getSteps().map((label) => (
					<Step key={label}>
						<StepLabel classes={{ alternativeLabel: classes.label }}>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</div>
	);
};

export default StepperInfo;
