/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import { useMutation } from 'react-query';
import axios from 'axios';

interface IMandatoryFields {
  locationCode: string;
  locationName: string;
  locationCity: string;
  locationZip: string;
  locationAddress1: string;
  locationAddress2: string;
}

const intputStyle = css`
  width: 300px;
`;

const gridContainer = css`
  max-width: 900px;
`;

const gridItem = css`
  display: flex;
  flex-direction: column;
`;

const submitButton = css`
  margin-top: 0.5rem;
`

function BusinessObjectEditPage() {
  const mutation = useMutation({
    mutationFn: (newOrg: IMandatoryFields) => {
      return axios.post(
        'https://64870948beba6297278fbb2f.mockapi.io/demoapp/bussinesObject',
        newOrg,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IMandatoryFields>();
  console.log(errors);
  const onSubmit: SubmitHandler<IMandatoryFields> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2}>
        <FormLabel htmlFor="locationCode">Location Code</FormLabel>
        <Controller
          name="locationCode"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
              message: 'Invalid location code',
            },
          }}
          render={({ field }) => <Input {...field} css={intputStyle} />}
        />
        <FormLabel htmlFor="locationName">Location Name</FormLabel>
        <Controller
          name="locationName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} css={intputStyle} />}
        />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} css={gridContainer}>
            <Grid item xs={6} css={gridItem}>
              <FormLabel htmlFor="locationCity">City:</FormLabel>
              <Controller
                name="locationCity"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} css={intputStyle} />}
              />
            </Grid>
            <Grid item xs={6} css={gridItem}>
              <FormLabel htmlFor="locationZip">Zip Code:</FormLabel>
              <Controller
                name="locationZip"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} css={intputStyle} />}
              />
            </Grid>
            <Grid item xs={6} css={gridItem}>
              <FormLabel htmlFor="locationAddress1">Adress Line 1:</FormLabel>

              <Controller
                name="locationAddress1"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} css={intputStyle} />}
              />
            </Grid>
            <Grid item xs={6} css={gridItem}>
              <FormLabel htmlFor="locationAddress2">Adress Line 2:</FormLabel>
              <Controller
                name="locationAddress2"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} css={intputStyle} />}
              />
            </Grid>
          </Grid>
      </Stack>
      <Button type="submit" css={submitButton}>Submit</Button>
    </form>
  );
}

export function RootApp() {
  return <BusinessObjectEditPage />;
}
