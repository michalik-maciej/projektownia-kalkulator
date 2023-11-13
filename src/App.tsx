import { useState, ChangeEvent } from "react"
import { find, uniq, map, toString, toInteger } from "lodash/fp"

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

  const handleSetWidth = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const newShelves = getShelf(toInteger(value))
    const newShelf = find(({ d }) => d === shelf?.d, newShelves)
    setShelf(newShelf || newShelves[0])
    setWidth(toInteger(value))
  }

  const handleSetFoot = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const newFoot = find(({ w }) => toString(w) === value, footOptions)
    setFoot(newFoot || footOptions[0])
  }

  const handleSetLeg = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const newLeg = find(({ h }) => toString(h) === value, legOptions)
    setLeg(newLeg || legOptions[0])
  }

  const handleSetShelf = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const newShelf = find(({ d }) => toString(d) === value, shelfOptions)
    setShelf(newShelf || shelfOptions[0])
  }

  const handleSetShelfNumber = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setShelfNumber(toInteger(value))
  }

  return (
    <div className="m-12">
      <StandInput
        footOptions={footOptions}
        handleSetFoot={handleSetFoot}
        handleSetLeg={handleSetLeg}
        handleSetShelf={handleSetShelf}
        handleSetShelfNumber={handleSetShelfNumber}
        handleSetWidth={handleSetWidth}
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
