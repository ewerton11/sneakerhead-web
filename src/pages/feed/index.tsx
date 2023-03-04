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
  store: string
  image: string
  details: string
}

export function Feed() {
  const [results, setResults] = useState<Sneakers[]>([])
  const [resultsAll, setResultsAll] = useState<Sneakers[]>([])
  const [limit, setLimit] = useState(20)
  const [showOptions, setShowOptions] = useState(false)
  const [order, setOrder] = useState<string>()

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        `/sneakers?sorting=${order}&limit=${limit}`
      )
      setResults(response.data)

      const responseAll = await api.get(`sneakers`)
      setResultsAll(responseAll.data)
    }

    fetchData()
  }, [limit, order])

  const getItems = () => {
    if (results.length < limit) {
      return
    }
    setLimit((prevState) => prevState + 20)
  }

  return (
    <styled.ContainerFeed>
      <styled.ContainerItem>
        <styled.ContainerFilter>
          <styled.Result>
            <p>
              <span>[{resultsAll.length}]</span> resultados
            </p>
          </styled.Result>
          <styled.Filter
            onClick={() => {
              setShowOptions(!showOptions)
            }}
          >
            Ordenar
          </styled.Filter>
          {showOptions && (
            <styled.ShowOptions>
              <p
                onClick={() => {
                  setShowOptions(!showOptions)
                  setOrder('DescPrice')
                }}
              >
                Maior preço
              </p>
              <p
                onClick={() => {
                  setShowOptions(!showOptions)
                  setOrder('AscPrice')
                }}
              >
                Menor preço
              </p>
              <p
                onClick={() => {
                  setShowOptions(!showOptions)
                  setOrder('DescDiscount')
                }}
              >
                Maiores descontos
              </p>
            </styled.ShowOptions>
          )}
        </styled.ContainerFilter>
        <styled.Main>
          {results.map((sneaker: Sneakers) => {
            return (
              <styled.SneakerItem key={sneaker.id}>
                <styled.Details href={sneaker.details}>
                  <styled.ImageCard>
                    {sneaker.discount ? (
                      <styled.Discount>
                        <p>{sneaker.discount}%</p>
                      </styled.Discount>
                    ) : (
                      ''
                    )}
                    {sneaker.store === 'adidas' ? (
                      <Image
                        src={sneaker.image}
                        width={360}
                        height={348}
                        alt={''}
                        style={{ transform: 'scaleX(-1)' }}
                      />
                    ) : (
                      <Image
                        src={sneaker.image}
                        width={360}
                        height={348}
                        alt={''}
                      />
                    )}
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
                </styled.Details>
              </styled.SneakerItem>
            )
          })}
        </styled.Main>
        <styled.ContainerLoad>
          <styled.Load onClick={getItems}></styled.Load>
        </styled.ContainerLoad>
      </styled.ContainerItem>
    </styled.ContainerFeed>
  )
}
