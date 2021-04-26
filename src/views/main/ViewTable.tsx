import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { IMoney, list as serviceList } from '../../services/money'
import { useHistory } from 'react-router'

function ViewTable () : JSX.Element {
  const history = useHistory()
  const [dataSource, setDataSource] = useState<IMoney[]>([])
  useEffect(() => {
    serviceList().then(res => {
      if (res.code === '0x101') {
        history.push('/login')
      }
      res.data && setDataSource(res.data.sort((i, j) => j.time - i.time))
    })
  }, [])

  return (<>
    <TableContainer className="h-full" component={ Paper }>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: '50px' }}>类型</TableCell>
            <TableCell style={{ minWidth: '75px' }}>收支</TableCell>
            <TableCell style={{ minWidth: '50px' }}>时间</TableCell>
            <TableCell style={{ minWidth: '50px' }}>坐标</TableCell>
            <TableCell style={{ minWidth: '50px' }}>备注</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { dataSource.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                {row.type}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
              <TableCell align="left">{row.timeFormat}</TableCell>
              <TableCell align="left">{row.lonlat ? row.lonlat.split(',').map(item => Number(item).toFixed(3)).join(',') : '无'}</TableCell>
              <TableCell align="left">{row.comment}</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  </>)
}

export default ViewTable
