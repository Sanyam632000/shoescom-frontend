import './index.css'
import { useState,useEffect,Fragment,useRef, useContext } from 'react'
import { Disclosure, RadioGroup, Tab,Transition, Dialog } from '@headlessui/react'
import {AiOutlineStar,AiOutlineHeart,AiOutlineMinus,AiOutlinePlus,AiFillStar,AiFillCloseCircle} from 'react-icons/ai'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {format} from "timeago.js"
import { AuthContext } from './AuthContet'


const produc = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
      {
        id: 5,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
      },
      {
        id: 1,
        src:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
        imageAlt: "Back of women's Basic Tee in black.",
        primary: true,
      },
      {
        id: 2,
        src:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg",
        imageAlt: "Side profile of women's Basic Tee in black.",
        primary: false,
      },
      {
        id: 3,
        src:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg",
        imageAlt: "Front of women's Basic Tee in black.",
        primary: false,
      },
      {
        id: 4,
        src:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg",
        imageAlt: "Front of women's Basic Tee in black.",
        primary: false,
      },
      // More images...
    ],
    size: [
        { name: "XXS", inStock: true },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: false },
      ],
    colors: [
      { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
      { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
      { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
    details: [
      {
        name: 'Features',
        items: [
          'Multiple strap configurations',
          'Spacious interior with top zip',
          'Leather handle and tabs',
          'Interior dividers',
          'Stainless strap loops',
          'Double stitched construction',
          'Water-resistant',
        ],
      },
      // More sections...
    ],
  }

  const reviews = {
    average: 3.9,
    totalCount: 512,
    featured: [
      {
        id: 1,
        title: "Can't say enough good things",
        rating: 5,
        content: `
          <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
          <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
        `,
        author: "Risako M",
        date: "May 16, 2021",
        datetime: "2021-01-06",
      },
  
      {
        id: 2,
        title: "Can't say enough good things",
        rating: 5,
        content: `
            <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
            <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
          `,
        author: "Risako M",
        date: "May 16, 2021",
        datetime: "2021-01-06",
      },
      // More reviews...
    ],
  };
  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }



 export default function SinglePost() {
  const [selectedColor, setSelectedColor] = useState(produc.colors[0])
  const [selectedSize, setSelectedSize] = useState(produc.size[2]);
  const [product,setProduct] = useState<any>([])
  const [review,setReview] = useState<any>([])
  const [open, setOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let {productId} = useParams()
  const reviewTitle:any = useRef()
  const reviewDescription:any = useRef()
  const {user_detail} = useContext<any>(AuthContext)
  //const [userCart,setUserCart] = useState<any>(user_detail?.Cart)
  
  console.log(user_detail)
  
  useEffect(() => {
    const fetchProduct=async()=>{
        const res = await axios.get(`http://localhost:3333/product/${productId}`)
        setProduct(res.data)
    }
    fetchProduct()
  },[productId])

  useEffect(()=>{
    const fetchAllReviews=async()=>{
      const res = await axios.get(`http://localhost:3333/review/${productId}`)
      setReview(res.data)
   
    }
    fetchAllReviews()
  },[productId])

 const submitHandler =async(e:any)=>{
    e.preventDefault()
    
    const newReview ={
      ReviewTitle:reviewTitle.current.value,
      Review: reviewDescription.current.value,   
    }

    console.log(newReview)

    try{ 
     
      await axios.post(`http://localhost:3333/review/639f5d2ab447416b982b578a/${productId}`,newReview)   
      //window.location.reload() 
   }catch(err){}
 }


 const ProductAddToCart=async()=>{

  try{
  
    await axios.put(`http://localhost:3333/${user_detail._id}/${productId}`)
    //window.location.reload()
  }
  catch(err){}
 }



//  product.img.map((i:any)=>console.log(i))

    /*useEffect(()=>{
        const fetchProduct=async()=>{
            const res = await axios.get("http://localhost:3333/product")
            setProduct(res.data[0])
        }
    },[])*/
/*if(product.img){
    product.img.map((m:any)=>console.log(m))
}*/

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.img?.map((image:any) => (
                  <Tab
                    key={image}
                    className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                  >
                    {({ selected }) => (
                      <>
                        {/*<span className="sr-only">{image.name}</span>*/}
                        <span className="absolute inset-0 rounded-md overflow-hidden">
                          <img src={image} alt="" className="w-full h-full object-center object-cover" />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-indigo-500' : 'ring-transparent',
                            'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                          )}
                          aria-hidden="true"
                          />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
              {product.img?.map((image:any) => (
                <Tab.Panel key={image}>
                  <img
                    src={image}
                    
                    className="w-full h-full object-center object-cover sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">$ {product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <AiOutlineStar
                      key={rating}
                      className={classNames(
                        produc.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{produc.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <div className="mt-6">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-600">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {produc.colors.map((color:any) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedColor,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        {/*<RadioGroup.Label as="p" className="sr-only">
                          {color.name}
                    </RadioGroup.Label>*/}
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.bgColor,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>


              {/*Size*/}

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    See sizing chart
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">

                    {product.availabe_size?.map((size:any)=>{
                        return(
                          <RadioGroup.Option
                        key={size}
                        value={size}
                        className={({ active, checked }) =>
                          classNames(
                            active
                              ? "ring-2 ring-offset-2 ring-indigo-500"
                              : "",
                            checked
                              ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                              : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                            "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                          )
                        }
                        //disabled={!size.inStock}
                      >
                        <RadioGroup.Label as="p">{size}</RadioGroup.Label>
                      </RadioGroup.Option>
                        )
                    })}


                    {/*{produc.size.map((size:any) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        className={({ active, checked }) =>
                          classNames(
                            size.inStock
                              ? "cursor-pointer focus:outline-none"
                              : "opacity-25 cursor-not-allowed",
                            active
                              ? "ring-2 ring-offset-2 ring-indigo-500"
                              : "",
                            checked
                              ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                              : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                            "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                          )
                        }
                        disabled={!size.inStock}
                      >
                        <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                      </RadioGroup.Option>
                      ))}*/}
                  </div>
                </RadioGroup>
              </div>


              <div className="mt-10 flex sm:flex-col1">
                <button
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                  onClick={ProductAddToCart}
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <AiOutlineHeart className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="border-t divide-y divide-gray-200">
                
              </div>
            </section>
          </div>
        </div>
      </div>

      {/*Review*/}
        
      <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
          <h2
            id="reviews-heading"
            className="text-lg font-medium text-gray-900 ml-12"
          >
            Recent reviews
          </h2>


          <div className="mt-6 border-t border-b border-gray-200 pb-10 divide-y divide-gray-200 space-y-10">
          
          </div>



          <div className="mt-6 border-t border-b border-gray-200 pb-10 divide-y divide-gray-200 space-y-10">

          {review?.map((r:any) => (
            <div
            key={r._id}
            className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
          >
            <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
              <div className="flex items-center xl:col-span-1">
                <div className="flex items-center pl-12 pr-12">
                  {[0, 1, 2, 3,4].map((rating) => (
                    <AiFillStar
                      key={rating}
                      className={classNames(
                        review.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                {/*<p className="mr-40 text-sm text-gray-700">
                  {review.rating}
                  <span className="sr-only"> out of 5 stars</span>
                      </p>*/}
              </div>

              <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                <h3 className="text-sm font-medium pl-12 pr-12 text-gray-900">
                  {r.ReviewTitle}
                    </h3>

                <div
                  className="mt-3 pr-12 pl-12 text-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: r.Review }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
              <p className="font-medium text-gray-900 ml-12">{r.ReviewByUserId}</p>
              <time
                dateTime={r.createdAt}
                className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-12 lg:mt-2 lg:border-0 lg:pl-0"
              >
                {format(r.createdAt)}
              </time>
            </div>
          </div>
          ))}



            {reviews.featured.map((review) => (
              <div
                key={review.id}
                className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
              >
                <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center pl-12 pr-12">
                      {[0, 1, 2, 3,4].map((rating) => (
                        <AiFillStar
                          key={rating}
                          className={classNames(
                            review.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mr-40 text-sm text-gray-700">
                      {review.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                    <h3 className="text-sm font-medium pl-12 pr-12 text-gray-900">
                      {review.title}
                    </h3>

                    <div
                      className="mt-3 pr-12 pl-12 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
                  <p className="font-medium text-gray-900 ml-12">{review.author}</p>
                  <time
                    dateTime={review.datetime}
                    className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-12 lg:mt-2 lg:border-0 lg:pl-0"
                  >
                    {review.date}
                  </time>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center float-right mt-5">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mb-12 mr-12"
            >
              Write a Review
            </button>
          </div>

          <div>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="flex justify-between text-lg font-medium leading-6 text-gray-900"
                      >
                        <h3>Write A Review </h3>
                        <button
                          className="bg-transparent hover:bg-transparent text-red-300 hover:text-red-500"
                          onClick={() => setIsOpen(false)}
                        >
                          <AiFillCloseCircle></AiFillCloseCircle>
                        </button>
                      </Dialog.Title>
                      <div className="flex flex-col mt-5">
                        <input
                          placeholder="Add a title"
                          ref={reviewTitle}
                          className="border-2 border-slate-500 w-full float-left p-2 rounded-md"
                        ></input>
                        <textarea
                          placeholder="Write A Review"
                          className="border-2 border-slate-500 h-36 p-3 mt-5 w-full rounded-md"
                          id="ta"
                          ref={reviewDescription}
                        >
                        </textarea>
                      </div>

                      <button
                      
                        className="inline-flex float-right mt-3 rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        type="submit"
                        onClick={submitHandler}
                        //onClick={() => setIsOpen(false)}
                        
                      >
                        Post Review
                      </button>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          </div>
        </section>
      

    </div>




            
  )
}
