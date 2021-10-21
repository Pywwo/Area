import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect} from "react";
import StackGrid from "react-stack-grid";
import {useDispatch, useSelector} from "react-redux";
import {setDisplayDialog, setFormCard} from "../../Actions";
import Slide from '@material-ui/core/Slide';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import InformationForm from "../AppletCreator/InformationForm";
import updateApplets from "../../Utils/updateApplets";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Applets() {
    const dispatch = useDispatch();
    const appletArray = useSelector(state => state.appletList);
    const formCard = useSelector(state => state.formCard);
    const displayDialog = useSelector(state => state.displayDialog);

    useEffect(() => {
        dispatch(setFormCard(<InformationForm/>));
        updateApplets(dispatch);
    }, [dispatch]);

    return (
        <div>
            <StackGrid columnWidth={"20%"} vendorPrefix={true}>
                {appletArray}
                <Button style={{ height: '18em', backgroundColor: '#314DE1', color: 'white'}}
                        variant="contained"
                        onClick={() => dispatch(setDisplayDialog(true))}>
                    +
                </Button>
            </StackGrid>
            <Dialog
                open={displayDialog}
                onExit={() => updateApplets(dispatch)}
                PaperProps={{
                    style: {
                        backgroundColor: 'white',
                        boxShadow: 'none',
                        width: '100%'
                    },
                }}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {
                    formCard
                }
            </Dialog>
        </div>
    );
}