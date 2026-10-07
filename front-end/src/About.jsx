import { useState, useEffect } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'

/**
 * A React component that shows a form the user can use to create a new message, as well as a list of any pre-existing messages.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const About = props => {
  const [aboutData, setAboutData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A nested function that fetches messages from the back-end server.
   */
  const fetchAboutData = () => {
    // setMessages([])
    // setLoaded(false)
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(response => {
        // axios bundles up all response data in response.data property
        setAboutData(response.data)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }
  
  // set up loading data from server when the component first loads
  useEffect(() => {
    fetchAboutData()
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

 return (
    <>
      <h1>About Us</h1>

      {/* Show error message if something breaks */}
      {error && <p className="Messages-error">{error}</p>}

      {/* Show the loading icon while waiting for the back-end */}
      {!loaded && <img src={loadingIcon} alt="loading" />}

      {/* Once loaded and data is ready, display the title, photo, and paragraph */}
      {loaded && aboutData && (
        <div className="About-content">
          
          <img 
            src={aboutData.imageUrl}
            style={{ width: '200px', borderRadius: '50%' }} 
          />
          
          <p>{aboutData.paragraph}</p>
        </div>
      )}
    </>
  )
}

// make this component available to be imported into any other file
export default About
