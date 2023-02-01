import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from "../Card";
import { ICard } from "../../models";

export const App: React.FC = () => {
  const [result, setResult] = useState<ICard[]>([]);
  const [nextApi, setNextApi] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const api = async () => {
      try {
        setError('')
        setLoading(true)
        const data = await fetch("https://rickandmortyapi.com/api/character",);
        const response = await data.json();
        setNextApi(response.info.next)
        setResult(response.results)
        setLoading(false)
      } catch (e: unknown) {
        const error = e as Error
        setLoading(false)
        setError(error.message)
      }
    };

    api();
  }, []);

  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY
    let windowBottomHeight = document.documentElement.offsetHeight

    if (userScrollHeight >= windowBottomHeight) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    };
  }, [handleScroll])

const fetchNextPage = () => {
  const api = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await fetch(`${nextApi}`)
      const response = await data.json();
      setNextApi(response.info.next)
      const newArray = result.concat(response.results)
      setResult(newArray)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as Error
      setLoading(false)
      setError(error.message)
    }
  };

  api();
}

return (
  <div className="container mx-auto pt-5">
    <h1 className="text-4xl font-bold mb-100 mx-auto text-center mb-20 mt-10">Rick and Morty character gallery</h1>
    <div className="flex flex-wrap justify-center">
      { loading && <p className="text-center">Loading...</p> }
      { error && <p className="text-center text-red-600">{ error }</p> }
      { result.map((item) => {
        return (
          <Card item={item} key={item.id}/>
        );
      })}
    </div>
  </div>
 )
}
