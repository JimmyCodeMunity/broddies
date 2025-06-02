import React, { useContext } from 'react'
import { products } from '../constants'
import { Link } from 'react-router-dom'
import { ApiContext } from '../context/ApiContext';

const AllProducts = () => {
    const {getAllArt,arts} = useContext(ApiContext);
    return (
        <div className="bg-white overflow-hidden rounded-2xl">
            <section class="py-24">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 class="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
                        Product list
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                            {
                                                arts?.map((prod, index) => {
                                                    return (
                                                        <Link to={`/artview/${prod._id}`}
                                                            state={{ prod }}
                                                            class="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                                                            <div class="">
                                                                <img src={`https://broddie.menthealventures.com/${prod?.image}`} alt="face cream image"
                                                                    class="w-full aspect-square rounded-2xl object-cover" />
                                                            </div>
                                                            <div class="mt-5">
                                                                <div class="flex items-center justify-between">
                                                                    <h6
                                                                        class="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                                                        {prod?.artname}</h6>
                                                                    <h6 class="font-semibold text-xl leading-8 text-indigo-600">${prod?.price}</h6>
                                                                </div>
                                                                <p class="mt-2 font-normal text-sm leading-6 text-gray-500">{prod?.desc}</p>
                                                            </div>
                                                        </Link>
                                                    )
                                                })
                                            }
                    
                    
                                        </div>
                </div>

                <div className="w-full text-center py-6">
                    <button type='button' class='py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700'>View More</button>
                </div>
            </section>

        </div>
    )
}

export default AllProducts
