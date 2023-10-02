import React from 'react';
import AppNav from '../Common/Navigation/AppNav';
import Container from '../Common/Utils/Container';
import Hero from '../Common/Hero/Hero';
import CalendarPreview from '../Common/Calendar/CalendarPreview';

const DashboardLayout = () => {
  return (
    <main>
      <Hero/>
        <Container>
          <CalendarPreview/>
        </Container>
        <AppNav/>
    </main>
  )
}

export default DashboardLayout;