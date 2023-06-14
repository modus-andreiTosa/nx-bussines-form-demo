/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';

interface IBussinesObjectFields {
  id: string;
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
`;

const StyledBox = styled(Box)`
  margin: 0.5rem;
  width: 200px;
`;

const StyledContainer = styled(Container)`
  &.root {
    display: flex;
    margin-bottom: 1rem;
  }
`;

function DisplayData({
  data,
  loading,
}: {
  data: Array<IBussinesObjectFields> | undefined;
  loading: boolean;
}) {
  console.log({ loading });
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {data?.map((bussinesObject) => {
        const {
          id,
          locationCode,
          locationName,
          locationCity,
          locationZip,
          locationAddress1,
          locationAddress2,
        } = bussinesObject;
        return (
          <div key={id} style={{ flexGrow: 1, minHeight: 393 }}>
            <StyledBox>
              {loading ? (
                <Skeleton variant="rounded" width={200} height={56} />
              ) : (
                <Typography variant="h5" component="h5">
                  Location Code:{' '}
                  <Typography variant="body1" component="p">
                    {locationCode}
                  </Typography>
                </Typography>
              )}
            </StyledBox>
            <StyledBox>
              {loading ? (
                <Skeleton variant="rounded" width={200} height={56} />
              ) : (
                <Typography variant="h5" component="h5">
                  Location Name:{' '}
                  <Typography variant="body1" component="p">
                    {locationName}
                  </Typography>
                </Typography>
              )}
            </StyledBox>
            <StyledBox>
              {loading ? (
                <Skeleton variant="rounded" width={200} height={56} />
              ) : (
                <Typography variant="h5" component="h5">
                  City:{' '}
                  <Typography variant="body1" component="p">
                    {locationCity}
                  </Typography>
                </Typography>
              )}
            </StyledBox>
            <StyledBox>
              {loading ? (
                <Skeleton variant="rounded" width={200} height={56} />
              ) : (
                <Typography variant="h5" component="h5">
                  Zip Code:{' '}
                  <Typography variant="body1" component="p">
                    {locationZip}
                  </Typography>
                </Typography>
              )}
            </StyledBox>
            <StyledBox>
              {loading ? (
                <Skeleton variant="rounded" width={200} height={56} />
              ) : (
                <Typography variant="h5" component="h5">
                  Address Line1:{' '}
                  <Typography variant="body1" component="p">
                    {locationAddress1}
                  </Typography>
                </Typography>
              )}
            </StyledBox>
            <StyledBox>
              {loading ? (
                <Skeleton variant="rounded" width={200} height={56} />
              ) : (
                <Typography variant="h5" component="h5">
                  Address Line2:{' '}
                  <Typography variant="body1" component="p">
                    {locationAddress2}
                  </Typography>
                </Typography>
              )}
            </StyledBox>
          </div>
        );
      })}
    </>
  );
}

function BusinessObjectEditPage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newOrg: IBussinesObjectFields) => {
      return axios.post(
        'https://64870948beba6297278fbb2f.mockapi.io/demoapp/bussinesObject',
        newOrg,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries('bussinesObjects');
    },
    retry: 3,
  });

  const bussinesObjects = useQuery<
    unknown,
    unknown,
    { data: Array<IBussinesObjectFields> }
  >({
    queryKey: 'bussinesObjects',
    queryFn: () => {
      return axios.get(
        'https://64870948beba6297278fbb2f.mockapi.io/demoapp/bussinesObject'
      );
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBussinesObjectFields>();
  const onSubmit: SubmitHandler<IBussinesObjectFields> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <StyledContainer
        classes={{
          root: 'root',
        }}
      >
        <DisplayData
          data={bussinesObjects.data?.data}
          loading={bussinesObjects.isLoading}
        />
      </StyledContainer>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2}>
            <FormLabel htmlFor="locationCode">Location Code*</FormLabel>
            <Controller
              name="locationCode"
              defaultValue=""
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                  message: 'Invalid location code',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  css={intputStyle}
                  error={!!errors.locationCode}
                  helperText={
                    errors.locationCode?.type === 'required'
                      ? 'Location code is required'
                      : 'Invalid location code'
                  }
                />
              )}
            />
            <FormLabel htmlFor="locationName">Location Name*</FormLabel>
            <Controller
              name="locationName"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  css={intputStyle}
                  error={!!errors.locationName}
                  helperText="Location code is required"
                />
              )}
            />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              css={gridContainer}
            >
              <Grid item xs={6} css={gridItem}>
                <FormLabel htmlFor="locationCity">City:</FormLabel>
                <Controller
                  name="locationCity"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} css={intputStyle} />
                  )}
                />
              </Grid>
              <Grid item xs={6} css={gridItem}>
                <FormLabel htmlFor="locationZip">Zip Code:</FormLabel>
                <Controller
                  name="locationZip"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} css={intputStyle} />
                  )}
                />
              </Grid>
              <Grid item xs={6} css={gridItem}>
                <FormLabel htmlFor="locationAddress1">Adress Line 1:</FormLabel>

                <Controller
                  name="locationAddress1"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} css={intputStyle} />
                  )}
                />
              </Grid>
              <Grid item xs={6} css={gridItem}>
                <FormLabel htmlFor="locationAddress2">Adress Line 2:</FormLabel>
                <Controller
                  name="locationAddress2"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} css={intputStyle} />
                  )}
                />
              </Grid>
            </Grid>
          </Stack>
          <Button type="submit" css={submitButton}>
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}

export function RootApp() {
  return <BusinessObjectEditPage />;
}
