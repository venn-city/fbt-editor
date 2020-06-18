import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useCloseAfterCreation = (onOk: any, loadingSelector: any) => {
  const isLoading = useSelector(loadingSelector)

  const [closeAfterCreation, setCloseAfterCreation] = useState(false)

  useEffect(() => {
    if (closeAfterCreation && !isLoading) {
      setCloseAfterCreation(false)
      if (onOk) {
        onOk()
      }
    }
  }, [closeAfterCreation, isLoading])

  return () => {
    setCloseAfterCreation(true)
  }
}

export default useCloseAfterCreation
