import React, { useCallback, useState } from 'react'
import {
  Card,
  Tabs,
  Tab,
  AppBar,
  Box,
} from '@material-ui/core'
import {
  SignIn,
} from '../components'

type TabType = 'signin' | 'signup'

function ViewLogin () : JSX.Element {
  const [selectedTab, setSelectedTab] = useState<TabType>('signin')
  const handleChange = useCallback((e, newVal) => {
    setSelectedTab(newVal)
  }, [selectedTab])
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="">
        <AppBar position="static">
          <Tabs value={ selectedTab } onChange={ handleChange }>
            <Tab label="登录" value="signin" />
            <Tab label="注册" value="signup" />
          </Tabs>
        </AppBar>
        <TabPanel selectedValue={ selectedTab } value="signin">
          <SignIn />
        </TabPanel>
        <TabPanel selectedValue={ selectedTab } value="signup">
          Item Two
        </TabPanel>
      </Card>
    </div>
  )
}

export default ViewLogin

function TabPanel (props: {
  children?: React.ReactNode
  value: TabType
  selectedValue: TabType
}) : JSX.Element {
  const { children, value, selectedValue } = props

  return (
    <div>
      {value === selectedValue && (
        <Box p={ 2 }>
          <div>{ children }</div>
        </Box>
      )}
    </div>
  )
}
