import type { Metadata } from 'next';
import ConnectorsDirectory from '@/components/connectors/ConnectorsDirectory';

export const metadata: Metadata = {
  title: '38 Connectors & Integrations | Company Brain',
  description:
    'Explore all 38 connectors across team communication, engineering, HR, productivity, customer support, and analytics. 100% local, idempotent, and offline-first.',
};

export default function ConnectorsPage() {
  return <ConnectorsDirectory />;
}
