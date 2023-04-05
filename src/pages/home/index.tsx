import Image from 'next/image'
import {
  FormEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

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

export default function Home() {
  const [searchResults, setSearchResults] = useState<Sneakers[]>([])
  const [allResults, setAllResults] = useState<Sneakers[]>([])
  const [selectedSneakerInfo, setSelectedSneakerInfo] = useState<Sneakers[]>([])
  const [searchParams, setSearchParams] = useState({
    searchQuery: '',
    brandSort: '',
    discountSort: '',
    priceSort: '',
    limit: 40,
  })
  const [showOptions, setShowOptions] = useState({
    isShown: false,
    isPriceOrdered: false,
    isBrandOrdered: false,
    isDiscountOrdered: false,
    isModalOpen: false,
  })
  const [gridColumns, setGridColumns] = useState('three')
  const [selectedSneakerId, setSelectedSneakerId] = useState<number>(200) //corrigir
  const [equalSneakers, setEqualSneakers] = useState<Sneakers[]>([])
  const carouselContainerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [carouselScrollState, setCarouselScrollState] = useState({
    left: 0,
    right: 1,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [searchResults, allResults, selectedSneakerInfo] =
          await Promise.all([
            api.get(
              `/sneakers?searchQuery=${searchParams.searchQuery}&brandSort=${searchParams.brandSort}` +
                `&discountSort=${searchParams.discountSort}&priceSort=${searchParams.priceSort}` +
                `&limit=${searchParams.limit}`
            ),
            api.get(`/sneakers?limit=10000`),
            api.get(`/sneakers/infoSneaker?id=${selectedSneakerId}`),
          ])

        setSearchResults(searchResults.data)
        setAllResults(allResults.data)
        setSelectedSneakerInfo(selectedSneakerInfo.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [searchParams, selectedSneakerId])

  const fetchEqualSneakers = useCallback(async () => {
    if (selectedSneakerInfo && selectedSneakerInfo.length > 0) {
      try {
        const responseSnkEqual = await api.get(
          `/sneakers/sneakersEqual?name=${selectedSneakerInfo[0].name}`
        )

        setEqualSneakers(responseSnkEqual.data)
      } catch (error) {
        console.error(error)
      }
    }
  }, [selectedSneakerInfo])

  useEffect(() => {
    fetchEqualSneakers()
  }, [fetchEqualSneakers])

  const getItems = () => {
    if (searchResults.length < searchParams.limit) {
      return
    }
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      limit: prevSearchParams.limit + 40,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { elements } = e.target as HTMLFormElement

    if (elements) {
      const inputSearch = elements.namedItem('inputSearch') as HTMLInputElement
      const searchQuery = inputSearch?.value || ''
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        searchQuery: searchQuery,
      }))
    }
  }

  const handleClickOutside: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === modalRef.current) {
      setShowOptions((prevOption) => ({
        ...prevOption,
        isModalOpen: false,
      }))
    }
  }

  function handleCarouselLeftArrowClick() {
    if (!carouselContainerRef.current) return

    const { clientWidth, scrollLeft } = carouselContainerRef.current

    setCarouselScrollState({
      left: scrollLeft,
      right: 1,
    })

    const scrollAmount = Math.round(clientWidth * 0.7)

    carouselContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    })
  }

  function handleCarouselRightArrowClick() {
    if (!carouselContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } =
      carouselContainerRef.current

    if (scrollLeft >= scrollWidth - clientWidth) {
      setCarouselScrollState({
        left: scrollLeft,
        right: 0,
      })
    } else {
      setCarouselScrollState((scroll) => ({
        ...scroll,
        left: 1,
      }))
    }

    const scrollAmount = Math.round(clientWidth * 0.7)

    carouselContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })
  }

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
    animation: { duration: 0 },

    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
          // drawBorder: false,
        },
        display: false,
      },
      y: {
        ticks: {
          display: true,
        },
        grid: {
          display: false,
          // drawTicks: false,
          // drawBorder: false,
        },
        display: false,
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

  const historyPrice = [400, 450, 400, 350, 400, 400, 400]

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: historyPrice,
        borderColor: 'rgb(42, 74, 255)',
        backgroundColor: 'rgb(42, 74, 255)',
        borderWidth: 2,
        radius: 0,
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
            <styled.FilterButton
              onClick={() =>
                setShowOptions((prevOptions) => ({
                  ...prevOptions,
                  isShown: !prevOptions.isShown,
                }))
              }
            >
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
            <styled.ContainerSneakersColumns gridColumns={gridColumns}>
              <styled.SneakersColumns onClick={() => setGridColumns('two')}>
                <div></div>
                <div></div>
              </styled.SneakersColumns>
              <styled.SneakersColumns onClick={() => setGridColumns('three')}>
                <div></div>
                <div></div>
                <div></div>
              </styled.SneakersColumns>
              <styled.SneakersColumns onClick={() => setGridColumns('four')}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </styled.SneakersColumns>
            </styled.ContainerSneakersColumns>
            <styled.FilterProvided>
              {searchParams.priceSort === 'DescPrice' && (
                <li>maiores preços</li>
              )}
              {searchParams.priceSort === 'AscPrice' && <li>menores preços</li>}
              {searchParams.brandSort === 'adidas' && <li>marca adidas</li>}
              {searchParams.brandSort === 'nike' && <li>marca nike</li>}
              {searchParams.discountSort === 'DescDiscount' && (
                <li>com disconto</li>
              )}
            </styled.FilterProvided>
          </styled.FilterWrapper>
          <styled.FiltersAndSneakers isShown={showOptions.isShown}>
            {showOptions.isShown && (
              <styled.DesktopFilters>
                <styled.ListFilter>
                  <styled.OrderButton
                    onClick={() =>
                      setShowOptions((prevOptions) => ({
                        ...prevOptions,
                        isPriceOrdered: !prevOptions.isPriceOrdered,
                      }))
                    }
                  >
                    <styled.ButtonText>
                      <h2>Preços</h2>
                    </styled.ButtonText>
                    <styled.ArrowIcon orderButton={showOptions.isPriceOrdered}>
                      <Image
                        src="/images/arrow.svg"
                        alt="arrow"
                        width={10}
                        height={10}
                      />
                    </styled.ArrowIcon>
                  </styled.OrderButton>
                  <styled.ListOptions orderButton={showOptions.isPriceOrdered}>
                    <styled.ClearSelection>
                      <styled.ClearText
                        onClick={() => {
                          setSearchParams((prevSearchParams) => ({
                            ...prevSearchParams,
                            priceSort: '',
                          }))
                        }}
                      >
                        Limpar
                      </styled.ClearText>
                    </styled.ClearSelection>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={searchParams.priceSort === 'DescPrice'}
                        onClick={() => {
                          setSearchParams((prevSearchParams) => ({
                            ...prevSearchParams,
                            priceSort: 'DescPrice',
                          }))
                        }}
                      >
                        <styled.Square>
                          {searchParams.priceSort === 'DescPrice' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Maior preço</styled.TextLi>
                      </li>
                      <li
                        role="checkbox"
                        aria-checked={searchParams.priceSort === 'AscPrice'}
                        onClick={() => {
                          setSearchParams((prevSearchParams) => ({
                            ...prevSearchParams,
                            priceSort: 'AscPrice',
                          }))
                        }}
                      >
                        <styled.Square>
                          {searchParams.priceSort === 'AscPrice' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Menor preço</styled.TextLi>
                      </li>
                    </styled.UlList>
                  </styled.ListOptions>
                </styled.ListFilter>
                <styled.ListFilter>
                  <styled.OrderButton
                    onClick={() =>
                      setShowOptions((prevOptions) => ({
                        ...prevOptions,
                        isBrandOrdered: !prevOptions.isBrandOrdered,
                      }))
                    }
                  >
                    <styled.ButtonText>
                      <h2>Marca</h2>
                    </styled.ButtonText>
                    <styled.ArrowIcon orderButton={showOptions.isBrandOrdered}>
                      <Image
                        src="/images/arrow.svg"
                        alt="arrow"
                        width={10}
                        height={10}
                      />
                    </styled.ArrowIcon>
                  </styled.OrderButton>
                  <styled.ListOptions orderButton={showOptions.isBrandOrdered}>
                    <styled.ClearSelection>
                      <styled.ClearText
                        onClick={() => {
                          setSearchParams((prevSearchParams) => ({
                            ...prevSearchParams,
                            brandSort: '',
                          }))
                        }}
                      >
                        Limpar
                      </styled.ClearText>
                    </styled.ClearSelection>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={searchParams.brandSort === 'adidas'}
                        onClick={() => {
                          setSearchParams((prevSearchParams) => ({
                            ...prevSearchParams,
                            brandSort: 'adidas',
                          }))
                        }}
                      >
                        <styled.Square>
                          {searchParams.brandSort === 'adidas' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Adidas</styled.TextLi>
                      </li>
                      <li
                        role="checkbox"
                        aria-checked={searchParams.brandSort === 'nike'}
                        onClick={() => {
                          setSearchParams((prevSearchParams) => ({
                            ...prevSearchParams,
                            brandSort: 'nike',
                          }))
                        }}
                      >
                        <styled.Square>
                          {searchParams.brandSort === 'nike' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Nike</styled.TextLi>
                      </li>
                    </styled.UlList>
                  </styled.ListOptions>
                </styled.ListFilter>
                <styled.ListFilter>
                  <styled.OrderButton
                    onClick={() =>
                      setShowOptions((prevOptions) => ({
                        ...prevOptions,
                        isDiscountOrdered: !prevOptions.isDiscountOrdered,
                      }))
                    }
                  >
                    <styled.ButtonText>
                      <h2>Descontos</h2>
                    </styled.ButtonText>
                    <styled.ArrowIcon
                      orderButton={showOptions.isDiscountOrdered}
                    >
                      <Image
                        src="/images/arrow.svg"
                        alt="arrow"
                        width={10}
                        height={10}
                      />
                    </styled.ArrowIcon>
                  </styled.OrderButton>
                  <styled.ListOptions
                    orderButton={showOptions.isDiscountOrdered}
                  >
                    <styled.ClearSelection>
                      <styled.ClearText
                        onClick={() => {
                          setSearchParams((prevSearchParams) => ({
                            ...prevSearchParams,
                            discountSort: '',
                          }))
                        }}
                      >
                        Limpar
                      </styled.ClearText>
                    </styled.ClearSelection>
                    <styled.UlList>
                      <li
                        role="checkbox"
                        aria-checked={
                          searchParams.discountSort === 'DescDiscount'
                        }
                        onClick={() => {
                          setSearchParams((prevSearchParams) => ({
                            ...prevSearchParams,
                            discountSort: 'DescDiscount',
                          }))
                        }}
                      >
                        <styled.Square>
                          {searchParams.discountSort === 'DescDiscount' && '✔️'}
                        </styled.Square>
                        <styled.TextLi>Com desconto</styled.TextLi>
                      </li>
                    </styled.UlList>
                  </styled.ListOptions>
                </styled.ListFilter>
              </styled.DesktopFilters>
            )}
            <styled.SneakersContainer gridColumns={gridColumns}>
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
                          setShowOptions((prevOption) => ({
                            ...prevOption,
                            isModalOpen: !prevOption.isModalOpen,
                          }))
                          setSelectedSneakerId(id)
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
              {showOptions.isModalOpen && (
                <styled.Modal onClick={handleClickOutside} ref={modalRef}>
                  <styled.ModalContent>
                    {selectedSneakerInfo.map(
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
                                    <Line options={options} data={data} />
                                  </styled.DivHistory>
                                </styled.HistoryPrice>
                              </styled.InfoSneaker>
                            </styled.ModalInfo>
                          </styled.ModalDetails>
                        )
                      }
                    )}
                    <styled.ModalPreviws displayScroll={carouselScrollState}>
                      <div onClick={handleCarouselLeftArrowClick}>
                        <Image
                          src="/images/arrow.svg"
                          alt="arrow"
                          width={10}
                          height={10}
                          style={{ transform: 'rotate(90deg)' }}
                        />
                      </div>
                      <styled.ModalCarrossel ref={carouselContainerRef}>
                        {equalSneakers.map((sneakers) => {
                          return (
                            <styled.ContainerImage
                              key={sneakers.id}
                              onClick={() => setSelectedSneakerId(sneakers.id)}
                            >
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
                      <div onClick={handleCarouselRightArrowClick}>
                        <Image
                          src="/images/arrow.svg"
                          alt="arrow"
                          width={10}
                          height={10}
                          style={{ transform: 'rotate(270deg)' }}
                        />
                      </div>
                    </styled.ModalPreviws>
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
