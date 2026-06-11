import { Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <Box>
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box
          sx={{
            flexGrow: 1,
            padding: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;