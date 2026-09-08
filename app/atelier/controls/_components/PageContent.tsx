'use client'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

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
        <Button onClick={() => console.log('clicked')}>text</Button>
        <Button variant='contained' onClick={() => console.log('clicked')}>
          contained
        </Button>
        <Button variant='outlined' onClick={() => console.log('clicked')}>
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
        <TextField
          select
          label='Select'
          sx={{ width: '200px' }}
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <MenuItem value={'A'}>A</MenuItem>
          <MenuItem value={'B'}>B</MenuItem>
          <MenuItem value={'C'}>C</MenuItem>
        </TextField>
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
