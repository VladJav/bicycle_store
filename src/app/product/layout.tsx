import Header from '@src/components/layout/Header';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <Header />
      {children}
    </div>
  );
}
