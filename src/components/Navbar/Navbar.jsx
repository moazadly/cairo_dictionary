import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputField from "../Input/InputField";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import SiteLogo from "../../assets/images/GPLogo.png";
const drawerWidth = 240;

function Navbar(props) {
  const data = useSelector((state) => state.user.data);
  const optionsNoun = data?.assigned_words?.map((word) => word.text);
  const dataOptionsNoun = data?.assigned_words;
  const optionsVerb = data?.assigned_verbs?.map((word) => word.text);
  const dataOptionsVerb = data?.assigned_verbs;

  const { window, navItems, setWord, word, first } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem>
          <ListItemText>
            <Typography
              noWrap
              component="div"
              sx={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              كود المحرر: {data?.code}
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            <Typography
              noWrap
              component="div"
              sx={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              لجنة: {data?.committee}
            </Typography>
          </ListItemText>
        </ListItem>
        {navItems?.map((item, index) => (
          <a
            href={`#${item.id}`}
            style={{ textDecoration: "none", color: "#0F2D4D" }}
            key={index}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="no-print">
      {" "}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            background: "linear-gradient(to right, #0F2D4D, #2369B3)",
            paddingY: "10px",
          }}
        >
          <Stack>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: 3,
                }}
              >
                <Typography
                  noWrap
                  component="div"
                  sx={{ width: "60%", display: { lg: "none" } }}
                  mr={"auto"}
                >
                  {setWord && (
                    <InputField
                      select={true}
                      label="قائمة المداخل المطلوب تحريرها"
                      options={optionsNoun || optionsVerb}
                      set={setWord}
                      dataOptions={dataOptionsNoun || dataOptionsVerb}
                      defaultOption={word}
                      val={word}
                      name={"text"}
                      nouns={optionsNoun ? true : false}
                    />
                  )}
                </Typography>
                <Stack
                  direction={"row"}
                  gap={3}
                  flexGrow={1}
                  alignItems={"center"}
                >
                  <Stack direction={"row"} display={{ xs: "none", lg: "flex" }}>
                    {navItems?.map((item, index) => (
                      <a href={`#${item.id}`} key={index}>
                        <Button
                          key={index}
                          sx={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "18px",
                            marginInline: "10px",
                          }}
                        >
                          {item.text}
                        </Button>
                      </a>
                    ))}
                  </Stack>
                  <Box
                    sx={{ width: "30%" }}
                    display={{ xs: "none", lg: "flex" }}
                  >
                    {setWord && (
                      <InputField
                        select={true}
                        label="قائمة المداخل المطلوب تحريرها"
                        options={optionsNoun || optionsVerb}
                        set={setWord}
                        dataOptions={dataOptionsNoun || dataOptionsVerb}
                        defaultOption={word}
                        val={word}
                        name={"text"}
                        nouns={optionsNoun ? true : false}
                      />
                    )}
                  </Box>
                </Stack>
                <Box
                  sx={{
                    width: { xs: "80px", lg: "100px" },
                    height: { xs: "80px", lg: "100px" },
                  }}
                >
                  <img
                    style={{ width: "100%" }}
                    src={SiteLogo}
                    alt="Site-Logo"
                  />
                </Box>
              </Stack>
            </Toolbar>
          </Stack>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </div>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
