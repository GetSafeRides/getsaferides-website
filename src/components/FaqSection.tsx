import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: 'Do I need ID?',
    answer: 'Yes for Safe Hire; verified once per 12 months.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'We currently cover just Lagos, we have plans to expand to other cities in the near future.',
  },
  {
    question: 'Do you offer convoys?',
    answer:
      'Yes. Security convoy planning is available for high-profile transfers.',
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="bg-darkSurface py-[120px]">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <div className="mx-auto w-full max-w-[680px] border border-dashed border-borderColor/50 px-5 py-8 md:px-10 md:py-10">
          <h2 className="mb-8 text-center font-display text-[40px] font-bold tracking-tight text-onSurface md:text-[48px]">
            FAQ
          </h2>

          <div>
            {FAQS.map((faq, index) => (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-lg font-bold text-primary">
                    {faq.question}
                  </span>
                  <FiChevronDown
                    size={20}
                    className={`shrink-0 text-primary transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <p className="pb-5 text-base leading-7 text-subdued">
                    {faq.answer}
                  </p>
                )}

                {index < FAQS.length - 1 && (
                  <div className="h-px w-full bg-borderColor/45" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
