

import Hero from '../components/hero';
import HomeCards from '../components/HomeCards';
import Joblistings from '../components/joblistings';
import ViewAllJobs from '../components/viewAllJobs';

const Homepage = () => {

    return (
        <>
        
        <Hero />
        <HomeCards />
        <Joblistings isHome={true} />
        <ViewAllJobs />

        </>
    );

}

export default Homepage;



