import "./NavContainer.css"
import NavItem from "../NavItem/NavItem.jsx"

export default function NavContainer(props) {
    return (
        <nav className="NavContainer">
            <NavItem link="/" align="left" image="FF_logo..." alt="Home"/>
            {/* if large layout, flexible space here */}
            <NavItem link="/match" align="right" text="Match" alt=""/>
            <NavItem link="/browse" align="right" text="Browse" alt=""/>
            <NavItem link="/user" align="right" image="UserAccount" alt="Your Profile"/>
        </nav>
    );
}
