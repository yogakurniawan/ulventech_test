import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { getFields, postFields } from 'apiCall/fields'
import FieldElement from 'components/FieldElement'
import { Field } from 'types/form'

export default function Form() {
  const [fields, setFields] = useState([])
  const [initialValues, setInitialValues] = useState<any | undefined>({})
  const requestFields = async () => {
    const data = await getFields()
    const values = data.reduce((prevValue: any, currentValue: Field): any => {
      prevValue[currentValue.fieldName] = currentValue.value
      return prevValue
    }, {})
    setInitialValues(values)
    setFields(data)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    postFields(initialValues)
  }

  const handleChangeField = (fieldName: string) => {
    return (value: any) => {
      setInitialValues({
        ...initialValues,
        [fieldName]: value,
      })
    }
  }

  useEffect(() => {
    requestFields()
  }, [])

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      noValidate
      autoComplete="off">
      {
        fields.map((field: Field, idx) =>
          <div key={idx}>
            <FieldElement
              field={{
                ...field,
                value: initialValues[field.fieldName]
              }}
              onChange={handleChangeField(field.fieldName)} 
            />
          </div>
        )
      }
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem'
      }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  )
}
