import Header from '@/components/header'
import { api } from '@/lib/axios/axios'
import * as styled from '@/styles/home/styled'
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
  const [searchValue, setSearchValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [order, setOrder] = useState<string>()

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        `/sneakers?sorting=${order}&limit=${limit}&search=${searchValue}`
      )
      setResults(response.data)

      const responseAll = await api.get(`sneakers?search=${searchValue}`)
      setResultsAll(responseAll.data)
    }

    fetchData()
  }, [limit, order, searchValue])

  const getItems = () => {
    if (results.length < limit) {
      return
    }
    setLimit((prevState) => prevState + 20)
  }

  const filteredResults = results.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <styled.LayoutContainer>
      <Header />
      <styled.ContainerStyled>
        <styled.ContainerWrapper>
          <styled.FilterWrapper>
            <styled.ResultsCounterWrapper>
              <styled.ResultsCounter>
                <p>
                  <span>[{resultsAll.length}]</span> resultados
                </p>
              </styled.ResultsCounter>
            </styled.ResultsCounterWrapper>
            <styled.FilterButton
              onClick={() => {
                setShowOptions(!showOptions)
              }}
            >
              <styled.FilterButtonText>Filtrar</styled.FilterButtonText>
              <styled.FilterButtonIcon>
                <Image
                  src="/images/filter-icon.png"
                  alt="Filtrar"
                  width={20}
                  height={20}
                />
              </styled.FilterButtonIcon>
            </styled.FilterButton>
            <styled.SearchBarContainer>
              <styled.SearchBarForm>
                <styled.InputSearch
                  type="text"
                  placeholder="buscar"
                  // value={searchValue}
                  // onChange={(e) => setSearchValue(e.target.value)}
                />
                <styled.ButtonIcon>
                  <Image
                    src="/images/lupa-icon.png"
                    alt="lupa"
                    width={20}
                    height={20}
                  />
                </styled.ButtonIcon>
              </styled.SearchBarForm>
            </styled.SearchBarContainer>
          </styled.FilterWrapper>
          <styled.FiltersAndSneakers>
            {showOptions && (
              <styled.DesktopFilters>
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
                <p
                  onClick={() => {
                    setShowOptions(!showOptions)
                    setOrder('BrandAdidas')
                  }}
                >
                  Tênis da adidas
                </p>
                <p
                  onClick={() => {
                    setShowOptions(!showOptions)
                    setOrder('BrandNike')
                  }}
                >
                  Tênis da nike
                </p>
              </styled.DesktopFilters>
            )}
            <styled.SneakersContainer>
              {filteredResults.map((sneaker: Sneakers) => {
                return (
                  <styled.SneakersWrapper key={sneaker.id}>
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
                  </styled.SneakersWrapper>
                )
              })}
            </styled.SneakersContainer>
          </styled.FiltersAndSneakers>
          <styled.ContainerLoad>
            <styled.Load onClick={getItems}></styled.Load>
          </styled.ContainerLoad>
        </styled.ContainerWrapper>
      </styled.ContainerStyled>
    </styled.LayoutContainer>
  )
}
