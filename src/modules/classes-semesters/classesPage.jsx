import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import ClassesList from "./classesList";

function ClassesPage() {
    const [ flag, setFlag ] = useState(true);
    console.log('re-render');
    const location = useLocation();
    useEffect(() => {
        if (location.pathname == '/classes') {
            setFlag(true);
            console.log('effect');
        }
    }, [location.pathname]);
    return (
        <>
            {flag && <ClassesList flag={flag} setFlag={setFlag}/>}
            {!flag && <Outlet/>}
        </>
    )
}

export default ClassesPage;