// 맵 구상 테스트용
"use client"
import styled from 'styled-components'
import Table from 'react-bootstrap/Table';

let Board = styled.span`
  background: ${ props => props.bg };
  color: ${ props => props.color };
  padding: 25px;
  `

function MapComponent() {

  return (
    <div>
      <Table striped bordered hover>
        <div>
          <div>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
          </div>
          <div style={{ marginTop : '50px' }}>
            <span><Board bg="red">●</Board></span>
            <span><Board bg="red">●</Board></span>
            <span><Board bg="red">●</Board></span>
            <span><Board bg="red">●</Board></span>
            <span><Board bg="red">●</Board></span>
            <span><Board bg="red">●</Board></span>
            <span><Board bg="red">●</Board></span>
          </div>
          <div style={{ marginTop : '50px' }}>
            <span><Board bg="pink">●</Board></span>
            <span><Board bg="pink">●</Board></span>
            <span><Board bg="pink">●</Board></span>
            <span><Board bg="pink">●</Board></span>
            <span><Board bg="pink">●</Board></span>
            <span><Board bg="pink">●</Board></span>
            <span><Board bg="pink">●</Board></span>
          </div>
          <div style={{ marginTop : '50px' }}>
            <span><Board bg="green">●</Board></span>
            <span><Board bg="green">●</Board></span>
            <span><Board bg="green">●</Board></span>
            <span><Board bg="green">●</Board></span>
            <span><Board bg="green">●</Board></span>
            <span><Board bg="green">●</Board></span>
            <span><Board bg="green">●</Board></span>
          </div>
          <div style={{ marginTop : '50px' }}>
            <span><Board bg="blue">●</Board></span>
            <span><Board bg="blue">●</Board></span>
            <span><Board bg="blue">●</Board></span>
            <span><Board bg="blue">●</Board></span>
            <span><Board bg="blue">●</Board></span>
            <span><Board bg="blue">●</Board></span>
            <span><Board bg="blue">●</Board></span>
          </div>
          <div style={{ marginTop : '50px' }}>
            <span><Board bg="grey">●</Board></span>
            <span><Board bg="grey">●</Board></span>
            <span><Board bg="grey">●</Board></span>
            <span><Board bg="grey">●</Board></span>
            <span><Board bg="grey">●</Board></span>
            <span><Board bg="grey">●</Board></span>
            <span><Board bg="grey">●</Board></span>
          </div>
          <div style={{ marginTop : '50px' }}>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
            <span><Board bg="yellow">●</Board></span>
          </div>
        </div>
      </Table>
    </div>
  )
}

export default MapComponent;
