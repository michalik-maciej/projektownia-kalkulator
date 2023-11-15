import { useState } from "react"
import { uniq, map } from "lodash/fp"

import "./App.css"
import { StandInput } from "./components/StandInput"
import { StandElements } from "./components/StandElements"
import { getLeg, getShelf, getFoot } from "./products"
import { Foot, Leg, Shelf } from "./types"

export default function App() {
  const footOptions = getFoot()
  const [foot, setFoot] = useState<Foot>(footOptions[0])

  const legOptions = getLeg()
  const [leg, setLeg] = useState<Leg>(legOptions[0])

  const widthOptions = uniq(map(({ w }) => w, getShelf()))
  const [width, setWidth] = useState(widthOptions[0])

  const shelfOptions = getShelf(width)
  const [shelf, setShelf] = useState<Shelf>(shelfOptions[0])

  const [shelvesPerModule, setShelfNumber] = useState(6)

  return (
    <div className="m-12">
      <StandInput
        footOptions={footOptions}
        setFoot={setFoot}
        setLeg={setLeg}
        setShelf={setShelf}
        setShelfNumber={setShelfNumber}
        setWidth={setWidth}
        legOptions={legOptions}
        shelf={shelf}
        shelfOptions={shelfOptions}
        shelvesPerModule={shelvesPerModule}
        width={width}
        widthOptions={widthOptions}
      />
      <StandElements
        foot={foot}
        leg={leg}
        shelf={shelf}
        shelvesPerModule={shelvesPerModule}
      />
    </div>
  )
}
