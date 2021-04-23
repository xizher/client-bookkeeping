import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import {
  TextInput,
} from '../../components/base.components'
import {
  WebMap,
  Basemap,
} from '@xizher/leaflet'
import ToolLocate from '@xizher/leaflet/dist/toolbox/tools/tool.locate'
import { Button, Checkbox } from '@material-ui/core'
import { add as serviceAdd } from '../../services/money'

function ViewAdd () : JSX.Element {
  const [state, setState] = useState({
    type: '',
    value: 0,
    comment: '',
  })
  const [lonlat, setLonlat] = useState('')
  const [withLocation, setWithLocation] = useState(false)
  const webMap = new WebMap('leaflet-container')
    .use(new Basemap({ key: '天地图矢量含注记3857' }))
  const toolLocate = new ToolLocate(webMap)
  toolLocate.zoomToLocationWhenDone = true

  const locate = useCallback(() => {
    toolLocate.execute()
  }, [])

  const submit = useCallback(() => {
    const { type, value, comment } = state
    serviceAdd({
      type, value, comment,
      lonlat: withLocation ? lonlat : ''
    }).then(res => {
      console.log(res)
    })
  }, [state, lonlat, withLocation])


  useLayoutEffect(() => {
    webMap.mount()
    webMap.map.on('move', () => {
      const center = webMap.map.getCenter()
      const { lat, lng } = center
      toolLocate.locationPoint.setLatLng(center)
      setLonlat(`${lat},${lng}`)
    })
    const remove = () => {
      webMap.map.off('move')
    }
    return remove
  }, [])

  useEffect(() => {
    if (withLocation) {
      locate()
    }
  }, [withLocation])

  return (<>
    <TextInput
      label="收支类型"
      value={ state.type }
      onChange={ (type: any) => setState({ ...state, type }) }
    />
    <TextInput
      label="收支金额"
      type="number"
      value={ state.value }
      onChange={ (value: any) => setState({ ...state, value }) }
    />
    <TextInput
      label="备注"
      value={ state.comment }
      onChange={ (comment: any) => setState({ ...state, comment }) }
    />
    <div className="flex items-center">
      <span>是否记录坐标：</span>
      <Checkbox
        color="primary"
        checked={ withLocation }
        onChange={ (_, v) => setWithLocation(v) }
      />
      <Button style={{ marginLeft: 'auto' }} variant="contained" onClick={ submit }>提交</Button>
    </div>
    <div style={{ visibility: withLocation ? 'visible' : 'hidden' }}>
      <div className="flex items-center">
        <TextInput
          label="坐标"
          disabled
          fullWidth={ false }
          value={ lonlat }
          onChange={ (lonlat: any) => setLonlat(lonlat) }
        />
        <Button style={{ marginLeft: 'auto' }} variant="contained" onClick={ locate }>定位</Button>
      </div>
      <div id="leaflet-container" className="h-64"></div>
    </div>
  </>)
}

export default ViewAdd
