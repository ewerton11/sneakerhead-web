import Footer from '@/components/footer'
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
  const [showPrecoOptions, setShowPrecoOptions] = useState(false)
  const [orderPrice, setOrderPrice] = useState(false)
  const [orderBrand, setOrderBrand] = useState(false)
  const [orderDiscount, setOrderDiscount] = useState(false)

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
          <styled.FiltersAndSneakers showOptions={showOptions}>
            {showOptions && (
              <styled.DesktopFilters>
                <styled.ListFilter>
                  <styled.OrderButton
                    onClick={() => setOrderPrice(!orderPrice)}
                  >
                    <styled.ButtonText>
                      <h2>Preços</h2>
                    </styled.ButtonText>
                    <styled.ArrowIcon orderButton={orderPrice}>
                      <Image
                        src="/images/arrow.svg"
                        alt="arrow"
                        width={10}
                        height={10}
                      />
                    </styled.ArrowIcon>
                  </styled.OrderButton>
                  <styled.ListOptions orderButton={orderPrice}>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={order === 'DescPrice'}
                        onClick={() => {
                          setOrder('DescPrice')
                        }}
                      >
                        <styled.Square>
                          {order === 'DescPrice' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Maior preço</styled.TextLi>
                      </li>
                      <li
                        role="checkbox"
                        aria-checked={order === 'AscPrice'}
                        onClick={() => {
                          setOrder('AscPrice')
                        }}
                      >
                        <styled.Square>
                          {order === 'AscPrice' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Menor preço</styled.TextLi>
                      </li>
                    </styled.UlList>
                  </styled.ListOptions>
                </styled.ListFilter>
                <styled.ListFilter>
                  <styled.OrderButton
                    onClick={() => setOrderBrand(!orderBrand)}
                  >
                    <styled.ButtonText>
                      <h2>Marca</h2>
                    </styled.ButtonText>
                    <styled.ArrowIcon orderButton={orderBrand}>
                      <Image
                        src="/images/arrow.svg"
                        alt="arrow"
                        width={10}
                        height={10}
                      />
                    </styled.ArrowIcon>
                  </styled.OrderButton>
                  <styled.ListOptions orderButton={orderBrand}>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={order === 'BrandAdidas'}
                        onClick={() => {
                          setOrder('BrandAdidas')
                        }}
                      >
                        <styled.Square>
                          {order === 'BrandAdidas' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Tênis da adidas</styled.TextLi>
                      </li>
                      <li
                        role="checkbox"
                        aria-checked={order === 'BrandNike'}
                        onClick={() => {
                          setOrder('BrandNike')
                        }}
                      >
                        <styled.Square>
                          {order === 'BrandNike' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Tênis da nike</styled.TextLi>
                      </li>
                    </styled.UlList>
                  </styled.ListOptions>
                </styled.ListFilter>
                <styled.ListFilter>
                  <styled.OrderButton
                    onClick={() => setOrderDiscount(!orderDiscount)}
                  >
                    <styled.ButtonText>
                      <h2>Descontos</h2>
                    </styled.ButtonText>
                    <styled.ArrowIcon orderButton={orderDiscount}>
                      <Image
                        src="/images/arrow.svg"
                        alt="arrow"
                        width={10}
                        height={10}
                      />
                    </styled.ArrowIcon>
                  </styled.OrderButton>
                  <styled.ListOptions orderButton={orderDiscount}>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={order === 'DescDiscount'}
                        onClick={() => {
                          setOrder('DescDiscount')
                        }}
                      >
                        <styled.Square>
                          {order === 'DescDiscount' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Maiores Descontos</styled.TextLi>
                      </li>
                    </styled.UlList>
                  </styled.ListOptions>
                </styled.ListFilter>
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
      <Footer />
    </styled.LayoutContainer>
  )
}
