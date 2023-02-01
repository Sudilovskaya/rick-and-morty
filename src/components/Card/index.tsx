import React from 'react'
import { ICard } from "../../models";

type ItemProps = {
  item: ICard
}

export const Card: React.FC<ItemProps> = ({item}) => {
  const created = new Date(item.created).toLocaleDateString()

  return (
    <section className="border px-4 py-2 flex flex-col items-center mb-10 bg-indigo-300 mb-50 mr-5 ml-5 max-w-xs">
      <img src={item.image} alt="character"/>
      <h2 className=" text-4xl py-2 text-center">{item.name}</h2>
      <p className="font-semibold text-2xl py-2 text-center">{item.status}</p>
      <p className="font-semibold text-xl py-2 text-center">{created}</p>
      <p className="font-semibold text-xl py-2 text-center">{item.location.name}</p>
    </section>
  )
}