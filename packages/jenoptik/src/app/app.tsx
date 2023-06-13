import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { RootApp } from './RootApp';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScopedCssBaseline>
        <RootApp />
      </ScopedCssBaseline>
    </QueryClientProvider>
  );
}
