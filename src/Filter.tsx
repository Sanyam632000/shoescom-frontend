
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import {AiFillCloseCircle,AiFillDownCircle} from 'react-icons/ai'
import './index.css'
import axios from 'axios'
import {useEffect} from 'react' 
import { Link } from 'react-router-dom'


const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
]
const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
      { value: 'tees', label: 'Tees', checked: false },
      { value: 'objects', label: 'Objects', checked: true },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'black', label: 'Black', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'red', label: 'Red', checked: false },
      { value: 'green', label: 'Green', checked: false },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 's', label: 'S', checked: false },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
    ],
  },
]
const activeFilters = [{ value: 'objects', label: 'Objects' }]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Filter() {
  const [open, setOpen] = useState(false)
  const [checkedStatus,setCheckedStatus] = useState(false) 
  const [product,setProduct] = useState<any>([])

   useEffect(()=>{
     const fetchProducts=async()=>{
      const products = await axios.get("http://localhost:3333/product")
      console.log(products.data)
      setProduct(products.data)
     }
     fetchProducts()
   },[])

 
  const colors = [
    {value:'white',checked:false},
    {value:'black',checked:false},
    {value:'red',checked:false},
    {value:'yellow',checked:false},
    {value:'green',checked:false},
    {value:'blue',checked:false},
  ]

  const size = [
    {value:'6',checked:false},
    {value:'6.5',checked:false},
    {value:'7',checked:false},
    {value:'7.5',checked:false},
    {value:'8',checked:false},
    {value:'8.5',checked:false},
    {value:'9',checked:false},
    {value:'9.5',checked:false},
    {value:'10',checked:false},
    {value:'10.5',checked:false},
    {value:'11',checked:false},
    {value:'11.5',checked:false},
  ]
  
  const brand= [
    {value:'Puma',checked:false},
    {value:'Adidas',checked:false}
  ]
  
  const sort =[
    {value:'Price low to high',checked:false},
    {value:'Price high to low',checked:false}
  ]
  const [filterByColorAndSize,setFilterByColorAndSize] = useState<any>([])
  const [filterTrial,setFilterTrail] = useState<any>([])
  const [brands,setBrands] = useState<any>([])

 const handleRemoveFilter=(e:any,ac:any)=>{
  e.preventDefault()
   setFilterTrail(filterTrial.filter((f:any) => f != ac))
 }

 


 /*const handleFilterChange=(e:any)=>{
  if(e.target.checked==true){
    if(colors.map((c:any)=>{if(c.value==e.target.value){
      c.checked=true
      setFilterTrail([...filterTrial,`color=${e.target.value}`])
    }}))
  }

  else{
    if(colors.map((c:any) => {if(c.value == e.target.value){
      c.checked = false
      setFilterTrail(filterTrial.filter((item:any) => item !== `color=${e.target.value}`));
    }}))
    
  
 }*/


 const handleFilterChange=(e:any)=>{
  if(e.target.checked == true){

    if(colors.map((c:any)=>{if(c.value==e.target.value && !filterTrial.includes(`color=${e.target.value}`)){
      e.target.checked = true
      
      setFilterTrail([...filterTrial,`color=${e.target.value}`])
    }})){
      
    }


    if(size.map((s:any)=>{if(s.value == e.target.value && !filterTrial.includes(`size=${e.target.value}`)){
      e.target.checked = true
      setFilterTrail([...filterTrial,`size=${e.target.value}`])
    }})){}


 
  }
  else{

    if(e.target.checked == false){
      if(colors.map((c:any)=>{if(c.value==e.target.value){
        e.target.checked = false
        setFilterTrail(filterTrial.filter((item:any)=>item !=`color=${e.target.value}`))
      }})){}


      if(size.map((s:any)=>{if(s.value==e.target.value){
        e.target.checked = false 
        setFilterTrail(filterTrial.filter((item:any)=>item != `size=${e.target.value}`))
      }})){}

    }
  }
 }

//console.log(filterTrial)

 useEffect(()=>{
    const fetchFilterByColorAndSize=async()=>{
      const res = await axios.get(`http://localhost:3333/product/filter/byColorAndSize?${filterTrial.map((f:any)=>f).join("&")}`)
     console.log(`http://localhost:3333/product/filter/byColorAndSize?${filterTrial.map((f:any)=>f).join("&")}`)
     setFilterByColorAndSize(res.data)
     console.log(res.data)
     /* console.log(`http://localhost:3333/product/filter/byColor?color=${filterByColor.map((f:any)=>f).join("&color=")}
      `)
      console.log(`http://localhost:3333/product/filter/byColor?${filterTrial.map((f:any)=>f).join("&")}
      `)*/
      
      
      /*const res = await axios.get(`http://localhost:3333/product/filter/byColorAndSize?${filterByColor.map((f:any) => filters.map((ff:any)=>if(ff.options.value==f){(ff.id=='color')?('color=h'):('size=h')}))}`)*/
    }
    fetchFilterByColorAndSize()
 },[filterTrial])

 
  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 sm:hidden" onClose={setOpen}>
          

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
           
          </Transition.Child>
        </Dialog>
      </Transition.Root>

   

      {/* Filters */}
      <section aria-labelledby="filter-heading">
      
      <div className="mr-24 p-4 flow-root">


          <Popover className="relative inline-block text-left float-right">

              <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
                <span>Sort</span>   
                <AiFillDownCircle
                  className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition as={Fragment} enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
              >
                    
                  <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      
                    <form className="space-y-4">
                                        
                      {sort.map((option, optionIdx) => (
                          <div className="flex items-center">
                            <input name={option.value} defaultValue={option.value} type="checkbox"
                                   onChange={(e)=>handleFilterChange(e)}
                                  
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                              <label className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                              >
                                                {option.value}
                                              </label>
                                            </div>
                                          ))}

                                        </form>
                                      </Popover.Panel>
                                    </Transition>


              </Popover>


                      <Popover className="px-4 relative inline-block float-right text-left">


              <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
                <span>Colors</span>
              
                <AiFillDownCircle
                  className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <form className="space-y-4">
                                        
                                          {colors.map((option, optionIdx) => (
                                            <div className="flex items-center">
                                              <input
                                                
                                                name={option.value}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                onChange={(e)=>handleFilterChange(e)}
                                            
                                                
                                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                              />
                                              <label

                                                className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                              >
                                                {option.value}
                                              </label>
                                            </div>
                                          ))}

                                        </form>
                                      </Popover.Panel>
                                    </Transition>


              </Popover>
                        



              <Popover className="px-4 relative inline-block float-right text-left">


              <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
                <span>Size</span>
              
                <AiFillDownCircle
                  className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <form className="space-y-4">
                                        
                                          {size.map((option, optionIdx) => (
                                            <div className="flex items-center">
                                              <input
                                                
                                                name={option.value}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                onChange={(e)=>handleFilterChange(e)}

                                                
                                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                              />
                                              <label

                                                className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                              >
                                                {option.value}
                                              </label>
                                            </div>
                                          ))}

                                        </form>
                                      </Popover.Panel>
                                    </Transition>


              </Popover>
                      

              <Popover className="px-4 relative float-right inline-block text-left">


              <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
                <span>Brand</span>
              
                <AiFillDownCircle
                  className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                    >
                                      <Popover.Panel className="origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <form className="space-y-4">
                                        
                                          {brand.map((option, optionIdx) => (
                                            <div className="flex items-center">
                                              <input
                                                onChange={(e)=>handleFilterChange(e)}
                                                name={option.value}
                                                defaultValue={option.value}
                                                type="checkbox"

                                                
                                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                              />
                                              <label

                                                className="ml-3 pr-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                                              >
                                                {option.value}
                                              </label>
                                            </div>
                                          ))}

                                        </form>
                                      </Popover.Panel>
                                    </Transition>


              </Popover>
          </div>   


        {/* Active filters */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Filters
              <span className="sr-only">, active</span>
            </h3>

            <div aria-hidden="true" className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4" />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {filterTrial.map((activeFilter:any) => (
                  <span
                    key={activeFilter}
                    className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                  >
                    <span>{activeFilter}</span>
                    <button
                      type="button"
                      onClick={(e)=>handleRemoveFilter(e,activeFilter)}
                      className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <span className="sr-only">Remove filter for {activeFilter}</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">

            {filterTrial.length!=0?
           
            //console.log('rell')
            filterByColorAndSize?.map((pr:any) => (
              <Link key={pr._id} to={`/product/${pr._id}`}>
              <div 
                key={pr._id} 
                className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                 
                  <img
                    src={pr.img[0]}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                    />
                  
                  

                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {pr.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{pr.description}</p>
                  <div className="flex-1 flex flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">$ {pr.price}</p>
                  </div>
                </div>
              </div>
              </Link>))
            
            :
            //console.log('jhdi')
            product?.map((pr:any) => (
              <Link key={pr._id} to={`/product/${pr._id}`}>
              <div 
                key={pr._id} 
                className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                 
                  <img
                    src={pr.img[0]}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                    />
                  
                  

                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {pr.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{pr.description}</p>
                  <div className="flex-1 flex flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">$ {pr.price}</p>
                  </div>
                </div>
              </div>
              </Link>))
            
            }

            {/*{
            
            product.map((pr:any) => (
              <Link key={pr._id} to={`/product/${pr._id}`}>
              <div 
                key={pr._id} 
                className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                 
                  <img
                    src={pr.img[0]}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                    />
                  
                  

                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {pr.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{pr.description}</p>
                  <div className="flex-1 flex flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">$ {pr.price}</p>
                  </div>
                </div>
              </div>
              </Link>
            ))}*/}
            
          </div>
        </div>



    </div>
  )
}
