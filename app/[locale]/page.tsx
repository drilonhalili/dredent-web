import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { SmileGallery } from "@/components/smile-gallery";
import { InstagramMosaic } from "@/components/instagram-mosaic";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getDictionary } from "@/data/locales";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const t = getDictionary(isLocale(raw) ? raw : defaultLocale);

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <SmileGallery />
        <InstagramMosaic />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer t={t} />
    </>
  );
}
