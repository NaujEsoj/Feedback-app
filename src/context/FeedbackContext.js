import { createContext, useState, useEffect } from "react"
import data from '../data/FeedbackData'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState(
    {
      item: {},
      edit: false
    }
  )

  useEffect(() => {
    fetchFeedback()
  }, [])

  //set feedback list
  const fetchFeedback = () => {
    setFeedback(data)
    setIsLoading(false)
  }

  //delete selected feedback Item
  const deleteFeedback = (id) => {
    if (window.confirm('Are you shure you want to delete the Feedback?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //Add a new feedback Item
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  //set button send to update
  const updateFeedback = (id, upditem) => {
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...upditem} : item))
  }

  return (
    <FeedbackContext.Provider value={{
      feedback,
      feedbackEdit,
      deleteFeedback,
      addFeedback,
      isLoading,
      editFeedback,
      updateFeedback
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext