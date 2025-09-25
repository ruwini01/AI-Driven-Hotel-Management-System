import React from 'react'
import { Button } from './ui/button'
import { Menu, Globe, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'

export default function Navigation() {
    return (
        <div className='z-50 bg-black/90 backdrop-blur-md'>
            <div className='flex items-center space-x-8'>
                <a href="/" className='text-xl font-bold'>
                Horizon
                </a>
                <div>
                    <a href={`/`} className='transition-colors text-sm'>
                    Home
                    </a>
                </div>

            </div>


        </div>
    )
}
