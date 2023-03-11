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
  justify-content: flex-end;
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

export const FilterButton = styled.button`
  margin-right: 10px;
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

// export const ShowOptions = styled.div`
//   width: 13%;
//   height: 150px;
//   background-color: white;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   top: 100%;
//   right: 0px;
//   overflow-x: hidden;
//   overflow-y: auto;
//   z-index: 10;

//   ::-webkit-scrollbar {
//     display: none;
//   }

//   & p {
//     padding: 10px;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.1);
//     font-family: 'Roboto', sans-serif;
//     font-size: 1em;
//     text-align: center;
//     cursor: pointer;
//   }

//   & p:hover {
//     background-color: rgb(238, 241, 243);
//   }
// `

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

export const FiltersAndSneakers = styled.div`
  display: grid;
  grid-template-columns: 20vw 1fr;
  grid-template-rows: 1fr;
  gap: 10px;
  margin: 0px;
`

export const DesktopFilters = styled.div`
  width: 20vw;
  height: fit-content;
  max-height: 100%;
  background-color: white;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: column;
  border: solid 1px black;

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

export const SneakersContainer = styled.main`
  width: 100%;
  height: auto;
  min-height: 100vh;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`

export const SneakersWrapper = styled.div`
  width: 100%;
  height: 400px;
`

export const Details = styled.a`
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
  height: 14%;
`

export const DivInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
`

export const ContainerName = styled.div`
  width: 100%;
  height: 50%;
`

export const ContainerPrice = styled.div`
  width: 100%;
  height: 50%;

  & p {
    font-weight: bold;
  }

  & p:nth-child(2) {
    color: rgba(0, 0, 0, 0.7);
    text-decoration: line-through;
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
