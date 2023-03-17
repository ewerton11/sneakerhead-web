import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'

import { api } from '@/lib/axios/axios'
import * as styled from '@/styles/home/styled'

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

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
  const [searchResults, setSearchResults] = useState<Sneakers[]>([])
  const [allResults, setAllResults] = useState<Sneakers[]>([])
  const [selectedSneakerInfo, setSelectedSneakerInfo] = useState<Sneakers[]>([])
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
  const [resultsneakersEqual, setResultsneakersEqual] = useState<Sneakers[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [searchResults, allResults, selectedSneakerInfo] =
          await Promise.all([
            api.get(
              `/sneakers?search=${searchValue}&sortByBrand=${sortByBrand}` +
                `&sortByDiscounts=${sortByDiscounts}&sortByPrice=${sortByPrice}` +
                `&limit=${limit}`
            ),
            api.get(`/sneakers?limit=10000`),
            api.get(`/sneakers/infoSneaker?id=${selectedSneaker}`),
          ])

        setSearchResults(searchResults.data)
        setAllResults(allResults.data)
        setSelectedSneakerInfo(selectedSneakerInfo.data)
      } catch (error) {
        console.error(error)
      }
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
      if (
        selectedSneakerInfo.results &&
        selectedSneakerInfo.results.length > 0
      ) {
        try {
          const responseSnkEqual = await api.get(
            `/sneakers/sneakersEqual?name=${selectedSneakerInfo.results[0].name}`
          )

          setResultsneakersEqual(responseSnkEqual.data)
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchData()
  }, [selectedSneakerInfo])

  const getItems = () => {
    if (searchResults.length < limit) {
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

  // const [offset, setOffset] = useState(0)
  // const [slideWidth, setSlideWidth] = useState(0)
  // const containerWidth = 600

  // const slidePrev = () => {
  //   setOffset((prevOffset) => prevOffset + slideWidth)
  // }

  // const slideNext = () => {
  //   setOffset((prevOffset) => prevOffset - slideWidth)
  // }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    tension: 0.3,
    animation: false,

    scales: {
      x: {
        grid: {
          display: false,
          // drawBorder: false,
        },
      },
      y: {
        ticks: {
          display: true,
        },
        grid: {
          display: true,
          drawTicks: false,
          // drawBorder: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Ultimos preços',
      },
    },
  }

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  // const data = resultsSneaker.results.map((sneakers) => {
  //   return sneakers.price_history
  // })

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(42, 74, 255)',
        backgroundColor: 'rgb(42, 74, 255)',
        borderWidth: 2,
      },
    ],
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
                  <span>[{allResults.length}]</span> resultados
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
              {searchResults.map(
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
                    {selectedSneakerInfo.results.map(
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
                                    height={360}
                                    alt={''}
                                    style={{ transform: 'scaleX(-1)' }}
                                  />
                                ) : (
                                  <Image
                                    src={image}
                                    width={360}
                                    height={360}
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
                                {discount && (
                                  <styled.ModalDiscount>
                                    <p>{discount}% de desconto</p>
                                  </styled.ModalDiscount>
                                )}
                                <styled.HistoryPrice>
                                  <styled.DivHistory>
                                    {/* {price_history} */}
                                    <Line options={options} data={data} />
                                  </styled.DivHistory>
                                </styled.HistoryPrice>
                              </styled.InfoSneaker>
                            </styled.ModalInfo>
                            <styled.ModalPreviws>
                              <div>
                                <Image
                                  src="/images/arrow.svg"
                                  alt="arrow"
                                  width={10}
                                  height={10}
                                />
                              </div>
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
                              <div>
                                <Image
                                  src="/images/arrow.svg"
                                  alt="arrow"
                                  width={10}
                                  height={10}
                                />
                              </div>
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
