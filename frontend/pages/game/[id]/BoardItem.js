'use client'

import styled from 'styled-components';

export default function BoardItem() {

  let TableTop = styled.div`
    position: absolute;
    width: 1359px;
    height: 39.38px;
    left: 40px;
    top: 942.62px;
    background: #624B26;
    `

  let TableBtm = styled.div`
    position: absolute;
    width: 1359px;
    height: 107.62px;
    left: 40px;
    top: 835px;
    background: #A1824F;
    `
  return (
    <div>
      <TableTop />
      <TableBtm />
    </div>
  )
}
