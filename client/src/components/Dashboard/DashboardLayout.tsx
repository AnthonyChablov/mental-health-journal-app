import React from 'react';
import AppNav from '../Common/Navigation/AppNav';
import Container from '../Common/Utils/Container';
import Hero from '../Common/Hero/Hero';

const DashboardLayout = () => {
  return (
    <main>
        <Container>
          <Hero/>
        </Container>
        <AppNav/>
    </main>
  )
}

export default DashboardLayout;