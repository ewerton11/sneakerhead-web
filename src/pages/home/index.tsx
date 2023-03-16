import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'

import { api } from '@/lib/axios/axios'
import * as styled from '@/styles/home/styled'

interface Sneakers {
  id: number
  name: string
  price: number
  previous_price: number
  price_history: number
  discount: number
  store: string
  image: string
  details: string
}

export function Feed() {
  const [results, setResults] = useState<Sneakers[]>([])
  const [resultsAll, setResultsAll] = useState<Sneakers[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortByBrand, setSortByBrand] = useState<string>('')
  const [sortByDiscounts, setSortByDiscounts] = useState<string>('')
  const [sortByPrice, setSortByPrice] = useState<string>('')
  const [limit, setLimit] = useState(40)
  const [showOptions, setShowOptions] = useState(false)
  const [orderPrice, setOrderPrice] = useState(false)
  const [orderBrand, setOrderBrand] = useState(false)
  const [orderDiscount, setOrderDiscount] = useState(false)
  const [columns, setColumns] = useState('three')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSneaker, setSelectedSneker] = useState<number>(1)
  const [resultsSneaker, setResultsSneaker] = useState<Sneakers[]>([])
  const [resultsneakersEqual, setResultsneakersEqual] = useState<Sneakers[]>([])

  console.log(resultsneakersEqual, 'resultado do tenis')

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        `/sneakers?search=${searchValue}&sortByBrand=${sortByBrand}` +
          `&sortByDiscounts=${sortByDiscounts}&sortByPrice=${sortByPrice}&limit=${limit}`
      )
      setResults(response.data)

      const responseAll = await api.get(`sneakers?limit=10000`)
      setResultsAll(responseAll.data)

      const responseSneaker = await api.get(
        `/sneakers/infoSneaker?id=${selectedSneaker}`
      )
      setResultsSneaker(responseSneaker.data)
    }

    fetchData()
  }, [
    searchValue,
    sortByBrand,
    sortByDiscounts,
    sortByPrice,
    limit,
    selectedSneaker,
  ])

  useEffect(() => {
    async function fetchData() {
      if (resultsSneaker.results && resultsSneaker.results.length > 0) {
        const responseSnkEqual = await api.get(
          `/sneakers/sneakersEqual?name=${resultsSneaker.results[0].name}`
        )
        setResultsneakersEqual(responseSnkEqual.data)
      }
    }

    fetchData()
  }, [resultsSneaker])

  const getItems = () => {
    if (results.length < limit) {
      return
    }
    setLimit((prevState) => prevState + 40)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { elements } = e.target as HTMLFormElement

    if (elements) {
      const inputSearch = elements.namedItem('inputSearch') as HTMLInputElement
      const searchValue = inputSearch?.value || ''
      setSearchValue(searchValue)
    }
  }

  const [offset, setOffset] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const containerWidth = 600

  const slidePrev = () => {
    setOffset((prevOffset) => prevOffset + slideWidth)
  }

  const slideNext = () => {
    setOffset((prevOffset) => prevOffset - slideWidth)
  }

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
            <styled.SearchBarContainer>
              <styled.SearchBarForm onSubmit={handleSubmit}>
                <styled.InputSearch
                  name="inputSearch"
                  type="text"
                  placeholder="buscar"
                />
                <styled.ButtonIcon type="submit">
                  <Image
                    src="/images/lupa-icon.png"
                    alt="lupa"
                    width={20}
                    height={20}
                  />
                </styled.ButtonIcon>
              </styled.SearchBarForm>
            </styled.SearchBarContainer>
            <styled.FilterButton onClick={() => setShowOptions(!showOptions)}>
              <styled.FilterButtonText>Filtrar</styled.FilterButtonText>
              <styled.FilterButtonIcon>
                <Image
                  src="/images/filter-icon.png"
                  alt="filtrar"
                  width={20}
                  height={20}
                />
              </styled.FilterButtonIcon>
            </styled.FilterButton>
            <styled.ContainerSneakersColumns columns={columns}>
              <styled.SneakersColumns onClick={() => setColumns('two')}>
                <div></div>
                <div></div>
              </styled.SneakersColumns>
              <styled.SneakersColumns onClick={() => setColumns('three')}>
                <div></div>
                <div></div>
                <div></div>
              </styled.SneakersColumns>
              <styled.SneakersColumns onClick={() => setColumns('four')}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </styled.SneakersColumns>
            </styled.ContainerSneakersColumns>
            <styled.FilterProvided>
              {sortByPrice === 'DescPrice' && <li>maiores preços</li>}
              {sortByPrice === 'AscPrice' && <li>menores preços</li>}
              {sortByBrand === 'adidas' && <li>marca adidas</li>}
              {sortByBrand === 'nike' && <li>marca nike</li>}
              {sortByDiscounts === 'DescDiscount' && <li>com disconto</li>}
            </styled.FilterProvided>
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
                    <styled.ClearSelection>
                      <styled.ClearText
                        onClick={() => {
                          setSortByPrice('')
                        }}
                      >
                        Limpar
                      </styled.ClearText>
                    </styled.ClearSelection>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={sortByPrice === 'DescPrice'}
                        onClick={() => {
                          setSortByPrice('DescPrice')
                        }}
                      >
                        <styled.Square>
                          {sortByPrice === 'DescPrice' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Maior preço</styled.TextLi>
                      </li>
                      <li
                        role="checkbox"
                        aria-checked={sortByPrice === 'AscPrice'}
                        onClick={() => {
                          setSortByPrice('AscPrice')
                        }}
                      >
                        <styled.Square>
                          {sortByPrice === 'AscPrice' && '✔️'}
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
                    <styled.ClearSelection>
                      <styled.ClearText
                        onClick={() => {
                          setSortByBrand('')
                        }}
                      >
                        Limpar
                      </styled.ClearText>
                    </styled.ClearSelection>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={sortByBrand === 'adidas'}
                        onClick={() => {
                          setSortByBrand('adidas')
                        }}
                      >
                        <styled.Square>
                          {sortByBrand === 'adidas' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Adidas</styled.TextLi>
                      </li>
                      <li
                        role="checkbox"
                        aria-checked={sortByBrand === 'nike'}
                        onClick={() => {
                          setSortByBrand('nike')
                        }}
                      >
                        <styled.Square>
                          {sortByBrand === 'nike' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Nike</styled.TextLi>
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
                    <styled.ClearSelection>
                      <styled.ClearText
                        onClick={() => {
                          setSortByDiscounts('')
                        }}
                      >
                        Limpar
                      </styled.ClearText>
                    </styled.ClearSelection>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={sortByDiscounts === 'DescDiscount'}
                        onClick={() => {
                          setSortByDiscounts('DescDiscount')
                        }}
                      >
                        <styled.Square>
                          {sortByDiscounts === 'DescDiscount' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Com desconto</styled.TextLi>
                      </li>
                    </styled.UlList>
                  </styled.ListOptions>
                </styled.ListFilter>
              </styled.DesktopFilters>
            )}
            <styled.SneakersContainer columns={columns}>
              {results.map(
                ({
                  id,
                  discount,
                  store,
                  image,
                  name,
                  price,
                  previous_price,
                }: Sneakers) => {
                  return (
                    <styled.SneakersWrapper key={id}>
                      <styled.Details
                        onClick={() => {
                          setModalOpen(!modalOpen)
                          setSelectedSneker(id)
                        }}
                      >
                        <styled.ImageCard>
                          {discount && (
                            <styled.Discount>
                              <p>{discount}%</p>
                            </styled.Discount>
                          )}
                          {store === 'adidas' ? (
                            <Image
                              src={image}
                              width={360}
                              height={348}
                              alt={''}
                              style={{ transform: 'scaleX(-1)' }}
                            />
                          ) : (
                            <Image
                              src={image}
                              width={360}
                              height={348}
                              alt={''}
                            />
                          )}
                        </styled.ImageCard>
                        <styled.ContainerInfo>
                          <styled.DivInfo>
                            <styled.ContainerName>
                              <p>{name}</p>
                            </styled.ContainerName>
                            <styled.ContainerPrice>
                              <p>
                                {(price / 100).toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })}
                              </p>
                              {previous_price !== null && (
                                <p>
                                  {(previous_price / 100).toLocaleString(
                                    'pt-BR',
                                    {
                                      style: 'currency',
                                      currency: 'BRL',
                                    }
                                  )}
                                </p>
                              )}
                            </styled.ContainerPrice>
                          </styled.DivInfo>
                        </styled.ContainerInfo>
                      </styled.Details>
                    </styled.SneakersWrapper>
                  )
                }
              )}
              {modalOpen && (
                <styled.Modal onClick={() => setModalOpen(false)}>
                  <styled.ModalContent>
                    {resultsSneaker.results.map(
                      ({
                        id,
                        details,
                        discount,
                        store,
                        image,
                        name,
                        price,
                        previous_price,
                        price_history,
                      }: Sneakers) => {
                        return (
                          <styled.ModalDetails href={details} key={id}>
                            <styled.ModalInfo>
                              <styled.ModelImage>
                                {store === 'adidas' ? (
                                  <Image
                                    src={image}
                                    width={360}
                                    height={348}
                                    alt={''}
                                    style={{ transform: 'scaleX(-1)' }}
                                  />
                                ) : (
                                  <Image
                                    src={image}
                                    width={360}
                                    height={348}
                                    alt={''}
                                  />
                                )}
                              </styled.ModelImage>
                              <styled.InfoSneaker>
                                <styled.ContainerModalName>
                                  <styled.ModalName>{name}</styled.ModalName>
                                </styled.ContainerModalName>
                                <styled.ModalPrice>
                                  <p>
                                    {(price / 100).toLocaleString('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL',
                                    })}
                                  </p>
                                  {previous_price !== null && (
                                    <p>
                                      {(previous_price / 100).toLocaleString(
                                        'pt-BR',
                                        {
                                          style: 'currency',
                                          currency: 'BRL',
                                        }
                                      )}
                                    </p>
                                  )}
                                </styled.ModalPrice>
                                <styled.ModalDiscount>
                                  <p>{discount}% de desconto</p>
                                </styled.ModalDiscount>
                                <p>{price_history}</p>
                              </styled.InfoSneaker>
                            </styled.ModalInfo>
                            <styled.ModalPreviws>
                              <styled.ModalCarrossel>
                                {resultsneakersEqual.map((sneakers) => {
                                  return (
                                    <styled.ContainerImage key={sneakers.id}>
                                      <Image
                                        src={sneakers.image}
                                        width={360}
                                        height={348}
                                        alt={''}
                                      />
                                    </styled.ContainerImage>
                                  )
                                })}
                              </styled.ModalCarrossel>
                            </styled.ModalPreviws>
                          </styled.ModalDetails>
                        )
                      }
                    )}
                  </styled.ModalContent>
                </styled.Modal>
              )}
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
