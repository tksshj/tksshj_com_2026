'use client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

const rowSx = {
  padding: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '24px',
  boxSizing: 'border-box',
}

const textSx = {
  flex: '0 0 20%',
  textAlign: 'right',
}

export default function PageContent() {
  const [sliderPos, setSliderPos] = useState(50)
  const [switchValue, setSwitchValue] = useState(false)
  const [radioValue, setRadioValue] = useState('A')
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [selectValue, setSelectValue] = useState('A')
  const [textValue, setTextValue] = useState('abc')

  return (
    <Box>
      <Box sx={{ ...rowSx }}>
        <Slider value={sliderPos} onChange={(_, newValue) => setSliderPos(newValue)} sx={{ flex: '0 0 70%' }} />
        <Typography component='p' variant='h1' sx={{ ...textSx }}>
          {sliderPos}
        </Typography>
      </Box>
      <Box sx={{ ...rowSx }}>
        <Switch value={switchValue} onChange={(e) => setSwitchValue(e.target.checked)} />
        <Typography component='p' variant='h1' sx={{ ...textSx }}>
          {switchValue ? 'true' : 'false'}
        </Typography>
      </Box>
      <Box sx={{ ...rowSx }}>
        <Button onClick={(e) => console.log('clicked')}>text</Button>
        <Button variant='contained' onClick={(e) => console.log('clicked')}>
          contained
        </Button>
        <Button variant='outlined' onClick={(e) => console.log('clicked')}>
          outlined
        </Button>
      </Box>
      <Box sx={{ ...rowSx }}>
        <RadioGroup row defaultValue='A' sx={{ gap: '16px' }} onChange={(e) => setRadioValue(e.target.value)}>
          <FormControlLabel value='A' control={<Radio />} label='A' />
          <FormControlLabel value='B' control={<Radio />} label='B' />
          <FormControlLabel value='C' control={<Radio />} label='C' />
        </RadioGroup>
        <Typography component='p' variant='h1' sx={{ ...textSx }}>
          {radioValue}
        </Typography>
      </Box>
      <Box sx={{ ...rowSx }}>
        <FormControlLabel
          control={<Checkbox value={checkboxValue} onChange={(e) => setCheckboxValue(e.target.checked)} />}
          label='Checkbox'
        />
        <Typography component='p' variant='h1' sx={{ ...textSx }}>
          {checkboxValue ? 'true' : 'false'}
        </Typography>
      </Box>
      <Box sx={{ ...rowSx }}>
        <FormControl fullWidth>
          <InputLabel>Select</InputLabel>
          <Select value={selectValue} label='Select' onChange={(e) => setSelectValue(e.target.value)}>
            <MenuItem value={'A'}>A</MenuItem>
            <MenuItem value={'B'}>B</MenuItem>
            <MenuItem value={'C'}>C</MenuItem>
          </Select>
        </FormControl>
        <Typography component='p' variant='h1' sx={{ ...textSx }}>
          {selectValue}
        </Typography>
      </Box>
      <Box sx={{ ...rowSx }}>
        <TextField label='TextField' value={textValue} onChange={(e) => setTextValue(e.target.value)} />
        <Typography component='p' variant='h1' sx={{ ...textSx }}>
          {textValue}
        </Typography>
      </Box>
    </Box>
  )
}
