/** Transition entre pages : un voile vert nuit qui se dissipe. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="page-veil" />
      {children}
    </>
  );
}
