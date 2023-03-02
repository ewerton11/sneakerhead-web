import { api } from '@/lib/axios/axios'
import * as styled from '@/styles/feed/styled'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRef } from 'react'

interface Sneakers {
  id: number
  name: string
  price: number
  previous_price: number
  discount: number
  image: string
  details: string
}

export function Feed() {
  const [results, setResults] = useState<Sneakers[]>([])
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/teste?limit=${limit}`)
      setResults(response.data)
    }

    fetchData()
  }, [limit])

  const getItems = () => {
    if (results.length < limit) {
      return false
    }
    setLimit((prevState) => prevState + 20)
    return true
  }

  return (
    <styled.ContainerFeed>
      <styled.ContainerItem>
        <styled.Main>
          {results.map((sneaker: Sneakers) => {
            return (
              <styled.SneakerItem key={sneaker.id}>
                <a href={sneaker.details}></a>
                <styled.ImageCard>
                  {sneaker.discount ? (
                    <styled.Discount>
                      <p>{sneaker.discount}%</p>
                    </styled.Discount>
                  ) : (
                    ''
                  )}
                  <Image
                    src={sneaker.image}
                    width={360}
                    height={348}
                    alt={''}
                  />
                </styled.ImageCard>
                <styled.ContainerInfo>
                  <styled.DivInfo>
                    <styled.ContainerName>
                      <p>{sneaker.name}</p>
                    </styled.ContainerName>
                    <styled.ContainerPrice>
                      <p>
                        {(sneaker.price / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </p>
                      {sneaker.previous_price !== null ? (
                        <p>
                          {(sneaker.previous_price / 100).toLocaleString(
                            'pt-BR',
                            {
                              style: 'currency',
                              currency: 'BRL',
                            }
                          )}
                        </p>
                      ) : (
                        ''
                      )}
                    </styled.ContainerPrice>
                  </styled.DivInfo>
                </styled.ContainerInfo>
              </styled.SneakerItem>
            )
          })}
        </styled.Main>
        <styled.ContainerLoad>
          {getItems === false ? (
            ''
          ) : (
            <styled.Load onClick={getItems}></styled.Load>
          )}
        </styled.ContainerLoad>
      </styled.ContainerItem>
    </styled.ContainerFeed>
  )
}
