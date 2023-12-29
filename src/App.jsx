import { useEffect, useState } from 'react'
import gif from './assets/Spinner-5.gif'

function App() {
     const [data, setData] = useState(null)
     const [loading, setLoading] = useState(true)
     const [error, seterror] = useState(null)
     const [location, setLocation] = useState("Buea")
     useEffect(() => {
          fetchWeatherInfo()
     }, [])

     const fetchWeatherInfo = () => {
          fetch(`http://api.weatherapi.com/v1/current.json?key=caa969f7783749e0b0711853232611&q=${location}`, {
               method: 'get',
          }).then(response => {
               if (response.ok) {
                    return response.json()
               }
               throw response
          }).then(data => {
               setData(data)
               console.log(data)
          }).catch(error => {
               console.log("error fetching weather results", error)
               seterror(error)
          }).finally(() => {
               setLoading(false)
          })
     }

     const hancleClick = () => {
          setData(null)
          setLoading(true)
          setLocation("")
          seterror(null)
          fetchWeatherInfo()
     }

     const current = data?.current
     return (
          <div className='App'>
               <h1>Weather Now</h1>
               <div className="location">
                    <h3>{data && !loading?(`${data?.location.name} ,${data?.location.region} ,${data?.location.country}`): error?"connection failed...":"Loading location"}</h3>
               </div>
               <div className='box'>
                    <input placeholder='type location' type="text" value={location} onChange={(e) => setLocation(e.target.value)} maxLength={100} />
                    <button className='fas fa-search' onClick={hancleClick}></button>
               </div>
               <div className='info'>
                    {error ? (
                         <>
                              <strong>Failed to load info ..</strong>
                         </>
                    ) : loading ? (
                         <>
                              <img src={gif} />
                         </>
                    ) :
                         (
                              <div className="result">
                                   <h3 className='temp'>{current?.temp_c}<sup>o</sup>C</h3>
                                   <img className='image-fluid' src={current?.condition.icon} alt='' />
                                   <h3>{current?.condition.text}</h3>
                              </div>
                         )}
               </div>
          </div>
     )
}
export default App
