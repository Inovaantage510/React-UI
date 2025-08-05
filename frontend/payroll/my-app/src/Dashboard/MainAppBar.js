import React, { useEffect, useRef, useState } from "react";

import NotificationSound from './notification-sound.mp3';

import { Helmet } from "react-helmet";


import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Modal,
  Box,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import Notification from "./Notification";
import VerticalAppBar from "./VerticalAppBar";
import { Link } from "react-router-dom";

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

const MainAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClick = () => setShowSidebar(!showSidebar);
  const handleMobileMenuOpen = (e) => setMobileMenuAnchor(e.currentTarget);
  const handleMobileMenuClose = () => setMobileMenuAnchor(null);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationClick = () => setNotificationOpen(true);
  const handleCloseNotification = () => setNotificationOpen(false);

  const audioPlayer = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    const savedNotifications = JSON.parse(saved) || [];
    setNotifications(savedNotifications);

    if (savedNotifications.length > 0) {
      setNotificationOpen(true);

      setTimeout(() => {
        setNotificationOpen(false);
        localStorage.removeItem("notifications");
      }, 2000);
    }
  }, []);

  const mobileMenu = (
    <Menu anchorEl={mobileMenuAnchor} open={Boolean(mobileMenuAnchor)} onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleMobileMenuClose}>
        <SearchIcon sx={{ color: "black" }} /> Search
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon sx={{ color: "black" }} />
        </Badge>
        Notifications
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <AccountCircle sx={{ color: "black" }} /> Profile
      </MenuItem>
    </Menu>
  );

  const profileMenu = (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <Link to="/admin/login" style={{
        textDecoration: 'none',
        color: 'black'
      }}><MenuItem onClick={handleMenuClose}>Logout</MenuItem></Link>
    </Menu>
  );

  function playAudio() {
    audioPlayer.current.play();
  }

  const SearchOptions = () => {
    const filter = searchQuery.toLowerCase().trim();
    const elementIds = [
      "TotalEmployees",
      "AverageSalary",
      "TotalOutstanding",
      "TotalRequests",
      "Requests" 
    ];

    elementIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const txtValue = element.textContent || element.innerText;

        element.style.backgroundColor = "";
        element.style.display = "block";
        element.style.width = "";

        if (filter && txtValue.toLowerCase().includes(filter)) {
          element.style.backgroundColor = "rgb(245, 216, 162)";
          element.style.width = "fit-content";
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (filter) {
          element.style.display = "none";
        }
      }
    });
  };

  return (
    <>

   <Helmet> 
    <title>Admin Dashboard</title>
   </Helmet> 
   
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          backgroundImage: "linear-gradient(45deg, rgb(254, 248, 206), rgb(249, 143, 61))",
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" wrap="nowrap" sx={{ width: "100%" }}>
            <Grid item sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <IconButton size="large" edge="start" sx={{ color: "black" }} onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <img
                src="https://inovaantage.com/wp-content/uploads/2023/08/inovaantage-logo-new.png"
                style={{ height: "50px", marginLeft: 8, cursor: "pointer" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                alt="Inovaantage Logo"
              />
            </Grid>

            <Grid item sx={{ flexGrow: 1 }} />

            <Grid item sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
              <Search sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)", display: { xs: "none", md: "flex" } }} >
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "black" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{
                    "aria-label": "search", onKeyPress: (e) => {
                      if (e.key === 'Enter') SearchOptions(); 
                    }
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

              </Search>

              <IconButton size="large" sx={{ color: "black" }} onClick={handleNotificationClick}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon sx={{ color: "black" }} onClick={playAudio} />
                </Badge>
              </IconButton>

              <IconButton size="large" edge="end" onClick={handleProfileMenuOpen} sx={{ color: "black" }}>
                <AccountCircle />
              </IconButton>

              <IconButton
                size="large"
                sx={{ color: "black", display: { xs: "inline-flex", md: "none" } }}
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </Grid>
          </Grid>

          {showSidebar && <VerticalAppBar onClose={() => setShowSidebar(false)} />}
        </Toolbar>
      </AppBar>

      <audio ref={audioPlayer} src={NotificationSound} />
      {notificationOpen && (<Modal open={notificationOpen} onClose={handleCloseNotification}>

        <Box
          sx={{
            position: "absolute",
            top: "90%",
            left: "85%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#a67730",
            color: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            outline: "none",
          }}
        >
          <Notification notifications={notifications} />
        </Box>
      </Modal>
      )}
      {mobileMenu}
      {profileMenu}
    </>
  );
};

export default MainAppBar;