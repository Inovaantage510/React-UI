import React from "react";
import { RiHomeSmileFill } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { BiSolidReport } from "react-icons/bi";
import { Link } from "react-router-dom";

const Leftheader = ({ onManualClick }) => {
    const border = {
        top: 0,
        left: 0,
        height: "119vh", 
        width: "126px",
        backgroundColor: "#eb9c4d",
        borderColor: "#eb9c4d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px", 
        boxSizing: "border-box" 
    };

    const Liststyle = {
        listStyle: "none",
        padding: 0,
        margin: 0,
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        textAlign: "center",
    };

    const pastyle = {
        paddingBottom: "30px",
    };


    let url1 = "";
    let url2 = "/admin/dashboard/payroll_dashboard"; 
    let url3 = "/admin/dashboard/payroll/employees/invoice"; 
    let url4 = "/admin/dashboard/payroll/employees";   
    let url5 = ""; 

    return (
        <div style={border}>
            <div style={Liststyle}>
             <p><h6 style={{ letterSpacing:"1px" , fontSize:'12px'}}>MAIN MENU</h6></p>
            <Link to="" style={{ textDecoration: "none", color: "white" }}>
                <RiHomeSmileFill style={{ fontSize: "18px" }} />
                <div style={pastyle}>Dashboard</div>
            </Link>

            <Link to="" style={{ textDecoration: "none", color: "white" }} onClick={onManualClick}>
                <TfiMenuAlt style={{ fontSize: "18px" }} />
                <div style={pastyle}>Calender</div>
            </Link>

            <Link to="" style={{ textDecoration: "none", color: "white" }}>
                <BiSolidReport style={{ fontSize: "18px" }} />
                <div style={pastyle}>Tasks</div>
            </Link>

            <Link to="" style={{ textDecoration: "none", color: "white" }}>
                <BiSolidReport style={{ fontSize: "18px" }} />
                <div style={pastyle}>Settings</div>
            </Link>

            <Link to="" style={{ textDecoration: "none", color: "white" }}>
                <BiSolidReport style={{ fontSize: "18px" }} />
                <div style={pastyle}>Help Center</div>
            </Link>
           <br></br>
           <p><h5 style={{ textDecoration:"1px" ,  fontSize:'12px' }}>TEAM MANAGEMENT</h5></p>
           <br></br>

            <Link to={url1} style={{ textDecoration: "none", color: "white" }}>
                <BiSolidReport style={{ fontSize: "18px" }} />
                <div style={pastyle}>Performance</div>
            </Link>
               
            <Link to={url2} style={{ textDecoration: "none", color: "white" }}>
                <BiSolidReport style={{ fontSize: "18px" }} />
                <div style={pastyle}>Payrolls</div>
            </Link>
               
            <Link to={url3} style={{ textDecoration: "none", color: "white" }}>
                <BiSolidReport style={{ fontSize: "18px" }} />
                <div style={pastyle}>Invoices</div>
            </Link>

            <Link to={url4} style={{ textDecoration: "none", color: "white" }}>
                <BiSolidReport style={{ fontSize: "18px" }} />
                <div style={pastyle}>Employees</div>
            </Link>

            <Link to={url5} style={{ textDecoration: "none", color: "white" }}>
                <BiSolidReport style={{ fontSize: "18px" }} />
                <div style={pastyle}>Hiring</div>
            </Link>

            </div>
        </div>
    );
};

export default Leftheader;