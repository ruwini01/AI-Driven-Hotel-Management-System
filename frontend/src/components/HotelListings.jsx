import React from 'react'
import HotelCard from './HotelCard'
import { hotels } from '@/data'

export default function HotelListings() {
    return (
        <section>
            <div>
                <h2>Top trending hotels worldwide</h2>
                <p>Discover the most trending hotels worldwide for an unforgettable experience</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4'>
                {
                    hotels.map((hotel) => {
                        return <HotelCard
                            hotel={hotel}
                        />
                    })
                }
            </div>
        </section>
    )
}
