// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"

// ** Default Avatar Image

const UserDropdown = () => {
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">DDS</span>
          <span className="user-status">Admin</span>
        </div>
        <Avatar
          imgHeight="40"
          imgWidth="40"
          status="online"
          content={'HB'}
          color={'success'}
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem
          tag={Link}
          to="/pages/"
          onClick={(e) => e.preventDefault()}
        >
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
