import React from 'react';
import { Grid, Stack, useMediaQuery, useTheme, Box } from '@mui/material';
import MainAppBar from "./MainAppBar";
import DemoPaperSection from "./DemoPaperSection";
import { StackedBarChart }  from "./StackedBarChart";
import { RequestsChart } from "./RequestsChart";
import  DataTable  from "./DataTable";
import Footer from "./Footer";
import NoticeTicker from './NoticeTicker';


const AdminDashboard = () => {
   
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
         
          <Grid
      container
      sx={{
        flexGrow: 1,
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
        bgcolor: isMobile ? '#ffe4c4' : '#faebd7',
        backgroundImage: isMobile
          ? 'linear-gradient(45deg, #fef6d6, #f99f3d)'
          : 'linear-gradient(45deg,rgb(254, 248, 206),rgb(249, 143, 61))',
        px: isMobile ? 1 : 3,
        pt: isMobile ? 7 : 10,
      }}
    >
      <MainAppBar />

      <NoticeTicker />

      <DemoPaperSection />

      <Grid container sx={{ width: '100%', mt: 4, px: 2 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{
            width: '100%',
            alignItems: 'stretch',
            borderRadius: 4,
          }}
        >
          <RequestsChart />
          <StackedBarChart />
      
        </Stack>
      </Grid>

      <Grid container sx={{ width: '98%', mt: 2, pl: 2 }}>
        <DataTable />
      </Grid>

      {/* Spacer at the end */}
      <Box sx={{ height: theme.spacing(6), width: '100%' }} />
          <Footer />
    </Grid>

    );
}; 
export default AdminDashboard;