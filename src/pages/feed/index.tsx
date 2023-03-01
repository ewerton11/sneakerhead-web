import { api } from '@/lib/axios/axios'
import * as styled from '@/styles/feed/styled'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Sneakers {
  id: number
  name: string
  price: number
  previous_price: number
  discount: number
  image: string
}

export function Feed() {
  const [results, setResults] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/teste')
      setResults(response.data)
    }

    fetchData()
  }, [])

  console.log(results, 'results linha 27')

  return (
    <styled.ContainerFeed>
      <styled.MainFeed>
        {results.map((items: Sneakers) => {
          return (
            <styled.CardDiv key={items.id}>
              {items.discount !== null ? (
                <styled.Discount>
                  <p>{items.discount} %</p>
                </styled.Discount>
              ) : (
                ''
              )}
              <styled.ImgCard>
                <Image src={items.image} alt={''} width={400} height={360} />
              </styled.ImgCard>
              <styled.ContainerInfo>
                <styled.DivInfo>
                  <styled.ContainerName>
                    <p>{items.name}</p>
                  </styled.ContainerName>
                  <styled.ContainerPrice>
                    <p>
                      {(items.price / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                    {items.previous_price !== null ? (
                      <p>
                        {(items.previous_price / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                    ) : (
                      ''
                    )}
                  </styled.ContainerPrice>
                </styled.DivInfo>
              </styled.ContainerInfo>
            </styled.CardDiv>
          )
        })}
      </styled.MainFeed>
    </styled.ContainerFeed>
  )
}
