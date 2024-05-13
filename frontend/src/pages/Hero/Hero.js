import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section 
            style={{ 
                backgroundImage: `url("https://img.freepik.com/premium-photo/purple-gift-box-with-ribbon-set-against-white-background-image-showcases-soft-dreamy-depiction-with-muted-color-palette-pastel-color-scheme-floral-accents-add-touch-eleg_899449-96789.jpg?w=1060")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f3f4f6',
                padding: '300px'
            }} 
            className="hero-container"
        >
            <div style={{ maxWidth: '90%', margin: '0 auto' }} className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div style={{ marginRight: 'auto', alignSelf: 'center' }} className="lg:col-span-2">
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800', lineHeight: '1.1' }} className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                        Best Gifts Collection
                    </h1>
                    <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#4b5563' }} className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                   
                    </p>
                    <button
                        type="button"
                        style={{ 
                            marginTop: '0.375rem', 
                            backgroundColor: 'white', 
                            padding: '0.75rem 1.25rem', 
                            fontSize: '0.75rem', 
                            fontWeight: '600', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.05em', 
                            color: '#fff',
                            borderRadius: '10px',
                            
                        }}
                        className="mt-1.5 inline-block bg-blue px-5 py-3 text-xs font-medium uppercase tracking-wide text-black"

                    >
                        <Link to='/about'>
                        Explore Shop Collection
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    )
};

export default Hero;
