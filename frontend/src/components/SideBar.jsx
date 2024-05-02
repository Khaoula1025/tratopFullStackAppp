import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
export default function Sidebar({ onLogout, toggleSidebar, isSidebarVisible }) {
  return (
    <div className="bg-gray-400">
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="md:hidden">
        {/* Hamburger Icon */}
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <Card
        className={` bg-gray-400 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4  shadow-blue-gray-900/5 ${
          isSidebarVisible ? "block" : "hidden"
        } md:block`}
      >
        <List>
          <ListItem className="flex items-center">
            <Link to="/" className="flex items-center">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <span className="ml-2">tache</span>{" "}
              {/* Add margin to space out the icon and text */}
            </Link>
          </ListItem>
          <ListItem className="flex items-center">
            <Link to="/historique" className="flex items-center">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <span className="ml-2">Historique</span>{" "}
              {/* Add margin to space out the icon and text */}
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>

          <ListItem onClick={onLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
}
