import './App.css'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import HotelListings from './components/HotelListings'



function HomePage() {

  return (
    <>
      <Navigation />
      <main>
        <div className='relative min-h-[85vh]'>
          <Hero />
        </div>
        <HotelListings/>
      </main>

    </>
  )
}

export default HomePage
