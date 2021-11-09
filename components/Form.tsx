import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import { getFields, postFields } from 'apiCall/fields'
import FieldElement from 'components/FieldElement'
import { Field } from 'types/form'

export default function Form() {
  const [fields, setFields] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResponse, setSubmitResponse] = useState<any | undefined>({})
  const [formValues, setFormValues] = useState<any | undefined>({})

  const requestFields = async () => {
    setIsLoading(true)
    const data = await getFields()
    setIsLoading(false)
    const values = data.reduce((prevValue: any, currentValue: Field): any => {
      prevValue[currentValue.fieldName] = currentValue.value
      return prevValue
    }, {})
    setFormValues(values)
    setFields(data)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    const response = await postFields(formValues)
    setSubmitResponse(response)
    setIsSubmitting(false)
    setTimeout(() => {
      setSubmitResponse({})
    }, 2000)
  }

  const handleChangeField = (fieldName: string) => {
    return (value: any) => {
      setFormValues({
        ...formValues,
        [fieldName]: value,
      })
    }
  }

  useEffect(() => {
    requestFields()
  }, [])

  return (
    <>
      {
        submitResponse && submitResponse.success && <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <Alert onClose={() => {
            setSubmitResponse({})
          }} severity="success">
            <AlertTitle>{submitResponse.message}</AlertTitle>
            {
              JSON.stringify(submitResponse.data)
            }
          </Alert>
        </Box>
      }
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
                  value: formValues[field.fieldName]
                }}
                onChange={handleChangeField(field.fieldName)}
              />
            </div>
          )
        }
        {
          !isLoading && <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <Button disabled={isSubmitting} type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        }
      </Box>
    </>
  )
}
