import React, { Dispatch } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IBetList } from './Dashboard';
import { AppActions } from '../reducer/reducer';
import { useSnackbar } from "notistack";

interface IConfirmationPopoverProps {
    setSelectedGame: (number: number | null) => void;
    setAcviveStep: (num: number) => void;
    setBetList: (list: IBetList[]) => void;
    setIsOrderSet: (bool: boolean) => void;
    setIsBetActionOpen: (bool: boolean) => void;
    setIsOpen: (bool: boolean) => void;
    open: boolean;
    dispatch: Dispatch<AppActions>;
    betList: IBetList[];
}

const ConfirmationPopover: React.FC<IConfirmationPopoverProps> = ({
    open,
    dispatch,
    betList,
    setSelectedGame,
    setAcviveStep,
    setBetList,
    setIsOrderSet,
    setIsBetActionOpen,
    setIsOpen
}) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = () => {
        enqueueSnackbar("This is a success message!", { variant: "success" });
    };
    const handleClose = (): void => {
        setIsOpen(false)
    }

    const handleSubmit = (): void => {
        dispatch({ type: "add-bet-to-list", payload: betList })
        setSelectedGame(null);
        setAcviveStep(0);
        setBetList([]);
        setIsOrderSet(false);
        setIsBetActionOpen(true);
        setIsOpen(false);
        handleClickVariant();
    }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{"Are You sure You want to buy this ticked ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click Buy to proceed...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            BUY
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationPopover;
