import styled from 'styled-components'

export const ContainerFeed = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

export const MainFeed = styled.main`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5%;
  grid-row-gap: 3%;
`

export const CardDiv = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.12);
`

export const Discount = styled.div`
  width: 20%;
  height: 20%;
  position: absolute;
  top: 5%;
  right: 0%;
  font-family: 'Roboto', sans-serif;
  font-size: 1.3rem;
`

export const ImgCard = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ContainerInfo = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
`

export const DivInfo = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const ContainerName = styled.div`
  width: 100%;
  height: auto;

  & p {
    padding-left: 1vw;
  }
`

export const ContainerPrice = styled.div`
  width: 100%;
  height: 30%;

  & p {
    padding-left: 1vw;
  }

  & p:nth-child(2) {
    padding-left: 1vw;
    color: rgba(0, 0, 0, 0.7);
    text-decoration: line-through;
  }
`
