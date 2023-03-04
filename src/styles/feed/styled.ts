import styled, { keyframes } from 'styled-components'

export const ContainerFeed = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

export const ContainerItem = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const ContainerFilter = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

export const Result = styled.div`
  width: 15%;
  display: flex;
  justify-content: baseline;
  align-items: center;

  & p {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
  }

  & span {
    color: rgba(0, 0, 0, 0.5);
  }
`

export const Filter = styled.button`
  background-color: rgb(133, 133, 255);
  color: white;
  padding: 5px 20px;
  text-align: center;
  display: inline-block;
  margin: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(112, 112, 255);
  }
`

export const ShowOptions = styled.div`
  width: 13%;
  height: 150px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* border: solid 1px black; */
  position: absolute;
  top: 100%;
  right: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 10;

  ::-webkit-scrollbar {
    display: none;
  }

  & p {
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    text-align: center;
    cursor: pointer;
  }

  & p:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export const Main = styled.main`
  width: 90%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* grid-template-columns: repeat(3, 1fr); */
  gap: 30px;
  /* margin-top: 3%; */
`

export const SneakerItem = styled.div`
  width: 100%;
  height: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  /* &:hover a::before {
    content: 'Visitar';
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-60%, -50%);
    font-weight: bold;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    z-index: 1;
  } */
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
  height: 70%;
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
    font-weight: bold;
  }

  & p:nth-child(2) {
    padding-left: 1vw;
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
