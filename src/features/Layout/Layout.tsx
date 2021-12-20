import { Header } from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
