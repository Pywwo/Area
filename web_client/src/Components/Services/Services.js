import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect} from "react";
import StackGrid from "react-stack-grid";
import {useDispatch, useSelector} from "react-redux";
import updateServices from "../../Utils/updateServices";

export default function Services() {

    const dispatch = useDispatch();
    const serviceArray = useSelector(state => state.serviceList);

    useEffect(() => {
        updateServices(dispatch);
    }, [dispatch]);

    return(
        <div>
            <StackGrid columnWidth={"20%"} vendorPrefix={true}>
                {serviceArray}
            </StackGrid>
        </div>
    );
}