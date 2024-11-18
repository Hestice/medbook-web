import Navigation from "@/components/navigation";

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Navigation/>
      {children}
    </div>
  );
}
