import React from 'react'
import { ClipLoader } from "react-spinners";
export const Loader = ({isloading}) => {
  return (
    <div className="flex h-full items-center justify-center">
    <ClipLoader
      color={"blue"}
      loading={isloading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  )
}

export default Loader
