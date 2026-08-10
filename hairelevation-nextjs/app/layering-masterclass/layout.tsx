import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hair Elevation Layering MasterClass',
  description: 'Master professional hair layering techniques with Hair Elevation Studio. Learn elevation, overdirection, face framing, full head layers, bob layers and curling. GHS 1,500. Virtual masterclass via Telegram.',
};

export default function LayeringMasterclassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}