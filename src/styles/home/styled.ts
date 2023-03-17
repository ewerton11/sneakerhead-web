import styled, { keyframes } from 'styled-components'

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: 5vh 1fr auto;
  min-height: 100vh;
`

export const ContainerStyled = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`

export const ContainerWrapper = styled.div`
  width: 100%;
  padding: 0px 2.5%;
  display: grid;
`

export const FilterWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
`

export const ResultsCounterWrapper = styled.div`
  position: absolute;
  left: 0px;
  display: flex;
  justify-content: baseline;
  align-items: center;
`

export const ResultsCounter = styled.div`
  display: flex;
  align-items: center;

  & p {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.9rem;
  }

  & span {
    color: rgba(0, 0, 0, 0.5);
  }
`

export const SearchBarContainer = styled.div`
  width: 10%;
  height: 100%;
`

export const SearchBarForm = styled.form`
  width: 100%;
  height: 100%;
  padding: 5px;
  background: rgb(247, 247, 247);
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border-radius: 24px;
`

export const InputSearch = styled.input`
  width: 80%;
  font-weight: 400;
  font-size: 1rem;
`

export const ButtonIcon = styled.button`
  padding: 5px;
  cursor: pointer;

  & img {
    width: 50%;
    height: 50%;
  }
`

export const FilterButton = styled.button`
  margin-right: 15px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const FilterButtonText = styled.div`
  width: 60%;
  font-size: 1.2em;
`

export const FilterButtonIcon = styled.div`
  width: 40%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 70%;
    height: 70%;
  }
`

export const ContainerSneakersColumns = styled.div<{ columns: string }>`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;

  > div:first-child {
    & div {
      border: solid 1px
        ${({ columns }) =>
          columns === 'two' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'};
    }

    &:hover {
      position: relative;
      cursor: pointer;
    }

    &:hover::after {
      content: 'Duas colunas';
      position: absolute;
      top: -15px;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      padding: 2px;
      // border-radius: 5px;
      font-size: 12px;
      font-weight: 400;
      white-space: nowrap;
    }
  }

  > div:nth-child(2) {
    & div {
      border: solid 1px
        ${({ columns }) =>
          columns === 'three' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'};
    }

    &:hover {
      position: relative;
      cursor: pointer;
    }

    &:hover::after {
      content: 'Três colunas';
      position: absolute;
      top: -15px;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      padding: 2px;
      // border-radius: 5px;
      font-size: 12px;
      font-weight: 400;
      white-space: nowrap;
    }
  }

  > div:nth-child(3) {
    & div {
      border: solid 1px
        ${({ columns }) =>
          columns === 'four' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'};
    }

    &:hover {
      position: relative;
      cursor: pointer;
    }

    &:hover::after {
      content: 'Quatro colunas';
      position: absolute;
      top: -15px;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      padding: 2px;
      // border-radius: 5px;
      font-size: 12px;
      font-weight: 400;
      white-space: nowrap;
    }
  }
`

export const SneakersColumns = styled.div`
  margin-right: 15px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  & div {
    width: 20px;
    height: 20px;
    margin-right: 1px;
    border-radius: 3px;
    cursor: pointer;
  }
`

export const FilterProvided = styled.ul`
  display: flex;
  align-items: center;

  & li {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    margin-right: 5px;
    padding: 7px 2px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
  }
`

export const FiltersAndSneakers = styled.div<{ showOptions: boolean }>`
  display: grid;
  grid-template-columns: ${({ showOptions }) =>
    showOptions ? '20vw 1fr' : '1fr'};
  grid-template-rows: 1fr;
  gap: 10px;
`

export const DesktopFilters = styled.div`
  width: 20vw;
  height: fit-content;
  max-height: 100%;
  background-color: white;
  margin-top: 15px;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;

  & p {
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 1em;
    text-align: center;
    cursor: pointer;
  }

  & p:hover {
    background-color: rgb(238, 241, 243);
  }
`

export const ListFilter = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 100%;
`

export const OrderButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  font-size: 1rem;
  cursor: pointer;
`

export const ButtonText = styled.div`
  width: 80%;
  display: flex;
  align-items: center;

  & h2 {
    font-size: 1rem;
    font-weight: 400;
  }
`

export const ArrowIcon = styled.div<{ orderButton: boolean }>`
  width: 20%;

  & img {
    width: 30%;
    height: 30%;
    transform: ${({ orderButton }) =>
      orderButton ? 'rotate(180deg)' : 'none'};
    transition: transform 0.2s ease-in-out;
  }
`

export const ClearSelection = styled.div`
  padding: 5% 0px;
`

export const ClearText = styled.div`
  margin-left: 1rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
  cursor: pointer;
`

export const ListOptions = styled.div<{ orderButton: boolean }>`
  display: ${({ orderButton }) => (orderButton ? 'block' : 'none')};
`

export const UlList = styled.ul`
  height: fit-content;

  & li {
    padding: 0px 0px 1rem 1rem;
    display: flex;
    cursor: pointer;
  }
`

export const Square = styled.div`
  width: 17px;
  height: 17px;
  border: solid 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7em;
  cursor: pointer;
`

export const TextLi = styled.div`
  width: 85%;
  margin-left: 5%;
  letter-spacing: 1px;
`

export const SneakersContainer = styled.main<{ columns: string }>`
  width: 100%;
  height: auto;
  min-height: 100vh;
  margin-top: 15px;
  display: grid;
  grid-template-columns: ${({ columns }) =>
    columns === 'two'
      ? 'repeat(2, 1fr)'
      : columns === 'three'
      ? 'repeat(3, 1fr)'
      : columns === 'four'
      ? 'repeat(4, 1fr)'
      : 'repeat(auto-fill, minmax(300px, 1fr))'};
  gap: 30px;
`

export const SneakersWrapper = styled.div`
  height: fit-content;
`

export const Details = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`

export const ImageCard = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Discount = styled.div`
  width: 20%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 5;

  & p {
    font-family: 'Roboto', sans-serif;
    font-size: 1.3rem;
  }
`

export const ContainerInfo = styled.div`
  width: 100%;
  height: 15%;
  margin-top: 10px;
`

export const DivInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ContainerName = styled.div`
  width: 100%;
  height: 50%;
  padding: 10px 0px 10px 0px;
  display: flex;
  align-items: center;
`

export const ContainerPrice = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;

  & p {
    font-weight: bold;
  }

  & p:nth-child(2) {
    color: rgba(0, 0, 0, 0.7);
    text-decoration: line-through;
    padding-left: 10px;
  }
`

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

export const ModalContent = styled.div`
  background-color: white;
  width: 80%;
  max-width: 60vw;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
`

export const ModalDetails = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

export const ModalInfo = styled.div`
  width: 100%;
  max-height: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const ModelImage = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const InfoSneaker = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContainerModalName = styled.div`
  height: 25%;
  padding-top: 20px;
  display: flex;
  align-items: flex-end;
`

export const ModalName = styled.h1`
  font-size: 1.5em;
  letter-spacing: 1px;
`

export const ModalPrice = styled.div`
  height: 10%;
  display: flex;
  align-items: center;

  > p {
    font-weight: bold;
    color: red;
  }

  > p:nth-child(2) {
    margin-left: 10px;
    color: rgba(0, 0, 0, 0.7);
    text-decoration: line-through;
  }
`

export const ModalDiscount = styled.div`
  & p {
    color: red;
  }
`

export const HistoryPrice = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  align-items: center;
`

export const DivHistory = styled.div`
  width: 100%;
  height: 70%;
`

export const ModalPreviws = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
`

export const ModalCarrossel = styled.div`
  width: 80%;
  height: 100%;
  max-width: 800px;
  display: flex;
  overflow-x: scroll;
  gap: 10px;
  /* overflow-x: auto; */
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ContainerImage = styled.div`
  min-width: 200px;
  height: auto;
  margin-right: 10px;

  & img {
    width: 100%;
    height: 100%;
  }
`

export const ContainerLoad = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const moveArrow = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`

export const Load = styled.div`
  position: relative;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #000;
  animation: ${moveArrow} 2s ease-in-out infinite;
  cursor: pointer;
`
