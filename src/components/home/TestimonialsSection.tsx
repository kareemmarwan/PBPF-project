import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTestimonials } from "@/lib/content";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t, isRTL, language } = useLanguage();
  const testimonials = useTestimonials();
  const asCarousel = testimonials.length > 3;

  const renderCard = (testimonial: (typeof testimonials)[number], index: number) => (
    <Card
      variant="heritage"
      className={`p-6 h-full cursor-pointer transition-all duration-300 ${
        activeIndex === index
          ? "ring-2 ring-heritage-gold shadow-heritage-elevated"
          : ""
      }`}
      onClick={() => setActiveIndex(index)}
    >
      <Quote className="w-10 h-10 text-heritage-gold/30 mb-4" />
      <p className="text-foreground leading-relaxed mb-6">
        "{language === "ar" ? testimonial.contentAr : testimonial.contentEn}"
      </p>
      <div className="border-t border-border pt-4 mt-auto">
        <p className="font-bold text-foreground">
          {language === "ar" ? testimonial.nameAr : testimonial.nameEn}
        </p>
        <p className="text-sm text-muted-foreground">
          {language === "ar" ? testimonial.roleAr : testimonial.roleEn}
        </p>
        <p className="text-xs text-heritage-gold mt-1">
          {language === "ar" ? testimonial.locationAr : testimonial.locationEn}
        </p>
      </div>
    </Card>
  );

  return (
    <section className="py-24 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-heritage-gold/10 text-heritage-gold text-sm font-semibold rounded-full">
            {t("قصص نجاح", "Success Stories")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t("أصوات", "Voices of")}{" "}
            <span className="text-heritage-gold">{t("المستفيدين", "Beneficiaries")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t(
              "شهادات حقيقية من أشخاص استفادوا من مشاريعنا",
              "Real testimonials from people who benefited from our projects"
            )}
          </p>
        </div>

        {/* Testimonials */}
        {asCarousel ? (
          <div className="max-w-5xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
            <Carousel
              opts={{
                align: "start",
                direction: isRTL ? "rtl" : "ltr",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4 py-1">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={testimonial.id}
                    dir={isRTL ? "rtl" : "ltr"}
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    {renderCard(testimonial, index)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-3 mt-8">
                <CarouselPrevious
                  className={`static translate-y-0 ${isRTL ? "[&>svg]:rotate-180" : ""}`}
                />
                <CarouselNext
                  className={`static translate-y-0 ${isRTL ? "[&>svg]:rotate-180" : ""}`}
                />
                <span className="text-sm text-muted-foreground">
                  {t(
                    `${testimonials.length} قصص — اسحب أو استخدم الأسهم`,
                    `${testimonials.length} stories — swipe or use the arrows`
                  )}
                </span>
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="flex">
                {renderCard(testimonial, index)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
