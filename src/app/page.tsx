"use client";
import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import Fixture from "@/components/home/Fixture";
import TanstackProvider from "@/Provider/TanstackProvider";

const Page = () => {
  return (
    <div className="bg-background h-screen">
      <header>
        <Header />
      </header>
      <main className="mx-48 my-40">
        <TanstackProvider>
          <Fixture />
        </TanstackProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
